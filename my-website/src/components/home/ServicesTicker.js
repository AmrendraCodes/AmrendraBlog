import React from 'react';

const TICKER_SERVICES = [
  'Web Development Services',
  'Digital Marketing',
  'UI/UX & Product Design',
  'SEO & Content Strategy',
  'AI Automation Development Services',
  'Cloud & DevOps',
];

export default function ServicesTicker() {
  return (
    <section
      className="w-full py-3.5 border-y border-[#F59E0B]/30 bg-slate-50 dark:bg-[#071324] shadow-[0_0_25px_rgba(245,158,11,0.08)] overflow-hidden relative z-20"
      aria-label="Services ticker"
    >
      <div className="w-full px-4 sm:px-8 flex items-center gap-4">
        {/* Fixed Left News Broadcast Badge */}
        <div className="flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-xs font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-[#F59E0B] shadow-[0_0_15px_rgba(245,158,11,0.2)] z-20">
          <span className="relative flex h-2.5 w-2.5">
            <span className=" absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]"></span>
          </span>
          <span className="hidden sm:inline">LIVE SERVICES</span>
          <span className="sm:hidden">SERVICES</span>
        </div>

        {/* Full Width News Ticker Track */}
        <div className="relative flex-1 min-w-0 overflow-x-auto flex items-center">
          {/* Left & Right Vignette Edge Fades */}

          <div className="flex gap-6 whitespace-nowrap">
            {TICKER_SERVICES.map((service, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#0B1F3A] dark:text-white cursor-default"
              >
                <span className="text-[#F59E0B] text-xs">✦</span>
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
