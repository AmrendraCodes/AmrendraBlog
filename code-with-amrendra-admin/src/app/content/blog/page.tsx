'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatusBadge from '@/components/ui/StatusBadge';
import { Plus, Search, Edit, Trash2, RefreshCw, X, ChevronDown } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Blog, Category } from '@prisma/client';

export type BlogWithCategory = Blog & { category?: Category | null };

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogWithCategory[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (status) query.set('status', status);

      const res = await fetch(`/api/blogs?${query.toString()}`);
      const json = await res.json();
      if (json.success) {
        setPosts(json.data.posts);
      }
    } catch (err) {
      console.error('Fetch posts error:', err);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchPosts]);

  const handleDelete = async (targetId?: string | null) => {
    const idToDelete = targetId || deleteId;
    if (!idToDelete) return;
    try {
      const res = await fetch(`/api/blogs/${idToDelete}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setPosts((prev) => prev.filter((p) => p.id !== idToDelete));
        setDeleteId(null);
      }
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  return (
    <DashboardLayout
      title="Blog CMS"
      subtitle="Create, edit, publish, and schedule blog articles"
    >
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          {/* Flexbox Search Bar - No Icon Overlap */}
          <div className="relative flex-1 flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] px-3.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/15 transition shadow-2xs">
            <Search size={16} className="text-[var(--text-dim)] shrink-0 mr-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Search posts by title, excerpt..."
              className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm font-medium text-[var(--text-main)] placeholder:text-[var(--text-dim)] py-2.5"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-[var(--text-dim)] hover:text-[var(--text-main)] p-1 transition cursor-pointer"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Styled Status Dropdown */}
          <div className="relative">
            <select
              value={status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
              className="admin-input cursor-pointer pr-9 py-2.5 text-xs font-bold w-36 sm:w-40 appearance-none bg-[var(--bg-input)]"
            >
              <option value="">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-dim)] pointer-events-none" />
          </div>
        </div>

        <Link href="/content/blog/new" className="admin-btn-primary text-xs">
          <Plus size={16} />
          <span>Create Post</span>
        </Link>
      </div>

      {/* Blog Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--text-secondary)]">
            <thead className="bg-[var(--bg-canvas)] text-[var(--text-dim)] font-bold uppercase text-[10px] border-b border-[var(--border-color)]">
              <tr>
                <th className="py-3.5 px-5">Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-card)]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[var(--text-dim)] font-medium">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
                    Loading blog posts...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[var(--text-dim)] font-medium">
                    No blog posts match your criteria.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-[var(--bg-card-hover)] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-bold text-[var(--text-main)] max-w-sm truncate">{post.title}</div>
                      <div className="text-[10px] text-[var(--text-dim)] font-mono truncate mt-0.5">/{post.slug}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-[var(--text-secondary)] text-[10px] font-bold font-mono">
                        {post.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[var(--text-secondary)] font-medium">
                      {post.authorName || 'Amrendra Kumar'}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="py-3.5 px-4 text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                      {post.views || 0}
                    </td>
                    <td className="py-3.5 px-4 text-[var(--text-dim)] font-mono text-[11px]">
                      {formatDate(post.updatedAt)}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/content/blog/${post.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                          title="Edit Post"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-[var(--text-dim)] hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="admin-card p-6 max-w-sm w-full bg-[var(--bg-card)] shadow-2xl border border-[var(--border-color)]">
            <h4 className="text-base font-extrabold text-[var(--text-main)] mb-2">Confirm Delete</h4>
            <p className="text-xs text-[var(--text-muted)] mb-6 font-medium">
              Are you sure you want to permanently remove this blog post from the database?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="admin-btn-secondary text-xs cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="admin-btn-danger text-xs cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
