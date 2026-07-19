"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      // Handle visibility based on scroll direction
      if (currentScrollY < 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      lastScrollY = currentScrollY;
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
      <div className={`fixed top-5 left-0 w-full z-[100] flex justify-center p-0 pointer-events-none transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-[150%]"}`}>
        <header
          className={`pointer-events-auto z-[100] transition-all duration-300 flex items-center justify-between rounded-full relative w-[96%] mx-auto md:grid md:grid-cols-[1fr_auto_1fr] md:w-[88%] md:gap-3 lg:w-[70%] lg:max-w-[1200px] lg:py-3 lg:px-8 lg:gap-4 border ${
            isScrolled
              ? 'bg-white/70 dark:bg-[#111214]/80 backdrop-blur-xl shadow-[var(--shadow-float)] py-2.5 px-4 sm:py-3 sm:px-6 md:px-8 border-slate-200/50 dark:border-[#2A2B2E]/80'
              : 'bg-white/40 dark:bg-[#08090A]/50 backdrop-blur-md shadow-[var(--shadow-card)] py-2.5 px-3.5 sm:py-3 sm:px-5 border-slate-200/20 dark:border-[#2A2B2E]/40'
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-start">
            <Link href="/" className="flex items-center gap-2 md:gap-3 no-underline shrink-0 group">
              <Image 
                src="/logo-square.png" 
                alt="Code with Amrendra" 
                width={36} 
                height={36} 
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" 
                priority 
                unoptimized
              />
              <span className="text-[20px] font-extrabold tracking-tight flex items-center text-slate-900 dark:text-white ml-1.5 sm:ml-2">
                <span className="bg-gradient-to-r from-[#6366F1] to-[#a855f7] text-transparent bg-clip-text">CWA</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center gap-3 lg:gap-7 xl:gap-9 whitespace-nowrap" aria-label="Primary navigation">
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[0.85rem] lg:text-[0.95rem] font-semibold no-underline transition-all duration-300 whitespace-nowrap px-2.5 lg:px-3.5 py-1.5 rounded-full ${
                      isActive
                        ? "text-[#6366F1] bg-[#6366F1]/10 dark:bg-[#6366F1]/15"
                        : "text-slate-600 dark:text-slate-400 hover:text-[#6366F1] dark:hover:text-[#818CF8] hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center justify-end gap-3 md:pr-2">
            <ThemeToggle />
            <Link
              href="/hire-me"
              className="hidden md:inline-flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-semibold text-[0.95rem] py-1.5 px-5 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[var(--shadow-glow)] hover:-translate-y-1 hover:shadow-[var(--shadow-float)] hover:scale-105 active:scale-95"
            >
              Hire Me
            </Link>
            <button
              type="button"
              className="flex md:hidden items-center justify-center bg-slate-100/80 dark:bg-[#1A1B1E]/80 border border-slate-200/50 dark:border-[#2A2B2E]/50 text-slate-900 dark:text-slate-50 w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full cursor-pointer transition-all duration-300 shrink-0 hover:bg-slate-200/80 dark:hover:bg-[#2A2B2E]/80"
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
        className={`fixed inset-0 bg-slate-900/25 dark:bg-black/50 backdrop-blur-sm z-[60] transition-all duration-300 ${isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[min(100%,24rem)] bg-white dark:bg-[#111214] z-[70] transition-transform duration-500 flex flex-col border-l border-slate-200/50 dark:border-[#2A2B2E] box-border ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        inert={!isMenuOpen}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-[#2A2B2E] gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white rounded-full flex justify-center items-center w-8 h-8 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <Sparkles size={18} />
            </div>
            <span className="text-lg sm:text-[22px] font-extrabold flex items-center text-slate-900 dark:text-white">
              Code with <span className="bg-gradient-to-r from-[#6366F1] to-[#a855f7] text-transparent bg-clip-text ml-1.5">Amrendra</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center bg-slate-100/80 dark:bg-[#1A1B1E]/80 border border-slate-200/50 dark:border-[#2A2B2E]/50 text-slate-900 dark:text-slate-50 w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full cursor-pointer transition-all duration-300 hover:bg-slate-200/80 dark:hover:bg-[#2A2B2E]/80"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-8 flex flex-col gap-6" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[1.5rem] font-extrabold no-underline transition-colors duration-300 leading-tight py-3.5 px-6 rounded-2xl block w-full ${
                  isActive
                    ? "text-[#6366F1] bg-[#6366F1]/10 dark:bg-[#6366F1]/15"
                    : "text-slate-900 dark:text-slate-50 hover:text-[#6366F1] dark:hover:text-[#818CF8] hover:bg-[#6366F1]/5 dark:hover:bg-[#6366F1]/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 mt-auto mb-8">
            <Link href="/hire-me" className="inline-flex items-center justify-center bg-gradient-to-br from-[#6366F1] to-[#a855f7] text-white font-bold text-[1.1rem] py-4 px-8 rounded-full border-none cursor-pointer w-full transition-opacity duration-300 hover:opacity-90 shadow-lg shadow-indigo-500/20" onClick={() => setIsMenuOpen(false)}>
              Hire Me
            </Link>
          </div>
        </nav>
      </div>

      {/* Spacer removed as per prompt to rely on correct pt- utility classes on the hero section */}
    </>
  );
}
