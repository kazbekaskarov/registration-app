export type UserRole = 'customer' | 'carrier';

export interface PhoneStepData {
  phone: string;
  termsAccepted: boolean;
}

export interface RoleStepData {
  role: UserRole;
}

export interface OTPStepData {
  otp: string;
}

export interface ProfileStepData {
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  password: string;
  identificationNumber: string; // ИИН for individuals, БИН for legal entities
}

export interface RegistrationData extends PhoneStepData, RoleStepData, ProfileStepData {
  isRegistered: boolean;
}

export interface UserProfile {
  phone: string;
  role: UserRole;
  lastName: string;
  firstName: string;
  middleName?: string;
  email: string;
  identificationNumber: string;
}

export type RegistrationStep = 0 | 1 | 2 | 3 | 4;

export const REGISTRATION_STEPS = {
  PHONE: 0,
  ROLE: 1,
  OTP: 2,
  PROFILE: 3,
  COMPLETE: 4,
} as const;
