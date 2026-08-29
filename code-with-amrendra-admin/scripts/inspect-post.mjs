import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const posts = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { tags: { include: { tag: true } }, category: true }
  });

  for (const post of posts) {
    console.log('==============================================');
    console.log('ID:', post.id);
    console.log('Title:', post.title);
    console.log('Slug:', post.slug);
    console.log('featuredImage:', post.featuredImage);
    console.log('ogImage:', post.ogImage);
    console.log('excerpt:', post.excerpt);
    console.log('Content length:', post.content?.length);
    console.log('Tags:', post.tags?.map(t => t.tag?.name));
    console.log('Content full:\n', post.content);
  }
}

check().catch(console.error).finally(() => prisma.$disconnect());
