import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function BottomCtaSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFDF9] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-white border border-amber-400/40 p-8 sm:p-12 md:p-14 shadow-sm overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="max-w-2xl text-center lg:text-left z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9A4A00] bg-[#FFF3DC] px-4 py-1.5 rounded-full border border-amber-500/30 inline-block mb-3.5 shadow-2xs">
              START YOUR NEXT PROJECT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1B2433] tracking-tight mb-3">
              Need a Next.js Developer or an AI Agent Built?
            </h2>
            <p className="text-base sm:text-lg text-[#1B2433]/75 leading-relaxed">
              Let&apos;s discuss your requirements and launch your next high-performance product.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto z-10">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#F5A00B] hover:bg-[#E08F00] text-[#1B2433] font-bold text-base transition-colors duration-200 shadow-sm w-full sm:w-auto no-underline"
            >
              <span>Start a Project Now</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-300 bg-white text-[#1B2433] font-bold text-base transition-colors duration-200 hover:border-amber-400 hover:text-[#9A4A00] w-full sm:w-auto no-underline shadow-2xs"
            >
              <span>View Services &amp; Stack</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}