import React from 'react';
import { Clock, Cpu, BarChart2, ShieldAlert } from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: Clock,
    text: 'Your team spends hours on repetitive tasks (replying to leads, entering data, sorting documents) that software should handle.',
  },
  {
    icon: Cpu,
    text: "You've tried AI tools, but they're disconnected from how your business actually works.",
  },
  {
    icon: BarChart2,
    text: 'Your blog publishes regularly, but it brings traffic that never converts.',
  },
  {
    icon: ShieldAlert,
    text: 'Agencies give you generic articles that no developer or buyer trusts.',
  },
];

export default function ProblemSection() {
  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-[#071324] border-b border-slate-200 dark:border-[#1E293B] transition-colors"
      aria-label="Sound Familiar?"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            CHALLENGES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            Sound Familiar?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {PAIN_POINTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/40 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon size={20} />
                </div>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <p className="text-base sm:text-lg font-bold text-[#0B1F3A] dark:text-[#F59E0B]">
            These are fixable problems, and that&apos;s what I do.
          </p>
        </div>
      </div>
    </section>
  );
}
