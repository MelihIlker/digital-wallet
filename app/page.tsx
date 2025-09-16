"use client";

import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import Features from '../components/sections/Features';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <Header />
      
      {/* Main Content */}
      <main className="relative z-10 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero + CTA */}
          <section className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-12 sm:py-20 lg:py-28">
            <div className="text-white space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                Your money, simplified.
                <span className="block text-blue-200 mt-2">Secure digital wallet for individuals and businesses</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Store cards, send money globally, manage subscriptions and accept payments — all from a single, secure app built for speed and scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 border-0 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold shadow-lg hover:shadow-xl transition-all">
                      Get started — it&apos;s free
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/auth/login" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold backdrop-blur-sm transition-all">
                    Sign in
                  </Button>
                </Link>
              </div>

                <div className="flex items-center gap-6 mt-6 justify-center lg:justify-start">
                <div className="text-slate-400 text-sm">Trusted by</div>
                <Image src="/globe.svg" alt="logo" width={24} height={24} className="h-6 opacity-80" />
                <Image src="/vercel.svg" alt="logo" width={24} height={24} className="h-6 opacity-80" />
                <Image src="/next.svg" alt="logo" width={24} height={24} className="h-6 opacity-80" />
              </div>
            </div>

            <div className="flex justify-center lg:justify-end order-1 lg:order-2 w-full">
              <Card variant="dark" className="w-full max-w-md backdrop-blur-lg transform transition-all duration-700 hover:scale-105 hover:shadow-2xl">
                <div className="space-y-4 sm:space-y-6 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs">Available Balance</p>
                      <p className="text-3xl font-bold text-white">$12,482.50</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs">USD • Primary</p>
                      <span className="inline-block bg-green-500 text-green-900 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm">Payment • Stripe</p>
                        <p className="text-slate-400 text-xs">Today</p>
                      </div>
                      <div className="text-red-400 font-semibold">-$42.00</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm">Transfer • Sent</p>
                        <p className="text-slate-400 text-xs">Yesterday</p>
                      </div>
                      <div className="text-red-400 font-semibold">-$120.00</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <Features />

          {/* How it works */}
          <section className="py-12 sm:py-16 lg:py-20 bg-slate-900/30">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">How it works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-800/40 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center mx-auto mb-3">1</div>
                  <h4 className="text-white font-semibold mb-1">Create an account</h4>
                  <p className="text-slate-300 text-sm">Sign up in under a minute and verify your phone or email.</p>
                </div>
                <div className="p-6 bg-slate-800/40 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center mx-auto mb-3">2</div>
                  <h4 className="text-white font-semibold mb-1">Add funds</h4>
                  <p className="text-slate-300 text-sm">Top up via bank transfer or card and start sending money.</p>
                </div>
                <div className="p-6 bg-slate-800/40 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center mx-auto mb-3">3</div>
                  <h4 className="text-white font-semibold mb-1">Send & receive</h4>
                  <p className="text-slate-300 text-sm">Pay contacts, businesses or withdraw to your bank with ease.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">What customers say</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 bg-slate-800/30 rounded-xl">
                  <p className="text-slate-300 italic">&ldquo;Fast, reliable and the fees are amazing — I moved my business payments here.&rdquo;</p>
                  <p className="text-slate-400 mt-4 font-semibold">— Ayşe K.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 bg-slate-800/30 rounded-xl">
                  <p className="text-slate-300 italic">&ldquo;I love the mobile app UI and instant transfers — saves me so much time.&rdquo;</p>
                  <p className="text-slate-400 mt-4 font-semibold">— John D.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 bg-slate-800/30 rounded-xl">
                  <p className="text-slate-300 italic">&ldquo;Easy onboarding and great customer support when I needed help.&rdquo;</p>
                  <p className="text-slate-400 mt-4 font-semibold">— Maria P.</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h3 className="text-white text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-blue-100 mb-6">Create an account and start managing your money with confidence.</p>
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
          
          {/* Features Section - Mobile First */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-12 sm:py-16 lg:py-20">
            <div className="text-center text-white opacity-0 animate-[fadeInUp_0.6s_ease-out_1.2s_forwards] hover:scale-105 transition-transform duration-300 cursor-pointer group">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-200 transition-colors duration-300">0.2%</div>
              <div className="text-slate-300 text-sm sm:text-base group-hover:text-slate-200 transition-colors duration-300">Avg. fee</div>
            </div>
            <div className="text-center text-white opacity-0 animate-[fadeInUp_0.6s_ease-out_1.4s_forwards] hover:scale-105 transition-transform duration-300 cursor-pointer group">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-green-200 transition-colors duration-300 animate-float">Instant</div>
              <div className="text-slate-300 text-sm sm:text-base group-hover:text-slate-200 transition-colors duration-300">Transfers</div>
            </div>
            <div className="text-center text-white opacity-0 animate-[fadeInUp_0.6s_ease-out_1.6s_forwards] hover:scale-105 transition-transform duration-300 cursor-pointer group">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-purple-200 transition-colors duration-300">256-bit</div>
              <div className="text-slate-300 text-sm sm:text-base group-hover:text-slate-200 transition-colors duration-300">Encryption</div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
