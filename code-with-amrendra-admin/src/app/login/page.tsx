'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Globe, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error?.message || 'Authentication failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] flex flex-col justify-between p-4 sm:p-6 md:p-8 text-slate-800 font-sans relative overflow-hidden">
      {/* Background Watermark Logo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <Image
          src="/logo-square.png"
          alt="Business Logo Watermark"
          width={480}
          height={480}
          className="opacity-[0.04] select-none filter blur-[0.3px] max-w-lg w-full object-contain"
          priority
        />
      </div>

      {/* Top Header Bar */}
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center overflow-hidden p-1.5 shrink-0">
            <Image
              src="/logo-square.png"
              alt="CWA Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-base tracking-tight">Code with Amrendra</span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase font-bold">
              CMS
            </span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 shadow-xs">
          <Globe size={15} className="text-slate-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-slate-700 font-medium outline-none cursor-pointer"
          >
            <option value="en" className="bg-white text-slate-700">English (US)</option>
            <option value="hi" className="bg-white text-slate-700">Hindi (हिन्दी)</option>
            <option value="es" className="bg-white text-slate-700">Spanish (Español)</option>
          </select>
        </div>
      </div>

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center py-8 sm:py-12 z-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-center">
          <div className="w-full space-y-6">
            
            {/* Header Icon & Title */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-4 shadow-xs">
                <Lock size={22} className="text-indigo-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">CWA CMS Login</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                Sign in to your workspace to manage your content, SEO, and website.
              </p>
            </div>

            {/* Alert Error Banner */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2.5 shadow-xs">
                <ShieldAlert size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-slate-50/60 border border-slate-200 text-slate-800 font-medium rounded-xl py-3 pl-11 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/15 shadow-xs transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-slate-50/60 border border-slate-200 text-slate-800 font-medium rounded-xl py-3 pl-11 pr-11 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/15 shadow-xs transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-medium select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-slate-700 font-medium">Remember me for 7 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-indigo-600/20 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide mt-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In to CWA CMS
                    <ArrowRight size={16} />
                  </span>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* Footer Notice */}
      <div className="text-center text-xs text-slate-500 font-medium z-10">
        <p>© {new Date().getFullYear()} Code with Amrendra. All rights reserved.</p>
      </div>
    </div>
  );
}
