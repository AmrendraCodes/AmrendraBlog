'use client';

import React from 'react';
import { ExternalLink, Search, ShieldCheck } from 'lucide-react';

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
    <header className="px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5 font-medium">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input Quick Trigger */}
        <div className="relative hidden lg:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Quick search..."
            className="bg-slate-50 border border-slate-200 text-xs text-slate-800 rounded-xl pl-9 pr-4 py-2 w-60 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
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
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-mono font-bold">
          <ShieldCheck size={14} />
          <span>{user?.role || 'ADMIN'}</span>
        </div>
      </div>
    </header>
  );
}
