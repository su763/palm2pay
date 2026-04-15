'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <nav className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <HandIcon className="w-10 h-10 text-indigo-500" />
            <span className="text-2xl font-bold text-white">Palm2Pay</span>
          </div>
          <div className="flex gap-6">
            <Link href="/login" className="text-gray-300 hover:text-white">
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              The Future of Payment is in Your{' '}
              <span className="text-indigo-500">Palm</span>
            </h1>
            <p className="text-xl text-gray-400 mt-6">
              Eliminate checkout friction. Pay securely by simply hovering your
              palm over any Palm2Pay terminal. No cards, no phone, no wallet needed.
            </p>
            <div className="flex gap-4 mt-8">
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700"
              >
                Start Using Palm2Pay
              </Link>
              <Link
                href="#how-it-works"
                className="border border-gray-600 text-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" />
              <HandScanIllustration className="w-80 h-80 relative z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0f0f1a]" id="how-it-works">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<RegisterIcon />}
              title="1. Enroll Your Palm"
              description="Scan your palm using our secure mobile app. Your biometric data is encrypted and stored safely."
            />
            <FeatureCard
              icon={<LinkIcon />}
              title="2. Link Payment Method"
              description="Connect your credit card or bank account. Your funds are protected with bank-level security."
            />
            <FeatureCard
              icon={<PayIcon />}
              title="3. Pay with Palm"
              description="At checkout, simply hover your palm over the scanner. Payment complete in seconds."
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <ShieldIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Bank-Level Security
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Your biometric data is encrypted end-to-end. We use advanced liveness
              detection to prevent fraud, and your palm template can never be
              reverse-engineered to recreate your hand.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SecurityBadge title="PCI-DSS Compliant" />
              <SecurityBadge title="End-to-End Encryption" />
              <SecurityBadge title="Liveness Detection" />
              <SecurityBadge title="Fraud Monitoring" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Leave Your Wallet Behind?
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Join thousands of users who are already paying with their palms.
          </p>
          <Link
            href="/register"
            className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0f0f1a] border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <HandIcon className="w-8 h-8 text-indigo-500" />
              <span className="text-xl font-bold text-white">Palm2Pay</span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-8">
            © 2026 Palm2Pay. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#1a1a2e] p-8 rounded-2xl"
    >
      <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function SecurityBadge({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <CheckIcon className="w-6 h-6 text-green-500" />
      <span className="text-gray-300">{title}</span>
    </div>
  );
}

// Icons
function HandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V4a2 2 0 0 1 2-2zm-4 4a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V8a2 2 0 0 1 2-2zm8 0a2 2 0 0 1 2 2v6a2 2 0 0 1-4 0V8a2 2 0 0 1 2-2zm-4 8a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0v-2a4 4 0 0 0-4-4z" />
    </svg>
  );
}

function HandScanIllustration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="80" stroke="#6366f1" strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="60" stroke="#6366f1" strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <path d="M100 40 L100 70 M100 130 L100 160 M40 100 L70 100 M130 100 L160 100" stroke="#6366f1" strokeWidth="2" />
      <ellipse cx="100" cy="100" rx="40" ry="50" fill="#6366f1" opacity="0.2" />
      <path d="M80 80 Q100 60 120 80 Q130 100 120 120 Q100 140 80 120 Q70 100 80 80" stroke="#6366f1" strokeWidth="2" fill="none" />
    </svg>
  );
}

function RegisterIcon() {
  return (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function PayIcon() {
  return (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
