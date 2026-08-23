'use client';

import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'AUTHOR' | string;
  createdAt?: string;
}

interface UserTableProps {
  users: AdminUser[];
  loading: boolean;
  onEdit: (user: AdminUser) => void;
  onDelete: (id: string, email: string) => void;
}

export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
}: UserTableProps) {
  return (
    <div className="admin-card overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-5">User</th>
              <th className="py-3.5 px-4">Email Address</th>
              <th className="py-3.5 px-4">Assigned Role</th>
              <th className="py-3.5 px-4">Permissions</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                  Loading accounts...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                  No accounts found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-indigo-50/40 transition">
                  <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                      {u.name?.[0] || 'A'}
                    </div>
                    <span>{u.name || 'Admin User'}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        u.role === 'ADMIN'
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                          : u.role === 'EDITOR'
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'bg-purple-50 text-purple-600 border border-purple-100'
                      }`}
                    >
                      {u.role === 'ADMIN' ? 'Super Admin' : u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {u.role === 'ADMIN'
                      ? 'Full system access & user management'
                      : u.role === 'EDITOR'
                      ? 'Manage blog posts, media library, and SEO settings'
                      : 'Create and edit own blog articles'}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(u)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                        title="Edit User"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(u.id, u.email)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition cursor-pointer"
                        title="Delete User"
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
