'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { safeJson } from '@/lib/utils';
import { AdminUser } from './UserTable';

interface EditUserModalProps {
  user: AdminUser | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditUserModal({
  user,
  onClose,
  onSuccess,
}: EditUserModalProps) {
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState('EDITOR');
  const [editError, setEditError] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditEmail(user.email || '');
      setEditRole(user.role || 'EDITOR');
      setEditPassword('');
      setEditError('');
    }
  }, [user]);

  if (!user) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setEditError('');

    try {
      const res = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: user.id,
          name: editName,
          email: editEmail,
          role: editRole,
          password: editPassword || undefined,
        }),
      });

      const json = await safeJson(res);
      if (!res.ok || !json.success) {
        setEditError(json.error?.message || 'Failed to update user account');
        setUpdating(false);
        return;
      }

      onSuccess();
      onClose();
    } catch {
      setEditError('Connection error');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="admin-card p-6 max-w-md w-full bg-white border-slate-200 shadow-2xl space-y-4">
        <h3 className="text-base font-extrabold text-slate-900">Edit Admin User</h3>

        {editError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs flex items-center gap-2 font-medium">
            <AlertCircle size={15} /> {editError}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="admin-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="admin-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Reset Password (Optional)
            </label>
            <input
              type="password"
              value={editPassword}
              onChange={(e) => setEditPassword(e.target.value)}
              placeholder="Leave blank to keep existing password"
              className="admin-input text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Role & Access Level</label>
            <select
              value={editRole}
              onChange={(e) => setEditRole(e.target.value)}
              className="admin-input text-xs cursor-pointer font-medium"
            >
              <option value="ADMIN">Super Admin (All modules & settings)</option>
              <option value="EDITOR">Editor (Blog posts, Media & SEO)</option>
              <option value="AUTHOR">Author (Own articles only)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={updating}
              className="admin-btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="admin-btn-primary text-xs"
            >
              {updating ? 'Saving...' : 'Update Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
