'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ToolsFaqAccordion({ items, defaultOpen = null, surface = false }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3.5">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              surface
                ? `card-tilt shadow-sm ${isOpen
                  ? 'border-amber-500/45 bg-[var(--card-bg)] ring-1 ring-amber-500/15'
                  : 'border-[var(--card-border)] bg-[var(--card-bg)] hover:border-amber-500/40'}`
                : `shadow-md shadow-black/20 ${isOpen
                  ? 'border-amber-400/50 bg-[#0c1322] ring-1 ring-amber-400/20'
                  : 'border-slate-800/90 bg-[#0c1322] hover:border-slate-700'}`
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none outline-none group"
              aria-expanded={isOpen}
              aria-controls={`tools-faq-ans-${index}`}
              id={`tools-faq-q-${index}`}
            >
              <span className={`pr-2 text-left text-base font-bold leading-snug transition-colors sm:text-lg ${
                surface
                  ? 'text-[var(--text-heading)] group-hover:text-amber-700 dark:group-hover:text-amber-300'
                  : 'text-white group-hover:text-amber-400'
              }`}>
                {item.question}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isOpen
                    ? surface
                      ? 'seo-primary-button rotate-180 shadow-xs'
                      : 'bg-amber-400 text-slate-950 rotate-180 shadow-xs'
                    : surface
                    ? 'bg-amber-500/10 text-amber-700 rotate-0 group-hover:bg-amber-500/20 dark:text-amber-300'
                    : 'bg-amber-400/10 text-amber-400 rotate-0 group-hover:bg-amber-400/20'
                }`}
              >
                <ChevronDown size={18} strokeWidth={2.5} />
              </span>
            </button>

            <div
              id={`tools-faq-ans-${index}`}
              role="region"
              aria-labelledby={`tools-faq-q-${index}`}
              className={`px-6 transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'
              }`}
            >
              <div className={`mb-4 h-px w-full ${surface ? 'bg-[var(--card-border)]' : 'bg-slate-800/80'}`} />
              <div className={`text-sm font-normal leading-relaxed sm:text-[15px] ${
                surface ? 'text-[var(--text-body)]' : 'text-slate-300'
              }`}>
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
