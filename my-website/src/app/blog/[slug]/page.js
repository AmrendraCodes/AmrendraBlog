export default function PostPage({ params }) {
  const { slug } = params;
  return (
    <div className="prose mx-auto p-8">
      <h1>Post: {slug}</h1>
      <p>This is where the blog post content will render based on the slug.</p>
    </div>
  );
}
