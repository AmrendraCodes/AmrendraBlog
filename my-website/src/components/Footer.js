'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram, Mail, ArrowUp, ExternalLink } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const aiSummaryLinks = [
    { name: "Google", href: "https://www.google.com/search?udm=50&q=Summarise+the+main+points+from+https://codewithamrendra.in/", color: "hover:text-blue-400" },
    { name: "ChatGPT", href: "https://chat.openai.com/?q=Give+me+summary+of+https://codewithamrendra.in/", color: "hover:text-emerald-400" },
    { name: "Claude", href: "https://claude.ai/new/?q=Give+me+summary+of+https://codewithamrendra.in/", color: "hover:text-amber-400" },
    { name: "Perplexity", href: "https://www.perplexity.ai/?q=Give+me+summary+of+https://codewithamrendra.in/", color: "hover:text-cyan-400" },
    { name: "Grok", href: "https://grok.com/?q=Give+me+summary+of+https://codewithamrendra.in/", color: "hover:text-purple-400" },
  ];

  return (
    <footer className="relative z-10 bg-slate-950 dark:bg-[#060907] text-slate-300 pt-16 pb-8 border-t border-slate-800 dark:border-[#1E2E25] transition-colors duration-300 mt-24">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Main Footer Grid: Left Block (Brand & AI Summary) + Right Block (Link Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Left Block — Brand, Description, Contact, AI Summary */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 no-underline group">
              <Image 
                src="/logo-square.png" 
                alt="Code with Amrendra Logo" 
                width={36} 
                height={36} 
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" 
              />
              <span className="text-xl font-extrabold tracking-wider text-white">
                <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-transparent bg-clip-text font-black">CWA</span>
              </span>
            </Link>

            <p className="text-sm font-bold text-[#10B981] dark:text-[#34D399] tracking-tight">
              High-Velocity Web &amp; AI Engineering
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Engineering enterprise software, Next-Gen Web platforms, autonomous AI agent solutions, and scalable cloud architectures.
            </p>

            {/* Contact Item */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-900/80 dark:bg-[#0A0F0C] border border-slate-800 dark:border-[#1E2E25] px-3.5 py-2.5 rounded-xl max-w-fit mt-1">
              <Mail size={16} className="text-[#10B981] shrink-0" />
              <a href="mailto:amrendra1999official@gmail.com" className="hover:text-[#10B981] transition-colors font-medium">
                amrendra1999official@gmail.com
              </a>
            </div>

            {/* AI Summary Block */}
            <div className="mt-2 pt-4 border-t border-slate-800/80 dark:border-[#1E2E25]/80">
              <p className="text-xs font-bold text-slate-400 mb-2.5 flex items-center gap-1.5">
                <span>AI Summary of</span>
                <span className="text-white font-mono">codewithamrendra.in</span>
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {aiSummaryLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-900 dark:bg-[#111C16] border border-slate-800 dark:border-[#1E2E25] text-slate-300 transition-colors ${link.color}`}
                  >
                    <span>{link.name}</span>
                    <ExternalLink size={10} className="opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block — 3 Column Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Services */}
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-slate-800 dark:border-[#1E2E25]">
                Services &amp; Tools
              </p>
              <ul className="space-y-3 p-0 m-0 list-none text-xs sm:text-sm">
                {[
                  { name: "Web Development", href: "/services/web-development" },
                  { name: "AI & Automation", href: "/services/ai-automation" },
                  { name: "Digital Marketing", href: "/services/digital-marketing" },
                  { name: "UI/UX & Product Design", href: "/services/ui-ux-product-design" },
                  { name: "SEO & Content Strategy", href: "/services/seo-content-strategy" },
                  { name: "Cloud & DevOps", href: "/services/cloud-devops" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-400 hover:text-[#10B981] transition-colors font-medium block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Resources & Blog */}
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-slate-800 dark:border-[#1E2E25]">
                Resources &amp; Blog
              </p>
              <ul className="space-y-3 p-0 m-0 list-none text-xs sm:text-sm">
                {[
                  { name: "Engineering Blog", href: "/resources/blog" },
                  { name: "Case Studies", href: "/resources/case-studies" },
                  { name: "React Category", href: "/category/react" },
                  { name: "AI Agents Category", href: "/category/ai-agents" },
                  { name: "SaaS Architecture", href: "/category/saas-architecture" },
                  { name: "DevOps Category", href: "/category/devops" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-400 hover:text-[#10B981] transition-colors font-medium block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider mb-5 pb-2 border-b border-slate-800 dark:border-[#1E2E25]">
                Company
              </p>
              <ul className="space-y-3 p-0 m-0 list-none text-xs sm:text-sm">
                {[
                  { name: "Home", href: "/" },
                  { name: "Services", href: "/services" },
                  { name: "About Us", href: "/about" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Hire Me / Consultation", href: "/hire-me" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-400 hover:text-[#10B981] transition-colors font-medium block">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar — Copyright, Social Icons & Back to Top */}
        <div className="pt-8 border-t border-slate-800 dark:border-[#1E2E25] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium text-center sm:text-left">
            &copy; {currentYear} Code with Amrendra. Built with Next.js &amp; ❤️
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              {[
                { href: "https://x.com/codewithamrendr", icon: Twitter, label: "Twitter" },
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
                  className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-[#111C16] border border-slate-800 dark:border-[#1E2E25] text-slate-400 flex items-center justify-center hover:bg-[#10B981] hover:text-white hover:border-[#10B981] transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-[#111C16] border border-slate-800 dark:border-[#1E2E25] text-slate-400 flex items-center justify-center hover:text-[#10B981] hover:border-[#10B981]/40 transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
