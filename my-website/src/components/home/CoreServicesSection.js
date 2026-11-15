import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Layers,
  ArrowRight,
  Bot,
  CheckCircle2,
  Sparkles,
  Search,
} from 'lucide-react';
import TiltCard from '../ui/TiltCard';

const CORE_SERVICES = [
  {
    icon: Code2,
    badge: 'WEB DEVELOPMENT',
    title: 'Next.js & React Web Apps',
    desc: 'Production-ready web applications built for speed, conversion, and clean maintainability. Server Components, dynamic routing, and seamless API integrations.',
    capabilities: [
      'Next.js 15/16 App Router & SSR',
      'TypeScript & Tailwind CSS Design Systems',
      'REST & GraphQL API Architecture',
      'Authentication & Database Integration',
    ],
    href: '/services/web-development',
    cta: 'Build a Web App',
  },
  {
    icon: Bot,
    badge: 'AI AUTOMATION',
    title: 'Production AI Agent Construction',
    desc: 'Move beyond basic chat prompts. I build multi-step autonomous agents that execute API actions, process document pipelines, and operate reliably in production.',
    capabilities: [
      'Multi-Agent Workflow Orchestration',
      'Structured Tool-Calling & Sandbox APIs',
      'RAG Pipelines & Context Memory',
      'OpenAI & Anthropic Claude Integrations',
    ],
    href: '/services/ai-automation',
    cta: 'Build an AI Agent',
  },
  {
    icon: Search,
    badge: 'SEO STRATEGY',
    title: 'Advanced Technical SEO & Speed',
    desc: 'Engineering-led search engine optimization. Perfect Core Web Vitals, programmatic sitemaps, semantic schema markup, and metadata architecture that drives organic pipeline.',
    capabilities: [
      'Sub-Second Core Web Vitals (INP, LCP, CLS)',
      'Programmatic SEO Page Architecture',
      'Complete Schema Markup (JSON-LD)',
      'Search Console & Crawlability Audits',
    ],
    href: '/services/seo-content-strategy',
    cta: 'Audit Your Site',
  },
];

export default function CoreServicesSection() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[var(--bg-section-alt)] text-[var(--text-body)] border-b border-[var(--border-card)] transition-colors relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-tag-text)] bg-[var(--accent-tag-bg)] border border-[var(--accent-tag-border)] px-4 py-1.5 rounded-full inline-block mb-3.5 shadow-2xs">
            OUR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-heading)] tracking-tight mb-4">
            Next.js, AI Agents and{' '}
            <span className="text-[#F5A00B]">Technical SEO</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Modern full-stack engineering tailored for founders and growing teams who need reliable execution, high search rankings, and intelligent automation.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <TiltCard key={service.title} className="h-full" maxTilt={8}>
                <div
                  className="group relative rounded-3xl bg-[var(--bg-card)] border border-[var(--border-card)] hover:border-[#F5A00B]/60 p-7 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Top Bar: Icon & Category Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--accent-tag-bg)] text-[var(--accent-tag-text)] flex items-center justify-center border border-[var(--accent-tag-border)] shadow-2xs floating-icon">
                        <Icon size={22} strokeWidth={2.2} />
                      </div>
                      <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--accent-tag-bg)] text-[var(--accent-tag-text)] border border-[var(--accent-tag-border)]">
                        {service.badge}
                      </span>
                    </div>

                    {/* Card Title & Desc */}
                    <h3 className="text-xl font-bold text-[var(--text-heading)] mb-3 group-hover:text-[#F5A00B] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)] mb-6">
                      {service.desc}
                    </p>

                    {/* Feature Checklist */}
                    <div className="border-t border-[var(--border-card)] pt-5 mb-6">
                      <p className="text-xs font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                        Included Deliverables:
                      </p>
                      <ul className="space-y-2.5">
                        {service.capabilities.map((cap) => (
                          <li key={cap} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[var(--text-body)]">
                            <CheckCircle2 size={15} className="text-[#F5A00B] shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Action Button */}
                  <div className="pt-2">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-tag-text)] hover:text-[#F5A00B] transition-colors no-underline group-hover:translate-x-1 duration-200"
                    >
                      <span>{service.cta}</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}