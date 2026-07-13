---
title: "FinTrack — Building a Real-Time Finance Tracking Dashboard"
slug: "fintrack-finance-app"
description: "A personal finance app with real-time analytics dashboards, expense categorization, and predictive budget forecasting."
client: "Personal Project"
role: "Frontend Developer & Designer"
stack:
  - React
  - Tailwind CSS
  - Chart.js
  - Firebase
duration: "3 months"
coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
liveUrl: "https://fintrack-demo.vercel.app"
githubUrl: "https://github.com/AmrendraCodes/fintrack"
metricHighlight: "+32% user retention"
publishedAt: "2026-05-15"
---

## Problem

Most personal finance apps I tried fell into two camps: either they were bloated enterprise tools with a learning curve steeper than my credit card bill, or they were toy apps that couldn't handle more than one bank account. I needed something in between — a clean dashboard that could ingest transaction data from multiple sources, categorize spending automatically, and give me a real-time picture of where my money was going without requiring a PhD in accounting.

The specific pain point was latency. Existing tools I'd used would batch-process transactions overnight, meaning my dashboard was always 12–24 hours stale. For someone tracking daily spending habits, that delay made the data nearly useless for behavior change.

## Constraints

- **Budget**: Zero. This was a side project, so every service needed a free tier or self-hosted alternative.
- **Data freshness**: Sub-5-second latency from transaction to dashboard update. No batch processing.
- **Mobile-first**: 70% of my personal finance checks happen on my phone while standing in a checkout line wondering if I should buy that third coffee.
- **Privacy**: No third-party analytics. Transaction data stays in the user's own Firebase project. I wasn't about to pipe my spending habits through someone else's servers.
- **Solo dev**: Just me, so the architecture had to be maintainable by one person without burning out.

## Approach

I started by mapping the data flow before writing a single component. The critical path was: **raw transaction → categorization → aggregation → chart render**. Each step needed to be reactive, not polled.

For the frontend, I went with React + Tailwind. I considered Next.js but decided against SSR for this use case — the app is fully client-side after auth, and I didn't want the complexity of managing server state for what's essentially a real-time dashboard.

Chart.js was chosen over D3 deliberately. D3 gives you more control, but Chart.js with the `react-chartjs-2` wrapper gave me production-quality visualizations in a fraction of the development time. For the charts I needed — line graphs for spending trends, doughnut charts for category breakdowns, bar charts for monthly comparisons — Chart.js handled everything without custom SVG wrangling.

Firebase Realtime Database (not Firestore) was the key architectural decision. Firestore's document model is great for structured queries, but RTDB's WebSocket-based syncing gave me the sub-second latency I needed. When a new transaction drops in, every connected client sees it immediately. No polling, no refetching.

The categorization engine uses a simple rules-based approach with fuzzy string matching on merchant names. I considered ML-based categorization but that was overengineering for v1. A lookup table of ~200 merchant patterns covers about 85% of transactions correctly, and users can manually recategorize the rest (which then feeds back into the rules).

## Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Transaction  │────▶│  Firebase RTDB   │────▶│  React Dashboard │
│  Input (CSV/  │     │  (Real-time sync)│     │  (Chart.js)      │
│  Manual)      │     └──────────────────┘     └──────────────────┘
└──────────────┘              │
                              ▼
                    ┌──────────────────┐
                    │  Categorization  │
                    │  Engine (Rules)  │
                    └──────────────────┘
```

The app uses a three-layer component architecture:
1. **Data hooks** (`useTransactions`, `useBudget`, `useCategories`) — manage Firebase subscriptions and local cache
2. **Chart components** — pure presentational, receive processed data as props
3. **Dashboard layouts** — compose hooks + charts into views (Overview, Spending, Budget, Trends)

State management is intentionally minimal. React Context handles auth state and user preferences. Everything else flows through the Firebase hooks, which act as the single source of truth.

## Results

- **Dashboard load time**: 1.2s initial, then real-time updates via WebSocket (no refresh needed)
- **Transaction categorization accuracy**: 85% automatic, improving as users correct edge cases
- **User retention**: 32% higher than comparable tools I benchmarked against (measured over 90 days with 50 beta users)
- **Bundle size**: 187KB gzipped — lean enough to feel instant on mobile
- **Lighthouse score**: 94 Performance, 100 Accessibility, 100 Best Practices

The real win was the behavioral change it enabled. Having real-time spending data visible throughout the day (not a stale snapshot from last night) made it much easier to make conscious spending decisions. Several beta users reported reducing impulse purchases by 15–20% within the first month.

## Lessons Learned

**Firebase RTDB vs Firestore is not a "new vs old" decision.** Firestore is better for most apps, but RTDB's WebSocket model is genuinely superior for real-time dashboards where latency matters more than query flexibility. Pick the right tool for the specific problem.

**Chart.js is underrated.** The developer community loves D3, and for good reason — it's incredibly powerful. But for dashboard-style visualizations, Chart.js with sensible defaults gets you 90% of the way there in 10% of the time. I shipped production charts in hours, not days.

**Rules-based categorization was the right v1 choice.** ML would have been more accurate eventually, but it would have added weeks of development time, required a training dataset I didn't have, and introduced a dependency on a model serving infrastructure. The simple rules approach shipped fast and was good enough to validate the product.

**Don't underestimate the power of real-time.** The latency improvement from 12 hours to sub-5-seconds wasn't just a technical achievement — it fundamentally changed how users interacted with their financial data. Sometimes the most impactful feature isn't a new screen, it's making existing data feel alive.
