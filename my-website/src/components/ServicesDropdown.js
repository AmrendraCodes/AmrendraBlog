'use client';

import Link from "next/link";
import { 
  Code2, 
  TrendingUp, 
  Sparkles, 
  Palette, 
  Cloud, 
  FileSearch, 
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { SERVICES_CATEGORIES, SERVICES_DATA } from "@/lib/services";

const ICON_MAP = {
  Code2,
  TrendingUp,
  Sparkles,
  Palette,
  Cloud,
  FileSearch,
};

export default function ServicesDropdown({ onClose }) {
  // Group services by category
  const buildServices = SERVICES_DATA.filter((s) => s.category === "BUILD");
  const growServices = SERVICES_DATA.filter((s) => s.category === "GROW");
  const scaleServices = SERVICES_DATA.filter((s) => s.category === "SCALE");

  const groups = [
    {
      category: SERVICES_CATEGORIES.BUILD,
      color: "text-[#6366F1] bg-[#6366F1]/10 border-[#6366F1]/20",
      services: buildServices,
    },
    {
      category: SERVICES_CATEGORIES.GROW,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      services: growServices,
    },
    {
      category: SERVICES_CATEGORIES.SCALE,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      services: scaleServices,
    },
  ];

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[min(95vw,860px)] z-[120] pointer-events-auto"
      onMouseLeave={onClose}
    >
      <div className="bg-white/95 dark:bg-[#111214]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-[#2A2B2E] rounded-3xl p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Top accent gradient */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6366F1] via-[#a855f7] to-[#ec4899]" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {groups.map(({ category, color, services }) => (
            <div key={category.id} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200/50 dark:border-[#2A2B2E]">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${color}`}>
                  {category.label}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {category.tagline}
                </span>
              </div>

              {/* Service Links */}
              <div className="space-y-2">
                {services.map((service) => {
                  const Icon = ICON_MAP[service.iconName] || Code2;
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={onClose}
                      className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-[#1A1B1E] transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-[#1A1B1E] border border-slate-200/60 dark:border-[#2A2B2E] text-[#6366F1] dark:text-[#818CF8] flex items-center justify-center shrink-0 group-hover:bg-[#6366F1] group-hover:text-white group-hover:scale-105 transition-all">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors flex items-center justify-between">
                          <span className="truncate">{service.title}</span>
                          <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#6366F1] shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-snug mt-0.5">
                          {service.subtitle}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Strip */}
        <div className="pt-4 border-t border-slate-200/50 dark:border-[#2A2B2E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
            Looking for tailored software &amp; growth architecture?
          </div>
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-bold text-[#6366F1] dark:text-[#818CF8] hover:underline shrink-0"
          >
            <span>Explore All Services</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
