'use client';

import React from 'react';
import { FolderTree, Edit, Trash2 } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  _count?: {
    posts?: number;
  };
}

interface CategoryTableProps {
  categories: CategoryItem[];
  loading: boolean;
  onEdit: (category: CategoryItem) => void;
  onDelete: (id: string, name: string) => void;
}

export default function CategoryTable({
  categories,
  loading,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  return (
    <div className="admin-card overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-5">Category Name</th>
              <th className="py-3.5 px-4">URL Slug</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4">Posts Count</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                  Loading categories...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                  No categories created yet.
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id} className="hover:bg-indigo-50/40 transition">
                  <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center gap-2.5">
                    <FolderTree size={16} className="text-indigo-600" />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-indigo-600 font-bold">
                    /{c.slug}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                    {c.description || '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {c._count?.posts ?? 0}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(c)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                        title="Edit Category"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(c.id, c.name)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition cursor-pointer"
                        title="Delete Category"
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
  );
}
