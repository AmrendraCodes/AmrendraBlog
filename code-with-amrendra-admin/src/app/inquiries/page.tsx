'use client';

import React, { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Search,
  CheckCircle,
  Trash2,
  MessageSquare,
  Building,
  Phone,
  Calendar,
} from 'lucide-react';
import { formatDate, safeJson } from '@/lib/utils';
import type { Contact } from '@prisma/client';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Contact[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Contact | null>(null);

  const fetchInquiries = useCallback(async () => {
    try {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (statusFilter) query.set('status', statusFilter);

      const res = await fetch(`/api/contacts?${query.toString()}`);
      const json = await safeJson<{ inquiries: Contact[]; unreadCount: number }>(res);
      if (json.success && json.data) {
        setInquiries(json.data.inquiries);
        setUnreadCount(json.data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Fetch inquiries error:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/contacts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await safeJson(res);
      if (res.ok && json.success) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
        fetchInquiries();
      }
    } catch (err) {
      console.error('Update inquiry status error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/contacts?id=${id}`, { method: 'DELETE' });
      const json = await safeJson(res);
      if (res.ok && json.success) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Delete inquiry error:', err);
    }
  };

  return (
    <DashboardLayout
      title="Client Inquiries"
      subtitle="Review incoming project requests, inquiries, and customer messages"
    >
      {/* Header filter row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, company, or text..."
              className="admin-input pl-10 text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-input py-2 text-xs font-semibold w-36 cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="UNREAD">Unread ({unreadCount})</option>
            <option value="READ">Read</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs">
            Total Messages: <span className="text-indigo-600 font-extrabold">{inquiries.length}</span>
          </span>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="admin-card overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-5">Sender</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Company / Phone</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Received Date</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    Loading messages...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                    No inquiries found.
                  </td>
                </tr>
              ) : (
                inquiries.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-indigo-50/40 transition cursor-pointer ${
                      item.status === 'UNREAD' ? 'bg-indigo-50/20 font-bold' : ''
                    }`}
                    onClick={() => {
                      setSelectedInquiry(item);
                      if (item.status === 'UNREAD') {
                        handleUpdateStatus(item.id, 'READ');
                      }
                    }}
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.status === 'UNREAD' ? 'bg-indigo-600' : 'bg-slate-300'
                          }`}
                        />
                        <div>
                          <div className="text-slate-900 font-extrabold">{item.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{item.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-800">
                      {item.subject || item.message.substring(0, 45) + '...'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {item.company || item.phone || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                          item.status === 'UNREAD'
                            ? 'bg-amber-50 text-amber-600 border border-amber-200'
                            : item.status === 'RESOLVED'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(
                              item.id,
                              item.status === 'RESOLVED' ? 'READ' : 'RESOLVED'
                            )
                          }
                          className={`p-1.5 rounded-lg transition ${
                            item.status === 'RESOLVED'
                              ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                              : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                          }`}
                          title={item.status === 'RESOLVED' ? 'Mark as Open' : 'Mark as Resolved'}
                        >
                          <CheckCircle size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
                          title="Delete"
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="admin-card p-6 max-w-lg w-full bg-white shadow-2xl border-slate-200 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">{selectedInquiry.name}</h3>
                <div className="text-xs text-indigo-600 font-mono mt-0.5">{selectedInquiry.email}</div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                  selectedInquiry.status === 'UNREAD'
                    ? 'bg-amber-50 text-amber-600'
                    : selectedInquiry.status === 'RESOLVED'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {selectedInquiry.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
              {selectedInquiry.company && (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Building size={14} className="text-indigo-600" />
                  <span>{selectedInquiry.company}</span>
                </div>
              )}
              {selectedInquiry.phone && (
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Phone size={14} className="text-indigo-600" />
                  <span>{selectedInquiry.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] col-span-2">
                <Calendar size={14} className="text-slate-400" />
                <span>Received: {formatDate(selectedInquiry.createdAt)}</span>
              </div>
            </div>

            {selectedInquiry.subject && (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">{selectedInquiry.subject}</div>
              </div>
            )}

            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Message Content</div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto font-sans">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(
                  selectedInquiry.subject || 'Your inquiry on Code with Amrendra'
                )}`}
                className="admin-btn-primary text-xs"
              >
                <MessageSquare size={14} /> Reply via Email
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateStatus(
                      selectedInquiry.id,
                      selectedInquiry.status === 'RESOLVED' ? 'READ' : 'RESOLVED'
                    )
                  }
                  className="admin-btn-secondary text-xs"
                >
                  {selectedInquiry.status === 'RESOLVED' ? 'Mark as Open' : 'Mark Resolved'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="admin-btn-secondary text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
