'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { SearchX } from 'lucide-react';
import SearchToolbar from './SearchToolbar';
import '@/styles/SearchToolbar.css';

// ─── All articles data ─────────────────────────────────────
// In a real app, this can come from props or an API.
// We keep it here so the client component owns its data.
const ALL_ARTICLES = [
  {
    title: 'The Anatomy of a High-Converting Landing Page',
    excerpt:
      'Discover the psychological triggers and design patterns that turn casual visitors into paying customers.',
    category: 'Marketing',
    tags: ['landing page', 'conversion', 'copywriting'],
    author: 'Sarah Jenkins',
    authorImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=facearea&facepad=2',
    date: 'May 10, 2026',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    link: '/blog/high-converting-landing-page',
  },
  {
    title: 'Mastering Tailwind CSS in 2026',
    excerpt:
      'A comprehensive guide to using the latest utility classes and features to build responsive, modern interfaces faster.',
    category: 'Development',
    tags: ['tailwind', 'css', 'frontend'],
    author: 'Amrendra Kumar',
    authorImage:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=facearea&facepad=2',
    date: 'May 8, 2026',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    link: '/blog/mastering-tailwind-css',
  },
  {
    title: 'Why Minimalist UI is Back and Here to Stay',
    excerpt:
      'How stripping away the noise can lead to better user engagement, faster load times, and a premium brand feel.',
    category: 'Design',
    tags: ['minimalism', 'ui', 'ux', 'trends'],
    author: 'Elena Rodriguez',
    authorImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=facearea&facepad=2',
    date: 'May 5, 2026',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    link: '/blog/minimalist-ui',
  },
  {
    title: 'Building Scalable Next.js Applications',
    excerpt:
      'Architectural patterns and best practices for creating Next.js apps that perform under heavy traffic.',
    category: 'Development',
    tags: ['nextjs', 'react', 'architecture', 'scaling'],
    author: 'David Chen',
    authorImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=facearea&facepad=2',
    date: 'May 2, 2026',
    image:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    link: '/blog/scalable-nextjs',
  },
  {
    title: 'Typography Rules Every Designer Should Know',
    excerpt:
      'Stop guessing your font sizes. Learn the mathematical ratios and pairing techniques for perfect typography.',
    category: 'Design',
    tags: ['typography', 'fonts', 'design-system'],
    author: 'Sarah Jenkins',
    authorImage:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=facearea&facepad=2',
    date: 'April 28, 2026',
    image:
      'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?q=80&w=800&auto=format&fit=crop',
    link: '/blog/typography-rules',
  },
  {
    title: 'The Ultimate Guide to SEO in the AI Era',
    excerpt:
      'How search engines are changing and what you need to do today to keep your content ranking high.',
    category: 'Marketing',
    tags: ['seo', 'ai', 'content-strategy', 'google'],
    author: 'Michael Torres',
    authorImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=facearea&facepad=2',
    date: 'April 24, 2026',
    image:
      'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop',
    link: '/blog/seo-ai-era',
  },
];

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

// ─── Filter logic (pure function) ──────────────────────────
// Searches across title, excerpt, category, tags, and author.
function filterArticles(articles, query) {
  if (!query.trim()) return articles;

  const lowerQuery = query.toLowerCase().trim();

  return articles.filter((article) => {
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

// ─── BlogPageClient Component ──────────────────────────────
// Renders the search toolbar + filtered article grid.
// Can accept articles from props (SSR/API) or use defaults.
export default function BlogPageClient({ articles: propArticles }) {
  // Support both prop-based and static data
  const articles = propArticles || ALL_ARTICLES;

  // Controlled search state
  const [searchQuery, setSearchQuery] = useState('');

  // Debounced query — prevents filtering on every keystroke
  const debouncedQuery = useDebounce(searchQuery, 250);

  // Memoized filtering — only recalculates when articles or query change
  const filteredArticles = useMemo(
    () => filterArticles(articles, debouncedQuery),
    [articles, debouncedQuery]
  );

  const hasQuery = debouncedQuery.trim().length > 0;
  const noResults = hasQuery && filteredArticles.length === 0;

  return (
    <>
      {/* Search Toolbar */}
      <div className="py-6 px-6 lg:px-16 bg-slate-50 dark:bg-slate-950">
        <SearchToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredArticles.length}
          totalCount={articles.length}
        />
      </div>

      {/* Article Grid */}
      <section className="py-12 md:py-16 px-6 lg:px-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
              {hasQuery ? 'Search Results' : 'Latest Articles'}
            </h2>
            {!hasQuery && (
              <p className="text-lg text-slate-500 dark:text-slate-400">
                Dive into our newest thoughts, tutorials, and insights.
              </p>
            )}
          </div>

          {/* No results state */}
          {noResults ? (
            <div className="search-empty-state">
              <div className="search-empty-state__icon">
                <SearchX size={28} />
              </div>
              <h3 className="search-empty-state__title">No articles found</h3>
              <p className="search-empty-state__desc">
                No articles match &ldquo;{debouncedQuery}&rdquo;. Try a
                different keyword or{' '}
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  clear the search
                </button>
                .
              </p>
            </div>
          ) : (
            <ArticleGrid articles={filteredArticles} />
          )}
        </div>
      </section>
    </>
  );
}

// ─── ArticleGrid — renders the blog cards ──────────────────
// Separated for cleanliness and reusability.
import Link from 'next/link';
import Image from 'next/image';

function ArticleGrid({ articles }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <article
          key={article.link || index}
          className={`group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden transition-all duration-500 flex flex-col ${
            index === 0 && articles.length > 2
              ? 'sm:col-span-2 lg:col-span-2 sm:flex-row'
              : ''
          }`}
        >
          {/* Card Image */}
          <div
            className={`relative overflow-hidden ${
              index === 0 && articles.length > 2
                ? 'sm:w-1/2 aspect-4/3 sm:aspect-auto'
                : 'aspect-16/10'
            }`}
          >
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold rounded-full shadow-sm">
                {article.category}
              </span>
            </div>
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10" />
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes={
                index === 0 && articles.length > 2
                  ? '(max-width: 768px) 100vw, 50vw'
                  : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
              }
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Card Content */}
          <div
            className={`p-6 md:p-8 flex flex-col grow ${
              index === 0 && articles.length > 2
                ? 'sm:w-1/2 justify-center'
                : ''
            }`}
          >
            <h3
              className={`font-extrabold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug ${
                index === 0 && articles.length > 2
                  ? 'text-2xl sm:text-3xl lg:text-4xl'
                  : 'text-xl'
              }`}
            >
              {article.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 text-sm leading-relaxed grow">
              {article.excerpt || article.description}
            </p>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={article.authorImage}
                  alt={article.author}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full bg-slate-200 object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {article.author}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {article.date}
                  </span>
                </div>
              </div>

              <Link
                href={article.link}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                aria-label={`Read ${article.title}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
