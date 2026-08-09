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
    <div className="py-16 md:py-24 px-6">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {/* Clean Single Section Header */}
        <motion.div variants={staggerItem} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20 inline-block mb-3">
              SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Real Projects, Real <span className="gradient-text">Impact</span>
            </h2>
            <p className="text-slate-600 dark:text-[#9CA3AF] text-base sm:text-lg max-w-2xl mt-2">
              End-to-end case studies on design decisions, architecture, and measurable outcomes.
            </p>
          </div>

          <Link
            href="/resources/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#10B981] hover:underline shrink-0"
          >
            <span>View All Case Studies</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
