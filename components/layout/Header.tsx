"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Logo size="sm" />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/features" className="text-white hover:text-white transition-colors font-semibold">
              <span className="relative inline-flex items-center">
                Features
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-blue-900">New</span>
              </span>
            </Link>
            <Link href="/security" className="text-white/80 hover:text-white transition-colors">
              Security
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="primary" size="sm" className="bg-white text-blue-900 hover:bg-blue-50 border-0 font-semibold">
                Get started
              </Button>
            </Link>
          </div>
          
          {/* Mobile Buttons - Hidden when menu is open */}
          <div className={`lg:hidden flex items-center space-x-2 ${mobileMenuOpen ? 'hidden' : ''}`}>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20 text-xs px-3 py-1">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="primary" size="sm" className="bg-white text-blue-900 hover:bg-blue-50 border-0 font-semibold text-xs px-3 py-1">
                Start
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/20 bg-slate-900/95 backdrop-blur-sm rounded-lg -mx-4 px-4">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link href="/features" className="text-white hover:text-white transition-colors font-semibold">
                <span className="relative inline-flex items-center">
                  Features
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white text-blue-900">New</span>
                </span>
              </Link>
              <Link href="/security" className="text-white/80 hover:text-white transition-colors">
                Security
              </Link>
              <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
                Pricing
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="w-full text-white/80 hover:text-white hover:bg-white/10 border border-white/20">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm" className="w-full bg-white text-blue-900 hover:bg-blue-50 border-0 font-semibold">
                    Get started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
