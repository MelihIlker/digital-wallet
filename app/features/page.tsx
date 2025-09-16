"use client";

import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import Features from '../../components/sections/Features';
import Link from 'next/link';
import { Button } from '../../components/ui/Button';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      <Header />

      <main className="relative z-10 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Features Hero */}
          <section className="text-center py-20 sm:py-28">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold">Built for every way you move money</h1>
            <p className="text-blue-100 max-w-3xl mx-auto mt-6 text-lg sm:text-xl">Powerful payments, simple APIs and secure custody — everything you need to accept payments, pay vendors and manage subscriptions in one place.</p>

            <div className="mt-8 flex justify-center gap-4">
              <Link href="/auth/register">
                <Button className="bg-white text-blue-900 px-6 py-3 rounded-md font-semibold">Get started</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="text-white border-white/30 px-6 py-3 rounded-md">Sign in</Button>
              </Link>
            </div>
          </section>

          {/* Features list */}
          <Features />

          {/* CTA */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl mt-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-white text-3xl sm:text-4xl font-bold mb-4">Ready to build with DigitalWallet?</h3>
              <p className="text-blue-100 mb-6">Sign up and explore the APIs, SDKs and docs to integrate payments quickly.</p>
              <div className="flex justify-center gap-4">
                <Link href="/auth/register">
                  <Button className="bg-white text-blue-900 px-6 py-3 rounded-md font-semibold">Create account</Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="text-white border-white/30 px-6 py-3 rounded-md">Sign in</Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
