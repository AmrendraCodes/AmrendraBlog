'use client';

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram, Sparkles, Send, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--card-border)] relative z-10 bg-[var(--background)] pt-16 pb-8" suppressHydrationWarning>
      {/* Subtle gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16" suppressHydrationWarning>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14" suppressHydrationWarning>
          {/* Brand Column */}
          <div className="flex flex-col gap-6" suppressHydrationWarning>
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
              Empowering developers and creators with the latest insights into modern technology and creative design.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: "https://x.com/codewithamrendr", icon: Twitter, label: "Visit Twitter" },
                { href: "https://github.com/AmrendraCodes", icon: Github, label: "Visit GitHub" },
                { href: "https://www.linkedin.com/in/amrendra-reactdev/", icon: Linkedin, label: "Visit LinkedIn" },
                { href: "https://instagram.com/amrendracodes", icon: Instagram, label: "Visit Instagram" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--text-muted)] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(99,102,241,0.3)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[var(--text-heading)] mb-6 text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-4 m-0 p-0 list-none">
              {[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link) => (
                <li key={link.name} className="flex">
                  <Link href={link.href} className="text-[var(--text-body)] text-sm font-medium no-underline transition-colors duration-300 hover:text-[#6366F1] dark:hover:text-[#818CF8]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[var(--text-heading)] mb-6 text-sm font-bold uppercase tracking-wider">Categories</h4>
            <ul className="flex flex-col gap-4 m-0 p-0 list-none">
              {[
                { name: "React", href: "/category/react" },
                { name: "AI Agents", href: "/category/ai-agents" },
                { name: "SaaS Architecture", href: "/category/saas-architecture" },
                { name: "DevOps", href: "/category/devops" }
              ].map((link) => (
                <li key={link.name} className="flex">
                  <Link href={link.href} className="text-[var(--text-body)] text-sm font-medium no-underline transition-colors duration-300 hover:text-[#6366F1] dark:hover:text-[#818CF8]">
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
            <form className="flex relative" action="#">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address for newsletter"
                className="text-[var(--foreground)] bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl outline-none w-full py-3 pr-12 pl-4 text-sm transition-all duration-300 focus:border-[#6366F1] focus:shadow-[0_0_15px_rgba(99,102,241,0.1)] placeholder:text-[var(--text-muted)]"
              />
              <button
                type="submit"
                className="bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white cursor-pointer border-none rounded-lg flex justify-center items-center w-8 h-8 transition-all duration-300 absolute top-1/2 right-2 -translate-y-1/2 hover:opacity-90 hover:scale-105"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--card-border)] flex flex-col md:flex-row justify-between items-center gap-4 pt-8" suppressHydrationWarning>
          <p className="text-[var(--text-muted)] text-[13px] font-medium text-center md:text-left" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Code with Amrendra. Built with Next.js &amp; ❤️
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6" suppressHydrationWarning>
            <Link href="/privacy" className="text-[var(--text-muted)] text-[13px] font-medium no-underline transition-colors duration-300 hover:text-[var(--foreground)]">Privacy</Link>
            <Link href="/terms" className="text-[var(--text-muted)] text-[13px] font-medium no-underline transition-colors duration-300 hover:text-[var(--foreground)]">Terms</Link>
            <a href="/sitemap.xml" className="text-[var(--text-muted)] text-[13px] font-medium no-underline transition-colors duration-300 hover:text-[var(--foreground)]">Sitemap</a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
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
