import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroSection from './hero/HeroSection';
import ServicesTicker from './home/ServicesTicker';
import CoreServicesSection from './home/CoreServicesSection';
import ProcessTimelineSection from './home/ProcessTimelineSection';
import CaseStudiesSection from './CaseStudiesSection';
import WhyChooseUsSection from './home/WhyChooseUsSection';
import AboutAmrendraSection from './home/AboutAmrendraSection';
import BlogCard from './BlogCard';

export default function HomeClient({ caseStudies, featuredPosts }) {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Technology Ecosystem & Trust Strip */}
      <ServicesTicker />

      {/* 3. Core Engineering Services (Merged Capabilities) */}
      <CoreServicesSection />

      {/* 4. How I Work — 4-Step Engineering Process */}
      <ProcessTimelineSection />

      {/* 5. Selected Work & Case Studies (Primary Proof) */}
      <section className="bg-[#F8FAFC] dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors duration-200">
        <CaseStudiesSection caseStudies={caseStudies} />
      </section>

      {/* 6. Why Work With Me (Engineering Standards) */}
      <WhyChooseUsSection />

      {/* 7. About Amrendra — Personal Brand & Founder Introduction */}
      <AboutAmrendraSection />

      {/* 8. Latest Insights & Technical Articles */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-16 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
                LATEST INSIGHTS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white">
                Featured Engineering <span className="gradient-text">Articles</span>
              </h2>
              <p className="text-slate-600 dark:text-[#9CA3AF] text-base sm:text-lg max-w-2xl mt-2">
                Deep dives into modern full-stack development, AI agents, cloud architecture, and performance.
              </p>
            </div>
            <Link
              href="/resources/blog"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#0B1F3A] dark:text-[#F59E0B] hover:underline shrink-0 no-underline"
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
        </section>
      )}
    </>
  );
}
