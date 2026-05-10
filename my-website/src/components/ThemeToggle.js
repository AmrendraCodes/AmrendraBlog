"use client";

import { useTheme } from 'next-themes'
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900/5 dark:bg-slate-800 dark:bg-slate-950/10 text-slate-700 dark:text-slate-200 hover:bg-slate-900/10 dark:hover:bg-slate-700/20 transition-colors duration-300"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
