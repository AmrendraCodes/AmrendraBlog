import { use } from 'react';
import { getAllPosts } from '@/lib/posts';

export default function CategoryPage({ params }) {
  const { slug } = params;
  const posts = getAllPosts().filter((p) => (p.category || '').toLowerCase().includes(slug.toLowerCase()));

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Category: {slug}</h1>
      {posts.length === 0 ? (
        <p className="text-slate-600">No posts found for this category yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {posts.map((p) => (
            <li key={p.slug} className="mb-2">
              <a href={`/blog/${p.slug}`} className="text-blue-600">{p.title}</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
