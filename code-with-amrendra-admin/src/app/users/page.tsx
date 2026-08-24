'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus } from 'lucide-react';
import { safeJson } from '@/lib/utils';
import UserTable, { AdminUser } from '@/components/users/UserTable';
import CreateUserModal from '@/components/users/CreateUserModal';
import EditUserModal from '@/components/users/EditUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      const json = await safeJson<{ users: AdminUser[] }>(res);
      if (json.success && json.data?.users) setUsers(json.data.users);
    } catch (err) {
      console.error('Fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to permanently delete account ${userEmail}?`)) return;

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      const json = await safeJson(res);
      if (res.ok && json.success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert(json.error?.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Delete user error:', err);
    }
  };

  return (
    <DashboardLayout
      title="Users & Roles"
      subtitle="Manage admin accounts and role-based permissions"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900">Admin Accounts</h2>
          <p className="text-xs text-slate-500 font-medium">
            Roles: Super Admin (Full access), Editor (Content + Media + SEO), Author (Own posts)
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="admin-btn-primary text-xs"
        >
          <Plus size={16} /> Add Admin User
        </button>
      </div>

      <UserTable
        users={users}
        loading={loading}
        onEdit={(u) => setEditingUser(u)}
        onDelete={handleDelete}
      />

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={fetchUsers}
      />

      {/* Edit User Modal */}
      <EditUserModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={fetchUsers}
      />
    </DashboardLayout>
  );
}
