import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaseStudyCard from "./CaseStudyCard";



export default function CaseStudiesSection({ caseStudies }) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-7xl mx-auto"
      >
        {/* Clean Single Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
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
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#0B1F3A] dark:text-[#F59E0B] hover:underline shrink-0"
          >
            <span>View All Case Studies</span>
            <ArrowRight size={16} className="transition-transform duration-200 " />
          </Link>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </div>
  );
}
