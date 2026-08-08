# Code with Amrendra — Admin CMS Application

Production-ready, standalone Admin CMS product for **Code with Amrendra**, architecturally decoupled from the public website.

```
                          ┌──────────────────────────────┐
                          │   PostgreSQL Database        │
                          │   (Prisma ORM Schema)        │
                          └──────────────┬───────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
                 ▼                                               ▼
┌────────────────────────────────┐               ┌────────────────────────────────┐
│      Public Website            │               │      Admin CMS Application     │
│   (code-with-amrendra)         │               │   (code-with-amrendra-admin)   │
│                                │               │                                │
│ • Next.js 16 (App Router)      │               │ • Next.js 16 (App Router)      │
│ • Public blog & pages          │               │ • Dark Strapi-inspired UI      │
│ • Fast SSG / SSR rendering     │               │ • Secure session & RBAC auth   │
│ • Domain: codewithamrendra.in  │               │ • Domain: admin.codewithamrend...│
└────────────────────────────────┘               └────────────────────────────────┘
```

---

## 🚀 Features

- **Dedicated Admin Login**: Strapi-inspired card layout with password visibility toggle, remember me checkbox, language selector mock, and security notices.
- **Admin Dashboard**: Overview metrics (total posts, published, drafts, categories, media, views), recent blog posts table with status badges (Published, Draft, Scheduled), and quick actions.
- **Blog CMS & Rich Editor**: Post management table with search, category & status filtering, pagination, and a full-featured markdown editor supporting headers, code blocks, lists, quotes, tags, category assignment, and complete SEO fields.
- **Media Library**: Asset upload, search, filter, preview, image metadata inspection (format, dimensions, bytes), copy URL action, and asset deletion.
- **Categories & Tags**: Full CRUD with auto-generated slugs and duplicate slug validation.
- **Page Management**: Manage core pages (Homepage sections, About, Services, Contact, Legal).
- **SEO Management**: Configure global default titles, meta descriptions, robots directives, canonical URLs, and preview live Google Search SERPs & Social Cards.
- **Analytics & Telemetry**: Visitor tracking, page view breakdowns, top traffic sources, and device statistics.
- **Users & Role-Based Access Control (RBAC)**: Manage Super Admin, Editor, and Author roles with server-side authorization enforcement.
- **System Settings**: Configure site defaults, contact info, social links, analytics, and API keys.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 + Custom Dark Theme System
- **Icons**: Lucide React (`lucide-react`)
- **Validation**: Zod (`zod`)
- **Forms**: React Hook Form
- **Security & Auth**: Session-based `httpOnly` cookie authentication with `bcryptjs` password hashing & server-side RBAC
- **Database & Data Access**: Prisma ORM 5.22, PostgreSQL

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- Node.js 18+ and npm
- PostgreSQL Database instance

### 2. Environment Setup
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure `.env.local`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/codewithamrendra?schema=public"
AUTH_SECRET="dev-secret-key-code-with-amrendra-admin"
ADMIN_SESSION_COOKIE="admin_session_token"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Database Sync & Prisma Generation

```bash
npx prisma generate
npx prisma db push
```

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🔑 Default Credentials

- **Email**: `admin@codewithamrendra.com`
- **Password**: `admin123`

---

## 🛡️ Security Architecture

1. **HTTP-Only Cookies**: Session tokens are stored in `httpOnly`, `sameSite: lax`, `secure` cookies to prevent XSS credential theft.
2. **Server-Side Authorization**: API routes check user roles (`ADMIN`, `EDITOR`, `AUTHOR`) on every request. Client-side state is never trusted.
3. **Secret Isolation**: `DATABASE_URL`, `AUTH_SECRET`, and API private keys are strictly server-side and never exposed to browser bundles.

---

## 📡 API Endpoint Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Authenticate admin user & issue cookie |
| `POST` | `/api/auth/logout` | Destroy session token & clear cookie |
| `GET` | `/api/auth/me` | Fetch active user session |
| `GET`, `POST` | `/api/blogs` | List & create blog articles |
| `GET`, `PUT`, `DELETE` | `/api/blogs/[id]` | Fetch, update & delete blog post |
| `GET`, `POST`, `DELETE` | `/api/categories` | List, create & delete categories |
| `GET`, `POST`, `DELETE` | `/api/tags` | List, create & delete tags |
| `GET`, `POST`, `DELETE` | `/api/media` | List, upload & delete media assets |
| `GET`, `PUT` | `/api/seo` | Fetch & update global SEO settings |
| `GET` | `/api/analytics` | Fetch website & blog metrics |
| `GET`, `POST` | `/api/users` | List & create admin users (Super Admin only) |
| `GET`, `PUT` | `/api/settings` | Fetch & update site settings |

---

## 🌐 Deployment

The Admin CMS is deployed independently to a dedicated admin subdomain (e.g. `admin.codewithamrendra.in`):

1. **Build Verification**:
   ```bash
   npm run build
   ```
2. **Deploy to Vercel / Cloud**:
   - Set environment variables (`DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`).
   - Custom Domain: `admin.codewithamrendra.in`.
