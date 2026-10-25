import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL?.trim()) {
  console.error('DATABASE_URL is required. Add it to your environment before running this diagnostic.');
  console.error('If a database URL was previously committed here, rotate its credentials.');
  process.exit(1);
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function main() {
  console.log("=== NEON DATABASE AUDIT ===");
  const blogs = await prisma.blog.findMany({
    include: {
      category: true,
      tags: { include: { tag: true } }
    },
    orderBy: { publishedAt: 'desc' }
  });
  console.log(`Total blogs in database: ${blogs.length}`);
  for (const b of blogs) {
    console.log(JSON.stringify({
      id: b.id,
      slug: b.slug,
      status: b.status,
      title: b.title,
      publishedAt: b.publishedAt,
      category: b.category?.name,
      categorySlug: b.categorySlug,
      tags: b.tags.map(t => t.tag.name),
      metaTitle: b.metaTitle,
      metaDescription: b.metaDescription,
      canonicalUrl: b.canonicalUrl,
      wordCount: b.wordCount,
      views: b.views,
      faqsCount: Array.isArray(b.faqs) ? b.faqs.length : (b.faqs ? 'object' : 0)
    }, null, 2));
  }

  const categories = await prisma.category.findMany();
  console.log(`\n=== CATEGORIES (${categories.length}) ===`);
  for (const c of categories) {
    console.log(`- ${c.name} (/category/${c.slug})`);
  }

  const tags = await prisma.tag.findMany();
  console.log(`\n=== TAGS (${tags.length}) ===`);
  console.log(tags.map(t => t.name).join(', '));
}

main().catch(console.error).finally(() => prisma.$disconnect());
