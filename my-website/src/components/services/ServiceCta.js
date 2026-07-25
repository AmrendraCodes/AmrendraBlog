'use client';

import Link from "next/link";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ServiceCta() {
  return (
    <section className="py-24 bg-gradient-to-b from-[var(--background)] via-[var(--card-bg)] to-[var(--background)] relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#6366F1]/20 to-[#a855f7]/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-6 lg:px-16 text-center">
        <AnimatedSection direction="up" className="bg-gradient-to-br from-[var(--card-bg)] via-[var(--background)] to-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-10 sm:p-16 shadow-[var(--shadow-float)] relative overflow-hidden">
          {/* Subtle top border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6366F1] to-transparent" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 text-[#6366F1] dark:text-[#818CF8] text-xs font-extrabold uppercase tracking-wider mb-6">
            <Sparkles size={14} />
            <span>LET&apos;S BUILD SOMETHING GREAT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-heading)] tracking-tight leading-tight mb-6 max-w-3xl mx-auto">
            Ready to Build, Grow &amp; Scale Your Digital Presence?
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-body)] leading-relaxed mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss your goals and find the right digital solution for your business. From web engineering to AI automation and SEO growth.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-base py-4 px-9 rounded-full shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-heading)] font-semibold text-base py-4 px-8 rounded-full hover:border-[#6366F1] hover:text-[#6366F1] transition-all duration-300 w-full sm:w-auto"
            >
              <Mail size={18} />
              <span>Contact Us</span>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
