import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function AboutAmrendraSection() {
  return (
    <section
      id="about-amrendra"
      aria-label="About Amrendra"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-[#1E293B] relative overflow-hidden bg-white dark:bg-[#0B1F3A] transition-colors"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Profile Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]">
              {/* Subtle Accent Glow */}
              <div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#0B1F3A]/10 via-[#F59E0B]/15 to-transparent dark:from-[#0B1F3A]/30 dark:via-[#F59E0B]/20 blur-xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Profile Image Container */}
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-[#1E293B] shadow-md bg-slate-100 dark:bg-[#071324]">
                <Image
                  src="/profile-photo.jpeg"
                  alt="Amrendra Kumar"
                  fill
                  sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                  className="object-cover object-top"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Eyebrow Badge */}
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3.5 py-1.5 rounded-full border border-[#F59E0B]/30 inline-block mb-4">
              ABOUT
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1F3A] dark:text-white leading-[1.15] mb-6">
              Hi, I&apos;m Amrendra.
            </h2>

            {/* Body */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed mb-4 max-w-xl">
              I&apos;m an engineer and technical writer who helps businesses save time with AI agents and grow through search. I work with a small number of clients at a time so each project gets my full attention.
            </p>

            {/* Second Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-[#94A3B8] leading-relaxed mb-8 max-w-xl">
              If you want a partner who listens first and builds second, let&apos;s talk.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base transition-colors duration-200 shadow-sm w-full sm:w-auto no-underline"
              >
                <span>Work With Me</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-white dark:bg-[#071324] text-[#0B1F3A] dark:text-[#F8FAFC] font-bold text-base transition-colors duration-200 hover:border-[#F59E0B] hover:text-[#F59E0B] w-full sm:w-auto no-underline"
              >
                <span>Read My Story</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
