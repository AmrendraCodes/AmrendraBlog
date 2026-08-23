'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import DesktopNav from './header/DesktopNav';
import MobileNavDrawer from './header/MobileNavDrawer';

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
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isServicesOpen) setIsServicesOpen(false);
        if (isResourcesOpen) setIsResourcesOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isServicesOpen, isResourcesOpen]);

  return (
    <>
      <div
        className={`fixed top-4 left-0 right-0 z-[100] flex justify-center px-3 sm:px-4 md:px-6 pointer-events-none transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-[150%]'
        }`}
      >
        <header
          className={`pointer-events-auto z-[100] transition-all duration-300 flex items-center justify-between rounded-full relative w-full max-w-[1240px] py-2.5 px-4 sm:py-3 sm:px-6 border box-border ${
            isScrolled
              ? 'bg-white/95 text-slate-900 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.25)] border-white/80 dark:bg-[#0B1F3A]/95 dark:text-slate-50 dark:border-[#1E293B]'
              : 'bg-white/90 text-slate-900 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-white/60 dark:bg-[#0B1F3A]/85 dark:text-slate-50 dark:border-[#1E293B]/60'
          }`}
          role="banner"
          aria-label="Site header"
        >
          {/* Brand Logo */}
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
                <span className="bg-gradient-to-r from-[#0B1F3A] to-[#F59E0B] dark:from-[#F59E0B] dark:to-[#FBBF24] text-transparent bg-clip-text font-black">
                  CWA
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav
            pathname={pathname}
            isServicesOpen={isServicesOpen}
            setIsServicesOpen={setIsServicesOpen}
            isResourcesOpen={isResourcesOpen}
            setIsResourcesOpen={setIsResourcesOpen}
          />

          {/* Right Action Icons & Mobile Hamburger */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center whitespace-nowrap shrink-0 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-[0.875rem] py-2.5 px-6 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95"
            >
              Get started
            </Link>
            <button
              type="button"
              className="flex md:hidden items-center justify-center bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-slate-900 dark:text-slate-50 w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full cursor-pointer transition-all duration-300 shrink-0 hover:bg-slate-200 dark:hover:bg-[#1E3A8A]"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Slide Drawer */}
      <MobileNavDrawer
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isMobileServicesOpen={isMobileServicesOpen}
        setIsMobileServicesOpen={setIsMobileServicesOpen}
        isMobileResourcesOpen={isMobileResourcesOpen}
        setIsMobileResourcesOpen={setIsMobileResourcesOpen}
        pathname={pathname}
      />
    </>
  );
}
