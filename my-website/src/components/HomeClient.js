import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './hero/HeroSection';
import ProblemSection from './home/ProblemSection';
import ServicesSection from './home/ServicesSection';
import OutcomesSection from './home/OutcomesSection';
import ProcessTimelineSection from './home/ProcessTimelineSection';
import WhyChooseUsSection from './home/WhyChooseUsSection';
import SelectedWorkSection from './home/SelectedWorkSection';
import TestimonialsSection from './home/TestimonialsSection';
import AboutAmrendraSection from './home/AboutAmrendraSection';
import HomeCtaBanner from './home/HomeCtaBanner';

const FAQ = dynamic(() => import('./FAQ'));

export default function HomeClient({ caseStudies = [], featuredPosts = [] }) {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Problem Section ("Sound Familiar?") */}
      <ProblemSection />

      {/* 3. Services Section (AI Agents, SEO Technical Writing + Secondary Web Dev) */}
      <ServicesSection />

      {/* 4. Outcomes Section ("What Clients Come to Me For") */}
      <OutcomesSection />

      {/* 5. Process Section ("A Simple Process, Built Around You", anchor id: process) */}
      <ProcessTimelineSection />

      {/* 6. Why Work With Me ("Why Clients Choose to Work With Me") */}
      <WhyChooseUsSection />

      {/* 7. Selected Work ("Selected Work and Insights" - Case Studies & Blog Cards) */}
      <SelectedWorkSection caseStudies={caseStudies} featuredPosts={featuredPosts} />

      {/* 8. Testimonials Section (Conditional - renders only if real data exists) */}
      <TestimonialsSection />

      {/* 9. About Section ("Hi, I'm Amrendra.") */}
      <AboutAmrendraSection />

      {/* 10. FAQ Section (7 Questions & Answers) */}
      <FAQ />

      {/* 11. Final CTA Section ("Ready to Save Time and Grow Your Traffic?") */}
      <HomeCtaBanner />
    </>
  );
}
