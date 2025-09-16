import React from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminDashboardHome } from "./AdminDashboardHome";

export const AdminDashboardLayout: React.FC = () => (
  <div className="flex min-h-screen bg-slate-950">
    <AdminSidebar />
    <main className="flex-1 p-8 overflow-y-auto">
      <AdminDashboardHome />
    </main>
  </div>
);
