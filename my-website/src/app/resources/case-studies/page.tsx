import { getAllCaseStudies, getAllCaseStudyTechStacks } from "@/lib/case-studies";
import CaseStudiesPageClient from "@/components/CaseStudiesPageClient";
import JsonLd from "@/components/JsonLd";
import { getCollectionPageSchema } from "@/lib/schema";
import { siteMetadata } from "@/config/seo";

export const metadata = {
  title: "Case Studies & Client Success Stories | Code with Amrendra",
  description:
    "Real-world project case studies — architecture decisions, tech stack deep dives, and measurable outcomes from frontend and full-stack projects.",
  alternates: {
    canonical: "/resources/case-studies",
  },
  openGraph: {
    title: "Case Studies | Code with Amrendra",
    description:
      "Real-world project case studies — architecture decisions, tech stack deep dives, and measurable outcomes.",
    url: `${siteMetadata.siteUrl}/resources/case-studies`,
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Code with Amrendra — Case Studies",
      },
    ],
  },
  twitter: {
    title: "Case Studies | Code with Amrendra",
    description:
      "Real-world project case studies — architecture decisions, tech stack deep dives, and measurable outcomes.",
    images: ["/images/og-default.png"],
  },
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();
  const allTechStacks = getAllCaseStudyTechStacks();

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <JsonLd
        data={getCollectionPageSchema({
          name: "Case Studies — Code with Amrendra",
          description: "Real-world project case studies and architectural outcomes.",
          url: `${siteMetadata.siteUrl}/resources/case-studies`,
        })}
      />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-12 pt-28 md:pt-36 lg:pt-40">
        <div className="relative py-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F59E0B]/8 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-bold uppercase tracking-[0.12em] text-[#0B1F3A] dark:text-[#F59E0B] mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              Portfolio & Client Work
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-heading)]">
              Case{" "}
              <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#F59E0B] dark:from-white dark:via-[#F8FAFC] dark:to-[#F59E0B] text-transparent bg-clip-text">Studies</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-body)] max-w-2xl leading-relaxed font-medium">
              Deep dives into real projects — the problems, the decisions, the architecture, and the results that followed.
            </p>
          </div>
        </div>
      </div>

      <CaseStudiesPageClient
        caseStudies={caseStudies}
        allTechStacks={allTechStacks}
      />
    </div>
  );
}
