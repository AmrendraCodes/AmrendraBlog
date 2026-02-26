import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <article className="border p-4 rounded-md hover:shadow">
      <h2 className="text-xl font-semibold">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-sm text-gray-600">{post.excerpt || "Quick summary..."}</p>
    </article>
  );
}
