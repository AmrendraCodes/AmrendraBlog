'use client';

import { useState, useMemo, useEffect, memo } from 'react';
import { SearchX, Clock, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SearchToolbar from './SearchToolbar';
import '@/styles/SearchToolbar.css';
import BlogCard from '@/components/BlogCard';

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
    result = result.filter(a => a.category === category);
  }

  // 2. Filter by tag
  if (selectedTag) {
    result = result.filter(a => (a.tags || []).includes(selectedTag));
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
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sortBy === 'Popular') {
    result.sort((a, b) => a.title.length - b.title.length);
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

  const debouncedQuery = useDebounce(searchQuery, 250);

  const categories = useMemo(() => {
    return ['All', ...new Set(articles.map(a => a.category).filter(Boolean))];
  }, [articles]);

  const allTags = useMemo(() => {
    return propTags || [...new Set(articles.flatMap(a => a.tags || []))];
  }, [articles, propTags]);

  // Mock popular posts
  const popularPosts = useMemo(() => [...articles].reverse().slice(0, 3), [articles]);

  const filteredArticles = useMemo(
    () => filterAndSortArticles(articles, debouncedQuery, activeCategory, selectedTag, sortBy),
    [articles, debouncedQuery, activeCategory, selectedTag, sortBy]
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery, activeCategory, selectedTag, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const hasQuery = debouncedQuery.trim().length > 0;
  const noResults = filteredArticles.length === 0;

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedTag('');
    setCurrentPage(1);
  };

  return (
    <>
      {/* Search Toolbar */}
      <div className="py-6 px-6 lg:px-16 bg-[var(--section-alt-bg)] border-b border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto">
          <SearchToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={filteredArticles.length}
            totalCount={articles.length}
          />
        </div>
      </div>

      <section className="py-12 md:py-16 px-6 lg:px-16 bg-[var(--section-alt-bg)]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">

          {/* Main Content (Articles) */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6 sm:gap-4">

              {/* Category Tabs */}
              <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 w-full sm:w-auto scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#6366F1] border-[#6366F1] text-white shadow-md shadow-indigo-500/20'
                        : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-body)] hover:border-[#6366F1]/30 hover:text-[#6366F1] dark:hover:text-[#818CF8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort By */}
              <div className="flex items-center shrink-0">
                <span className="text-sm text-[var(--text-muted)] mr-2 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--foreground)] text-sm rounded-lg focus:ring-[#6366F1] focus:border-[#6366F1] block p-2 outline-none cursor-pointer font-bold"
                >
                  <option value="Latest">Latest</option>
                  <option value="Popular">Popular</option>
                  <option value="Category">Category</option>
                </select>
              </div>

            </div>

            {/* Active Tag Filter Indicator */}
            {selectedTag && (
              <div className="flex items-center gap-2 mb-6">
                <Tag size={14} className="text-[#6366F1]" />
                <span className="text-sm text-[var(--text-body)]">
                  Filtered by tag:
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818CF8] text-xs font-bold rounded-full">
                  #{selectedTag}
                  <button
                    onClick={() => setSelectedTag('')}
                    className="hover:text-[#6366F1] cursor-pointer bg-transparent border-none p-0 text-current"
                    aria-label="Clear tag filter"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}

            {/* No results state */}
            {noResults ? (
              <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818CF8] rounded-full flex items-center justify-center mb-4">
                  <SearchX size={32} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2">No articles found</h3>
                <p className="text-[var(--text-body)] max-w-md mx-auto">
                  No articles match your current filters. Try adjusting your search query or selecting a different category.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="mt-6 text-[#6366F1] dark:text-[#818CF8] font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <ArticleGrid articles={paginatedArticles} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full text-sm font-bold transition-all cursor-pointer border ${
                          currentPage === page
                            ? 'bg-[#6366F1] text-white border-[#6366F1] shadow-md shadow-indigo-500/20'
                            : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-body)] hover:border-[#6366F1]/30 hover:text-[#6366F1]'
                        }`}
                        aria-label={`Page ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#6366F1] hover:border-[#6366F1]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Next page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-8">

            {/* Popular Posts Widget */}
            <div className="bg-[var(--card-bg)] rounded-3xl p-6 border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold text-[var(--text-heading)] mb-6 flex items-center">
                <span className="w-2 h-6 bg-[#6366F1] rounded-full mr-3"></span>
                Popular Posts
              </h3>
              <div className="flex flex-col gap-5">
                {popularPosts.map((post, i) => (
                  <Link key={i} href={post.link} className="group flex gap-4 items-center no-underline">
                    <span className="text-3xl font-black text-[var(--card-border)] group-hover:text-[#6366F1]/30 transition-colors">0{i+1}</span>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-heading)] leading-tight group-hover:text-[#6366F1] dark:group-hover:text-[#818CF8] transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-[11px] text-[var(--text-muted)] mt-1 block font-medium">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags Cloud Widget */}
            <div className="bg-[var(--card-bg)] rounded-3xl p-6 border border-[rgba(255,255,255,0.05)] shadow-[var(--shadow-card)]">
              <h3 className="text-lg font-extrabold text-[var(--text-heading)] mb-6 flex items-center">
                <span className="w-2 h-6 bg-[#a855f7] rounded-full mr-3"></span>
                Tags Cloud
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer border ${
                      selectedTag === tag
                        ? 'bg-[#6366F1] text-white border-[#6366F1]'
                        : 'bg-[var(--section-alt-bg)] text-[var(--text-body)] border-[var(--card-border)] hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1]'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="bg-gradient-to-br from-[#6366F1] to-[#a855f7] rounded-3xl p-6 text-white shadow-[var(--shadow-float)] relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-extrabold mb-2 relative z-10">Join the Newsletter</h3>
              <p className="text-indigo-100 text-sm mb-6 relative z-10 leading-relaxed">
                Get the latest articles and insights delivered directly to your inbox every week.
              </p>
              <form className="relative z-10 flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm font-medium"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-white text-[#6366F1] font-extrabold rounded-xl hover:bg-indigo-50 transition-colors shadow-md text-sm cursor-pointer"
                >
                  Subscribe Now
                </button>
              </form>
            </div>

          </aside>
        </div>
      </section>
    </>
  );
}

// ─── ArticleGrid — renders the blog cards ──────────────────

const ArticleGrid = memo(function ArticleGrid({ articles }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
      {articles.map((article, index) => (
        <BlogCard key={article.link || index} post={article} />
      ))}
    </div>
  );
});
