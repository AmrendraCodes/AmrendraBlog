'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Bell, Search, ShieldCheck } from 'lucide-react';

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
    <header className="px-6 py-4 bg-[#0e1322]/80 backdrop-blur-md border-b border-[#1f2a40] flex items-center justify-between sticky top-0 z-40">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input Quick Trigger */}
        <div className="relative hidden lg:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Quick search..."
            className="bg-[#151c2e] border border-[#1f2a40] text-xs text-gray-200 rounded-lg pl-9 pr-4 py-2 w-56 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* View Public Site */}
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-secondary py-1.5 px-3 text-xs"
        >
          <span>View Site</span>
          <ExternalLink size={13} />
        </a>

        {/* Role Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
          <ShieldCheck size={14} />
          <span>{user?.role || 'ADMIN'}</span>
        </div>
      </div>
    </header>
  );
}
