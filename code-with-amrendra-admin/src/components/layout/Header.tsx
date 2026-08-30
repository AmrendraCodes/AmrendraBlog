'use client';

import React from 'react';
import { ExternalLink, Search, ShieldCheck } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  user?: {
    name?: string | null;
    email?: string;
    role?: string;
  };
}

export default function Header({ title = 'Dashboard', subtitle, user }: HeaderProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codewithamrendra.in';

  return (
    <header className="px-6 py-3.5 bg-[var(--bg-card)]/80 backdrop-blur-md border-b border-[var(--border-color)] flex items-center justify-between sticky top-0 z-40 transition-colors duration-200">
      <div>
        <h1 className="text-lg sm:text-xl font-black text-[var(--text-main)] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[var(--text-muted)] mt-0.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search Input Quick Trigger */}
        <div className="relative hidden lg:flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-3 py-1.5 text-xs w-64 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/15 transition shadow-2xs">
          <Search size={14} className="text-[var(--text-dim)] shrink-0 mr-2" />
          <input
            type="text"
            placeholder="Search content, tags..."
            className="w-full bg-transparent border-0 outline-none text-xs font-medium text-[var(--text-main)] placeholder:text-[var(--text-dim)] pr-7"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono bg-[var(--bg-canvas)] text-[var(--text-dim)] rounded border border-[var(--border-color)]">
            ⌘K
          </kbd>
        </div>

        {/* View Public Site Action */}
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-secondary py-1.5 px-3 text-xs"
        >
          <span className="hidden sm:inline">View Site</span>
          <ExternalLink size={13} />
        </a>

        {/* Theme Control */}
        <ThemeToggle variant="compact" />

        {/* Role Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold">
          <ShieldCheck size={14} />
          <span>{user?.role || 'ADMIN'}</span>
        </div>
      </div>
    </header>
  );
}
