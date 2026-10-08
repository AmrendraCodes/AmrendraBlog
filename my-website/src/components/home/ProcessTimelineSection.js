import React from 'react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery Call (Free)',
    desc: 'We talk about your goals, your bottlenecks and what success looks like for you.',
  },
  {
    step: '02',
    title: 'Clear Proposal',
    desc: 'You get a fixed scope, timeline and price. No hourly billing surprises.',
  },
  {
    step: '03',
    title: 'Build or Write',
    desc: 'I deliver in short milestones with regular demos, so you see progress and can give feedback early.',
  },
  {
    step: '04',
    title: 'Launch and Improve',
    desc: 'We go live, measure results, and refine based on real data.',
  },
];

export default function ProcessTimelineSection() {
  return (
    <section
      id="process"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24"
      aria-label="Process"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
          HOW I WORK
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
          A Simple Process, Built Around You
        </h2>
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
