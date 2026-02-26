import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">Home</Link>
        <div className="space-x-4">
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
