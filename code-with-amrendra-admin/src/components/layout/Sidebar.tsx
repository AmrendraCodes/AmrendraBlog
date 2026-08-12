'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Tags as TagIcon,
  ImageIcon,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  FileCode,
  Globe,
  LucideIcon,
} from 'lucide-react';

interface SidebarProps {
  user?: {
    name?: string | null;
    email?: string;
    role?: string;
  };
}

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

type NavEntry = NavItem | NavGroup;

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems: NavEntry[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
      group: 'CONTENT',
      items: [
        { label: 'Blog Posts', href: '/content/blog', icon: FileText },
        { label: 'Pages', href: '/content/pages', icon: FileCode },
        { label: 'Categories', href: '/content/categories', icon: FolderTree },
        { label: 'Tags', href: '/content/tags', icon: TagIcon },
      ],
    },
    { label: 'Media Library', href: '/media', icon: ImageIcon },
    { label: 'SEO Management', href: '/seo', icon: Globe },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Users & Roles', href: '/users', icon: Users },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 shadow-sm">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black text-xl flex items-center justify-center shadow-md shadow-indigo-500/20 flex-shrink-0">
            C
          </div>
          {!collapsed && (
            <div>
              <div className="font-extrabold text-slate-900 text-sm tracking-tight leading-none">CODE WITH AMRENDRA</div>
              <div className="text-[10px] text-indigo-600 font-mono font-bold tracking-wider uppercase mt-1">
                ADMIN CMS
              </div>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-4">
        {navItems.map((entry, idx) => {
          if ('group' in entry) {
            return (
              <div key={idx} className="space-y-1">
                {!collapsed && (
                  <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono">
                    {entry.group}
                  </div>
                )}
                {entry.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                        isActive
                          ? 'bg-indigo-50/90 text-indigo-600 border border-indigo-100 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            );
          }

          const Icon = entry.icon;
          const isActive = pathname === entry.href;
          return (
            <Link
              key={entry.href}
              href={entry.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive
                  ? 'bg-indigo-50/90 text-indigo-600 border border-indigo-100 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              title={collapsed ? entry.label : undefined}
            >
              <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
              {!collapsed && <span>{entry.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-xs">
              {user?.name?.[0] || 'A'}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Amrendra Kumar'}</div>
                <div className="text-[10px] text-slate-500 truncate">{user?.email || 'codewithamrendra@outlook.com'}</div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Bar Trigger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm">
            C
          </div>
          <span className="font-extrabold text-slate-900 text-sm">CODE WITH AMRENDRA</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className={`hidden md:block h-screen sticky top-0 transition-all duration-200 ${collapsed ? 'w-20' : 'w-64'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 max-w-full h-full z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
