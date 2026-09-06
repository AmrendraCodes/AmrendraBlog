import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_COASWcxg4N5r@ep-still-salad-aynruclp-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require"
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
