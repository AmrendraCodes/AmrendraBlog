'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus, Search, Filter, Edit, Trash2, ExternalLink, RefreshCw } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function BlogListPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPosts = async () => {
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
  };

  useEffect(() => {
    fetchPosts();
  }, [search, status]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
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
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts by title..."
              className="admin-input pl-10"
            />
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="admin-input cursor-pointer pr-8 text-xs font-medium"
            >
              <option value="">All Statuses</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULED">Scheduled</option>
            </select>
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
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#111726] text-gray-400 font-mono uppercase text-[10px] border-b border-[#1f2a40]">
              <tr>
                <th className="py-3.5 px-4">Title</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#192234]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-emerald-400" />
                    Loading blog posts...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No blog posts match your criteria.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#1c263e]/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white max-w-sm truncate">{post.title}</div>
                      <div className="text-[10px] text-gray-500 font-mono truncate">/{post.slug}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#1f2a40] text-gray-300 text-[10px] font-mono">
                        {post.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-300">
                      {post.authorName || 'Amrendra Kumar'}
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
                    <td className="py-3.5 px-4 text-cyan-400 font-mono font-semibold">
                      {post.views || 0}
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
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-gray-400 hover:text-red-400"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="admin-card p-6 max-w-sm w-full bg-[#151c2e] border-[#1f2a40]">
            <h4 className="text-base font-bold text-white mb-2">Confirm Delete</h4>
            <p className="text-xs text-gray-400 mb-6">
              Are you sure you want to permanently remove this blog post from the database?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="admin-btn-secondary text-xs">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="admin-btn-danger text-xs">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
