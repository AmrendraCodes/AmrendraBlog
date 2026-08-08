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
    <div className="flex flex-col h-full bg-[#0e1322] border-r border-[#1f2a40]">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#192234]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-lg">
            C
          </div>
          {!collapsed && (
            <div>
              <div className="font-extrabold text-white text-sm tracking-tight">CODE WITH AMRENDRA</div>
              <div className="text-[10px] text-emerald-400 font-mono font-medium tracking-wider uppercase">
                ADMIN CMS
              </div>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#151c2e] transition"
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
                  <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-gray-500 uppercase font-mono">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                          : 'text-gray-400 hover:text-white hover:bg-[#151c2e]'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={18} className={isActive ? 'text-emerald-400' : 'text-gray-400'} />
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-[#151c2e]'
              }`}
              title={collapsed ? entry.label : undefined}
            >
              <Icon size={18} className={isActive ? 'text-emerald-400' : 'text-gray-400'} />
              {!collapsed && <span>{entry.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-3 border-t border-[#192234] bg-[#0b0f19]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-bold flex items-center justify-center text-xs flex-shrink-0">
              {user?.name?.[0] || 'A'}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">{user?.name || 'Amrendra Kumar'}</div>
                <div className="text-[10px] text-gray-400 truncate">{user?.email || 'admin@codewithamrendra.com'}</div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
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
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0e1322] border-b border-[#1f2a40]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-emerald-500 text-slate-900 font-extrabold flex items-center justify-center text-sm">
            C
          </div>
          <span className="font-extrabold text-white text-sm">CODE WITH AMRENDRA</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-gray-300 hover:text-white bg-[#151c2e] rounded-lg"
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
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 max-w-full h-full z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
