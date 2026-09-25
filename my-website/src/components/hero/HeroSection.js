import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Bot, FileText } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const CORE_OFFERINGS = [
  {
    icon: Code2,
    title: 'Full-Stack Web Development',
    desc: 'Production-ready Next.js & React platforms engineered for speed, clean architecture, and scale.',
    tag: 'Next.js • TypeScript',
    action: 'Explore Web Engineering',
    href: '/services/web-development',
  },
  {
    icon: Bot,
    title: 'AI & Workflow Automation',
    desc: 'Custom AI agents, LLM API integrations, and workflow automations that eliminate manual tasks.',
    tag: 'OpenAI • LLMs • Agents',
    action: 'Explore AI Solutions',
    href: '/services/ai-automation',
  },
  {
    icon: FileText,
    title: 'SEO & Technical Writing',
    desc: 'Search-intent strategy, in-depth developer tutorials, and technical content built to rank and build authority.',
    tag: 'Technical SEO • Content',
    action: 'Explore Content Strategy',
    href: '/services/seo-content-strategy',
  },
];

export default function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-14 md:pb-18 overflow-hidden border-b border-slate-200 dark:border-[#1E293B] transition-colors duration-200">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-20 dark:opacity-30 pointer-events-none" />

      {/* Central Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_70%)] blur-3xl pointer-events-none transition-colors duration-200" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] mb-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          BEST-IN-CLASS SOFTWARE &amp; AI ENGINEERING
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 text-[#0B1F3A] dark:text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#F59E0B] dark:from-white dark:via-[#F8FAFC] dark:to-[#F59E0B] text-transparent bg-clip-text drop-shadow-sm dark:drop-shadow-[0_0_35px_rgba(245,158,11,0.3)]">
            Custom AI Development Services
          </span>{' '}
          for Businesses Built to Scale.
        </h1>

        {/* Subtitle Description */}
        <div className="max-w-3xl mb-8 px-6 sm:px-8 py-4 rounded-2xl bg-white/80 dark:bg-[#0B1F3A]/70 border border-slate-200 dark:border-[#1E293B] shadow-sm backdrop-blur-md">
          <p className="text-base sm:text-lg text-slate-700 dark:text-[#F8FAFC] leading-relaxed font-medium [text-wrap:balance]">
            Code with Amrendra delivers AI Development Services, Custom Software, SaaS Architecture &amp; Cloud Solutions that help modern businesses build faster.
          </p>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base transition-colors duration-200 shadow-[0_0_25px_rgba(245,158,11,0.3)] w-full sm:w-auto"
            >
              <span>Start Free Consultation</span>
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>

          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-white dark:bg-[#071324] text-[#0B1F3A] dark:text-[#F8FAFC] font-bold text-base transition-colors duration-200 hover:border-[#F59E0B] hover:text-[#F59E0B] hover:bg-slate-50 dark:hover:bg-[#112240] w-full sm:w-auto shadow-sm"
            >
              Explore Our Services
            </Link>
          </MagneticButton>
        </div>

        {/* 3 Core Offerings Genuine Visual Strip */}
        <div className="mt-12 sm:mt-14 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {CORE_OFFERINGS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group relative rounded-2xl p-5 bg-white/90 dark:bg-[#0B1F3A]/85 border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/60 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between no-underline"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] bg-slate-100 dark:bg-[#071324] px-2.5 py-1 rounded-full border border-slate-200 dark:border-[#1E293B]">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F3A] dark:text-white group-hover:text-[#F59E0B] transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed line-clamp-2 mb-3">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-[#1E293B] flex items-center justify-between text-xs font-bold text-[#D97706] dark:text-[#F59E0B]">
                  <span>{item.action}</span>
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
