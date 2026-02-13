import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { ApprovalStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async getPendingDoctors() {
    const doctors = await this.prisma.doctor.findMany({
      where: { approvalStatus: 'PENDING' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        },
        hospital: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return doctors;
  }

  async approveDoctor(doctorId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        user: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (doctor.approvalStatus === 'APPROVED') {
      throw new Error('Doctor is already approved');
    }

    const updatedDoctor = await this.prisma.doctor.update({
      where: { id: doctorId },
      data: {
        approvalStatus: 'APPROVED',
        isVerified: true,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        hospital: true,
      },
    });

    await this.emailService.sendDoctorApprovalEmail(
      doctor.user.email,
      `${doctor.user.firstName} ${doctor.user.lastName}`,
    );

    return updatedDoctor;
  }

  async rejectDoctor(doctorId: string, reason?: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
      include: {
        user: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (doctor.approvalStatus === 'REJECTED') {
      throw new Error('Doctor is already rejected');
    }

    const updatedDoctor = await this.prisma.doctor.update({
      where: { id: doctorId },
      data: {
        approvalStatus: 'REJECTED',
        isVerified: false,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        hospital: true,
      },
    });

    await this.emailService.sendDoctorRejectionEmail(
      doctor.user.email,
      `${doctor.user.firstName} ${doctor.user.lastName}`,
      reason,
    );

    return updatedDoctor;
  }

  async getSystemStats() {
    const [
      totalUsers,
      totalPatients,
      totalDoctors,
      totalAppointments,
      pendingDoctors,
      activeHospitals,
      todayAppointments,
      weeklyAppointments,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.patient.count(),
      this.prisma.doctor.count({ where: { approvalStatus: 'APPROVED' } }),
      this.prisma.appointment.count(),
      this.prisma.doctor.count({ where: { approvalStatus: 'PENDING' } }),
      this.prisma.hospital.count({ where: { isActive: true } }),
      this.prisma.appointment.count({
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),
      this.prisma.appointment.count({
        where: {
          date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    const appointmentsByStatus = await this.prisma.appointment.groupBy({
      by: ['status'],
      _count: true,
    });

    const appointmentsBySpecialty = await this.prisma.appointment.groupBy({
      by: ['doctorId'],
      _count: true,
    });

    const doctorIds = appointmentsBySpecialty.map((item) => item.doctorId);
    const doctors = await this.prisma.doctor.findMany({
      where: { id: { in: doctorIds } },
      select: { id: true, specialty: true },
    });

    const specialtyStats = appointmentsBySpecialty.map((item) => {
      const doctor = doctors.find((d) => d.id === item.doctorId);
      return {
        specialty: doctor?.specialty || 'Unknown',
        count: item._count,
      };
    });

    const aggregatedSpecialtyStats = specialtyStats.reduce((acc, curr) => {
      if (acc[curr.specialty]) {
        acc[curr.specialty] += curr.count;
      } else {
        acc[curr.specialty] = curr.count;
      }
      return acc;
    }, {});

    const specialtyArray = Object.entries(aggregatedSpecialtyStats).map(
      ([specialty, count]) => ({
        specialty,
        count,
      }),
    );

    return {
      overview: {
        totalUsers,
        totalPatients,
        totalDoctors,
        totalAppointments,
        pendingDoctors,
        activeHospitals,
        todayAppointments,
        weeklyAppointments,
      },
      appointmentsByStatus: appointmentsByStatus.map((item) => ({
        status: item.status,
        count: item._count,
      })),
      appointmentsBySpecialty: specialtyArray,
    };
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        patientProfile: true,
        doctorProfile: {
          include: {
            hospital: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => {
      const { password, patientProfile, doctorProfile, ...userRest } = user;
      let profile: any = null;

      if (user.role === 'PATIENT') {
        profile = patientProfile;
      } else if (user.role === 'DOCTOR') {
        profile = doctorProfile;
      }

      return {
        ...userRest,
        profile,
      };
    });
  }

  async toggleUserStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
