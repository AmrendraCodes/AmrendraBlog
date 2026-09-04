export type PublicBlogRevalidationInput = {
  slug?: string | null;
  categorySlug?: string | null;
  previousSlug?: string | null;
  previousCategorySlug?: string | null;
};

const DEFAULT_PUBLIC_SITE_URL = "https://www.codewithamrendra.in";

export function getPublicBlogRevalidationPaths(input: PublicBlogRevalidationInput) {
  const paths = new Set(["/", "/resources", "/resources/blog", "/categories"]);

  for (const slug of [input.slug, input.previousSlug]) {
    if (typeof slug === "string" && slug.trim()) {
      paths.add(`/resources/blog/${slug.trim()}`);
    }
  }

  for (const categorySlug of [input.categorySlug, input.previousCategorySlug]) {
    if (typeof categorySlug === "string" && categorySlug.trim()) {
      paths.add(`/category/${categorySlug.trim()}`);
    }
  }

  return [...paths];
}

export async function revalidatePublicBlog(input: PublicBlogRevalidationInput) {
  // CMS_REVALIDATE_SECRET should match the public site’s secret. The legacy
  // name remains supported so existing deployments keep working.
  const secret = process.env.CMS_REVALIDATE_SECRET || process.env.PUBLIC_SITE_REVALIDATE_SECRET;
  if (!secret) {
    console.warn("CMS_REVALIDATE_SECRET is not configured; public blog cache will use its 5-minute ISR fallback.");
    return false;
  }

  const publicSiteUrl = (process.env.PUBLIC_SITE_URL || DEFAULT_PUBLIC_SITE_URL).replace(/\/$/, "");

  try {
    const response = await fetch(`${publicSiteUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cms-revalidate-secret": secret,
      },
      body: JSON.stringify({ paths: getPublicBlogRevalidationPaths(input) }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Public blog revalidation failed with HTTP ${response.status}.`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Public blog revalidation request failed:", error);
    return false;
  }
}
