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
  const servicesTimerRef = React.useRef(null);
  const resourcesTimerRef = React.useRef(null);

  const handleServicesEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    setIsResourcesOpen(false);
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    servicesTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 250);
  };

  const handleResourcesEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    setIsServicesOpen(false);
    setIsResourcesOpen(true);
  };

  const handleResourcesLeave = () => {
    if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    resourcesTimerRef.current = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 250);
  };

  React.useEffect(() => {
    return () => {
      if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
      if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
    };
  }, []);

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
                className="group"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <div className={`inline-flex items-center rounded-full transition-colors duration-200 ${
                  isActive || isServicesOpen
                    ? 'bg-amber-500/10 text-[#0B1F3A] dark:text-[#F59E0B]'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#112240]'
                }`}>
                  <Link
                    href="/services"
                    onClick={() => {
                      if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
                      setIsServicesOpen(false);
                    }}
                    className={`text-[0.85rem] lg:text-[0.95rem] font-semibold no-underline pl-3.5 lg:pl-4 pr-1 py-1.5 rounded-l-full cursor-pointer ${
                      isActive || isServicesOpen ? 'font-bold' : 'hover:text-[#F59E0B]'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
                      setIsServicesOpen(!isServicesOpen);
                    }}
                    aria-haspopup="true"
                    aria-expanded={isServicesOpen}
                    aria-label="Toggle Services menu"
                    className="pr-2.5 lg:pr-3 pl-1 py-1.5 rounded-r-full cursor-pointer border-none bg-transparent hover:text-[#F59E0B] flex items-center"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-[#F59E0B]' : ''}`}
                    />
                  </button>
                </div>

                {isServicesOpen && (
                  <ServicesDropdown
                    onClose={() => {
                      if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
                      setIsServicesOpen(false);
                    }}
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  />
                )}
              </div>
            );
          }

          if (link.dropdownType === 'resources') {
            return (
              <div
                key={link.name}
                className="group"
                onMouseEnter={handleResourcesEnter}
                onMouseLeave={handleResourcesLeave}
              >
                <div className={`inline-flex items-center rounded-full transition-colors duration-200 ${
                  isActive || isResourcesOpen
                    ? 'bg-amber-500/10 text-[#0B1F3A] dark:text-[#F59E0B]'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#112240]'
                }`}>
                  <Link
                    href="/resources"
                    onClick={() => {
                      if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
                      setIsResourcesOpen(false);
                    }}
                    className={`text-[0.85rem] lg:text-[0.95rem] font-semibold no-underline pl-3.5 lg:pl-4 pr-1 py-1.5 rounded-l-full cursor-pointer ${
                      isActive || isResourcesOpen ? 'font-bold' : 'hover:text-[#F59E0B]'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
                      setIsResourcesOpen(!isResourcesOpen);
                    }}
                    aria-haspopup="true"
                    aria-expanded={isResourcesOpen}
                    aria-label="Toggle Resources menu"
                    className="pr-2.5 lg:pr-3 pl-1 py-1.5 rounded-r-full cursor-pointer border-none bg-transparent hover:text-[#F59E0B] flex items-center"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isResourcesOpen ? 'rotate-180 text-[#F59E0B]' : ''}`}
                    />
                  </button>
                </div>

                {isResourcesOpen && (
                  <ResourcesDropdown
                    onClose={() => {
                      if (resourcesTimerRef.current) clearTimeout(resourcesTimerRef.current);
                      setIsResourcesOpen(false);
                    }}
                    onMouseEnter={handleResourcesEnter}
                    onMouseLeave={handleResourcesLeave}
                  />
                )}
              </div>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-[0.85rem] lg:text-[0.95rem] font-semibold no-underline transition-colors duration-200 whitespace-nowrap px-3 lg:px-4 py-1.5 rounded-full ${
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
