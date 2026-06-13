---
title: "Automating CI/CD Pipelines with GitHub Actions & Docker"
slug: "github-actions-docker"
date: "March 12, 2026"
readTime: "9 min read"
category: "DevOps"
categorySlug: "devops"
excerpt: "A practical guide to containerizing your applications and building robust, automated deployment pipelines."
image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop"
author: "Amrendra kumar"
tags: ["devops", "docker", "github-actions", "ci-cd"]
---

# Automating CI/CD Pipelines with GitHub Actions & Docker

Manual deployments are a recipe for disaster. Someone forgets a step, a config file gets skipped, and suddenly production is down at 2 AM. A well-designed CI/CD pipeline eliminates this entire class of problems.

In this guide, we will build an automated pipeline using **GitHub Actions** and **Docker** — from running tests on every pull request to deploying containers to production.

## Why Docker for CI/CD?

Docker solves the "works on my machine" problem by packaging your application with all its dependencies into a portable container:

- **Consistent environments** across development, CI, staging, and production
- **Fast builds** with multi-stage Dockerfiles and layer caching
- **Easy rollbacks** — just redeploy the previous image tag

## A Production-Ready Dockerfile

```dockerfile
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
```

This multi-stage build keeps the final image small by excluding dev dependencies and source code.

## GitHub Actions Workflow

Here is a complete workflow that runs on every push to `main`:

```yaml
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
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## Key Concepts

### Caching

GitHub Actions supports **layer caching** for Docker builds with `cache-from: type=gha`. This can reduce build times from 5 minutes to under 60 seconds for incremental changes.

### Environment Variables and Secrets

Never hard-code secrets in your Dockerfile or workflow:

- Use **GitHub Secrets** (`Settings → Secrets → Actions`) for API keys, tokens, and credentials
- Pass them to Docker at build time with `--build-arg` or at runtime with `-e`
- Use `.env.example` to document required variables without exposing values

### Branch Protection

Combine CI/CD with **branch protection rules**:

- Require status checks to pass before merging
- Require at least one code review approval
- Prevent force pushes to `main`

## Deployment Strategies

- **Rolling deployment** — Replace instances one at a time (default for most platforms)
- **Blue/Green** — Run two identical environments, switch traffic instantly
- **Canary** — Route a small percentage of traffic to the new version, monitor, then promote

## Key Takeaways

- **Docker** ensures consistency from laptop to production
- **Multi-stage builds** keep images small and secure
- **GitHub Actions** provides free CI/CD for public repos (2,000 min/month for private)
- Always use **caching**, **branch protection**, and **secret management**
- Choose your **deployment strategy** based on your risk tolerance and rollback needs
