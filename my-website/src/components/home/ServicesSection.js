import React from 'react';
import Link from 'next/link';
import { Bot, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Bot,
    title: 'AI Agent Development',
    tagline: 'Stop losing time to manual work.',
    desc: 'I design and build AI agents that handle real tasks inside your existing tools, such as lead qualification, support replies, document processing, internal knowledge search and report generation.',
    youGet: [
      'A working agent connected to your CRM, inbox, database or website',
      'Workflows that run without constant supervision',
      'A clear human-in-the-loop setup, so you stay in control',
      'Documentation and handover so your team can use it confidently',
    ],
    bestFor: 'Founders and operations teams who want to cut manual work and respond to customers faster.',
    cta: 'Get an Automation Plan',
    href: '/services/ai-automation',
  },
  {
    icon: FileText,
    title: 'SEO Technical Writing',
    tagline: 'Content that ranks and that your buyers actually trust.',
    desc: 'I research what your customers search for, then write in-depth, technically accurate articles, guides and documentation that earn rankings and generate qualified enquiries.',
    youGet: [
      'Keyword and search-intent strategy tied to your offers',
      'Long-form content written by an engineer, with tested examples',
      'On-page SEO, internal linking and structured content built in',
      'Topical authority that compounds over time',
    ],
    bestFor: 'SaaS companies, dev tools, AI startups and tech brands that want organic leads instead of paid ads.',
    cta: 'Get a Content Plan',
    href: '/services/seo-content-strategy',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#0B1F3A] border-b border-slate-200 dark:border-[#1E293B] transition-colors" aria-label="Services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            Two Services. One Goal: Measurable Growth for Your Business.
          </h2>
        </div>

        {/* Exactly 2 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative rounded-3xl bg-[#F8FAFC] dark:bg-[#071324] border border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/50 p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#D97706] dark:text-[#F59E0B] flex items-center justify-center shrink-0">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A] dark:text-white">
                        <Link href={service.href} className="no-underline text-inherit hover:text-[#F59E0B] transition-colors">
                          {service.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#D97706] dark:text-[#F59E0B]">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-[#94A3B8] leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  <div className="pt-4 border-t border-slate-200/80 dark:border-[#1E293B] mb-6">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-3">
                      You get:
                    </span>
                    <ul className="space-y-2.5 p-0 m-0 list-none text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {service.youGet.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 p-3.5 rounded-xl bg-slate-100 dark:bg-[#0B1F3A] border border-slate-200 dark:border-[#1E293B]">
                    <span className="text-xs font-bold text-[#0B1F3A] dark:text-white">Best for: </span>
                    <span className="text-xs text-slate-600 dark:text-[#94A3B8]">{service.bestFor}</span>
                  </div>
                </div>

                <Link
                  href={service.href}
                  className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-sm transition-colors duration-200 shadow-sm no-underline"
                >
                  <span>{service.cta}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Task 4: Secondary web development mention */}
        <div className="text-center mt-8">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Also available: custom web development for products that need it.{' '}
            <Link
              href="/services/web-development"
              className="text-[#0B1F3A] dark:text-[#F59E0B] font-semibold underline underline-offset-4 hover:text-[#D97706]"
            >
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
