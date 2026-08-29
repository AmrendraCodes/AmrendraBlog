'use client';

import React from 'react';
import { CheckCircle2, Clock, FileEdit } from 'lucide-react';

interface StatusBadgeProps {
  status: 'PUBLISHED' | 'DRAFT' | 'SCHEDULED' | string;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const normalized = status.toUpperCase();

  if (normalized === 'PUBLISHED') {
    return (
      <span className={`badge-published ${className}`}>
        <CheckCircle2 size={11} />
        <span>Published</span>
      </span>
    );
  }

  if (normalized === 'SCHEDULED') {
    return (
      <span className={`badge-scheduled ${className}`}>
        <Clock size={11} />
        <span>Scheduled</span>
      </span>
    );
  }

  return (
    <span className={`badge-draft ${className}`}>
      <FileEdit size={11} />
      <span>Draft</span>
    </span>
  );
}
