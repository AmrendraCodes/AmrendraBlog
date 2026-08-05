'use client';

import React, { useState, useEffect } from 'react';
import { Users, Trash2, Download, Search } from 'lucide-react';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletter?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;
    try {
      await fetch(`/api/admin/newsletter?id=${id}`, { method: 'DELETE' });
      fetchSubscribers();
    } catch (err) {
      console.error(err);
    }
  };

  const exportCSV = () => {
    const headers = ['Email', 'Subscribed At'];
    const rows = subscribers.map((s) => [`"${s.email}"`, `"${s.subscribedAt}"`]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'newsletter_subscribers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Newsletter Subscribers</h1>
          <p className="text-xs text-[#9CA3AF] mt-1">Manage audience email list for campaigns and announcements.</p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111C16] border border-[#1E2E25] text-xs font-bold text-white hover:border-[#10B981] transition-all"
        >
          <Download size={16} /> Export Subscribers CSV
        </button>
      </div>

      <div className="rounded-2xl bg-[#0A0F0C] border border-[#1E2E25] p-4 flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#10B981]"
          />
        </div>
      </div>

      <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1E2E25] bg-[#111C16]/50 text-xs font-mono font-bold uppercase text-[#9CA3AF]">
                <th className="py-3.5 px-6">Subscriber Email</th>
                <th className="py-3.5 px-4">Subscribed Date</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2E25]">
              {loading ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-xs text-[#9CA3AF]">Loading subscribers...</td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-xs text-[#9CA3AF]">No subscribers found.</td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#111C16]/40 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-sm text-white">{sub.email}</td>
                    <td className="py-4 px-4 text-xs font-mono text-[#9CA3AF]">
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
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
