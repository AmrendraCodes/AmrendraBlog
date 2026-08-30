import { getPostBySlugAsync } from '../src/lib/posts.js';

async function test() {
  const post = await getPostBySlugAsync('future-of-web-development-2026');
  console.log('Post title:', post?.title);
  console.log('Post faqs:', post?.faqs);
}

test();
