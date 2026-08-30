/**
 * In-memory sliding window rate limiter for Next.js App Router.
 * Tracks timestamps of failed attempts per key (e.g. IP address).
 */

interface RateLimitResult {
  isLimited: boolean;
  remaining: number;
  retryAfterSec: number;
}

// Global store to persist across hot reloads in development
const globalStore = globalThis as unknown as {
  rateLimitStore?: Map<string, number[]>;
};

const store: Map<string, number[]> = globalStore.rateLimitStore || new Map<string, number[]>();
if (process.env.NODE_ENV !== 'production') {
  globalStore.rateLimitStore = store;
}

/**
 * Checks if a key has exceeded maxAttempts within windowMs.
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const attempts = store.get(key) || [];

  // Filter attempts within the active sliding window
  const activeAttempts = attempts.filter((ts) => now - ts < windowMs);
  store.set(key, activeAttempts);

  if (activeAttempts.length >= maxAttempts) {
    const oldest = activeAttempts[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return {
      isLimited: true,
      remaining: 0,
      retryAfterSec,
    };
  }

  return {
    isLimited: false,
    remaining: maxAttempts - activeAttempts.length,
    retryAfterSec: 0,
  };
}

/**
 * Records a failed attempt for the given key.
 */
export function recordFailedAttempt(
  key: string,
  windowMs: number = 60 * 1000
): void {
  const now = Date.now();
  const attempts = store.get(key) || [];
  const activeAttempts = attempts.filter((ts) => now - ts < windowMs);
  activeAttempts.push(now);
  store.set(key, activeAttempts);
}

/**
 * Resets/clears the rate limit for a key (called upon successful action/login).
 */
export function resetRateLimit(key: string): void {
  store.delete(key);
}

/**
 * Extracts client IP address from standard headers in Next.js requests.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  return '127.0.0.1';
}
