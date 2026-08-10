'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus, Search, FolderTree, Trash2, AlertCircle } from 'lucide-react';
import { slugify } from '@/lib/utils';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Form state
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const json = await res.json();
      if (json.success) setCategories(json.data.categories);
    } catch (err) {
      console.error('Fetch categories error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(slugify(val));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, description }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error?.message || 'Failed to create category');
        setSubmitting(false);
        return;
      }

      setShowModal(false);
      setName('');
      setSlug('');
      setDescription('');
      fetchCategories();
    } catch {
      setError('Connection error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error('Delete category error:', err);
    }
  };

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Category Management" subtitle="Organize blog articles into categories">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="admin-input pl-10"
          />
        </div>

        <button onClick={() => setShowModal(true)} className="admin-btn-primary text-xs">
          <Plus size={16} /> Create Category
        </button>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-400 font-medium">Loading categories...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 font-medium">No categories found.</div>
        ) : (
          filtered.map((cat) => (
            <div key={cat.id} className="admin-card p-5 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <FolderTree size={16} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">{cat.name}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {cat._count?.posts || 0} posts
                  </span>
                </div>
                <div className="text-[11px] font-mono font-bold text-indigo-600 mt-2">/{cat.slug}</div>
                {cat.description && (
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{cat.description}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 text-xs flex items-center gap-1 transition"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="admin-card p-6 max-w-md w-full bg-white border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Create New Category</h3>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 font-medium">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Engineering"
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="engineering"
                  className="admin-input text-xs font-mono text-indigo-700 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Category description..."
                  className="admin-input text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="admin-btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="admin-btn-primary text-xs">
                  {submitting ? 'Saving...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
