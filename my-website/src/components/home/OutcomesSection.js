import React from 'react';
import { Clock, Zap, TrendingUp, ShieldCheck, UserCheck } from 'lucide-react';

const OUTCOMES = [
  {
    icon: Clock,
    label: 'Save time',
    text: "Automate the tasks that drain your team's week.",
  },
  {
    icon: Zap,
    label: 'Respond faster',
    text: 'Reply to leads and customers in minutes, not hours.',
  },
  {
    icon: TrendingUp,
    label: 'Rank higher',
    text: 'Win the searches your ideal customers already make.',
  },
  {
    icon: ShieldCheck,
    label: 'Build trust',
    text: 'Publish content that shows you understand the problem.',
  },
  {
    icon: UserCheck,
    label: 'Generate leads',
    text: 'Turn search visits into conversations.',
  },
];

export default function OutcomesSection() {
  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-[#071324] border-b border-slate-200 dark:border-[#1E293B] transition-colors"
      aria-label="What Clients Come to Me For"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            OUTCOMES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            What Clients Come to Me For
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {OUTCOMES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/40 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                    <strong className="text-[#0B1F3A] dark:text-white font-bold">{item.label}:</strong>{' '}
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
