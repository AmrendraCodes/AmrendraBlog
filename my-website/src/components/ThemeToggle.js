"use client";

import { useTheme } from 'next-themes'
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex items-center justify-center w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full bg-slate-100/80 dark:bg-[#1A1B1E]/80 border border-slate-200/50 dark:border-[#2A2B2E]/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200/80 dark:hover:bg-[#2A2B2E]/80 transition-all duration-300"
        aria-label="Toggle Dark Mode"
      >
        <div className="w-[18px] h-[18px]" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-[#10B981] transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? <Sun size={18} className="transition-transform duration-300 hover:rotate-45 text-amber-500" /> : <Moon size={18} className="transition-transform duration-300 hover:-rotate-12 text-slate-700" />}
    </button>
  );
}
