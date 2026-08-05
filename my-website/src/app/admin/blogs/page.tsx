'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        status,
        page: page.toString(),
        limit: '10',
      });
      const res = await fetch(`/api/admin/blogs?${query.toString()}`);
      const data = await res.json();
      setBlogs(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, status, page]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBlogs();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (err) {
      console.error('Delete blog error:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Blog Content Manager</h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Create, edit, publish, and manage all your technical articles and case studies.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
        >
          <Plus size={16} /> Create New Blog
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="rounded-2xl bg-[#0A0F0C] border border-[#1E2E25] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#10B981]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter size={14} className="text-[#9CA3AF]" />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-[#111C16] border border-[#1E2E25] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#10B981]"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>
      </div>

      {/* Blogs Data Table */}
      <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#1E2E25] bg-[#111C16]/50 text-xs font-mono font-bold uppercase tracking-wider text-[#9CA3AF]">
                <th className="py-3.5 px-6">Title &amp; Slug</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Reading Time</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E25]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-[#9CA3AF]">
                    Loading blog posts...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-[#9CA3AF]">
                    No blog posts found. Click &quot;Create New Blog&quot; to write your first article.
                  </td>
                </tr>
              ) : (
                blogs.map((post) => (
                  <tr key={post.id} className="hover:bg-[#111C16]/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-sm text-white line-clamp-1">{post.title}</div>
                      <div className="text-[11px] font-mono text-[#9CA3AF] mt-0.5">/{post.slug}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block text-[11px] font-mono font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full border border-[#10B981]/20">
                        {post.category ? post.category.name : post.categorySlug || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {post.status === 'PUBLISHED' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                          <CheckCircle2 size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                          <Clock size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-xs text-[#9CA3AF] font-mono">
                      {post.readingTime || '5 min read'}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        href={`/resources/blog/${post.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#111C16] transition-colors"
                        title="View Public Post"
                      >
                        <ExternalLink size={16} />
                      </Link>
                      <Link
                        href={`/admin/blogs/${post.id}/edit`}
                        className="inline-flex p-1.5 rounded-lg text-[#10B981] hover:bg-[#10B981]/10 transition-colors"
                        title="Edit Post"
                      >
                        <Edit3 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="inline-flex p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete Post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
