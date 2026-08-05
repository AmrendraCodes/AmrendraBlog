'use client';

import React, { useState, useEffect } from 'react';
import { Tags, Plus, Trash2 } from 'lucide-react';

export default function AdminTagsPage() {
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/tags');
      const data = await res.json();
      setTags(data.tags || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });
      if (res.ok) {
        setName('');
        setSlug('');
        fetchTags();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;
    try {
      const res = await fetch(`/api/admin/tags?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchTags();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Tags Manager</h1>
        <p className="text-xs text-[#9CA3AF] mt-1">Manage article keywords and search taxonomy.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Tag Form */}
        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-[#10B981] flex items-center gap-2">
            <Plus size={16} /> Add New Tag
          </h2>

          <form onSubmit={handleAddTag} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white mb-2">Tag Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }}
                required
                placeholder="e.g. Next.js 16"
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Tag Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. nextjs-16"
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <button
              type="submit"
              disabled={adding}
              className="w-full py-2.5 px-4 bg-[#10B981] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#059669] transition-all disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add Tag'}
            </button>
          </form>
        </div>

        {/* Tags Table */}
        <div className="lg:col-span-2 rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E2E25] bg-[#111C16]/50 text-xs font-mono font-bold uppercase text-[#9CA3AF]">
                  <th className="py-3.5 px-6">Tag Name</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4 text-center">Post Count</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2E25]">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-xs text-[#9CA3AF]">
                      Loading tags...
                    </td>
                  </tr>
                ) : tags.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-xs text-[#9CA3AF]">
                      No tags found.
                    </td>
                  </tr>
                ) : (
                  tags.map((tag) => (
                    <tr key={tag.id} className="hover:bg-[#111C16]/40 transition-colors">
                      <td className="py-4 px-6 font-bold text-sm text-white">#{tag.name}</td>
                      <td className="py-4 px-4 font-mono text-xs text-[#9CA3AF]">/{tag.slug}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block text-xs font-mono font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full">
                          {tag._count?.posts || 0}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(tag.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
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
    </div>
  );
}
