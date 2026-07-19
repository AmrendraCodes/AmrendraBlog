'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative py-24 px-6 lg:px-16 overflow-hidden bg-[var(--background)] flex flex-col items-center justify-center text-center min-h-[50vh] md:min-h-[60vh]">
      {/* Decorative Gradients */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.15)_0%,transparent_70%)] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-3xl rounded-full pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mt-12 md:mt-0"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[var(--text-heading)] leading-[1.1] mb-8 tracking-tight"
        >
          Insights, Ideas &amp; <br className="hidden md:block" />
          <span className="gradient-text">Industry Trends</span>
        </motion.h1>

        {/* Description */}
        <motion.p variants={fadeUp} className="text-lg md:text-xl lg:text-2xl text-[var(--text-body)] max-w-2xl leading-relaxed mb-10">
          Explore daily blogs, design inspiration, development tips, and digital insights crafted to help your business grow.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-[#6366F1] text-white rounded-full font-bold text-lg hover:shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition-all transform hover:-translate-y-1 inline-flex items-center justify-center no-underline"
          >
            Subscribe Now
          </Link>
          <Link
            href="/categories"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-[var(--foreground)] border border-[var(--card-border)] rounded-full font-bold text-lg hover:bg-[var(--card-bg-hover)] hover:border-[#6366F1]/30 transition-all inline-flex items-center justify-center no-underline"
          >
            Browse Topics
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
