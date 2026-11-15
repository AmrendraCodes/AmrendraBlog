import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import HeroSection from './hero/HeroSection';
import ServicesTicker from './home/ServicesTicker';
import CoreServicesSection from './home/CoreServicesSection';
import ProcessTimelineSection from './home/ProcessTimelineSection';
import BlogCard from './BlogCard';

const CaseStudiesSection = dynamic(() => import('./CaseStudiesSection'));
const WhyChooseUsSection = dynamic(() => import('./home/WhyChooseUsSection'));
const AboutAmrendraSection = dynamic(() => import('./home/AboutAmrendraSection'));

export default function HomeClient({ caseStudies, featuredPosts }) {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Technology Ecosystem & Trust Strip */}
      <ServicesTicker />

      {/* 3. Core Engineering Services */}
      <CoreServicesSection />

      {/* 4. How I Work — 4-Step Process */}
      <ProcessTimelineSection />

      {/* 5. Selected Work & Case Studies */}
      <section className="bg-[var(--bg-page)] text-[var(--text-body)] transition-colors duration-200">
        <CaseStudiesSection caseStudies={caseStudies} />
      </section>

      {/* 6. Why Work With Me (Engineering Standards) */}
      <WhyChooseUsSection />

      {/* 7. About Amrendra — Personal Brand & Founder */}
      <AboutAmrendraSection />

      {/* 8. Latest Insights & Technical Articles */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--bg-page)] text-[var(--text-body)] border-b border-[var(--border-card)] transition-colors">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-tag-text)] bg-[var(--accent-tag-bg)] border border-[var(--accent-tag-border)] px-4 py-1.5 rounded-full inline-block mb-3.5 shadow-2xs">
                  LATEST INSIGHTS
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-heading)]">
                  Guides on <span className="text-[#F5A00B]">AI Agents, Next.js and SEO</span>
                </h2>
                <p className="text-[var(--text-muted)] text-base sm:text-lg max-w-2xl mt-2 leading-relaxed">
                  Practical, in-depth architectural guides and industry breakdowns from real-world production experience.
                </p>
              </div>
              <Link
                href="/resources/blog"
                className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-tag-text)] hover:text-[#F5A00B] shrink-0 no-underline"
              >
                <span>View All Articles</span>
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug || post.title} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}