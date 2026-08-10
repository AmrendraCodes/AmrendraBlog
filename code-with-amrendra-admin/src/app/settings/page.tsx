'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Save, Check, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'website' | 'seo' | 'security' | 'api'>('general');

  const [siteName, setSiteName] = useState('Code with Amrendra');
  const [siteUrl, setSiteUrl] = useState('https://codewithamrendra.in');
  const [contactEmail, setContactEmail] = useState('contact@codewithamrendra.in');
  const [phone, setPhone] = useState('+91 9876543210');
  const [address, setAddress] = useState('New Delhi, India');
  const [analyticsId, setAnalyticsId] = useState('GA-CW-2026-X');
  const [github, setGithub] = useState('https://github.com/amrendra');
  const [twitter, setTwitter] = useState('https://twitter.com/codewithamrendra');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/amrendra');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        const json = await res.json();
        if (json.success && json.data.settings) {
          const s = json.data.settings;
          if (s.siteName) setSiteName(s.siteName);
          if (s.contactEmail) setContactEmail(s.contactEmail);
          if (s.phone) setPhone(s.phone);
          if (s.address) setAddress(s.address);
          if (s.analyticsId) setAnalyticsId(s.analyticsId);
          if (s.socialLinks) {
            if (s.socialLinks.github) setGithub(s.socialLinks.github);
            if (s.socialLinks.twitter) setTwitter(s.socialLinks.twitter);
            if (s.socialLinks.linkedin) setLinkedin(s.socialLinks.linkedin);
          }
        }
      } catch (err) {
        console.error('Fetch settings error:', err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName,
          siteUrl,
          contactEmail,
          phone,
          address,
          analyticsId,
          socialLinks: { github, twitter, linkedin },
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Save settings error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout title="System Settings" subtitle="Configure site defaults, contact info, and security">
      <form onSubmit={handleSave} className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 space-x-6 overflow-x-auto">
          {[
            { id: 'general', label: 'General' },
            { id: 'website', label: 'Website & Contact' },
            { id: 'seo', label: 'Social & Analytics' },
            { id: 'security', label: 'Security & Auth' },
            { id: 'api', label: 'API Integrations' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs tracking-wide border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 font-semibold hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'general' && (
          <div className="admin-card p-6 space-y-4 max-w-2xl bg-white">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">General Information</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Brand Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="admin-input text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Public Website URL</label>
              <input
                type="text"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
                className="admin-input text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Default Timezone</label>
              <input type="text" disabled value="Asia/Kolkata (IST +05:30)" className="admin-input text-xs font-mono opacity-60 cursor-not-allowed bg-slate-50" />
            </div>
          </div>
        )}

        {activeTab === 'website' && (
          <div className="admin-card p-6 space-y-4 max-w-2xl bg-white">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Contact & Address Details</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="admin-input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="admin-input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Office Location / Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="admin-input text-xs"
              />
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="admin-card p-6 space-y-4 max-w-2xl bg-white">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Social Links & Telemetry</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Google Analytics Tracking ID</label>
              <input
                type="text"
                value={analyticsId}
                onChange={(e) => setAnalyticsId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="admin-input text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">GitHub Profile URL</label>
              <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className="admin-input text-xs font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Twitter / X Profile URL</label>
              <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="admin-input text-xs font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">LinkedIn Profile URL</label>
              <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="admin-input text-xs font-mono" />
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="admin-card p-6 space-y-4 max-w-2xl bg-white">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Authentication & Session Security</h3>
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-bold">
                <Shield size={16} /> HTTP-Only Session Cookies Enabled
              </div>
              <p className="text-slate-600 text-xs font-medium">
                Admin credentials and session keys are secured using strict server-side httpOnly cookies with bcrypt password hashing. Secrets are hidden from browser client scripts.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="admin-card p-6 space-y-4 max-w-2xl bg-white">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Integrations & External APIs</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Cloudinary Storage Key</label>
              <input type="password" disabled value="••••••••••••••••" className="admin-input text-xs font-mono opacity-60 cursor-not-allowed bg-slate-50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Resend Email API Key</label>
              <input type="password" disabled value="••••••••••••••••" className="admin-input text-xs font-mono opacity-60 cursor-not-allowed bg-slate-50" />
            </div>
          </div>
        )}

        <div>
          <button type="submit" disabled={saving} className="admin-btn-primary text-xs">
            {saved ? <Check size={16} /> : <Save size={16} />}
            <span>{saving ? 'Saving...' : saved ? 'Saved Settings!' : 'Save System Settings'}</span>
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
