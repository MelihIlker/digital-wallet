"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { PasswordStrength } from '../ui/PasswordStrength';
import { 
  validateEmail, 
  validatePassword, 
  validatePasswordStrength, 
  validateConfirmPassword, 
  validateFullName 
} from '../../utils/validation';
import { validatePhone } from '../../utils/validation';

export const RegisterForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptTerms: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function getFingerprint() {
    if (typeof window === 'undefined') return '';
    let fp = localStorage.getItem('fingerprint');
    if (fp) return fp;
    const fpPromise = FingerprintJS.load();
    const fpAgent = await fpPromise;
    const result = await fpAgent.get();
    fp = result.visitorId;
    localStorage.setItem('fingerprint', fp);
    return fp;
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    if (name === 'password' && formData.confirmPassword) {
      const confirmValidation = validateConfirmPassword(e.target.value as string, formData.confirmPassword);
      if (!confirmValidation.isValid) {
        setErrors(prev => ({ ...prev, confirmPassword: confirmValidation.message }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    validateField(name);
  };

  const validateField = (name: string) => {
    switch (name) {
      case 'fullName': {
        const res = validateFullName(formData.fullName);
        setErrors(prev => ({ ...prev, fullName: res.isValid ? '' : res.message }));
        break;
      }
      case 'phone': {
        const res = validatePhone(formData.phone);
        setErrors(prev => ({ ...prev, phone: res.isValid ? '' : res.message }));
        break;
      }
      case 'email': {
        const res = validateEmail(formData.email);
        setErrors(prev => ({ ...prev, email: res.isValid ? '' : res.message }));
        break;
      }
      case 'password': {
        const res = validatePassword(formData.password);
        setErrors(prev => ({ ...prev, password: res.isValid ? '' : res.message }));
        break;
      }
      case 'confirmPassword': {
        const res = validateConfirmPassword(formData.password, formData.confirmPassword);
        setErrors(prev => ({ ...prev, confirmPassword: res.isValid ? '' : res.message }));
        break;
      }
      default:
        break;
    }
  };

  const isFormValidForSubmit = () => {
    if (!validateFullName(formData.fullName).isValid) return false;
    if (!validatePhone(formData.phone).isValid) return false;
    if (!validateEmail(formData.email).isValid) return false;
    if (!validatePassword(formData.password).isValid) return false;
    if (!validateConfirmPassword(formData.password, formData.confirmPassword).isValid) return false;
    if (!formData.acceptTerms) return false;
    if (!validatePasswordStrength(formData.password)) return false;
    return true;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate full name
    const fullNameValidation = validateFullName(formData.fullName);
    if (!fullNameValidation.isValid) {
      newErrors.fullName = fullNameValidation.message;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    // Validate phone
    const phoneValidation = validatePhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.message;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    } else if (!validatePasswordStrength(formData.password)) {
      newErrors.password = "Password is not strong enough. Please use a stronger password.";
    }

    // Validate confirm password
    const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.message;
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the Terms of Service and Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      setErrors({ submit: 'Bot activity detected.' });
      return;
    }
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      const fingerprint = await getFingerprint();
      
      const payload = {
        fullname: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        honeypot: formData.honeypot,
        fingerprint,
      };
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors({ submit: json?.message || json?.error || 'Registration failed' });
        return;
      }
      router.push('/auth/login');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setErrors({ submit: message || 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="dark" className="w-full max-w-sm sm:max-w-md">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Create your account</h2>
        <p className="text-slate-400 text-sm sm:text-base">Join thousands of users who trust DigitalWallet</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
        />
        <Input
          label="Full name"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.fullName}
          placeholder="John Doe"
          disabled={isLoading}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.email}
          placeholder="example@email.com"
          disabled={isLoading}
        />

        <Input
          label="Phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={formData.phone}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.phone}
          placeholder="e.g. 5512345678"
          disabled={isLoading}
        />

        <div>
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={errors.password}
            placeholder="At least 8 characters"
            disabled={isLoading}
          />
          <PasswordStrength password={formData.password} />
        </div>

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          disabled={isLoading}
        />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className={`w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 ${
                errors.acceptTerms ? 'border-red-500' : ''
              }`}
              disabled={isLoading}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="text-slate-400">
              I have read and agree to the{" "}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </Link> and{" "}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </Link>.
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-400">{errors.acceptTerms}</p>
            )}
          </div>
        </div>


        {/* General error message */}
        {errors.submit && (
          <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{errors.submit}</p>
          </div>
        )}

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full bg-white text-blue-900 hover:bg-blue-50 border-0 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !isFormValidForSubmit()}
        >
          Create account
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800/50 text-slate-400">or</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          </svg>
          Google
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
          disabled={isLoading}
        >
          <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-slate-400">
          Already have an account?{" "}
          <Link 
            href="/auth/login" 
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  );
};
