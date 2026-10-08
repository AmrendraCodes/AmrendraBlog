import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CaseStudyCard from '../CaseStudyCard';
import BlogCard from '../BlogCard';

export default function SelectedWorkSection({ caseStudies = [], featuredPosts = [] }) {
  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-[#1E293B] transition-colors"
      aria-label="Selected Work and Insights"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            PORTFOLIO &amp; WRITING
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            Selected Work and Insights
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            Real projects and in-depth articles on AI agents, automation and search.
          </p>
        </div>

        {/* Case Studies Sub-section */}
        {caseStudies && caseStudies.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 dark:border-[#1E293B]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] dark:text-white">
                Featured Case Studies
              </h3>
              <Link
                href="/resources/case-studies"
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B1F3A] dark:text-[#F59E0B] hover:underline"
              >
                <span>View All Case Studies</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          </div>
        )}

        {/* Blog Articles Sub-section */}
        {featuredPosts && featuredPosts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 dark:border-[#1E293B]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] dark:text-white">
                Technical Insights &amp; Articles
              </h3>
              <Link
                href="/resources/blog"
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B1F3A] dark:text-[#F59E0B] hover:underline"
              >
                <span>View All Articles</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug || post.title} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
