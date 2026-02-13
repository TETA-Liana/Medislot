import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { LoginDto } from './dto/login.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async registerPatient(dto: RegisterPatientDto) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(dto.password);

    // Create user with patient profile in transaction
    const user = await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
          role: UserRole.PATIENT,
        },
      });

      await prisma.patient.create({
        data: {
          userId: user.id,
        },
      });

      return user;
    });

    const fullUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        patientProfile: true,
        doctorProfile: { include: { hospital: true } },
      },
    });

    return this.normalizeUser(fullUser);
  }

  async registerDoctor(dto: RegisterDoctorDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const existingDoctor = await this.prisma.doctor.findUnique({
      where: { licenseNumber: dto.licenseNumber },
    });

    if (existingDoctor) {
      throw new ConflictException(
        'Doctor with this license number already exists',
      );
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
          role: UserRole.DOCTOR,
        },
      });

      await prisma.doctor.create({
        data: {
          userId: user.id,
          specialty: dto.specialty,
          licenseNumber: dto.licenseNumber,
          experienceYears: dto.experienceYears || 0,
          consultationFee: dto.consultationFee || 0,
          bio: dto.bio,
          approvalStatus: 'PENDING',
          hospitalId: dto.hospitalId,
        },
      });

      return user;
    });

    const fullUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        patientProfile: true,
        doctorProfile: { include: { hospital: true } },
      },
    });

    return this.normalizeUser(fullUser);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        patientProfile: true,
        doctorProfile: {
          include: {
            hospital: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await this.verifyPassword(
      dto.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (
      user.role === UserRole.DOCTOR &&
      user.doctorProfile?.approvalStatus !== 'APPROVED'
    ) {
      throw new ForbiddenException('Your doctor account is pending approval');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const normalizedUser = this.normalizeUser(user);
    return {
      user: normalizedUser,
      ...tokens,
    };
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        refreshTokens: {
          where: { token: refreshToken, expiresAt: { gt: new Date() } },
        },
      },
    });

    if (!user || user.refreshTokens.length === 0) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user.id, user.email);

    await this.prisma.$transaction([
      this.prisma.refreshToken.delete({
        where: { id: user.refreshTokens[0].id },
      }),
      this.prisma.refreshToken.create({
        data: {
          token: tokens.refreshToken,
          userId: user.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      }),
    ]);

    return tokens;
  }

  private async generateTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        { sub: userId, email, id: userId },
        {
          secret: this.config.get('JWT_ACCESS_SECRET'),
          expiresIn: this.config.get('JWT_ACCESS_EXPIRATION', '15m'),
        },
      ),
      this.jwt.signAsync(
        { sub: userId, email, id: userId },
        {
          secret: this.config.get('JWT_REFRESH_SECRET'),
          expiresIn: this.config.get('JWT_REFRESH_EXPIRATION', '7d'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });
  }

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        patientProfile: true,
        doctorProfile: {
          include: {
            hospital: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.normalizeUser(user);
  }
  private normalizeUser(user: any) {
    const { password, patientProfile, doctorProfile, ...userRest } = user;
    let profile = null;

    if (user.role === UserRole.PATIENT) {
      profile = patientProfile;
    } else if (user.role === UserRole.DOCTOR) {
      profile = doctorProfile;
    }

    return {
      ...userRest,
      profile,
    };
  }
}
