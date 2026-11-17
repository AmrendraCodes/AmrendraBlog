'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  CreditCard, 
  UserCheck, 
  MessageSquare,
  FileCode2,
  Cpu,
  Layers
} from 'lucide-react';

const PACKAGES = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    badge: null,
    price: '$1,200',
    timeline: '2–4 weeks · fixed price',
    description: 'Launch a fast, search-ready website. Turn visitors into leads.',
    icon: Layers,
    ctaText: 'Start a project',
    ctaHref: '/contact?service=landing-page',
    popular: false,
    deliverables: [
      'Custom design built in Next.js and Tailwind CSS',
      'Score 95+ on Lighthouse with tuned Core Web Vitals',
      'Metadata, a sitemap, and schema markup for Google',
      'Add a contact form and analytics',
      'Go live on Vercel',
    ],
  },
  {
    id: 'web-app',
    name: 'Web App',
    badge: 'Most popular',
    price: '$2,500',
    timeline: '4–8 weeks · milestone payments',
    description: 'Build your MVP or full product. Get everything from database to login to launch.',
    icon: FileCode2,
    ctaText: 'Start a project',
    ctaHref: '/contact?service=web-app',
    popular: true,
    deliverables: [
      'Build with Next.js App Router, React 19, and TypeScript',
      'Add sign-in and a database with Supabase or PostgreSQL',
      'Connect through REST or GraphQL APIs',
      'Review a live preview on Vercel every week',
      'Deploy to the cloud with automated CI/CD',
      '30 days of post-launch stability support',
    ],
  },
  {
    id: 'ai-agent',
    name: 'AI Agent',
    badge: null,
    price: '$5,000',
    timeline: '4–8 weeks · scoped to your workflow',
    description: 'Automate a business process. Get an agent that takes real actions and runs reliably.',
    icon: Cpu,
    ctaText: 'Scope my agent',
    ctaHref: '/contact?service=ai-agent',
    popular: false,
    deliverables: [
      'Build tool-calling agents on OpenAI or Claude',
      'Add a RAG pipeline so the agent uses your own documents',
      'Connect the agent to your existing apps and APIs',
      'Track usage, so API costs stay visible',
      'Receive handover documents and a walkthrough call',
    ],
  },
];

const PROCESS_PILLARS = [
  {
    title: 'Fixed scope',
    description: 'You approve the scope in writing before work begins.',
    icon: ShieldCheck,
  },
  {
    title: 'Milestone payments',
    description: 'You pay as each stage is delivered.',
    icon: CreditCard,
  },
  {
    title: 'Direct access',
    description: 'You talk to the developer, not an account manager.',
    icon: UserCheck,
  },
  {
    title: 'Clear updates',
    description: 'Chat on Slack or Discord and join a weekly video check-in.',
    icon: MessageSquare,
  },
];

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

export default function PricingClient() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      
      {/* ─── 1. PACKAGES 3-COLUMN GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
        {PACKAGES.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                pkg.popular
                  ? 'bg-[var(--bg-card)] border-2 border-[#F59E0B] shadow-[0_12px_48px_rgba(245,158,11,0.15)] ring-1 ring-[#F59E0B]/30'
                  : 'bg-[var(--bg-card)] border border-[var(--border-card)] shadow-xs hover:border-[#F59E0B]/40'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#F59E0B] text-[#0B1F3A] shadow-md">
                    <Sparkles size={13} className="text-[#0B1F3A]" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--accent-tag-bg)] px-3 py-1 rounded-full border border-[var(--border-card)]">
                    Fixed Scope
                  </span>
                </div>

                {/* Package Name & Subtitle */}
                <h2 className="text-2xl font-black text-[var(--text-heading)] mb-2 tracking-tight">
                  {pkg.name}
                </h2>
                <p className="text-sm text-[var(--text-body)] leading-relaxed mb-6 min-h-[40px]">
                  {pkg.description}
                </p>

                {/* Price Display */}
                <div className="pb-6 mb-6 border-b border-[var(--border-card)]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Starting from
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[var(--text-heading)] tracking-tight">
                      {pkg.price}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[var(--text-muted)] mt-1.5">
                    {pkg.timeline}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={pkg.ctaHref}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-center text-sm sm:text-base inline-flex items-center justify-center gap-2 transition-all duration-200 no-underline mb-8 ${
                    pkg.popular
                      ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] shadow-md hover:shadow-lg'
                      : 'bg-[var(--accent-tag-bg)] hover:bg-[#F59E0B] text-[var(--text-heading)] hover:text-[#0B1F3A] border border-[var(--border-card)] hover:border-[#F59E0B]'
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight size={16} />
                </Link>

                {/* Checklist */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-heading)] mb-4">
                    What&apos;s included:
                  </div>
                  <ul className="space-y-3.5 p-0 m-0 list-none text-sm text-[var(--text-body)]">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 leading-snug">
                        <span className="w-5 h-5 rounded-full bg-[#F59E0B]/15 text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5 border border-[#F59E0B]/30">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── 2. CUSTOM SCOPE CALLOUT BANNER ─── */}
      <div className="rounded-3xl p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-card)] shadow-xs mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-[var(--text-heading)] tracking-tight mb-2">
            Already have a site or codebase? Need something else?
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-body)] leading-relaxed m-0">
            Send your existing codebase for an audit or refactor. Ask for a technical SEO audit or a monthly retainer. These services are quoted separately.
          </p>
        </div>
        <Link
          href="/contact?service=custom-quote"
          className="shrink-0 px-6 py-3.5 rounded-2xl bg-[var(--accent-tag-bg)] hover:bg-[#F59E0B] text-[var(--text-heading)] hover:text-[#0B1F3A] border border-[var(--border-card)] hover:border-[#F59E0B] font-bold text-sm sm:text-base transition-colors inline-flex items-center gap-2 no-underline"
        >
          <span>Ask for a quote</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* ─── 3. HOW PRICING WORKS (PROCESS PILLARS) ─── */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] border border-[#F59E0B]/30 mb-3">
            <span>Guaranteed Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-heading)] tracking-tight">
            How Pricing Works
          </h2>
          <p className="text-base text-[var(--text-body)] mt-3">
            Transparent terms, no hidden fees, and zero surprise invoices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-2xl p-6 flex flex-col items-start shadow-2xs hover:border-[#F59E0B]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[var(--text-body)] leading-relaxed m-0">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 4. PRICING FAQ ACCORDION ─── */}
      <div className="max-w-3xl mx-auto mb-20" id="pricing-faq">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] border border-[#F59E0B]/30 mb-3">
            <HelpCircle size={14} className="text-[#F59E0B]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-heading)] tracking-tight">
            Pricing FAQ
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-body)] mt-2">
            Clear answers about development rates, project scopes, and payment structure.
          </p>
        </div>

        <div className="space-y-3.5">
          {PRICING_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#F59E0B]/40 bg-[var(--bg-card)] shadow-md shadow-[#0B1F3A]/5'
                    : 'border-[var(--border-card)] bg-[var(--bg-card)] hover:border-[#F59E0B]/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer select-none bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${idx}`}
                  id={`faq-q-${idx}`}
                >
                  <span className="font-bold text-base sm:text-lg text-[var(--text-heading)] leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                      isOpen
                        ? 'bg-[#F59E0B] text-[#0B1F3A] rotate-180'
                        : 'bg-[var(--accent-tag-bg)] text-[var(--text-muted)]'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                <div
                  id={`faq-ans-${idx}`}
                  role="region"
                  aria-labelledby={`faq-q-${idx}`}
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm sm:text-base text-[var(--text-body)] leading-relaxed border-t border-[var(--border-card)]/40 pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 5. READY TO START? BOTTOM CTA ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-[var(--bg-card)] border border-[var(--border-card)] p-8 sm:p-12 text-center shadow-lg">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F59E0B]/10 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-heading)] tracking-tight mb-4">
            Ready to start?
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-8">
            Book a call. Describe your project. Get a written scope and a fixed price.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-extrabold text-lg shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-200 no-underline"
          >
            <span>Let&apos;s talk</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

    </div>
  );
}
