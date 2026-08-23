'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

export default function HomeCtaBanner() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <div className="relative rounded-3xl bg-[#0B1F3A] border-2 border-[#F59E0B] p-10 sm:p-16 text-center shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/20 px-4 py-1.5 rounded-full border border-[#F59E0B]/40 mb-6 inline-block">
          READY TO SCALE
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight max-w-3xl mx-auto">
          Your Site &amp; SaaS Is Running Right Now. <br />
          <span className="text-[#F59E0B]">Is It Performing at Its Peak?</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
          Partner with Code with Amrendra to engineer high-velocity web platforms, automate workflows with AI, and unlock cloud performance across your entire stack.
        </p>

        <MagneticButton>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-extrabold text-base transition-all duration-300 shadow-[0_0_40px_rgba(245,158,11,0.4)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] active:scale-95 hover:scale-105"
          >
            <span>Get Started Today</span>
            <ArrowRight size={20} />
          </Link>
        </MagneticButton>
      </div>
    </section>
  );
}
