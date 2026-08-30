'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { RESOURCES_DROPDOWN_ITEMS } from "@/config/navigation";

interface ResourcesDropdownProps {
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ResourcesDropdown({ onClose, onMouseEnter, onMouseLeave }: ResourcesDropdownProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(94vw,560px)] z-[130] pointer-events-auto before:content-[''] before:absolute before:inset-x-0 before:-top-5 before:h-5 before:pointer-events-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave || onClose}
      role="menu"
      aria-label="Resources menu"
    >
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] rounded-3xl p-6 shadow-[0_20px_50px_rgba(11,31,58,0.18)] relative overflow-hidden">
        {/* Top vibrant accent gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0B1F3A] via-[#F59E0B] to-[#D97706]" />

        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-[#94A3B8] mb-4 px-2 flex items-center justify-between">
          <span>Knowledge &amp; Insights</span>
          <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#F59E0B]/20">
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
                className="group flex flex-col justify-between p-4 rounded-2xl border border-slate-100 dark:border-[#1E293B] bg-slate-50/50 dark:bg-[#112240]/60 hover:border-[#F59E0B]/40 hover:bg-slate-100/90 dark:hover:bg-[#112240] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#F59E0B] group-hover:text-[#0B1F3A] transition-all duration-300 shadow-sm">
                      <Icon size={20} />
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#F59E0B] shrink-0" 
                    />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-[#F59E0B] dark:group-hover:text-[#F59E0B] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8] leading-relaxed line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-[#1E293B] flex items-center justify-between text-xs font-semibold text-[#0B1F3A] dark:text-[#F59E0B]">
                  <span>{item.ctaText}</span>
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer Strip */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-[#1E293B] flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">
            Explore our complete engineering hub
          </span>
          <Link
            href="/resources"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-xs text-[#0B1F3A] dark:text-[#F59E0B] hover:underline bg-[#F59E0B]/10 px-3 py-1.5 rounded-full border border-[#F59E0B]/20 hover:bg-[#F59E0B]/20 transition-all"
          >
            <span>Overview Page</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
