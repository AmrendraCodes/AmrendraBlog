'use client';

import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function ComparisonTable() {
  const comparisonItems = [
    { feature: 'Sub-Second Page Load on Core Web Vitals', us: 'Yes', agency: 'Rare', template: 'No' },
    { feature: 'AI Agent & LLM Integration Ready', us: 'Yes', agency: 'Rare', template: 'No' },
    { feature: 'Enterprise Security & SEO Compliance', us: 'Yes', agency: 'Varies', template: 'No' },
    { feature: 'Serverless AWS Cloud & DevOps Automation', us: 'Yes', agency: 'Varies', template: 'No' },
    { feature: 'Full Source Code & Database Ownership', us: 'Yes', agency: 'Varies', template: 'No' },
    { feature: 'Dedicated Engineering Sprint Delivery (< 2 Weeks)', us: 'Yes', agency: 'Rare', template: 'No' },
    { feature: 'Ongoing Performance Optimization & SLA Monitoring', us: 'Yes', agency: 'Varies', template: 'No' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white dark:bg-[#0A0F0C] border border-slate-200 dark:border-[#1E2E25] p-6 sm:p-8 shadow-sm dark:shadow-2xl overflow-hidden backdrop-blur-xl transition-colors duration-300">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#1E2E25]">
              <th className="pb-4 pt-2 text-sm font-bold text-slate-900 dark:text-[#F3F4F6] w-[45%]">
                Capability / Standard
              </th>
              <th className="pb-4 pt-2 text-center text-sm font-extrabold text-[#10B981] bg-[#10B981]/10 rounded-t-xl border-t border-x border-[#10B981]/30 w-[25%]">
                <div className="flex items-center justify-center gap-1.5 py-1">
                  <Sparkles size={14} />
                  Code with Amrendra
                </div>
              </th>
              <th className="pb-4 pt-2 text-center text-xs font-semibold text-slate-500 dark:text-[#9CA3AF] w-[15%]">
                Traditional Agency
              </th>
              <th className="pb-4 pt-2 text-center text-xs font-semibold text-slate-500 dark:text-[#9CA3AF] w-[15%]">
                Off-the-Shelf Template
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 dark:border-[#1E2E25]/60 hover:bg-slate-50 dark:hover:bg-[#111C16]/40 transition-colors duration-150"
              >
                <td className="py-4 text-xs font-medium text-slate-800 dark:text-[#F3F4F6]">
                  {item.feature}
                </td>

                {/* Us */}
                <td className="py-4 text-center bg-[#10B981]/5 border-x border-[#10B981]/20">
                  {typeof item.us === 'boolean' && item.us ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#10B981]/20 text-[#10B981]">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#10B981]">{item.us}</span>
                  )}
                </td>

                {/* Traditional Agency */}
                <td className="py-4 text-center">
                  {typeof item.agency === 'boolean' ? (
                    item.agency ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white/70">
                        <Check size={12} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-red-500 dark:text-red-400">
                        <X size={12} />
                      </span>
                    )
                  ) : (
                    <span className="text-[11px] text-slate-500 dark:text-[#9CA3AF] font-mono">{item.agency}</span>
                  )}
                </td>

                {/* Standard Template */}
                <td className="py-4 text-center">
                  {typeof item.template === 'boolean' ? (
                    item.template ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white/70">
                        <Check size={12} />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-red-500 dark:text-red-400">
                        <X size={12} />
                      </span>
                    )
                  ) : (
                    <span className="text-[11px] text-slate-500 dark:text-[#9CA3AF] font-mono">{item.template}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
