"use client";

import { useTheme } from 'next-themes'
import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme || theme;

  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full bg-slate-100/80 dark:bg-[#1A1B1E]/80 border border-slate-200/50 dark:border-[#2A2B2E]/50 text-slate-600 dark:text-slate-400 opacity-50 cursor-default"
        aria-label="Toggle Dark Mode"
        disabled
      >
        <div className="w-[18px] h-[18px]" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#1E3A8A] hover:text-[#F59E0B] dark:hover:text-[#F59E0B] transition-all duration-300 cursor-pointer"
      aria-label="Toggle Dark Mode"
    >
      {currentTheme === 'dark' ? (
        <Sun size={18} className="transition-transform duration-300 hover:rotate-45 text-[#F59E0B]" />
      ) : (
        <Moon size={18} className="transition-transform duration-300 hover:-rotate-12 text-[#0B1F3A]" />
      )}
    </button>
  );
}
