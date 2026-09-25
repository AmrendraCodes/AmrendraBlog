import React from 'react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand Your Requirements',
    desc: 'We map out your business goals, target audience, and technical requirements before writing a single line of code.',
  },
  {
    step: '02',
    title: 'Architecture & Strategy',
    desc: 'I design the database schema, frontend UI/UX structure, and AI/API integration blueprints engineered for long-term scale.',
  },
  {
    step: '03',
    title: 'High-Velocity Execution',
    desc: 'Fast, iterative development sprints with clean, type-safe code, regular milestone demos, and complete transparency.',
  },
  {
    step: '04',
    title: 'Review, Deploy & Optimize',
    desc: 'Production deployment on secure cloud infrastructure, performance audits for Core Web Vitals, and ongoing post-launch support.',
  },
];

export default function ProcessTimelineSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="How I Work">
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
          HOW I WORK
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight mb-4">
          A Direct, Transparent 4-Step Process
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed">
          From initial discovery to production deployment, every project follows a predictable, battle-tested engineering roadmap.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((item) => (
          <div
            key={item.step}
            className="group relative rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/50 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#D97706] dark:text-[#F59E0B]">
                  {item.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]/40 group-hover:bg-[#F59E0B] transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] dark:text-white mb-2.5 group-hover:text-[#F59E0B] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
