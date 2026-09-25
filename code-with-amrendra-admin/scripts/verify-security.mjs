import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');
const checks = [];

function assertCheck(name, condition) {
  checks.push({ name, passed: Boolean(condition) });
}

const posts = read('../my-website/src/lib/posts.js');
assertCheck(
  'DB-configured blog reads do not use the Markdown fallback',
  posts.includes('if (!process.env.DATABASE_URL)') &&
    posts.includes('where: { slug, status: "PUBLISHED" }') &&
    posts.includes('    return null;')
);

const categoryPage = read('../my-website/src/app/category/[slug]/page.js');
assertCheck('Unknown categories call notFound()', categoryPage.includes('if (posts.length === 0)') && categoryPage.includes('notFound();'));

for (const route of [
  'src/app/api/blogs/route.ts',
  'src/app/api/blogs/[id]/route.ts',
  'src/app/api/upload/route.ts',
  'src/app/api/media/upload/route.ts',
]) {
  const source = read(route);
  const handlers = [...source.matchAll(/export async function (GET|POST|PUT|DELETE|PATCH)[\s\S]*?(?=export async function|$)/g)];
  assertCheck(
    `${route} authenticates every exported handler before its protected operation`,
    handlers.length > 0 && handlers.every(([handler]) => handler.includes('getAuthSession()'))
  );
}

const cron = read('src/app/api/cron/publish-scheduled/route.ts');
assertCheck('Production cron fails closed when CRON_SECRET is missing', cron.includes("process.env.NODE_ENV === 'production' && !cronSecret") && cron.includes('{ status: 503 }'));
assertCheck('Cron accepts only the Authorization bearer secret', cron.includes('authHeader === `Bearer ${cronSecret}`') && !cron.includes('searchParams.get(\'secret\')'));

for (const route of [
  'src/app/api/media/route.ts',
  'src/app/api/categories/route.ts',
  'src/app/api/tags/route.ts',
  'src/app/api/seo/route.ts',
  'src/app/api/settings/route.ts',
]) {
  const source = read(route);
  assertCheck(`${route} protects its GET handler`, source.indexOf('getAuthSession()') < source.indexOf('prisma.'));
}

const failed = checks.filter(({ passed }) => !passed);
for (const check of checks) console.log(`${check.passed ? 'PASS' : 'FAIL'} ${check.name}`);
if (failed.length > 0) process.exitCode = 1;