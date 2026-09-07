import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { prisma } from '../src/lib/prisma.js';

async function main() {
  const mdPath = path.join(process.cwd(), 'content', 'posts', 'why-react-apps-slow-down-in-2026.md');
  const fileContents = fs.readFileSync(mdPath, 'utf8');
  const { data, content } = matter(fileContents);

  console.log(`Processing blog: ${data.title}`);

  // 1. Get or create category
  let category = await prisma.category.findUnique({
    where: { slug: 'react' }
  });
  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'React',
        slug: 'react',
        description: 'React guides, best practices, and performance tips'
      }
    });
  }

  // 2. Count words
  const wordCount = content.trim().split(/\s+/).length;

  // 3. Upsert Blog record
  const existingBlog = await prisma.blog.findUnique({
    where: { slug: data.slug }
  });

  const blogData = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    description: data.description,
    content: content.trim(),
    featuredImage: data.featuredImage || '/images/why-react-apps-slow-down-2026.jpg',
    ogImage: data.image || '/images/why-react-apps-slow-down-2026.jpg',
    canonicalUrl: `https://www.codewithamrendra.in/resources/blog/${data.slug}`,
    metaTitle: data.title,
    metaDescription: data.description,
    status: 'PUBLISHED',
    publishedAt: existingBlog?.publishedAt || new Date(),
    readingTime: data.readTime || '8 min read',
    wordCount: wordCount,
    authorName: data.author || 'Amrendra Kumar',
    categoryId: category.id,
    categorySlug: category.slug,
    faqs: data.faqs || [],
  };

  let blog;
  if (existingBlog) {
    blog = await prisma.blog.update({
      where: { id: existingBlog.id },
      data: blogData
    });
    console.log(`Updated blog: ${blog.id} (${blog.slug})`);
  } else {
    blog = await prisma.blog.create({
      data: blogData
    });
    console.log(`Created blog: ${blog.id} (${blog.slug})`);
  }

  // 4. Tags
  const tagNames = data.tags || ['React', 'Next.js', 'Web Development', 'Frontend Development'];
  for (const tagName of tagNames) {
    let tag = await prisma.tag.findFirst({
      where: {
        OR: [
          { name: tagName },
          { slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }
        ]
      }
    });

    if (!tag) {
      const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      tag = await prisma.tag.create({
        data: { name: tagName, slug }
      });
    }

    // Connect to blog
    await prisma.blogTag.upsert({
      where: {
        blogId_tagId: {
          blogId: blog.id,
          tagId: tag.id
        }
      },
      update: {},
      create: {
        blogId: blog.id,
        tagId: tag.id
      }
    });
  }

  console.log('Tags linked successfully!');
  console.log(`FAQs count in DB: ${Array.isArray(blog.faqs) ? blog.faqs.length : 'none'}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
