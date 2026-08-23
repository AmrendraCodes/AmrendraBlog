'use client';

import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { safeJson } from '@/lib/utils';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateUserModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('EDITOR');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

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

      const json = await safeJson(res);
      if (!res.ok || !json.success) {
        setError(json.error?.message || 'Failed to create user');
        setSubmitting(false);
        return;
      }

      setName('');
      setEmail('');
      setPassword('');
      setRole('EDITOR');
      setError('');
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
              placeholder="admin@domain.com"
              className="admin-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Initial Password *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="admin-input text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Role & Access Level</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
              {submitting ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
