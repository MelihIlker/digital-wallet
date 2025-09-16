"use client";

import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { DashboardHome } from '../../components/dashboard/DashboardHome';

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <DashboardSidebar />
      <main className="flex-1">
        <DashboardHome />
      </main>
    </div>
  );
}
