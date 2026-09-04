import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STATIC_CONTENT_PATHS = new Set(["/", "/resources", "/resources/blog", "/categories"]);

function isContentPath(path: unknown): path is string {
  if (typeof path !== "string") return false;

  return (
    STATIC_CONTENT_PATHS.has(path) ||
    /^\/resources\/blog\/[^/?#]+$/.test(path) ||
    /^\/category\/[^/?#]+$/.test(path)
  );
}

export async function POST(request: NextRequest) {
  // Configure the same value in the public site and CMS deployments.
  // Keep the previous name as a fallback for existing environments.
  const secret = process.env.CMS_REVALIDATE_SECRET || process.env.PUBLIC_SITE_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { success: false, error: "CMS revalidation is not configured." },
      { status: 503 }
    );
  }

  if (request.headers.get("x-cms-revalidate-secret") !== secret) {
    return NextResponse.json(
      { success: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  let body: { paths?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const paths = Array.isArray(body.paths) ? [...new Set(body.paths.filter(isContentPath))] : [];
  if (paths.length === 0) {
    return NextResponse.json({ success: false, error: "No valid content paths supplied." }, { status: 400 });
  }

  paths.forEach((path) => revalidatePath(path));
  return NextResponse.json({ success: true, revalidatedPaths: paths });
}
