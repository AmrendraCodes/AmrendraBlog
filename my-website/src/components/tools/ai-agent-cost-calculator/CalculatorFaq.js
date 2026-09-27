'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

import { CALCULATOR_FAQS } from '@/data/calculatorFaqData';
export { CALCULATOR_FAQS };

export default function CalculatorFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="py-12 sm:py-16 border-t border-[var(--card-border)]" aria-label="Frequently Asked Questions">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#0B1F3A] dark:text-[#F59E0B] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <HelpCircle size={14} />
            <span>AI AGENT COST KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-heading)] tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-600 dark:text-[#94A3B8] text-sm sm:text-base max-w-xl mx-auto mt-2">
            Clear, honest answers on token economics, multi-call loops, prompt caching, and production infrastructure.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {CALCULATOR_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-[#F59E0B]/40 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-5 text-left cursor-pointer bg-transparent border-none outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`calc-faq-answer-${index}`}
                  id={`calc-faq-question-${index}`}
                >
                  <span className="text-sm sm:text-base font-bold text-[var(--text-heading)] leading-snug group-hover:text-[#F59E0B] transition-colors flex-1 min-w-0 pr-2">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#F59E0B] text-[#0B1F3A] rotate-180'
                        : 'bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] rotate-0'
                    }`}
                  >
                    <ChevronDown size={17} strokeWidth={2.4} />
                  </span>
                </button>

                <div
                  id={`calc-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`calc-faq-question-${index}`}
                  style={{
                    maxHeight: isOpen ? '400px' : '0',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.3s ease, opacity 0.2s ease',
                    overflow: 'hidden',
                  }}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent mb-3" />
                    <p className="text-slate-600 dark:text-[#CBD5E1] text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
