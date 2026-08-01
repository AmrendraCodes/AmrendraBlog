'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { RESOURCES_DROPDOWN_ITEMS } from "@/config/navigation";

interface ResourcesDropdownProps {
  onClose: () => void;
}

export default function ResourcesDropdown({ onClose }: ResourcesDropdownProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[min(94vw,560px)] z-[130] pointer-events-auto"
      onMouseLeave={onClose}
      role="menu"
      aria-label="Resources menu"
    >
      <div className="bg-white dark:bg-[#0A0F0C] border border-slate-200 dark:border-[#1E2E25] rounded-3xl p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden">
        {/* Top vibrant accent gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#059669]" />

        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#9CA3AF] mb-4 px-2 flex items-center justify-between">
          <span>Knowledge & Insights</span>
          <span className="bg-[#10B981]/10 text-[#10B981] dark:text-[#34D399] px-2.5 py-0.5 rounded-full text-[10px]">
            Updated Weekly
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {RESOURCES_DROPDOWN_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                role="menuitem"
                className="group flex flex-col justify-between p-4 rounded-2xl border border-slate-100 dark:border-[#1E2E25]/60 bg-slate-50/50 dark:bg-[#111C16]/40 hover:border-[#10B981]/40 hover:bg-slate-100/90 dark:hover:bg-[#111C16] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111C16] border border-slate-200 dark:border-[#1E2E25] text-[#10B981] dark:text-[#34D399] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon size={20} />
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#10B981] dark:text-[#34D399] shrink-0" 
                    />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F3F4F6] group-hover:text-[#10B981] dark:group-hover:text-[#34D399] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#9CA3AF] leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-[#1E2E25]/60 flex items-center justify-between text-xs font-semibold text-[#10B981] dark:text-[#34D399]">
                  <span>{item.ctaText}</span>
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Strip */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-[#1E2E25] flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-[#9CA3AF]">
            Explore our complete engineering hub
          </span>
          <Link
            href="/resources"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-xs text-[#10B981] dark:text-[#34D399] hover:underline bg-[#10B981]/10 px-3 py-1.5 rounded-full border border-[#10B981]/20 hover:bg-[#10B981]/20 transition-all"
          >
            <span>Overview Page</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
