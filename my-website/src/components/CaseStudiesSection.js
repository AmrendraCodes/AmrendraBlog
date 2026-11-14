import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CaseStudyCard from './CaseStudyCard';

export default function CaseStudiesSection({ caseStudies }) {
  if (!caseStudies || caseStudies.length === 0) return null;

  return (
    <div className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFDF9] dark:bg-[#070F1E] border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9A4A00] dark:text-[#F5A00B] bg-[#FFF3DC] dark:bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/30 inline-block mb-3.5 shadow-2xs">
              PROVEN RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1B2433] dark:text-white">
              Real Projects, <span className="text-[#F5A00B]">Real Impact</span>
            </h2>
            <p className="text-[#1B2433]/75 dark:text-slate-300 text-base sm:text-lg max-w-2xl mt-2 leading-relaxed">
              A look at recent client projects across SaaS, AI agent workflows, and high-performance web applications.
            </p>
          </div>

          <Link
            href="/resources/case-studies"
            className="group inline-flex items-center gap-2 text-sm font-bold text-[#9A4A00] dark:text-[#F5A00B] hover:text-[#E08F00] shrink-0 no-underline"
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
