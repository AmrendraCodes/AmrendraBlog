'use client';

import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/data/servicesData';

// Sync directly with the 3 services from the Services page
const TICKER_SERVICES = SERVICES_DATA.map((service) => ({
  name: service.title,
  href: `/services/${service.slug}`,
}));

// Repeat 3x within each group to comfortably exceed wide displays for smooth infinite marquee
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
        {/* Fixed Left News Broadcast Badge - links to /services */}
        <Link
          href="/services"
          className="flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-xs font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:bg-[#F59E0B]/25 transition-all z-20"
          title="View all services"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]"></span>
          </span>
          <span className="hidden sm:inline">LIVE SERVICES</span>
          <span className="sm:hidden">SERVICES</span>
        </Link>

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
                <Link
                  key={`service-g1-${i}`}
                  href={service.href}
                  className="ticker-item text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-white hover:text-[#F59E0B] dark:hover:text-[#F59E0B] transition-colors cursor-pointer group"
                >
                  <span className="text-[#F59E0B] text-xs transition-transform group-hover:scale-125" aria-hidden="true">✦</span>
                  <span className="group-hover:underline underline-offset-4">{service.name}</span>
                </Link>
              ))}
            </div>

            {/* Ticker Group 2 (identical duplicate for seamless infinite marquee) */}
            <div className="ticker-group" aria-hidden="true">
              {GROUP_SERVICES.map((service, i) => (
                <Link
                  key={`service-g2-${i}`}
                  href={service.href}
                  tabIndex={-1}
                  className="ticker-item text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-white hover:text-[#F59E0B] dark:hover:text-[#F59E0B] transition-colors cursor-pointer group"
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
