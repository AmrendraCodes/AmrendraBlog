'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { faqData } from '@/data/faqData';
export { faqData };



function FAQItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <motion.div
      className="group rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-[#F59E0B]/40  overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base sm:text-lg font-bold text-[var(--text-heading)] leading-snug pr-2 group-hover:text-[#F59E0B] transition-colors">
          {question}
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

      <motion.div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 pt-0">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F59E0B]/30 to-transparent mb-4" />
          <p className="text-[var(--text-body)] text-[15px] sm:text-base leading-relaxed">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="py-12 md:py-16 bg-[var(--section-alt-bg)] border-t border-[var(--card-border)]">
      <motion.div
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-lg mx-auto">
            Everything you need to know about this blog and working together.
          </p>
        </motion.div>

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
      </motion.div>
    </section>
  );
}
