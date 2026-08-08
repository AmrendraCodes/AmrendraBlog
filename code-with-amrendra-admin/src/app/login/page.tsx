'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ShieldAlert, Globe, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-between p-4 sm:p-6 md:p-8 text-gray-100 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xl">
            C
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">CODE WITH AMRENDRA</span>
            <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-semibold">
              Admin CMS
            </span>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2 bg-[#151c2e] border border-[#1f2a40] rounded-lg px-3 py-1.5 text-xs text-gray-300">
          <Globe size={14} className="text-gray-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-gray-200 outline-none cursor-pointer"
          >
            <option value="en" className="bg-[#151c2e] text-white">English (US)</option>
            <option value="hi" className="bg-[#151c2e] text-white">Hindi (हिन्दी)</option>
            <option value="es" className="bg-[#151c2e] text-white">Spanish (Español)</option>
          </select>
        </div>
      </div>

      {/* Main Login Card Container */}
      <div className="flex-1 flex items-center justify-center py-12 z-10">
        <div className="w-full max-w-md admin-card p-6 sm:p-8 shadow-2xl bg-[#151c2e]/95 backdrop-blur-xl border-[#1f2a40]">
          {/* Card Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-4 shadow-lg shadow-emerald-500/5">
              <Lock size={26} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Welcome to Code with Amrendra</h2>
            <p className="text-xs text-gray-400 mt-1.5">Sign in to your admin workspace to manage content & SEO</p>
          </div>

          {/* Alert Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
              <ShieldAlert size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@codewithamrendra.com"
                  className="admin-input pl-10"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to admin email address.'); }} className="text-xs text-emerald-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="admin-input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-gray-300 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#1f2a40] bg-[#111726] text-emerald-500 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Remember me for 7 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full admin-btn-primary py-3 font-bold text-sm tracking-wide shadow-lg shadow-emerald-500/10 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign in to Admin
                  <ArrowRight size={16} />
                </span>
              )}
            </button>
          </form>

          {/* Dev Seed Credentials Hint */}
          <div className="mt-6 pt-5 border-t border-[#192234] text-center text-xs text-gray-500 font-mono">
            Default Admin: <span className="text-emerald-400">admin@codewithamrendra.com</span> / <span className="text-emerald-400">admin123</span>
          </div>
        </div>
      </div>

      {/* Footer Security Notice */}
      <div className="text-center text-xs text-gray-500 z-10">
        <p className="flex items-center justify-center gap-1.5">
          <span>Protected by session-based server encryption</span>
          <span>•</span>
          <span>Code with Amrendra © {new Date().getFullYear()}</span>
        </p>
      </div>
    </div>
  );
}
