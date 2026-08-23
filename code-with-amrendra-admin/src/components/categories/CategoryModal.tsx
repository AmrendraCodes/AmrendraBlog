'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { slugify, safeJson } from '@/lib/utils';
import { CategoryItem } from './CategoryTable';

interface CategoryModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  category?: CategoryItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CategoryModal({
  isOpen,
  mode,
  category,
  onClose,
  onSuccess,
}: CategoryModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(mode === 'create');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && category) {
      setName(category.name || '');
      setSlug(category.slug || '');
      setDescription(category.description || '');
      setAutoSlug(false);
      setError('');
    } else if (mode === 'create') {
      setName('');
      setSlug('');
      setDescription('');
      setAutoSlug(true);
      setError('');
    }
  }, [mode, category, isOpen]);

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) setSlug(slugify(val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const endpoint = '/api/categories';
      const method = mode === 'create' ? 'POST' : 'PUT';
      const body =
        mode === 'create'
          ? JSON.stringify({ name, slug, description })
          : JSON.stringify({ id: category?.id, name, slug, description });

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      const json = await safeJson(res);
      if (!res.ok || !json.success) {
        setError(
          json.error?.message ||
            `Failed to ${mode === 'create' ? 'create' : 'update'} category`
        );
        setSubmitting(false);
        return;
      }

      onSuccess();
      onClose();
    } catch {
      setError('Connection error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="admin-card p-6 max-w-md w-full bg-white border-slate-200 shadow-2xl space-y-4">
        <h3 className="text-base font-extrabold text-slate-900">
          {mode === 'create' ? 'Create Category' : 'Edit Category'}
        </h3>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 font-medium">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Next.js Architecture"
              className="admin-input text-xs font-bold"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-600">Slug *</label>
              {mode === 'create' && (
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSlug}
                    onChange={(e) => setAutoSlug(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Auto-generate</span>
                </label>
              )}
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="nextjs-architecture"
              className="admin-input text-xs font-mono text-indigo-700 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description for SEO and category cards..."
              className="admin-input text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="admin-btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="admin-btn-primary text-xs"
            >
              {submitting
                ? mode === 'create'
                  ? 'Creating...'
                  : 'Updating...'
                : mode === 'create'
                ? 'Create Category'
                : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
