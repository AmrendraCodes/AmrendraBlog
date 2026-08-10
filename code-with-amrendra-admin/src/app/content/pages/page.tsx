'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileCode, Edit } from 'lucide-react';

export default function PagesManagementPage() {
  const [pages] = useState([
    { id: 'p-1', title: 'Homepage Sections', slug: '/', status: 'PUBLISHED', type: 'System', updatedAt: '2026-08-01' },
    { id: 'p-2', title: 'About Amrendra', slug: '/about', status: 'PUBLISHED', type: 'Content', updatedAt: '2026-08-03' },
    { id: 'p-3', title: 'Engineering Services', slug: '/services', status: 'PUBLISHED', type: 'Services', updatedAt: '2026-08-05' },
    { id: 'p-4', title: 'Contact & Hire Me', slug: '/contact', status: 'PUBLISHED', type: 'Form', updatedAt: '2026-08-07' },
    { id: 'p-5', title: 'Privacy Policy', slug: '/privacy', status: 'PUBLISHED', type: 'Legal', updatedAt: '2026-07-15' },
    { id: 'p-6', title: 'Terms of Service', slug: '/terms', status: 'PUBLISHED', type: 'Legal', updatedAt: '2026-07-15' },
  ]);

  return (
    <DashboardLayout title="Page Management" subtitle="Configure core pages and website layout sections">
      <div className="admin-card overflow-hidden bg-white">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900">Public Website Pages</h3>
          <span className="text-xs text-slate-500 font-medium">Total: {pages.length} Pages</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-5">Page Title</th>
                <th className="py-3.5 px-4">URL Route</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-indigo-50/40 transition">
                  <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center gap-2.5">
                    <FileCode size={16} className="text-indigo-600" />
                    <span>{p.title}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-indigo-600 font-bold">{p.slug}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{p.type}</td>
                  <td className="py-3.5 px-4">
                    <span className="badge-published">Live</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{p.updatedAt}</td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => alert(`Configuring metadata for page: ${p.title}`)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition"
                      title="Edit Page"
                    >
                      <Edit size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
