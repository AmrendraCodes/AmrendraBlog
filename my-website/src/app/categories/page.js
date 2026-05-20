export default function CategoriesPage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <p className="text-slate-600 mb-6">Browse content by category. This is a placeholder categories page.</p>
      <ul className="list-disc pl-6 text-slate-700">
        <li><a href="/category/react" className="text-blue-600">React</a></li>
        <li><a href="/category/ai-agents" className="text-blue-600">AI Agents</a></li>
        <li><a href="/category/saas" className="text-blue-600">SaaS Architecture</a></li>
        <li><a href="/category/devops" className="text-blue-600">DevOps</a></li>
      </ul>
    </main>
  );
}
