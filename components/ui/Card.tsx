"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'transparent';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'dark',
  ...motionProps
}) => {
  const variantClasses = {
    default: 'bg-white border border-slate-200 shadow-xl',
    dark: 'bg-slate-800/50 border border-slate-600 backdrop-blur-sm',
    transparent: 'bg-transparent'
  };
  
  return (
    <motion.div
      {...motionProps}
      className={`rounded-2xl p-6 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
