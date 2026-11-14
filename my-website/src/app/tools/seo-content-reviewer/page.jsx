import JsonLd from '@/components/JsonLd';
import ToolPageHeader from '@/components/tools/ToolPageHeader';
import SeoReviewerIcon from '@/components/tools/SeoReviewerIcon';
import RelatedTools from '@/components/tools/RelatedTools';
import MainSeoReviewer from '@/features/seo-tools/components/MainSeoReviewer';
import ToolLandingSection from '@/features/seo-tools/components/ToolLandingSection';
import { getBreadcrumbSchema, getWebApplicationSchema, getFAQSchema } from '@/lib/schema';
import { siteMetadata } from '@/config/seo';
import { SEO_REVIEWER_CONTENT } from '@/features/seo-tools/data/seoToolsData';
import Link from 'next/link';
import { ArrowDown, ArrowRight } from 'lucide-react';

const tool = {
  title: 'Free SEO Content Checker & Real-Time Editor',
  description: 'Paste your draft or enter a live URL to get an instant SEO score out of 100. Fix missing keywords, heading structure, and readability issues as you type.',
  slug: 'seo-content-reviewer',
  route: '/tools/seo-content-reviewer',
  category: 'Free SEO tool',
};

export const metadata = {
  title: 'Free SEO Content Checker: Audit & Score Articles | Code with Amrendra',
  description: 'Use this free SEO content checker to audit articles or URLs. Get a live score out of 100, fix on-page issues, and improve readability without signing up.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/tools/seo-content-reviewer`,
  },
  openGraph: {
    title: 'Free SEO Content Checker: Audit & Score Articles | Code with Amrendra',
    description: 'Use this free SEO content checker to audit articles or URLs. Get a live score out of 100, fix on-page issues, and improve readability without signing up.',
    url: `${siteMetadata.siteUrl}/tools/seo-content-reviewer`,
    type: 'website',
  },
};

export default function SeoContentReviewerPage() {
  const pageUrl = `${siteMetadata.siteUrl}${tool.route}`;
  const faqs = SEO_REVIEWER_CONTENT.faqs;

  return (
    <main id="main-content" className="seo-reviewer-page min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* 1. BreadcrumbList Schema */}
      <JsonLd
        data={getBreadcrumbSchema([
          { name: 'Home', url: siteMetadata.siteUrl },
          { name: 'Tools', url: `${siteMetadata.siteUrl}/tools` },
          { name: 'SEO Content Reviewer', url: pageUrl },
        ])}
      />

      {/* 2. SoftwareApplication Schema */}
      <JsonLd
        data={getWebApplicationSchema({
          name: 'Free SEO Content Checker',
          description: tool.description,
          url: pageUrl,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          price: '0',
          priceCurrency: 'USD',
        })}
      />

      {/* 3. FAQPage Schema (5 Focused FAQs) */}
      {getFAQSchema(faqs) && <JsonLd data={getFAQSchema(faqs)} />}

      <ToolPageHeader tool={tool} icon={SeoReviewerIcon}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#seo-audit-workspace"
            className="seo-primary-button inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold no-underline shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--seo-primary)]"
          >
            Analyze Your Content
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-5 py-3 text-sm font-semibold text-[var(--text-heading)] no-underline transition hover:border-amber-500/60 hover:text-amber-700 dark:hover:text-amber-300"
          >
            Explore How It Works
            <ArrowDown size={16} aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-5 text-sm italic text-[var(--text-muted)]">
          No complicated setup. No unnecessary subscriptions. Just practical SEO insights.
        </p>
      </ToolPageHeader>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        {/* Main 2-column Editorial Workspace */}
        <MainSeoReviewer />

        {/* In-depth Editorial Guide & FAQs */}
        <ToolLandingSection />
      </section>

      {/* Cross-Link Other Tools */}
      <RelatedTools currentSlug={tool.slug} cardTilt />
      <div className="h-16" />
    </main>
  );
}
