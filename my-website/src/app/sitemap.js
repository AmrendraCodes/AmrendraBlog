import { getAllPosts } from "@/lib/posts";
import { getAllCaseStudies } from "@/lib/case-studies";
import { SERVICES_DATA } from "@/lib/services";
import { siteMetadata } from "@/config/seo";

/**
 * Next.js Dynamic Sitemap Generator
 * Automatically maps static pages, services, resources, dynamic blog posts, case studies, and categories.
 */
export default async function sitemap() {
  const baseUrl = siteMetadata.siteUrl;

  // 1. Static Pages & Key Hubs
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Services Detail Pages
  const serviceUrls = SERVICES_DATA.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Dynamic Blog Posts
  const posts = getAllPosts() || [];
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/resources/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 4. Dynamic Case Studies
  const caseStudies = getAllCaseStudies() || [];
  const caseStudyUrls = caseStudies.map((study) => ({
    url: `${baseUrl}/resources/case-studies/${study.slug}`,
    lastModified: study.publishedAt ? new Date(study.publishedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 5. Dynamic Categories
  const categorySlugs = [...new Set(posts.map((post) => post.categorySlug).filter(Boolean))];
  const categoryUrls = categorySlugs.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...serviceUrls, ...blogUrls, ...caseStudyUrls, ...categoryUrls];
}
