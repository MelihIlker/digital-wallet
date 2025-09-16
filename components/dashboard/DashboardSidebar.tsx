"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Sample notifications for sidebar
const notifications = [
  { id: 1, type: 'Security', message: 'New device login detected', date: 'Today', status: 'info', read: false },
  { id: 2, type: 'Payment', message: 'Payment received from Stripe', date: 'Yesterday', status: 'success', read: false },
  { id: 3, type: 'Account', message: 'Password changed successfully', date: '2 days ago', status: 'success', read: true },
];
const unreadCount = notifications.filter(n => !n.read).length;

export const DashboardSidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white rounded-lg p-2 shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect y="5" width="24" height="2" rx="1" fill="currentColor"/><rect y="11" width="24" height="2" rx="1" fill="currentColor"/><rect y="17" width="24" height="2" rx="1" fill="currentColor"/></svg>
      </button>
      {/* Sidebar overlay for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)}></div>
      )}
      <aside className={`fixed md:static top-0 left-0 z-50 md:z-0 w-64 min-h-screen flex flex-col border-r border-slate-800 bg-gradient-to-b from-blue-900 via-blue-950 to-blue-900 text-white overflow-hidden transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
    {/* SVG Pattern */}
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="w-full h-full" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
    </div>
        <div className="relative px-6 py-8 text-2xl font-extrabold tracking-tight text-blue-200 flex items-center justify-between">
          DigitalWallet
          {/* Close button for mobile */}
          <button
            className="md:hidden ml-2 text-blue-200 bg-blue-950 rounded-lg p-1"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </div>
    <nav className="relative flex-1 px-6 space-y-2 z-10">
      {/* Notifications section in sidebar */}
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-blue-200">Notifications</span>
          <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">{unreadCount}</span>
        </div>
        <ul className="mb-4">
          {notifications.slice(0, 3).map(note => (
            <li key={note.id} className="flex items-center justify-between py-1 border-b border-slate-700 last:border-b-0">
              <span className={`font-medium ${note.status === 'success' ? 'text-green-400' : note.status === 'info' ? 'text-blue-400' : 'text-yellow-400'}`}>{note.type}</span>
              <span className="text-white text-xs truncate max-w-[100px]">{note.message}</span>
              <span className="text-xs text-blue-200">{note.date}</span>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
  <Link href="/user" className="block py-2 px-3 rounded-lg hover:bg-blue-800/60 font-semibold transition-colors">Home</Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
  <Link href="/user/transactions" className="block py-2 px-3 rounded-lg hover:bg-blue-800/60 font-semibold transition-colors">Transactions</Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
  <Link href="/user/profile" className="block py-2 px-3 rounded-lg hover:bg-blue-800/60 font-semibold transition-colors">Profile</Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
  <button className="block w-full text-left py-2 px-3 rounded-lg hover:bg-red-900/60 font-semibold mt-8 text-red-300 transition-colors">Logout</button>
      </motion.div>
    </nav>
    <div className="relative px-6 py-4 text-xs text-blue-300 mt-auto z-10">© 2025 DigitalWallet</div>
      </aside>
    </>
  );
};
