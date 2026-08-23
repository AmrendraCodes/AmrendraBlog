# Phase 1 — Baseline Repository Audit Report

**Date:** 2026-08-23T23:05:00+05:30  
**Git Branch:** `main`  
**Git Working Tree:** Clean  
**Node.js Version:** `v24.19.0`  
**npm Version:** `11.17.0`  

---

## 1. Repository File Metrics

| Metric | Repository Root | `my-website` | `code-with-amrendra-admin` | `vanilla-blog` |
| :--- | :--- | :--- | :--- | :--- |
| **Total Non-Generated Files** | 255 | 158 | 92 | 3 |
| **Total Size (Bytes / MB)** | 11.35 MB | 5.68 MB | 5.65 MB | 14.4 KB |
| **JavaScript Files (`.js`, `.mjs`)** | 103 | 92 | 10 | 1 |
| **TypeScript Files (`.ts`, `.tsx`)** | 62 | 10 | 52 | 0 |
| **CSS Files (`.css`)** | 6 | 4 | 1 | 1 |
| **Image Files (`.png`, `.jpg`, `.jpeg`, `.svg`, `.ico`)** | 44 | 26 | 18 | 0 |
| **Markdown / Docs (`.md`, `.pdf`, `.txt`)** | 17 | 14 | 3 | 0 |
| **Database / Prisma (`.prisma`, `.db`)** | 3 | 1 | 2 | 0 |
| **Config / JSON (`.json`, `.tsbuildinfo`, `.xml`, etc.)** | 20 | 11 | 6 | 1 |

---

## 2. Dependency Metrics

### `my-website` (Next.js 16.1.6, React 19.2.3)
- **Production Dependencies (30):** `@next/third-parties`, `@prisma/client`, `@tailwindcss/typography`, `bcryptjs`, `cloudinary`, `clsx`, `framer-motion`, `gray-matter`, `highlight.js`, `katex`, `lenis`, `lucide-react`, `mermaid`, `next`, `next-themes`, `react`, `react-dom`, `react-markdown`, `react-medium-image-zoom`, `recharts`, `rehype-highlight`, `rehype-katex`, `rehype-raw`, `rehype-slug`, `remark-gfm`, `remark-math`, `resend`, `tailwind-merge`, `three`, `zod`
- **Dev Dependencies (9):** `@next/bundle-analyzer`, `@tailwindcss/postcss`, `@types/bcryptjs`, `@types/node`, `cross-env`, `eslint`, `eslint-config-next`, `prisma`, `tailwindcss`
- **Total Dependencies:** 39
- **Package Manager:** npm (with `package-lock.json`)

### `code-with-amrendra-admin` (Next.js 16.3.0, React 19.2.8)
- **Production Dependencies (11):** `@prisma/client`, `bcryptjs`, `clsx`, `lucide-react`, `next`, `react`, `react-dom`, `react-hook-form`, `recharts`, `tailwind-merge`, `zod`
- **Dev Dependencies (10):** `@tailwindcss/postcss`, `@types/bcryptjs`, `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`, `prisma`, `tailwindcss`, `typescript`
- **Total Dependencies:** 21
- **Package Manager:** npm (with `package-lock.json`)

---

## 3. Code Quality & Build Baseline

### `my-website`
- **Lint (`npm run lint`):** PASS (0 errors, 0 warnings)
- **Typecheck (`npx tsc --noEmit`):** PASS (0 errors)
- **Next.js Production Build (`npx next build`):** PASS (30 routes compiled statically and dynamically)
- **Tests:** N/A (no automated test runner defined in package.json)

### `code-with-amrendra-admin`
- **Lint (`npm run lint`):** PASS (0 errors, 63 pre-existing warnings in `@typescript-eslint/no-explicit-any` and unused variables)
- **Typecheck (`npx tsc --noEmit`):** PASS (0 errors)
- **Build (`npm run build`):** PASS (Prisma client generated, 20 routes compiled)
- **Tests:** N/A (no automated test runner defined in package.json)

---

## 4. Key Pre-Existing Issues Identified for Phase 1
1. `code-with-amrendra-admin/prisma/dev.db` is an orphan 228 KB SQLite database.
2. `code-with-amrendra-admin/CLAUDE.md` is an empty 12-byte file.
3. 17 duplicate files found via hash verification (including ~6MB identical images).
4. Image filenames contain spaces/parentheses (`Profile photo.jpeg`, `download (1).png`).
5. Audit and report files residing in `my-website/` root (`Audit_Report.md`, `Audit_Report.pdf`, `lint_output.txt`).
6. `generate-icons.js` residing in `my-website/` root.
7. Unused dependencies in both applications (`recharts`, `cloudinary`, `resend`, `react-hook-form`).
8. `jsconfig.json` and `tsconfig.json` coexistence in `my-website`.
9. `my-website/src/lib/services.js` (914 lines of static data) placed in `src/lib/`.
