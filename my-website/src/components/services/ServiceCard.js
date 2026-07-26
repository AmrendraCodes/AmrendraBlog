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
    BUILD: "from-[#10B981] to-[#34D399] text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    GROW: "from-[#34D399] to-[#059669] text-mint-400 bg-emerald-500/10 border-emerald-500/20",
    SCALE: "from-[#059669] to-[#10B981] text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  };

  const badgeStyle = categoryColors[service.category] || categoryColors.BUILD;

  return (
    <div className="group relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#10B981]/50 hover:shadow-[var(--shadow-float)] hover:-translate-y-1">
      {/* Top subtle glow bar */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#10B981]/0 group-hover:via-[#10B981]/60 to-transparent transition-all duration-500" />

      <div>
        {/* Header Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981]/10 to-[#34D399]/10 dark:from-[#10B981]/20 dark:to-[#34D399]/20 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform duration-300">
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
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-3 group-hover:text-[#10B981] transition-colors">
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
                <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
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
          className="inline-flex items-center justify-between w-full text-sm font-bold text-[#10B981] dark:text-[#34D399] group-hover:text-[#059669] transition-colors"
        >
          <span>Learn More &amp; View Details</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
