import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // Customize link behavior: Next.js Link for internal routes, standard a for external
        a: ({ href, children, ...props }) => {
          if (href && (href.startsWith("/") || href.startsWith("#"))) {
            return (
              <Link href={href} {...props}>
                {children}
              </Link>
            );
          }
          return (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          );
        },
        // Wrap tables for horizontal responsiveness on mobile and apply premium styling
        table: ({ children, ...props }) => (
          <div className="overflow-x-auto my-8 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm" {...props}>
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => (
          <thead className="bg-slate-50 dark:bg-slate-900/50" {...props}>
            {children}
          </thead>
        ),
        th: ({ children, ...props }) => (
          <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-slate-100" {...props}>
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td className="px-6 py-4 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/50" {...props}>
            {children}
          </td>
        ),
        // Style task list checkboxes to match modern UI
        input: ({ type, checked, ...props }) => {
          if (type === "checkbox") {
            return (
              <input
                type="checkbox"
                checked={checked}
                disabled
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 mr-2 accent-blue-600 inline-block align-middle"
                {...props}
              />
            );
          }
          return <input type={type} checked={checked} {...props} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
