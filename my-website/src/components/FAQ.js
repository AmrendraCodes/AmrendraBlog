'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: 'What topics do you write about?',
    answer:
      'I publish practical articles on React, Next.js, JavaScript, TypeScript, AI Agents, SaaS architecture, AWS, DevOps, performance optimization, and modern software engineering. Every article is based on real-world development experience.',
  },
  {
    question: 'Is this blog suitable for beginners?',
    answer:
      "Yes. Whether you're just starting frontend development or already building production applications, you'll find beginner-friendly guides alongside advanced engineering content.",
  },
  {
    question: 'Do you share AI Agent tutorials?',
    answer:
      "Absolutely. You'll find tutorials covering AI Agents, LLM workflows, prompt engineering, automation, MCP, RAG, AI integrations, and practical use cases for developers.",
  },
  {
    question: 'Do you write about React and Next.js?',
    answer:
      'Yes. React and Next.js are major topics on this blog. I regularly publish guides on performance optimization, Server Components, authentication, state management, deployment, SEO, and best practices.',
  },
  {
    question: 'Can I learn AWS from this blog?',
    answer:
      'Yes. I share practical AWS tutorials covering EC2, S3, CloudFront, Lambda, IAM, CI/CD, Docker deployments, and scalable cloud architecture for modern applications.',
  },
  {
    question: 'Are your tutorials based on real projects?',
    answer:
      'Yes. Most articles are inspired by production challenges, client work, personal projects, and real engineering workflows rather than theoretical examples.',
  },
  {
    question: 'How often do you publish new articles?',
    answer:
      'New articles are published regularly on frontend development, AI engineering, SaaS architecture, cloud technologies, and developer productivity.',
  },
  {
    question: 'Do you provide source code and GitHub examples?',
    answer:
      'Whenever possible, tutorials include complete code examples, reusable snippets, GitHub repositories, and implementation walkthroughs to help you build faster.',
  },
  {
    question: 'Can I subscribe for new articles?',
    answer:
      'Yes. Join the Developer Weekly Journal to receive the latest tutorials, engineering insights, AI trends, and development resources directly in your inbox.',
  },
  {
    question: 'Can businesses or startups work with you?',
    answer:
      'Yes. I collaborate with startups, SaaS companies, and engineering teams on technical content, frontend development, developer education, cloud architecture, and AI-focused projects.',
  },
  {
    question: 'What makes this blog different from other developer blogs?',
    answer:
      'The focus is on practical implementation instead of theory. Every article aims to solve real engineering problems with clear explanations, production-ready examples, and actionable insights.',
  },
  {
    question: 'Who is behind Code with Amrendra?',
    answer:
      'Code with Amrendra is a developer-focused platform where I share practical knowledge on frontend engineering, AI, SaaS architecture, AWS, DevOps, and modern software development to help developers build better products.',
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
      className="group rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[#6366F1]/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.06)] overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-transparent border-none outline-none"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="text-base sm:text-lg font-bold text-[var(--text-heading)] leading-snug pr-2">
          {question}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-[#6366F1] text-white rotate-180'
              : 'bg-[rgba(99,102,241,0.1)] text-[#6366F1] dark:text-[#818CF8] rotate-0'
          }`}
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-5 pt-0">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent mb-4" />
              <p className="text-[var(--text-body)] text-[15px] sm:text-base leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--section-alt-bg)] border-t border-[var(--card-border)]">
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
