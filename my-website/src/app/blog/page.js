import Link from "next/link";

// In a real app you would fetch this from src/lib/posts.js
const dummyPosts = [
  { slug: "first-post", title: "My first post" },
  { slug: "another-entry", title: "Another entry" },
];

export default function BlogPage() {
  return (
    <div className="prose mx-auto p-8">
      <h1>Blog</h1>
      <ul className="list-disc pl-6">
        {dummyPosts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
