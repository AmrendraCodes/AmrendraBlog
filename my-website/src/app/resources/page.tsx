import React from "react";
import Link from "next/link";
import { BookOpen, FolderCheck, ArrowRight, Sparkles, Code2 } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/schema";
import { siteMetadata } from "@/config/seo";
import TiltCard from "@/components/ui/TiltCard";

export const metadata = {
  title: "Resources | Engineering Insights & Case Studies — Code with Amrendra",
  description:
    "Discover technical articles, engineering insights and real-world project case studies by Amrendra Kumar.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resources | Code with Amrendra",
    description:
      "Discover technical articles, engineering insights and real-world project case studies.",
    url: `${siteMetadata.siteUrl}/resources`,
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Code with Amrendra — Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources | Code with Amrendra",
    description:
      "Discover technical articles, engineering insights and real-world project case studies.",
    images: ["/images/og-default.png"],
  },
};

const resourceCards = [
  {
    title: "Blog",
    description: "Technical tutorials and industry insights",
    badge: "Technical Articles",
    icon: BookOpen,
    href: "/resources/blog",
    cta: "Read Articles",
    features: [
      "Deep dives into React 19 & Next.js 16",
      "Enterprise software architecture design",
      "Performance optimization & state management",
    ],
  },
  {
    title: "Case Studies",
    description:
      "See how real businesses solved problems using our engineering solutions.",
    badge: "Client Success",
    icon: FolderCheck,
    href: "/resources/case-studies",
    cta: "View Case Studies",
    features: [
      "Real-world project breakdowns & ROI metrics",
      "Tech stack choices and architecture decisions",
      "Measurable performance & scaling outcomes",
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen isolate">
      <JsonLd
        data={getCollectionPageSchema({
          name: "Resources — Code with Amrendra",
          description:
            "Discover technical articles, engineering insights and real-world project case studies.",
          url: `${siteMetadata.siteUrl}/resources`,
        })}
      />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-[var(--card-border)]">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#10B981]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-16 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-xs font-bold uppercase tracking-[0.12em] text-[#10B981] dark:text-[#34D399] mb-6 shadow-sm">
            <Sparkles size={14} className="animate-pulse text-[#10B981]" />
            Knowledge Hub
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-[var(--text-heading)] max-w-4xl">
            Resources
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-body)] max-w-3xl leading-relaxed font-medium">
            Discover technical articles, engineering insights and real-world project case studies.
          </p>
        </div>
      </section>

      {/* ─── Main Resources Grid Section ─── */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-16" aria-label="Resource directories">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {resourceCards.map((card) => {
            const Icon = card.icon;
            return (
              <TiltCard key={card.title} className="h-full">
                <article className="group bg-[var(--card-bg)] rounded-3xl p-8 lg:p-10 border border-[rgba(255,255,255,0.08)] dark:border-[#1E2E25] shadow-[var(--shadow-card)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.25)] transition-all duration-500 relative h-full flex flex-col justify-between overflow-hidden">
                  {/* Subtle Card Header Gradient */}
                  <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#059669] opacity-80 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] dark:text-[#34D399] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#10B981] group-hover:text-white transition-all duration-500 shadow-md">
                        <Icon size={32} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--section-alt-bg)] text-[var(--text-muted)]">
                        {card.badge}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h2 className="text-3xl font-extrabold text-[var(--text-heading)] mb-4 group-hover:text-[#10B981] dark:group-hover:text-[#34D399] transition-colors leading-tight">
                      {card.title}
                    </h2>

                    {/* Card Description */}
                    <p className="text-[var(--text-body)] text-base leading-relaxed mb-8 font-medium">
                      {card.description}
                    </p>

                    {/* Key Highlights List */}
                    <ul className="space-y-3 mb-10 border-t border-b border-[var(--card-border)] py-6 list-none p-0">
                      {card.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                          <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button Link */}
                  <div className="pt-2">
                    <Link
                      href={card.href}
                      className="group/btn inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-base py-4 px-8 rounded-2xl border-none cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 no-underline active:scale-98"
                    >
                      <span>{card.cta}</span>
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
