import { UserRole, ApprovalStatus, AppointmentStatus } from '@prisma/client';

export interface JwtPayload {
  id: string;
  sub: string;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}

export interface DoctorProfile extends UserProfile {
  specialty: string;
  licenseNumber: string;
  experienceYears: number;
  consultationFee: number;
  bio?: string;
  isVerified: boolean;
  approvalStatus: ApprovalStatus;
  hospitalId?: string;
}

export interface PatientProfile extends UserProfile {
  dateOfBirth?: Date;
  bloodGroup?: string;
  allergies?: string;
}

export interface AppointmentSummary {
  id: string;
  date: Date;
  status: AppointmentStatus;
  doctorName: string;
  specialty: string;
  hospitalName?: string;
}

export interface AvailabilitySlot {
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}
