# Phase 2 — Production-Safe Frontend Code Refactoring Plan

**Author:** Senior Human Frontend Engineer  
**Date:** 2026-08-23T23:27:00+05:30  
**Target Repository:** `AmrendraBlog` (`code-with-amrendra-admin/` & `my-website/`)  

---

## 1. Executive Summary & Goals

Phase 2 focuses on high-impact architectural refactoring across both the Next.js Admin CMS and the Public Website without modifying product behavior, breaking APIs, or introducing regressions.

### Key Objectives:
1. **Deduplicate Blog CMS Form Logic:** Consolidate `content/blog/new/page.tsx` (591 LOC) and `content/blog/[id]/edit/page.tsx` (481 LOC) into a unified, type-safe `<BlogForm />` component.
2. **Modularize Large Frontend Feature Components:** Break down monolithic page/client components (`HomeClient.js`, `Header.js`, `BlogPageClient.js`) into cohesive feature slices with single responsibilities.
3. **Modularize Admin Management Pages:** Extract modular UI and modal components for `media/page.tsx`, `users/page.tsx`, and `content/categories/page.tsx`.
4. **Optimize Markdown Rendering:** Ensure heavy diagram/math dependencies do not bloat initial client bundles.

---

## 2. Baseline Status Before Refactoring

```text
Admin (code-with-amrendra-admin):
- Lint: PASS (0 errors, 63 pre-existing any/unused warnings)
- Typecheck: PASS (0 errors)
- Build: PASS (20 routes)
- Automated Tests: N/A

Website (my-website):
- Lint: PASS (0 errors)
- Typecheck: PASS (0 errors)
- Build: PASS (30 routes)
- Automated Tests: N/A
```

---

## 3. Detailed Refactoring Specifications

---

### Target 1: Admin Blog Form Consolidation (`BlogForm.tsx`)
- **Current Files:**
  - `code-with-amrendra-admin/src/app/content/blog/new/page.tsx` (591 LOC)
  - `code-with-amrendra-admin/src/app/content/blog/[id]/edit/page.tsx` (481 LOC)
- **Problem:** ~85% code duplication across state, markdown formatting toolbar, SEO fields, category selector, tag handling, validation, preview mode, and API submission.
- **Architectural Solution:**
  - Create `code-with-amrendra-admin/src/components/blog/BlogForm.tsx`.
  - Extract subcomponents if appropriate (e.g. `MarkdownToolbar.tsx`, `SeoAccordion.tsx`).
  - Pass `mode="create" | "edit"`, `initialData?: BlogPost`, and `onSuccess` callback.
  - Simplify `new/page.tsx` and `[id]/edit/page.tsx` into thin route wrappers (~40-60 LOC each).
- **Behavior Preserved:** Auto-slugification, smart interlinking formatter API call, markdown live preview, tag parsing, status transitions (`DRAFT`, `PUBLISHED`, `SCHEDULED`), error toasts.

---

### Target 2: Homepage Feature Modularization (`HomeClient.js`)
- **Current File:** `my-website/src/components/HomeClient.js` (441 LOC)
- **Problem:** Combines hero assembly, marquee ticker, legacy comparison bento, 3D tilt core services grid, process timeline, case study showcase, comparison table, pricing, and magnetic CTA banner in one large file.
- **Architectural Solution:**
  - Extract `src/components/home/ServicesTicker.js`
  - Extract `src/components/home/EngineeringDifferenceSection.js`
  - Extract `src/components/home/CoreServicesSection.js`
  - Extract `src/components/home/ProcessTimelineSection.js`
  - Extract `src/components/home/HomeCtaBanner.js`
  - Streamline `HomeClient.js` to serve as a clean declarative section orchestrator (~60 LOC).
- **Behavior Preserved:** All animations (`framer-motion`, `ScrollReveal`, `TiltCard`, `MagneticButton`), dynamic SSR exclusions, typography, styling tokens.

---

### Target 3: Header & Navigation Architecture (`Header.js`)
- **Current File:** `my-website/src/components/Header.js` (369 LOC)
- **Problem:** Combines desktop floating pill nav, animated mobile full-screen slide drawer, nested accordions, theme toggle, and keyboard escape listeners.
- **Architectural Solution:**
  - Extract `src/components/header/DesktopNav.js`
  - Extract `src/components/header/MobileNavDrawer.js`
  - Maintain `Header.js` as the controller managing scroll visibility, backdrop blur, and open/close state.
- **Behavior Preserved:** Dynamic slide-up on scroll down, slide-in mobile navigation drawer, dropdown hover/click states, accessibility attributes (`role="banner"`, `aria-label`).

---

### Target 4: Blog Page Filter & Listing Modularization (`BlogPageClient.js`)
- **Current File:** `my-website/src/components/blog/BlogPageClient.js` (383 LOC)
- **Problem:** Contains debounced search logic, category filtering, tag filtering, sorting, pagination calculation, empty state UI, and 3 sidebar cards (popular posts, tag cloud, newsletter).
- **Architectural Solution:**
  - Extract `src/components/blog/BlogGrid.js` (Grid items + pagination controls)
  - Extract `src/components/blog/BlogSidebar.js` (Popular posts + tags cloud + newsletter card)
  - `BlogPageClient.js` coordinates search state and filter derivations.
- **Behavior Preserved:** Debounced query execution, instant category/tag switching, pagination bounds, newsletter submit handling.

---

### Target 5: Admin Media Page Modularization (`media/page.tsx`)
- **Current File:** `code-with-amrendra-admin/src/app/media/page.tsx` (396 LOC)
- **Problem:** Combines upload modal (file dropzone + URL import), grid view, list view, copy URL tooltip, and delete confirmation.
- **Architectural Solution:**
  - Extract `src/components/media/MediaUploadModal.tsx`
  - Extract `src/components/media/MediaGrid.tsx`
  - Extract `src/components/media/MediaList.tsx`
  - `media/page.tsx` handles state fetching and deletion.
- **Behavior Preserved:** Multipart file upload, URL upload, clipboard copy, view mode switching.

---

### Target 6: Admin Users Page Modularization (`users/page.tsx`)
- **Current File:** `code-with-amrendra-admin/src/app/users/page.tsx` (370 LOC)
- **Problem:** Combines user listing table, create user modal, edit user modal, role badges, and password change logic.
- **Architectural Solution:**
  - Extract `src/components/users/UserTable.tsx`
  - Extract `src/components/users/CreateUserModal.tsx`
  - Extract `src/components/users/EditUserModal.tsx`
  - `users/page.tsx` coordinates API operations.
- **Behavior Preserved:** User creation with validation, role assignment (`ADMIN` / `EDITOR`), password updates, deletion alerts.

---

### Target 7: Admin Categories Page Modularization (`categories/page.tsx`)
- **Current File:** `code-with-amrendra-admin/src/app/content/categories/page.tsx` (342 LOC)
- **Problem:** Combines category listing table, create modal with auto-slug, edit modal, and delete actions.
- **Architectural Solution:**
  - Extract `src/components/categories/CategoryTable.tsx`
  - Extract `src/components/categories/CategoryModal.tsx` (Handles both create & edit modes)
  - `categories/page.tsx` coordinates data fetching.
- **Behavior Preserved:** Auto-slugification from name, description management, blog count badge, deletion protection.

---

### Target 8: Markdown Rendering Performance Optimization (`MarkdownRenderer.js`)
- **Current File:** `my-website/src/components/MarkdownRenderer.js` (417 LOC)
- **Analysis:**
  - `MermaidBlock` is already loaded dynamically with `next/dynamic`.
  - Ensure `Zoom` CSS styles and KaTeX fonts load efficiently.
  - Component is structurally clean with custom heading anchors and admonitions (`[!NOTE]`, `[!TIP]`, etc.).
- **Behavior Preserved:** Full Markdown GFM syntax, KaTeX math formulas, Mermaid diagrams, image zooming, internal link routing, code copy button.

---

## 4. Execution Sequence

1. **Step 1:** Create `BlogForm.tsx` & consolidate Admin New/Edit blog pages.
2. **Step 2:** Modularize `HomeClient.js` into feature components.
3. **Step 3:** Modularize `Header.js` into Desktop & Mobile navigation components.
4. **Step 4:** Modularize `BlogPageClient.js` into Grid & Sidebar components.
5. **Step 5:** Modularize Admin `media/page.tsx`.
6. **Step 6:** Modularize Admin `users/page.tsx`.
7. **Step 7:** Modularize Admin `content/categories/page.tsx`.
8. **Step 8:** Optimize `MarkdownRenderer.js`.
9. **Step 9:** Full regression test, maintain refactoring log, and generate final report.
