import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-sm',
    md: 'w-8 h-8 text-lg',
    lg: 'w-10 h-10 text-xl'
  };
  
  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };
  
  return (
    <Link href="/" className={`inline-flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold">D</span>
      </div>
      {showText && (
        <span className={`font-bold text-white ${textSizeClasses[size]}`}>
          DigitalWallet
        </span>
      )}
    </Link>
  );
};
