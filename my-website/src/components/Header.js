"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import ThemeToggle from "./ThemeToggle";
import { SERVICES_DATA } from "@/lib/services";
import { PRIMARY_NAV_ITEMS, RESOURCES_DROPDOWN_ITEMS } from "@/config/navigation";

const ServicesDropdown = dynamic(() => import("./ServicesDropdown"), { ssr: false });
const ResourcesDropdown = dynamic(() => import("./ResourcesDropdown"), { ssr: false });

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isCurrentlyScrolled = currentScrollY > 20;

          setIsScrolled((prev) => (prev !== isCurrentlyScrolled ? isCurrentlyScrolled : prev));

          if (currentScrollY < 20) {
            setIsVisible((prev) => (!prev ? true : prev));
          } else if (Math.abs(currentScrollY - lastScrollY) > 10) {
            const nextVisible = !(currentScrollY > lastScrollY && currentScrollY > 50);
            setIsVisible((prev) => (prev !== nextVisible ? nextVisible : prev));
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isServicesOpen) setIsServicesOpen(false);
        if (isResourcesOpen) setIsResourcesOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, isServicesOpen, isResourcesOpen]);

  return (
    <>
    <div
      className={`fixed top-4 left-0 right-0 z-[100] flex justify-center px-3 sm:px-4 md:px-6 pointer-events-none transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-[150%]"
      }`}
    >
      <header
        className={`pointer-events-auto z-[100] transition-all duration-300 flex items-center justify-between rounded-full relative w-full max-w-[1240px] py-2.5 px-4 sm:py-3 sm:px-6 border box-border ${
          isScrolled
            ? 'bg-white/95 text-slate-900 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] border-white/80 dark:bg-[#0A0F0C]/95 dark:text-slate-50 dark:border-[#1E2E25]'
            : 'bg-white/90 text-slate-900 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-white/60 dark:bg-[#0A0F0C]/85 dark:text-slate-50 dark:border-[#1E2E25]/60'
        }`}
        role="banner"
        aria-label="Site header"
      >
        <div className="flex items-center justify-start shrink-0">
          <Link href="/" className="flex items-center gap-2 md:gap-3 no-underline shrink-0 group">
            <Image 
              src="/logo-square.png" 
              alt="CWA Logo" 
              width={36} 
              height={36} 
              sizes="36px"
              className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm" 
              priority 
            />
            <span className="text-[20px] font-extrabold tracking-wider flex items-center text-slate-900 dark:text-white ml-1">
              <span className="bg-gradient-to-r from-[#059669] to-[#10B981] dark:from-[#10B981] dark:to-[#34D399] text-transparent bg-clip-text font-black">CWA</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1 px-4">
          <nav className="flex items-center gap-2 lg:gap-4 xl:gap-6 whitespace-nowrap" aria-label="Primary navigation">
            {/* Crawlable Fallback Links for Search Engine Indexing */}
            <div className="sr-only">
              {SERVICES_DATA.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`}>
                  {s.title}
                </Link>
              ))}
              {RESOURCES_DROPDOWN_ITEMS.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.title}
                </Link>
              ))}
            </div>

            {PRIMARY_NAV_ITEMS.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);

              if (link.dropdownType === "services") {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      aria-haspopup="true"
                      aria-expanded={isServicesOpen}
                      className={`relative inline-flex items-center gap-1 text-[0.85rem] lg:text-[0.95rem] font-semibold no-underline transition-all duration-300 whitespace-nowrap px-3 lg:px-4 py-1.5 rounded-full cursor-pointer border-none bg-transparent ${
                        isActive || isServicesOpen
                          ? "text-[#059669] dark:text-[#10B981] bg-emerald-50 dark:bg-[#10B981]/15 font-bold"
                          : "text-slate-700 dark:text-slate-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-slate-100 dark:hover:bg-[#1E2E25]/60"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180 text-[#059669] dark:text-[#10B981]" : ""}`} />
                    </button>

                    {isServicesOpen && (
                      <ServicesDropdown onClose={() => setIsServicesOpen(false)} />
                    )}
                  </div>
                );
              }

              if (link.dropdownType === "resources") {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                      aria-haspopup="true"
                      aria-expanded={isResourcesOpen}
                      className={`relative inline-flex items-center gap-1 text-[0.85rem] lg:text-[0.95rem] font-semibold no-underline transition-all duration-300 whitespace-nowrap px-3 lg:px-4 py-1.5 rounded-full cursor-pointer border-none bg-transparent ${
                        isActive || isResourcesOpen
                          ? "text-[#059669] dark:text-[#10B981] bg-emerald-50 dark:bg-[#10B981]/15 font-bold"
                          : "text-slate-700 dark:text-slate-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-slate-100 dark:hover:bg-[#1E2E25]/60"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isResourcesOpen ? "rotate-180 text-[#059669] dark:text-[#10B981]" : ""}`} />
                    </button>

                    {isResourcesOpen && (
                      <ResourcesDropdown onClose={() => setIsResourcesOpen(false)} />
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[0.85rem] lg:text-[0.95rem] font-semibold no-underline transition-all duration-300 whitespace-nowrap px-3 lg:px-4 py-1.5 rounded-full ${
                    isActive
                      ? "text-[#059669] dark:text-[#10B981] bg-emerald-50 dark:bg-[#10B981]/15 font-bold"
                      : "text-slate-700 dark:text-slate-200 hover:text-[#059669] dark:hover:text-[#10B981] hover:bg-slate-100 dark:hover:bg-[#1E2E25]/60"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center whitespace-nowrap shrink-0 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-[0.875rem] py-2.5 px-6 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95"
          >
            Get started
          </Link>
          <button
            type="button"
            className="flex md:hidden items-center justify-center bg-slate-100 dark:bg-[#1A1B1E] border border-slate-200 dark:border-[#2A2B2E] text-slate-900 dark:text-slate-50 w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full cursor-pointer transition-all duration-300 shrink-0 hover:bg-slate-200 dark:hover:bg-[#2A2B2E]"
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
        className={`fixed inset-0 bg-slate-900/25 dark:bg-black/50 backdrop-blur-sm z-[105] transition-all duration-300 ${isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[min(100%,24rem)] bg-white dark:bg-[#111214] z-[110] transition-transform duration-500 flex flex-col border-l border-slate-200/50 dark:border-[#2A2B2E] box-border ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        inert={!isMenuOpen}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-[#2A2B2E] gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-full flex justify-center items-center w-8 h-8 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-extrabold flex items-center text-slate-900 dark:text-white tracking-wider">
              <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-transparent bg-clip-text font-black">CWA</span>
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

        <nav className="flex-1 p-6 overflow-y-auto flex flex-col gap-4" aria-label="Mobile navigation">
          {PRIMARY_NAV_ITEMS.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);

            if (link.dropdownType === "services") {
              return (
                <div key={link.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className={`text-[1.35rem] font-extrabold no-underline transition-colors duration-300 leading-tight py-2.5 px-4 rounded-xl flex-1 ${
                        isActive
                          ? "text-[#10B981] bg-[#10B981]/10 dark:bg-[#10B981]/15"
                          : "text-slate-900 dark:text-slate-50 hover:text-[#10B981] dark:hover:text-[#34D399]"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#10B981] cursor-pointer"
                      aria-label="Toggle Services sub-menu"
                    >
                      <ChevronDown size={22} className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180 text-[#10B981]" : ""}`} />
                    </button>
                  </div>

                  {isMobileServicesOpen && (
                    <div className="flex flex-col gap-1 pl-4 pt-1 border-l-2 border-[#10B981]/30 ml-4">
                      {SERVICES_DATA.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#10B981] dark:hover:text-[#34D399] py-2 px-3 rounded-lg block"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.dropdownType === "resources") {
              return (
                <div key={link.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className={`text-[1.35rem] font-extrabold no-underline transition-colors duration-300 leading-tight py-2.5 px-4 rounded-xl flex-1 ${
                        isActive
                          ? "text-[#10B981] bg-[#10B981]/10 dark:bg-[#10B981]/15"
                          : "text-slate-900 dark:text-slate-50 hover:text-[#10B981] dark:hover:text-[#34D399]"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                      className="p-2 text-slate-700 dark:text-slate-200 hover:text-[#10B981] cursor-pointer"
                      aria-label="Toggle Resources sub-menu"
                    >
                      <ChevronDown size={22} className={`transition-transform duration-300 ${isMobileResourcesOpen ? "rotate-180 text-[#10B981]" : ""}`} />
                    </button>
                  </div>

                  {isMobileResourcesOpen && (
                    <div className="flex flex-col gap-1 pl-4 pt-1 border-l-2 border-[#10B981]/30 ml-4">
                      {RESOURCES_DROPDOWN_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#10B981] dark:hover:text-[#34D399] py-2 px-3 rounded-lg block"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[1.35rem] font-extrabold no-underline transition-colors duration-300 leading-tight py-2.5 px-4 rounded-xl block w-full ${
                  isActive
                    ? "text-[#10B981] bg-[#10B981]/10 dark:bg-[#10B981]/15"
                    : "text-slate-900 dark:text-slate-50 hover:text-[#10B981] dark:hover:text-[#34D399] hover:bg-[#10B981]/5 dark:hover:bg-[#10B981]/10"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 mt-auto pt-6 mb-4">
            <Link href="/contact" className="inline-flex items-center justify-center bg-gradient-to-br from-[#10B981] to-[#059669] text-white font-bold text-[1.1rem] py-3.5 px-8 rounded-full border-none cursor-pointer w-full transition-opacity duration-300 hover:opacity-90 shadow-lg shadow-emerald-500/20" onClick={() => setIsMenuOpen(false)}>
              Get started
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
