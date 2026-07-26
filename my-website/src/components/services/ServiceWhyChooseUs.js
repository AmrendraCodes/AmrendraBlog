'use client';

import { ShieldCheck, Zap, Search, Target, MessageSquare, Scaling, BarChart2, Infinity } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const REASONS = [
  {
    icon: Zap,
    title: "Modern Tech Stack",
    description: "Built on React, Next.js, and modern cloud infrastructure for longevity, security, and top performance.",
  },
  {
    icon: ShieldCheck,
    title: "Performance-First Approach",
    description: "Rigorous Core Web Vitals tuning and code optimization ensuring sub-second page loads.",
  },
  {
    icon: Search,
    title: "Built-In SEO Foundations",
    description: "Semantic HTML5, automated Schema JSON-LD, metadata, and clean indexation out of the box.",
  },
  {
    icon: Target,
    title: "Business Goal Alignment",
    description: "We don't just write code; we design and build features that directly support your business objectives.",
  },
  {
    icon: MessageSquare,
    title: "Clear & Direct Communication",
    description: "Transparent updates, straightforward timelines, and direct collaboration with active engineers.",
  },
  {
    icon: Scaling,
    title: "Scalable Architecture",
    description: "Clean modular code built so your web application grows effortlessly alongside your customer base.",
  },
  {
    icon: BarChart2,
    title: "Data-Driven Decisions",
    description: "Informed by user behavior metrics, search intent data, and empirical performance analytics.",
  },
  {
    icon: Infinity,
    title: "Long-Term Mindset",
    description: "Dedicated to building maintainable, future-proof digital assets that yield compounding ROI over time.",
  },
];

export default function ServiceWhyChooseUs() {
  return (
    <section className="py-20 bg-[var(--section-alt-bg)] border-b border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] dark:text-[#34D399] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20 mb-4 inline-block">
            WHY CODE WITH AMRENDRA
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] tracking-tight mt-3 mb-4">
            Engineering Excellence Built on Trust &amp; Results
          </h2>
          <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
            Combining deep technical expertise with strategic product thinking to deliver digital products that stand out.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedSection
                key={idx}
                direction="up"
                delay={idx * 0.05}
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 transition-all duration-300 hover:border-[#10B981]/40 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold text-[var(--text-heading)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                  {item.description}
                </p>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
