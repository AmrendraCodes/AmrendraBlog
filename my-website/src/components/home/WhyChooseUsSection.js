import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import TiltCard from '../ui/TiltCard';

const STANDARDS_DATA = [
  {
    step: '01',
    title: 'Clean Code Architecture',
    description:
      'Component-driven, modular React/Next.js codebases designed for maintainability, zero bloat, and easy scalability as team grows.',
  },
  {
    step: '02',
    title: 'Modern Full Stack',
    description:
      'Next.js App Router, React 19, TypeScript, Tailwind CSS, Supabase, and PostgreSQL for robust end-to-end architectures.',
  },
  {
    step: '03',
    title: 'Autonomous AI Agent Loops',
    description:
      'Self-correcting LLM agents, dynamic context injection, RAG systems, and function-calling workflows using LangGraph and OpenAI.',
  },
  {
    step: '04',
    title: 'Sub-Second Performance',
    description:
      'Lighthouse 95+ scores across all metrics. Streaming SSR, image optimization, edge caching, and zero Cumulative Layout Shift (CLS).',
  },
  {
    step: '05',
    title: 'High-Impact Technical SEO',
    description:
      'Server-rendered metadata, dynamic XML sitemaps, JSON-LD Schema markup, canonical tag handling, and Google Core Web Vitals compliance.',
  },
  {
    step: '06',
    title: 'Production Security & Privacy',
    description:
      'Secure authentication, end-to-end type safety, encrypted API tokens, sanitized database inputs, and hardened cloud deployments.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFDF9] border-b border-slate-200/80 transition-colors" aria-label="Engineering Standards">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9A4A00] bg-[#FFF3DC] px-4 py-1.5 rounded-full border border-amber-500/30 inline-block mb-3.5 shadow-2xs">
            ENGINEERING STANDARDS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B2433] tracking-tight mb-4">
            Engineering Built for <span className="text-[#1E3A8A]">Search and Growth</span>
          </h2>
          <p className="text-base sm:text-lg text-[#1B2433]/75 leading-relaxed max-w-2xl mx-auto">
            Every line of code is written with performance, clean maintainability, and search visibility as core requirements.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {STANDARDS_DATA.map((item, index) => (
            <ScrollReveal key={item.step} delay={index * 0.05} variant="fade-up" className="h-full">
              <TiltCard className="h-full" maxTilt={8}>
                <div className="group relative rounded-3xl bg-white border border-slate-200/90 p-7 sm:p-8 flex flex-col justify-between h-full shadow-xs hover:shadow-md hover:border-amber-400/50 transition-all duration-300">
                  <div>
                    {/* Step Pill */}
                    <div className="mb-5">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#FFF3DC] border border-amber-500/30 text-[#9A4A00] font-mono font-extrabold text-sm shadow-2xs">
                        {item.step}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#1B2433] mb-3 group-hover:text-[#9A4A00] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#1B2433]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}