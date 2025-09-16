'use client';

import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    // Calculate score
    if (checks.length) score += 20;
    if (checks.lowercase) score += 20;
    if (checks.uppercase) score += 20;
    if (checks.number) score += 20;
    if (checks.special) score += 20;

    return { score, checks };
  };

  const { score, checks } = getPasswordStrength(password);

  const getStrengthColor = (score: number) => {
    if (score <= 20) return 'bg-red-500';
    if (score <= 40) return 'bg-orange-500';
    if (score <= 60) return 'bg-yellow-500';
    if (score <= 80) return 'bg-lime-500';
    return 'bg-green-500';
  };

  const getStrengthText = (score: number) => {
    if (score <= 20) return 'Very weak';
    if (score <= 40) return 'Weak';
    if (score <= 60) return 'Fair';
    if (score <= 80) return 'Good';
    return 'Strong';
  };

  const getStrengthTextColor = (score: number) => {
    if (score < 40) return 'text-red-400';
    if (score < 60) return 'text-orange-400';
    if (score < 80) return 'text-yellow-400';
    return 'text-green-400';
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-slate-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`text-xs font-medium ${getStrengthTextColor(score)}`}>
          {getStrengthText(score)}
        </span>
      </div>

      {/* Requirements */}
      <div className="grid grid-cols-2 gap-1 text-xs">
        <div className={`flex items-center space-x-1 ${checks.length ? 'text-green-400' : 'text-slate-400'}`}>
          <svg className={`w-3 h-3 ${checks.length ? 'text-green-400' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>8+ characters</span>
        </div>
        <div className={`flex items-center space-x-1 ${checks.lowercase ? 'text-green-400' : 'text-slate-400'}`}>
          <svg className={`w-3 h-3 ${checks.lowercase ? 'text-green-400' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Lowercase</span>
        </div>
        <div className={`flex items-center space-x-1 ${checks.uppercase ? 'text-green-400' : 'text-slate-400'}`}>
          <svg className={`w-3 h-3 ${checks.uppercase ? 'text-green-400' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Uppercase</span>
        </div>
        <div className={`flex items-center space-x-1 ${checks.number ? 'text-green-400' : 'text-slate-400'}`}>
          <svg className={`w-3 h-3 ${checks.number ? 'text-green-400' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Number</span>
        </div>
        <div className={`flex items-center space-x-1 ${checks.special ? 'text-green-400' : 'text-slate-400'}`}>
          <svg className={`w-3 h-3 ${checks.special ? 'text-green-400' : 'text-slate-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Special char</span>
        </div>
      </div>
    </div>
  );
};
