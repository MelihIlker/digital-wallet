"use client";

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export const DashboardHome = () => {
  const fullname = "Jane Doe";
  const balance = 12482.50;
  const currency = 'USD';
  const transactions = [
    { id: 1, type: 'Transfer', desc: 'Jane D.', amount: -120, date: 'Yesterday', status: 'Completed' },
    { id: 2, type: 'Payment', desc: 'Stripe', amount: -42, date: 'Today', status: 'Completed' },
    { id: 3, type: 'Deposit', desc: 'Bank', amount: 500, date: '2 days ago', status: 'Pending' },
  ];


  // Sample spending analytics
  const spending = [
    { month: 'July', amount: 1200 },
    { month: 'August', amount: 950 },
    { month: 'September', amount: 670 },
  ];

  // Sample linked accounts
  const linkedAccounts = [
    { id: 1, type: 'Card', name: 'Visa **** 1234', status: 'Active' },
    { id: 2, type: 'Bank', name: 'Bank of America', status: 'Active' },
  ];

  return (
  <div className="p-2 sm:p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-900 via-blue-950 to-blue-900 relative flex justify-center">
      {/* SVG Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-4xl flex flex-col items-center mx-auto"
      >
        {/* Personalized Welcome */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4 w-full flex justify-center">
          <div className="text-2xl font-bold text-white text-center">Welcome, {fullname}!</div>
        </motion.div>
        {/* Ad Banner */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 w-full flex justify-center">
          <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 rounded-2xl sm:rounded-full p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between shadow-lg w-full max-w-xl">
            <div>
              <div className="text-white text-lg font-bold">Get 5% cashback on your next transfer!</div>
              <div className="text-blue-200 text-sm">Limited time offer for premium users.</div>
            </div>
            <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-xl shadow transition hover:bg-blue-100">Upgrade</button>
          </div>
        </motion.div>
        {/* Two columns: Balance & Analytics */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 w-full mb-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card variant="dark" className="shadow-xl backdrop-blur-lg w-full">
              <div className="flex flex-col items-center justify-center p-4 sm:p-6">
                <div className="text-blue-200 text-xs">Current Balance</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{balance.toLocaleString()} {currency}</div>
                <span className="inline-block bg-green-500 text-green-900 text-xs px-2 py-1 rounded-full font-medium mt-4">Active</span>
              </div>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Card variant="dark" className="w-full">
              <h2 className="text-lg font-semibold text-white mb-2 text-center">Spending Analytics</h2>
              <div className="flex gap-2 sm:gap-4 items-end h-20 sm:h-24 justify-center">
                {spending.map((s, i) => (
                  <div key={s.month} className="flex flex-col items-center justify-end h-full">
                    <div className={`w-6 sm:w-8 rounded-t-xl ${i === spending.length - 1 ? 'bg-blue-500' : 'bg-blue-800'} transition-all`} style={{ height: `${s.amount / 15}px` }}></div>
                    <span className="text-xs text-blue-200 mt-1">{s.month}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-blue-200 mt-2 text-center">Total: <span className="text-white font-bold">${spending.reduce((a, b) => a + b.amount, 0)}</span></div>
            </Card>
          </motion.div>
        </div>
        {/* Recent Transactions full width below */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="w-full">
          <Card variant="dark" className="shadow-lg w-full">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">Recent Transactions</h2>
            <div className="bg-slate-800/40 rounded-xl p-2 sm:p-4">
              {transactions.map((tx, i) => (
                <motion.div key={tx.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-3 border-b border-slate-700 last:border-b-0">
                  <div className="text-center sm:text-left">
                    <div className="font-medium text-white">{tx.type} • {tx.desc}</div>
                    <div className="text-xs text-blue-200">{tx.date} • {tx.status}</div>
                  </div>
                  <div className={`font-semibold ${tx.amount < 0 ? 'text-red-400' : 'text-green-400'} mt-2 sm:mt-0`}>{tx.amount > 0 ? '+' : ''}{tx.amount} {currency}</div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
  </motion.div>
    </div>
  );
};
