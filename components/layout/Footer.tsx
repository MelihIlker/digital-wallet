import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Logo size="sm" className="mb-4" />
            <p className="text-slate-400 text-sm">
              Modern, secure and user-friendly digital wallet solution
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/features" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>Features</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-blue-900">New</span>
                </Link>
              </li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2025 DigitalWallet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
