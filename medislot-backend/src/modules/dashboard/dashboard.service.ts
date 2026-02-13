import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(userId: string, userRole: UserRole) {
    switch (userRole) {
      case UserRole.PATIENT:
        return this.getPatientDashboard(userId);
      case UserRole.DOCTOR:
        return this.getDoctorDashboard(userId);
      case UserRole.ADMIN:
        return this.getAdminDashboard();
      default:
        throw new Error('Invalid user role');
    }
  }

  private async getPatientDashboard(userId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });

    if (!patient) {
      throw new Error('Patient not found');
    }

    const [upcomingAppointments, pastAppointments, favoriteDoctors] =
      await Promise.all([
        this.prisma.appointment.findMany({
          where: {
            patientId: patient.id,
            status: 'UPCOMING',
            date: { gte: new Date() },
          },
          include: {
            doctor: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    avatar: true,
                  },
                },
                hospital: true,
              },
            },
          },
          orderBy: { date: 'asc' },
          take: 5,
        }),
        this.prisma.appointment.findMany({
          where: {
            patientId: patient.id,
            status: 'COMPLETED',
          },
          include: {
            doctor: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
          orderBy: { date: 'desc' },
          take: 5,
        }),
        this.prisma.doctor.findMany({
          where: {
            appointments: {
              some: { patientId: patient.id },
            },
            approvalStatus: 'APPROVED',
          },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
            hospital: true,
          },
          take: 3,
        }),
      ]);

    return {
      role: 'patient',
      patient: {
        id: patient.id,
        name: `${patient.user.firstName} ${patient.user.lastName}`,
        email: patient.user.email,
      },
      stats: {
        upcomingAppointments: upcomingAppointments.length,
        pastAppointments: pastAppointments.length,
        favoriteDoctors: favoriteDoctors.length,
      },
      upcomingAppointments: upcomingAppointments.map((appointment) => ({
        id: appointment.id,
        date: appointment.date,
        doctor: {
          name: `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`,
          specialty: appointment.doctor.specialty,
          hospital: appointment.doctor.hospital?.name,
        },
        status: appointment.status,
      })),
      favoriteDoctors: favoriteDoctors.map((doctor) => ({
        id: doctor.id,
        name: `${doctor.user.firstName} ${doctor.user.lastName}`,
        specialty: doctor.specialty,
        hospital: doctor.hospital?.name,
        avatar: doctor.user.avatar,
      })),
    };
  }

  private async getDoctorDashboard(userId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId },
      include: {
        user: true,
        hospital: true,
      },
    });

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todayAppointments, upcomingAppointments, recentPatients] =
      await Promise.all([
        this.prisma.appointment.findMany({
          where: {
            doctorId: doctor.id,
            status: 'UPCOMING',
            date: {
              gte: today,
              lt: tomorrow,
            },
          },
          include: {
            patient: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                    phone: true,
                  },
                },
              },
            },
          },
          orderBy: { date: 'asc' },
        }),
        this.prisma.appointment.findMany({
          where: {
            doctorId: doctor.id,
            status: 'UPCOMING',
            date: { gte: tomorrow },
          },
          include: {
            patient: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
          orderBy: { date: 'asc' },
          take: 5,
        }),
        this.prisma.appointment.findMany({
          where: {
            doctorId: doctor.id,
            status: 'COMPLETED',
          },
          include: {
            patient: {
              include: {
                user: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
          distinct: ['patientId'],
          orderBy: { date: 'desc' },
          take: 5,
        }),
      ]);

    // Calculate monthly stats
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlyStats = await this.prisma.appointment.groupBy({
      by: ['status'],
      where: {
        doctorId: doctor.id,
        date: { gte: startOfMonth },
      },
      _count: true,
    });

    return {
      role: 'doctor',
      doctor: {
        id: doctor.id,
        name: `${doctor.user.firstName} ${doctor.user.lastName}`,
        specialty: doctor.specialty,
        hospital: doctor.hospital?.name,
      },
      stats: {
        todayAppointments: todayAppointments.length,
        upcomingAppointments: upcomingAppointments.length,
        totalPatients: recentPatients.length,
        monthlyCompleted:
          monthlyStats.find((stat) => stat.status === 'COMPLETED')?._count || 0,
        monthlyCancelled:
          monthlyStats.find((stat) => stat.status === 'CANCELLED')?._count || 0,
      },
      todayAppointments: todayAppointments.map((appointment) => ({
        id: appointment.id,
        time: appointment.date,
        patient: {
          name: `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`,
          phone: appointment.patient.user.phone,
        },
        duration: appointment.duration,
      })),
      upcomingAppointments: upcomingAppointments.map((appointment) => ({
        id: appointment.id,
        date: appointment.date,
        patient: {
          name: `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`,
        },
      })),
      recentPatients: recentPatients.map((appointment) => ({
        id: appointment.patient.id,
        name: `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`,
        lastVisit: appointment.date,
      })),
    };
  }

  private async getAdminDashboard() {
    const [
      totalUsers,
      totalPatients,
      totalDoctors,
      pendingDoctors,
      todayAppointments,
      weeklyAppointments,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.patient.count(),
      this.prisma.doctor.count({ where: { approvalStatus: 'APPROVED' } }),
      this.prisma.doctor.count({ where: { approvalStatus: 'PENDING' } }),
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

    // Get recent appointments
    const recentAppointments = await this.prisma.appointment.findMany({
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
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
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    // Get recent users
    const recentUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return {
      role: 'admin',
      stats: {
        totalUsers,
        totalPatients,
        totalDoctors,
        pendingDoctors,
        todayAppointments,
        weeklyAppointments,
      },
      recentAppointments: recentAppointments.map((appointment) => ({
        id: appointment.id,
        date: appointment.date,
        status: appointment.status,
        patient: `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`,
        doctor: `${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`,
      })),
      recentUsers: recentUsers.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
        joined: user.createdAt,
      })),
    };
  }

  async getCalendarEvents(
    userId: string,
    userRole: UserRole,
    startDate: string,
    endDate: string,
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let appointments;

    if (userRole === UserRole.PATIENT) {
      const patient = await this.prisma.patient.findUnique({
        where: { userId },
      });

      if (!patient) return [];

      appointments = await this.prisma.appointment.findMany({
        where: {
          patientId: patient.id,
          date: {
            gte: start,
            lte: end,
          },
        },
        include: {
          doctor: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });
    } else if (userRole === UserRole.DOCTOR) {
      const doctor = await this.prisma.doctor.findUnique({
        where: { userId },
      });

      if (!doctor) return [];

      appointments = await this.prisma.appointment.findMany({
        where: {
          doctorId: doctor.id,
          date: {
            gte: start,
            lte: end,
          },
        },
        include: {
          patient: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });
    } else {
      // Admin sees all appointments
      appointments = await this.prisma.appointment.findMany({
        where: {
          date: {
            gte: start,
            lte: end,
          },
        },
        include: {
          patient: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
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
                },
              },
            },
          },
        },
      });
    }

    return appointments.map((appointment) => ({
      id: appointment.id,
      title:
        userRole === UserRole.PATIENT
          ? `Appointment with Dr. ${appointment.doctor.user.lastName}`
          : userRole === UserRole.DOCTOR
            ? `Appointment with ${appointment.patient.user.firstName}`
            : `${appointment.patient.user.firstName} with Dr. ${appointment.doctor.user.lastName}`,
      start: appointment.date,
      end: new Date(
        new Date(appointment.date).getTime() + appointment.duration * 60000,
      ),
      status: appointment.status,
      color: this.getStatusColor(appointment.status),
    }));
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case 'UPCOMING':
        return '#3b82f6'; // Blue
      case 'COMPLETED':
        return '#10b981'; // Green
      case 'CANCELLED':
        return '#ef4444'; // Red
      case 'PENDING_CONFIRMATION':
        return '#f59e0b'; // Yellow
      default:
        return '#6b7280'; // Gray
    }
  }
}
