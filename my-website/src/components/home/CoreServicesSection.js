'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Cloud,
  Zap,
  Layers,
  Globe,
  ChevronRight,
  Bot,
} from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import TiltCard from '../ui/TiltCard';

const CORE_SERVICES = [
  {
    icon: Code2,
    title: 'Full-Stack Web Engineering',
    desc: 'End-to-end Web Development Services using React, Next.js, and TypeScript — built for speed, SEO, and long-term maintainability across every device.',
    tag: 'Next.js • React • TS',
    href: '/services/web-development',
  },
  {
    icon: Bot,
    title: 'AI & Autonomous LLM Agents',
    desc: 'Custom AI Agent Development Services that automate workflows, support decision-making, and integrate large language models directly into your product — a core pillar of our AI Automation Development Services.',
    tag: 'OpenAI • LangChain • RAG',
    href: '/services/ai-automation',
  },
  {
    icon: Globe,
    title: 'UI/UX & Product Architecture',
    desc: 'From MVP to multi-tenant scale, our SaaS & Product Design Services cover user flows, interface prototyping, and high-conversion visual design.',
    tag: 'Figma • Design System • UI',
    href: '/services/ui-ux-product-design',
  },
  {
    icon: Cloud,
    title: 'AWS Cloud & DevOps Automation',
    desc: 'Fully managed Cloud Software Development Services — CI/CD pipelines, infrastructure-as-code, container orchestration, and 24/7 monitoring on AWS.',
    tag: 'AWS • Docker • Terraform',
    href: '/services/cloud-devops',
  },
  {
    icon: Layers,
    title: 'SEO & Growth Strategy',
    desc: 'Technical SEO audits, data-driven content strategy, structured schema markup, and organic search optimization to scale search visibility.',
    tag: 'SEO • Content • Growth',
    href: '/services/seo-content-strategy',
  },
  {
    icon: Zap,
    title: 'Digital Marketing & Conversion',
    desc: 'Comprehensive digital marketing strategies covering paid media, search acquisition, and conversion rate optimization (CRO).',
    tag: 'Growth • PPC • CRO',
    href: '/services/digital-marketing',
  },
];

export default function CoreServicesSection() {
  return (
    <section className="py-24 px-6 bg-[#F8FAFC] dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors duration-300 relative content-visibility-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
            CORE SERVICES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] dark:text-white mt-4 mb-6 tracking-tight">
            Enterprise Software Solutions
          </h2>
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            Code with Amrendra specializes in modern full-stack web engineering, custom AI agent integrations, cloud architecture, and high-conversion digital experiences — delivered as complete AI Development Services, Web Development Services, and SaaS Development Services under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.08} variant="fade-up">
                <TiltCard className="group relative rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] p-8 transition-all duration-300 hover:border-[#F59E0B]/60 hover:shadow-[0_10px_30px_rgba(11,31,58,0.08),0_4px_20px_rgba(245,158,11,0.15)] flex flex-col justify-between h-full shadow-sm">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#F59E0B] group-hover:text-[#0B1F3A] transition-all duration-300 shadow-sm">
                      <Icon size={26} />
                    </div>
                    <span className="text-[10px] font-mono text-[#D97706] dark:text-[#F59E0B] uppercase tracking-wider block mb-2 font-bold">
                      {service.tag}
                    </span>
                    <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white mb-3 group-hover:text-[#F59E0B] transition-colors">
                      <Link href={service.href}>{service.title}</Link>
                    </h3>
                    <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed mb-6">
                      {service.desc}
                    </p>
                  </div>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] dark:text-[#F59E0B] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all"
                  >
                    <span>Learn More</span>
                    <ChevronRight size={14} />
                  </Link>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
