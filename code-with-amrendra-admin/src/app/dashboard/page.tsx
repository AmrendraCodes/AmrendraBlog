'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import StatusBadge from '@/components/ui/StatusBadge';
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
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
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
  const [isDeleting, setIsDeleting] = useState(false);

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
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setRecentPosts((prev) => prev.filter((p) => p.id !== id));
        setDeleteId(null);
      }
    } catch (err) {
      console.error('Delete post error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Overview of your publishing pipeline, digital assets, and website metrics."
    >
      {/* ─── 1. STRAPI-INSPIRED WELCOME BANNER ─── */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#4945ff] via-[#403cdb] to-[#25228c] text-white shadow-xl shadow-indigo-600/20 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-indigo-400/25 relative overflow-hidden">
        {/* Decorative background aura */}
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold tracking-wide mb-3 backdrop-blur-xs">
            <Sparkles size={13} className="text-amber-300" />
            <span>CWA Admin Panel Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            Welcome back, Amrendra 👋
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-2 font-normal leading-relaxed">
            Your content delivery network and APIs are fully operational. You have{' '}
            <strong className="text-white font-bold">{stats?.publishedBlogs ?? 0} published articles</strong>{' '}
            live on the public portal.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/content/blog/new"
            className="bg-white text-[#4945ff] hover:bg-indigo-50 font-bold px-5 py-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 text-xs sm:text-sm no-underline cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Article</span>
          </Link>
          <Link
            href="/analytics"
            className="bg-white/15 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl backdrop-blur-xs transition flex items-center gap-2 text-xs sm:text-sm no-underline cursor-pointer border border-white/20"
          >
            <TrendingUp size={15} />
            <span>View Analytics</span>
          </Link>
        </div>
      </div>

      {/* ─── 2. KPI STATISTICS GRID (REUSABLE STATCARD) ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard
          title="Total Posts"
          value={stats?.totalBlogs ?? 0}
          subtitle="Articles created"
          icon={FileText}
          loading={loading}
          iconColor="text-indigo-600 dark:text-indigo-400"
          iconBg="bg-indigo-50 dark:bg-indigo-950/50"
          trend={{ value: 'Live CMS', isPositive: true }}
        />

        <StatCard
          title="Published"
          value={stats?.publishedBlogs ?? 0}
          subtitle="Live on site"
          icon={CheckCircle2}
          loading={loading}
          iconColor="text-emerald-600 dark:text-emerald-400"
          iconBg="bg-emerald-50 dark:bg-emerald-950/50"
          trend={{ value: 'Public', isPositive: true }}
        />

        <StatCard
          title="Drafts"
          value={stats?.draftBlogs ?? 0}
          subtitle="In progress"
          icon={FileEdit}
          loading={loading}
          iconColor="text-amber-600 dark:text-amber-400"
          iconBg="bg-amber-50 dark:bg-amber-950/50"
          trend={{ value: 'Pending', isPositive: false }}
        />

        <StatCard
          title="Categories"
          value={stats?.totalCategories ?? 0}
          subtitle="Taxonomy terms"
          icon={FolderTree}
          loading={loading}
          iconColor="text-blue-600 dark:text-blue-400"
          iconBg="bg-blue-50 dark:bg-blue-950/50"
          trend={{ value: 'Active', isPositive: true }}
        />

        <StatCard
          title="Media Library"
          value={stats?.totalMedia ?? 0}
          subtitle="Digital assets"
          icon={ImageIcon}
          loading={loading}
          iconColor="text-purple-600 dark:text-purple-400"
          iconBg="bg-purple-50 dark:bg-purple-950/50"
          trend={{ value: 'Cloud', isPositive: true }}
        />

        <StatCard
          title="Page Views"
          value={stats?.totalPageViews ?? 0}
          subtitle="Tracked visits"
          icon={Eye}
          loading={loading}
          iconColor="text-cyan-600 dark:text-cyan-400"
          iconBg="bg-cyan-50 dark:bg-cyan-950/50"
          trend={{ value: 'All Time', isPositive: true }}
        />
      </div>

      {/* ─── 3. QUICK ACTIONS BAR ─── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-dim)] font-mono flex items-center gap-2">
            <span>Quick Workflows</span>
          </h3>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/content/blog/new" className="admin-btn-primary text-xs no-underline">
            <Plus size={14} />
            <span>New Blog Post</span>
          </Link>
          <Link href="/media" className="admin-btn-secondary text-xs no-underline">
            <ImageIcon size={14} />
            <span>Upload Media</span>
          </Link>
          <Link href="/content/categories" className="admin-btn-secondary text-xs no-underline">
            <FolderTree size={14} />
            <span>Add Category</span>
          </Link>
          <Link href="/content/pages" className="admin-btn-secondary text-xs no-underline">
            <Layers size={14} />
            <span>Manage Pages</span>
          </Link>
          <Link href="/seo" className="admin-btn-secondary text-xs no-underline">
            <Globe size={14} />
            <span>Audit SEO</span>
          </Link>
        </div>
      </div>

      {/* ─── 4. RECENT CONTENT TABLE (STRAPI-INSPIRED DESIGN) ─── */}
      <div className="admin-card overflow-hidden">
        {/* Table Top Toolbar */}
        <div className="p-5 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--bg-card)]">
          <div>
            <h3 className="text-base font-extrabold text-[var(--text-main)] tracking-tight">
              Recent Blog Posts
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">
              Latest drafted and published content across all categories
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/content/blog"
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold hover:underline flex items-center gap-1.5 no-underline"
            >
              <span>View All Posts</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[var(--text-secondary)]">
            <thead className="bg-[var(--bg-canvas)] text-[var(--text-muted)] font-extrabold uppercase text-[10px] tracking-wider border-b border-[var(--border-color)]">
              <tr>
                <th className="py-3.5 px-5">Title</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--bg-card)]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[var(--text-dim)] font-medium">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      <span>Loading recent articles...</span>
                    </div>
                  </td>
                </tr>
              ) : recentPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[var(--text-muted)] font-medium">
                    <div className="max-w-xs mx-auto flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                        <FileText size={22} />
                      </div>
                      <p className="text-sm font-bold text-[var(--text-main)]">No articles created yet</p>
                      <p className="text-xs text-[var(--text-dim)] mt-1 mb-4">
                        Get started by publishing your first blog post.
                      </p>
                      <Link href="/content/blog/new" className="admin-btn-primary text-xs no-underline">
                        <Plus size={14} />
                        <span>Create Post</span>
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                recentPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition duration-150 group"
                  >
                    {/* Title */}
                    <td className="py-3.5 px-5 font-bold text-[var(--text-main)] max-w-xs sm:max-w-sm">
                      <Link
                        href={`/content/blog/${post.id}/edit`}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition truncate block no-underline"
                        title={post.title}
                      >
                        {post.title}
                      </Link>
                    </td>

                    {/* Author with Avatar */}
                    <td className="py-3.5 px-4 text-[var(--text-secondary)] font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-[10px] font-bold flex items-center justify-center text-[var(--text-main)]">
                          {(post.authorName || 'Amrendra Kumar')[0]}
                        </div>
                        <span className="truncate">{post.authorName || 'Amrendra Kumar'}</span>
                      </div>
                    </td>

                    {/* Category Tag */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-canvas)] text-[var(--text-secondary)] text-[11px] font-bold font-mono border border-[var(--border-color)]">
                        {post.category?.name || 'General'}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={post.status} />
                    </td>

                    {/* Updated Date */}
                    <td className="py-3.5 px-4 text-[var(--text-dim)] font-mono text-[11px]">
                      {formatDate(post.updatedAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/content/blog/${post.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer"
                          title="Edit Post"
                          aria-label="Edit post"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-[var(--text-dim)] hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
                          title="Delete Post"
                          aria-label="Delete post"
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

      {/* ─── 5. ACCESSIBLE DELETE CONFIRMATION DIALOG ─── */}
      {deleteId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="admin-card p-6 max-w-sm w-full bg-[var(--bg-card)] shadow-2xl border-[var(--border-color)]">
            <h4 className="text-base font-extrabold text-[var(--text-main)] mb-2">
              Delete Blog Post?
            </h4>
            <p className="text-xs text-[var(--text-muted)] mb-6 font-medium leading-relaxed">
              Are you sure you want to permanently delete this post? This action cannot be undone and will remove it from the public website.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                disabled={isDeleting}
                onClick={() => setDeleteId(null)}
                className="admin-btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={() => handleDelete(deleteId)}
                className="admin-btn-danger text-xs flex items-center gap-1.5"
              >
                {isDeleting && (
                  <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
