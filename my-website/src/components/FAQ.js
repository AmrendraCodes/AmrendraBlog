'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: 'What topics do you write about?',
    answer:
      'We cover full-stack engineering (React, Next.js, Node), AI agent development, autonomous LLM workflows, AWS cloud architecture, DevOps automation, and modern SaaS product engineering.',
  },
  {
    question: 'Is this blog suitable for beginners?',
    answer:
      'Yes — our content spans beginner tutorials through advanced architecture guides, so developers at any level can follow along.',
  },
  {
    question: 'Do you share AI agent tutorials?',
    answer:
      'Yes, we regularly publish walkthroughs on building autonomous AI agents and integrating them into production applications.',
  },
  {
    question: 'Do you write about React and Next.js?',
    answer:
      'Absolutely — React and Next.js development are core to our engineering stack and covered extensively in our guides.',
  },
  {
    question: 'Can I learn AWS from this blog?',
    answer:
      'Yes, we publish practical AWS cloud and DevOps automation tutorials based on real production deployments.',
  },
  {
    question: 'Are your tutorials based on real projects?',
    answer:
      "Yes — every tutorial is grounded in patterns we've used on live client engagements, not just theoretical examples.",
  },
  {
    question: 'How often do you publish new articles?',
    answer:
      'We publish new engineering and AI development content on a regular weekly schedule.',
  },
  {
    question: 'Do you provide source code and GitHub examples?',
    answer:
      'Yes, most tutorials link to a companion GitHub repository with full source code.',
  },
  {
    question: 'Can I subscribe for new articles?',
    answer:
      'Yes — subscribe through our newsletter to get new posts and case studies delivered directly to your inbox.',
  },
  {
    question: 'Can businesses or startups work with you?',
    answer:
      'Yes — beyond content, we offer full AI Development Services, Custom Software Development Services, and Cloud Software Development Services for businesses ready to build or scale.',
  },
  {
    question: 'What makes this blog different from other developer blogs?',
    answer:
      'We combine hands-on engineering experience with AI-native workflows, giving readers both practical tutorials and real production insight.',
  },
  {
    question: 'Who is behind Code with Amrendra?',
    answer:
      'Code with Amrendra is an engineering-led team specializing in AI Development Services, full-stack web engineering, and cloud software architecture for modern businesses.',
  },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function FAQItem({ question, answer, isOpen, onToggle, index }) {
  return (
    <motion.div
      variants={staggerItem}
      className="group rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[#F59E0B]/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] overflow-hidden"
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
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
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
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
        className="max-w-3xl mx-auto px-6 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="text-center mb-12">
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
