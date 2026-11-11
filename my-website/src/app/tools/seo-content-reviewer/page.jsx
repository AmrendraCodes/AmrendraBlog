import JsonLd from '@/components/JsonLd';
import ToolPageHeader from '@/components/tools/ToolPageHeader';
import SeoReviewerIcon from '@/components/tools/SeoReviewerIcon';
import RelatedTools from '@/components/tools/RelatedTools';
import MainSeoReviewer from '@/features/seo-tools/components/MainSeoReviewer';
import ToolLandingSection from '@/features/seo-tools/components/ToolLandingSection';
import { getBreadcrumbSchema, getWebApplicationSchema, getFAQSchema } from '@/lib/schema';
import { siteMetadata } from '@/config/seo';
import { SEO_REVIEWER_CONTENT } from '@/features/seo-tools/data/seoToolsData';

const tool = {
  title: 'Free SEO Content Checker & Real-Time Editor',
  description: 'Paste your draft or enter a live URL to get an instant SEO score out of 100. Fix missing keywords, heading structure, and readability issues as you type.',
  slug: 'seo-content-reviewer',
  route: '/tools/seo-content-reviewer',
  category: 'SEO Tools',
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
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
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

      <ToolPageHeader tool={tool} icon={SeoReviewerIcon} />

      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        {/* Main 2-column Editorial Workspace */}
        <MainSeoReviewer />

        {/* In-depth Editorial Guide & FAQs */}
        <ToolLandingSection />
      </section>

      {/* Cross-Link Other Tools */}
      <RelatedTools currentSlug={tool.slug} />
      <div className="h-16" />
    </main>
  );
}
