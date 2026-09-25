'use client';

import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/servicesData';

// Sync directly with the 3 live services from servicesData.js
const TICKER_SERVICES = SERVICES_DATA.map((service) => ({
  name: service.title,
  href: `/services/${service.slug}`,
}));

// Repeat 4x within each group to smoothly exceed wide screens
const GROUP_SERVICES = [
  ...TICKER_SERVICES,
  ...TICKER_SERVICES,
  ...TICKER_SERVICES,
  ...TICKER_SERVICES,
];

export default function ServicesTicker() {
  return (
    <section
      className="w-full py-3.5 border-y border-slate-200 dark:border-[#1E293B] bg-slate-50/90 dark:bg-[#071324] overflow-hidden relative z-20 transition-colors"
      aria-label="Live Services"
    >
      <div className="w-full px-4 sm:px-8 flex items-center gap-3 sm:gap-4">
        {/* Left Badge linking to /services */}
        <Link
          href="/services"
          className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/35 text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:bg-[#F59E0B]/25 transition-all no-underline"
          title="View all live services"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]"></span>
          </span>
          <span className="hidden sm:inline">LIVE SERVICES</span>
          <span className="sm:hidden">SERVICES</span>
        </Link>

        {/* Ticker Viewport */}
        <div className="relative flex-1 min-w-0 overflow-hidden flex items-center">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-r from-slate-50 dark:from-[#071324] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-10 bg-gradient-to-l from-slate-50 dark:from-[#071324] to-transparent z-10" />

          {/* Continuous Ticker Track */}
          <div className="ticker-track">
            {/* Group 1 */}
            <div className="ticker-group">
              {GROUP_SERVICES.map((service, i) => (
                <Link
                  key={`service-g1-${i}`}
                  href={service.href}
                  className="ticker-item text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] transition-colors flex items-center gap-2.5 no-underline group"
                >
                  <span className="text-[#F59E0B] text-xs transition-transform group-hover:scale-125" aria-hidden="true">✦</span>
                  <span className="group-hover:underline underline-offset-4">{service.name}</span>
                </Link>
              ))}
            </div>

            {/* Group 2 (Duplicate for infinite seamless scroll) */}
            <div className="ticker-group" aria-hidden="true">
              {GROUP_SERVICES.map((service, i) => (
                <Link
                  key={`service-g2-${i}`}
                  href={service.href}
                  tabIndex={-1}
                  className="ticker-item text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] transition-colors flex items-center gap-2.5 no-underline group"
                >
                  <span className="text-[#F59E0B] text-xs transition-transform group-hover:scale-125" aria-hidden="true">✦</span>
                  <span className="group-hover:underline underline-offset-4">{service.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
