import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
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
      throw new UnauthorizedException('User not found or inactive');
    }

    return this.normalizeUser(user);
  }

  private normalizeUser(user: any) {
    const { password, patientProfile, doctorProfile, ...userRest } = user;
    let profile = null;

    if (user.role === 'PATIENT') {
      profile = patientProfile;
    } else if (user.role === 'DOCTOR') {
      profile = doctorProfile;
    }

    return {
      ...userRest,
      profile,
    };
  }
}
