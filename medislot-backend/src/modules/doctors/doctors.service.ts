import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
import { SetAvailabilityDto } from './dto/set-availability.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async getAllDoctors(specialty?: string, city?: string) {
    const where: any = {
      approvalStatus: 'APPROVED',
      isVerified: true,
      user: { isActive: true },
    };

    if (specialty) {
      where.specialty = { contains: specialty, mode: 'insensitive' };
    }

    if (city) {
      where.hospital = city
        ? { city: { contains: city, mode: 'insensitive' } }
        : undefined;
    }

    const doctors = await this.prisma.doctor.findMany({
      where,
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
        hospital: true,
        availabilities: {
          where: { isActive: true },
        },
      },
    });

    return doctors.map((doctor) => ({
      id: doctor.id,
      name: `${doctor.user.firstName} ${doctor.user.lastName}`,
      email: doctor.user.email,
      phone: doctor.user.phone,
      avatar: doctor.user.avatar,
      specialty: doctor.specialty,
      experienceYears: doctor.experienceYears,
      consultationFee: doctor.consultationFee,
      bio: doctor.bio,
      hospital: doctor.hospital,
      availabilities: doctor.availabilities,
      rating: 4.5, // Mocked for now
    }));
  }

  async getDoctorById(id: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id, approvalStatus: 'APPROVED', isVerified: true },
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
        hospital: true,
        availabilities: {
          where: { isActive: true },
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    return {
      id: doctor.id,
      name: `${doctor.user.firstName} ${doctor.user.lastName}`,
      email: doctor.user.email,
      phone: doctor.user.phone,
      avatar: doctor.user.avatar,
      specialty: doctor.specialty,
      experienceYears: doctor.experienceYears,
      consultationFee: doctor.consultationFee,
      bio: doctor.bio,
      hospital: doctor.hospital,
      availabilities: doctor.availabilities,
      rating: 4.5,
    };
  }

  async getDoctorProfile(userId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId },
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
        hospital: true,
        availabilities: {
          where: { isActive: true },
          orderBy: { dayOfWeek: 'asc' },
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    return doctor;
  }

  async updateDoctorProfile(userId: string, dto: UpdateDoctorProfileDto) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    // Update user info
    if (dto.firstName || dto.lastName || dto.phone) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
        },
      });
    }

    // Update doctor info
    return this.prisma.doctor.update({
      where: { userId },
      data: {
        specialty: dto.specialty,
        experienceYears: dto.experienceYears,
        consultationFee: dto.consultationFee,
        bio: dto.bio,
        hospitalId: dto.hospitalId,
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        hospital: true,
      },
    });
  }

  async setAvailability(userId: string, dto: SetAvailabilityDto[]) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    if (!Array.isArray(dto)) {
      throw new BadRequestException(
        'Request body must be an array of availability slots',
      );
    }

    if (dto.length === 0) {
      throw new BadRequestException(
        'At least one availability slot is required',
      );
    }

    for (const availability of dto) {
      if (availability.dayOfWeek < 0 || availability.dayOfWeek > 6) {
        throw new BadRequestException('dayOfWeek must be between 0 and 6');
      }
    }

    await this.prisma.doctorAvailability.deleteMany({
      where: { doctorId: doctor.id },
    });

    const createdAvailabilities = await Promise.all(
      dto.map((availability) =>
        this.prisma.doctorAvailability.create({
          data: {
            doctorId: doctor.id,
            dayOfWeek: availability.dayOfWeek,
            startTime: availability.startTime,
            endTime: availability.endTime,
            isActive: true,
          },
        }),
      ),
    );

    return createdAvailabilities;
  }

  async getAvailability(
    doctorId: string,
    startDate?: string,
    endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate
      ? new Date(endDate)
      : new Date(new Date().setDate(new Date().getDate() + 30));

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        availabilities: {
          where: { isActive: true },
        },
        appointments: {
          where: {
            status: { in: ['UPCOMING', 'PENDING_CONFIRMATION'] },
            date: { gte: start, lte: end },
          },
          select: {
            date: true,
            duration: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const availableSlots = this.generateAvailableSlots(
      doctor.availabilities,
      doctor.appointments,
      start,
      end,
    );

    return {
      doctorId: doctor.id,
      doctorName: `${doctor.user.firstName} ${doctor.user.lastName}`,
      availabilities: doctor.availabilities,
      bookedSlots: doctor.appointments,
      availableSlots,
    };
  }

  private generateAvailableSlots(
    availabilities: any[],
    bookedAppointments: any[],
    startDate: Date,
    endDate: Date,
  ) {
    const slots: any[] = [];

    // Calculate difference in days
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Limit to maximum 60 days to prevent performance issues
    const maxDays = Math.min(diffDays, 60);

    for (let i = 0; i <= maxDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dayOfWeek = date.getDay();

      const availability = availabilities.find(
        (a) => a.dayOfWeek === dayOfWeek,
      );
      if (!availability || !availability.isActive) continue;

      const [startHour, startMinute] = availability.startTime
        .split(':')
        .map(Number);
      const [endHour, endMinute] = availability.endTime.split(':').map(Number);

      const startTime = new Date(date);
      startTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date(date);
      endTime.setHours(endHour, endMinute, 0, 0);

      let currentTime = new Date(startTime);
      while (currentTime < endTime) {
        const slotEnd = new Date(currentTime);
        slotEnd.setMinutes(currentTime.getMinutes() + 30);

        const isBooked = bookedAppointments.some((appointment) => {
          const appointmentTime = new Date(appointment.date);
          return appointmentTime.getTime() === currentTime.getTime();
        });

        if (!isBooked) {
          slots.push({
            date: currentTime.toISOString(),
            startTime: currentTime.toTimeString().slice(0, 5),
            endTime: slotEnd.toTimeString().slice(0, 5),
            isAvailable: true,
          });
        }

        currentTime = slotEnd;
      }
    }

    return slots;
  }

  async getDoctorAppointments(userId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }

    const appointments = await this.prisma.appointment.findMany({
      where: { doctorId: doctor.id },
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
              },
            },
          },
        },
        hospital: true,
      },
      orderBy: { date: 'asc' },
    });

    return appointments;
  }
}
