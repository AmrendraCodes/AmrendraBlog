import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Code2, Search, Sparkles } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import TiltCard from '../ui/TiltCard';

const CORE_OFFERINGS = [
  {
    icon: Code2,
    title: 'Next.js Development',
    desc: 'Fast, SEO-ready web applications built with App Router, SSR, and modern React 19 architecture.',
    href: '/services/web-development',
  },
  {
    icon: Bot,
    title: 'AI Agent Construction',
    desc: 'Custom autonomous workflows, tool-calling agents, and LLM integrations that automate business processes.',
    href: '/services/ai-automation',
  },
  {
    icon: Search,
    title: 'Technical SEO & Speed',
    desc: 'Core Web Vitals optimization, programmatic SEO architecture, and top-tier Google crawlability.',
    href: '/services/seo-content-strategy',
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 bg-[#FFFDF9] dark:bg-[#070F1E] px-4 pb-16 pt-28 text-[#1B2433] dark:text-slate-100 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8">
      {/* Subtle warm ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(245,160,11,0.12),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-48 -z-10 h-72 w-[min(90vw,52rem)] -translate-x-1/2 rounded-full bg-[#FFF3DC]/80 dark:bg-amber-500/5 blur-[90px]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        {/* Eyebrow Tag */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-[#FFF3DC] dark:bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#9A4A00] dark:text-[#F5A00B] shadow-2xs">
          <Sparkles size={13} className="text-[#9A4A00] dark:text-[#F5A00B]" aria-hidden="true" />
          FULL-STACK &amp; AI AGENT SPECIALIST
        </div>

        {/* H1 Headline */}
        <h1
          className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-[#1B2433] dark:text-white sm:text-5xl md:text-6xl"
        >
          Next.js Developer &amp; AI Agent{' '}
          <span className="text-[#1E3A8A] dark:text-amber-400">Builder</span>{' '}
          for Startups and Growing Businesses
        </h1>

        {/* Subtitle */}
        <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-[#1B2433]/80 dark:text-slate-300 sm:text-lg sm:leading-8">
          I build fast, SEO-friendly React &amp; Next.js web applications, build custom AI agent
          workflows, and optimize technical infrastructure for measurable business growth.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4">
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#F5A00B] hover:bg-[#E08F00] px-7 py-3 text-sm font-bold text-[#1B2433] shadow-md shadow-amber-500/20 transition duration-200 hover:-translate-y-0.5 sm:w-auto sm:text-base no-underline"
            >
              <span>Let&apos;s Build Something</span>
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/resources/case-studies"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-sm font-semibold text-[#1B2433] dark:text-slate-200 shadow-2xs transition duration-200 hover:border-amber-500/60 hover:text-[#9A4A00] dark:hover:text-amber-400 sm:w-auto sm:text-base no-underline"
            >
              See Past Work
            </Link>
          </MagneticButton>
        </div>

        {/* 3 Summary Feature Cards */}
        <div className="mt-12 grid w-full grid-cols-1 gap-4 text-left sm:grid-cols-3 sm:gap-5">
          {CORE_OFFERINGS.map((item) => {
            const Icon = item.icon;
            return (
              <TiltCard key={item.title} className="h-full" maxTilt={8}>
                <Link
                  href={item.href}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0B1728] p-5 sm:p-6 shadow-sm hover:border-[#F5A00B]/60 hover:shadow-md transition-all duration-200 no-underline h-full"
                >
                  <div>
                    <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF3DC] dark:bg-amber-500/10 text-[#9A4A00] dark:text-[#F5A00B] border border-amber-500/25 floating-icon">
                      <Icon size={19} aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-[#1B2433] dark:text-white group-hover:text-[#9A4A00] dark:group-hover:text-[#F5A00B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#1B2433]/70 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#9A4A00] dark:text-[#F5A00B]">
                    <span>Learn more</span>
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
