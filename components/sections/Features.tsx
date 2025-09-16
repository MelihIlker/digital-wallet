"use client";

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Fast Transfers',
    desc: 'Send money instantly to friends and businesses with minimal fees.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M21 12v-2a2 2 0 0 0-2-2h-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 12v2a2 2 0 0 0 2 2h6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 8l10 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Secure Storage',
    desc: 'PCI-compliant card storage and bank-level encryption for your funds.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="7" width="18" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 11a4 4 0 00-8 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Business Tools',
    desc: 'Create invoices, handle payouts and manage subscriptions from one place.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2v6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 11h14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 21h10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-white text-2xl sm:text-3xl font-bold text-center mb-8">Everything you need to manage money</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-slate-800/40 p-6 rounded-xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.1, duration: 0.45 }}
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 rounded-md bg-slate-900/30">{f.icon}</div>
                <h3 className="text-white font-semibold">{f.title}</h3>
              </div>
              <p className="text-slate-300 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
