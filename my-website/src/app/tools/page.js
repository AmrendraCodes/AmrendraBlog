import { siteMetadata } from "@/config/seo";
import JsonLd from "@/components/JsonLd";
import ToolsDirectoryClient from "@/components/tools/ToolsDirectoryClient";

export const metadata = {
  title: "Free Developer & AI Tools | Code with Amrendra",
  description:
    "Curated collection of free online developer utilities, AI prompt token counters, JSON validators, regex debuggers, and SEO meta generators built for modern software engineers.",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/tools`,
  },
  openGraph: {
    title: "Free Developer & AI Tools | Code with Amrendra",
    description:
      "Curated collection of free online developer utilities, AI prompt token counters, JSON validators, regex debuggers, and SEO meta generators built for modern software engineers.",
    url: `${siteMetadata.siteUrl}/tools`,
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Free Developer & AI Tools — Code with Amrendra",
      },
    ],
  },
  twitter: {
    title: "Free Developer & AI Tools | Code with Amrendra",
    description:
      "Curated collection of free online developer utilities, AI prompt token counters, JSON validators, regex debuggers, and SEO meta generators built for modern software engineers.",
    images: ["/images/og-default.png"],
  },
};

export default function ToolsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteMetadata.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${siteMetadata.siteUrl}/tools`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-x-hidden">
      <JsonLd data={breadcrumbSchema} />

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F59E0B]/40 bg-[#F59E0B]/10 text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
          ENGINEERING TOOLBOX
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 text-[var(--text-heading)]">
          Free Developer &amp;{" "}
          <span className="bg-gradient-to-r from-[#0B1F3A] via-[#1E3A8A] to-[#F59E0B] dark:from-white dark:via-[#F8FAFC] dark:to-[#F59E0B] text-transparent bg-clip-text">
            AI Tools
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Clean, fast, client-side tools and utilities built to simplify modern web development, prompt engineering, and SEO workflows. No signup required.
        </p>
      </section>

      {/* ═══════════ MAIN TOOLS DIRECTORY ═══════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 max-w-7xl mx-auto">
        <ToolsDirectoryClient />
      </section>
    </div>
  );
}
