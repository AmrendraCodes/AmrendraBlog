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
      badgeStyle: "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30",
      services: buildServices,
    },
    {
      category: SERVICES_CATEGORIES.GROW,
      badgeStyle: "text-[#34D399] bg-[#34D399]/10 border-[#34D399]/30",
      services: growServices,
    },
    {
      category: SERVICES_CATEGORIES.SCALE,
      badgeStyle: "text-[#059669] bg-[#059669]/10 border-[#059669]/30",
      services: scaleServices,
    },
  ];

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[min(96vw,920px)] z-[130] pointer-events-auto"
      onMouseLeave={onClose}
    >
      <div className="bg-white dark:bg-[#0A0F0C] border border-slate-200 dark:border-[#1E2E25] rounded-3xl p-8 shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative overflow-hidden">
        {/* Top vibrant accent gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#059669]" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {groups.map(({ category, badgeStyle, services }) => (
            <div key={category.id} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/80 dark:border-[#1E2E25]">
                <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${badgeStyle}`}>
                  {category.label}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-[#9CA3AF] truncate">
                  {category.tagline}
                </span>
              </div>

              {/* Service Links */}
              <div className="space-y-3">
                {services.map((service) => {
                  const Icon = ICON_MAP[service.iconName] || Code2;
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={onClose}
                      className="group flex items-start gap-3.5 p-3 rounded-2xl border border-transparent hover:border-[#10B981]/30 hover:bg-slate-100/80 dark:hover:bg-[#111C16] transition-all duration-300"
                    >
                      <div className="w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-xl bg-slate-100 dark:bg-[#111C16] border border-slate-200 dark:border-[#1E2E25] text-[#10B981] dark:text-[#34D399] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-slate-900 dark:text-[#F3F4F6] group-hover:text-[#10B981] dark:group-hover:text-[#34D399] transition-colors flex items-center justify-between">
                          <span className="truncate">{service.title}</span>
                          <ChevronRight size={15} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#10B981] shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-[#9CA3AF] line-clamp-2 leading-relaxed mt-1">
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
        <div className="pt-5 border-t border-slate-200/80 dark:border-[#1E2E25] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-[#9CA3AF] text-center sm:text-left">
            Looking for customized software &amp; growth architecture for your business?
          </div>
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-[#10B981] hover:underline shrink-0 bg-[#10B981]/10 px-4 py-2 rounded-full border border-[#10B981]/20 hover:bg-[#10B981]/20 transition-all"
          >
            <span>Explore All Services</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
