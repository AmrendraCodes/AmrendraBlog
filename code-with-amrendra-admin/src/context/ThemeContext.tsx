'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  const applyThemeToDOM = useCallback((activeTheme: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (activeTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cwa_admin_theme') as Theme | null;
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      let initialTheme: Theme = 'dark';
      if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
        initialTheme = stored;
      }
      
      setThemeState(initialTheme);
      
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      const active = initialTheme === 'system' ? systemTheme : initialTheme;
      setResolvedTheme(active);
      applyThemeToDOM(active);
    } catch {
      applyThemeToDOM('dark');
    }
    setMounted(true);
  }, [applyThemeToDOM]);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = () => {
      if (theme === 'system') {
        const nextActive = mediaQuery.matches ? 'dark' : 'light';
        setResolvedTheme(nextActive);
        applyThemeToDOM(nextActive);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [theme, mounted, applyThemeToDOM]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('cwa_admin_theme', newTheme);
    } catch {
      // Ignore localStorage write errors
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const systemTheme = mediaQuery.matches ? 'dark' : 'light';
    const active = newTheme === 'system' ? systemTheme : newTheme;
    setResolvedTheme(active);
    applyThemeToDOM(active);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
