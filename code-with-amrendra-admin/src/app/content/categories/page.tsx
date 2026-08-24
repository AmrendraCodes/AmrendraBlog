'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus } from 'lucide-react';
import { safeJson } from '@/lib/utils';
import CategoryTable, { CategoryItem } from '@/components/categories/CategoryTable';
import CategoryModal from '@/components/categories/CategoryModal';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    category?: CategoryItem | null;
  }>({
    isOpen: false,
    mode: 'create',
    category: null,
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const json = await safeJson<{ categories: CategoryItem[] }>(res);
      if (json.success && json.data?.categories) setCategories(json.data.categories);
    } catch (err) {
      console.error('Fetch categories error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return;

    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      const json = await safeJson(res);
      if (res.ok && json.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(json.error?.message || 'Failed to delete category');
      }
    } catch (err) {
      console.error('Delete category error:', err);
    }
  };

  return (
    <DashboardLayout
      title="Categories"
      subtitle="Manage article taxonomy and topic classifications"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900">All Categories</h2>
          <p className="text-xs text-slate-500 font-medium">
            Categories structure the public website's resource hubs
          </p>
        </div>

        <button
          onClick={() =>
            setModalState({ isOpen: true, mode: 'create', category: null })
          }
          className="admin-btn-primary text-xs"
        >
          <Plus size={16} /> Create Category
        </button>
      </div>

      <CategoryTable
        categories={categories}
        loading={loading}
        onEdit={(cat) =>
          setModalState({ isOpen: true, mode: 'edit', category: cat })
        }
        onDelete={handleDelete}
      />

      <CategoryModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        category={modalState.category}
        onClose={() =>
          setModalState({ isOpen: false, mode: 'create', category: null })
        }
        onSuccess={fetchCategories}
      />
    </DashboardLayout>
  );
}
