'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  Calculator,
  ChevronDown,
  Code2,
  Search,
  Sparkles,
} from 'lucide-react';
import { PUBLISHED_TOOLS, TOOL_CATEGORY_CONFIG } from '@/data/toolsData';

const ICON_MAP = {
  Bot,
  Calculator,
  Code2,
  Search,
  Sparkles,
};

function getCategoryHref(categoryId) {
  return `/tools?category=${encodeURIComponent(categoryId)}`;
}

function getSubcategoryHref(categoryId, subcategory) {
  return `${getCategoryHref(categoryId)}&subcategory=${encodeURIComponent(subcategory)}`;
}

export default function ToolsMegaMenu({ isOpen, isCurrent, onToggle, onClose }) {
  const menuRef = useRef(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const categories = useMemo(
    () =>
      TOOL_CATEGORY_CONFIG.map((category) => ({
        ...category,
        tools: PUBLISHED_TOOLS.filter(
          (tool) => tool.mainCategory === category.title,
        ),
      })),
    [],
  );
  const firstPopulatedCategory =
    categories.find((category) => category.tools.length > 0)?.id ?? null;
  const activeCategoryId = hoveredCategoryId ?? firstPopulatedCategory;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) onClose();
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={menuRef}>
      <button
        type="button"
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="tools-mega-menu"
        className={`inline-flex items-center gap-1 rounded-full px-3 lg:px-4 py-1.5 text-[0.85rem] lg:text-[0.95rem] font-semibold transition-colors duration-200 ${
          isOpen || isCurrent
            ? 'bg-amber-500/10 text-[#0B1F3A] dark:text-[#F59E0B] font-bold'
            : 'text-slate-700 dark:text-slate-200 hover:text-[#F59E0B] dark:hover:text-[#F59E0B] hover:bg-slate-100 dark:hover:bg-[#112240]'
        }`}
      >
        Tools
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#F59E0B]' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          id="tools-mega-menu"
          className="fixed left-1/2 top-[4.25rem] z-[120] max-h-[min(75vh,44rem)] w-[min(60rem,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_24px_70px_rgba(2,6,23,0.22)] backdrop-blur-xl dark:border-[#1E293B] dark:bg-[#0B1F3A]/[.98] sm:p-5"
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {categories.map((category) => {
              const CategoryIcon = ICON_MAP[category.iconName] ?? Search;
              const isActive = activeCategoryId === category.id;
              const subcategories = [
                ...new Set(category.tools.map((tool) => tool.subcategory)),
              ];

              return (
                <section
                  key={category.id}
                  onMouseEnter={() => setHoveredCategoryId(category.id)}
                  onFocus={() => setHoveredCategoryId(category.id)}
                  className={`min-w-0 rounded-xl border p-3 transition-colors duration-200 sm:p-4 ${
                    isActive
                      ? 'border-[#F59E0B]/50 bg-[#F59E0B]/[.06]'
                      : 'border-transparent hover:border-slate-200 dark:hover:border-[#1E293B]'
                  }`}
                >
                  <Link
                    href={getCategoryHref(category.id)}
                    onClick={() => {
                      setHoveredCategoryId(category.id);
                      onClose();
                    }}
                    className="group mb-3 flex items-center gap-2.5 rounded-lg text-slate-900 no-underline dark:text-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/10 text-[#D97706] dark:text-[#F59E0B]">
                      <CategoryIcon size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold group-hover:text-[#D97706] dark:group-hover:text-[#F59E0B]">
                        {category.title}
                      </span>
                      <span className="block text-xs text-slate-500 dark:text-slate-400">
                        {category.tools.length} published {category.tools.length === 1 ? 'tool' : 'tools'}
                      </span>
                    </span>
                  </Link>

                  {subcategories.length > 0 ? (
                    <div className="space-y-3">
                      {subcategories.map((subcategory) => {
                        const tools = category.tools.filter(
                          (tool) => tool.subcategory === subcategory,
                        );
                        const SubcategoryIcon =
                          ICON_MAP[tools[0]?.subcategoryIconName] ?? CategoryIcon;

                        return (
                          <div key={subcategory} className="min-w-0">
                            <Link
                              href={getSubcategoryHref(category.id, subcategory)}
                              onClick={() => {
                                setHoveredCategoryId(category.id);
                                onClose();
                              }}
                              className="mb-1.5 inline-flex max-w-full items-center gap-1.5 text-xs font-semibold text-slate-500 no-underline transition-colors hover:text-[#D97706] dark:text-slate-400 dark:hover:text-[#F59E0B]"
                            >
                              <SubcategoryIcon size={14} aria-hidden="true" />
                              <span className="truncate">{subcategory}</span>
                            </Link>
                            <ul className="m-0 list-none space-y-0.5 p-0">
                              {tools.map((tool) => {
                                const ToolIcon = ICON_MAP[tool.iconName] ?? Code2;
                                return (
                                  <li key={tool.id}>
                                    <Link
                                      href={tool.route}
                                      onClick={() => {
                                        setHoveredCategoryId(category.id);
                                        onClose();
                                      }}
                                      className="group flex min-h-9 min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-700 no-underline transition-all duration-150 hover:translate-x-0.5 hover:bg-amber-500/10 hover:text-[#B45309] dark:text-slate-200 dark:hover:text-[#FBBF24]"
                                    >
                                      <ToolIcon
                                        size={14}
                                        aria-hidden="true"
                                        className="shrink-0 text-slate-400 transition-colors group-hover:text-[#D97706] dark:group-hover:text-[#F59E0B]"
                                      />
                                      <span className="min-w-0 truncate">{tool.title}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="m-0 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-500 dark:bg-[#071324] dark:text-slate-400">
                      No published tools in this category yet.
                    </p>
                  )}
                </section>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3 dark:border-[#1E293B]">
            <p className="m-0 text-xs text-slate-500 dark:text-slate-400">
              Practical tools for building and shipping.
            </p>
            <Link
              href="/tools"
              onClick={onClose}
              className="inline-flex min-h-9 shrink-0 items-center rounded-full bg-[#F59E0B] px-4 py-2 text-xs font-bold text-[#0B1F3A] no-underline transition-colors hover:bg-[#D97706]"
            >
              View All Tools
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
