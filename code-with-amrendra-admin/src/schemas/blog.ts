import { z } from 'zod';

const seoKeywordsSchema = z.object({
  primary: z.string().trim().max(60, 'Focus keyword must be 60 characters or fewer').optional().default(''),
  secondary: z.array(
    z.string().trim().max(60, 'Each secondary keyword must be 60 characters or fewer')
  ).max(10, 'A maximum of 10 secondary keywords is allowed').optional().default([]),
});

const faqItemSchema = z.object({
  id: z.string().optional(),
  question: z.string().trim().min(1, 'FAQ question cannot be empty'),
  answer: z.string().trim().min(1, 'FAQ answer cannot be empty'),
});

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
  seoKeywords: seoKeywordsSchema.optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED']).default('DRAFT'),
  publishedAt: z.string().optional(),
  scheduledAt: z.string().optional(),
  categoryId: z.string().optional(),
  authorName: z.string().optional().default('Amrendra Kumar'),
  tags: z.array(z.string()).optional().default([]),
  faqs: z.array(faqItemSchema).optional(),
});

export type BlogInput = z.infer<typeof blogSchema>;
