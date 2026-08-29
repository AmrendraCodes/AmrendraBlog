'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'compact';
}

export default function ThemeToggle({ className = '', variant = 'button' }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#25283f] transition-all cursor-pointer ${className}`}
        aria-label="Toggle color theme"
        title={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {resolvedTheme === 'dark' ? (
          <Sun size={18} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon size={18} className="text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:border-slate-300 dark:hover:border-[#3b3f5c] transition-all cursor-pointer shadow-xs ${className}`}
      aria-label="Toggle color theme"
      title={resolvedTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {resolvedTheme === 'dark' ? (
        <>
          <Sun size={14} className="text-amber-400" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon size={14} className="text-indigo-600" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
