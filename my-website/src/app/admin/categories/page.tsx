'use client';

import React, { useState, useEffect } from 'react';
import { FolderTree, Plus, Trash2, Tag as TagIcon } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, description }),
      });
      if (res.ok) {
        setName('');
        setSlug('');
        setDescription('');
        fetchCategories();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Categories Manager</h1>
        <p className="text-xs text-[#9CA3AF] mt-1">Organize articles into structured content pillars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Category Form */}
        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase text-[#10B981] flex items-center gap-2">
            <Plus size={16} /> Add New Category
          </h2>

          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white mb-2">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                }}
                required
                placeholder="e.g. Web Development"
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. web-development"
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief category description..."
                className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <button
              type="submit"
              disabled={adding}
              className="w-full py-2.5 px-4 bg-[#10B981] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#059669] transition-all disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add Category'}
            </button>
          </form>
        </div>

        {/* Categories List Table */}
        <div className="lg:col-span-2 rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1E2E25] bg-[#111C16]/50 text-xs font-mono font-bold uppercase text-[#9CA3AF]">
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4 text-center">Post Count</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2E25]">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-xs text-[#9CA3AF]">
                      Loading categories...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-xs text-[#9CA3AF]">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-[#111C16]/40 transition-colors">
                      <td className="py-4 px-6 font-bold text-sm text-white">{cat.name}</td>
                      <td className="py-4 px-4 font-mono text-xs text-[#9CA3AF]">/{cat.slug}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block text-xs font-mono font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-0.5 rounded-full">
                          {cat._count?.posts || 0}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(cat.id)}
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
