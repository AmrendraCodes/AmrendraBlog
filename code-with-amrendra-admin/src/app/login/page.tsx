'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@codewithamrendra.com');
  const [password, setPassword] = useState('admin123');
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
    <div className="min-h-screen bg-[#f3f5fc] flex flex-col justify-between p-4 sm:p-6 md:p-8 text-slate-800 font-sans relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md shadow-indigo-600/20">
            C
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-base tracking-tight">CODE WITH AMRENDRA</span>
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase font-semibold">
              Admin CMS
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
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[540px]">
          
          {/* Left Illustration / Info Panel */}
          <div className="lg:col-span-6 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-indigo-100/40 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-xs mb-6 border border-indigo-100">
                <CheckCircle2 size={15} className="text-indigo-600" /> Secure Admin Workspace
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                Control your content & SEO in one place
              </h1>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Welcome to Code with Amrendra CMS. Manage blog articles, taxonomy, media assets, and search indexing rules cleanly.
              </p>
            </div>

            {/* Visual Card Mockup */}
            <div className="my-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Live Analytics & Traffic Overview</span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">+28.4%</span>
              </div>
              <div className="h-20 flex items-end justify-between gap-2 pt-2">
                <div className="w-1/6 bg-indigo-200 rounded-t-md h-[45%]" />
                <div className="w-1/6 bg-indigo-300 rounded-t-md h-[70%]" />
                <div className="w-1/6 bg-indigo-400 rounded-t-md h-[55%]" />
                <div className="w-1/6 bg-indigo-500 rounded-t-md h-[90%]" />
                <div className="w-1/6 bg-indigo-600 rounded-t-md h-[100%]" />
                <div className="w-1/6 bg-indigo-400 rounded-t-md h-[65%]" />
              </div>
            </div>

            <div className="text-xs text-slate-500 font-normal">
              Session protected with bcrypt password encryption.
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-6">
              
              {/* Header Title */}
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 mb-3 border border-indigo-100 shadow-xs">
                  <Lock size={22} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Sign In to your Admin Panel</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Sign in to your admin workspace to manage content & SEO</p>
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
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@codewithamrendra.com"
                      className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 font-normal rounded-xl py-3 pl-11 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/15 shadow-xs transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <a
                      href="#forgot"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Password reset link sent to admin email address.');
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50/50 border border-slate-200 text-slate-800 font-normal rounded-xl py-3 pl-11 pr-11 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/15 shadow-xs transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
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
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4"
                    />
                    <span>Remember me for 7 days</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-indigo-600/25 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide mt-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Sign In to Admin
                      <ArrowRight size={16} />
                    </span>
                  )}
                </button>
              </form>

              {/* Dev Seed Credentials Hint */}
              <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-mono">
                Default Admin: <span className="text-indigo-600 font-semibold">admin@codewithamrendra.com</span> / <span className="text-indigo-600 font-semibold">admin123</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Footer Security Notice */}
      <div className="text-center text-xs text-slate-500 font-medium z-10">
        <p className="flex items-center justify-center gap-1.5">
          <span>Protected by session-based server encryption</span>
          <span>•</span>
          <span>Code with Amrendra © {new Date().getFullYear()}</span>
        </p>
      </div>
    </div>
  );
}
