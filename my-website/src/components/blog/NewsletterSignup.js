"use client";

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error, duplicate

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      if (email.includes('error')) {
        setStatus('error');
      } else if (email.includes('duplicate')) {
        setStatus('duplicate');
      } else {
        setStatus('success');
      }
    }, 1000);
  };

  return (
    <section className="py-24 px-6 lg:px-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">The best of the blog, in your inbox.</h2>
        <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
          No noise. No daily spam. Just one curated email every week — the top articles, ideas, and links worth your time.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Your email address"
              className="grow px-5 py-3 rounded-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-6 py-3 bg-[#10B981] text-white rounded-full font-semibold hover:bg-[#059669] transition-colors disabled:opacity-70 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe — it\'s free'}
            </button>
          </div>
          
          <div className="h-6 mt-3 text-sm font-medium">
            {status === 'success' && <p className="text-emerald-400">You're in! Check your inbox for a welcome note.</p>}
            {status === 'error' && <p className="text-rose-400">Something went wrong — try again or email us directly.</p>}
            {status === 'duplicate' && <p className="text-[#34D399]">Looks like you're already subscribed. Great taste.</p>}
          </div>
        </form>

        <p className="text-sm text-slate-400">
          No credit card. Unsubscribe anytime. 4,200+ readers already in.
        </p>
      </div>
    </section>
  );
}
