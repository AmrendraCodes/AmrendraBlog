'use client';

import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Clock, Trash2, Search, Download } from 'lucide-react';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/contacts?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setContacts(data.contacts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [search]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Phone', 'Subject', 'Message', 'Date'];
    const rows = contacts.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.company || ''}"`,
      `"${c.phone || ''}"`,
      `"${c.subject || ''}"`,
      `"${c.message.replace(/"/g, '""')}"`,
      `"${c.createdAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'contact_submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Contact Submissions</h1>
          <p className="text-xs text-[#9CA3AF] mt-1">Review and manage client inquiry forms from the website.</p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111C16] border border-[#1E2E25] text-xs font-bold text-white hover:border-[#10B981] transition-all"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="rounded-2xl bg-[#0A0F0C] border border-[#1E2E25] p-4 flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#10B981]"
          />
        </div>
      </div>

      <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#1E2E25] bg-[#111C16]/50 text-xs font-mono font-bold uppercase text-[#9CA3AF]">
                <th className="py-3.5 px-6">Sender Details</th>
                <th className="py-3.5 px-4">Subject &amp; Message</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E25]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-[#9CA3AF]">Loading submissions...</td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-[#9CA3AF]">No submissions found.</td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-[#111C16]/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-sm text-white">{c.name}</div>
                      <div className="text-xs text-[#10B981] font-mono">{c.email}</div>
                      {c.company && <div className="text-[11px] text-[#9CA3AF]">{c.company}</div>}
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <div className="font-bold text-xs text-white">{c.subject || 'General Inquiry'}</div>
                      <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-0.5">{c.message}</p>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleStatusChange(c.id, c.status === 'READ' ? 'UNREAD' : 'READ')}
                        className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${
                          c.status === 'READ'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {c.status}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-[#9CA3AF]">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
