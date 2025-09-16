import React from "react";
import Link from "next/link";
import { FaUsers, FaExchangeAlt, FaWallet, FaShieldAlt, FaRobot, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/contexts/ThemeContext";

const sidebarItems = [
  { label: "Users", icon: <FaUsers />, href: "/admin/dashboard/users" },
  { label: "Transactions", icon: <FaExchangeAlt />, href: "/admin/dashboard/transactions" },
  { label: "Wallets", icon: <FaWallet />, href: "/admin/dashboard/wallets" },
  { label: "Rate Limits", icon: <FaShieldAlt />, href: "/admin/dashboard/rate-limits" },
  { label: "Bot Attacks", icon: <FaRobot />, href: "/admin/dashboard/bot-attacks" },
];

export const AdminSidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className={`w-64 min-h-screen flex flex-col border-r transition-colors ${
      theme === 'dark' 
        ? 'bg-slate-900 text-white border-slate-800' 
        : 'bg-white text-gray-800 border-gray-200'
    }`}>
      <div className={`p-6 font-bold text-2xl tracking-wide border-b ${
        theme === 'dark' ? 'border-slate-800 text-white' : 'border-gray-200 text-blue-600'
      }`}>
        Admin Panel
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href} 
                className={`flex items-center px-6 py-3 rounded-lg transition-colors mx-2 ${
                  theme === 'dark'
                    ? 'hover:bg-slate-800'
                    : 'hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Theme Toggle Button */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'bg-slate-800 hover:bg-slate-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <span className="mr-2">
            {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-white" />}
          </span>
          <span className="font-medium">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </aside>
  );
};
