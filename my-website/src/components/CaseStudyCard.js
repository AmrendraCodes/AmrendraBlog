import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./ui/TiltCard";

const BANNER_CONFIGS = [
  {
    bg: "bg-[#1E3A8A]",
    tag: "HEALTHCARE PORTAL",
    metric: "+68% Speed Boost",
  },
  {
    bg: "bg-[#9A4A00]",
    tag: "ECOMMERCE PLATFORM",
    metric: "2.4x Conversion Rate",
  },
  {
    bg: "bg-[#0D4B46]",
    tag: "ENTERPRISE SAAS",
    metric: "85% Manual Work Saved",
  },
];

export default function CaseStudyCard({ study, index = 0 }) {
  const bannerConfig = BANNER_CONFIGS[index % BANNER_CONFIGS.length];
  const tagLabel = study.client?.toUpperCase() || bannerConfig.tag;
  const metricText = study.metricHighlight || bannerConfig.metric;

  return (
    <TiltCard className="h-full" maxTilt={6}>
      <article className="group bg-[var(--bg-card)] rounded-3xl overflow-hidden border border-[var(--border-card)] shadow-sm hover:shadow-md hover:border-[#F5A00B]/50 transition-all duration-300 relative h-full flex flex-col justify-between">
        {/* Visual Header Banner with Guaranteed Dark Contrast Scrim */}
        <div className={`relative h-44 ${bannerConfig.bg} p-6 flex flex-col justify-between overflow-hidden text-white`}>
          {/* Permanent dark gradient scrim overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 backdrop-blur-xs text-white text-[11px] font-mono font-bold tracking-wider uppercase border border-white/30 shadow-xs">
              {tagLabel}
            </span>
            {metricText && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5A00B] text-[#1B2433] text-[11px] font-extrabold tracking-wide shadow-sm">
                {metricText}
              </span>
            )}
          </div>

          <div className="z-10 mt-auto">
            <span className="inline-block px-2 py-0.5 rounded bg-black/40 text-white text-xs font-mono tracking-wide font-medium">
              Case Study #{String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2.5 leading-snug group-hover:text-[#F5A00B] transition-colors line-clamp-2">
              <Link href={`/resources/case-studies/${study.slug}`} className="before:absolute before:inset-0 z-10 no-underline text-inherit">
                {study.title}
              </Link>
            </h3>

            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 line-clamp-3">
              {study.description}
            </p>
          </div>

          <div>
            {/* Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(study.stack || ["Next.js", "TypeScript", "Tailwind"]).slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent-tag-bg)] text-[var(--accent-tag-text)] border border-[var(--accent-tag-border)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-card)]">
              <span className="text-xs font-medium text-[var(--text-muted)]">
                {study.duration || "4 Weeks"} · {study.client || "Client Project"}
              </span>
              <span className="w-9 h-9 rounded-full bg-[var(--accent-tag-bg)] border border-[var(--accent-tag-border)] flex items-center justify-center text-[var(--accent-tag-text)] group-hover:bg-[#F5A00B] group-hover:text-[#1B2433] group-hover:border-[#F5A00B] transition-colors duration-200">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}