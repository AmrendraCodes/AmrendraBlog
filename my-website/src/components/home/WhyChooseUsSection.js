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
    title: 'AI-Native Engineering',
    description:
      'Build smarter software with AI-powered workflows, custom agent integrations, and modern automation practices that accelerate delivery.',
    badge: null,
  },
  {
    id: 'seo-built-in',
    icon: Search,
    title: 'Technical SEO Built-In',
    description:
      'Every web application is engineered with semantic HTML, structured metadata, fast Core Web Vitals, and crawlable architecture from day one.',
    badge: null,
  },
  {
    id: 'high-performance',
    icon: Zap,
    title: 'Core Web Vitals Focus',
    description:
      'Optimized for instant page loads, smooth interaction (INP), and zero layout shift to maximize user retention and search rank.',
    badge: null,
  },
  {
    id: 'secure-scalable',
    icon: ShieldCheck,
    title: 'Type-Safe, Scalable Architecture',
    description:
      'Applications are built with TypeScript, modular component patterns, secure API authentications, and production cloud infrastructure.',
    badge: null,
  },
  {
    id: 'transparent-updates',
    icon: Calendar,
    title: 'Direct, Transparent Communication',
    description:
      'Work directly with the engineer building your product — no junior handoffs, no account managers, and regular sprint progress updates.',
    badge: null,
  },
  {
    id: 'long-term-support',
    icon: Headphones,
    title: 'Post-Launch Technical Support',
    description:
      'Beyond deployment, I provide maintenance, infrastructure monitoring, performance fine-tuning, and ongoing technical advisory.',
    badge: null,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors" aria-label="Why Work With Me">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            WHY WORK WITH ME
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            Engineering Standards Built for Growth
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            I combine clean code, custom AI automation, built-in SEO, and direct communication to build software that grows with your business.
          </p>
        </div>

        {/* 3-column Desktop / 2-column Tablet / 1-column Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {whyChooseUsData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <ScrollReveal key={item.id} delay={index * 0.06} variant="fade-up" className="h-full">
                <div className="group relative rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] p-6 sm:p-8 card-feature flex flex-col justify-between h-full overflow-hidden shadow-sm">
                  {/* Subtle Background Glow Effect on Hover */}
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#F59E0B]/5 rounded-full blur-2xl    pointer-events-none" />

                  <div>
                    {/* Header Row inside Card: Icon & Optional Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center      shadow-sm">
                        <IconComponent size={24} />
                      </div>

                      {item.badge && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#D97706] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full border border-[#F59E0B]/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] " />
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3  ">
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
