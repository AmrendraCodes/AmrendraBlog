'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  FileText,
  FolderTree,
  ImageIcon,
  Eye,
  Plus,
  Globe,
  Edit,
  Trash2,
  CheckCircle2,
  FileEdit,
  TrendingUp,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Blog, Category } from '@prisma/client';

export interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalCategories: number;
  totalMedia: number;
  totalVisitors: number;
  totalPageViews: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentPosts, setRecentPosts] = useState<(Blog & { category?: Category | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/analytics');
        const json = await res.json();
        if (json.success) {
          setStats(json.data.stats);
          setRecentPosts(json.data.recentPosts || []);
        }
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRecentPosts((prev) => prev.filter((p) => p.id !== id));
        setDeleteId(null);
      }
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage your content, SEO and website from one place."
    >
      {/* Welcome Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-750 to-indigo-900 text-white shadow-xl shadow-indigo-600/15 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-indigo-500/30">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, Amrendra 👋
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-1.5 font-medium max-w-xl">
            Code with Amrendra CMS is active. All system metrics and content publishing workflows are online.
          </p>
        </div>
        <Link href="/content/blog/new" className="bg-white text-indigo-700 hover:bg-slate-50 font-bold px-5 py-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5 self-start md:self-auto flex items-center gap-2 text-xs sm:text-sm">
          <Plus size={16} />
          <span>New Blog Post</span>
        </Link>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="admin-card p-4 sm:p-5">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Total Posts</span>
            <FileText size={16} className="text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {loading ? '...' : stats?.totalBlogs || 0}
          </div>
          <div className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp size={10} /> Live Articles
          </div>
        </div>

        <div className="admin-card p-4 sm:p-5">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Published</span>
            <CheckCircle2 size={16} className="text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-2">
            {loading ? '...' : stats?.publishedBlogs || 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-medium">Public on Site</div>
        </div>

        <div className="admin-card p-4 sm:p-5">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Drafts</span>
            <FileEdit size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 mt-2">
            {loading ? '...' : stats?.draftBlogs || 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-medium">Work in Progress</div>
        </div>

        <div className="admin-card p-4 sm:p-5">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Categories</span>
            <FolderTree size={16} className="text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {loading ? '...' : stats?.totalCategories || 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-medium">Taxonomy</div>
        </div>

        <div className="admin-card p-4 sm:p-5">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Media Files</span>
            <ImageIcon size={16} className="text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {loading ? '...' : stats?.totalMedia || 0}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-medium">Assets & Images</div>
        </div>

        <div className="admin-card p-4 sm:p-5">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Total Views</span>
            <Eye size={16} className="text-cyan-600" />
          </div>
          <div className="text-2xl font-black text-cyan-600 mt-2">
            {loading ? '...' : stats?.totalPageViews || 0}
          </div>
          <div className="text-[10px] text-cyan-700 mt-1 font-semibold">Tracked Analytics</div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="mb-8">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/content/blog/new" className="admin-btn-primary text-xs">
            <Plus size={14} /> Create Blog Post
          </Link>
          <Link href="/media" className="admin-btn-secondary text-xs">
            <ImageIcon size={14} /> Upload Media
          </Link>
          <Link href="/content/categories" className="admin-btn-secondary text-xs">
            <FolderTree size={14} /> Create Category
          </Link>
          <Link href="/content/pages" className="admin-btn-secondary text-xs">
            <FileText size={14} /> Create Page
          </Link>
          <Link href="/seo" className="admin-btn-secondary text-xs">
            <Globe size={14} /> Manage SEO
          </Link>
        </div>
      </div>

      {/* Recent Content Table */}
      <div className="admin-card overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Recent Blog Posts</h3>
            <p className="text-xs text-slate-500 font-medium">Latest published and draft articles</p>
          </div>
          <Link href="/content/blog" className="text-xs text-indigo-600 hover:text-indigo-800 font-bold hover:underline">
            View All Posts →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-5">Title</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Updated</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    Loading recent content...
                  </td>
                </tr>
              ) : recentPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    No recent blog posts found.
                  </td>
                </tr>
              ) : (
                recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-indigo-50/40 transition">
                    <td className="py-3.5 px-5 font-bold text-slate-900 max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {post.authorName || 'Amrendra Kumar'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold font-mono">
                        {post.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {post.status === 'PUBLISHED' ? (
                        <span className="badge-published">Published</span>
                      ) : post.status === 'SCHEDULED' ? (
                        <span className="badge-scheduled">Scheduled</span>
                      ) : (
                        <span className="badge-draft">Draft</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {formatDate(post.updatedAt)}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/content/blog/${post.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition"
                          title="Edit Post"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="admin-card p-6 max-w-sm w-full bg-white shadow-2xl border-slate-200">
            <h4 className="text-base font-extrabold text-slate-900 mb-2">Delete Blog Post?</h4>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="admin-btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="admin-btn-danger text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
