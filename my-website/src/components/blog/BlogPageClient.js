'use client';

import { useState, useMemo, useEffect } from 'react';
import { Tag } from 'lucide-react';
import SearchToolbar from './SearchToolbar';
import '@/styles/SearchToolbar.css';
import BlogGrid from './BlogGrid';
import BlogSidebar from './BlogSidebar';

// ─── Custom hook: useDebounce ──────────────────────────────
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── Constants ──────────────────────────────
const POSTS_PER_PAGE = 6;

// ─── Filter & Sort logic ──────────────────────────────
function filterAndSortArticles(articles, query, category, selectedTag, sortBy) {
  let result = [...articles];

  // 1. Filter by category
  if (category !== 'All') {
    result = result.filter((a) => a.category === category);
  }

  // 2. Filter by tag
  if (selectedTag) {
    result = result.filter((a) => (a.tags || []).includes(selectedTag));
  }

  // 3. Filter by search query
  if (query.trim()) {
    const lowerQuery = query.toLowerCase().trim();
    result = result.filter((article) => {
      const searchableFields = [
        article.title,
        article.excerpt,
        article.category,
        article.author,
        ...(article.tags || []),
      ];
      return searchableFields.some((field) =>
        field?.toLowerCase().includes(lowerQuery)
      );
    });
  }

  // 4. Sort
  if (sortBy === 'Latest') {
    result.sort((a, b) => new Date(b.publishedAt || b.date) - new Date(a.publishedAt || a.date));
  } else if (sortBy === 'Popular') {
    result.sort(
      (a, b) =>
        (b.views || 0) - (a.views || 0) || new Date(b.publishedAt || b.date) - new Date(a.publishedAt || a.date)
    );
  } else if (sortBy === 'Category') {
    result.sort((a, b) => a.category.localeCompare(b.category));
  }

  return result;
}

// ─── BlogPageClient Component ──────────────────────────────
export default function BlogPageClient({ articles: propArticles, allTags: propTags }) {
  const articles = useMemo(() => propArticles || [], [propArticles]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);

  const [sidebarEmail, setSidebarEmail] = useState('');
  const [isSidebarSubmitting, setIsSidebarSubmitting] = useState(false);
  const [sidebarSubmitted, setSidebarSubmitted] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 250);

  const categories = useMemo(() => {
    return ['All', ...new Set(articles.map((a) => a.category).filter(Boolean))];
  }, [articles]);

  const allTags = useMemo(() => {
    return propTags || [...new Set(articles.flatMap((a) => a.tags || []))];
  }, [articles, propTags]);

  // Latest posts sorted by newest publication date
  const latestPosts = useMemo(() => {
    return [...articles]
      .sort(
        (a, b) =>
          new Date(b.publishedAt || b.date) - new Date(a.publishedAt || a.date)
      )
      .slice(0, 3);
  }, [articles]);

  const filteredArticles = useMemo(
    () => filterAndSortArticles(articles, debouncedQuery, activeCategory, selectedTag, sortBy),
    [articles, debouncedQuery, activeCategory, selectedTag, sortBy]
  );

  const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredArticles.slice(start, start + POSTS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedTag('');
    setSortBy('Latest');
    setCurrentPage(1);
  };

  const handleSidebarNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!sidebarEmail || !sidebarEmail.includes('@')) return;
    setIsSidebarSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: sidebarEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSidebarSubmitted(true);
        setSidebarEmail('');
      }
    } catch (err) {
      console.error('Sidebar newsletter submit error:', err);
    } finally {
      setIsSidebarSubmitting(false);
    }
  };

  const noResults = filteredArticles.length === 0;

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] min-h-screen">
      {/* Search Header Banner */}
      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
        resultCount={filteredArticles.length}
        totalCount={articles.length}
      />

      {/* Main Articles Listing Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[var(--section-alt-bg)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Main Content (Articles) */}
          <div className="flex-1 min-w-0">
            {/* Categories & Sorting Toolbar */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-[var(--card-border)]">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-bold text-[var(--text-heading)]">Browse by Category</span>
                  <span className="text-xs font-mono font-bold bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] border border-[#F59E0B]/30 px-2.5 py-0.5 rounded-full">
                    {activeCategory === 'All' ? `${filteredArticles.length} Posts` : activeCategory}
                  </span>
                </div>

                {/* Sort By */}
                <div className="flex items-center shrink-0 self-end sm:self-auto">
                  <span className="text-sm text-[var(--text-muted)] mr-2 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] text-sm rounded-xl focus:ring-[#F59E0B] focus:border-[#F59E0B] block py-1.5 px-3 outline-none cursor-pointer font-bold transition-colors"
                  >
                    <option value="Latest">Latest</option>
                    <option value="Popular">Popular</option>
                    <option value="Category">Category</option>
                  </select>
                </div>
              </div>

              {/* Category Tabs — flex-wrap ensures all categories are visible without cutting off */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border cursor-pointer whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-[#F59E0B] border-[#F59E0B] text-[#0B1F3A] shadow-md shadow-amber-500/20 scale-[1.02]'
                        : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-body)] hover:border-[#F59E0B]/40 hover:text-[#F59E0B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tag Filter Indicator */}
            {selectedTag && (
              <div className="flex items-center gap-2 mb-6">
                <Tag size={14} className="text-[#F59E0B]" />
                <span className="text-sm text-[var(--text-body)]">Filtered by tag:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] text-xs font-bold rounded-full border border-[#F59E0B]/30">
                  #{selectedTag}
                  <button
                    onClick={() => setSelectedTag('')}
                    className="hover:text-[#F59E0B] cursor-pointer bg-transparent border-none p-0 text-current"
                    aria-label="Clear tag filter"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}

            {/* Article Grid & Pagination */}
            <BlogGrid
              paginatedArticles={paginatedArticles}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              noResults={noResults}
              handleClearFilters={handleClearFilters}
            />
          </div>

          {/* Sidebar Widgets */}
          <BlogSidebar
            latestPosts={latestPosts}
            allTags={allTags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            setCurrentPage={setCurrentPage}
            sidebarEmail={sidebarEmail}
            setSidebarEmail={setSidebarEmail}
            isSidebarSubmitting={isSidebarSubmitting}
            sidebarSubmitted={sidebarSubmitted}
            handleSidebarNewsletterSubmit={handleSidebarNewsletterSubmit}
          />
        </div>
      </section>
    </div>
  );
}
