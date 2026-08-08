'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BarChart3, Users, Eye, TrendingUp, Monitor, Smartphone, Tablet } from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
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
        <div className="admin-card p-5">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Total Unique Visitors</span>
            <Users size={18} className="text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white mt-3">
            {loading ? '...' : stats?.totalVisitors || 0}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono mt-1">Unique IP Addresses</div>
        </div>

        <div className="admin-card p-5">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Total Page Views</span>
            <Eye size={18} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 mt-3">
            {loading ? '...' : stats?.totalPageViews || 0}
          </div>
          <div className="text-[10px] text-gray-400 font-mono mt-1">All Recorded Page Visits</div>
        </div>

        <div className="admin-card p-5">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Active Blog Posts</span>
            <BarChart3 size={18} className="text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white mt-3">
            {loading ? '...' : stats?.publishedBlogs || 0}
          </div>
          <div className="text-[10px] text-gray-400 font-mono mt-1">Public Articles</div>
        </div>

        <div className="admin-card p-5">
          <div className="text-gray-400 text-xs font-semibold flex items-center justify-between">
            <span>Media Assets</span>
            <TrendingUp size={18} className="text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white mt-3">
            {loading ? '...' : stats?.totalMedia || 0}
          </div>
          <div className="text-[10px] text-gray-400 font-mono mt-1">Uploaded Assets</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Device Breakdown */}
        <div className="admin-card p-6">
          <h3 className="text-sm font-bold text-white mb-4">Device Breakdown</h3>
          <div className="space-y-4">
            {data?.devices?.map((dev: any) => (
              <div key={dev.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-2 text-gray-300">
                    {dev.name === 'Desktop' ? <Monitor size={15} /> : dev.name === 'Mobile' ? <Smartphone size={15} /> : <Tablet size={15} />}
                    {dev.name}
                  </span>
                  <span className="text-white font-mono font-bold">{dev.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#111726] overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${dev.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="admin-card p-6">
          <h3 className="text-sm font-bold text-white mb-4">Top Traffic Sources</h3>
          <div className="space-y-3">
            {data?.trafficSources?.map((src: any) => (
              <div key={src.source} className="flex items-center justify-between p-3 rounded-lg bg-[#111726] border border-[#192234]">
                <span className="text-xs font-semibold text-white">{src.source}</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">{src.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
