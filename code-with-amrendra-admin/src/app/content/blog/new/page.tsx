'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BlogForm from '@/components/blog/BlogForm';

export default function NewBlogPostPage() {
  return (
    <DashboardLayout
      title="Content Manager"
      subtitle="Collection: blog"
    >
      <BlogForm mode="create" />
    </DashboardLayout>
  );
}
