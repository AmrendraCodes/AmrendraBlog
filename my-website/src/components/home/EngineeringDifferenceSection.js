import React from 'react';
import { Check, X } from 'lucide-react';

export default function EngineeringDifferenceSection() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
          THE ENGINEERING DIFFERENCE
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1F3A] dark:text-white mt-4 mb-6 tracking-tight">
          Stop Settling for Bloated Legacy Software
        </h2>
        <p className="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-relaxed">
          Traditional software development is plagued by slow release cycles, technical debt, and fragile architecture. Code with Amrendra builds clean, AI-native platforms engineered for performance and scalability — so your product never buckles under real-world growth.
        </p>
      </div>

      {/* Bento Grid Split: Legacy vs Code with Amrendra */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Legacy Side */}
        <div className="group rounded-3xl bg-slate-50 dark:bg-[#0B1F3A] border border-red-500/30  p-6 sm:p-8 shadow-md  relative overflow-hidden    ">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-500/15 text-red-500 border border-red-500/30 shrink-0   flex items-center justify-center font-bold   shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <X size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white   ">
                Traditional Development Agencies
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                Slow, expensive, &amp; maintenance-heavy
              </p>
            </div>
          </div>
          <ul className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8]">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0 mt-0.5  ">
                <X size={12} strokeWidth={2.5} />
              </span>
              <span className="leading-snug">6-8 months build timelines</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0 mt-0.5  ">
                <X size={12} strokeWidth={2.5} />
              </span>
              <span className="leading-snug">Rigid legacy code and stacks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0 mt-0.5  ">
                <X size={12} strokeWidth={2.5} />
              </span>
              <span className="leading-snug">Manual QA, slow bug fixes</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-500/15 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0 mt-0.5  ">
                <X size={12} strokeWidth={2.5} />
              </span>
              <span className="leading-snug">Vendor lock-in, unclear ownership</span>
            </li>
          </ul>
        </div>

        {/* Code with Amrendra Side */}
        <div className="group rounded-3xl bg-gradient-to-br from-amber-500/5 to-slate-50 dark:from-[#112240] dark:to-[#0B1F3A] border-2 border-[#F59E0B]/50  p-6 sm:p-8 shadow-[0_0_30px_rgba(245,158,11,0.15)]  relative overflow-hidden    ">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F59E0B] text-[#0B1F3A] shrink-0   shadow-[0_0_18px_rgba(245,158,11,0.4)] flex items-center justify-center font-bold  ">
              <Check size={20} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] dark:text-white   ">
                Code with Amrendra — AI Development Services
              </h3>
              <p className="text-xs text-[#D97706] dark:text-[#FBBF24]">
                High-velocity, AI-native &amp; sub-second fast
              </p>
            </div>
          </div>
          <ul className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-[#F8FAFC]">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5   font-bold">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="leading-snug">Rapid launch with AI-accelerated development sprints</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5   font-bold">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="leading-snug">Modern React, Next.js and cloud-native architecture</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5   font-bold">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="leading-snug">Autonomous AI agents for QA, monitoring and audits</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5   font-bold">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="leading-snug">Full source-code ownership, transparent architecture</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
