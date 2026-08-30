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
import { SERVICES_CATEGORIES, SERVICES_DATA } from "@/data/servicesData";

const ICON_MAP = {
  Code2,
  TrendingUp,
  Sparkles,
  Palette,
  Cloud,
  FileSearch,
};

export default function ServicesDropdown({ onClose, onMouseEnter, onMouseLeave }) {
  // Group services by category
  const buildServices = SERVICES_DATA.filter((s) => s.category === "BUILD");
  const growServices = SERVICES_DATA.filter((s) => s.category === "GROW");
  const scaleServices = SERVICES_DATA.filter((s) => s.category === "SCALE");

  const groups = [
    {
      category: SERVICES_CATEGORIES.BUILD,
      badgeStyle: "text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/15 border-[#F59E0B]/30",
      services: buildServices,
    },
    {
      category: SERVICES_CATEGORIES.GROW,
      badgeStyle: "text-[#0B1F3A] dark:text-[#FBBF24] bg-[#F59E0B]/10 border-[#F59E0B]/20",
      services: growServices,
    },
    {
      category: SERVICES_CATEGORIES.SCALE,
      badgeStyle: "text-[#0B1F3A] dark:text-[#F59E0B] bg-[#0B1F3A]/10 dark:bg-white/10 border-[#0B1F3A]/20 dark:border-white/20",
      services: scaleServices,
    },
  ];

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(94vw,900px)] z-[130] pointer-events-auto before:content-[''] before:absolute before:inset-x-0 before:-top-5 before:h-5 before:pointer-events-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave || onClose}
    >
      <div className="bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] rounded-3xl p-8 shadow-[0_20px_50px_rgba(11,31,58,0.2)] relative overflow-hidden">
        {/* Top vibrant accent gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0B1F3A] via-[#F59E0B] to-[#D97706]" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {groups.map(({ category, badgeStyle, services }) => (
            <div key={category.id} className="space-y-4">
              {/* Category Header */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200/80 dark:border-[#1E293B]">
                <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${badgeStyle}`}>
                  {category.label}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-[#94A3B8] truncate">
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
                      className="group flex items-start gap-3.5 p-3 rounded-2xl border border-transparent hover:border-[#F59E0B]/30 hover:bg-slate-50 dark:hover:bg-[#112240] transition-all duration-300"
                    >
                      <div className="w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-xl bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#F59E0B] group-hover:text-[#0B1F3A] transition-all duration-300 shadow-sm">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] group-hover:text-[#F59E0B] dark:group-hover:text-[#F59E0B] transition-colors flex items-center justify-between">
                          <span className="truncate">{service.title}</span>
                          <ChevronRight size={15} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#F59E0B] shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-[#94A3B8] line-clamp-2 leading-relaxed mt-1">
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
        <div className="pt-5 border-t border-slate-200/80 dark:border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-[#94A3B8] text-center sm:text-left">
            Looking for customized software &amp; growth architecture for your business?
          </div>
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-[#0B1F3A] dark:text-[#F59E0B] hover:underline shrink-0 bg-[#F59E0B]/10 px-4 py-2 rounded-full border border-[#F59E0B]/30 hover:bg-[#F59E0B]/20 transition-all"
          >
            <span>Explore All Services</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
