import React from 'react';
import { UserCheck, Target, Code2, Scale, ShieldCheck } from 'lucide-react';

const WHY_WORK_WITH_ME = [
  {
    icon: UserCheck,
    title: 'Direct communication',
    desc: 'You talk to the person doing the work. No layers between you and the engineer.',
  },
  {
    icon: Target,
    title: 'Goal-driven engineering',
    desc: "I start with your goal, not the technology. If a simple automation solves it, I won't sell you a complex agent.",
  },
  {
    icon: Code2,
    title: 'Technical depth in writing',
    desc: 'Technical depth in writing. I run code and test workflows before I publish about them.',
  },
  {
    icon: Scale,
    title: 'Honest scoping',
    desc: "Honest scoping. If something isn't worth building, I'll tell you.",
  },
  {
    icon: ShieldCheck,
    title: 'Built to last',
    desc: 'Built to last. Clean documentation, handover and post-launch support.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-[#071324] border-y border-slate-200 dark:border-[#1E293B] transition-colors"
      aria-label="Why Clients Choose to Work With Me"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            WHY WORK WITH ME
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            Why Clients Choose to Work With Me
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {WHY_WORK_WITH_ME.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-[#F59E0B]/40 transition-all duration-200 flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center mb-5 shrink-0">
                  <Icon size={22} />
                </div>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
