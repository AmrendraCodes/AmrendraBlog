import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function AboutAmrendraSection() {
  return (
    <section
      id="about-amrendra"
      aria-label="About Amrendra Kumar"
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#FFFDF9] border-b border-slate-200/80 relative overflow-hidden transition-colors"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Profile Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              {/* Subtle background glow */}
              <div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#F5A00B]/20 via-[#FFF3DC] to-transparent blur-xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Profile Image Container */}
              <div className="relative aspect-square w-full rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md bg-white">
                <Image
                  src="/profile-photo.jpeg"
                  alt="Amrendra Kumar — Full-Stack Engineer & AI Agent Specialist"
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 420px"
                  className="object-cover object-top"
                  priority={false}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Tag */}
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9A4A00] bg-[#FFF3DC] px-4 py-1.5 rounded-full border border-amber-500/30 inline-block mb-3.5 shadow-2xs">
              FULL-STACK ENGINEER &amp; FOUNDER
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#1B2433] leading-[1.15] mb-2.5">
              Hi, I&apos;m <span className="text-[#F5A00B]">Amrendra Kumar.</span>
            </h2>

            {/* Role */}
            <p className="text-base sm:text-lg font-bold text-[#9A4A00] mb-5">
              Founder of Code with Amrendra &amp; Senior Software Engineer
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#1B2433]/80 leading-relaxed mb-8 max-w-2xl">
              I build high-performance web applications, autonomous AI agent workflows, and technical search infrastructure. With deep expertise across Next.js, TypeScript, and large language models, I help founders and engineering teams ship scalable, production-ready software without unnecessary agency overhead.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#F5A00B] hover:bg-[#E08F00] text-[#1B2433] font-bold text-base transition-colors duration-200 shadow-sm w-full sm:w-auto no-underline"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-slate-300 bg-white text-[#1B2433] font-bold text-base transition-colors duration-200 hover:border-amber-400 hover:text-[#9A4A00] w-full sm:w-auto no-underline shadow-2xs"
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