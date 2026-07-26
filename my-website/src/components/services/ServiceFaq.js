'use client';

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ServiceFaq({ faqs = [], serviceTitle }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 bg-[var(--background)] border-b border-[var(--card-border)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-16">
        <AnimatedSection direction="up" className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] dark:text-[#34D399] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20 mb-4 inline-block">
            QUESTIONS &amp; ANSWERS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] tracking-tight mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
            Everything you need to know about our {serviceTitle} process and deliverables.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <AnimatedSection
                key={idx}
                direction="up"
                delay={idx * 0.05}
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#10B981]/40"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[var(--text-heading)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 rounded-2xl"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={20} className="text-[#10B981] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[var(--text-muted)] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#10B981]" : ""
                      }`}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[var(--text-body)] leading-relaxed border-t border-[var(--card-border)]/50"
                  >
                    {faq.answer}
                  </div>
                )}
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
