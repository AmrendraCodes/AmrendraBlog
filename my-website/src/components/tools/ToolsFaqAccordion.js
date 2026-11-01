'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function ToolsFaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1F3A]/60 transition-colors duration-200 hover:border-[#F59E0B]/40 overflow-hidden shadow-xs"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none outline-none"
              aria-expanded={isOpen}
              aria-controls={`tools-faq-ans-${index}`}
              id={`tools-faq-q-${index}`}
            >
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug pr-2">
                {item.question}
              </span>
              <span
                className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                  isOpen
                    ? 'bg-[#F59E0B] text-[#0B1F3A] rotate-180'
                    : 'bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] rotate-0'
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
                isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0 overflow-hidden'
              }`}
            >
              <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-4" />
              <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

