'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import MagneticButton from '../ui/MagneticButton';

// Dynamically import heavy WebGL 3D Scene with SSR fallback
const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050807]" />,
});

export default function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsDesktop(true);
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden border-b border-[#1E2E25]">
      {/* State-Reactive 3D WebGL Background Scene (Desktop Only) */}
      {isDesktop && <Hero3DScene activeCard="react" />}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Dark Readability Overlay over 3D Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060907]/70 via-[#060907]/50 to-[#060907] pointer-events-none" />

      {/* Central Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(16,185,129,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none transition-all duration-700" />

      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-xs font-mono font-bold uppercase tracking-widest text-[#34D399] mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)]">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          Next-Gen Software &amp; AI Engineering
        </div>

        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Engineering Digital Products{' '}
          <span className="bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#00E599] text-transparent bg-clip-text drop-shadow-[0_0_35px_rgba(16,185,129,0.4)]">
            Built for What Comes Next.
          </span>
        </h1>

        {/* Subtitle Description Card (High Readability Backdrop) */}
        <div className="max-w-2xl mb-10 px-6 py-4 rounded-2xl bg-[#060907]/85 border border-[#1E2E25] backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <p className="text-base sm:text-lg text-[#F3F4F6] leading-relaxed font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            We design and build scalable web platforms, autonomous AI workflows, SaaS architectures, and cloud solutions that help modern businesses move faster.
          </p>
        </div>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-base transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] w-full sm:w-auto"
            >
              <span>Get started</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>

          <MagneticButton className="w-full sm:w-auto">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl border border-[#1E2E25] bg-[#0A0F0C]/80 text-[#F3F4F6] font-bold text-base transition-all duration-300 hover:border-[#10B981]/50 hover:bg-[#111C16] w-full sm:w-auto backdrop-blur-md"
            >
              Explore Services
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
