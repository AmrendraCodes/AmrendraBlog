"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed top-5 left-0 w-full z-50 flex justify-center p-0 pointer-events-none">
        <header className={`pointer-events-auto z-50 transition-all duration-300 flex items-center justify-between rounded-full border relative w-[95%] mx-auto md:grid md:grid-cols-[1fr_auto_1fr] md:w-[85%] md:gap-4 lg:w-[70%] lg:max-w-[1200px] lg:py-3 lg:px-8 ${isScrolled ? 'bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-3 px-8 border-slate-200/50 dark:border-slate-700/50' : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-md shadow-[0_10px_40px_rgba(15,23,42,0.05)] py-3 px-5 border-slate-900/10 dark:border-slate-700/20'}`}>
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center gap-3 no-underline shrink-0 group">
              <div className="bg-gradient-to-br from-[#00b7ff] to-[#7c3aed] text-white rounded-full flex justify-center items-center w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 transition-transform duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] shrink-0 group-hover:rotate-12 group-hover:scale-110">
                <img src="/icon.svg" alt="Logo" className="w-[1.1rem] max-w-full h-auto" />
              </div>
              <span className="text-slate-900 dark:text-slate-50 tracking-tight text-[22px] md:text-[24px] lg:text-[28px] font-extrabold">
                Amrendra<span className="bg-gradient-to-r from-[#00b7ff] to-[#7c3aed] text-transparent bg-clip-text">Blog</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center gap-5 lg:gap-9 whitespace-nowrap">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[0.95rem] md:text-[0.88rem] lg:text-[0.95rem] font-semibold no-underline transition-all duration-300 whitespace-nowrap px-3.5 py-1.5 md:px-3 md:py-1.5 rounded-full ${isActive ? "text-[#00b7ff] bg-[#00b7ff]/15" : "text-slate-700 dark:text-slate-300 hover:text-[#00b7ff] dark:hover:text-[#00b7ff] hover:bg-[#00b7ff]/10 dark:hover:bg-[#00b7ff]/10"}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center justify-end gap-3 md:pr-2">
            <ThemeToggle />
            <button className="hidden md:inline-flex items-center justify-center bg-gradient-to-br from-[#00b7ff] to-[#7c3aed] text-white font-semibold text-[0.95rem] py-2 px-5 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(168,85,247,0.2)] hover:-translate-y-0.5 hover:opacity-95 hover:shadow-[0_6px_20px_rgba(168,85,247,0.4)]">Subscribe</button>
            <button
              type="button"
              className="flex md:hidden items-center justify-center bg-slate-900/5 dark:bg-slate-800/20 border border-slate-900/10 dark:border-slate-700/20 text-slate-900 dark:text-slate-50 w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full cursor-pointer transition-background duration-300 shrink-0 hover:bg-slate-900/10 dark:hover:bg-slate-700/20"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </header>
      </div>

      <div
        className={`fixed inset-0 bg-slate-900/25 backdrop-blur-sm z-[60] transition-all duration-300 ${isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[min(100%,24rem)] bg-white dark:bg-slate-950 z-[70] transition-transform duration-500 flex flex-col border-l border-slate-900/10 dark:border-slate-700/20 box-border ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-900/10 dark:border-slate-700/20 gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-gradient-to-br from-[#00b7ff] to-[#7c3aed] text-white rounded-full flex justify-center items-center w-8 h-8 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              <Sparkles size={18} />
            </div>
            <span className="text-slate-900 dark:text-slate-50 tracking-tight text-[22px] font-extrabold">
              Amrendra<span className="bg-gradient-to-r from-[#00b7ff] to-[#7c3aed] text-transparent bg-clip-text">Blog</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center bg-slate-900/5 dark:bg-slate-800/20 border border-slate-900/10 dark:border-slate-700/20 text-slate-900 dark:text-slate-50 w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full cursor-pointer transition-background duration-300 hover:bg-slate-900/10 dark:hover:bg-slate-700/20"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-8 flex flex-col gap-6">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[1.5rem] font-extrabold no-underline transition-colors duration-300 leading-tight py-3.5 px-6 rounded-2xl block w-full ${isActive ? "text-[#00b7ff] bg-[#00b7ff]/15" : "text-slate-900 dark:text-slate-50 hover:text-[#00b7ff] dark:hover:text-[#00b7ff] hover:bg-[#00b7ff]/10 dark:hover:bg-[#00b7ff]/10"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <button className="inline-flex items-center justify-center bg-gradient-to-br from-[#00b7ff] to-[#7c3aed] text-white font-bold text-[1.1rem] py-4 px-8 rounded-full border-none cursor-pointer mt-auto mb-8 w-full transition-opacity duration-300 hover:opacity-90 shadow-lg shadow-purple-500/20" onClick={() => setIsMenuOpen(false)}>
            Subscribe
          </button>
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ height: "130px" }}></div>
    </>
  );
}
