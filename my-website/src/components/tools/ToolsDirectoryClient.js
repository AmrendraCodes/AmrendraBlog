'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  ArrowUpRight,
  Bot,
  FileCode2,
  Share2,
  Palette,
  Terminal,
  Gauge,
  KeyRound,
  FileImage,
  Wrench,
  Copy,
  Check,
  Zap,
  Bookmark,
  BookmarkCheck,
  Clock,
  ArrowUpDown,
  SearchX,
  Send,
} from 'lucide-react';
import { TOOL_CATEGORIES, SORT_OPTIONS, TOOLS_DATA } from '@/data/toolsData';

// Icon mapping helper
const ICON_MAP = {
  Bot,
  FileCode2,
  Share2,
  Palette,
  Terminal,
  Gauge,
  KeyRound,
  FileImage,
};

// Strict Semantic Badge System (WCAG AA Compliant)
const SEMANTIC_BADGES = {
  popular: {
    label: 'Popular',
    className: 'bg-amber-500/10 text-amber-900 dark:text-amber-300 border-amber-500/30',
  },
  new: {
    label: 'New',
    className: 'bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 border-emerald-500/30',
  },
  trending: {
    label: 'Trending',
    className: 'bg-purple-500/10 text-purple-900 dark:text-purple-300 border-purple-500/30',
  },
  free: {
    label: 'Free Online',
    className: 'bg-blue-500/10 text-blue-900 dark:text-blue-300 border-blue-500/30',
  },
};

// Category Icon Accents
const CATEGORY_ACCENTS = {
  'AI & LLMs': 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-[#F59E0B] border-amber-500/30',
  'Developer Utilities': 'bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
  'Web & SEO': 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  'Design & CSS': 'bg-gradient-to-br from-purple-500/20 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
};

export default function ToolsDirectoryClient() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [savedToolSlugs, setSavedToolSlugs] = useState([]);
  const [activeModalTool, setActiveModalTool] = useState(null);
  const [copiedSlug, setCopiedSlug] = useState(null);
  const [suggestModalOpen, setSuggestModalOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Initialize saved bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cwa_saved_tools');
      if (stored) {
        setSavedToolSlugs(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage read errors in private browsing
    }
  }, []);

  // Save bookmarks to localStorage
  const toggleBookmark = (e, slug) => {
    e.stopPropagation();
    setSavedToolSlugs((prev) => {
      const updated = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem('cwa_saved_tools', JSON.stringify(updated));
      } catch {
        // Fallback
      }
      return updated;
    });
  };

  // Keyboard shortcut '/' to focus search bar & Escape to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
      if (e.key === 'Escape') {
        if (activeModalTool) setActiveModalTool(null);
        if (suggestModalOpen) setSuggestModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalTool, suggestModalOpen]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (activeModalTool || suggestModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModalTool, suggestModalOpen]);

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let result = TOOLS_DATA.filter((tool) => {
      // Category filter
      if (selectedCategory === 'Saved') {
        if (!savedToolSlugs.includes(tool.slug)) return false;
      } else if (selectedCategory !== 'All' && tool.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      return (
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q)) ||
        tool.category.toLowerCase().includes(q)
      );
    });

    // Sorting logic
    if (sortBy === 'newest') {
      result.sort((a, b) => (b.semanticBadge === 'new' ? 1 : 0) - (a.semanticBadge === 'new' ? 1 : 0));
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, savedToolSlugs]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {
      All: TOOLS_DATA.length,
      Saved: savedToolSlugs.length,
    };
    TOOL_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = TOOLS_DATA.filter((t) => t.category === cat).length;
      }
    });
    return counts;
  }, [savedToolSlugs]);

  const handleCopyLink = (e, tool) => {
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/tools#${tool.slug}`;
      navigator.clipboard.writeText(url);
      setCopiedSlug(tool.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  return (
    <div className="w-full">
      {/* ─── Search, Sort & Category Controls ─── */}
      <div className="mb-10 sm:mb-12 space-y-6">
        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-3xl mx-auto">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search
                size={18}
                className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none"
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools by name, tag, or tech (e.g. JSON, GPT-4o, SEO)..."
                className="w-full pl-11 pr-24 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#0B1F3A]/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-[#1E293B] shadow-xs focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all text-sm sm:text-base min-h-[48px]"
                aria-label="Search developer tools"
              />
              <div className="absolute right-3 flex items-center gap-1.5">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#112240] transition-colors"
                    aria-label="Clear search query"
                  >
                    <X size={16} />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded bg-slate-100 dark:bg-[#112240] border border-slate-200 dark:border-[#1E293B] text-[11px] font-mono text-slate-500 dark:text-slate-400 select-none">
                    /
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Sort Selector Dropdown */}
          <div className="relative shrink-0">
            <label htmlFor="tools-sort-select" className="sr-only">
              Sort developer tools
            </label>
            <div className="relative flex items-center">
              <ArrowUpDown
                size={15}
                className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none"
                aria-hidden="true"
              />
              <select
                id="tools-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-auto pl-9 pr-8 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-[#0B1F3A]/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#1E293B] text-xs sm:text-sm font-semibold shadow-xs focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 outline-none cursor-pointer min-h-[48px]"
                aria-label="Sort tools"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#0B1F3A] text-slate-900 dark:text-slate-100">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (Horizontally Scrollable Pill Row) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-hide px-1 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {TOOL_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category] || 0;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border select-none active:scale-95 ${
                  isSelected
                    ? 'bg-[#F59E0B] text-[#0B1F3A] border-[#F59E0B] shadow-md shadow-amber-500/20'
                    : 'bg-white dark:bg-[#0B1F3A]/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/40 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-pressed={isSelected}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-[#0B1F3A]/20 text-[#0B1F3A]'
                      : 'bg-slate-100 dark:bg-[#112240] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {/* Bookmarked / Saved Tab */}
          <button
            type="button"
            onClick={() => setSelectedCategory('Saved')}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 border select-none active:scale-95 ${
              selectedCategory === 'Saved'
                ? 'bg-[#F59E0B] text-[#0B1F3A] border-[#F59E0B] shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-[#0B1F3A]/70 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-[#1E293B] hover:border-[#F59E0B]/40 hover:text-slate-900 dark:hover:text-white'
            }`}
            aria-pressed={selectedCategory === 'Saved'}
          >
            <Bookmark size={13} className={selectedCategory === 'Saved' ? 'fill-current' : ''} />
            <span>Saved</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                selectedCategory === 'Saved'
                  ? 'bg-[#0B1F3A]/20 text-[#0B1F3A]'
                  : 'bg-slate-100 dark:bg-[#112240] text-slate-500 dark:text-slate-400'
              }`}
            >
              {categoryCounts.Saved}
            </span>
          </button>
        </div>

        {/* Results Bar with Reset Link */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-1">
          <p>
            Showing <span className="font-bold text-[#0B1F3A] dark:text-[#F59E0B]">{filteredTools.length}</span>{' '}
            {filteredTools.length === 1 ? 'developer tool' : 'developer tools'}
            {selectedCategory !== 'All' && <span> in <strong className="text-slate-700 dark:text-slate-200">{selectedCategory}</strong></span>}
            {searchQuery && <span> matching &ldquo;<strong className="text-slate-700 dark:text-slate-200">{searchQuery}</strong>&rdquo;</span>}
          </p>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-[#D97706] dark:text-[#F59E0B] hover:underline font-semibold cursor-pointer border-none bg-transparent p-1 min-h-[44px] flex items-center"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* ─── Tools Card Grid (Properly Balanced for 2 Tools or More) ─── */}
      {filteredTools.length > 0 ? (
        <div
          className={
            filteredTools.length <= 2
              ? "max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 items-stretch"
          }
        >
          {filteredTools.map((tool) => {
            const IconComponent = ICON_MAP[tool.iconName] || Wrench;
            const categoryAccent = CATEGORY_ACCENTS[tool.category] || CATEGORY_ACCENTS['Developer Utilities'];
            const badgeMeta = SEMANTIC_BADGES[tool.semanticBadge] || SEMANTIC_BADGES.free;
            const isBookmarked = savedToolSlugs.includes(tool.slug);

            return (
              <div
                key={tool.id}
                id={tool.slug}
                onClick={() => {
                  if (tool.slug === 'ai-agent-cost-calculator') {
                    router.push(`/tools/${tool.slug}`);
                  } else {
                    setActiveModalTool(tool);
                  }
                }}
                className="group relative bg-[var(--card-bg)] rounded-2xl sm:rounded-3xl border border-[var(--card-border)] p-6 sm:p-7 shadow-[var(--shadow-card)] card-interactive flex flex-col justify-between hover:border-[#F59E0B]/50 hover:shadow-lg transition-all duration-300 min-h-[460px] cursor-pointer overflow-visible active:scale-[0.98]"
              >
                <div>
                  {/* Top Bar: Icon + Semantic Badge + Quick Actions */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-105 shrink-0 ${categoryAccent}`}
                      >
                        <IconComponent size={22} strokeWidth={2.2} />
                      </div>

                      {/* Semantic Badge (Color logically paired: New=Green, Popular=Orange, Trending=Purple, Free=Blue) */}
                      <span
                        className={`text-[10px] font-mono font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs whitespace-nowrap ${badgeMeta.className}`}
                      >
                        {badgeMeta.label}
                      </span>
                    </div>

                    {/* Card Quick Actions: Copy Link & Bookmark */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(e, tool)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-[#F59E0B] hover:bg-slate-100 dark:hover:bg-[#112240] transition-colors border-none bg-transparent cursor-pointer"
                        aria-label={`Copy link for ${tool.title}`}
                        title="Copy direct tool link"
                      >
                        {copiedSlug === tool.slug ? (
                          <Check size={14} className="text-emerald-500" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => toggleBookmark(e, tool.slug)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors border-none bg-transparent cursor-pointer ${
                          isBookmarked
                            ? 'text-[#F59E0B] hover:text-amber-600'
                            : 'text-slate-400 hover:text-[#F59E0B] hover:bg-slate-100 dark:hover:bg-[#112240]'
                        }`}
                        aria-label={isBookmarked ? `Remove ${tool.title} from bookmarks` : `Bookmark ${tool.title}`}
                        title={isBookmarked ? 'Saved to Bookmarks' : 'Bookmark this tool'}
                      >
                        {isBookmarked ? <BookmarkCheck size={15} className="fill-[#F59E0B]" /> : <Bookmark size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Standardized Title Container (Guarantees perfect vertical alignment & zero clipping) */}
                  <div className="min-h-[3rem] sm:min-h-[3.25rem] flex items-start mb-2 overflow-visible">
                    <h3 className="text-[15px] sm:text-base lg:text-[17px] font-bold text-[var(--text-heading)] group-hover:text-[#F59E0B] transition-colors leading-snug line-clamp-2 break-words">
                      {tool.title}
                    </h3>
                  </div>

                  {/* Factual & Honest Metadata: Last Updated & 100% Client-Side */}
                  <div className="flex items-center gap-2.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mb-3.5">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} className="text-slate-400" />
                      Updated {tool.updatedAt}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
                      <Zap size={11} className="text-[#F59E0B]" />
                      100% Client-Side
                    </span>
                  </div>

                  {/* Tool Description (Clean clamp with full text available in quick modal) */}
                  <p className="text-slate-600 dark:text-[#94A3B8] text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3">
                    {tool.description}
                  </p>

                  {/* Click to expand hint for desktop & mobile */}
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#D97706] dark:text-[#F59E0B] mb-4 group-hover:underline">
                    <span>View tool &amp; features</span>
                    <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Tags Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-[#071324] px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-[#1E293B]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Category & Touch-Friendly Action Button */}
                <div className="pt-4 border-t border-[var(--card-border)] flex items-center justify-between gap-2 flex-nowrap">
                  <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider truncate shrink">
                    {tool.category}
                  </span>

                  {tool.slug === 'ai-agent-cost-calculator' ? (
                    <Link
                      href={`/tools/${tool.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#112240] group-hover:bg-[#F59E0B] text-slate-800 dark:text-slate-100 group-hover:text-[#0B1F3A] font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 border border-slate-200 dark:border-[#1E293B] group-hover:border-[#F59E0B] transition-all duration-200 cursor-pointer shadow-2xs shrink-0 active:scale-95 no-underline"
                      aria-label={`Open ${tool.title}`}
                    >
                      <span>{tool.actionText}</span>
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                      />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalTool(tool);
                      }}
                      className="min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#112240] group-hover:bg-[#F59E0B] text-slate-800 dark:text-slate-100 group-hover:text-[#0B1F3A] font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 border border-slate-200 dark:border-[#1E293B] group-hover:border-[#F59E0B] transition-all duration-200 cursor-pointer shadow-2xs shrink-0 active:scale-95"
                      aria-label={`Open ${tool.title}`}
                    >
                      <span>{tool.actionText}</span>
                      <ArrowUpRight
                        size={15}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                      />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ─── Illustrated Empty / No Results State with Suggest CTA ─── */
        <div className="text-center py-16 px-6 bg-white/60 dark:bg-[#0B1F3A]/40 rounded-3xl border border-dashed border-slate-300 dark:border-[#1E293B] max-w-xl mx-auto my-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#F59E0B] mx-auto mb-4 shadow-xs">
            <SearchX size={28} />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] mb-2">
            No developer tools found
          </h3>

          <p className="text-slate-600 dark:text-[#94A3B8] text-sm leading-relaxed max-w-md mx-auto mb-6">
            We couldn&apos;t find any tools matching &ldquo;<strong className="text-slate-800 dark:text-slate-200">{searchQuery}</strong>&rdquo;{' '}
            {selectedCategory !== 'All' && <span>in <strong>{selectedCategory}</strong></span>}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-full bg-slate-100 dark:bg-[#112240] hover:bg-slate-200 dark:hover:bg-[#1E3A8A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm cursor-pointer transition-colors border border-slate-200 dark:border-[#1E293B]"
            >
              Reset Filters
            </button>

            <button
              type="button"
              onClick={() => setSuggestModalOpen(true)}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-xs sm:text-sm cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Send size={14} />
              <span>Suggest &ldquo;{searchQuery || 'this tool'}&rdquo;</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── Tool Quick View & Workspace Modal ─── */}
      {/* ─── Tool Modal (Linear/Vercel Minimal Dialog) ─── */}
      {activeModalTool && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tool-modal-title"
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Clean subtle backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModalTool(null)}
          />

          {/* Single-surface dialog sheet (No nested boxes) */}
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0A1628] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 z-10 animate-fade-in text-slate-800 dark:text-slate-200">
            {/* Top Header: Asymmetric, clean and understated */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5 text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">
                    {activeModalTool.category}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      SEMANTIC_BADGES[activeModalTool.semanticBadge]?.className
                    }`}
                  >
                    {SEMANTIC_BADGES[activeModalTool.semanticBadge]?.label}
                  </span>
                </div>

                <h3
                  id="tool-modal-title"
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug"
                >
                  {activeModalTool.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalTool(null)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border-none bg-transparent cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={17} />
              </button>
            </div>

            {/* Body: Continuous, natural developer prose without boxed cards */}
            <div className="space-y-3.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>{activeModalTool.description}</p>

              {activeModalTool.highlights && (
                <div className="pt-1">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 mb-2">
                    What it does:
                  </p>
                  <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 marker:text-slate-400 dark:marker:text-slate-600">
                    {activeModalTool.highlights.map((feat) => (
                      <li key={feat} className="leading-normal">
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Natural, honest privacy note merged in text — NO separate colored card */}
              <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                Runs 100% locally in your browser with zero server uploads or external telemetry.
              </p>
            </div>

            {/* Footer: Asymmetric Buttons (Secondary minimal link vs Solid primary button) */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={(e) => handleCopyLink(e, activeModalTool)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors border-none bg-transparent cursor-pointer p-0"
              >
                {copiedSlug === activeModalTool.slug ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Link copied to clipboard
                    </span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy tool link</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                {activeModalTool.slug === 'ai-agent-cost-calculator' && (
                  <Link
                    href={`/tools/${activeModalTool.slug}`}
                    onClick={() => setActiveModalTool(null)}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5 no-underline"
                  >
                    <span>Launch Calculator</span>
                    <ArrowUpRight size={13} />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setActiveModalTool(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer border-none shadow-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Suggest a Tool Dialog Modal ─── */}
      {suggestModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="suggest-modal-title"
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSuggestModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white dark:bg-[#0B1F3A] rounded-3xl border border-slate-200 dark:border-[#1E293B] shadow-2xl p-6 sm:p-8 z-10 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E293B] mb-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
                SUGGEST A TOOL
              </span>
              <button
                type="button"
                onClick={() => setSuggestModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#112240] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <h3 id="suggest-modal-title" className="text-xl font-bold text-[var(--text-heading)] mb-2">
              Request a Custom Utility
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
              Didn&apos;t find what you need? Send over your tool specification or workflow bottleneck, and I&apos;ll build and publish it free for developers.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href={`/contact?subject=${encodeURIComponent(`Tool Request: ${searchQuery || 'New Utility'}`)}`}
                onClick={() => setSuggestModalOpen(false)}
                className="w-full min-h-[44px] px-6 py-2.5 rounded-full bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm no-underline"
              >
                <span>Send Request via Contact Form</span>
                <ArrowUpRight size={16} />
              </Link>

              <button
                type="button"
                onClick={() => setSuggestModalOpen(false)}
                className="w-full min-h-[44px] px-6 py-2.5 rounded-full bg-slate-100 dark:bg-[#112240] hover:bg-slate-200 dark:hover:bg-[#1E3A8A] text-slate-700 dark:text-slate-300 font-bold text-sm cursor-pointer transition-colors border border-slate-200 dark:border-[#1E293B]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Suggest a Tool Bottom Banner ─── */}
      <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#F59E0B]/5 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 text-center md:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0B1F3A] dark:text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30 inline-block mb-3">
            NEED A SPECIFIC TOOL?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)] mb-2">
            Suggest a Developer Tool or Workflow
          </h3>
          <p className="text-slate-600 dark:text-[#94A3B8] text-sm sm:text-base max-w-xl">
            Have an idea for an AI prompt formatter, CSS generator, or cloud calculator? Let me know and I&apos;ll build and host it free for developers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSuggestModalOpen(true)}
          className="relative z-10 shrink-0 min-h-[44px] inline-flex items-center justify-center bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1F3A] font-bold text-sm py-3 px-8 rounded-full border-none cursor-pointer transition-colors shadow-md active:scale-95"
        >
          <span>Suggest a Tool</span>
          <ArrowUpRight size={16} className="ml-1.5" />
        </button>
      </div>
    </div>
  );
}
