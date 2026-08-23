'use client';

import React from 'react';
import { Copy, Trash2, Check } from 'lucide-react';

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

interface MediaGridProps {
  items: MediaItem[];
  copiedId: string | null;
  onCopyUrl: (url: string, id: string) => void;
  onDelete: (id: string) => void;
}

export default function MediaGrid({
  items,
  copiedId,
  onCopyUrl,
  onDelete,
}: MediaGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="admin-card overflow-hidden group flex flex-col justify-between bg-white"
        >
          <div className="aspect-square bg-slate-100 relative overflow-hidden flex items-center justify-center">
            <img
              src={item.url}
              alt={item.fileName}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 backdrop-blur-xs">
              <button
                onClick={() => onCopyUrl(item.url, item.id)}
                className="p-2 rounded-lg bg-indigo-600 text-white font-bold hover:scale-105 transition shadow-sm cursor-pointer"
                title="Copy Image URL"
              >
                {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 rounded-lg bg-red-600 text-white font-bold hover:scale-105 transition shadow-sm cursor-pointer"
                title="Delete Asset"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <div className="text-xs font-bold text-slate-900 truncate" title={item.fileName}>
              {item.fileName}
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>{item.format?.toUpperCase() || 'JPG'}</span>
              <span>{item.width && item.height ? `${item.width}x${item.height}` : ''}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
