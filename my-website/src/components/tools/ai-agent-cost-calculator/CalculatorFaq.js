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
    <section className="py-12 sm:py-16 md:py-20 border-t border-[#1E293B]" aria-label="Frequently Asked Questions">
      <div className="max-w-3xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <HelpCircle size={14} className="text-[#F59E0B]" />
            <span>AI AGENT COST KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="bg-gradient-to-r from-white via-slate-100 to-[#F59E0B] text-transparent bg-clip-text">Questions</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
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
                className="rounded-2xl border border-[#1E293B] bg-[#0B1F3A] hover:border-[#F59E0B]/40 transition-all duration-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full min-h-[52px] items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-inset"
                  aria-expanded={isOpen}
                  aria-controls={`calc-faq-answer-${index}`}
                  id={`calc-faq-question-${index}`}
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug flex-1 min-w-0 pr-2">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#F59E0B] text-[#0B1F3A] rotate-180'
                        : 'bg-[#071324] text-slate-300 border border-[#1E293B] rotate-0'
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.4} />
                  </span>
                </button>

                <div
                  id={`calc-faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`calc-faq-question-${index}`}
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    opacity: isOpen ? 1 : 0,
                    transition: 'max-height 0.3s ease, opacity 0.2s ease',
                    overflow: 'hidden',
                  }}
                >
                  <div className="px-5 sm:px-6 pb-5 pt-0">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/25 to-transparent mb-3.5" />
                    <p className="text-slate-300 text-sm leading-relaxed font-normal">
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
