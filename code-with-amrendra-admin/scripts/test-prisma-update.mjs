import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  try {
    const updated = await prisma.blog.update({
      where: { slug: 'future-of-web-development-2026' },
      data: {
        faqs: [
          { question: 'What is Web Dev in 2026?', answer: 'It is AI-assisted and edge-first.' }
        ]
      } as any,
    });
    console.log('Updated result:', updated);
  } catch (err) {
    console.error('Update error:', err);
  }
}

test().finally(() => prisma.$disconnect());
