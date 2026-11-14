import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Code2, FileText, Sparkles } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';

const CORE_OFFERINGS = [
  {
    icon: Code2,
    title: 'Web engineering',
    desc: 'Fast, scalable Next.js platforms built around your business.',
    href: '/services/web-development',
  },
  {
    icon: Bot,
    title: 'AI & automation',
    desc: 'Practical AI agents and workflows that give your team time back.',
    href: '/services/ai-automation',
  },
  {
    icon: FileText,
    title: 'SEO & content',
    desc: 'Technical content and search strategy made to build authority.',
    href: '/services/seo-content-strategy',
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/15 bg-[#42628E] px-4 pb-14 pt-28 text-[#F2EFEB] sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#42628E_0%,#607591_48%,#798496_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid-bg opacity-20" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-64 -z-10 h-80 w-[min(90vw,56rem)] -translate-x-1/2 rounded-full bg-[#9BBCE8]/15 blur-[100px]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E4EAF2] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:text-xs">
          <Sparkles size={14} className="text-[#DBCBB9]" aria-hidden="true" />
          Software &amp; AI, built for growth
        </div>

        <h1
          className="max-w-4xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl md:text-[3.5rem] lg:text-[3.5rem]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Custom AI development services
          <span className="mt-1 block bg-gradient-to-r from-[#F2EFEB] via-[#DBCBB9] to-[#B7D2F5] bg-clip-text text-transparent">
            for what comes next.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#E0E7F0] sm:text-lg sm:leading-8">
          Turn complex ideas into useful software, AI workflows, and cloud
          products — designed to help your business move forward.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/contact"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#F2EFEB] px-6 py-3 text-sm font-bold text-[#172B49] shadow-[0_8px_30px_rgba(10,20,36,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-white sm:w-auto sm:text-base"
            >
              <span>Start a conversation</span>
              <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/services"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:border-white/50 hover:bg-white/[0.12] sm:w-auto sm:text-base"
            >
              Explore our services
            </Link>
          </MagneticButton>
        </div>

        <div className="mt-6 grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:gap-4">
          {CORE_OFFERINGS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-start gap-3 rounded-xl border border-white/15 bg-white/[0.06] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.1] sm:p-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.08] text-[#DBCBB9]">
                  <Icon size={17} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white group-hover:text-[#DBCBB9]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#B6C2D3]">
                    {item.desc}
                  </span>
                </span>
                <ArrowRight size={14} className="ml-auto mt-1 shrink-0 text-[#9BBCE8] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
