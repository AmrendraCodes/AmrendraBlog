'use client';

import React, { memo } from 'react';
import { SearchX, ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';

const ArticleGrid = memo(function ArticleGrid({ articles }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {articles.map((article) => (
        <BlogCard key={article.link} post={article} />
      ))}
    </div>
  );
});

export default function BlogGrid({
  paginatedArticles,
  totalPages,
  currentPage,
  setCurrentPage,
  noResults,
  handleClearFilters,
}) {
  if (noResults) {
    return (
      <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-[#F59E0B]/10 text-[#0B1F3A] dark:text-[#F59E0B] rounded-full flex items-center justify-center mb-4 border border-[#F59E0B]/20">
          <SearchX size={32} />
        </div>
        <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2">No articles found</h3>
        <p className="text-[var(--text-body)] max-w-md mx-auto">
          No articles match your current filters. Try adjusting your search query or selecting a different category.
        </p>
        <button
          type="button"
          onClick={handleClearFilters}
          className="mt-6 text-[#F59E0B] font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <>
      <ArticleGrid articles={paginatedArticles} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#F59E0B] hover:border-[#F59E0B]/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full text-sm font-bold transition-all cursor-pointer border ${
                currentPage === page
                  ? 'bg-[#F59E0B] text-[#0B1F3A] border-[#F59E0B] shadow-md shadow-amber-500/20'
                  : 'bg-[var(--card-bg)] border-[var(--card-border)] text-[var(--text-body)] hover:border-[#F59E0B]/40 hover:text-[#F59E0B]'
              }`}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center text-[var(--text-muted)] hover:text-[#F59E0B] hover:border-[#F59E0B]/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}
