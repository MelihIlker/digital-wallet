import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const AdminDashboardHome: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="p-8 space-y-8">
      <h1 className={`text-3xl font-bold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Welcome to Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`rounded-xl p-6 border transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800 shadow-lg'
            : 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 hover:shadow-blue-100'
        }`}>
          <div className={`text-sm mb-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}>Total Users</div>
          <div className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>1,234</div>
        </div>
        <div className={`rounded-xl p-6 border transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800 shadow-lg'
            : 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 hover:shadow-blue-100'
        }`}>
          <div className={`text-sm mb-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}>Total Transactions</div>
          <div className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-green-400' : 'text-blue-600'
          }`}>12,345</div>
        </div>
        <div className={`rounded-xl p-6 border transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800 shadow-lg'
            : 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 hover:shadow-blue-100'
        }`}>
          <div className={`text-sm mb-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}>Total Wallets</div>
          <div className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'
          }`}>567</div>
        </div>
        <div className={`rounded-xl p-6 border transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800 shadow-lg'
            : 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 hover:shadow-blue-100'
        }`}>
          <div className={`text-sm mb-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}>Rate Limit Events</div>
          <div className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-red-400' : 'text-blue-600'
          }`}>42</div>
        </div>
        <div className={`rounded-xl p-6 border transition-all duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800 shadow-lg'
            : 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300 hover:shadow-blue-100'
        }`}>
          <div className={`text-sm mb-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
          }`}>Bot Attacks Blocked</div>
          <div className={`text-2xl font-bold ${
            theme === 'dark' ? 'text-pink-400' : 'text-blue-600'
          }`}>17</div>
        </div>
      </div>
    </div>
  );
};
