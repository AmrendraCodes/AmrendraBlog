'use client';

import Link from "next/link";
import { ArrowRight, BookOpen, Layers } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "./ServiceCard";

export default function ServiceRelated({ relatedServices = [], relatedBlogSlugs = [], relatedCaseStudySlugs = [] }) {
  // Map of static blog titles for interlinking
  const BLOG_TITLES = {
    "how-to-build-a-light-and-dark-theme-switch-using-javascript": "How to Build a Light & Dark Theme Toggle Using JavaScript",
    "microservices-vs-modular-monolith-2026": "Microservices vs Modular Monolith in 2026: Which Architecture Actually Scales?",
    "how-to-learn-react": "How to Learn React in 2026: The Complete Beginner's Guide",
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
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 mb-3 inline-block">
                  COMPLEMENTARY SERVICES
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-heading)] tracking-tight">
                  Explore Related Capabilities
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1F3A] dark:text-[#F59E0B] hover:underline shrink-0"
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
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#112240] text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center border border-slate-200 dark:border-[#1E293B]">
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
                    href={`/resources/blog/${slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-[#F59E0B]/50 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold text-[var(--text-heading)] group-hover:text-[#F59E0B] transition-colors line-clamp-1 pr-4">
                      {BLOG_TITLES[slug] || slug.replace(/-/g, ' ')}
                    </span>
                    <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Related Case Studies */}
          {relatedCaseStudySlugs.length > 0 && (
            <AnimatedSection direction="right" className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#112240] text-[#0B1F3A] dark:text-[#F59E0B] flex items-center justify-center border border-slate-200 dark:border-[#1E293B]">
                  <Layers size={20} />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-heading)]">
                  Real-World Case Studies
                </h3>
              </div>

              <div className="space-y-4">
                {relatedCaseStudySlugs.map((slug) => (
                  <Link
                    key={slug}
                    href={`/resources/case-studies/${slug}`}
                    className="group flex items-center justify-between p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-[#F59E0B]/50 transition-all duration-300"
                  >
                    <span className="text-sm font-semibold text-[var(--text-heading)] group-hover:text-[#F59E0B] transition-colors line-clamp-1 pr-4">
                      {CASE_STUDY_TITLES[slug] || slug.replace(/-/g, ' ')}
                    </span>
                    <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all shrink-0" />
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
