import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import TiltCard from "./ui/TiltCard";


export default function CaseStudyCard({ study }) {
  return (
    <TiltCard className="h-full">
      <article
        className="group bg-[var(--card-bg)] rounded-3xl overflow-hidden border border-[var(--card-border)] shadow-[var(--shadow-card)]  transition-shadow duration-200 relative h-full flex flex-col justify-between"
      >
      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={study.coverImage}
          alt={study.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-200 "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent opacity-60" />

        {/* Metric Highlight Badge */}
        {study.metricHighlight && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F59E0B] text-[#0B1F3A] text-[11px] font-extrabold tracking-wide shadow-lg shadow-amber-500/25">
              {study.metricHighlight}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2 leading-snug group-hover:text-[#F59E0B] transition-colors line-clamp-2">
          <Link href={`/resources/case-studies/${study.slug}`} className="before:absolute before:inset-0 z-10 no-underline text-inherit">
            {study.title}
          </Link>
        </h3>

        <p className="text-[var(--text-body)] text-sm leading-relaxed mb-5 line-clamp-2">
          {study.description}
        </p>

        {/* Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {study.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] border border-[#F59E0B]/25"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
          <span className="text-[12px] font-medium text-[var(--text-muted)]">
            {study.duration} · {study.client}
          </span>
          <span className="w-9 h-9 rounded-full bg-[var(--section-alt-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)]  group-hover:text-[#0B1F3A]  transition-colors duration-200">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </article>
  </TiltCard>
  );
}
