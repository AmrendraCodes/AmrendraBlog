'use client';

import React from 'react';
import {
  Sparkles,
  Search,
  Zap,
  ShieldCheck,
  Calendar,
  Headphones,
} from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const whyChooseUsData = [
  {
    id: 'ai-first',
    icon: Sparkles,
    title: 'AI-First Development',
    description:
      'Build smarter software with AI-powered workflows, automation, and modern development practices that reduce delivery time and increase efficiency.',
    badge: null,
  },
  {
    id: 'seo-built-in',
    icon: Search,
    title: 'SEO Built Into Every Project',
    description:
      'Every website is structured for technical SEO, Core Web Vitals, metadata, semantic HTML, and long-term organic visibility from day one.',
    badge: null,
  },
  {
    id: 'high-performance',
    icon: Zap,
    title: 'High Performance',
    description:
      'Optimized for fast loading, Core Web Vitals, and consistently high Lighthouse scores to deliver an excellent user experience.',
    badge: '90+ Lighthouse',
  },
  {
    id: 'secure-scalable',
    icon: ShieldCheck,
    title: 'Secure & Scalable Architecture',
    description:
      'Applications are built with scalable architecture, secure authentication, clean code standards, and production-ready deployment practices.',
    badge: null,
  },
  {
    id: 'transparent-updates',
    icon: Calendar,
    title: 'Transparent Weekly Updates',
    description:
      'Receive regular progress updates, milestone tracking, and clear communication throughout every stage of development.',
    badge: null,
  },
  {
    id: 'long-term-support',
    icon: Headphones,
    title: 'Long-Term Technical Support',
    description:
      'Beyond launch, we provide maintenance, improvements, performance optimization, and ongoing technical support as your business evolves.',
    badge: null,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-24 px-6 bg-[#F8FAFC] dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors duration-300 content-visibility-auto">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
            THE CODE WITH AMRENDRA ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] dark:text-white mt-4 mb-6 tracking-tight">
            Why Businesses Choose Code with Amrendra
          </h2>
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            We combine modern engineering, AI automation, SEO, and scalable architecture to build software that grows with your business—not against it.
          </p>
        </div>

        {/* 3-column Desktop / 2-column Tablet / 1-column Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUsData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <ScrollReveal key={item.id} delay={index * 0.06} variant="fade-up" className="h-full">
                <div className="group relative rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] p-6 sm:p-8 transition-all duration-300 hover:border-[#F59E0B]/60 hover:shadow-[0_10px_30px_rgba(11,31,58,0.08),0_4px_20px_rgba(245,158,11,0.15)] hover:-translate-y-1 flex flex-col justify-between h-full overflow-hidden shadow-sm">
                  {/* Subtle Background Glow Effect on Hover */}
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#F59E0B]/5 rounded-full blur-2xl group-hover:bg-[#F59E0B]/15 transition-all duration-500 pointer-events-none" />

                  <div>
                    {/* Header Row inside Card: Icon & Optional Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F59E0B] group-hover:text-[#0B1F3A] transition-all duration-300 shadow-sm">
                        <IconComponent size={24} />
                      </div>

                      {item.badge && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#D97706] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full border border-[#F59E0B]/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3 group-hover:text-[#F59E0B] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
