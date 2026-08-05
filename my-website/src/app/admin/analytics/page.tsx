'use client';

import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Eye, Globe, Smartphone, Monitor } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error(err));
  }, []);

  const deviceData = [
    { name: 'Desktop', percentage: 65 },
    { name: 'Mobile', percentage: 28 },
    { name: 'Tablet', percentage: 7 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Visitor Analytics Engine</h1>
        <p className="text-xs text-[#9CA3AF] mt-1">Track traffic trends, popular content, and device distribution.</p>
      </div>

      {/* Traffic Chart */}
      <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp size={18} className="text-[#10B981]" /> Daily Page Views &amp; Unique Visitors
          </h2>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.charts?.trafficChart || []}>
              <defs>
                <linearGradient id="analyticsPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2E25" />
              <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0F0C', borderColor: '#1E2E25', borderRadius: '12px' }}
              />
              <Area type="monotone" dataKey="pageViews" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#analyticsPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Monitor size={18} className="text-[#10B981]" /> Device Distribution
          </h3>

          <div className="space-y-3 pt-2">
            {deviceData.map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-[#9CA3AF]">
                  <span>{d.name}</span>
                  <span className="font-mono text-white">{d.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-[#111C16] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${d.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Referral Sources */}
        <div className="rounded-3xl bg-[#0A0F0C] border border-[#1E2E25] p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe size={18} className="text-[#10B981]" /> Top Referral Sources
          </h3>

          <ul className="space-y-3 pt-2 text-xs">
            <li className="flex items-center justify-between py-1.5 border-b border-[#1E2E25]">
              <span className="text-white font-mono">Google Organic Search</span>
              <span className="text-[#34D399] font-bold">58%</span>
            </li>
            <li className="flex items-center justify-between py-1.5 border-b border-[#1E2E25]">
              <span className="text-white font-mono">Direct / Bookmark</span>
              <span className="text-[#34D399] font-bold">24%</span>
            </li>
            <li className="flex items-center justify-between py-1.5 border-b border-[#1E2E25]">
              <span className="text-white font-mono">LinkedIn / Social Media</span>
              <span className="text-[#34D399] font-bold">12%</span>
            </li>
            <li className="flex items-center justify-between py-1.5">
              <span className="text-white font-mono">GitHub Repositories</span>
              <span className="text-[#34D399] font-bold">6%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
