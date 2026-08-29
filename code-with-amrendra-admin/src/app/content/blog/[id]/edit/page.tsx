'use client';

import React, { useState, useEffect, use } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BlogForm, { BlogPostFormData } from '@/components/blog/BlogForm';
import { safeJson } from '@/lib/utils';

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [post, setPost] = useState<BlogPostFormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let active = true;

    async function loadPost() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const json = await safeJson<{ post: BlogPostFormData }>(res);
        if (active && json.success && json.data?.post) {
          setPost(json.data.post);
        } else if (active) {
          setError(json.error?.message || 'Failed to load blog post');
        }
      } catch {
        if (active) setError('Connection error loading post');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPost();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <DashboardLayout
      title="Content Manager"
      subtitle="Collection: blog"
    >
      {loading ? (
        <div className="admin-card p-12 text-center text-slate-400 font-mono text-xs animate-pulse">
          Loading article data...
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
          {error}
        </div>
      ) : (
        <BlogForm mode="edit" postId={id} initialData={post || undefined} />
      )}
    </DashboardLayout>
  );
}
