import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CaseStudyCard from './CaseStudyCard';

export default function CaseStudiesSection({ caseStudies }) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <div className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--bg-section-alt)] text-[var(--text-body)] border-b border-[var(--border-card)] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-tag-text)] bg-[var(--accent-tag-bg)] border border-[var(--accent-tag-border)] px-4 py-1.5 rounded-full inline-block mb-3.5 shadow-2xs">
              PROVEN RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-heading)]">
              Real Projects, <span className="text-[#F5A00B]">Real Impact</span>
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mt-2 leading-relaxed">
              A look at recent client projects across SaaS, AI agent workflows, and high-performance web applications.
            </p>
          </div>

          <Link
            href="/resources/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-tag-text)] hover:text-[#F5A00B] shrink-0 no-underline"
          >
            <span>View All Case Studies</span>
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((study, idx) => (
            <CaseStudyCard key={study.slug || idx} study={study} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}