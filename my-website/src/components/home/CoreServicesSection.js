import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Layers,
  ChevronRight,
  Bot,
} from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import TiltCard from '../ui/TiltCard';

const CORE_SERVICES = [
  {
    icon: Code2,
    title: 'Full-Stack Web Development',
    desc: 'End-to-end development using React, Next.js, and TypeScript — from UI/UX design and responsive frontend engineering to AWS cloud deployment, CI/CD pipelines, and production hosting.',
    tag: 'Next.js • React • AWS',
    href: '/services/web-development',
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    desc: 'Custom AI agents and workflow automations that connect LLM APIs, build intelligent chatbots, and eliminate repetitive manual tasks — integrated directly into your product.',
    tag: 'OpenAI • LangChain • RAG',
    href: '/services/ai-automation',
  },
  {
    icon: Layers,
    title: 'SEO & Technical Content Writing',
    desc: 'Search-intent keyword strategy, technical SEO audits, and in-depth content written by a developer — not a generic content agency. Built to rank and build topical authority.',
    tag: 'SEO • Content • Growth',
    href: '/services/seo-content-strategy',
  },
];

export default function CoreServicesSection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
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
                <TiltCard className="group relative rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] p-8 card-interactive flex flex-col justify-between h-full shadow-sm">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center mb-6 group-hover:bg-[#F59E0B]/10 transition-colors duration-200 shadow-sm">
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
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1F3A] dark:text-[#F59E0B] group-hover:text-[#F59E0B]  transition-colors"
                  >
                    <span>Learn More</span>
                    <ChevronRight size={14} className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
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
