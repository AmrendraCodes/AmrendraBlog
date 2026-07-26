'use client';

import Link from "next/link";
import { ChevronRight, ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ServiceHero({ service }) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-[var(--card-border)] bg-gradient-to-b from-[var(--background)] via-[var(--card-bg)] to-[var(--background)]">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#10B981]/15 to-[#34D399]/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Breadcrumb Navigation */}
        <AnimatedSection direction="down" delay={0.05} className="mb-8">
          <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs sm:text-sm text-[var(--text-muted)] bg-[var(--card-bg)] border border-[var(--card-border)] px-4 py-2 rounded-full shadow-sm">
            <Link href="/" className="hover:text-[#10B981] transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <Link href="/services" className="hover:text-[#10B981] transition-colors">
              Services
            </Link>
            <ChevronRight size={14} className="opacity-50" />
            <span className="font-semibold text-[var(--text-heading)] truncate max-w-[200px] sm:max-w-none">
              {service.title}
            </span>
          </nav>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy Column */}
          <AnimatedSection direction="up" delay={0.1} className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] dark:text-[#34D399] text-xs font-extrabold uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              <span>{service.categoryLabel} • {service.hero.tagline}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)] tracking-tight leading-[1.15] mb-6">
              {service.hero.heading}
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-8 max-w-2xl">
              {service.hero.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-[#10B981] to-[#059669] text-white font-bold text-base py-3.5 px-8 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <span>Get Started</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="https://wa.me/919128522306?text=Hi%20Amrendra,%20I'd%20like%20to%20discuss%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-heading)] font-semibold text-base py-3.5 px-7 rounded-full hover:border-[#10B981] hover:text-[#10B981] transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle size={18} className="text-emerald-500" />
                <span>Talk to Us</span>
              </Link>
            </div>
          </AnimatedSection>

          {/* Visual Illustration Column */}
          <AnimatedSection direction="left" delay={0.2} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-br from-[var(--card-bg)] to-[var(--background)] border border-[var(--card-border)] rounded-3xl p-8 shadow-[var(--shadow-3d)] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-6 mb-6">
                <div>
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest block mb-1">
                    SERVICE ARCHITECTURE
                  </span>
                  <span className="text-lg font-bold text-[var(--text-heading)]">
                    {service.title}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] font-mono font-bold text-sm">
                  {service.indexNumber}
                </div>
              </div>

              <div className="space-y-4">
                {service.offerings.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[var(--background)] border border-[var(--card-border)] flex items-start gap-3 transition-transform hover:scale-[1.02]">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] mt-2 shrink-0" />
                    <div>
                      <h2 className="text-xs sm:text-sm font-bold text-[var(--text-heading)]">
                        {item.title}
                      </h2>
                      <p className="text-xs text-[var(--text-body)] line-clamp-2 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--card-border)] flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
                <span>STATUS: PRODUCTION READY</span>
                <span className="text-emerald-500 font-bold">● ONLINE</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
