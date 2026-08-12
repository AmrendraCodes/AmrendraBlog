const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (!process.env[key]) process.env[key] = value;
    }
  });
}

const prisma = new PrismaClient();
const postsDir = path.join(__dirname, '..', '..', 'my-website', 'content', 'posts');

function parseMarkdown(fileContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatterStr = match[1];
  const content = match[2].trim();
  const data = {};

  frontmatterStr.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    if (val.startsWith('[') && val.endsWith(']')) {
      try {
        val = JSON.parse(val);
      } catch {
        val = val
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
      }
    }

    data[key] = val;
  });

  return { data, content };
}

function calculateReadingTime(content) {
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function countWords(content) {
  return content ? content.trim().split(/\s+/).length : 0;
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function seed() {
  console.log('🌱 Starting blog content database migration...');

  if (!fs.existsSync(postsDir)) {
    console.error('❌ Posts directory not found at:', postsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  console.log(`📁 Found ${files.length} markdown post files.`);

  let successCount = 0;

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = parseMarkdown(raw);

    const title = data.title || file.replace(/\.md$/, '');
    const slug = data.slug || slugify(title);
    const categoryName = data.category || 'General';
    const categorySlug = data.categorySlug || slugify(categoryName);
    const authorName = data.author || 'Amrendra Kumar';
    const excerpt = data.excerpt || content.slice(0, 160) + '...';
    const featuredImage = data.image || data.featuredImage || null;
    const dateStr = data.date && !isNaN(Date.parse(data.date)) ? new Date(data.date).toISOString() : new Date().toISOString();
    const publishedAt = new Date(dateStr);
    const readTime = data.readTime || calculateReadingTime(content);
    const wordCount = countWords(content);
    const tagList = Array.isArray(data.tags) ? data.tags : [];

    // 1. Upsert Category
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: { name: categoryName },
      create: {
        name: categoryName,
        slug: categorySlug,
        description: `${categoryName} technical articles and tutorials`,
      },
    });

    // 2. Upsert Blog Post
    const blog = await prisma.blog.upsert({
      where: { slug },
      update: {
        title,
        excerpt,
        description: excerpt,
        content,
        featuredImage,
        ogImage: featuredImage,
        metaTitle: title,
        metaDescription: excerpt,
        status: 'PUBLISHED',
        publishedAt,
        readingTime: readTime,
        wordCount,
        authorName,
        categoryId: category.id,
        categorySlug: category.slug,
      },
      create: {
        title,
        slug,
        excerpt,
        description: excerpt,
        content,
        featuredImage,
        ogImage: featuredImage,
        metaTitle: title,
        metaDescription: excerpt,
        status: 'PUBLISHED',
        publishedAt,
        readingTime: readTime,
        wordCount,
        authorName,
        categoryId: category.id,
        categorySlug: category.slug,
      },
    });

    // 3. Upsert Tags & BlogTag relations
    for (const tagName of tagList) {
      if (!tagName) continue;
      const tagSlug = slugify(tagName);
      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        update: { name: tagName },
        create: { name: tagName, slug: tagSlug },
      });

      await prisma.blogTag.upsert({
        where: { blogId_tagId: { blogId: blog.id, tagId: tag.id } },
        update: {},
        create: { blogId: blog.id, tagId: tag.id },
      });
    }

    console.log(`✅ Seeded post: "${title}" (${slug})`);
    successCount++;
  }

  // 4. Seed Website Media Files
  const mediaFiles = [
    { fileName: 'how-to-build-light-dark-theme-toggle-javascript.png', url: '/images/how-to-build-light-dark-theme-toggle-javascript.png', format: 'png', width: 1200, height: 630 },
    { fileName: 'og-blog.png', url: '/images/og-blog.png', format: 'png', width: 1200, height: 630 },
    { fileName: 'og-default.png', url: '/images/og-default.png', format: 'png', width: 1200, height: 630 },
    { fileName: 'business-logo.png', url: '/images/business-logo.png', format: 'png', width: 512, height: 512 },
    { fileName: 'logo-square.png', url: '/logo-square.png', format: 'png', width: 512, height: 512 },
    { fileName: 'Profile photo.jpeg', url: '/Profile photo.jpeg', format: 'jpeg', width: 500, height: 500 },
  ];

  for (const m of mediaFiles) {
    const publicId = `media_${m.fileName.toLowerCase().replace(/[^\w-]/g, '_')}`;
    await prisma.media.upsert({
      where: { publicId },
      update: { url: m.url, secureUrl: m.url },
      create: {
        fileName: m.fileName,
        publicId,
        url: m.url,
        secureUrl: m.url,
        format: m.format,
        width: m.width,
        height: m.height,
        bytes: 150000,
        folder: 'website',
      },
    });
  }

  console.log(`\n🎉 Content Migration Complete! Successfully seeded ${successCount} blog posts and ${mediaFiles.length} media files into database.`);
}

seed()
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
