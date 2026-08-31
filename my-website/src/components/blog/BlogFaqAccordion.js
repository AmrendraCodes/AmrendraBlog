'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogFaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="pt-6 border-t border-[var(--card-border)]/60" id="faq-section">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center border border-[#F59E0B]/20">
          <HelpCircle size={20} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-heading)] tracking-tight m-0">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-0.5">
            Key questions and clear answers regarding this topic
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-[#F59E0B]/40 bg-[var(--section-alt-bg)]/60 shadow-lg shadow-[#0B1F3A]/5'
                  : 'border-[var(--card-border)] bg-[var(--card-bg)]/30 hover:border-[#F59E0B]/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full py-4 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-base sm:text-lg text-[var(--text-heading)] leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`p-1.5 rounded-full transition-transform duration-300 shrink-0 ${
                    isOpen
                      ? 'bg-[#F59E0B] text-[#0B1F3A] rotate-180'
                      : 'bg-white/5 text-[var(--text-muted)]'
                  }`}
                >
                  <ChevronDown size={18} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-base text-[var(--text-body)] leading-relaxed border-t border-[var(--card-border)]/30 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
