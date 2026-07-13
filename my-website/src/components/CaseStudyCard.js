"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CaseStudyCard({ study }) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-[var(--card-bg)] rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-3d)] transition-shadow duration-500 relative"
    >
      {/* Cover Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={study.coverImage}
          alt={study.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent opacity-60" />

        {/* Metric Highlight Badge */}
        {study.metricHighlight && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#a855f7] text-white text-[11px] font-bold tracking-wide shadow-lg shadow-[#6366F1]/25">
              {study.metricHighlight}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2 leading-snug group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors line-clamp-2">
          <Link href={`/case-studies/${study.slug}`} className="before:absolute before:inset-0 z-10">
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
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#6366F1]/10 dark:bg-[#6366F1]/15 text-[#6366F1] dark:text-[#818CF8] border border-[#6366F1]/20"
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
          <span className="w-9 h-9 rounded-full bg-[var(--section-alt-bg)] flex items-center justify-center text-[var(--foreground)] group-hover:bg-[#6366F1] group-hover:text-white transition-all duration-300">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
