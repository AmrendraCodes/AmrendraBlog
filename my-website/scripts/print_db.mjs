import { prisma } from '../src/lib/prisma.js';

async function main() {
  const b = await prisma.blog.findUnique({
    where: { slug: 'why-react-apps-slow-down-in-2026' }
  });
  console.log('=== FULL DB CONTENT ===');
  console.log(b.content);


}

main().catch(console.error).finally(() => prisma.$disconnect());
