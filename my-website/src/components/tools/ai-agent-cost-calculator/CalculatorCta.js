'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Bot, ShieldCheck } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

export default function CalculatorCta({ onCtaClick }) {
  return (
    <section className="py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#08172c] to-[#060E1A] border border-[#F59E0B]/50 p-6 sm:p-10 lg:p-12 text-center shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        
        {/* Background Radial Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-mono font-bold uppercase tracking-widest mb-4 sm:mb-5">
            <Bot size={15} className="shrink-0 text-[#F59E0B]" />
            <span>AI AGENT ARCHITECTURE CONSULTING</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-4">
            Building an Autonomous AI Agent for Production?
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 font-normal">
            Don&apos;t let runaway agent loops and context inflation ruin your margins. Partner with Code with Amrendra to design cost-efficient model routing, prompt caching pipelines, and reliable tool-calling systems.
          </p>

          {/* Key Value Bullets */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 mb-7 sm:mb-9 font-medium">
            <span className="inline-flex items-center gap-1.5 bg-[#071324] px-3 py-1.5 rounded-lg border border-[#1E293B]">
              <ShieldCheck size={16} className="text-[#F59E0B] shrink-0" />
              <span>Multi-Model Routing</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#071324] px-3 py-1.5 rounded-lg border border-[#1E293B]">
              <ShieldCheck size={16} className="text-[#F59E0B] shrink-0" />
              <span>Up to 80% Token Reduction</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#071324] px-3 py-1.5 rounded-lg border border-[#1E293B]">
              <ShieldCheck size={16} className="text-[#F59E0B] shrink-0" />
              <span>Tool Sandboxing</span>
            </span>
          </div>

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full max-w-xl mx-auto">
            <MagneticButton className="w-full sm:w-auto">
              <Link
                href="/contact?subject=AI%20Agent%20Architecture%20Inquiry"
                onClick={onCtaClick}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-extrabold text-sm sm:text-base shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all duration-200 active:scale-95 no-underline text-center"
              >
                <span>Plan Your AI Agent Architecture</span>
                <ArrowRight size={18} className="shrink-0" />
              </Link>
            </MagneticButton>

            <Link
              href="/services/ai-automation"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-[#071324] hover:bg-[#112240] text-slate-200 hover:text-white font-semibold text-sm sm:text-base transition-colors duration-200 no-underline text-center"
            >
              <span>Explore AI Automation Services</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
