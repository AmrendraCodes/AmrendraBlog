"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ArrowRight, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 sm:px-6 pt-6 pointer-events-none">
        <header
          className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between px-6 py-3 rounded-full border border-slate-200 shadow-2xl backdrop-blur-md 
          ${isScrolled ? "w-full max-w-5xl bg-white/95 scale-[0.98]" : "w-full max-w-7xl bg-white/90"}
          animate-in fade-in slide-in-from-top-4 duration-1000`}
        >
          {/* Left Area: Logo */}
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-blue-500/20">
                <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]" />
              </div>
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 font-outfit whitespace-nowrap flex-shrink-0">
                <span className="block sm:hidden">CWA</span>
                <span className="hidden sm:block">codewith<span className="text-blue-600">Amrendra</span></span>
              </span>
            </Link>
          </div>

          {/* Center Area: Navigation (Desktop/Tablet) */}
         <nav className="hidden md:flex items-center justify-center flex-1 ... mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-6 py-2 text-[14px] lg:text-[15px] font-bold text-slate-700 hover:text-blue-600 transition-all group"
              >
                {link.name}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 rounded-full opacity-0 transition-all duration-300 group-hover:w-4 group-hover:opacity-100"></span>
              </Link>
            ))}
          </nav>

          {/* Right Area: Mobile Toggle only */}
          <div className="flex items-center">
            {/* Mobile Menu Icon */}
            <button
              className="md:hidden p-2 sm:p-2.5 text-slate-700 hover:text-blue-600 transition-colors cursor-pointer bg-slate-100 rounded-full border border-slate-200 flex-shrink-0 ml-4"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] md:hidden transition-all duration-500 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="p-6 sm:p-8 flex items-center justify-between border-b border-slate-50 min-w-0">
            <div className="flex items-center space-x-3 flex-shrink-0 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="text-xl sm:text-2xl font-bold font-outfit text-slate-900 whitespace-nowrap flex-shrink-0">
                <span className="block sm:hidden">CWAmrendra</span>
                <span className="hidden sm:block">codewith<span className="text-blue-600">Amrendra</span></span>
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 sm:p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer flex-shrink-0 ml-4"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 px-8 py-12 flex flex-col space-y-6">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                style={{ transitionDelay: `${idx * 50}ms` }}
                className={`text-3xl font-bold text-slate-900 hover:text-blue-600 transition-all flex items-center justify-between group ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
                <ArrowRight size={24} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-8 border-t border-slate-50 space-y-4">
            <Link
              href="/subscribe"
              className="flex items-center justify-center bg-blue-600 text-white w-full py-5 rounded-3xl text-lg font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-2xl shadow-blue-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Reading Free
            </Link>
            <div className="flex justify-center space-x-6 py-4">
              <span className="text-slate-400 text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">Twitter</span>
              <span className="text-slate-400 text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">GitHub</span>
              <span className="text-slate-400 text-sm font-medium hover:text-blue-600 transition-colors cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24 lg:h-28"></div>
    </>
  );
}
