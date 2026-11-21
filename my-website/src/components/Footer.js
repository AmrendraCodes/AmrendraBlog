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
  Bot
} from "lucide-react";
import { CookieSettingsButton } from "./CookieConsent";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };


  return (
    <footer className="relative z-10 bg-[#0B1F3A] text-slate-300 pt-12 md:pt-16 pb-8 border-t border-[#1E293B] transition-colors duration-200 overflow-hidden">
      
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── MAIN FOOTER GRID (BRAND + NAVIGATION) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#1E293B]">
          
          {/* ─── SECTION 2 — BRAND AREA ─── */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center no-underline group mb-5" aria-label="Code with Amrendra Home">
              <Image
                src="/logo-wide.png"
                alt="Code with Amrendra"
                width={175} 
                height={41} 
                className="w-[175px] h-[41px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02] dark:hidden"
              />
              <Image
                src="/logo-wide-dark.png"
                alt="Code with Amrendra"
                width={175}
                height={41}
                className="hidden w-[175px] h-[41px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02] dark:block"
              />
            </Link>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              Engineering enterprise software, next-generation web platforms, autonomous AI solutions, and scalable cloud architectures.
            </p>

            {/* Contact Email */}
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=codewithamrendra@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 bg-[#071324] border border-[#1E293B] px-4 py-2.5 rounded-xl hover:border-[#F59E0B]/50 hover:text-white transition-colors duration-200 group no-underline max-w-full"
            >
              <Mail size={16} className="text-[#F59E0B] transition-transform  shrink-0" />
              <span className="font-medium break-all">codewithamrendra@gmail.com</span>
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
                  { name: "SEO & Content Writing", href: "/services/seo-content-strategy" },
                  { name: "Pricing & Packages", href: "/pricing" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-[#F59E0B] transition-colors duration-200 font-medium block no-underline"
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
                  { name: "Developer Tools", href: "/tools" },
                  { name: "React", href: "/category/react" },
                  { name: "AI Agents", href: "/category/ai-agents" },
                  { name: "SaaS Architecture", href: "/category/saas-architecture" },
                  { name: "DevOps", href: "/category/devops" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-[#F59E0B] transition-colors duration-200 font-medium block no-underline"
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
                  { name: "Cookie Policy", href: "/cookie-policy" },
                  { name: "Terms of Service", href: "/terms" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-300 hover:text-[#F59E0B] transition-colors duration-200 font-medium block no-underline"
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
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5" aria-label="Social profiles">
              {[
                { href: "https://x.com/codewithamrendr", icon: Twitter, label: "X (Twitter)" },
                { href: "https://github.com/AmrendraCodes", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/amrendra1998/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://www.instagram.com/codewithamrendra/", icon: Instagram, label: "Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-[#071324] border border-[#1E293B] text-slate-300 flex items-center justify-center hover:bg-[#F59E0B] hover:text-[#0B1F3A] hover:border-[#F59E0B] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
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
              className="w-10 h-10 rounded-xl bg-[#071324] border border-[#1E293B] text-slate-300 flex items-center justify-center hover:text-[#F59E0B] hover:border-[#F59E0B]/50 hover:bg-[#F59E0B]/10 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
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

