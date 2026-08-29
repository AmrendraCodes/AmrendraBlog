'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  user?: {
    name?: string | null;
    email?: string;
    role?: string;
  };
}

export default function DashboardLayout({ children, title, subtitle, user }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[var(--bg-canvas)] text-[var(--text-main)] transition-colors duration-200">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} subtitle={subtitle} user={user} />
        <main className="flex-1 p-5 sm:p-7 md:p-9 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
