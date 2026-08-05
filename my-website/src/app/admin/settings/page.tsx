'use client';

import React, { useState } from 'react';
import { Settings, Save, Globe, Mail, Shield, Cloud } from 'lucide-react';

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('Code with Amrendra');
  const [contactEmail, setContactEmail] = useState('contact@codewithamrendra.com');
  const [phone, setPhone] = useState('+91 9876543210');
  const [resendKey, setResendKey] = useState('re_123456789...');
  const [cloudinaryName, setCloudinaryName] = useState('codewithamrendra');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Website &amp; API Settings</h1>
          <p className="text-xs text-[#9CA3AF] mt-1">Configure site metadata, email dispatch, and Cloudinary keys.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
        >
          <Save size={16} /> {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          ✓ Website settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Metadata */}
        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase text-[#10B981] flex items-center gap-2">
            <Globe size={16} /> General Settings
          </h3>

          <div>
            <label className="block text-xs font-bold text-white mb-2">Website Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-2">Contact Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-2">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>

        {/* API Integration Keys */}
        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase text-[#10B981] flex items-center gap-2">
            <Cloud size={16} /> API Integration Credentials
          </h3>

          <div>
            <label className="block text-xs font-bold text-white mb-2">Resend Email API Key</label>
            <input
              type="password"
              value={resendKey}
              onChange={(e) => setResendKey(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-white mb-2">Cloudinary Cloud Name</label>
            <input
              type="text"
              value={cloudinaryName}
              onChange={(e) => setCloudinaryName(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#111C16] border border-[#1E2E25] rounded-xl text-xs text-white focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
