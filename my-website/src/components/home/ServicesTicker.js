'use client';

import React from 'react';
import Link from 'next/link';

const TECH_ITEMS = [
  'Next.js 15/16',
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'Autonomous AI Agents',
  'OpenAI & Claude API',
  'Supabase & PostgreSQL',
  'Technical SEO',
  'Vercel & AWS',
  'Docker',
];

const GROUP_TECH = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

export default function ServicesTicker() {
  return (
    <section
      className="w-full py-3.5 border-b border-[var(--border-card)] bg-[var(--bg-page)] overflow-hidden relative z-20 transition-colors duration-200"
      aria-label="Core Technology Ecosystem"
    >
      <div className="w-full px-4 sm:px-8 flex items-center gap-3 sm:gap-4">
        {/* Left Badge */}
        <Link
          href="/services"
          className="flex-shrink-0 flex items-center gap-2 px-3 py-1 rounded-lg bg-[var(--accent-tag-bg)] border border-[var(--accent-tag-border)] text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-tag-text)] hover:opacity-90 transition-all no-underline"
          title="View core stack & services"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A00B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A00B]"></span>
          </span>
          <span className="hidden sm:inline">CORE STACK</span>
          <span className="sm:hidden">STACK</span>
        </Link>

        {/* Ticker Viewport */}
        <div className="relative flex-1 min-w-0 overflow-hidden flex items-center">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[var(--bg-page)] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[var(--bg-page)] to-transparent z-10" />

          {/* Continuous Ticker Track */}
          <div className="ticker-track">
            <div className="ticker-group">
              {GROUP_TECH.map((item, i) => (
                <span
                  key={`tech-${i}`}
                  className="ticker-item text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-heading)] flex items-center gap-2.5"
                >
                  <span className="text-[#F5A00B] text-xs">✦</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
