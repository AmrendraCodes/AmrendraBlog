import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

export function countWords(content: string): number {
  return content ? content.trim().split(/\s+/).length : 0;
}

export function formatDate(dateStr: string | Date | null | undefined): string {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export interface SafeJsonResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { message: string; code?: string };
}

export async function safeJson<T = unknown>(res: Response): Promise<SafeJsonResponse<T>> {
  try {
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await res.json()) as SafeJsonResponse<T>;
    }
    const text = await res.text();
    return {
      success: false,
      error: { message: `Server returned non-JSON response (${res.status}): ${text.substring(0, 60)}` },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to parse server response';
    return {
      success: false,
      error: { message },
    };
  }
}
