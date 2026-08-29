import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function find() {
  const posts = await prisma.blog.findMany({
    where: {
      OR: [
        { title: { contains: 'Future', mode: 'insensitive' } },
        { slug: { contains: 'future', mode: 'insensitive' } }
      ]
    },
    select: {
      id: true,
      title: true,
      slug: true,
      featuredImage: true,
      ogImage: true,
      content: true,
      excerpt: true,
      categorySlug: true,
      createdAt: true,
      updatedAt: true
    }
  });
  console.log('Found ' + posts.length + ' matching posts');
  for (const p of posts) {
    console.log('---------------------------------');
    console.log('ID:', p.id);
    console.log('Title:', p.title);
    console.log('Slug:', p.slug);
    console.log('featuredImage:', p.featuredImage);
    console.log('ogImage:', p.ogImage);
    console.log('Content length:', p.content?.length);
    console.log('Content preview (start):\n', p.content?.substring(0, 300));
    console.log('Content preview (end):\n', p.content?.substring(p.content.length - 300));
  }
}

find().catch(console.error).finally(() => prisma.$disconnect());
