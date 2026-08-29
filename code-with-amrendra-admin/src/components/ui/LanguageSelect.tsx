'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';

interface LanguageSelectProps {
  value?: string;
  onChange?: (lang: string) => void;
  className?: string;
}

const LANGUAGES = [
  { code: 'en', label: 'English', region: 'US' },
  { code: 'es', label: 'Español', region: 'ES' },
  { code: 'hi', label: 'हिन्दी', region: 'IN' },
  { code: 'fr', label: 'Français', region: 'FR' },
  { code: 'de', label: 'Deutsch', region: 'DE' },
];

export default function LanguageSelect({
  value = 'en',
  onChange,
  className = '',
}: LanguageSelectProps) {
  const [selected, setSelected] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === selected) || LANGUAGES[0];

  const handleSelect = (code: string) => {
    setSelected(code);
    onChange?.(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:border-slate-300 dark:hover:border-[#3b3f5c] transition-all cursor-pointer shadow-xs"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe size={14} className="text-slate-400 dark:text-slate-500" />
        <span>{currentLang.label}</span>
        <ChevronDown
          size={13}
          className={`text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)]">
            Select Language
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition cursor-pointer ${
                lang.code === selected
                  ? 'bg-indigo-50/80 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 font-semibold'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-main)]'
              }`}
              role="option"
              aria-selected={lang.code === selected}
            >
              <span>{lang.label}</span>
              {lang.code === selected && <Check size={14} className="text-indigo-600 dark:text-indigo-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
