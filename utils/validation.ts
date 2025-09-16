import { z } from 'zod';

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

const emailSchema = z.string().trim().min(1, { message: 'Email is required' }).max(254,{ message: 'Email is too long' }).email({ message: 'Please enter a valid email address' });

const passwordSchema = z.string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(128, { message: 'Password is to loo long' })
  .refine((v: string) => !/\s/.test(v), { message: 'Password must not contain spaces' })
  .refine((v: string) => {
    const checks = [/[a-z]/.test(v), /[A-Z]/.test(v), /\d/.test(v), /[!@#$%^&*(),.?\":{}|<>]/.test(v)];
    return checks.filter(Boolean).length >= 3;
  }, { message: 'Password must contain at least 3 of: lowercase, uppercase, number, special character' });

const fullNameSchema = z.string()
  .trim()
  .min(2, { message: 'Full name must be at least 2 characters' })
  .max(50, { message: 'Full name is too long' })
  .regex(/^[a-zA-Z\s]+$/, { message: 'Full name can only contain letters and spaces' });

export const validateEmail = (email: string): ValidationResult => {
  try {
    const res = emailSchema.safeParse(email || '');
    if (res.success) return { isValid: true, message: '' };
  return { isValid: false, message: res.error?.issues?.[0]?.message || 'Invalid email' };
  } catch (error) {
    console.log(error)
    return { isValid: false, message: 'Validation error occurred' };
  }
};

export const validatePassword = (password: string): ValidationResult => {
  const res = passwordSchema.safeParse(password || '');
  if (res.success) return { isValid: true, message: '' };
  return { isValid: false, message: res.error?.issues?.[0]?.message || 'Invalid password' };
};

export const validatePasswordStrength = (password: string): boolean => {
  const res = passwordSchema.safeParse(password || '');
  return res.success;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }

  return { isValid: true, message: '' };
};

export const validateFullName = (name: string): ValidationResult => {
  const res = fullNameSchema.safeParse(name || '');
  if (res.success) return { isValid: true, message: '' };
  return { isValid: false, message: res.error?.issues?.[0]?.message || 'Invalid full name' };
};

const phoneSchema = z.string()
  .trim()
  .regex(/^\d+$/, { message: 'Phone must contain only digits' })
  .min(7, { message: 'Phone number is too short' })
  .max(15, { message: 'Phone number is too long' });

export const validatePhone = (phone: string): ValidationResult => {
  const res = phoneSchema.safeParse(phone || '');
  if (res.success) return { isValid: true, message: '' };
  return { isValid: false, message: res.error?.issues?.[0]?.message || 'Invalid phone number' };
};
