'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Sparkles,
  Cloud,
  Globe,
  Layers,
  Cpu,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import MagneticButton from '../ui/MagneticButton';
import InteractiveServiceCard from './InteractiveServiceCard';
import ServiceVisualOverlay from './ServiceVisualOverlay';

// Dynamically import heavy WebGL 3D Scene with SSR fallback
const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050807]" />,
});

const SERVICES = [
  {
    id: 'web',
    title: 'Web Engineering',
    tag: 'Next.js 16 • React',
    description: 'High-performance, sub-second web platforms engineered for extreme speed and Core Web Vitals 99+.',
    icon: Cpu,
  },
  {
    id: 'react',
    title: 'React & Next.js',
    tag: 'React 19 • App Router',
    description: 'Full-stack React 19 architecture with Server Components, TypeScript, and edge rendering.',
    icon: Code2,
  },
  {
    id: 'ai',
    title: 'AI Solutions',
    tag: 'LLM • Autonomous Agents',
    description: 'Autonomous AI workflows, custom RAG search pipelines, and intelligent OpenAI integrations.',
    icon: Sparkles,
  },
  {
    id: 'cloud',
    title: 'Cloud & AWS',
    tag: 'Serverless • Docker',
    description: 'Serverless AWS cloud infrastructure, Docker container orchestration, and automated CI/CD pipelines.',
    icon: Cloud,
  },
  {
    id: 'saas',
    title: 'SaaS Architecture',
    tag: 'Multi-Tenant • Billing',
    description: 'Scalable SaaS systems including Stripe billing integrations, auth, and multi-tenant databases.',
    icon: Globe,
  },
  {
    id: 'api',
    title: 'API Engineering',
    tag: 'REST • GraphQL',
    description: 'High-throughput microservices and resilient API integrations designed for zero downtime.',
    icon: Layers,
  },
];

export default function HeroSection() {
  const [activeCard, setActiveCard] = useState('react');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      setIsDesktop(true);
    }
  }, []);

  // Handle card selection
  const handleSelectCard = (id) => {
    setActiveCard(id);
  };

  const activeServiceObj = SERVICES.find((s) => s.id === activeCard) || SERVICES[0];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden border-b border-[#1E2E25]">
      {/* State-Reactive 3D WebGL Background Scene (Desktop Only for sub-second mobile LCP) */}
      {isDesktop && <Hero3DScene activeCard={activeCard} />}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* State-Reactive Central Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(16,185,129,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none transition-all duration-700" />

      {/* Domain Visual Overlay Graphics */}
      <ServiceVisualOverlay activeCard={activeCard} />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* ═══════════ LEFT COLUMN: BRAND & COPY ═══════════ */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-xs font-mono font-bold uppercase tracking-widest text-[#34D399] mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Next-Gen Software &amp; AI Engineering
          </div>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Engineering Digital Products{' '}
            <span className="bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#00E599] text-transparent bg-clip-text drop-shadow-[0_0_35px_rgba(16,185,129,0.4)]">
              Built for What Comes Next.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg text-[#9CA3AF] max-w-xl mb-8 leading-relaxed font-normal">
            We design and build scalable web platforms, autonomous AI workflows, SaaS architectures, and cloud solutions that help modern businesses move faster.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
            <MagneticButton className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-base transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] w-full sm:w-auto"
              >
                <span>Get started</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </MagneticButton>

            <MagneticButton className="w-full sm:w-auto">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border border-[#1E2E25] bg-[#0A0F0C]/80 text-[#F3F4F6] font-bold text-base transition-all duration-300 hover:border-[#10B981]/50 hover:bg-[#111C16] w-full sm:w-auto backdrop-blur-md"
              >
                Explore Services
              </Link>
            </MagneticButton>
          </div>

          {/* Active State Status Indicator Pill */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0A0F0C]/90 border border-[#1E2E25] backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-xs font-mono text-[#9CA3AF]">ACTIVE ENVIRONMENT:</span>
            </div>
            <span className="text-xs font-bold text-[#10B981] font-mono uppercase tracking-wider">
              {activeServiceObj.title} ({activeServiceObj.tag})
            </span>
          </div>
        </div>

        {/* ═══════════ RIGHT COLUMN: 3D INTERACTIVE CARDS GRID ═══════════ */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          {SERVICES.map((service) => (
            <InteractiveServiceCard
              key={service.id}
              service={service}
              isActive={activeCard === service.id}
              onSelect={handleSelectCard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
