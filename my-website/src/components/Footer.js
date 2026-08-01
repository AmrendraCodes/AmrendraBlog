'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram, Sparkles, Send, ArrowUp, Check } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-[var(--background)] pt-16 pb-8 border-t border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-float)] mt-24">
      {/* Subtle gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Column */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 no-underline group mb-2">
              <Image 
                src="/logo-wide.png" 
                alt="Code with Amrendra Logo" 
                width={200} 
                height={64} 
                className="w-auto h-12 md:h-14 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" 
              />
            </Link>
            <p className="text-[var(--text-body)] max-w-xs text-sm leading-relaxed">
              Engineering enterprise software, Next-Gen Web platforms, autonomous AI agent solutions, and scalable cloud architectures.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: "https://x.com/codewithamrendr", icon: Twitter, label: "Visit Twitter" },
                { href: "https://github.com/AmrendraCodes", icon: Github, label: "Visit GitHub" },
                { href: "https://www.linkedin.com/in/amrendra1998/", icon: Linkedin, label: "Visit LinkedIn" },
                { href: "https://instagram.com/amrendracodes", icon: Instagram, label: "Visit Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--text-muted)] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-[#10B981] hover:text-white hover:border-[#10B981] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(16,185,129,0.4)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--text-heading)] mb-6 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-3.5 m-0 p-0 list-none">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Resources", href: "/resources" },
                { name: "Blog", href: "/resources/blog" },
                { name: "Case Studies", href: "/resources/case-studies" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name} className="flex">
                  <Link href={link.href} className="text-[var(--text-body)] text-sm font-medium no-underline transition-colors duration-300 hover:text-[#10B981] dark:hover:text-[#34D399]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (SEO Interlinking) */}
          <div>
            <h4 className="text-[var(--text-heading)] mb-6 text-sm font-bold uppercase tracking-wider">Services</h4>
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {[
                { name: "Web Development", href: "/services/web-development" },
                { name: "Digital Marketing", href: "/services/digital-marketing" },
                { name: "AI Automation", href: "/services/ai-automation" },
                { name: "UI/UX Design", href: "/services/ui-ux-product-design" },
                { name: "SEO & Content", href: "/services/seo-content-strategy" },
                { name: "Cloud & DevOps", href: "/services/cloud-devops" }
              ].map((link) => (
                <li key={link.name} className="flex">
                  <Link href={link.href} className="text-[var(--text-body)] text-xs font-medium no-underline transition-colors duration-300 hover:text-[#10B981] dark:hover:text-[#34D399]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[var(--text-heading)] mb-6 text-sm font-bold uppercase tracking-wider">Categories</h4>
            <ul className="flex flex-col gap-3.5 m-0 p-0 list-none">
              {[
                { name: "React", href: "/category/react" },
                { name: "AI Agents", href: "/category/ai-agents" },
                { name: "SaaS Architecture", href: "/category/saas-architecture" },
                { name: "DevOps", href: "/category/devops" }
              ].map((link) => (
                <li key={link.name} className="flex">
                  <Link href={link.href} className="text-[var(--text-body)] text-sm font-medium no-underline transition-colors duration-300 hover:text-[#10B981] dark:hover:text-[#34D399]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Mini */}
          <div>
            <h4 className="text-[var(--text-heading)] mb-6 text-sm font-bold uppercase tracking-wider">Newsletter</h4>
            <p className="text-[var(--text-body)] mb-6 text-sm">Join our growing community</p>
            {newsletterSubmitted ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-bold">
                <Check size={16} />
                <span>Thanks for subscribing!</span>
              </div>
            ) : (
              <form
                className="flex relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newsletterEmail) return;
                  setIsNewsletterSubmitting(true);
                  setTimeout(() => {
                    setIsNewsletterSubmitting(false);
                    setNewsletterSubmitted(true);
                  }, 800);
                }}
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Email address for newsletter"
                  className="text-[var(--foreground)] bg-[var(--card-bg)] border border-[rgba(255,255,255,0.08)] shadow-[var(--shadow-inner-glow)] rounded-xl outline-none w-full py-3 pr-12 pl-4 text-sm transition-all duration-300 focus:border-[#10B981] focus:shadow-[0_0_20px_rgba(16,185,129,0.2)] placeholder:text-[var(--text-muted)]"
                />
                <button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white cursor-pointer border-none rounded-lg flex justify-center items-center w-10 h-10 transition-all duration-300 absolute top-1/2 right-1.5 -translate-y-1/2 hover:opacity-90 hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <Send size={14} className={isNewsletterSubmitting ? "animate-pulse" : ""} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--card-border)] flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <p className="text-[var(--text-muted)] text-[13px] font-medium text-center md:text-left">
            &copy; {currentYear} Code with Amrendra. Built with Next.js &amp; ❤️
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link href="/privacy" className="text-[var(--text-muted)] text-[13px] font-medium no-underline transition-colors duration-300 hover:text-[var(--foreground)]">Privacy</Link>
            <Link href="/terms" className="text-[var(--text-muted)] text-[13px] font-medium no-underline transition-colors duration-300 hover:text-[var(--foreground)]">Terms</Link>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#10B981] hover:border-[#10B981]/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
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
