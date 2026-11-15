'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '@/data/faqData';

export { faqData };

function FAQItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <div className="group rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-2xs transition-colors duration-200 hover:border-[#F5A00B]/50 overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[#F5A00B] focus-visible:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base sm:text-lg font-bold text-[var(--text-heading)] leading-snug pr-2 group-hover:text-[#F5A00B] transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-200 ${isOpen
            ? 'bg-[#F5A00B] text-[#1B2433] rotate-180'
            : 'bg-[var(--accent-tag-bg)] text-[var(--accent-tag-text)] rotate-0'
            }`}
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </span>
      </button>

      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.2s ease',
          overflow: 'hidden',
        }}
      >
        <div className="px-6 pb-6 pt-0">
          <div className="w-full h-px bg-[var(--border-card)] mb-4" />
          <p className="text-[var(--text-body)] text-sm sm:text-base leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--bg-section-alt)] text-[var(--text-body)] border-b border-[var(--border-card)] transition-colors"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-tag-text)] bg-[var(--accent-tag-bg)] border border-[var(--accent-tag-border)] px-4 py-1.5 rounded-full inline-block mb-3.5 shadow-2xs">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
            Frequently Asked{' '}
            <span className="text-[#F5A00B]">Questions</span>
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Clear answers about services, timelines, pricing, and how we work together.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}