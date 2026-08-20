'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState('project');

  const tiers = [
    {
      name: 'Starter Sprint',
      badge: 'Fixed Scope',
      priceProject: '$60',
      priceMonthly: '$49',
      period: 'flat rate',
      description: 'Perfect for validating an idea or shipping a single, well-defined feature fast.',
      features: [
        '2–3 week delivery timeline',
        '1 dedicated senior full-stack engineer',
        'Weekly progress calls + live demo',
        'Clean, documented, production-ready code',
        'Best suited for MVPs and single-feature builds',
      ],
      cta: 'Start My Sprint',
      popular: false,
    },
    {
      name: 'Engineering Retainer',
      badge: 'Most Popular',
      priceProject: '$99',
      priceMonthly: '$120',
      period: '/ month',
      description: 'A dedicated engineering team on standby — built for startups that need to keep shipping every single month.',
      features: [
        'Continuous development capacity, no restarts each sprint',
        '1 senior engineer + AI-assisted automation support',
        'Priority bug fixes and same-week turnarounds',
        'Monthly architecture and performance review',
        'Flexible scope — reprioritize anytime',
      ],
      cta: 'Talk to Our Team',
      popular: true,
    },
    {
      name: 'Enterprise Architecture',
      badge: 'Custom',
      priceProject: '$249',
      priceMonthly: '$249',
      period: '/ month',
      description: 'Custom engineering teams, dedicated PM, strict SLA uptime guarantees, and on-demand cloud DevOps.',
      features: [
        'Multi-engineer team + dedicated project manager',
        '24/7 incident monitoring and emergency support',
        'Custom SOC2 / HIPAA compliance assistance',
        'Dedicated AWS cloud setup & Terraform IaC',
        'Quarterly security audits and load testing',
      ],
      cta: 'Request Enterprise Quote',
      popular: false,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Billing Cycle Toggle */}
      <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-slate-100 dark:bg-[#071324] border border-slate-200 dark:border-[#1E293B] mb-12">
        <button
          onClick={() => setBillingCycle('project')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
            billingCycle === 'project'
              ? 'bg-[#F59E0B] text-[#0B1F3A] shadow-[0_0_20px_rgba(245,158,11,0.35)]'
              : 'text-slate-600 dark:text-[#94A3B8] hover:text-[#0B1F3A] dark:hover:text-white'
          }`}
        >
          Project-Based
        </button>
        <button
          onClick={() => setBillingCycle('monthly')}
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
            billingCycle === 'monthly'
              ? 'bg-[#F59E0B] text-[#0B1F3A] shadow-[0_0_20px_rgba(245,158,11,0.35)]'
              : 'text-slate-600 dark:text-[#94A3B8] hover:text-[#0B1F3A] dark:hover:text-white'
          }`}
        >
          Monthly Retainer
          <span className="text-[10px] bg-[#F59E0B]/20 text-[#0B1F3A] dark:text-[#F59E0B] px-2 py-0.5 rounded-full font-bold">Save 20%</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
              tier.popular
                ? 'bg-gradient-to-b from-amber-500/5 to-white dark:from-[#112240] dark:to-[#0B1F3A] border-2 border-[#F59E0B] shadow-[0_10px_40px_rgba(245,158,11,0.2)]'
                : 'bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/50 shadow-sm'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F59E0B] text-[#0B1F3A] text-[11px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1">
                <Sparkles size={12} />
                {tier.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white">{tier.name}</h3>
                {!tier.popular && (
                  <span className="text-[10px] font-mono text-[#D97706] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full border border-[#F59E0B]/30 font-bold">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
                  {billingCycle === 'project' ? tier.priceProject : tier.priceMonthly}
                </span>
                <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium">{tier.period}</span>
              </div>

              <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed mb-6 border-b border-slate-200 dark:border-[#1E293B] pb-6">
                {tier.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-[#F8FAFC]">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#F59E0B]/20 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center font-bold">
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
                  ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] shadow-lg shadow-amber-500/30 hover:scale-[1.02]'
                  : 'bg-slate-100 dark:bg-[#112240] text-[#0B1F3A] dark:text-white border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B] hover:text-[#F59E0B]'
              }`}
            >
              <span>{tier.cta}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      {/* Trust Footnote Line */}
      <p className="text-xs text-slate-500 dark:text-[#94A3B8] text-center mt-8 font-medium">
        No credit card required to talk. Cancel or switch plans anytime.
      </p>
    </div>
  );
}
