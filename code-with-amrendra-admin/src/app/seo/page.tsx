'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Save, Search, Share2, Check } from 'lucide-react';

export default function SeoManagementPage() {
  const [defaultTitle, setDefaultTitle] = useState('Code with Amrendra | Software Engineering & Tech Blog');
  const [defaultDescription, setDefaultDescription] = useState(
    'Deep dives into software architecture, Next.js scaling, system design, and developer workflows by Amrendra Kumar.'
  );
  const [defaultOgImage, setDefaultOgImage] = useState('https://codewithamrendra.in/images/og-default.png');
  const [robots, setRobots] = useState('index, follow');
  const [canonicalDomain, setCanonicalDomain] = useState('https://codewithamrendra.in');
  const [sitemapEnabled, setSitemapEnabled] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSeo() {
      try {
        const res = await fetch('/api/seo');
        const json = await res.json();
        if (json.success && json.data.seo) {
          const s = json.data.seo;
          if (s.defaultTitle) setDefaultTitle(s.defaultTitle);
          if (s.defaultDescription) setDefaultDescription(s.defaultDescription);
          if (s.defaultOgImage) setDefaultOgImage(s.defaultOgImage);
          if (s.robots) setRobots(s.robots);
          if (s.canonicalDomain) setCanonicalDomain(s.canonicalDomain);
        }
      } catch (err) {
        console.error('Failed to load SEO settings:', err);
      }
    }
    loadSeo();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          defaultTitle,
          defaultDescription,
          defaultOgImage,
          robots,
          canonicalDomain,
          sitemapEnabled,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Save SEO error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="SEO Management" subtitle="Configure global site metadata, indexing, and live search previews">
      <form onSubmit={handleSave} className="space-y-8">
        {/* Header CTA */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Global SEO & Indexing Rules</h2>
            <p className="text-xs text-slate-500 font-medium">Rules applied across public website pages unless overridden per post</p>
          </div>

          <button type="submit" disabled={saving} className="admin-btn-primary text-xs">
            {saved ? <Check size={16} /> : <Save size={16} />}
            <span>{saving ? 'Saving...' : saved ? 'Saved!' : 'Save SEO Settings'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Column */}
          <div className="space-y-6">
            <div className="admin-card p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Metadata Defaults</h3>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Default Site Title</label>
                <input
                  type="text"
                  required
                  value={defaultTitle}
                  onChange={(e) => setDefaultTitle(e.target.value)}
                  className="admin-input text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Default Meta Description</label>
                <textarea
                  rows={3}
                  required
                  value={defaultDescription}
                  onChange={(e) => setDefaultDescription(e.target.value)}
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Default Open Graph (OG) Image URL</label>
                <input
                  type="text"
                  value={defaultOgImage}
                  onChange={(e) => setDefaultOgImage(e.target.value)}
                  className="admin-input text-xs font-mono"
                />
              </div>
            </div>

            <div className="admin-card p-6 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Robots & Sitemap Configuration</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Robots Directive</label>
                  <select
                    value={robots}
                    onChange={(e) => setRobots(e.target.value)}
                    className="admin-input text-xs cursor-pointer font-medium"
                  >
                    <option value="index, follow">index, follow (Default)</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                    <option value="noindex, follow">noindex, follow</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Canonical Domain</label>
                  <input
                    type="text"
                    value={canonicalDomain}
                    onChange={(e) => setCanonicalDomain(e.target.value)}
                    className="admin-input text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sitemapEnabled}
                    onChange={(e) => setSitemapEnabled(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Automatically update /sitemap.xml when blog articles are published</span>
                </label>
              </div>
            </div>
          </div>

          {/* Previews Column */}
          <div className="space-y-6">
            {/* Google Search SERP Preview */}
            <div className="admin-card p-6 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600">
                <Search size={18} />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Google Search Result Preview</h3>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-1 shadow-xs">
                <div className="text-indigo-600 text-base font-bold hover:underline cursor-pointer truncate">
                  {defaultTitle}
                </div>
                <div className="text-emerald-700 text-xs font-mono truncate font-semibold">
                  {canonicalDomain}
                </div>
                <div className="text-slate-600 text-xs leading-relaxed line-clamp-2 mt-1">
                  {defaultDescription}
                </div>
              </div>
            </div>

            {/* Social Card Preview */}
            <div className="admin-card p-6 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600">
                <Share2 size={18} />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Social Card Preview (Twitter / LinkedIn)</h3>
              </div>

              <div className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xs">
                <div className="aspect-video bg-slate-100 relative overflow-hidden flex items-center justify-center text-slate-400">
                  {defaultOgImage ? (
                    <img src={defaultOgImage} alt="OG Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span>Default Social Banner Image</span>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">{canonicalDomain.replace('https://', '')}</div>
                  <div className="text-sm font-bold text-slate-900 truncate">{defaultTitle}</div>
                  <div className="text-xs text-slate-500 line-clamp-2">{defaultDescription}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
