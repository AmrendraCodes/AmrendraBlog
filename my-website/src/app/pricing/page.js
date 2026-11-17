import JsonLd from '@/components/JsonLd';
import { siteMetadata } from '@/config/seo';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/schema';
import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing | Hire a Next.js Developer & AI Agent Builder | Code with Amrendra',
  description: 'Fixed-scope pricing for Next.js web apps, landing pages, and AI agents. Packages from $1,200 with written scope, clear timelines, and milestone payments.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/pricing`,
  },
  openGraph: {
    title: 'Pricing | Hire a Next.js Developer & AI Agent Builder',
    description: 'Fixed-scope pricing for Next.js web apps, landing pages, and AI agents. Packages from $1,200 with written scope, clear timelines, and milestone payments.',
    url: `${siteMetadata.siteUrl}/pricing`,
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Code with Amrendra Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Hire a Next.js Developer & AI Agent Builder',
    description: 'Fixed-scope pricing for Next.js web apps, landing pages, and AI agents. Packages from $1,200 with written scope, clear timelines, and milestone payments.',
    images: ['/images/og-default.png'],
  },
};

const PRICING_FAQS = [
  {
    question: 'How much does it cost to hire a Next.js developer?',
    answer: 'Web apps start at $2,500. Landing pages start at $1,200. The final price depends on pages, features, and integrations.',
  },
  {
    question: 'How much does AI agent development cost?',
    answer: 'AI agent projects start at $5,000. The price rises with the number of tools, integrations, and data sources. You pay your AI provider separately for usage.',
  },
  {
    question: 'How long does a project take?',
    answer: 'A landing page or MVP takes 2–4 weeks. A full web app or AI agent takes 4–8 weeks.',
  },
  {
    question: 'Can you work on my existing code?',
    answer: 'Yes. Send your React or Next.js codebase for an audit, a refactor, or an AI agent integration.',
  },
];

export default function PricingPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: siteMetadata.siteUrl },
    { name: 'Pricing', url: `${siteMetadata.siteUrl}/pricing` },
  ]);

  const faqSchema = getFAQSchema(PRICING_FAQS);

  return (
    <div className="bg-[var(--bg-page)] min-h-screen text-[var(--text-body)]">
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* ─── HERO HEADER SECTION ─── */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-b border-[var(--border-card)]/50">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(245,158,11,0.12)_0%,transparent_70%)] blur-3xl rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#0B1F3A] dark:text-[#F59E0B] text-xs font-mono font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>Fixed Scope · Transparent Rates · No Hidden Fees</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-heading)] tracking-tight leading-[1.12] mb-6">
            Hire a Next.js Developer or <br className="hidden sm:inline" />
            <span className="gradient-text">AI Agent Builder.</span> Pay a Fixed Price.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-body)] max-w-2xl mx-auto leading-relaxed">
            Pick the package that fits your project. Every package has a written scope, a fixed price, and a clear timeline. You see working software every week.
          </p>
        </div>
      </section>

      {/* ─── CLIENT PRICING COMPONENT (CARDS + FAQ + TRUST PILLARS) ─── */}
      <PricingClient />
    </div>
  );
}
