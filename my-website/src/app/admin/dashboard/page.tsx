'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Users,
  Eye,
  Mail,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [charts, setCharts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats);
        setCharts(data.charts);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load analytics:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-[#111C16] rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-[#0A0F0C] border border-[#1E2E25] rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Blogs',
      value: stats?.totalBlogs || 0,
      sub: `${stats?.publishedBlogs || 0} Published • ${stats?.draftBlogs || 0} Drafts`,
      icon: FileText,
      color: 'text-[#10B981]',
    },
    {
      title: 'Total Visitors',
      value: stats?.totalVisitors || 0,
      sub: `+${stats?.todayVisitors || 0} Today`,
      icon: Eye,
      color: 'text-emerald-400',
    },
    {
      title: 'Contact Submissions',
      value: stats?.contactRequests || 0,
      sub: 'Form Requests',
      icon: Mail,
      color: 'text-amber-400',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats?.newsletterSubscribers || 0,
      sub: 'Active Readers',
      icon: Users,
      color: 'text-[#34D399]',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">System Overview</h1>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Real-time performance metrics, content management, and engagement analytics.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all"
        >
          <Plus size={16} /> Create New Blog
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 shadow-xl relative overflow-hidden group hover:border-[#10B981]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9CA3AF]">
                  {card.title}
                </span>
                <div className={`w-10 h-10 rounded-xl bg-[#111C16] border border-[#10B981]/30 flex items-center justify-center ${card.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight mb-1">{card.value}</div>
              <span className="text-xs text-[#9CA3AF]">{card.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitor Traffic Area Chart */}
        <div className="lg:col-span-2 rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp size={18} className="text-[#10B981]" /> Weekly Visitor Traffic
              </h3>
              <p className="text-xs text-[#9CA3AF]">Page views and unique visitors per day</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts?.trafficChart || []}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2E25" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0A0F0C', borderColor: '#1E2E25', borderRadius: '12px' }}
                  labelStyle={{ color: '#FFF', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="pageViews" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Highlight Insights Box */}
        <div className="rounded-3xl bg-gradient-to-br from-[#111C16] to-[#0A0F0C] border border-[#10B981]/40 p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#34D399] text-[10px] font-mono font-bold uppercase tracking-wider mb-4">
              <Sparkles size={12} /> TOP PERFORMER
            </div>
            <h4 className="text-xs font-mono font-bold text-[#9CA3AF] uppercase mb-1">Most Viewed Article</h4>
            <p className="text-sm font-bold text-white leading-snug mb-3">
              {stats?.mostViewedBlog?.title || 'How to Build a Light and Dark Theme Switch'}
            </p>
            <div className="text-xs text-[#34D399] font-mono font-bold">
              🔥 {stats?.mostViewedBlog?.views || 342} Total Views
            </div>
          </div>

          <div className="pt-6 border-t border-[#1E2E25] mt-6">
            <Link
              href="/admin/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] hover:underline"
            >
              <span>Manage All Blog Posts</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
