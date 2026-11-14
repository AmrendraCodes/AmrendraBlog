import React from 'react';
import TiltCard from '../ui/TiltCard';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand Your Requirements',
    desc: 'We align on your product goals, technical constraints, target users, and key performance indicators through a focused discovery call.',
  },
  {
    step: '02',
    title: 'Architecture & Strategy',
    desc: 'I draft the system architecture, database schemas, API contracts, and UX wireframes before writing a single line of production code.',
  },
  {
    step: '03',
    title: 'Rapid Sprints & Execution',
    desc: 'Iterative weekly deliverables with working previews. You test real software throughout development, not slide decks.',
  },
  {
    step: '04',
    title: 'Production Launch & Scale',
    desc: 'End-to-end cloud deployment on Vercel or AWS with automated CI/CD pipelines, analytics tracking, and post-launch stability support.',
  },
];

export default function ProcessTimelineSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="How We Work">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9A4A00] dark:text-[#F5A00B] bg-[#FFF3DC] dark:bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/30 inline-block mb-3.5 shadow-2xs">
          HOW WE WORK
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1B2433] dark:text-white tracking-tight mb-4">
          A Clear <span className="text-[#1E3A8A] dark:text-amber-400">4-Step Process</span> from Call to Launch
        </h2>
        <p className="text-base sm:text-lg text-[#1B2433]/75 dark:text-slate-300 leading-relaxed">
          No bloated meetings or endless delays. A structured, transparent engineering process from kickoff to deployment.
        </p>
      </div>

      {/* 4 Process Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((item) => (
          <TiltCard key={item.step} className="h-full" maxTilt={8}>
            <div
              className="group relative rounded-3xl bg-white dark:bg-[#0B1728] border border-slate-200/90 dark:border-slate-800 hover:border-[#F5A00B]/60 p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200 h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#F5A00B]">
                    {item.step}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFF3DC] dark:bg-amber-500/20 border border-[#F5A00B] group-hover:scale-125 transition-transform" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1B2433] dark:text-white mb-2.5 group-hover:text-[#9A4A00] dark:group-hover:text-[#F5A00B] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#1B2433]/70 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
