'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus, AlertCircle } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EDITOR');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const json = await res.json();
      if (json.success) setUsers(json.data.users);
    } catch (err) {
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.error?.message || 'Failed to create user');
        setSubmitting(false);
        return;
      }

      setShowModal(false);
      setName('');
      setEmail('');
      setPassword('');
      fetchUsers();
    } catch {
      setError('Connection error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Users & Roles" subtitle="Manage admin accounts and role-based permissions">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900">Admin Accounts</h2>
          <p className="text-xs text-slate-500 font-medium">Roles: Super Admin (Full access), Editor (Content + Media + SEO), Author (Own posts)</p>
        </div>

        <button onClick={() => setShowModal(true)} className="admin-btn-primary text-xs">
          <Plus size={16} /> Add Admin User
        </button>
      </div>

      <div className="admin-card overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-5">User</th>
              <th className="py-3.5 px-4">Email Address</th>
              <th className="py-3.5 px-4">Assigned Role</th>
              <th className="py-3.5 px-5">Permissions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-400 font-medium">Loading accounts...</td>
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
                  <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">{u.email}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                      u.role === 'ADMIN'
                        ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                        : u.role === 'EDITOR'
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}>
                      {u.role === 'ADMIN' ? 'Super Admin' : u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 font-medium">
                    {u.role === 'ADMIN'
                      ? 'Full system access & user management'
                      : u.role === 'EDITOR'
                      ? 'Manage blog posts, media library, and SEO settings'
                      : 'Create and edit own blog articles'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="admin-card p-6 max-w-md w-full bg-white border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">Create Admin Account</h3>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 font-medium">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amrendra Kumar"
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@codewithamrendra.com"
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Password *</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Role & Permissions</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="admin-input text-xs cursor-pointer font-medium"
                >
                  <option value="ADMIN">Super Admin (Full Access)</option>
                  <option value="EDITOR">Editor (Content + Media + SEO)</option>
                  <option value="AUTHOR">Author (Own Content Only)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="admin-btn-primary text-xs">
                  {submitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
