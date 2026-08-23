'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BlogForm from '@/components/blog/BlogForm';

export default function NewBlogPostPage() {
  return (
    <DashboardLayout
      title="Create Blog Post"
      subtitle="Write, auto-format, and publish your technical article"
    >
      <BlogForm mode="create" />
    </DashboardLayout>
  );
}
