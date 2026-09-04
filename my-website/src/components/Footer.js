'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  ArrowUp, 
  ExternalLink,
  ArrowRight,
  Sparkles,
  Bot
} from "lucide-react";
import { CookieSettingsButton } from "./CookieConsent";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <footer className="relative z-10 bg-[#0B1F3A] text-slate-300 pt-20 pb-8 border-t border-[#1E293B] transition-colors duration-300 mt-28 overflow-hidden">
      
      {/* Background Radial Glow Effects */}
      <div 
        aria-hidden="true"
        className="absolute top-0 left-[20%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_70%)] pointer-events-none"
      />
      <div 
        aria-hidden="true"
        className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.04),transparent_70%)] pointer-events-none"
      />

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F59E0B]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* ─── SECTION 1 — PREMIUM CTA BLOCK ─── */}
        <div className="relative overflow-hidden rounded-3xl bg-[#071324] border border-[#1E293B] p-8 sm:p-12 lg:p-16 mb-20 shadow-2xl group">
          
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F59E0B]/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-bold uppercase tracking-wider mb-5">
                <Sparkles size={14} className="text-[#F59E0B]" />
                <span>High-Velocity Engineering Studio</span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Build Something That Matters.
              </h2>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mt-4 leading-relaxed font-normal">
                From AI-powered products to scalable web platforms, we engineer software built for growth.
              </p>
            </div>

            {/* CTA Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group/btn inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-base shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all duration-300 hover:-translate-y-0.5 no-underline w-full sm:w-auto"
              >
                <span>Start a Project</span>
                <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ─── MAIN FOOTER GRID (BRAND + NAVIGATION) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#1E293B]">
          
          {/* ─── SECTION 2 — BRAND AREA ─── */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 no-underline group mb-4">
              <Image 
                src="/logo-square.png" 
                alt="Code with Amrendra Logo" 
                width={40} 
                height={40} 
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" 
              />
              <span className="text-2xl font-black tracking-wider text-white leading-none">
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-transparent bg-clip-text font-black">CWA</span>
              </span>
            </Link>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              Engineering enterprise software, next-generation web platforms, autonomous AI solutions, and scalable cloud architectures.
            </p>

            {/* Contact Email */}
            <a 
              href="mailto:amrendra1999official@gmail.com" 
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 bg-[#071324] border border-[#1E293B] px-4 py-2.5 rounded-xl hover:border-[#F59E0B]/50 hover:text-white transition-all duration-300 group no-underline max-w-full"
            >
              <Mail size={16} className="text-[#F59E0B] transition-transform group-hover:scale-110 shrink-0" />
              <span className="font-medium break-all">amrendra1999official@gmail.com</span>
            </a>
          </div>

          {/* ─── SECTION 3 — FOOTER NAVIGATION ─── */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            
            {/* Column 1: Services */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
                <span>Services</span>
                <span className="w-6 h-[1px] bg-[#F59E0B]/50 inline-block"></span>
              </h3>
              <ul className="space-y-3.5 p-0 m-0 list-none text-xs sm:text-sm">
                {[
                  { name: "Web Development", href: "/services/web-development" },
                  { name: "AI & Automation", href: "/services/ai-automation" },
                  { name: "Digital Marketing", href: "/services/digital-marketing" },
                  { name: "UI/UX & Product Design", href: "/services/ui-ux-product-design" },
                  { name: "SEO & Content Strategy", href: "/services/seo-content-strategy" },
                  { name: "Cloud & DevOps", href: "/services/cloud-devops" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-[#F59E0B] transition-colors duration-200 font-medium block no-underline hover:translate-x-0.5 transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
                <span>Resources</span>
                <span className="w-6 h-[1px] bg-[#F59E0B]/50 inline-block"></span>
              </h3>
              <ul className="space-y-3.5 p-0 m-0 list-none text-xs sm:text-sm">
                {[
                  { name: "Engineering Blog", href: "/resources/blog" },
                  { name: "Case Studies", href: "/resources/case-studies" },
                  { name: "React", href: "/category/react" },
                  { name: "AI Agents", href: "/category/ai-agents" },
                  { name: "SaaS Architecture", href: "/category/saas-architecture" },
                  { name: "DevOps", href: "/category/devops" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-[#F59E0B] transition-colors duration-200 font-medium block no-underline hover:translate-x-0.5 transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5 flex items-center gap-2">
                <span>Company</span>
                <span className="w-6 h-[1px] bg-[#F59E0B]/50 inline-block"></span>
              </h3>
              <ul className="space-y-3.5 p-0 m-0 list-none text-xs sm:text-sm">
                {[
                  { name: "Home", href: "/" },
                  { name: "Services", href: "/services" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-[#F59E0B] transition-colors duration-200 font-medium block no-underline hover:translate-x-0.5 transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <CookieSettingsButton />
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* ─── SECTION 5 — BOTTOM BAR & SOCIAL LINKS ─── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-medium">
          
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>&copy; {currentYear} Code with Amrendra. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-500">•</span>
            <p className="text-slate-400">Built with Next.js &amp; ❤️</p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5" aria-label="Social profiles">
              {[
                { href: "https://x.com/codewithamrendr", icon: Twitter, label: "X (Twitter)" },
                { href: "https://github.com/AmrendraCodes", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/amrendra1998/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://instagram.com/amrendracodes", icon: Instagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-[#071324] border border-[#1E293B] text-slate-300 flex items-center justify-center hover:bg-[#F59E0B] hover:text-[#0B1F3A] hover:border-[#F59E0B] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-[1px] h-6 bg-[#1E293B]" />

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-[#071324] border border-[#1E293B] text-slate-300 flex items-center justify-center hover:text-[#F59E0B] hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}

