import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteContact } from '@/config/site';

export default function HomeCtaBanner() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto" aria-label="Call to Action">
      <div className="relative rounded-3xl bg-[#0B1F3A] border-2 border-[#F59E0B]/50 p-8 sm:p-14 text-center shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/20 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/40 mb-6 inline-block">
          LET&apos;S TALK
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight max-w-3xl mx-auto">
          Ready to Save Time and Grow Your Traffic?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tell me about your business and your biggest bottleneck. I&apos;ll reply with practical ideas, even if we don&apos;t end up working together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base transition-colors duration-200 shadow-[0_0_25px_rgba(245,158,11,0.3)] w-full sm:w-auto no-underline"
          >
            <span>Book a Free Strategy Call</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href={siteContact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl border border-slate-600 hover:border-[#F59E0B] bg-[#071324] hover:bg-[#112240] text-white font-bold text-base transition-colors duration-200 w-full sm:w-auto shadow-sm no-underline"
          >
            <MessageSquare size={18} className="text-[#25D366]" />
            <span>Message on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
