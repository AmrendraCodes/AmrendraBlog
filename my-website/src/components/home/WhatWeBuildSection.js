'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Rocket, 
  Sparkles, 
  Globe, 
  Workflow, 
  Cloud, 
  Plug, 
  ArrowRight 
} from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const SERVICES = [
  {
    title: 'SaaS Products',
    desc: 'Scalable SaaS platforms, dashboards & subscription systems',
    icon: Rocket,
    href: '/services/web-development',
  },
  {
    title: 'AI Applications',
    desc: 'AI agents, intelligent workflows & automation',
    icon: Sparkles,
    href: '/services/ai-automation',
  },
  {
    title: 'Web Platforms',
    desc: 'High-performance websites & web applications',
    icon: Globe,
    href: '/services/web-development',
  },
  {
    title: 'Business Automation',
    desc: 'Automated workflows that reduce repetitive work',
    icon: Workflow,
    href: '/services/ai-automation',
  },
  {
    title: 'Cloud Solutions',
    desc: 'Secure, scalable AWS & cloud infrastructure',
    icon: Cloud,
    href: '/services/cloud-devops',
  },
  {
    title: 'API & Integrations',
    desc: 'Reliable APIs and third-party integrations',
    icon: Plug,
    href: '/services/web-development',
  },
];

export default function WhatWeBuildSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto content-visibility-auto" aria-label="What We Build">
      {/* Top Header Area */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20 inline-block mb-4">
          WHAT WE BUILD
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
          What We Build for Modern Businesses
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto">
          From customer-facing products to internal systems, we engineer software around your business goals.
        </p>
      </div>

      {/* 3-Column Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
        {SERVICES.map((service, index) => {
          const Icon = service.icon;
          return (
            <ScrollReveal key={service.title} delay={index * 0.06} variant="fade-up">
              <Link
                href={service.href}
                className="group relative rounded-2xl bg-slate-50 dark:bg-[#0A0F0C] border border-slate-200 dark:border-[#1E2E25] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300 hover:border-[#10B981]/60 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(16,185,129,0.12)] shadow-sm dark:shadow-none"
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 flex items-center justify-center mb-5 shrink-0 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={22} />
                  </div>

                  {/* Title & Arrow */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#10B981] transition-colors">
                      {service.title}
                    </h3>
                    <ArrowRight
                      size={18}
                      className="text-slate-400 dark:text-slate-600 group-hover:text-[#10B981] group-hover:translate-x-1 transition-all shrink-0 ml-2"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-[#9CA3AF] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center">
        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-base transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Explore Our Capabilities</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
