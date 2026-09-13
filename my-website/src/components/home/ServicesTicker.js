'use client';

import React from 'react';

const TICKER_SERVICES = [
  'Custom Web Development',
  'AI & Automation Services',
  'SEO & Technical Content Writing',
];

// Repeat 3x within each group to comfortably exceed wide and ultra-wide displays
const GROUP_SERVICES = [
  ...TICKER_SERVICES,
  ...TICKER_SERVICES,
  ...TICKER_SERVICES,
];

export default function ServicesTicker() {
  return (
    <section
      className="w-full py-3.5 border-y border-[#F59E0B]/30 bg-slate-50 dark:bg-[#071324] shadow-[0_0_25px_rgba(245,158,11,0.08)] overflow-hidden relative z-20"
      aria-label="Services ticker"
    >
      <div className="w-full px-4 sm:px-8 flex items-center gap-3 sm:gap-4">
        {/* Fixed Left News Broadcast Badge */}
        <div className="flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-xs font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.2)] z-20">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]"></span>
          </span>
          <span className="hidden sm:inline">LIVE SERVICES</span>
          <span className="sm:hidden">SERVICES</span>
        </div>

        {/* Full Width News Ticker Viewport */}
        <div className="relative flex-1 min-w-0 overflow-hidden flex items-center">
          {/* Subtle edge fade vignettes for polished entry/exit */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-slate-50 dark:from-[#071324] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 dark:from-[#071324] to-transparent z-10" />

          {/* Continuous Ticker Track */}
          <div className="ticker-track">
            {/* Ticker Group 1 */}
            <div className="ticker-group">
              {GROUP_SERVICES.map((service, i) => (
                <span
                  key={`service-g1-${i}`}
                  className="ticker-item text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-white cursor-default"
                >
                  <span className="text-[#F59E0B] text-xs" aria-hidden="true">✦</span>
                  <span>{service}</span>
                </span>
              ))}
            </div>

            {/* Ticker Group 2 (identical duplicate for seamless infinite marquee) */}
            <div className="ticker-group" aria-hidden="true">
              {GROUP_SERVICES.map((service, i) => (
                <span
                  key={`service-g2-${i}`}
                  className="ticker-item text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-white cursor-default"
                >
                  <span className="text-[#F59E0B] text-xs" aria-hidden="true">✦</span>
                  <span>{service}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
