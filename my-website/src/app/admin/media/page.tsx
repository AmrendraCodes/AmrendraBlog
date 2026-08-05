'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Copy, Check, Trash2 } from 'lucide-react';

export default function AdminMediaPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sampleMedia = [
    { id: '1', name: 'hero_preview.webp', url: '/og-image.png' },
    { id: '2', name: 'react_framework.png', url: '/icon.svg' },
  ];

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Media Library</h1>
        <p className="text-xs text-[#9CA3AF] mt-1">Upload, optimize, and manage Cloudinary images and assets.</p>
      </div>

      {/* Upload Box */}
      <div className="rounded-3xl bg-[#0A0F0C] border-2 border-dashed border-[#1E2E25] hover:border-[#10B981]/50 p-8 text-center transition-colors">
        <div className="w-12 h-12 rounded-2xl bg-[#111C16] text-[#10B981] border border-[#10B981]/30 flex items-center justify-center mx-auto mb-3">
          <Upload size={24} />
        </div>
        <h3 className="text-sm font-bold text-white mb-1">Attach Image Asset URL</h3>
        <p className="text-xs text-[#9CA3AF] mb-4">Paste Cloudinary or external asset URL below to store in media catalog.</p>

        <div className="flex items-center gap-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder="https://res.cloudinary.com/..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 px-3.5 py-2 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
          />
          <button
            onClick={() => {
              if (imageUrl) {
                alert('Media URL recorded successfully!');
                setImageUrl('');
              }
            }}
            className="px-4 py-2 bg-[#10B981] text-white font-bold text-xs rounded-xl hover:bg-[#059669]"
          >
            Save Asset
          </button>
        </div>
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sampleMedia.map((media) => (
          <div key={media.id} className="rounded-2xl bg-[#0A0F0C] border border-[#1E2E25] p-3 space-y-2 group relative">
            <div className="h-32 rounded-xl overflow-hidden bg-[#111C16] flex items-center justify-center border border-[#1E2E25]">
              <img src={media.url} alt={media.name} className="h-full object-contain p-2" />
            </div>
            <div className="text-[11px] font-mono text-[#9CA3AF] truncate">{media.name}</div>
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => handleCopy(media.url, media.id)}
                className="flex items-center gap-1 text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2 py-1 rounded-lg border border-[#10B981]/20"
              >
                {copiedId === media.id ? <Check size={12} /> : <Copy size={12} />}
                <span>{copiedId === media.id ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
