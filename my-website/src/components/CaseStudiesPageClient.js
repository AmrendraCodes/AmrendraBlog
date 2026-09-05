"use client";

import { useState } from "react";
import CaseStudyCard from "@/components/CaseStudyCard";



export default function CaseStudiesPageClient({ caseStudies, allTechStacks }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.stack.includes(activeFilter));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
      {/* Filter Bar */}
      <div
        className="flex flex-wrap gap-2.5 mb-12"
      >
        {["All", ...allTechStacks].map((tech) => (
          <button
            key={tech}
            onClick={() => setActiveFilter(tech)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 cursor-pointer ${
              activeFilter === tech
                ? "bg-[#F59E0B] text-[#0B1F3A] border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.3)] font-bold"
                : "bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-body)] hover:border-[#F59E0B]/50 hover:text-[#F59E0B]"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        key={activeFilter}
      >
        {filteredStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>

      {/* Empty State */}
      {filteredStudies.length === 0 && (
        <div className="text-center py-12 md:py-16">
          <p className="text-[var(--text-muted)] text-lg font-medium">
            No case studies found for &ldquo;{activeFilter}&rdquo;.
          </p>
          <button
            onClick={() => setActiveFilter("All")}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#F59E0B] text-[#0B1F3A] font-bold text-sm transition-colors duration-200  cursor-pointer"
          >
            Show All
          </button>
        </div>
      )}
    </div>
  );
}
