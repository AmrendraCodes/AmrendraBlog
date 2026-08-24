'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BarChart3, Users, Eye, TrendingUp, Monitor, Smartphone, Tablet } from 'lucide-react';

export interface AnalyticsData {
  stats?: {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalCategories: number;
    totalMedia: number;
    totalVisitors: number;
    totalPageViews: number;
  };
  devices?: Array<{ name: string; percentage: number }>;
  trafficSources?: Array<{ source: string; views: number }>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch('/api/analytics');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error('Fetch analytics error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  const stats = data?.stats;

  return (
    <DashboardLayout title="Website Analytics" subtitle="Track visitor activity, popular posts, and traffic insights">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="admin-card p-5 bg-white">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Total Unique Visitors</span>
            <Users size={18} className="text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-3">
            {loading ? '...' : stats?.totalVisitors || 0}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">Unique IP Addresses</div>
        </div>

        <div className="admin-card p-5 bg-white">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Total Page Views</span>
            <Eye size={18} className="text-cyan-600" />
          </div>
          <div className="text-3xl font-black text-cyan-600 mt-3">
            {loading ? '...' : stats?.totalPageViews || 0}
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">All Recorded Page Visits</div>
        </div>

        <div className="admin-card p-5 bg-white">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Active Blog Posts</span>
            <BarChart3 size={18} className="text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-3">
            {loading ? '...' : stats?.publishedBlogs || 0}
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">Public Articles</div>
        </div>

        <div className="admin-card p-5 bg-white">
          <div className="text-slate-500 text-xs font-bold flex items-center justify-between">
            <span>Media Assets</span>
            <TrendingUp size={18} className="text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 mt-3">
            {loading ? '...' : stats?.totalMedia || 0}
          </div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">Uploaded Assets</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Device Breakdown */}
        <div className="admin-card p-6 bg-white">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4">Device Breakdown</h3>
          <div className="space-y-4">
            {data?.devices?.map((dev) => (
              <div key={dev.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-slate-700">
                    {dev.name === 'Desktop' ? <Monitor size={15} /> : dev.name === 'Mobile' ? <Smartphone size={15} /> : <Tablet size={15} />}
                    {dev.name}
                  </span>
                  <span className="text-slate-900 font-mono font-bold">{dev.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${dev.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="admin-card p-6 bg-white">
          <h3 className="text-sm font-extrabold text-slate-900 mb-4">Top Traffic Sources</h3>
          <div className="space-y-3">
            {data?.trafficSources?.map((src) => (
              <div key={src.source} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-800">{src.source}</span>
                <span className="text-xs font-mono text-indigo-600 font-bold">{src.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
