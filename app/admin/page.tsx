"use client";

import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminDashboardHome } from '../../components/admin/AdminDashboardHome';

function AdminContent() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex transition-colors ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900'
        : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100'
    }`}>
      <AdminSidebar />
      <main className="flex-1 bg-transparent">
        <AdminDashboardHome />
      </main>
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <ThemeProvider>
      <AdminContent />
    </ThemeProvider>
  );
}
