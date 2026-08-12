'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Lock, ArrowRight, ArrowLeft, ShieldAlert, CheckCircle2, Globe, AlertTriangle } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [validatingToken, setValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    let isMounted = true;

    async function validateToken() {
      if (!token) {
        if (isMounted) {
          setValidatingToken(false);
          setTokenValid(false);
          setTokenError('Missing reset token. Please check your reset link.');
        }
        return;
      }

      try {
        const res = await fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (isMounted) {
          if (res.ok && data.valid) {
            setTokenValid(true);
          } else {
            setTokenValid(false);
            setTokenError(data.error || 'This password reset link is invalid or has expired. Please request a new one.');
          }
        }
      } catch {
        if (isMounted) {
          setTokenValid(false);
          setTokenError('Connection error. Please try again.');
        }
      } finally {
        if (isMounted) {
          setValidatingToken(false);
        }
      }
    }

    validateToken();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error?.message || 'Failed to update password. Please try again.');
        setLoading(false);
        return;
      }

      setSuccessMessage('Password updated successfully.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch {
      setError('Connection error. Please check your network.');
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

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center py-8 sm:py-12 z-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-center">
          <div className="w-full space-y-6">

            {validatingToken ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-600">Validating password reset link...</p>
              </div>
            ) : !tokenValid ? (
              /* Invalid or Expired Token State */
              <div className="space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4 shadow-xs">
                    <AlertTriangle size={22} className="text-amber-600" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Link Expired or Invalid</h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    {tokenError || 'This password reset link is invalid or has expired. Please request a new one.'}
                  </p>
                </div>

                <Link
                  href="/forgot-password"
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-indigo-600/20 transition text-sm tracking-wide"
                >
                  Request a new reset link
                  <ArrowRight size={16} />
                </Link>

                <div className="text-center pt-2">
                  <Link href="/login" className="text-xs text-slate-500 hover:text-indigo-600 font-semibold">
                    ← Back to CWA CMS Login
                  </Link>
                </div>
              </div>
            ) : successMessage ? (
              /* Success State */
              <div className="space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-4 shadow-xs">
                    <CheckCircle2 size={24} className="text-emerald-600" />
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Password Updated</h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                    Your password has been reset successfully. All active sessions have been invalidated.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center">
                  Redirecting to Login page...
                </div>

                <Link
                  href="/login"
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition text-sm"
                >
                  Sign In Now
                  <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              /* Reset Password Form */
              <>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-4 shadow-xs">
                    <Lock size={22} className="text-indigo-600" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Create a new password</h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Choose a strong password for your CWA CMS account.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center gap-2.5 shadow-xs">
                    <ShieldAlert size={16} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 8 characters"
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

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full bg-slate-50/60 border border-slate-200 text-slate-800 font-medium rounded-xl py-3 pl-11 pr-11 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/15 shadow-xs transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-indigo-600/20 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm tracking-wide mt-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating Password...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Update Password
                        <ArrowRight size={16} />
                      </span>
                    )}
                  </button>

                  <div className="pt-3 text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 font-semibold transition"
                    >
                      <ArrowLeft size={14} />
                      Cancel & Return to Login
                    </Link>
                  </div>
                </form>
              </>
            )}

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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f6fc] flex items-center justify-center p-4">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
