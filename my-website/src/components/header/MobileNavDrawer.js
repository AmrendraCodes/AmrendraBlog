'use client';

import React from 'react';
import Link from 'next/link';
import { X, Sparkles, ChevronDown } from 'lucide-react';
import { SERVICES_DATA } from '@/data/servicesData';
import { PRIMARY_NAV_ITEMS, RESOURCES_DROPDOWN_ITEMS } from '@/config/navigation';

export default function MobileNavDrawer({
  isMenuOpen,
  setIsMenuOpen,
  isMobileServicesOpen,
  setIsMobileServicesOpen,
  isMobileResourcesOpen,
  setIsMobileResourcesOpen,
  pathname,
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/25 dark:bg-black/60 backdrop-blur-sm z-[105] transition-opacity duration-200 ${
          isMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[min(100%,24rem)] bg-white dark:bg-[#0B1F3A] z-[110] transition-transform duration-200 flex flex-col border-l border-slate-200/50 dark:border-[#1E293B] box-border ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        inert={!isMenuOpen}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-[#1E293B] gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#F59E0B] text-[#0B1F3A] rounded-full flex justify-center items-center w-8 h-8 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <Sparkles size={18} />
            </div>
            <span className="text-xl font-extrabold flex items-center text-slate-900 dark:text-white tracking-wider">
              <span className="bg-gradient-to-r from-[#0B1F3A] to-[#F59E0B] dark:from-[#F59E0B] dark:to-[#FBBF24] text-transparent bg-clip-text font-black">
                CWA
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center bg-slate-100/80 dark:bg-[#112240] border border-slate-200/50 dark:border-[#1E293B] text-slate-900 dark:text-slate-50 w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full cursor-pointer transition-colors duration-200 hover:bg-slate-200/80 dark:hover:bg-[#1E3A8A]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-6 overflow-y-auto flex flex-col gap-4" aria-label="Mobile navigation">
          {PRIMARY_NAV_ITEMS.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href);

            if (link.dropdownType === 'services') {
              return (
                <div key={link.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className={`text-[1.35rem] font-extrabold text-left transition-colors duration-200 leading-tight py-2.5 px-4 rounded-xl flex-1 flex items-center justify-between cursor-pointer border-none bg-transparent ${
                        isActive || isMobileServicesOpen
                          ? 'text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 dark:bg-[#F59E0B]/15 font-bold'
                          : 'text-slate-900 dark:text-slate-50 hover:text-[#F59E0B] dark:hover:text-[#F59E0B]'
                      }`}
                      aria-expanded={isMobileServicesOpen}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={22}
                        className={`transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180 text-[#F59E0B]' : 'text-slate-400'}`}
                      />
                    </button>
                  </div>

                  {isMobileServicesOpen && (
                    <div className="flex flex-col gap-1 pl-4 pt-1 border-l-2 border-[#F59E0B]/30 ml-4">
                      <Link
                        href="/services"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm font-bold text-[#F59E0B] hover:underline py-2 px-3 rounded-lg block"
                      >
                        → View All Services Overview
                      </Link>
                      {SERVICES_DATA.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] py-2 px-3 rounded-lg block"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.dropdownType === 'resources') {
              return (
                <div key={link.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                      className={`text-[1.35rem] font-extrabold text-left transition-colors duration-200 leading-tight py-2.5 px-4 rounded-xl flex-1 flex items-center justify-between cursor-pointer border-none bg-transparent ${
                        isActive || isMobileResourcesOpen
                          ? 'text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 dark:bg-[#F59E0B]/15 font-bold'
                          : 'text-slate-900 dark:text-slate-50 hover:text-[#F59E0B] dark:hover:text-[#F59E0B]'
                      }`}
                      aria-expanded={isMobileResourcesOpen}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={22}
                        className={`transition-transform duration-200 ${isMobileResourcesOpen ? 'rotate-180 text-[#F59E0B]' : 'text-slate-400'}`}
                      />
                    </button>
                  </div>

                  {isMobileResourcesOpen && (
                    <div className="flex flex-col gap-1 pl-4 pt-1 border-l-2 border-[#F59E0B]/30 ml-4">
                      <Link
                        href="/resources"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm font-bold text-[#F59E0B] hover:underline py-2 px-3 rounded-lg block"
                      >
                        → View All Resources Overview
                      </Link>
                      {RESOURCES_DROPDOWN_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] py-2 px-3 rounded-lg block"
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
                className={`text-[1.35rem] font-extrabold no-underline transition-colors duration-200 leading-tight py-2.5 px-4 rounded-xl block w-full ${
                  isActive
                    ? 'text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 dark:bg-[#F59E0B]/15 font-bold'
                    : 'text-slate-900 dark:text-slate-50 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] hover:bg-[#F59E0B]/5 dark:hover:bg-[#F59E0B]/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex flex-col gap-3 mt-auto pt-6 mb-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-[1.1rem] py-3.5 px-8 rounded-full border-none cursor-pointer w-full transition-opacity duration-200 shadow-lg shadow-amber-500/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Get started
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
