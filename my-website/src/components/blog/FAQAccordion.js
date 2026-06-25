"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FAQAccordion({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-16 mb-20 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-[var(--text-heading)] mb-8 text-center tracking-tight">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[var(--card-border)] bg-[var(--section-alt-bg)]/50 backdrop-blur-sm rounded-xl overflow-hidden transition-colors hover:border-[#6366F1]/50"
          >
            <button
              className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-semibold text-lg text-[var(--text-heading)] text-left">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-[var(--text-muted)] shrink-0 ml-4"
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-5 text-[var(--text-body)] leading-relaxed border-t border-[var(--card-border)]/50 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
