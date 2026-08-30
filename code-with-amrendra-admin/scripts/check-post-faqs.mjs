import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkPost() {
  const result = await prisma.$queryRawUnsafe(
    'SELECT id, title, slug, faqs, substring(content from 1 for 500) as preview FROM "Blog" WHERE slug = $1',
    'future-of-web-development-2026'
  );
  console.log('DB Post result:');
  console.dir(result, { depth: null });
}

checkPost().finally(() => prisma.$disconnect());
