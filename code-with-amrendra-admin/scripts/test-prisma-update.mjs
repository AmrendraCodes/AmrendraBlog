import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  const faqs = [
    {
      question: "What is the biggest shift in web development in 2026?",
      answer: "The biggest shift is AI-assisted development and serverless edge computing replacing manual boilerplate workflows."
    },
    {
      question: "Will AI replace web developers?",
      answer: "No, AI acts as an accelerator, but architecture, system design, performance, and security still require human engineering."
    }
  ];

  await prisma.$executeRawUnsafe(
    'UPDATE "Blog" SET "faqs" = $1::jsonb WHERE "slug" = $2',
    JSON.stringify(faqs),
    'future-of-web-development-2026'
  );

  console.log('Updated faqs successfully with raw SQL!');

  const rows = await prisma.$queryRawUnsafe(
    'SELECT id, title, slug, faqs FROM "Blog" WHERE slug = $1',
    'future-of-web-development-2026'
  );

  console.log('Retrieved from DB:', rows);
}

test().finally(() => prisma.$disconnect());
