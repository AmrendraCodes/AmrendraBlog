import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code2, BookOpen, Cpu } from 'lucide-react';

const CREDIBILITY_ITEMS = [
  {
    icon: Code2,
    title: 'React & Next.js',
    description: 'Modern Frontend Engineering',
  },
  {
    icon: BookOpen,
    title: '15+ Articles',
    description: 'Technical Guides & Tutorials',
  },
  {
    icon: Cpu,
    title: 'AI & Cloud Systems',
    description: 'LLMs, DevOps & SaaS Architecture',
  },
];

export default function AboutAmrendraSection() {
  return (
    <section
      id="about-amrendra"
      aria-label="About Amrendra Kumar"
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-[#1E293B] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Profile Image (~40% on Desktop) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]">
            {/* Subtle Accent Glow */}
            <div
              className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#0B1F3A]/10 via-[#F59E0B]/15 to-transparent dark:from-[#0B1F3A]/30 dark:via-[#F59E0B]/20 blur-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Profile Image Container */}
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-[#1E293B] shadow-[var(--shadow-card)] bg-slate-100 dark:bg-[#0B1F3A]">
              <Image
                src="/profile-photo.jpeg"
                alt="Amrendra Kumar — Frontend Developer & Technical Writer"
                fill
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 400px"
                className="object-cover object-top"
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Credibility (~60% on Desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Eyebrow Badge */}
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            ABOUT THE FOUNDER
          </span>

          {/* Heading (Single H2 for SEO hierarchy) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white leading-[1.15] mb-2">
            Hi, I&apos;m Amrendra <span className="gradient-text">Kumar</span>.
          </h2>

          {/* Role Positioning */}
          <p className="text-base sm:text-lg font-bold text-[#D97706] dark:text-[#F59E0B] mb-4">
            Frontend Developer &amp; Technical Content Writer
          </p>

          {/* Short Introduction (Concise ~50 words) */}
          <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed mb-6 max-w-2xl">
            I&apos;m a frontend developer and technical writer specializing in React, Next.js,
            TypeScript, and modern cloud architectures. I build high-performance web applications and
            craft in-depth technical guides on AI systems, scalable SaaS platforms, and DevOps
            automation—helping businesses and developers turn complex concepts into production-ready software.
          </p>

          {/* 3 Credibility / Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full mb-8">
            {CREDIBILITY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl p-4 bg-[#F8FAFC] dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] transition-colors duration-200 hover:border-[#F59E0B]/50 text-left flex flex-col justify-center"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={17} className="text-[#F59E0B] shrink-0" aria-hidden="true" />
                    <span className="text-sm font-bold text-[#0B1F3A] dark:text-white">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-normal font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div>
            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base transition-colors duration-200 shadow-[var(--shadow-glow)] w-full sm:w-auto"
            >
              <span>More About Me</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
