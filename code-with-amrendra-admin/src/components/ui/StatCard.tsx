'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  loading?: boolean;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-indigo-600 dark:text-indigo-400',
  iconBg = 'bg-indigo-50 dark:bg-indigo-950/50',
  loading = false,
  trend,
}: StatCardProps) {
  return (
    <div className="admin-card p-5 flex flex-col justify-between relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <span className="text-xs font-bold text-[var(--text-muted)] tracking-wide uppercase">
          {title}
        </span>
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg} ${iconColor} transition-transform duration-200 group-hover:scale-110 shadow-2xs`}
        >
          <Icon size={18} />
        </div>
      </div>

      <div className="mt-3">
        {loading ? (
          <div className="h-8 w-20 bg-slate-200 dark:bg-[#282b42] rounded-md animate-pulse" />
        ) : (
          <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-[11px] font-medium text-[var(--text-dim)]">
              {subtitle}
            </span>
          )}

          {trend && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                trend.isPositive
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-[#282b42] dark:text-slate-400'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
