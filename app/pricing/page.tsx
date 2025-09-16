"use client";

import { Check, X, Star, Zap, Crown, Sparkles, TrendingUp, Users, Shield, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      period: "Forever",
      description: "Perfect for getting started with digital payments",
      features: [
        "1 Digital Wallet",
        "Basic Transactions",
        "Mobile App Access",
        "Email Support",
        "Standard Security",
        "Transaction History (30 days)"
      ],
      limitations: [
        "Monthly transaction limit: $500",
        "No priority support",
        "Basic fraud protection"
      ],
      buttonText: "Get Started",
      buttonStyle: "border-2 border-slate-500 text-slate-300 hover:bg-slate-700/50",
      popular: false,
      icon: <Users className="w-8 h-8" />
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "For individuals who need more advanced features",
      features: [
        "3 Digital Wallets",
        "Unlimited Transactions",
        "Mobile & Web App",
        "Priority Email Support",
        "Advanced Security",
        "Transaction History (1 year)",
        "Real-time Notifications",
        "Multi-currency Support",
        "Expense Analytics"
      ],
      limitations: [
        "Monthly transaction limit: $10,000"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
      popular: true,
      icon: <Star className="w-8 h-8" />
    },
    {
      name: "Business",
      price: "$29.99",
      period: "per month",
      description: "Designed for businesses and teams",
      features: [
        "Unlimited Wallets",
        "Unlimited Transactions",
        "All Platform Access",
        "24/7 Phone Support",
        "Enterprise Security",
        "Unlimited History",
        "Real-time Notifications",
        "Multi-currency Support",
        "Advanced Analytics",
        "Team Management",
        "API Access",
        "Custom Integrations"
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonStyle: "bg-purple-600 text-white hover:bg-purple-700",
      popular: false,
      icon: <Crown className="w-8 h-8" />
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Level Security",
      description: "256-bit encryption and multi-factor authentication"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Transfers",
      description: "Send and receive money in seconds, not days"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-time Analytics",
      description: "Track your spending patterns and financial goals"
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Get help whenever you need it from our expert team"
    }
  ];

  const faqItems = [
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate your billing accordingly."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 14-day free trial for our Premium and Business plans. No credit card required to get started."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. You'll continue to have access to premium features until the end of your billing period."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "This digital wallet has revolutionized how I handle my business finances. The analytics are incredibly helpful!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Freelancer",
      content: "The instant transfers and multi-currency support make working with international clients so much easier.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Financial Advisor",
      content: "I recommend this platform to all my clients. The security features give everyone peace of mind.",
      rating: 5
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
                <Sparkles className="w-16 h-16" />
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
            >
              Choose the perfect plan for your needs. Start free and upgrade 
              as you grow. No hidden fees, no surprises.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              <div className="px-6 py-3 bg-slate-800/30 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-medium">💳 14-day free trial • No credit card required</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className={plan.popular ? 'z-10' : ''}
              >
                <Card 
                  className={`relative p-8 ${plan.popular ? 'ring-2 ring-blue-400 shadow-2xl scale-105' : 'shadow-lg'} bg-slate-800/30 backdrop-blur-sm border border-slate-700`}
                >
                  {plan.popular && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full">
                        Most Popular
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="text-center mb-8">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="flex justify-center mb-4 text-blue-400"
                    >
                      {plan.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      {plan.period !== "Forever" && (
                        <span className="text-slate-300 ml-2">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={featureIndex} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 + featureIndex * 0.1 + 0.5 }}
                        className="flex items-center"
                      >
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-slate-300">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <motion.div 
                        key={limitIndex} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 + (plan.features.length + limitIndex) * 0.1 + 0.5 }}
                        className="flex items-center"
                      >
                        <X className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                        <span className="text-slate-400 text-sm">
                          {limitation}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </motion.button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              All plans include these powerful features designed to make your financial life easier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="p-4 bg-blue-500/20 rounded-full text-blue-400"
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-slate-300">
              Join thousands of satisfied users who trust our platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="flex mb-4"
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </motion.div>
                  <p className="text-slate-300 mb-4 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-300">
              Got questions? We&apos;ve got answers.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-300">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already managing their finances smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No credit card required • Cancel anytime • 14-day free trial
          </p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}