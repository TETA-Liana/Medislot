import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Injectable()
export class HospitalsService {
  constructor(private prisma: PrismaService) {}

  async createHospital(dto: CreateHospitalDto) {
    // Check if hospital with same name in same city exists
    const existingHospital = await this.prisma.hospital.findFirst({
      where: {
        name: dto.name,
        city: dto.city,
      },
    });

    if (existingHospital) {
      throw new ConflictException(
        'Hospital with this name already exists in this city',
      );
    }

    return this.prisma.hospital.create({
      data: {
        ...dto,
        isActive: true,
      },
    });
  }

  async getAllHospitals(city?: string, isActive?: boolean) {
    const where: any = {};

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    return this.prisma.hospital.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        doctors: {
          where: { approvalStatus: 'APPROVED', isVerified: true },
          select: {
            id: true,
            specialty: true,
            experienceYears: true,
            consultationFee: true,
            bio: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async getHospitalById(id: string) {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
      include: {
        doctors: {
          where: { approvalStatus: 'APPROVED', isVerified: true },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                avatar: true,
              },
            },
            availabilities: {
              where: { isActive: true },
            },
          },
        },
      },
    });

    if (!hospital) {
      throw new NotFoundException('Hospital not found');
    }

    return hospital;
  }

  async updateHospital(id: string, dto: UpdateHospitalDto) {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
    });

    if (!hospital) {
      throw new NotFoundException('Hospital not found');
    }

    // If name and city are being updated, check for duplicates
    if (dto.name && dto.city) {
      const existingHospital = await this.prisma.hospital.findFirst({
        where: {
          name: dto.name,
          city: dto.city,
          id: { not: id },
        },
      });

      if (existingHospital) {
        throw new ConflictException(
          'Another hospital with this name already exists in this city',
        );
      }
    }

    return this.prisma.hospital.update({
      where: { id },
      data: dto,
    });
  }

  async deleteHospital(id: string) {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
      include: {
        doctors: {
          select: { id: true },
        },
      },
    });

    if (!hospital) {
      throw new NotFoundException('Hospital not found');
    }

    // Check if hospital has doctors
    if (hospital.doctors.length > 0) {
      throw new ConflictException(
        'Cannot delete hospital with associated doctors. Remove doctors first.',
      );
    }

    return this.prisma.hospital.delete({
      where: { id },
    });
  }

  async toggleHospitalStatus(id: string) {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
    });

    if (!hospital) {
      throw new NotFoundException('Hospital not found');
    }

    return this.prisma.hospital.update({
      where: { id },
      data: { isActive: !hospital.isActive },
    });
  }

  async getHospitalStats(id: string) {
    const hospital = await this.prisma.hospital.findUnique({
      where: { id },
    });

    if (!hospital) {
      throw new NotFoundException('Hospital not found');
    }

    const [doctorsCount, appointmentsToday, appointmentsThisMonth] =
      await Promise.all([
        this.prisma.doctor.count({
          where: {
            hospitalId: id,
            approvalStatus: 'APPROVED',
            isVerified: true,
          },
        }),
        this.prisma.appointment.count({
          where: {
            hospitalId: id,
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
            status: 'UPCOMING',
          },
        }),
        this.prisma.appointment.count({
          where: {
            hospitalId: id,
            date: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        }),
      ]);

    // Get appointments by specialty
    const appointmentsBySpecialty = await this.prisma.appointment.groupBy({
      by: ['doctorId'],
      where: {
        hospitalId: id,
        date: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
      },
      _count: true,
    });

    // Get doctor specialties
    const doctorIds = appointmentsBySpecialty.map((item) => item.doctorId);
    const doctors = await this.prisma.doctor.findMany({
      where: { id: { in: doctorIds } },
      select: { id: true, specialty: true },
    });

    const specialtyStats = appointmentsBySpecialty.reduce((acc, item) => {
      const doctor = doctors.find((d) => d.id === item.doctorId);
      const specialty = doctor?.specialty || 'Unknown';

      if (acc[specialty]) {
        acc[specialty] += item._count;
      } else {
        acc[specialty] = item._count;
      }

      return acc;
    }, {});

    return {
      id: hospital.id,
      name: hospital.name,
      stats: {
        totalDoctors: doctorsCount,
        appointmentsToday,
        appointmentsThisMonth,
      },
      appointmentsBySpecialty: Object.entries(specialtyStats).map(
        ([specialty, count]) => ({
          specialty,
          count,
        }),
      ),
    };
  }
}
