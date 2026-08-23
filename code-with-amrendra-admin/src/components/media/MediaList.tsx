'use client';

import React from 'react';
import { Copy, Trash2, Check } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  createdAt: string;
}

interface MediaListProps {
  items: MediaItem[];
  copiedId: string | null;
  onCopyUrl: (url: string, id: string) => void;
  onDelete: (id: string) => void;
}

export default function MediaList({
  items,
  copiedId,
  onCopyUrl,
  onDelete,
}: MediaListProps) {
  return (
    <div className="admin-card overflow-hidden">
      <table className="w-full text-left text-xs text-slate-700">
        <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200/80">
          <tr>
            <th className="py-3.5 px-4">Preview</th>
            <th className="py-3.5 px-4">Filename</th>
            <th className="py-3.5 px-4">Dimensions</th>
            <th className="py-3.5 px-4">Size</th>
            <th className="py-3.5 px-4">Date</th>
            <th className="py-3.5 px-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-indigo-50/40 transition">
              <td className="py-2.5 px-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                  <img src={item.url} alt={item.fileName} className="w-full h-full object-cover" />
                </div>
              </td>
              <td className="py-2.5 px-4 font-bold text-slate-900">{item.fileName}</td>
              <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">
                {item.width && item.height ? `${item.width}x${item.height}px` : 'N/A'}
              </td>
              <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">
                {item.bytes ? `${Math.round(item.bytes / 1024)} KB` : 'N/A'}
              </td>
              <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">
                {formatDate(item.createdAt)}
              </td>
              <td className="py-2.5 px-5 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onCopyUrl(item.url, item.id)}
                    className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-600 transition cursor-pointer"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition cursor-pointer"
                    title="Delete Asset"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
