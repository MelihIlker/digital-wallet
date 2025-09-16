"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { validateEmail, validatePassword } from '../../utils/validation';

export const LoginForm: React.FC = () => {
  const [rateLimitReset, setRateLimitReset] = useState<number | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    if (!formData.password) {
  newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  React.useEffect(() => {
    if (rateLimitReset === null) return;
    if (rateLimitReset <= 0) {
      setRateLimitReset(null);
      setErrors(prev => ({ ...prev, general: "" }));
      return;
    }
    const timer = setTimeout(() => {
      setRateLimitReset((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(timer);
  }, [rateLimitReset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      setErrors({ general: 'Bot activity detected.' });
      return;
    }
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setErrors({});
    try {
      const fingerprint = await getFingerprint();
      const resp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password, fingerprint, honeypot: formData.honeypot }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        const msg = data?.message || data?.error || 'Login failed';
        if (msg.includes('Too many requests, please try again later')) {
          setRateLimitReset(60);
        } else {
          const match = /reset in (\d+) seconds/.exec(msg);
          if (match) {
            setRateLimitReset(Number(match[1]));
          }
        }
        setErrors({ ...errors, general: String(msg) });
        return;
      }
      if (data?.redirect) {
        router.push(data.redirect);
      }
    } catch (err) {
      console.error('Login request failed', err);
      setErrors({ ...errors, general: 'Network error, please try again' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="dark" className="w-full max-w-sm sm:max-w-md">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-slate-400 text-sm sm:text-base">Sign in to your account</p>
      </div>

      {errors.general && (
        <div className="mb-4 text-center text-red-400 font-semibold text-sm">
          {errors.general}
          {rateLimitReset !== null && rateLimitReset > 0 && (
            <div className="mt-2 text-xs text-slate-400">Try again in {rateLimitReset} seconds</div>
          )}
        </div>
      )}
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
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          placeholder="example@email.com"
          disabled={isLoading}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          placeholder="Enter your password"
          disabled={isLoading}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-400">
              Remember me
            </label>
          </div>
          
          <Link 
            href="/forgot-password" 
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full bg-white text-blue-900 hover:bg-blue-50 border-0 font-semibold"
          disabled={isLoading || (rateLimitReset !== null && rateLimitReset > 0)}
        >
          Sign in
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
          Don&apos;t have an account?{" "}
          <Link 
            href="/auth/register" 
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </Card>
  );
};
