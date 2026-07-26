'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('project');

  const tiers = [
    {
      name: 'Starter Sprint',
      badge: 'Rapid Launch',
      priceProject: '$2,499',
      priceMonthly: '$1,999',
      period: 'per project',
      description: 'Ideal for early-stage startups needing a high-performance web product or MVP built fast.',
      features: [
        'Production Next.js 16 / React 19 App',
        'Custom Tailored Dark/Light Design',
        'Core Web Vitals 95+ Performance',
        'SEO Meta & Schema Structured Data',
        '1 Month Post-Launch Support',
      ],
      cta: 'Start Sprint Project',
      popular: false,
    },
    {
      name: 'Engineering Retainer',
      badge: 'Most Popular',
      priceProject: '$4,999',
      priceMonthly: '$3,999',
      period: '/ month',
      description: 'Dedicated senior frontend & full-stack engineering team to scale your SaaS platform continuously.',
      features: [
        'Dedicated Senior Engineer (React, AWS, Node)',
        'Autonomous AI Agent & Workflow Integration',
        'High-Velocity Bi-Weekly Sprints',
        'Continuous Performance & Security Audits',
        'Priority Slack & Async Communication',
        'Zero Lock-In Contract (Cancel Anytime)',
      ],
      cta: 'Build With Us',
      popular: true,
    },
    {
      name: 'Enterprise Architecture',
      badge: 'Custom Scale',
      priceProject: 'Custom',
      priceMonthly: 'Custom',
      period: 'tailored quote',
      description: 'Full-scale cloud, microservice, and AI infrastructure for enterprise platforms and high-traffic applications.',
      features: [
        'Multi-Region AWS Cloud Infrastructure',
        'Custom LLM Fine-Tuning & RAG Pipelines',
        'SOC2 / ISO 27001 Security Hardening',
        '24/7 SLA Uptime Guarantee',
        'Dedicated Solutions Architect',
      ],
      cta: 'Talk to Engineering Team',
      popular: false,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      {/* Billing Selector Toggle */}
      <div className="flex items-center gap-3 p-1.5 rounded-full bg-[#0A0F0C] border border-[#1E2E25] mb-12 shadow-inner">
        <button
          onClick={() => setBillingCycle('project')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
            billingCycle === 'project'
              ? 'bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              : 'text-[#9CA3AF] hover:text-white'
          }`}
        >
          Project-Based
        </button>
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
            billingCycle === 'monthly'
              ? 'bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              : 'text-[#9CA3AF] hover:text-white'
          }`}
        >
          Monthly Engineering Retainer
          <span className="text-[10px] bg-[#34D399]/20 text-[#34D399] px-2 py-0.5 rounded-full">Save 20%</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
              tier.popular
                ? 'bg-gradient-to-b from-[#111C16] to-[#0A0F0C] border-2 border-[#10B981] shadow-[0_10px_40px_rgba(16,185,129,0.25)]'
                : 'bg-[#0A0F0C] border border-[#1E2E25] hover:border-[#10B981]/50 shadow-xl'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#10B981] text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1">
                <Sparkles size={12} />
                {tier.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#F3F4F6]">{tier.name}</h3>
                {!tier.popular && (
                  <span className="text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-full border border-[#10B981]/20">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-white tracking-tight">
                  {billingCycle === 'project' ? tier.priceProject : tier.priceMonthly}
                </span>
                <span className="text-xs text-[#9CA3AF] font-medium">{tier.period}</span>
              </div>

              <p className="text-xs text-[#9CA3AF] leading-relaxed mb-6 border-b border-[#1E2E25] pb-6">
                {tier.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#F3F4F6]">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center justify-center">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-xs transition-all duration-300 ${
                tier.popular
                  ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg hover:shadow-emerald-500/40 hover:scale-[1.02]'
                  : 'bg-[#111C16] text-[#F3F4F6] border border-[#1E2E25] hover:border-[#10B981] hover:text-[#10B981]'
              }`}
            >
              <span>{tier.cta}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
