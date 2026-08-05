'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tags,
  Image as ImageIcon,
  Mail,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Blog Posts', href: '/admin/blogs', icon: FileText },
  { label: 'Categories', href: '/admin/categories', icon: FolderTree },
  { label: 'Tags', href: '/admin/tags', icon: Tags },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Contacts', href: '/admin/contacts', icon: Mail },
  { label: 'Newsletter', href: '/admin/newsletter', icon: Users },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#060907] text-[#F3F4F6] flex overflow-x-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-[#1E2E25] bg-[#0A0F0C] shrink-0 sticky top-0 h-screen z-30">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#1E2E25] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#111C16] border border-[#10B981]/40 text-[#10B981] flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white tracking-tight">Code with Amrendra</h2>
            <span className="text-[10px] font-mono text-[#34D399] uppercase tracking-wider">Enterprise CMS</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  active
                    ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                    : 'text-[#9CA3AF] hover:text-white hover:bg-[#111C16]'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* View Public Site & Logout Footer */}
        <div className="p-4 border-t border-[#1E2E25] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#9CA3AF] hover:text-white hover:bg-[#111C16] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} /> View Public Website
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-[#1E2E25] bg-[#0A0F0C] px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#9CA3AF] hover:text-white rounded-lg"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
              <span className="font-mono uppercase text-[#10B981]">Admin</span>
              <ChevronRight size={14} />
              <span className="text-white capitalize font-semibold">
                {pathname.split('/')[2] || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-white font-bold hidden sm:inline">Amrendra Kumar</span>
              <span className="text-[10px] font-mono bg-[#10B981]/20 text-[#34D399] px-2 py-0.5 rounded-full border border-[#10B981]/30">ADMIN</span>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
