"use client";

import { Shield, Lock, Eye, UserCheck, Fingerprint, Key, CheckCircle, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8" />,
      title: "End-to-End Encryption",
      description: "All your data is encrypted using industry-standard AES-256 encryption",
      details: "Your financial data is protected with military-grade encryption both in transit and at rest."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Multi-Factor Authentication",
      description: "Multiple layers of security to protect your account",
      details: "Two-factor authentication, biometric verification, and device-based security."
    },
    {
      icon: <Fingerprint className="w-8 h-8" />,
      title: "Biometric Security",
      description: "Use fingerprint and face recognition for secure access",
      details: "Advanced biometric authentication ensures only you can access your wallet."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "24/7 fraud detection and suspicious activity monitoring",
      details: "Our AI-powered systems monitor every transaction for unusual patterns."
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Identity Verification",
      description: "KYC compliance and identity verification for secure transactions",
      details: "Comprehensive identity verification to prevent fraud and ensure compliance."
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Secure Key Management",
      description: "Advanced cryptographic key management and storage",
      details: "Hardware Security Modules (HSM) protect your encryption keys."
    }
  ];

  const securityStats = [
    { value: "99.9%", label: "Uptime", icon: <CheckCircle className="w-6 h-6" /> },
    { value: "0", label: "Data Breaches", icon: <Shield className="w-6 h-6" /> },
    { value: "256-bit", label: "Encryption", icon: <Lock className="w-6 h-6" /> },
    { value: "24/7", label: "Monitoring", icon: <Eye className="w-6 h-6" /> }
  ];

  const complianceStandards = [
    "SOC 2 Type II Certified",
    "ISO 27001 Compliant",
    "PCI DSS Level 1",
    "GDPR Compliant",
    "CCPA Compliant",
    "Bank-level Security"
  ];

  const securityTips = [
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: "Use Strong Passwords",
      description: "Create unique, complex passwords for your account"
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Enable 2FA",
      description: "Always enable two-factor authentication for extra security"
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Monitor Activity",
      description: "Regularly check your transaction history and account activity"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Keep Software Updated",
      description: "Always use the latest version of our mobile app"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white z-10">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-slate-800/30 rounded-full backdrop-blur-sm">
                <Shield className="w-16 h-16" />
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Bank-Level Security
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Your financial security is our top priority. We use cutting-edge technology 
              and industry best practices to protect your digital assets.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="px-6 py-3 bg-slate-800/30 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-medium">🔒 256-bit Encryption</span>
              </div>
              <div className="px-6 py-3 bg-slate-800/30 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-medium">🛡️ SOC 2 Certified</span>
              </div>
              <div className="px-6 py-3 bg-slate-800/30 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-medium">🏆 Zero Breaches</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Stats */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 text-center bg-slate-800/30 backdrop-blur-sm border-slate-700 shadow-lg">
                  <div className="flex justify-center mb-3 text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-300">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced Security Features
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We implement multiple layers of security to ensure your digital wallet 
              remains safe from any threats.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-8 hover:shadow-xl transition-shadow duration-300 bg-slate-800/30 backdrop-blur-sm border border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 mr-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 mb-4">
                    {feature.description}
                  </p>
                  <p className="text-sm text-slate-400">
                    {feature.details}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Compliance & Certifications
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We meet and exceed industry standards for financial security and data protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceStandards.map((standard, index) => (
              <div key={index} className="flex items-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-lg shadow">
                <CheckCircle className="w-6 h-6 text-green-400 mr-4 flex-shrink-0" />
                <span className="text-white font-medium">
                  {standard}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Tips */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security Best Practices
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Follow these simple steps to keep your account secure and protect your digital assets.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityTips.map((tip, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-lg shadow-lg"
              >
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400 mr-4 flex-shrink-0">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-slate-300">
                    {tip.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Secure Digital Banking?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust our platform with their digital assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Now
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}