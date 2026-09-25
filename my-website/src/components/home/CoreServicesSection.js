import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Layers,
  ArrowRight,
  Bot,
  CheckCircle2,
} from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import TiltCard from '../ui/TiltCard';

const CORE_SERVICES = [
  {
    icon: Code2,
    title: 'Full-Stack Web Development',
    outcome: 'Ship fast, production-grade web applications built to scale with zero tech debt.',
    desc: 'End-to-end development using React 19, Next.js 15, and TypeScript — from responsive UI/UX to AWS cloud deployments and API architecture.',
    capabilities: ['SaaS Platforms', 'Responsive Web Apps', 'AWS Cloud & DevOps', 'REST & GraphQL APIs'],
    tag: 'Next.js • React • AWS',
    href: '/services/web-development',
    cta: 'Explore Web Development',
  },
  {
    icon: Bot,
    title: 'AI & Workflow Automation',
    outcome: 'Eliminate repetitive manual tasks with custom AI agents and intelligent automations.',
    desc: 'Custom AI pipelines, LLM agent integrations (OpenAI / Claude), and automated business workflows embedded directly into your software stack.',
    capabilities: ['Autonomous AI Agents', 'LLM Integrations', 'Business Automation', 'RAG Knowledge Bases'],
    tag: 'OpenAI • LangChain • Agents',
    href: '/services/ai-automation',
    cta: 'Explore AI & Automation',
  },
  {
    icon: Layers,
    title: 'SEO & Technical Writing',
    outcome: 'Build topical authority and organic developer trust with engineer-authored content.',
    desc: 'Search-intent keyword strategy, technical SEO audits, and in-depth developer documentation written by an engineer — not a generic agency.',
    capabilities: ['Technical SEO Audits', 'Developer Tutorials', 'Architecture Guides', 'Search Strategy'],
    tag: 'SEO • Documentation • Growth',
    href: '/services/seo-content-strategy',
    cta: 'Explore SEO & Content',
  },
];

export default function CoreServicesSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            WHAT I DO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
            Core Engineering Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed">
            I help startups and modern businesses build high-performance web platforms, automate operations with custom AI agents, and rank through developer-focused technical content.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={index * 0.08} variant="fade-up">
                <TiltCard className="group relative rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/50 p-7 sm:p-8 card-interactive flex flex-col justify-between h-full shadow-sm hover:shadow-lg transition-all duration-200">
                  <div>
                    {/* Header Row: Icon & Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-13 h-13 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center group-hover:bg-[#F59E0B] group-hover:text-[#0B1F3A] transition-colors duration-200 shadow-sm">
                        <Icon size={24} />
                      </div>
                      <span className="text-[11px] font-mono text-[#D97706] dark:text-[#F59E0B] uppercase tracking-wider font-bold bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20">
                        {service.tag}
                      </span>
                    </div>

                    {/* Service Name */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] dark:text-white mb-2 group-hover:text-[#F59E0B] transition-colors">
                      <Link href={service.href} className="no-underline text-inherit">
                        {service.title}
                      </Link>
                    </h3>

                    {/* Outcome Statement */}
                    <p className="text-xs sm:text-sm font-semibold text-[#D97706] dark:text-[#F59E0B] mb-3 leading-snug">
                      {service.outcome}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    {/* Relevant Capabilities */}
                    <div className="pt-4 border-t border-slate-100 dark:border-[#1E293B] mb-6">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">
                        Included Capabilities:
                      </span>
                      <ul className="grid grid-cols-2 gap-2 p-0 m-0 list-none text-xs text-slate-700 dark:text-slate-300">
                        {service.capabilities.map((cap) => (
                          <li key={cap} className="flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-[#F59E0B] shrink-0" />
                            <span className="truncate">{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Explore Service CTA */}
                  <Link
                    href={service.href}
                    className="group/btn inline-flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-[#071324] hover:bg-[#F59E0B] text-[#0B1F3A] dark:text-white hover:text-[#0B1F3A] font-bold text-xs sm:text-sm transition-all duration-200 border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B] no-underline"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
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
