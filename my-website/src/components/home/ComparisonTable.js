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
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] p-6 sm:p-8 shadow-sm overflow-hidden backdrop-blur-xl  ">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#1E293B]">
              <th className="pb-4 pt-2 text-sm font-bold text-[#0B1F3A] dark:text-[#F8FAFC] w-[45%]">
                Capability / Standard
              </th>
              <th className="pb-4 pt-2 text-center text-sm font-extrabold text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/15 rounded-t-xl border-t border-x border-[#F59E0B]/40 w-[25%]">
                <div className="flex items-center justify-center gap-1.5 py-1">
                  <Sparkles size={14} className="text-[#F59E0B]" />
                  Code with Amrendra
                </div>
              </th>
              <th className="pb-4 pt-2 text-center text-xs font-semibold text-slate-500 dark:text-[#94A3B8] w-[15%]">
                Traditional Agency
              </th>
              <th className="pb-4 pt-2 text-center text-xs font-semibold text-slate-500 dark:text-[#94A3B8] w-[15%]">
                Off-the-Shelf Template
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 dark:border-[#1E293B]/60    "
              >
                <td className="py-4 text-xs font-medium text-slate-800 dark:text-[#F8FAFC]">
                  {item.feature}
                </td>

                {/* Us */}
                <td className="py-4 text-center bg-[#F59E0B]/5 border-x border-[#F59E0B]/20">
                  {typeof item.us === 'boolean' && item.us ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#F59E0B]/20 text-[#D97706] dark:text-[#F59E0B]">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#D97706] dark:text-[#F59E0B]">{item.us}</span>
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
                    <span className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-mono">{item.agency}</span>
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
                    <span className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-mono">{item.template}</span>
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
