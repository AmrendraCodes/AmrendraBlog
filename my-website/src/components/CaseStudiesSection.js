"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CaseStudyCard from "./CaseStudyCard";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
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

export default function CaseStudiesSection({ caseStudies }) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {/* Section Header */}
        <motion.div variants={staggerItem} className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 text-[var(--text-heading)]">
            Real Projects, Real <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-[var(--text-body)] text-lg max-w-lg">
            End-to-end case studies on design decisions, architecture, and measurable outcomes.
          </p>
        </motion.div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div variants={staggerItem} className="flex justify-center mt-12">
          <Link
            href="/case-studies"
            className="group inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] font-bold transition-all duration-300 hover:-translate-y-1 hover:border-[#6366F1]/30 hover:shadow-lg"
          >
            View All Case Studies <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
