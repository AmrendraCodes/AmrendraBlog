import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();

async function dump() {
  const post = await prisma.blog.findFirst({
    where: { slug: 'future-of-web-development-2026' }
  });
  if (!fs.existsSync('scratch')) fs.mkdirSync('scratch', { recursive: true });
  fs.writeFileSync('scratch/future_post.md', post.content, 'utf8');
  console.log('Saved to scratch/future_post.md, size:', post.content.length);
}

dump().catch(console.error).finally(() => prisma.$disconnect());
