import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleAppointmentDto } from './dto/reschedule-appointment.dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';
import { UserRole, AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async createAppointment(userId: string, dto: CreateAppointmentDto) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    const doctor = await this.prisma.doctor.findUnique({
      where: { id: dto.doctorId, approvalStatus: 'APPROVED', isVerified: true },
      include: {
        availabilities: {
          where: { isActive: true },
        },
        appointments: {
          where: {
            date: dto.date,
            status: { in: ['UPCOMING', 'PENDING_CONFIRMATION'] },
          },
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found or not approved');
    }

    const appointmentDate = new Date(dto.date);
    const now = new Date();
    if (appointmentDate <= now) {
      throw new BadRequestException('Appointment time must be in the future');
    }

    const dayOfWeek = appointmentDate.getDay();
    const availability = doctor.availabilities.find(
      (a) => a.dayOfWeek === dayOfWeek,
    );

    if (!availability) {
      throw new BadRequestException('Doctor is not available on this day');
    }

    const [startHour, startMinute] = availability.startTime
      .split(':')
      .map(Number);
    const [endHour, endMinute] = availability.endTime.split(':').map(Number);

    const slotStart = new Date(appointmentDate);
    const slotEnd = new Date(appointmentDate);
    slotEnd.setMinutes(slotEnd.getMinutes() + (dto.duration || 30));

    const dayStart = new Date(appointmentDate);
    dayStart.setHours(startHour, startMinute, 0, 0);

    const dayEnd = new Date(appointmentDate);
    dayEnd.setHours(endHour, endMinute, 0, 0);

    if (slotStart < dayStart || slotEnd > dayEnd) {
      throw new BadRequestException(
        'Appointment time is outside doctor working hours',
      );
    }

    const isDoctorBooked = doctor.appointments.some((appointment) => {
      const appointmentStart = new Date(appointment.date);
      const appointmentEnd = new Date(appointmentStart);
      appointmentEnd.setMinutes(
        appointmentStart.getMinutes() + appointment.duration,
      );

      return (
        (slotStart >= appointmentStart && slotStart < appointmentEnd) ||
        (slotEnd > appointmentStart && slotEnd <= appointmentEnd) ||
        (slotStart <= appointmentStart && slotEnd >= appointmentEnd)
      );
    });

    if (isDoctorBooked) {
      throw new BadRequestException(
        'Doctor already has an appointment at this time',
      );
    }

    const patientAppointments = await this.prisma.appointment.findMany({
      where: {
        patientId: patient.id,
        date: {
          gte: new Date(
            appointmentDate.getFullYear(),
            appointmentDate.getMonth(),
            appointmentDate.getDate(),
          ),
          lt: new Date(
            appointmentDate.getFullYear(),
            appointmentDate.getMonth(),
            appointmentDate.getDate() + 1,
          ),
        },
        status: { in: ['UPCOMING', 'PENDING_CONFIRMATION'] },
      },
    });

    const isPatientBooked = patientAppointments.some((appointment) => {
      const appointmentStart = new Date(appointment.date);
      const appointmentEnd = new Date(appointmentStart);
      appointmentEnd.setMinutes(
        appointmentStart.getMinutes() + appointment.duration,
      );

      return (
        (slotStart >= appointmentStart && slotStart < appointmentEnd) ||
        (slotEnd > appointmentStart && slotEnd <= appointmentEnd) ||
        (slotStart <= appointmentStart && slotEnd >= appointmentEnd)
      );
    });

    if (isPatientBooked) {
      throw new BadRequestException(
        'You already have an appointment at this time',
      );
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        hospitalId: dto.hospitalId,
        date: appointmentDate,
        duration: dto.duration || 30,
        status: 'UPCOMING',
        notes: dto.notes,
        symptoms: dto.symptoms,
      },
      include: {
        patient: {
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
          },
        },
        doctor: {
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
          },
        },
        hospital: true,
      },
    });

    // Send email notification to doctor
    await this.emailService.sendAppointmentBookingEmail(
      appointment.doctor.user.email,
      `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`,
      `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`,
      appointment.date,
      appointment.duration,
    );

    return appointment;
  }

  async getPatientAppointments(userId: string, status?: AppointmentStatus) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    const where: any = { patientId: patient.id };
    if (status) {
      where.status = status;
    }

    const appointments = await this.prisma.appointment.findMany({
      where,
      include: {
        doctor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            hospital: true,
          },
        },
        hospital: true,
      },
      orderBy: { date: 'asc' },
    });

    return appointments;
  }

  async rescheduleAppointment(
    userId: string,
    appointmentId: string,
    dto: RescheduleAppointmentDto,
  ) {
    // Find appointment
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: true,
        doctor: {
          include: {
            availabilities: {
              where: { isActive: true },
            },
            appointments: {
              where: {
                id: { not: appointmentId },
                status: { in: ['UPCOMING', 'PENDING_CONFIRMATION'] },
              },
            },
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (appointment.patient.userId !== userId) {
      throw new ForbiddenException(
        'You can only reschedule your own appointments',
      );
    }

    if (appointment.status !== 'UPCOMING') {
      throw new BadRequestException(
        `Cannot reschedule a ${appointment.status.toLowerCase()} appointment`,
      );
    }

    const newDate = new Date(dto.newDate);
    const now = new Date();

    if (newDate <= now) {
      throw new BadRequestException(
        'New appointment time must be in the future',
      );
    }

    const dayOfWeek = newDate.getDay();
    const availability = appointment.doctor.availabilities.find(
      (a) => a.dayOfWeek === dayOfWeek,
    );

    if (!availability) {
      throw new BadRequestException('Doctor is not available on this day');
    }

    const [startHour, startMinute] = availability.startTime
      .split(':')
      .map(Number);
    const [endHour, endMinute] = availability.endTime.split(':').map(Number);

    const slotStart = newDate;
    const slotEnd = new Date(newDate);
    slotEnd.setMinutes(slotEnd.getMinutes() + appointment.duration);

    const dayStart = new Date(newDate);
    dayStart.setHours(startHour, startMinute, 0, 0);

    const dayEnd = new Date(newDate);
    dayEnd.setHours(endHour, endMinute, 0, 0);

    if (slotStart < dayStart || slotEnd > dayEnd) {
      throw new BadRequestException(
        'New appointment time is outside doctor working hours',
      );
    }

    const isDoctorBooked = appointment.doctor.appointments.some(
      (existingAppointment) => {
        const existingStart = new Date(existingAppointment.date);
        const existingEnd = new Date(existingStart);
        existingEnd.setMinutes(
          existingStart.getMinutes() + existingAppointment.duration,
        );

        return (
          (slotStart >= existingStart && slotStart < existingEnd) ||
          (slotEnd > existingStart && slotEnd <= existingEnd) ||
          (slotStart <= existingStart && slotEnd >= existingEnd)
        );
      },
    );

    if (isDoctorBooked) {
      throw new BadRequestException(
        'Doctor already has an appointment at this time',
      );
    }

    const patientAppointments = await this.prisma.appointment.findMany({
      where: {
        patientId: appointment.patientId,
        id: { not: appointmentId },
        date: {
          gte: new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            newDate.getDate(),
          ),
          lt: new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            newDate.getDate() + 1,
          ),
        },
        status: { in: ['UPCOMING', 'PENDING_CONFIRMATION'] },
      },
    });

    const isPatientBooked = patientAppointments.some((existingAppointment) => {
      const existingStart = new Date(existingAppointment.date);
      const existingEnd = new Date(existingStart);
      existingEnd.setMinutes(
        existingStart.getMinutes() + existingAppointment.duration,
      );

      return (
        (slotStart >= existingStart && slotStart < existingEnd) ||
        (slotEnd > existingStart && slotEnd <= existingEnd) ||
        (slotStart <= existingStart && slotEnd >= existingEnd)
      );
    });

    if (isPatientBooked) {
      throw new BadRequestException(
        'You already have an appointment at this time',
      );
    }

    const updatedAppointment = await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        date: newDate,
      },
      include: {
        patient: {
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
          },
        },
        doctor: {
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
          },
        },
        hospital: true,
      },
    });

    return updatedAppointment;
  }

  async cancelAppointment(
    userId: string,
    appointmentId: string,
    dto: CancelAppointmentDto,
  ) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: true,
        doctor: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { patientProfile: true, doctorProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let canCancel = false;

    if (
      user.role === UserRole.PATIENT &&
      appointment.patient.userId === userId
    ) {
      canCancel = true;
    } else if (
      user.role === UserRole.DOCTOR &&
      appointment.doctor.userId === userId
    ) {
      canCancel = true;
    }

    if (!canCancel) {
      throw new ForbiddenException('You cannot cancel this appointment');
    }

    if (appointment.status !== 'UPCOMING') {
      throw new BadRequestException(
        `Cannot cancel a ${appointment.status.toLowerCase()} appointment`,
      );
    }

    const appointmentTime = new Date(appointment.date);
    const now = new Date();
    const hoursBefore =
      (appointmentTime.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursBefore < 2) {
      throw new BadRequestException(
        'Appointments can only be cancelled at least 2 hours before the scheduled time',
      );
    }

    const updatedAppointment = await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'CANCELLED',
        cancellationReason: dto.reason,
      },
      include: {
        doctor: {
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
          },
        },
        patient: {
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
          },
        },
        hospital: true,
      },
    });

    return updatedAppointment;
  }

  async getAppointmentById(userId: string, appointmentId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
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
        doctor: {
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
        },
        hospital: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { patientProfile: true, doctorProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let hasAccess = false;

    if (user.role === UserRole.ADMIN) {
      hasAccess = true;
    } else if (
      user.role === UserRole.PATIENT &&
      appointment.patient.userId === userId
    ) {
      hasAccess = true;
    } else if (
      user.role === UserRole.DOCTOR &&
      appointment.doctor.userId === userId
    ) {
      hasAccess = true;
    }

    if (!hasAccess) {
      throw new ForbiddenException(
        'You do not have access to this appointment',
      );
    }

    return appointment;
  }

  async updateAppointmentStatus(
    userId: string,
    appointmentId: string,
    status: AppointmentStatus,
  ) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId },
    });

    if (!doctor) {
      throw new ForbiddenException(
        'Only doctors can update appointment status',
      );
    }

    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    if (appointment.doctorId !== doctor.id) {
      throw new ForbiddenException(
        'You can only update status of your own appointments',
      );
    }

    const validTransitions = {
      UPCOMING: ['COMPLETED', 'CANCELLED'],
      PENDING_CONFIRMATION: ['UPCOMING', 'CANCELLED'],
    };

    if (!validTransitions[appointment.status]?.includes(status)) {
      throw new BadRequestException(
        `Cannot change status from ${appointment.status} to ${status}`,
      );
    }

    const updatedAppointment = await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
      include: {
        patient: {
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
          },
        },
        doctor: {
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
          },
        },
        hospital: true,
      },
    });

    return updatedAppointment;
  }
}
