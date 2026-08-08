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
  ExternalLink,
  CheckCircle2,
  Clock,
  FileEdit,
  TrendingUp,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
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
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-[#151c2e] to-[#0e1322] border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Welcome back, Amrendra 👋
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Code with Amrendra CMS is active. All system metrics and content workflows are online.
          </p>
        </div>
        <Link href="/content/blog/new" className="admin-btn-primary self-start md:self-auto">
          <Plus size={16} />
          <span>New Blog Post</span>
        </Link>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="admin-card p-4">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Total Posts</span>
            <FileText size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {loading ? '...' : stats?.totalBlogs || 0}
          </div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
            <TrendingUp size={10} /> Live Articles
          </div>
        </div>

        <div className="admin-card p-4">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Published</span>
            <CheckCircle2 size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {loading ? '...' : stats?.publishedBlogs || 0}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">Public on Site</div>
        </div>

        <div className="admin-card p-4">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Drafts</span>
            <FileEdit size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {loading ? '...' : stats?.draftBlogs || 0}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">Work in Progress</div>
        </div>

        <div className="admin-card p-4">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Categories</span>
            <FolderTree size={16} className="text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {loading ? '...' : stats?.totalCategories || 0}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">Taxonomy</div>
        </div>

        <div className="admin-card p-4">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Media Files</span>
            <ImageIcon size={16} className="text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">
            {loading ? '...' : stats?.totalMedia || 0}
          </div>
          <div className="text-[10px] text-gray-400 mt-1 font-mono">Assets & Images</div>
        </div>

        <div className="admin-card p-4">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Total Views</span>
            <Eye size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 mt-2">
            {loading ? '...' : stats?.totalPageViews || 0}
          </div>
          <div className="text-[10px] text-cyan-400 mt-1 font-mono">Tracked Analytics</div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Quick Actions</h3>
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
        <div className="p-4 sm:p-5 border-b border-[#1f2a40] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Blog Posts</h3>
            <p className="text-xs text-gray-400">Latest published and draft articles</p>
          </div>
          <Link href="/content/blog" className="text-xs text-emerald-400 hover:underline font-medium">
            View All Posts →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#111726] text-gray-400 font-mono uppercase text-[10px] border-b border-[#1f2a40]">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#192234]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Loading recent content...
                  </td>
                </tr>
              ) : recentPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No recent blog posts found.
                  </td>
                </tr>
              ) : (
                recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#1c263e]/50 transition">
                    <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="py-3.5 px-4 text-gray-300">
                      {post.authorName || 'Amrendra Kumar'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#1f2a40] text-gray-300 text-[10px] font-mono">
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
                    <td className="py-3.5 px-4 text-gray-400 font-mono">
                      {formatDate(post.updatedAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/content/blog/${post.id}/edit`}
                          className="p-1.5 rounded hover:bg-[#1f2a40] text-gray-300 hover:text-white"
                          title="Edit Post"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-400"
                          title="Delete Post"
                        >
                          <Trash2 size={14} />
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

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="admin-card p-6 max-w-sm w-full bg-[#151c2e] border-[#1f2a40]">
            <h4 className="text-base font-bold text-white mb-2">Delete Blog Post?</h4>
            <p className="text-xs text-gray-400 mb-6">
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
