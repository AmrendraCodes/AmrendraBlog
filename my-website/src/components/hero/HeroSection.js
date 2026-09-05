import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 md:pb-16 overflow-hidden border-b border-slate-200 dark:border-[#1E293B] transition-colors duration-200">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 dark:opacity-30 pointer-events-none" />

      {/* Central Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none transition-colors duration-200" />

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] mb-6  shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] " />
          BEST-IN-CLASS SOFTWARE &amp; AI ENGINEERING
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-[#0B1F3A] dark:text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#F59E0B] dark:from-white dark:via-[#F8FAFC] dark:to-[#F59E0B] text-transparent bg-clip-text drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(245,158,11,0.3)]">
            Custom AI Development Services
          </span>{' '}
          for Businesses Built to Scale.
        </h1>

        {/* Subtitle Description Card (High Readability Backdrop) */}
        <div className="max-w-3xl mb-10 px-6 sm:px-8 py-4.5 rounded-2xl bg-white/90 dark:bg-[#0B1F3A]/85 border border-slate-200 dark:border-[#1E293B]  shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <p className="text-base sm:text-lg text-slate-700 dark:text-[#F8FAFC] leading-relaxed font-medium [text-wrap:balance]">
            Code with Amrendra delivers AI Development Services, Custom Software, SaaS Architecture &amp; Cloud Solutions that help modern businesses build faster.
          </p>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base transition-colors duration-200 shadow-[0_0_30px_rgba(245,158,11,0.35)]  w-full sm:w-auto  "
            >
              <span>Start Free Consultation</span>
              <ArrowRight size={18} className="transition-transform duration-200 " />
            </Link>
          </MagneticButton>

          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl border border-[#0B1F3A]/20 dark:border-[#1E293B] bg-white dark:bg-[#071324] text-[#0B1F3A] dark:text-[#F8FAFC] font-bold text-base transition-colors duration-200 hover:border-[#F59E0B] hover:text-[#F59E0B] hover:bg-slate-50 dark:hover:bg-[#112240] w-full sm:w-auto  shadow-sm"
            >
              Explore Our AI Services
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
