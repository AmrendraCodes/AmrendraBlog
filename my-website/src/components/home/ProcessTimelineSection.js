'use client';

import React from 'react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Architecture',
    desc: 'We map business goals into a technical architecture blueprint before a single line of code is written.',
  },
  {
    step: '02',
    title: 'High-Velocity Sprints',
    desc: 'Agile development cycles with weekly demos, keeping your custom software development project moving fast without sacrificing quality.',
  },
  {
    step: '03',
    title: 'Autonomous QA & Audit',
    desc: 'AI-assisted testing agents catch regressions early, backed by manual senior engineering review.',
  },
  {
    step: '04',
    title: 'Cloud Deployment & SLA',
    desc: 'Production deployment on AWS with monitoring, uptime SLAs, and ongoing performance support.',
  },
];

export default function ProcessTimelineSection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto content-visibility-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
          HOW WE EXECUTE
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] dark:text-white mt-4 mb-6 tracking-tight">
          Our 4-Step Engineering Process
        </h2>
        <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
          From architecture blueprint to production launch, Code with Amrendra maintains complete transparency and continuous weekly sprint deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((item, idx) => (
          <div
            key={idx}
            className="rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] p-6 hover:border-[#F59E0B]/50 transition-all duration-300 flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="text-3xl font-extrabold font-mono text-[#F59E0B] block mb-4">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
