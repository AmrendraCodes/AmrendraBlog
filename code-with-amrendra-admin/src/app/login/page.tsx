'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

      // Respect callbackUrl safely (prevent open-redirect by validating relative path)
      const callback = searchParams.get('callbackUrl');
      const targetUrl = callback && callback.startsWith('/') && !callback.startsWith('//')
        ? callback
        : '/dashboard';

      router.push(targetUrl);
    } catch {
      setError('Network connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[460px]">
      {/* Floating Elevated Card */}
      <div className="bg-white dark:bg-[#1b1c2e] border border-slate-200/90 dark:border-[#2b2e46] rounded-3xl shadow-2xl shadow-slate-200/80 dark:shadow-black/60 p-7 sm:p-10 backdrop-blur-md transition-colors duration-300">
        {/* Centered Brand Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#4945ff] to-[#7b78ff] flex items-center justify-center shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-500/10 transform transition-transform hover:scale-105">
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" opacity="0.8" />
              <path d="M2 12L12 17L22 12V7L12 12L2 7V12Z" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="text-center mb-7">
          <h1 className="text-2xl sm:text-[28px] font-black text-slate-900 dark:text-white tracking-tight">
            Welcome to CWA Admin Panel!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-normal">
            Log in to your administrator account
          </p>
        </div>

        {/* Error Alert Banner */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-300 text-xs font-medium flex items-center gap-2.5 animate-in fade-in duration-200">
            <ShieldAlert size={16} className="text-red-500 dark:text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 tracking-wide"
            >
              Email<span className="text-rose-500 ml-0.5">*</span>
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              autoComplete="email"
              className="w-full bg-slate-50 dark:bg-[#141522] text-slate-900 dark:text-white font-medium rounded-xl py-3 px-4 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#2b2e46] focus:border-indigo-500 focus:bg-white dark:focus:bg-[#181928] focus:outline-none focus:ring-3 focus:ring-indigo-500/20 shadow-xs transition duration-150"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 tracking-wide"
            >
              Password<span className="text-rose-500 ml-0.5">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-slate-50 dark:bg-[#141522] text-slate-900 dark:text-white font-medium rounded-xl py-3 pl-4 pr-11 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#2b2e46] focus:border-indigo-500 focus:bg-white dark:focus:bg-[#181928] focus:outline-none focus:ring-3 focus:ring-indigo-500/20 shadow-xs transition duration-150"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2.5 cursor-pointer font-medium select-none text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-[#4945ff] focus:ring-[#4945ff] focus:ring-offset-0 cursor-pointer accent-[#4945ff]"
              />
              <span>Remember me</span>
            </label>
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-[#4945ff] hover:bg-[#3d39f5] active:bg-[#332fe0] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/45 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Login</span>
                <ArrowRight size={16} />
              </span>
            )}
          </button>
        </form>
      </div>

      {/* Centered Forgot Password Link (Below the Card) */}
      <div className="text-center mt-6">
        <Link
          href="/forgot-password"
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition hover:underline"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] dark:bg-[#11121d] text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-8 font-sans relative overflow-hidden transition-colors duration-300 selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* Top Header Bar */}
      <header className="flex items-center justify-between max-w-6xl w-full mx-auto z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4945ff] via-[#5c58ff] to-[#807dff] flex items-center justify-center shadow-md shadow-indigo-500/25 text-white font-black text-sm select-none">
            C
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
              CWA Admin Panel
            </span>
          </div>
        </div>

        {/* Top-Right Controls: Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle variant="compact" />
        </div>
      </header>

      {/* Main Centered Login Container */}
      <main className="flex-1 flex items-center justify-center py-8 sm:py-12 z-10">
        <Suspense fallback={<div className="w-full max-w-[460px] h-96 rounded-3xl bg-white/50 dark:bg-[#1b1c2e]/50 animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </main>

      {/* Subtle Footer */}
      <footer className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium z-10 py-2">
        <p>© {new Date().getFullYear()} Code with Amrendra. Enterprise Content Management System.</p>
      </footer>
    </div>
  );
}
