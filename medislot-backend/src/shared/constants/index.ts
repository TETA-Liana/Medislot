export const API_PREFIX = '/api/v1';

export const ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN',
} as const;

export const APPOINTMENT_STATUS = {
  UPCOMING: 'UPCOMING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  PENDING_CONFIRMATION: 'PENDING_CONFIRMATION',
} as const;

export const APPROVAL_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const APPOINTMENT_DURATIONS = [15, 30, 45, 60] as const;

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;
