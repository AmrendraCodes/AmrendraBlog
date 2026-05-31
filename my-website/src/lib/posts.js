// Example data helper - replace with real data fetching (filesystem, CMS etc.)
const posts = [
  {
    title: "The Future of Web Development: What to Expect in 2026",
    slug: "future-of-web-dev",
    category: "Development",
    categorySlug: "development",
    date: "Feb 27, 2026",
    readTime: "8 min read",
    author: "Amrendra",
    excerpt: "Exploring the evolution of frontend frameworks, AI integration, and the rise of edge computing in modern web architectures.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    content: "# The Future of Web Development\n\nExploring the evolution of frontend frameworks, AI integration, and the rise of edge computing in modern web architectures..."
  },
  {
    title: "Designing for the Next Billion Users: A Minimalist Approach",
    slug: "minimalist-design",
    category: "Design",
    categorySlug: "design",
    date: "Feb 25, 2026",
    readTime: "6 min read",
    author: "Sarah Smith",
    excerpt: "How simplicity and performance-first design are shaping the digital experiences of tomorrow across global markets.",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=800&auto=format&fit=crop",
    content: "# Designing for the Next Billion Users\n\nHow simplicity and performance-first design are shaping the digital experiences of tomorrow across global markets..."
  },
  {
    title: "10 Productivity Hacks for Remote Engineering Teams",
    slug: "remote-productivity",
    category: "Productivity",
    categorySlug: "productivity",
    date: "Feb 22, 2026",
    readTime: "5 min read",
    author: "John Doe",
    excerpt: "Practical strategies and tools to keep your distributed team synchronized and focused on high-impact results.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    content: "# 10 Productivity Hacks for Remote Engineering Teams\n\nPractical strategies and tools to keep your distributed team synchronized and focused on high-impact results..."
  },
  {
    title: "Building Reusable React Component Systems at Scale",
    slug: "react-component-systems",
    category: "React",
    categorySlug: "react",
    date: "April 1, 2026",
    readTime: "8 min read",
    author: "Amrendra",
    excerpt: "Learn how to architect component libraries that grow with your application, enforcing consistency while remaining flexible for complex UI needs.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop",
    content: `# Building Reusable React Component Systems at Scale

As applications grow, so does the complexity of the user interface. What begins as a handful of one-off components quickly becomes an unmanageable tangle of duplicated styles, inconsistent APIs, and tightly-coupled logic. The solution? A **component system** — a carefully designed library of building blocks that enforces consistency while remaining flexible enough for real-world needs.

In this article, we will walk through the key principles, patterns, and tools you need to architect a React component system that scales with your team and product.

## Why Component Systems Matter

Without a shared component system, every developer reinvents the wheel. Buttons look different on every page, spacing is inconsistent, and accessibility gets ignored. A well-designed system solves all of this:

- **Visual consistency** across every surface of the app
- **Faster development** — compose new features from existing blocks
- **Easier maintenance** — fix a bug once, fix it everywhere
- **Improved accessibility** — bake a11y into the primitives

## Start with Design Tokens

Design tokens are the atomic values of your design system: colors, spacing, typography scales, shadows, and radii. Define them once and reference them everywhere.

\`\`\`js
// tokens.js
export const tokens = {
  color: {
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    surface: '#ffffff',
    surfaceDark: '#0f172a',
    text: '#1e293b',
    textMuted: '#64748b',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    full: '9999px',
  },
};
\`\`\`

By centralizing these values, you make sweeping design changes — like a rebrand — a one-file update instead of a multi-day hunt-and-replace.

## Adopt Atomic Design Methodology

Brad Frost's Atomic Design breaks interfaces into five layers:

1. **Atoms** — Buttons, inputs, labels, icons
2. **Molecules** — Search bars (input + button), form fields (label + input + error)
3. **Organisms** — Navigation headers, card grids, comment sections
4. **Templates** — Page-level layouts with placeholder content
5. **Pages** — Templates filled with real data

This hierarchy gives your team a shared vocabulary and a clear mental model for where new components belong.

## Design Flexible Prop APIs

A component is only reusable if its API is well-designed. Follow these principles:

- **Use a \`variant\` prop** for visual variations instead of boolean flags:

\`\`\`jsx
// Good
<Button variant="primary" />
<Button variant="outline" />
<Button variant="ghost" />

// Avoid — doesn't scale
<Button primary />
<Button outline />
\`\`\`

- **Use \`size\` for dimension control:**

\`\`\`jsx
<Button size="sm" />
<Button size="md" />
<Button size="lg" />
\`\`\`

- **Spread remaining props** to the underlying element so consumers can add \`className\`, \`aria-*\`, \`data-*\`, etc.

## Compound Components for Complex UI

For components with multiple related parts, the compound component pattern keeps the API clean while giving consumers full control over layout:

\`\`\`jsx
<Card>
  <Card.Header>
    <Card.Title>Monthly Revenue</Card.Title>
    <Card.Description>Jan - Jun 2026</Card.Description>
  </Card.Header>
  <Card.Body>
    <RevenueChart />
  </Card.Body>
  <Card.Footer>
    <TrendBadge value="+12.5%" />
  </Card.Footer>
</Card>
\`\`\`

Implement this with dot-notation by attaching sub-components to the parent:

\`\`\`jsx
function Card({ children, className }) {
  return <div className={cn('rounded-xl border p-6', className)}>{children}</div>;
}

Card.Header = function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
};

Card.Title = function CardTitle({ children }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
};

export default Card;
\`\`\`

## Testing Your Component System

Components that ship without tests are a liability. Focus on:

- **Unit tests** — Does the component render correctly with different props?
- **Interaction tests** — Do click handlers, keyboard navigation, and focus management work?
- **Visual regression tests** — Has the component's appearance changed unexpectedly?
- **Accessibility audits** — Does it pass automated a11y checks?

\`\`\`jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders with correct variant class', () => {
  render(<Button variant="primary">Click me</Button>);
  const btn = screen.getByRole('button');
  expect(btn).toHaveClass('btn-primary');
});
\`\`\`

## Documentation is Non-Negotiable

A component library without documentation is just a codebase. Use **Storybook** to create interactive docs that show every variant, prop, and edge case. Each story is both living documentation and a development sandbox.

## Key Takeaways

- Start with **design tokens** to centralize your visual language
- Follow **Atomic Design** for a clear component hierarchy
- Design **variant-based APIs** that scale gracefully
- Use **compound components** for complex, multi-part UI
- Invest in **testing and documentation** from day one

Building a component system is an investment in velocity. The upfront cost pays dividends every time a developer reaches for a battle-tested \`<Button>\` instead of writing CSS from scratch.`
  },
  {
    title: "Creating Autonomous AI Agents with Modern LLM Workflows",
    slug: "autonomous-ai-agents",
    category: "AI Agents",
    categorySlug: "ai-agents",
    date: "March 28, 2026",
    readTime: "12 min read",
    author: "Amrendra",
    excerpt: "A deep dive into building AI agents that can reason, use tools, and execute complex multi-step workflows using the latest LLM frameworks.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    content: `# Creating Autonomous AI Agents with Modern LLM Workflows

AI agents are systems that can **reason**, **plan**, **use tools**, and **execute multi-step tasks** with minimal human intervention. Unlike simple chatbots that generate text, agents take action — they browse the web, write code, query databases, and orchestrate complex workflows.

In this deep dive, we will explore the architecture, patterns, and frameworks for building production-grade AI agents.

## What Makes an Agent Different from a Chatbot?

A chatbot is a *single-turn* or *multi-turn* text generator. An agent adds three critical capabilities:

- **Tool use** — The agent can call functions, APIs, or external services
- **Planning** — It decomposes complex goals into a sequence of steps
- **Memory** — It maintains context across a long-running workflow

## The ReAct Pattern

The most widely adopted agent architecture is **ReAct** (Reasoning + Acting). The loop looks like this:

1. **Observe** the current state (user input, tool results, context)
2. **Think** about what to do next (chain-of-thought reasoning)
3. **Act** by calling a tool or generating output
4. **Repeat** until the goal is achieved

\`\`\`python
def agent_loop(goal, tools, max_steps=10):
    context = []
    for step in range(max_steps):
        thought = llm.reason(goal, context)
        if thought.is_final_answer:
            return thought.answer
        action = thought.select_tool(tools)
        result = action.execute()
        context.append({"thought": thought, "action": action, "result": result})
    return "Could not complete the goal."
\`\`\`

## Defining Tools

Tools are the agent's interface to the outside world. Each tool needs:

- A **name** and **description** so the LLM knows when to use it
- A **parameter schema** so the LLM can call it correctly
- An **execute function** that performs the actual work

\`\`\`js
const searchTool = {
  name: "web_search",
  description: "Search the web for current information",
  parameters: {
    query: { type: "string", description: "The search query" }
  },
  execute: async ({ query }) => {
    const results = await searchAPI(query);
    return results.map(r => r.snippet).join("\\n");
  }
};
\`\`\`

## Memory Strategies

Agents need memory to handle long workflows:

- **Short-term memory** — The conversation history and recent tool results (kept in the context window)
- **Long-term memory** — A vector database for retrieving relevant past interactions
- **Working memory** — A scratchpad where the agent tracks its current plan and progress

## Error Handling and Self-Correction

Production agents must handle failures gracefully:

- **Retry with different parameters** if a tool call fails
- **Fall back to alternative tools** when the primary option is unavailable
- **Ask the user for clarification** when the goal is ambiguous
- **Set hard limits** on steps and token usage to prevent runaway loops

## Frameworks to Explore

- **LangChain / LangGraph** — The most popular framework for building agent workflows in Python
- **Vercel AI SDK** — First-class support for tool use and streaming in Next.js
- **CrewAI** — Multi-agent collaboration where specialized agents work together

## Key Takeaways

- Agents = LLMs + Tools + Planning + Memory
- The **ReAct loop** is the foundational architecture
- **Tool definitions** are the agent's interface to the real world
- Always implement **error handling**, **rate limiting**, and **human-in-the-loop** checkpoints for safety

The era of AI agents is just beginning. The developers who master these patterns will build the next generation of intelligent software.`
  },
  {
    title: "Designing Multi-Tenant SaaS Platforms for Scale",
    slug: "saas-architecture-scale",
    category: "SaaS Architecture",
    categorySlug: "saas-architecture",
    date: "March 24, 2026",
    readTime: "15 min read",
    author: "Amrendra",
    excerpt: "Essential database architectures, routing strategies, and authentication patterns for building scalable multi-tenant applications.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    content: `# Designing Multi-Tenant SaaS Platforms for Scale

Multi-tenancy is the backbone of every modern SaaS product. Instead of deploying a separate instance for each customer, a single deployment serves all tenants — reducing costs, simplifying operations, and accelerating feature delivery.

But designing multi-tenancy correctly requires careful decisions about **database isolation**, **routing**, **authentication**, and **billing**. Get it wrong, and you risk data leaks between tenants or performance bottlenecks that take down everyone.

## Database Strategies

There are three common approaches to tenant data isolation:

### 1. Shared Database, Shared Schema

All tenants share the same tables. Every row has a \`tenant_id\` column, and every query includes a \`WHERE tenant_id = ?\` filter.

- **Pros:** Simple, cost-effective, easy to deploy
- **Cons:** Risk of data leakage if a query forgets the filter, noisy-neighbor performance issues

### 2. Shared Database, Separate Schemas

Each tenant gets its own database schema (e.g., \`tenant_123.users\`, \`tenant_456.users\`). The application dynamically selects the schema based on the incoming request.

- **Pros:** Better isolation than shared schema, migrations can be rolled out incrementally
- **Cons:** More complex connection management, schema proliferation

### 3. Separate Databases

Each tenant gets a completely isolated database. This is the gold standard for regulated industries (healthcare, finance).

- **Pros:** Maximum isolation, per-tenant backup/restore, compliance-friendly
- **Cons:** Expensive, complex provisioning, cross-tenant reporting is hard

## Tenant-Aware Routing

How does your application know which tenant is making a request? Common strategies:

- **Subdomain-based:** \`acme.yourapp.com\` → tenant is \`acme\`
- **Path-based:** \`yourapp.com/acme/dashboard\` → tenant is \`acme\`
- **Header-based:** A custom \`X-Tenant-ID\` header (common for APIs)
- **JWT claim:** The tenant ID is embedded in the authentication token

\`\`\`js
// Middleware to extract tenant from subdomain
function tenantMiddleware(req, res, next) {
  const host = req.headers.host;
  const subdomain = host.split('.')[0];
  req.tenantId = subdomain;
  next();
}
\`\`\`

## Authentication and Authorization

In a multi-tenant system, authentication answers *"Who are you?"* and authorization answers *"What can you do in this tenant?"*

- Use **OAuth 2.0 / OIDC** with tenant-scoped roles
- Store tenant membership in the JWT: \`{ userId: 123, tenantId: "acme", role: "admin" }\`
- Implement **row-level security** at the database layer as a safety net

## Key Takeaways

- Choose your **database isolation strategy** based on your compliance needs and scale
- Implement **tenant-aware middleware** that runs on every request
- Use **JWT claims** for lightweight tenant context propagation
- Always have a **row-level security** safety net to prevent cross-tenant data access

Multi-tenancy is a spectrum, not a binary choice. Start with shared schema for speed, and evolve toward greater isolation as your product and customer base demand it.`
  },
  {
    title: "AWS Infrastructure Best Practices for Startups",
    slug: "aws-infrastructure-startups",
    category: "AWS Infrastructure",
    categorySlug: "aws-infrastructure",
    date: "March 18, 2026",
    readTime: "10 min read",
    author: "Amrendra",
    excerpt: "From VPC design to ECS deployments, learn the foundational AWS services and architectures every startup should implement.",
    image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=1200&auto=format&fit=crop",
    content: `# AWS Infrastructure Best Practices for Startups

AWS offers over 200 services. For a startup, this abundance can be paralyzing. Which services do you actually need? How should you structure your accounts? What can you skip until you reach product-market fit?

This guide covers the foundational AWS services and architectural patterns every startup should implement — and the mistakes to avoid.

## Account Structure

Never run everything in a single AWS account. At minimum, set up:

- **Management account** — For billing, IAM Identity Center, and organizational policies
- **Development account** — Where engineers experiment and test
- **Production account** — Your live customer-facing environment

Use **AWS Organizations** and **Service Control Policies (SCPs)** to enforce guardrails across accounts.

## Networking with VPC

Design your Virtual Private Cloud carefully — it is hard to change later:

- Use a **/16 CIDR block** (e.g., \`10.0.0.0/16\`) to give yourself room to grow
- Create **public subnets** for load balancers and **private subnets** for application servers and databases
- Span at least **two Availability Zones** for resilience
- Use **NAT Gateways** in each AZ so private instances can access the internet for updates

## Compute: ECS Fargate vs EC2

For most startups, **ECS with Fargate** is the right choice:

- No servers to manage or patch
- Pay only for the vCPU and memory your containers use
- Scales to zero for non-production workloads
- Integrates natively with ALB, CloudWatch, and IAM

\`\`\`yaml
# Simplified ECS task definition
taskDefinition:
  family: api-service
  cpu: 256
  memory: 512
  containers:
    - name: api
      image: 123456789.dkr.ecr.us-east-1.amazonaws.com/api:latest
      portMappings:
        - containerPort: 3000
\`\`\`

## Database: RDS vs DynamoDB

- **RDS (PostgreSQL)** — Ideal for relational data, complex queries, and transactional workloads. Start with \`db.t4g.micro\` (free tier eligible).
- **DynamoDB** — Best for high-throughput, key-value access patterns. Near-infinite scale with zero operational overhead.

> Start with RDS PostgreSQL unless you have a specific reason to go NoSQL. You can always add DynamoDB for hot paths later.

## Monitoring and Observability

You cannot fix what you cannot see. Set up from day one:

- **CloudWatch Alarms** for CPU, memory, error rates, and latency
- **CloudWatch Logs** with structured JSON logging
- **AWS X-Ray** for distributed tracing across microservices
- **Cost alerts** in AWS Budgets — startups die from unexpected bills

## Security Essentials

- Enable **MFA on every IAM user**, especially the root account
- Use **IAM roles** (not access keys) for service-to-service communication
- Enable **GuardDuty** for threat detection (free 30-day trial, cheap after)
- Encrypt everything at rest with **KMS-managed keys**

## Key Takeaways

- Use **multi-account** structure from the start
- Design your **VPC** for growth — it is painful to change later
- Start with **ECS Fargate** and **RDS PostgreSQL**
- Implement **monitoring and cost alerts** before your first customer
- **Security is not optional** — enable MFA, GuardDuty, and encryption on day one`
  },
  {
    title: "Automating CI/CD Pipelines with GitHub Actions & Docker",
    slug: "github-actions-docker",
    category: "DevOps",
    categorySlug: "devops",
    date: "March 12, 2026",
    readTime: "9 min read",
    author: "Amrendra",
    excerpt: "A practical guide to containerizing your applications and building robust, automated deployment pipelines.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop",
    content: `# Automating CI/CD Pipelines with GitHub Actions & Docker

Manual deployments are a recipe for disaster. Someone forgets a step, a config file gets skipped, and suddenly production is down at 2 AM. A well-designed CI/CD pipeline eliminates this entire class of problems.

In this guide, we will build an automated pipeline using **GitHub Actions** and **Docker** — from running tests on every pull request to deploying containers to production.

## Why Docker for CI/CD?

Docker solves the "works on my machine" problem by packaging your application with all its dependencies into a portable container:

- **Consistent environments** across development, CI, staging, and production
- **Fast builds** with multi-stage Dockerfiles and layer caching
- **Easy rollbacks** — just redeploy the previous image tag

## A Production-Ready Dockerfile

\`\`\`dockerfile
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

This multi-stage build keeps the final image small by excluding dev dependencies and source code.

## GitHub Actions Workflow

Here is a complete workflow that runs on every push to \`main\`:

\`\`\`yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/\${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
\`\`\`

## Key Concepts

### Caching

GitHub Actions supports **layer caching** for Docker builds with \`cache-from: type=gha\`. This can reduce build times from 5 minutes to under 60 seconds for incremental changes.

### Environment Variables and Secrets

Never hard-code secrets in your Dockerfile or workflow:

- Use **GitHub Secrets** (\`Settings → Secrets → Actions\`) for API keys, tokens, and credentials
- Pass them to Docker at build time with \`--build-arg\` or at runtime with \`-e\`
- Use \`.env.example\` to document required variables without exposing values

### Branch Protection

Combine CI/CD with **branch protection rules**:

- Require status checks to pass before merging
- Require at least one code review approval
- Prevent force pushes to \`main\`

## Deployment Strategies

- **Rolling deployment** — Replace instances one at a time (default for most platforms)
- **Blue/Green** — Run two identical environments, switch traffic instantly
- **Canary** — Route a small percentage of traffic to the new version, monitor, then promote

## Key Takeaways

- **Docker** ensures consistency from laptop to production
- **Multi-stage builds** keep images small and secure
- **GitHub Actions** provides free CI/CD for public repos (2,000 min/month for private)
- Always use **caching**, **branch protection**, and **secret management**
- Choose your **deployment strategy** based on your risk tolerance and rollback needs`
  },
  // Posts for FeaturedPosts component
  {
    title: "The Future of User Interfaces: Glassmorphism and Beyond",
    slug: "future-of-user-interfaces",
    category: "Design",
    categorySlug: "design",
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Amrendra Kumar",
    excerpt: "Explore the evolution of modern UI design. From flat design to glassmorphism, we dive deep into the trends shaping the future of digital experiences.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
    content: "# The Future of User Interfaces: Glassmorphism and Beyond\n\nExplore the evolution of modern UI design. From flat design to glassmorphism, we dive deep into the trends shaping the future of digital experiences and how you can implement them today."
  },
  // Posts for LatestArticles component
  {
    title: "The Anatomy of a High-Converting Landing Page",
    slug: "high-converting-landing-page",
    category: "Marketing",
    categorySlug: "marketing",
    date: "May 10, 2026",
    readTime: "7 min read",
    author: "Sarah Jenkins",
    excerpt: "Discover the psychological triggers and design patterns that turn casual visitors into paying customers.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    content: "# The Anatomy of a High-Converting Landing Page\n\nDiscover the psychological triggers and design patterns that turn casual visitors into paying customers."
  },
  {
    title: "Mastering Tailwind CSS in 2026",
    slug: "mastering-tailwind-css",
    category: "Development",
    categorySlug: "development",
    date: "May 8, 2026",
    readTime: "8 min read",
    author: "Amrendra Kumar",
    excerpt: "A comprehensive guide to using the latest utility classes and features to build responsive, modern interfaces faster.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    content: "# Mastering Tailwind CSS in 2026\n\nA comprehensive guide to using the latest utility classes and features to build responsive, modern interfaces faster."
  },
  {
    title: "Why Minimalist UI is Back and Here to Stay",
    slug: "minimalist-ui",
    category: "Design",
    categorySlug: "design",
    date: "May 5, 2026",
    readTime: "6 min read",
    author: "Elena Rodriguez",
    excerpt: "How stripping away the noise can lead to better user engagement, faster load times, and a premium brand feel.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    content: "# Why Minimalist UI is Back and Here to Stay\n\nHow stripping away the noise can lead to better user engagement, faster load times, and a premium brand feel."
  },
  {
    title: "Building Scalable Next.js Applications",
    slug: "scalable-nextjs",
    category: "Development",
    categorySlug: "development",
    date: "May 2, 2026",
    readTime: "10 min read",
    author: "David Chen",
    excerpt: "Architectural patterns and best practices for creating Next.js apps that perform under heavy traffic.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    content: "# Building Scalable Next.js Applications\n\nArchitectural patterns and best practices for creating Next.js apps that perform under heavy traffic."
  },
  {
    title: "Typography Rules Every Designer Should Know",
    slug: "typography-rules",
    category: "Design",
    categorySlug: "design",
    date: "April 28, 2026",
    readTime: "5 min read",
    author: "Sarah Jenkins",
    excerpt: "Stop guessing your font sizes. Learn the mathematical ratios and pairing techniques for perfect typography.",
    image: "https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?q=80&w=800&auto=format&fit=crop",
    content: "# Typography Rules Every Designer Should Know\n\nStop guessing your font sizes. Learn the mathematical ratios and pairing techniques for perfect typography."
  },
  {
    title: "The Ultimate Guide to SEO in the AI Era",
    slug: "seo-ai-era",
    category: "Marketing",
    categorySlug: "marketing",
    date: "April 24, 2026",
    readTime: "9 min read",
    author: "Michael Torres",
    excerpt: "How search engines are changing and what you need to do today to keep your content ranking high.",
    image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop",
    content: "# The Ultimate Guide to SEO in the AI Era\n\nHow search engines are changing and what you need to do today to keep your content ranking high."
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug) {
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export function getAllCategories() {
  const categories = [...new Set(posts.map((p) => p.categorySlug))];
  return categories.map((slug) => ({
    slug,
    name: posts.find((p) => p.categorySlug === slug)?.category || slug,
    count: posts.filter((p) => p.categorySlug === slug).length,
  }));
}
