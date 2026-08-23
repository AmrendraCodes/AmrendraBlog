'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './hero/HeroSection';
import ServicesTicker from './home/ServicesTicker';
import EngineeringDifferenceSection from './home/EngineeringDifferenceSection';
import CoreServicesSection from './home/CoreServicesSection';
import WhatWeBuildSection from '@/components/home/WhatWeBuildSection';
import WhyChooseUsSection from './home/WhyChooseUsSection';
import ProcessTimelineSection from './home/ProcessTimelineSection';
import HomeCtaBanner from './home/HomeCtaBanner';

// Dynamic Heavy Components for Performance
const CaseStudiesSection = dynamic(() => import('./CaseStudiesSection'), { ssr: false });
const ComparisonTable = dynamic(() => import('@/components/home/ComparisonTable'), { ssr: false });
const PricingSection = dynamic(() => import('@/components/home/PricingSection'), { ssr: false });

export default function HomeClient({ caseStudies }) {
  return (
    <div className="relative min-h-screen bg-white dark:bg-[#060E1A] text-[#0B1F3A] dark:text-[#F8FAFC] transition-colors duration-300 overflow-x-hidden">
      {/* 1. Full 3D Interactive Hero Section */}
      <HeroSection />

      {/* 2. Client & Services Ticker Marquee */}
      <ServicesTicker />

      {/* 3. Problem Statement & Value Proposition */}
      <EngineeringDifferenceSection />

      {/* 4. Core Services Overview (3D Tilt Cards) */}
      <CoreServicesSection />

      {/* 5. What We Build for Modern Businesses */}
      <WhatWeBuildSection />

      {/* 6. Why Businesses Choose Code with Amrendra */}
      <WhyChooseUsSection />

      {/* 7. Development Process Timeline */}
      <ProcessTimelineSection />

      {/* 8. Featured Case Studies & Work Showcase */}
      <section className="bg-[#F8FAFC] dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors duration-300 content-visibility-auto">
        <CaseStudiesSection caseStudies={caseStudies} />
      </section>

      {/* 9. Feature Comparison Matrix */}
      <section className="py-24 px-6 max-w-7xl mx-auto content-visibility-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
            DIRECT COMPARISON
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] dark:text-white mt-4 mb-6 tracking-tight">
            How Our Engineering Stacks Up
          </h2>
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            Compare Code with Amrendra's enterprise standards against traditional development agencies and off-the-shelf templates.
          </p>
        </div>

        <ComparisonTable />
      </section>

      {/* 10. Engagement Models & Pricing */}
      <section className="py-24 px-6 bg-[#F8FAFC] dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors duration-300 content-visibility-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
              PRICING, MADE SIMPLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] dark:text-white mt-4 mb-6 tracking-tight">
              Straightforward Pricing for Every Stage of Growth
            </h2>
            <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              Whether you need a focused build or an ongoing engineering partner, choose a plan that fits — no hidden fees, no long-term lock-in.
            </p>
          </div>

          <PricingSection />
        </div>
      </section>

      {/* 11. Final High-Impact CTA Banner */}
      <HomeCtaBanner />
    </div>
  );
}
