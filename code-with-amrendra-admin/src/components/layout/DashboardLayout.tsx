'use client';

import Image from 'next/image';
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
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f3f5fc] text-slate-900 relative overflow-hidden">
      {/* Background Watermark Logo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0">
        <Image
          src="/logo-square.png"
          alt="Business Logo Watermark"
          width={450}
          height={450}
          className="opacity-[0.035] select-none max-w-lg w-full object-contain"
        />
      </div>

      <Sidebar user={user} />
      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Header title={title} subtitle={subtitle} user={user} />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
