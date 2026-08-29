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
  Mail,
  LucideIcon,
} from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

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
  badge?: string;
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
      group: 'CONTENT MANAGER',
      items: [
        { label: 'Blog Posts', href: '/content/blog', icon: FileText },
        { label: 'Pages', href: '/content/pages', icon: FileCode },
        { label: 'Categories', href: '/content/categories', icon: FolderTree },
        { label: 'Tags', href: '/content/tags', icon: TagIcon },
      ],
    },
    {
      group: 'ASSETS & SEO',
      items: [
        { label: 'Inquiries', href: '/inquiries', icon: Mail },
        { label: 'Media Library', href: '/media', icon: ImageIcon },
        { label: 'SEO Management', href: '/seo', icon: Globe },
        { label: 'Analytics', href: '/analytics', icon: BarChart3 },
      ],
    },
    {
      group: 'ADMINISTRATION',
      items: [
        { label: 'Users & Roles', href: '/users', icon: Users },
        { label: 'Settings', href: '/settings', icon: Settings },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--bg-sidebar)] border-r border-[var(--border-color)] transition-colors duration-200">
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-[var(--border-subtle)]">
        <Link href="/dashboard" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4945ff] via-[#5c58ff] to-[#807dff] text-white font-black text-lg flex items-center justify-center shadow-md shadow-indigo-500/25 shrink-0 select-none">
            C
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="font-extrabold text-[var(--text-main)] text-sm tracking-tight leading-tight flex items-center gap-1.5">
                <span>CWA ADMIN PANEL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold tracking-wider uppercase mt-0.5">
                ENTERPRISE CMS
              </div>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)] transition cursor-pointer"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-4">
        {navItems.map((entry, idx) => {
          if ('group' in entry) {
            return (
              <div key={idx} className="space-y-1">
                {!collapsed && (
                  <div className="px-3 py-1 text-[10px] font-extrabold tracking-wider text-[var(--text-dim)] uppercase font-mono">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition group ${
                        isActive
                          ? 'bg-indigo-50/90 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 shadow-2xs'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        size={18}
                        className={`transition-colors shrink-0 ${
                          isActive
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-[var(--text-dim)] group-hover:text-[var(--text-main)]'
                        }`}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition group ${
                isActive
                  ? 'bg-indigo-50/90 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 shadow-2xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card-hover)]'
              }`}
              title={collapsed ? entry.label : undefined}
            >
              <Icon
                size={18}
                className={`transition-colors shrink-0 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-[var(--text-dim)] group-hover:text-[var(--text-main)]'
                }`}
              />
              {!collapsed && <span className="truncate">{entry.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Footer Controls */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-card)]">
        {/* Theme Toggle Button inside Sidebar */}
        <div className={`mb-3 ${collapsed ? 'flex justify-center' : ''}`}>
          <ThemeToggle variant={collapsed ? 'compact' : 'button'} className="w-full justify-center" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
              {user?.name?.[0] || 'A'}
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-[var(--text-main)] truncate">
                  {user?.name || 'Amrendra Kumar'}
                </div>
                <div className="text-[10px] text-[var(--text-dim)] truncate">
                  {user?.email || 'admin@codewithamrendra.in'}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-[var(--text-dim)] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition cursor-pointer"
            title="Log out"
            aria-label="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--bg-sidebar)] border-b border-[var(--border-color)]">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#4945ff] to-[#7b78ff] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
            C
          </div>
          <span className="font-extrabold text-sm text-[var(--text-main)]">CWA ADMIN PANEL</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle variant="compact" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-main)] bg-[var(--bg-card-hover)] rounded-xl cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block h-screen sticky top-0 self-start z-30 shrink-0 transition-all duration-200 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Slide Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-full h-full z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
