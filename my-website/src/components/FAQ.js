'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqData } from '@/data/faqData';

export { faqData };

function FAQItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <div className="group rounded-2xl border border-slate-200/90 bg-white shadow-2xs transition-colors duration-200 hover:border-amber-400/50 overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base sm:text-lg font-bold text-[#1B2433] leading-snug pr-2 group-hover:text-[#9A4A00] transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-200 ${
            isOpen
              ? 'bg-[#F5A00B] text-[#1B2433] rotate-180'
              : 'bg-[#FFF3DC] text-[#9A4A00] rotate-0'
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
          <div className="w-full h-px bg-slate-100 mb-4" />
          <p className="text-[#1B2433]/75 text-sm sm:text-base leading-relaxed">
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
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFDF9] border-b border-slate-200/80 transition-colors"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9A4A00] bg-[#FFF3DC] px-4 py-1.5 rounded-full border border-amber-500/30 inline-block mb-3.5 shadow-2xs">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-[#1B2433]">
            Frequently Asked{' '}
            <span className="text-[#F5A00B]">Questions</span>
          </h2>
          <p className="text-[#1B2433]/75 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
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