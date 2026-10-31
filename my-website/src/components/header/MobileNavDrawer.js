'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bot,
  Calculator,
  ChevronDown,
  Code2,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { SERVICES_DATA } from '@/data/servicesData';
import { PRIMARY_NAV_ITEMS, RESOURCES_DROPDOWN_ITEMS } from '@/config/navigation';
import { PUBLISHED_TOOLS, TOOL_CATEGORY_CONFIG } from '@/data/toolsData';

const TOOL_ICON_MAP = {
  Bot,
  Calculator,
  Code2,
  Search,
  Sparkles,
};

export default function MobileNavDrawer({
  isMenuOpen,
  setIsMenuOpen,
  isMobileServicesOpen,
  setIsMobileServicesOpen,
  isMobileResourcesOpen,
  setIsMobileResourcesOpen,
  pathname,
}) {
  const [isMobileToolsOpen, setIsMobileToolsOpen] = React.useState(false);
  const [openToolCategory, setOpenToolCategory] = React.useState(null);
  const [openToolSubcategory, setOpenToolSubcategory] = React.useState(null);

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

            if (link.dropdownType === 'tools') {
              return (
                <div key={link.name} className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMobileToolsOpen((open) => !open)}
                    className={`flex w-full items-center justify-between rounded-xl border-none bg-transparent px-4 py-2.5 text-left text-[1.35rem] font-extrabold leading-tight transition-colors duration-200 ${
                      isActive || isMobileToolsOpen
                        ? 'bg-[#F59E0B]/10 text-[#0B1F3A] dark:bg-[#F59E0B]/15 dark:text-[#F59E0B]'
                        : 'text-slate-900 hover:text-[#F59E0B] dark:text-slate-50 dark:hover:text-[#F59E0B]'
                    }`}
                    aria-expanded={isMobileToolsOpen}
                    aria-controls="mobile-tools-menu"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      size={22}
                      className={`transition-transform duration-200 ${isMobileToolsOpen ? 'rotate-180 text-[#F59E0B]' : 'text-slate-400'}`}
                    />
                  </button>

                  {isMobileToolsOpen && (
                    <div id="mobile-tools-menu" className="ml-4 flex min-w-0 flex-col gap-2 border-l-2 border-[#F59E0B]/30 pl-3 pt-1">
                      <Link
                        href="/tools"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm font-bold text-[#D97706] no-underline hover:text-[#B45309] dark:text-[#F59E0B] dark:hover:text-[#FBBF24]"
                      >
                        View All Tools
                      </Link>

                      {TOOL_CATEGORY_CONFIG.map((category) => {
                        const tools = PUBLISHED_TOOLS.filter(
                          (tool) => tool.mainCategory === category.title,
                        );
                        const isCategoryOpen = openToolCategory === category.id;
                        const CategoryIcon = TOOL_ICON_MAP[category.iconName] ?? Search;
                        const subcategories = [
                          ...new Set(tools.map((tool) => tool.subcategory)),
                        ];

                        return (
                          <section key={category.id} className="min-w-0">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenToolCategory(isCategoryOpen ? null : category.id);
                                setOpenToolSubcategory(null);
                              }}
                              className={`flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-bold transition-colors ${
                                isCategoryOpen
                                  ? 'bg-[#F59E0B]/10 text-[#B45309] dark:text-[#F59E0B]'
                                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-[#112240]'
                              }`}
                              aria-expanded={isCategoryOpen}
                            >
                              <CategoryIcon size={16} aria-hidden="true" className="shrink-0" />
                              <span className="min-w-0 flex-1 truncate">{category.title}</span>
                              <span className="text-xs font-medium text-slate-400">
                                {tools.length}
                              </span>
                              <ChevronDown
                                size={16}
                                aria-hidden="true"
                                className={`shrink-0 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                              />
                            </button>

                            {isCategoryOpen && (
                              <div className="ml-3 mt-1 flex min-w-0 flex-col gap-1 border-l border-slate-200 pl-2 dark:border-[#1E293B]">
                                {subcategories.length > 0 ? (
                                  subcategories.map((subcategory) => {
                                    const groupKey = `${category.id}:${subcategory}`;
                                    const isSubcategoryOpen =
                                      openToolSubcategory === groupKey;
                                    const groupTools = tools.filter(
                                      (tool) => tool.subcategory === subcategory,
                                    );
                                    return (
                                      <div key={groupKey} className="min-w-0">
                                        <button
                                          type="button"
                                          onClick={() =>
                                            setOpenToolSubcategory(
                                              isSubcategoryOpen ? null : groupKey,
                                            )
                                          }
                                          className="flex min-h-10 w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#B45309] dark:text-slate-400 dark:hover:bg-[#112240] dark:hover:text-[#F59E0B]"
                                          aria-expanded={isSubcategoryOpen}
                                        >
                                          <span className="min-w-0 truncate">{subcategory}</span>
                                          <ChevronDown
                                            size={14}
                                            aria-hidden="true"
                                            className={`shrink-0 transition-transform ${isSubcategoryOpen ? 'rotate-180' : ''}`}
                                          />
                                        </button>
                                        {isSubcategoryOpen && (
                                          <ul className="m-0 list-none space-y-0.5 p-0">
                                            {groupTools.map((tool) => {
                                              const ToolIcon =
                                                TOOL_ICON_MAP[tool.iconName] ?? Code2;
                                              return (
                                                <li key={tool.id}>
                                                  <Link
                                                    href={tool.route}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex min-h-10 min-w-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 no-underline transition-colors hover:bg-amber-500/10 hover:text-[#B45309] dark:text-slate-200 dark:hover:text-[#F59E0B]"
                                                  >
                                                    <ToolIcon
                                                      size={14}
                                                      aria-hidden="true"
                                                      className="shrink-0"
                                                    />
                                                    <span className="min-w-0 truncate">
                                                      {tool.title}
                                                    </span>
                                                  </Link>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        )}
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p className="m-0 px-3 py-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                    No published tools in this category yet.
                                  </p>
                                )}
                              </div>
                            )}
                          </section>
                        );
                      })}
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
