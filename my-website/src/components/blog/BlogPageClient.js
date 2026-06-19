'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { SearchX } from 'lucide-react';
import SearchToolbar from './SearchToolbar';
import '@/styles/SearchToolbar.css';

// ─── Articles data comes from props (passed by server component) ───

// ─── Custom hook: useDebounce ──────────────────────────────
// Delays value updates to avoid excessive re-filtering on
// every keystroke. Great for large article lists or API calls.
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// ─── Filter & Sort logic (pure function) ──────────────────────────
function filterAndSortArticles(articles, query, category, sortBy) {
  let result = [...articles];

  // 1. Filter by category
  if (category !== 'All') {
    result = result.filter(a => a.category === category);
  }

  // 2. Filter by search query
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

  // 3. Sort
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
export default function BlogPageClient({ articles: propArticles }) {
  const articles = useMemo(() => propArticles || [], [propArticles]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  
  const debouncedQuery = useDebounce(searchQuery, 250);

  const categories = useMemo(() => {
    return ['All', ...new Set(articles.map(a => a.category).filter(Boolean))];
  }, [articles]);

  const allTags = useMemo(() => {
    return [...new Set(articles.flatMap(a => a.tags || []))];
  }, [articles]);

  // Mock popular posts
  const popularPosts = useMemo(() => [...articles].reverse().slice(0, 3), [articles]);

  const filteredArticles = useMemo(
    () => filterAndSortArticles(articles, debouncedQuery, activeCategory, sortBy),
    [articles, debouncedQuery, activeCategory, sortBy]
  );

  const hasQuery = debouncedQuery.trim().length > 0;
  const noResults = filteredArticles.length === 0;

  return (
    <>
      {/* Search Toolbar */}
      <div className="py-6 px-6 lg:px-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          <SearchToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={filteredArticles.length}
            totalCount={articles.length}
          />
        </div>
      </div>

      <section className="py-12 md:py-16 px-6 lg:px-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Main Content (Articles) */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6 sm:gap-4">
              
              {/* Category Tabs */}
              <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2 w-full sm:w-auto scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border cursor-pointer ${
                      activeCategory === cat 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort By */}
              <div className="flex items-center shrink-0">
                <span className="text-sm text-slate-500 dark:text-slate-400 mr-2 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer font-bold"
                >
                  <option value="Latest">Latest</option>
                  <option value="Popular">Popular</option>
                  <option value="Category">Category</option>
                </select>
              </div>

            </div>

            {/* No results state */}
            {noResults ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                  <SearchX size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No articles found</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  No articles match your current filters. Try adjusting your search query or selecting a different category.
                </p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-6 text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <ArticleGrid articles={filteredArticles} />
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-10">
            
            {/* Popular Posts Widget */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                Popular Posts
              </h3>
              <div className="flex flex-col gap-5">
                {popularPosts.map((post, i) => (
                  <Link key={i} href={post.link} className="group flex gap-4 items-center">
                    <span className="text-3xl font-black text-slate-100 dark:text-slate-800 group-hover:text-blue-100 dark:group-hover:text-blue-900/50 transition-colors">0{i+1}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-[11px] text-slate-500 mt-1 block font-medium">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags Cloud Widget */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-6 flex items-center">
                <span className="w-2 h-6 bg-purple-600 rounded-full mr-3"></span>
                Tags Cloud
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-extrabold mb-2 relative z-10">Join the Newsletter</h3>
              <p className="text-blue-100 text-sm mb-6 relative z-10 leading-relaxed">
                Get the latest articles and insights delivered directly to your inbox every week.
              </p>
              <form className="relative z-10 flex flex-col gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm font-medium"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full py-2.5 bg-white text-blue-900 font-extrabold rounded-xl hover:bg-blue-50 transition-colors shadow-md text-sm cursor-pointer"
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
import Link from 'next/link';
import Image from 'next/image';

function ArticleGrid({ articles }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
      {articles.map((article, index) => (
        <article
          key={article.link || index}
          className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden transition-all duration-300 flex flex-col isolate"
        >
          <div className="relative aspect-16/10 overflow-hidden">
            <div className="absolute top-4 left-4 z-[1]">
              <span className="inline-block px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
                {article.category}
              </span>
            </div>
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10" />
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>

          <div className="p-6 flex flex-col grow">
            <h3 className="font-extrabold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug text-xl">
              <Link href={article.link} className="before:absolute before:inset-0 z-10">
                {article.title}
              </Link>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 text-sm leading-relaxed grow">
              {article.excerpt || article.description}
            </p>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5 relative z-20">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between relative z-20">
              <div className="flex items-center gap-3">
                <Image
                  src={article.authorImage || "/Profile photo.jpeg"}
                  alt={article.author}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full bg-slate-200 object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-slate-900 dark:text-white">
                    {article.author}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {article.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
