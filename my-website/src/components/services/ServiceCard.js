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
    BUILD: "from-[#6366F1] to-[#a855f7] text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    GROW: "from-[#06B6D4] to-[#3B82F6] text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    SCALE: "from-[#EC4899] to-[#8B5CF6] text-pink-400 bg-pink-500/10 border-pink-500/20",
  };

  const badgeStyle = categoryColors[service.category] || categoryColors.BUILD;

  return (
    <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#6366F1]/50 hover:shadow-[var(--shadow-float)] hover:-translate-y-1">
      {/* Top subtle glow bar */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#6366F1]/0 group-hover:via-[#6366F1]/60 to-transparent transition-all duration-500" />

      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1]/10 to-[#a855f7]/10 dark:from-[#6366F1]/20 dark:to-[#a855f7]/20 border border-[#6366F1]/20 flex items-center justify-center text-[#6366F1] group-hover:scale-110 transition-transform duration-300">
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
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-3 group-hover:text-[#6366F1] transition-colors">
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
                <CheckCircle2 size={14} className="text-[#6366F1] shrink-0" />
                <span className="truncate">{offering.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-4 border-t border-[var(--card-border)]">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center justify-between w-full text-sm font-bold text-[#6366F1] dark:text-[#818CF8] group-hover:text-[#4F46E5] transition-colors"
        >
          <span>Learn More &amp; View Details</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
