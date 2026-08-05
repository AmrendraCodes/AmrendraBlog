import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const postsDirectory = path.join(process.cwd(), 'content', 'posts');

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min read`;
}

function countWords(content) {
  return content.trim().split(/\s+/).length;
}

async function main() {
  console.log('🚀 Starting Markdown to PostgreSQL Migration...');

  if (!fs.existsSync(postsDirectory)) {
    console.error('❌ posts directory not found:', postsDirectory);
    return;
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'));
  console.log(`📁 Found ${fileNames.length} markdown post(s) to process.`);

  // Create Default Admin User if not exists
  let adminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        name: 'Amrendra Kumar',
        email: 'admin@codewithamrendra.com',
        passwordHash: '$2a$10$wE8Fz8E4Y3H0K8J5L9N0O.vM5xN4R3P2Q1S0T9U8V7W6X5Y4Z3A2B', // Default hashed password
        role: 'ADMIN',
      },
    });
    console.log('👤 Created default Admin User:', adminUser.email);
  }

  let migratedCount = 0;

  for (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const title = data.title || fileName.replace(/\.md$/, '');
    const slug = data.slug || fileName.replace(/\.md$/, '').toLowerCase();
    const date = data.date ? new Date(data.date) : new Date();
    const categoryName = data.category || 'General';
    const categorySlug = data.categorySlug || categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tagsList = Array.isArray(data.tags) ? data.tags : [];

    // Ensure Category exists
    let category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: categoryName,
          slug: categorySlug,
        },
      });
      console.log(`🏷️ Created Category: "${category.name}"`);
    }

    // Ensure Tags exist
    const tagRecordIds = [];
    for (const tagName of tagsList) {
      const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      let tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
      if (!tag) {
        tag = await prisma.tag.create({
          data: { name: tagName, slug: tagSlug },
        });
        console.log(`🔖 Created Tag: "${tag.name}"`);
      }
      tagRecordIds.push(tag.id);
    }

    const wordCnt = countWords(content);
    const readTimeStr = data.readTime || calculateReadingTime(content);

    // Upsert Post by Slug
    const blogPost = await prisma.blog.upsert({
      where: { slug },
      update: {
        title,
        excerpt: data.excerpt || null,
        description: data.description || data.excerpt || null,
        content: content.trim(),
        featuredImage: data.featuredImage || data.image || null,
        ogImage: data.ogImage || data.image || null,
        canonicalUrl: data.canonicalUrl || null,
        metaTitle: data.metaTitle || title,
        metaDescription: data.metaDescription || data.excerpt || null,
        status: 'PUBLISHED',
        publishedAt: date,
        readingTime: readTimeStr,
        wordCount: wordCnt,
        authorId: adminUser.id,
        authorName: data.author || adminUser.name,
        categoryId: category.id,
        categorySlug: category.slug,
      },
      create: {
        title,
        slug,
        excerpt: data.excerpt || null,
        description: data.description || data.excerpt || null,
        content: content.trim(),
        featuredImage: data.featuredImage || data.image || null,
        ogImage: data.ogImage || data.image || null,
        canonicalUrl: data.canonicalUrl || null,
        metaTitle: data.metaTitle || title,
        metaDescription: data.metaDescription || data.excerpt || null,
        status: 'PUBLISHED',
        publishedAt: date,
        readingTime: readTimeStr,
        wordCount: wordCnt,
        authorId: adminUser.id,
        authorName: data.author || adminUser.name,
        categoryId: category.id,
        categorySlug: category.slug,
      },
    });

    // Link Tags
    for (const tagId of tagRecordIds) {
      await prisma.blogTag.upsert({
        where: {
          blogId_tagId: { blogId: blogPost.id, tagId },
        },
        update: {},
        create: { blogId: blogPost.id, tagId },
      });
    }

    migratedCount++;
    console.log(`✅ Migrated Post (${migratedCount}/${fileNames.length}): "${title}" (${slug})`);
  }

  console.log(`🎉 Migration complete! Successfully processed ${migratedCount} post(s).`);
}

main()
  .catch((e) => {
    console.error('❌ Migration Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
