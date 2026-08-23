'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ChevronDown } from 'lucide-react';
import { SERVICES_DATA } from '@/data/servicesData';
import { PRIMARY_NAV_ITEMS, RESOURCES_DROPDOWN_ITEMS } from '@/config/navigation';

const ServicesDropdown = dynamic(() => import('../ServicesDropdown'), { ssr: false });
const ResourcesDropdown = dynamic(() => import('../ResourcesDropdown'), { ssr: false });

export default function DesktopNav({
  pathname,
  isServicesOpen,
  setIsServicesOpen,
  isResourcesOpen,
  setIsResourcesOpen,
}) {
  return (
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

          if (link.dropdownType === 'services') {
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
                      ? 'text-[#0B1F3A] dark:text-[#F59E0B] bg-amber-500/10 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] hover:bg-slate-100 dark:hover:bg-[#112240]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-[#F59E0B]' : ''}`}
                  />
                </button>

                {isServicesOpen && (
                  <ServicesDropdown onClose={() => setIsServicesOpen(false)} />
                )}
              </div>
            );
          }

          if (link.dropdownType === 'resources') {
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
                      ? 'text-[#0B1F3A] dark:text-[#F59E0B] bg-amber-500/10 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] hover:bg-slate-100 dark:hover:bg-[#112240]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180 text-[#F59E0B]' : ''}`}
                  />
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
                  ? 'text-[#0B1F3A] dark:text-[#F59E0B] bg-amber-500/10 font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] hover:bg-slate-100 dark:hover:bg-[#112240]'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
