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
  CheckCircle2
} from "lucide-react";

const ICON_MAP = {
  Code2,
  TrendingUp,
  Sparkles,
  Palette,
  Cloud,
  FileSearch,
};

export default function ServiceCard({ service }) {
  const IconComponent = ICON_MAP[service.iconName] || Code2;

  const categoryColors = {
    BUILD: "from-[#0B1F3A] to-[#F59E0B] text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/15 border-[#F59E0B]/30",
    GROW: "from-[#F59E0B] to-[#D97706] text-[#0B1F3A] dark:text-[#FBBF24] bg-[#F59E0B]/10 border-[#F59E0B]/20",
    SCALE: "from-[#0B1F3A] to-[#1E3A8A] text-[#0B1F3A] dark:text-[#F59E0B] bg-[#0B1F3A]/10 dark:bg-white/10 border-[#0B1F3A]/20 dark:border-white/20",
  };

  const badgeStyle = categoryColors[service.category] || categoryColors.BUILD;

  return (
    <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#F59E0B]/50 hover:shadow-[var(--shadow-float)] hover:-translate-y-1">
      {/* Top subtle glow bar */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B]/0 group-hover:via-[#F59E0B]/60 to-transparent transition-all duration-500" />

      {/* Clickable Overlay Link */}
      <Link href={`/services/${service.slug}`} className="absolute inset-0 z-0" aria-label={`View ${service.title}`} />

      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B]/10 to-[#0B1F3A]/10 dark:from-[#F59E0B]/20 dark:to-[#0B1F3A]/20 border border-[#F59E0B]/30 flex items-center justify-center text-[#0B1F3A] dark:text-[#F59E0B] group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <IconComponent size={24} />
            </div>
            <span className={`text-xs font-bold tracking-wider px-3 py-1 rounded-full border ${badgeStyle}`}>
              {service.categoryLabel}
            </span>
          </div>
          <span className="text-2xl font-black font-mono text-[var(--text-muted)] opacity-40 group-hover:opacity-80 transition-opacity">
            {service.indexNumber}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-3 group-hover:text-[#F59E0B] transition-colors">
          <Link href={`/services/${service.slug}`} className="hover:underline">
            {service.title}
          </Link>
        </h3>
        <p className="text-[var(--text-body)] text-sm sm:text-base leading-relaxed mb-6">
          {service.subtitle}
        </p>

        {/* Offering Highlights */}
        <div className="space-y-2 mb-8 border-t border-[var(--card-border)] pt-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
            Key Capabilities:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.offerings.slice(0, 4).map((offering, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-body)]">
                <CheckCircle2 size={14} className="text-[#F59E0B] shrink-0" />
                <span className="truncate">{offering.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-[var(--card-border)] relative z-10">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center justify-between w-full text-sm font-bold text-[#0B1F3A] dark:text-[#F59E0B] group-hover:text-[#F59E0B] transition-colors"
        >
          <span>Learn More &amp; View Details</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
