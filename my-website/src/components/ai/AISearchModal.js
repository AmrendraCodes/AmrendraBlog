'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Sparkles, X, ArrowRight } from 'lucide-react';

export default function AISearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/ai/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (res.ok && data.results) {
        setResults(data.results);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-start justify-center pt-20 p-4">
      <div className="bg-[#0A0F0C] border border-[#1E2E25] rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 relative">
        <div className="flex items-center justify-between border-b border-[#1E2E25] pb-4">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Sparkles size={18} className="text-[#10B981]" /> AI Natural Language Search
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. 'Find React performance optimization blogs'..."
            className="w-full pl-11 pr-4 py-3.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#10B981]"
          />
        </form>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="py-8 text-center text-xs text-[#10B981] font-mono animate-pulse">
              Searching semantically across all articles...
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#9CA3AF]">
              Type a natural language query above to search.
            </div>
          ) : (
            results.map((post) => (
              <Link
                key={post.id}
                href={`/resources/blog/${post.slug}`}
                onClick={onClose}
                className="block p-4 rounded-2xl bg-[#111C16] border border-[#1E2E25] hover:border-[#10B981]/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#34D399] uppercase font-bold">{post.category || 'Engineering'}</span>
                  <ArrowRight size={14} className="text-[#9CA3AF] group-hover:text-[#10B981] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-white mt-1 leading-snug">{post.title}</h4>
                <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-1">{post.excerpt || post.description}</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
