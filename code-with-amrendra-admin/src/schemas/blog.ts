import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  excerpt: z.string().optional(),
  description: z.string().optional(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  featuredImage: z.string().optional(),
  imageUrl: z.string().optional(),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED']).default('DRAFT'),
  publishedAt: z.string().optional(),
  scheduledAt: z.string().optional(),
  categoryId: z.string().optional(),
  authorName: z.string().optional().default('Amrendra Kumar'),
  tags: z.array(z.string()).optional().default([]),
  faqs: z
    .array(
      z.object({
        id: z.string().optional(),
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional()
    .default([]),
});

export type BlogInput = z.infer<typeof blogSchema>;
