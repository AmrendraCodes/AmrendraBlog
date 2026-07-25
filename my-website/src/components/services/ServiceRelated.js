'use client';

import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "./ServiceCard";

export default function ServiceRelated({ relatedServices = [], relatedBlogSlugs = [], relatedCaseStudySlugs = [] }) {
  // Map of static blog titles for interlinking
  const BLOG_TITLES = {
    "high-converting-landing-page": "How to Build a High-Converting Landing Page",
    "scalable-nextjs": "Building Scalable Web Applications with Next.js",
    "react-component-systems": "Mastering React Component Systems & State",
    "seo-ai-era": "SEO Strategies in the Age of Artificial Intelligence",
    "autonomous-ai-agents": "The Rise of Autonomous AI Agents in Web Apps",
    "minimalist-ui": "Minimalist UI Design Principles for Modern Web",
    "future-of-user-interfaces": "The Future of User Interfaces & Dynamic Web",
    "typography-rules": "Typography Rules Every Frontend Developer Should Know",
    "aws-infrastructure-startups": "AWS Infrastructure Best Practices for Startups",
    "github-actions-docker": "Automating Deployments with GitHub Actions & Docker",
    "saas-architecture-scale": "Architecting Multi-Tenant SaaS Apps at Scale",
  };

  // Map of static case study titles for interlinking
  const CASE_STUDY_TITLES = {
    "shopease-store-redesign": "ShopEase E-Commerce Store Redesign & Optimization",
    "fintrack-finance-app": "FinTrack Personal Finance & Dashboard Web App",
    "medicare-dashboard": "MediCare Healthcare Analytics & Patient Portal",
  };

  return (
    <section className="py-20 bg-[var(--section-alt-bg)] border-b border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Related Services */}
        {relatedServices.length > 0 && (
          <div className="mb-20">
            <AnimatedSection direction="up" className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#6366F1] dark:text-[#818CF8] bg-[#6366F1]/10 px-3.5 py-1.5 rounded-full border border-[#6366F1]/20 mb-3 inline-block">
                  COMPLEMENTARY SERVICES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-heading)] tracking-tight">
                  Explore Related Capabilities
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#6366F1] dark:text-[#818CF8] hover:underline shrink-0"
              >
                <span>View All Services</span>
                <ArrowRight size={16} />
              </Link>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Cross-Link Blog & Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Related Articles */}
          {relatedBlogSlugs.length > 0 && (
            <AnimatedSection direction="left" className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center border border-[#6366F1]/20">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-heading)]">
                  Related Technical Articles
                </h3>
              </div>

              <div className="space-y-4">
                {relatedBlogSlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/blog/${slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-[#6366F1]/50 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold text-[var(--text-heading)] group-hover:text-[#6366F1] transition-colors line-clamp-1 pr-4">
                      {BLOG_TITLES[slug] || slug.replace(/-/g, ' ')}
                    </span>
                    <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[#6366F1] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Related Case Studies */}
          {relatedCaseStudySlugs.length > 0 && (
            <AnimatedSection direction="right" className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
                  <Layers size={20} />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-heading)]">
                  Relevant Case Studies
                </h3>
              </div>

              <div className="space-y-4">
                {relatedCaseStudySlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/case-studies/${slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-purple-500/50 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold text-[var(--text-heading)] group-hover:text-purple-500 transition-colors line-clamp-1 pr-4">
                      {CASE_STUDY_TITLES[slug] || slug.replace(/-/g, ' ')}
                    </span>
                    <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-purple-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
