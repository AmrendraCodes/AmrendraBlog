'use client';

import { TrendingUp, ShieldCheck, Zap, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ServiceBenefits({ benefits = [], serviceTitle }) {
  return (
    <section className="py-20 bg-[var(--section-alt-bg)] border-b border-[var(--card-border)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] dark:text-[#34D399] bg-[#10B981]/10 px-3.5 py-1.5 rounded-full border border-[#10B981]/20 mb-4 inline-block">
            VALUE DELIVERED
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-heading)] tracking-tight mt-3 mb-4">
            Tangible Business Impact &amp; Value
          </h2>
          <p className="text-[var(--text-body)] text-base sm:text-lg leading-relaxed">
            Why investing in professional {serviceTitle} delivers long-term ROI for your company.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, idx) => (
            <AnimatedSection
              key={idx}
              direction="up"
              delay={idx * 0.1}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 relative flex flex-col justify-between group hover:border-[#10B981]/40 hover:shadow-[var(--shadow-card)] transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981]/20 to-[#34D399]/20 border border-[#10B981]/30 text-[#10B981] font-bold text-sm flex items-center justify-center mb-5">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-heading)] mb-3 group-hover:text-[#10B981] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-body)] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
