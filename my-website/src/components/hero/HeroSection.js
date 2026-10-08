import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden border-b border-slate-200 dark:border-[#1E293B] transition-colors duration-200">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 dark:opacity-30 pointer-events-none" />

      {/* Central Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none transition-colors duration-200" />

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] mb-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          AI AGENTS + SEO TECHNICAL WRITING
        </div>

        {/* Main Headline (Exactly one H1 on the page) */}
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 text-[#0B1F3A] dark:text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Save Hours Every Week with AI Agents. Get Found by Customers Who Are Ready to Buy.
        </h1>

        {/* Subtitle Description */}
        <div className="max-w-3xl mb-8 px-6 sm:px-8 py-5 rounded-2xl bg-white/80 dark:bg-[#0B1F3A]/70 border border-slate-200 dark:border-[#1E293B] shadow-sm backdrop-blur-md">
          <p className="text-base sm:text-lg text-slate-700 dark:text-[#F8FAFC] leading-relaxed font-medium [text-wrap:balance]">
            I build custom AI agents that take repetitive work off your team, and write technical SEO content that turns search traffic into leads. Both are built around your business goals, not around tools or trends.
          </p>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6">
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base transition-colors duration-200 shadow-[0_0_25px_rgba(245,158,11,0.3)] w-full sm:w-auto no-underline"
            >
              <span>Book a Free Strategy Call</span>
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>

          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="#process"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-white dark:bg-[#071324] text-[#0B1F3A] dark:text-[#F8FAFC] font-bold text-base transition-colors duration-200 hover:border-[#F59E0B] hover:text-[#F59E0B] hover:bg-slate-50 dark:hover:bg-[#112240] w-full sm:w-auto shadow-sm no-underline"
            >
              <span>See How It Works</span>
            </Link>
          </MagneticButton>
        </div>

        {/* Trust Line */}
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-[#94A3B8] max-w-xl">
          Work directly with the engineer-writer. No account managers. No junior handoffs.
        </p>
      </div>
    </section>
  );
}
