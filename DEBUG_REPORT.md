# Website Debugging Report

Audit date: 2026-09-04  
Scope: `my-website` public Next.js app, its linked `code-with-amrendra-admin` CMS app, and read-only production checks against `https://www.codewithamrendra.in` and the configured CMS origin.

## Executive Summary

| Area | Result |
|---|---|
| Public production routes | 36/36 URLs in `sitemap.xml` returned HTTP 200 |
| Negative-route behavior | Blog, service, and case-study unknown slugs return 404; an unknown category returns 200 |
| Redirects | `/blog` and `/case-studies` each issue one 308 redirect to their `/resources/*` replacement |
| Public build / lint | Lint passed; production build passed after Google Fonts was reachable |
| CMS build / lint | Lint passed; production-build artifacts were generated; Next.js reports the `middleware` convention deprecation |
| CMS/public data boundary | Broken: an unauthenticated CMS request returns full post rows; an unauthenticated upload handler accepts uploads |
| Production blockers | 2 confirmed P0 issues |

The two immediate problems are content-control bypasses:

1. A CMS post that does not exist in PostgreSQL can still render from a repository Markdown file. This was verified live: `/resources/blog/docker-vs-kubernetes-practical-guide` returns 200 but is absent from the production sitemap/database-driven blog list.
2. The CMS API exposes post lists and individual post records without a session, and `/api/upload` has no authentication before spending the Vercel Blob write token.

## Architecture Map

```text
Browser request
  -> my-website/middleware.js (pass-through; excludes /api)
  -> App Router page or route handler
  -> public content helpers in src/lib/posts.js
       -> Prisma/PostgreSQL when available
       -> filesystem content/posts Markdown fallback
  -> server component and client components
  -> generateMetadata / JSON-LD
  -> ISR/CDN response (most public content: revalidate = 300)

CMS browser request
  -> code-with-amrendra-admin/src/middleware.ts (page redirects only; not /api)
  -> App Router API handler
  -> getAuthSession() where implemented
  -> Prisma/PostgreSQL and optional Vercel Blob / Resend
  -> revalidatePublicBlog() POST to public /api/revalidate
```

The public site is database-first for blog content. `getAllPostsAsync()` queries published rows; `getPostBySlugAsync()` queries a row by slug. Both then use Markdown as a fallback. Case studies and services are repository data. The CMS is a separate deployment using the same PostgreSQL schema and calls the public site's signed revalidation route after post writes.

## Build, Static Analysis, and Environment

| Check | Result | Evidence / impact |
|---|---|---|
| `my-website: npm run lint` | PASS | No lint diagnostics. |
| `my-website: npm run build` | PASS with local configuration warning | Compilation and static generation completed. `DATABASE_URL` was absent locally, so `getAllPostsAsync()` logged Prisma errors and used Markdown. Initial restricted-network attempt failed only while downloading Google Fonts; the network-enabled retry compiled successfully. |
| `code-with-amrendra-admin: npm run lint` | PASS | Dependencies were installed with `npm ci`; no lint diagnostics. |
| `code-with-amrendra-admin: npm run build` | PASS with warning | `.next/BUILD_ID` and complete build manifests were generated. Next.js 16.3 warns that the `middleware` file convention is deprecated in favor of `proxy`. |
| Type checking | PASS through both `next build` commands | Neither package defines a separate `typecheck` script. |
| Import casing audit | PASS | 108 public-site and 73 CMS source files were checked against actual filesystem casing; no mismatch was found. |

No local `.env`, `.env.local`, `.env.production`, or `.env.development` file exists in either app. Secret values were not inspected. Required production values must be checked in Vercel, not inferred from the local workspace.

| App | Environment names referenced in code | Local state |
|---|---|---|
| Public | `DATABASE_URL`, `CMS_REVALIDATE_SECRET`, `PUBLIC_SITE_REVALIDATE_SECRET`, `INDEXNOW_KEY`, `ADMIN_APP_URL` | Missing locally |
| CMS | `DATABASE_URL`, `BLOB_READ_WRITE_TOKEN`, `CMS_REVALIDATE_SECRET`, `PUBLIC_SITE_REVALIDATE_SECRET`, `PUBLIC_SITE_URL`, `CRON_SECRET`, `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_INITIAL_*`, `NEXT_PUBLIC_*` | Missing locally |

## Critical Issues

### Issue 1 — CMS content controls are bypassed by the public Markdown fallback

Severity: P0 — production content blocker  
URL: `https://www.codewithamrendra.in/resources/blog/docker-vs-kubernetes-practical-guide`  
Files: `my-website/src/lib/posts.js:234-282`, `my-website/src/lib/posts.js:118-164`  
Function: `getPostBySlugAsync()`

Expected: A slug absent from the published CMS database must call `notFound()` and return HTTP 404. Deleting, unpublishing, or renaming in the CMS must remove the public article.

Observed: The above URL returns HTTP 200 in production (1.736s) but is not among the 36 URLs in the live database-driven sitemap. The matching Markdown file exists at `my-website/content/posts/docker-vs-kubernetes-practical-guide.md`.

Execution path:

```text
Request
-> middleware ✅
-> resources/blog/[slug]/page.tsx ✅
-> getPostBySlugAsync(slug)
-> prisma.blog.findUnique({ slug }) returns null
-> getPostBySlug(slug) filesystem fallback ✅
-> PostPage renders ✅
-> HTTP 200 ❌
```

Root cause: `getPostBySlugAsync()` uses the fallback not only after a database error, but also after a successful database lookup that simply returns no row. The query also has no `status: "PUBLISHED"` constraint, so a guessed draft/scheduled slug can render directly from the database.

Fix: In a configured production database environment, distinguish a failed database query from a missing/unpublished record. Return `null` for the latter and query only `status: "PUBLISHED"`. Restrict filesystem fallback to explicit local/development/no-database use, or make Markdown an intentional, separately published source.

### Issue 2 — CMS APIs expose post data and permit unauthenticated Blob uploads

Severity: P0 — data exposure and storage-abuse risk  
Live endpoints: `https://amrendra-cms-blog-five.vercel.app/api/blogs` and `/api/blogs/[id]`  
Files: `code-with-amrendra-admin/src/app/api/blogs/route.ts:55-110`, `code-with-amrendra-admin/src/app/api/blogs/[id]/route.ts:55-100`, `code-with-amrendra-admin/src/app/api/upload/route.ts:11-139`

Observed: An unauthenticated production GET to `/api/blogs` returns HTTP 200 with 10 full post records, including content, status, author-related fields, and IDs. An unauthenticated GET to an individual `/api/blogs/[id]` also returned a post record. The current returned rows are all `PUBLISHED`; the code has no status filter, so future drafts and scheduled posts are exposed too.

Execution path:

```text
Request to /api/blogs
-> CMS middleware does not match /api
-> GET handler does not call getAuthSession()
-> prisma.blog.findMany() ✅
-> HTTP 200 with full rows ❌
```

`/api/upload` similarly reaches `put(..., { token: BLOB_READ_WRITE_TOKEN })` without `getAuthSession()` or role authorization. Any caller can consume Blob storage and obtain a public asset URL if the deployment token is configured.

Fix: Require a valid session before every CMS post-list/detail GET and before upload parsing. Enforce an appropriate role (`ADMIN`/`EDITOR` for upload and all-blog reads; limit `AUTHOR` to own records if needed). Add a distributed rate limit and retain server-side validation.

## Route Status Report

### Indexed routes (live `sitemap.xml`)

All 36 sitemap entries returned HTTP 200 with no redirect loop. Sampled response time range: 0.485–1.755s; mean 1.000s and median 1.054s. This is a single external sample, not Core Web Vitals or a load test.

| URL group | Route file / data source | Actual |
|---|---|---|
| `/`, `/about`, `/contact`, `/privacy`, `/terms` | `src/app/**/page.js`; static + blog helper where used | 200 |
| `/services`, six `/services/[slug]` URLs | `src/app/services/page.js`, `[slug]/page.js`; `servicesData.js` | 200 |
| `/resources`, `/resources/blog`, `/resources/case-studies` | App Router pages; blog DB/Markdown and case-study files | 200 |
| 10 sitemap blog URLs | `resources/blog/[slug]/page.tsx`; production database | 200 |
| Three case studies | `resources/case-studies/[slug]/page.tsx`; Markdown | 200 |
| `/categories`, seven sitemap categories | `categories/page.js`, `category/[slug]/page.js`; blog data | 200 |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.js`, `public/robots.txt` | 200 |

The complete sitemap inventory was: root; services/resources hubs; about/contact/categories/privacy/terms; six services; ten blog posts; three case studies; and seven categories. No static internal destination was broken: 22 literal internal links extracted from source/content all resolve to this healthy set.

### Dynamic / legacy tests

| URL | Expected | Actual | Finding |
|---|---:|---:|---|
| `/resources/blog/not-a-real-post-audit-2026` | 404 | 404 | Correct `notFound()` path. |
| `/services/not-a-real-service-audit-2026` | 404 | 404 | Correct. |
| `/resources/case-studies/not-a-real-case-study-audit-2026` | 404 | 404 | Correct. |
| `/category/not-a-real-category-audit-2026` | 404 | 200, cache HIT | Soft 404; see Issue 3. |
| `/blog` | 308 → `/resources/blog` | 308 → 200 | Correct single permanent redirect. |
| `/case-studies` | 308 → `/resources/case-studies` | 308 → 200 | Correct single permanent redirect. |
| `/resources/blog/docker-vs-kubernetes-practical-guide` | 404 if CMS does not publish it | 200 | Confirmed P0 Markdown fallback bypass. |

### Issue 3 — unknown categories are soft 404 pages

Severity: P1 — SEO and status-code bug  
URL: `/category/not-a-real-category-audit-2026`  
File: `my-website/src/app/category/[slug]/page.js:58-117`  
Function: `CategoryPage()`

Expected: `notFound()` and HTTP 404 for a category slug with no matching published posts/category.

Actual: the page filters to an empty array and renders “No articles found” with HTTP 200. Vercel caches this response (`X-Vercel-Cache: HIT`).

Execution stops at the missing decision branch: after `posts` is computed at line 61, no existence check occurs before rendering line 100. Add a category existence check and call `notFound()` for unknown slugs; use a separate intentional empty-category model only if empty categories should be public.

## API Status Report

Mutating production endpoints were not invoked with valid payloads or credentials to avoid creating contacts, subscribers, files, CMS records, or revalidation events. Their validation and status branches were statically audited. Three CMS GET endpoints were safely checked live.

| Endpoint / methods | Observed or source behavior | Status |
|---|---|---|
| Public `/api/contact` POST | Validated input; 201 on create, 400 invalid JSON/fields, 429 local limit, 500 DB error | Code-audited; rate limit is per-instance |
| Public `/api/newsletter` POST | 201 new, 200 duplicate, 400 invalid, 429 local limit, 500 DB error | Code-audited; rate limit is per-instance |
| Public `/api/track` GET/POST | POST returns 200 even when database writes fail silently; GET exposes only instance-local counters | P2 observability defect |
| Public `/api/revalidate` POST | 401 wrong secret, 400 invalid paths, 503 missing secret | Code-audited |
| Public `/api/indexnow` POST | 400 missing URL, 500 missing key, 502 failed upstream response; network exception is not caught and URL host is not validated | P2 hardening needed |
| CMS `/api/blogs` GET | Live unauthenticated 200, full records | P0 |
| CMS `/api/blogs` POST | Session required; validates schema; publishes/revalidates | Code-audited |
| CMS `/api/blogs/[id]` GET | Live unauthenticated 200, full record | P0 |
| CMS `/api/blogs/[id]` PUT/DELETE | Session and role/ownership checks present | Code-audited |
| CMS `/api/upload` POST | No session or role check before Blob write | P0 |
| CMS categories, tags, media, users, contacts, settings, SEO, analytics APIs | Mutations generally call `getAuthSession()`; several read handlers are public by implementation | Code-audited; make read policy explicit |
| CMS auth endpoints | Login, logout, reset, and forgot-password handlers exist; login uses per-instance rate limit | Code-audited |
| CMS scheduled-publication GET/POST | Validates `CRON_SECRET` only when it exists | P1 conditional risk |

### Silent failure findings

| File / lines | Hidden failure | Effect | Safer behavior |
|---|---|---|---|
| `my-website/src/app/api/track/route.js:27-33,45-72` | Empty catches swallow blog-view and visitor/page-view DB failures | Client gets `{ success: true }`; analytics silently becomes incomplete | Log a safe error code, emit metrics, and return a degradation indicator without failing page navigation. |
| `code-with-amrendra-admin/src/app/api/blogs/route.ts:212-222` and `[id]/route.ts:247-265` | Cache errors and `revalidatePublicBlog()` false result are ignored | CMS returns success while public pages stay stale up to ISR expiry | Persist/return revalidation status and retry or alert. |
| `code-with-amrendra-admin/src/app/api/categories/route.ts:78-82,139-142,220-226` | Only local admin revalidation is attempted; cross-deployment public revalidation is absent | Public category/hub cache can stay stale | Call the public signed revalidation helper with old/new category paths. |
| `code-with-amrendra-admin/src/app/api/auth/reset-password/route.ts:121-149` | Password update, token deletion, and session invalidation errors are swallowed | Success can be returned when the security-sensitive state transition did not finish | Use a transaction and return failure on critical writes. |

## CMS Data Flow and Cache Report

```text
CMS BlogForm
-> /api/blogs or /api/blogs/[id]
-> Zod validation + markdown formatter
-> Prisma Blog / Category / Tag records
-> revalidatePublicBlog(paths)
-> public /api/revalidate
-> revalidatePath()
-> public ISR page (300 seconds)
```

| Field group | Save path | Public fetch/render | Status |
|---|---|---|---|
| Title, slug, body, excerpt, description | CMS `blogSchema` → `Blog` | `posts.js` → blog page | Works for published DB rows; fallback can resurrect removed content. |
| Featured/OG image, canonical, meta title/description | CMS `Blog` fields | `generateMetadata()` and JSON-LD | Works structurally; canonical host consistency needs repair. |
| Category and tags | CMS relations / `categorySlug` | list, category page, related posts | Works; cross-site category revalidation is incomplete. |
| FAQs | JSON field normalized in `posts.js` | accordion and FAQPage JSON-LD | Normalization supports multiple shapes; no failure observed. |
| Publish/schedule | `status`, `publishedAt`, cron | `getAllPostsAsync()` only selects PUBLISHED | List correctly filters; detail lookup does not. |

Public content uses `revalidate = 300` on the home, blog index, category pages, and blog detail. The sampled home/blog/sitemap headers were CDN HITs, which is appropriate. Revalidation gaps are:

- The CMS ignores a failed cross-deployment revalidation response.
- CMS category mutations never call the public revalidation helper.
- Public `/api/revalidate` does not allow `/sitemap.xml`; a newly published post/category can leave the generated sitemap stale until normal regeneration.
- `sitemap.js` assigns `new Date()` as `lastModified` to static pages and categories on every generation, producing artificial modification dates.

## SEO and Structured Data

| Severity | File / line | Observed behavior | Fix |
|---|---|---|---|
| P2 | `src/lib/schema.js:41,173` | JSON-LD Person and BlogPosting publisher logo use `https://codewithamrendra.in/Profile%20photo.jpeg`. The production URL returns 404; actual asset is `/profile-photo.jpeg`. | Use canonical `https://www.codewithamrendra.in/profile-photo.jpeg` (and a real organization logo for publisher). |
| P3 | `src/app/services/[slug]/page.js:46,74-101`; `src/app/category/[slug]/page.js:70-78`; `src/lib/schema.js:25,64,68-69` | Canonicals are `www`, but some Open Graph/schema URLs use the naked host. Live service page canonical is `www` while `og:url` is non-`www`. | Use `siteMetadata.siteUrl` everywhere. |
| P3 | `src/app/layout.js:112-139`, `src/app/page.js:86-88`, `src/lib/schema.js:35-54` | Home renders two Person schemas: one inline in layout and another from `getPersonSchema()`. | Keep one authoritative Person JSON-LD block. |
| P3 | `src/lib/schema.js:24-26` | SearchAction targets legacy `/blog?search=...`; the current canonical blog route is `/resources/blog`, and the client filter is not shown as a server search response. | Point to a real search endpoint or remove SearchAction. |
| P3 | `src/config/seo.js:3` | Generic fallback description says “A personal blog…” while page/layout marketing metadata describes an engineering agency. | Align the fallback with current positioning. |

Canonical tags, Open Graph data, and JSON-LD scripts are rendered on sampled home, service, blog, and category pages. No metadata function threw in the build or live samples. The malformed asset and host inconsistency are confirmed live.

## Rendering, Errors, Assets, and Security Notes

- The public app has `not-found.js` but no route `error.js`, `global-error.js`, or `loading.js`. A future uncaught page/data exception will use the generic production error behavior rather than a scoped recovery UI.
- No hydration warning, server/client boundary violation, invalid import, or lint error appeared in either production build. A real browser console/mobile interaction test was not run because this audit had no authenticated browser session or visual-test harness; this is a coverage limit, not a pass assertion.
- `MarkdownRenderer.js` enables `rehypeRaw` without a sanitization plugin. CMS users who can publish content can inject arbitrary raw HTML into rendered articles. Treat CMS content as trusted only if roles are strictly controlled; otherwise sanitize with a defined allowlist.
- Remote `next/image` host allowlists cover the Vercel Blob domains used by the CMS. The confirmed broken schema asset is a filename/URL issue, not `next/image` configuration.
- Public contact/newsletter/login rate limits are in memory. On Vercel, limits reset per instance/deployment and are bypassable by distribution; use a shared store or edge rate limiter for abuse protection.

## Performance Findings

The live external timing sample did not show an outright slow/failing page. The slowest sampled indexed route was `/resources/blog/ai-agents-replacing-saas-seats` at 1.755s.

Code-level avoidable work exists on a blog detail request:

```text
generateMetadata() -> getPostBySlugAsync()        (database lookup)
PostPage()        -> getPostBySlugAsync()         (database lookup again)
PostPage()        -> getRelatedPostsAsync()        (get all published posts)
PostPage()        -> getPrevNextPostsAsync()       (get all published posts again)
```

Files: `src/app/resources/blog/[slug]/page.tsx:29-31,80-91`; `src/lib/posts.js:171-221,234-282,375-442`.

Use a request-memoized/cache-tagged published-post reader, fetch related and previous/next work in parallel, and avoid fetching the full post collection twice. Add server-safe timing around the query boundary if production monitoring is desired; do not leave verbose data logs in public requests.

## Production vs Local Differences

| Behavior | Local build | Production evidence | Risk |
|---|---|---|---|
| Blog source | No `DATABASE_URL`; filesystem fallback produced eight Markdown posts | Live sitemap has ten database-derived blog URLs, three not present in local Markdown; one local-only Markdown URL renders publicly | Local preview/build can mask CMS data errors and deploy stale files. |
| Fonts | Restricted sandbox could not fetch Google Fonts | Network-enabled build succeeded | Not an app code failure; CI/Vercel needs egress to Google Fonts at build time. |
| CMS secrets | No local env files | Not readable from Vercel during audit | Verify all listed names in production; especially DB, revalidation, Blob, and cron secrets. |
| Filesystem case | Windows test | Automated casing audit clean | No current Linux/Vercel import casing defect found. |

## Recommended Fix Order

1. P0: Stop public Markdown fallback after a successful missing DB lookup; only return published database posts in detail lookups.
2. P0: Require CMS authentication/authorization for `/api/blogs` GET, `/api/blogs/[id]` GET, and `/api/upload` POST; rotate the Blob token if unexpected uploads are suspected.
3. P1: Make unknown categories return `notFound()`/404.
4. P1: Require `CRON_SECRET` in production and fail closed if absent.
5. P2: Make CMS-to-public revalidation observable/retriable; include category and sitemap invalidation.
6. P2: Repair schema image URLs, unify on the `www` canonical host, and remove duplicate/legacy schema entries.
7. P2: Add route-level error boundaries and replace silent analytics/auth catches with safe diagnostics.
8. P3: De-duplicate blog data queries, use a shared rate limiter, sanitize untrusted Markdown, and modernize the CMS `middleware` convention.

## Remediation Applied Locally (pending commit and deployment)

The audit findings above describe the live deployment at audit time. The following safe source fixes were applied after the report was created; they are not live until deployed.

| Finding | Local remediation |
|---|---|
| P0 Markdown fallback bypass | `getAllPostsAsync()` and `getPostBySlugAsync()` now use Markdown only when `DATABASE_URL` is absent. With a configured database, a query failure returns an empty/null result and a detail query selects only `PUBLISHED` rows. |
| P0 CMS post exposure | CMS post list/detail GET handlers now require a session. Authors are restricted to their own posts; editors/admins can read all. Detail author data is selected explicitly, excluding password hashes. |
| P0 public upload | `/api/upload` now requires an authenticated CMS session before parsing a file or using the Blob token. |
| P1 category soft 404 | Unknown category pages now call `notFound()`. |
| P2/P3 schema URLs | Structured-data image/logo URLs now use the canonical `www` host and existing assets; the invalid SearchAction was removed because the blog filter does not consume URL query parameters. Service/category schema URLs now use `www`. |

Re-run the public and CMS production builds after committing. Then deploy both projects and repeat the live route/API checks: the legacy Markdown-only slug should become 404, unknown categories should become 404, and unauthenticated CMS post GETs/upload POST should become 401.

Post-fix verification: public lint and a fresh production build passed. CMS lint and `tsc --noEmit` passed. The CMS post-fix `next build` entered static generation but did not produce `BUILD_ID` within the bounded local wait, so its three audit-owned workers were stopped. This is a local build-completion limitation; the pre-fix CMS build did produce its full build artifact. Run the CMS build in Vercel/staging with its production environment before release.

## Verification Performed / Remaining Coverage

Performed: architecture/source audit, public and CMS lint/build, environment-name audit, import-case audit, sitemap crawl, static link destination crawl, redirect/404 checks, production cache/header checks, metadata/schema asset checks, and read-only CMS API access checks.

Not performed to avoid unsafe writes or because no authenticated visual environment was provided: valid contact/newsletter submissions, CMS create/update/delete/upload actions, signed revalidation mutation, scheduled-publication mutation, database index inspection, authenticated CMS role matrix, browser console capture, and viewport screenshots. These need a staging database/account and should be run after the P0 fixes.
