"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CaseStudyCard from "@/components/CaseStudyCard";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CaseStudiesPageClient({ caseStudies, allTechStacks }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.stack.includes(activeFilter));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-24">
      {/* Filter Bar */}
      <motion.div
        className="flex flex-wrap gap-2.5 mb-12"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {["All", ...allTechStacks].map((tech) => (
          <motion.button
            key={tech}
            variants={fadeUp}
            onClick={() => setActiveFilter(tech)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 cursor-pointer ${
              activeFilter === tech
                ? "bg-[#6366F1] text-white border-[#6366F1] shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                : "bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-body)] hover:border-[#6366F1]/40 hover:text-[#6366F1] dark:hover:text-[#818CF8]"
            }`}
          >
            {tech}
          </motion.button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={stagger}
        key={activeFilter}
      >
        {filteredStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredStudies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[var(--text-muted)] text-lg font-medium">
            No case studies found for &ldquo;{activeFilter}&rdquo;.
          </p>
          <button
            onClick={() => setActiveFilter("All")}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#6366F1] text-white font-bold text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] cursor-pointer"
          >
            Show All
          </button>
        </div>
      )}
    </div>
  );
}
