'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FileCode, Edit, ExternalLink, Globe, CheckCircle } from 'lucide-react';

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
      <div className="admin-card overflow-hidden">
        <div className="p-4 border-b border-[#1f2a40] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Public Website Pages</h3>
          <span className="text-xs text-gray-400">Total: {pages.length} Pages</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#111726] text-gray-400 font-mono uppercase text-[10px] border-b border-[#1f2a40]">
              <tr>
                <th className="py-3.5 px-4">Page Title</th>
                <th className="py-3.5 px-4">URL Route</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Updated</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#192234]">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-[#1c263e]/50 transition">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2.5">
                    <FileCode size={16} className="text-emerald-400" />
                    <span>{p.title}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">{p.slug}</td>
                  <td className="py-3.5 px-4 text-gray-400">{p.type}</td>
                  <td className="py-3.5 px-4">
                    <span className="badge-published">Live</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono">{p.updatedAt}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Configuring metadata for page: ${p.title}`)}
                      className="p-1.5 rounded hover:bg-[#1f2a40] text-gray-300 hover:text-white"
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
