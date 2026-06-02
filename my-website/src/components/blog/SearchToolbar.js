'use client';

import { Search, X } from 'lucide-react';

/**
 * SearchToolbar — A reusable, controlled search input component.
 *
 * Props:
 *   - searchQuery (string): The current search query value
 *   - onSearchChange (function): Callback fired on input change
 *   - resultCount (number): Number of matching results to display
 *   - totalCount (number): Total number of articles available
 *   - placeholder (string): Input placeholder text
 */
export default function SearchToolbar({
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount,
  placeholder = 'Search articles by title, category, tags, author...',
}) {
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <div className="search-toolbar" id="blog-search-toolbar">
      <div className="search-toolbar__inner">
        {/* Search Icon */}
        <Search
          size={20}
          className="search-toolbar__icon"
          aria-hidden="true"
        />

        {/* Controlled Input */}
        <input
          id="blog-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="search-toolbar__input"
          autoComplete="off"
          aria-label="Search blog articles"
        />

        {/* Clear Button */}
        {hasQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="search-toolbar__clear"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Result Count Indicator */}
      {hasQuery && (
        <p className="search-toolbar__results" aria-live="polite">
          {resultCount === 0
            ? 'No articles found'
            : `Showing ${resultCount} of ${totalCount} article${totalCount !== 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  );
}
