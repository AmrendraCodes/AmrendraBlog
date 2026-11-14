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
    <TiltCard className="h-full">
      <article className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 relative h-full flex flex-col justify-between">
        {/* Visual Header Banner */}
        <div className={`relative h-44 ${bannerConfig.bg} p-6 flex flex-col justify-between overflow-hidden`}>
          {/* Subtle gradient pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
          
          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-[11px] font-mono font-bold tracking-wider uppercase border border-white/20">
              {tagLabel}
            </span>
            {metricText && (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5A00B] text-[#1B2433] text-[11px] font-extrabold tracking-wide shadow-sm">
                {metricText}
              </span>
            )}
          </div>

          <div className="z-10 mt-auto">
            <span className="text-white/80 text-xs font-mono tracking-wide">
              Case Study #{String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#1B2433] mb-2.5 leading-snug group-hover:text-[#9A4A00] transition-colors line-clamp-2">
              <Link href={`/resources/case-studies/${study.slug}`} className="before:absolute before:inset-0 z-10 no-underline text-inherit">
                {study.title}
              </Link>
            </h3>

            <p className="text-[#1B2433]/75 text-sm leading-relaxed mb-6 line-clamp-3">
              {study.description}
            </p>
          </div>

          <div>
            {/* Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(study.stack || ["Next.js", "TypeScript", "Tailwind"]).slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF3DC] text-[#9A4A00] border border-amber-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-medium text-slate-500">
                {study.duration || "4 Weeks"} · {study.client || "Client Project"}
              </span>
              <span className="w-9 h-9 rounded-full bg-[#FFF3DC] border border-amber-500/30 flex items-center justify-center text-[#9A4A00] group-hover:bg-[#F5A00B] group-hover:text-[#1B2433] group-hover:border-[#F5A00B] transition-colors duration-200">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}