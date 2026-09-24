/**
 * Code with Amrendra — Services Data Architecture
 * Centralized data module for services landing page and service detail routes.
 *
 * Consolidated: 6 services → 3 services (Sep 2026)
 * - Web Development (absorbs UI/UX & Product Design + Cloud & DevOps)
 * - AI & Automation (standalone, light edits)
 * - SEO & Technical Content Writing (absorbs Digital Marketing SEO pieces)
 */

export const SERVICES_CATEGORIES = {
  BUILD: {
    id: "BUILD",
    label: "BUILD",
    tagline: "Web Development & Design",
    description: "Full-stack web applications, UI/UX design, and cloud deployment — from first wireframe to production.",
  },
  GROW: {
    id: "GROW",
    label: "GROW",
    tagline: "Content & Organic Search",
    description: "Technical content writing, SEO strategy, and search-driven growth for developer-focused brands.",
  },
  SCALE: {
    id: "SCALE",
    label: "SCALE",
    tagline: "AI & Workflow Automation",
    description: "Custom AI integrations, chatbots, and automated workflows that free up your team to focus on what matters.",
  },
};

export const SERVICES_DATA = [
  // ═══════════════════════════════════════════════════════════
  // SERVICE 1 — WEB DEVELOPMENT (absorbs UI/UX + Cloud/DevOps)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "web-development",
    title: "Web Development",
    category: "BUILD",
    categoryLabel: "BUILD",
    indexNumber: "01",
    subtitle: "Full-stack websites and web apps — designed, coded, and deployed by one developer.",
    metaTitle: "Modern Web Development Services | Code with Amrendra",
    metaDescription: "Custom React & Next.js web development services. Fast, scalable, SEO-friendly websites built for real business growth.",
    iconName: "Code2",
    shortDescription: "Custom Web Applications, UI/UX Design, Landing Pages, and Cloud Deployment — End to End.",
    ctaText: "Get a Free Website Audit",
    ctaSecondaryText: "Chat on WhatsApp",

    hero: {
      tagline: "Design → Build → Deploy — One Developer, End to End",
      heading: "I Build Websites That Actually Perform",
      description: "I'm Amrendra — I design, code, and deploy web applications using Next.js, React, and modern frontend tooling. No handoffs between a design team, a dev team, and a DevOps team. I handle the full stack: UI/UX design, responsive frontend code, API integration, and production deployment on AWS or Vercel. The FinTrack dashboard and ShopEase storefront are both examples of this approach — check the case studies to see the real Lighthouse scores.",
    },

    problems: [
      {
        title: "Pages That Load in 4+ Seconds",
        description: "Bloated JavaScript bundles, unoptimized images, and legacy frameworks cause visitors to bounce before they even see your content. Google notices too — Core Web Vitals affect rankings directly.",
      },
      {
        title: "A Site That Breaks on Mobile",
        description: "Over 60% of your traffic is probably on phones. If your layout collapses on small screens or buttons are impossible to tap, you're losing real revenue.",
      },
      {
        title: "Design and Development Out of Sync",
        description: "When a designer hands off Figma files to a separate developer, details get lost. Spacing is wrong, interactions don't match, and revisions take weeks.",
      },
      {
        title: "No Clear Path from Code to Production",
        description: "You've got a working prototype locally but no idea how to deploy it, set up SSL, or configure a CI/CD pipeline. So it stays on localhost.",
      },
    ],

    solutions: [
      {
        title: "Next.js Architecture for Speed",
        description: "Server-side rendering and static generation built in — not bolted on. The ShopEase build consistently scores above 90 on Lighthouse Performance without manual optimization hacks.",
      },
      {
        title: "Mobile-First Responsive Engineering",
        description: "I build every layout starting from the smallest screen and working up. Not \"also works on mobile\" — mobile is the starting point.",
      },
      {
        title: "One Person: Design Through Code",
        description: "I design the interface and write the code. No translation layer between Figma and React. What you approve in the prototype is what ships in production.",
      },
      {
        title: "Production Deployment Included",
        description: "Every project includes deployment setup — whether that's Vercel for a marketing site or AWS (S3, CloudFront, EC2) for something more custom. SSL, CDN, DNS, CI/CD pipeline — all handled.",
      },
    ],

    offerings: [
      {
        icon: "Globe",
        title: "Business Websites & Landing Pages",
        description: "Professional websites that load fast, rank well, and clearly communicate what you do — not template sites with your logo swapped in.",
      },
      {
        icon: "Code",
        title: "React & Next.js Web Apps",
        description: "Custom applications with dynamic routing, state management, authentication, and real-time data — built on a stack I actually use every day.",
      },
      {
        icon: "Layout",
        title: "UI/UX Design & Prototyping",
        description: "Interface design, user flow mapping, and interactive prototypes. I design in Figma and build what I design — so nothing gets lost in translation.",
      },
      {
        icon: "Eye",
        title: "UX Audit & Conversion Optimization",
        description: "I'll review your existing site's user flows, identify where visitors drop off, and redesign those friction points. Practical changes, not a 50-page PDF you'll never read.",
      },
      {
        icon: "Cloud",
        title: "AWS Cloud Setup & Architecture",
        description: "S3 buckets, CloudFront distributions, EC2 instances, Route 53 DNS — configured for your specific needs, not a one-size-fits-all Terraform template.",
      },
      {
        icon: "GitBranch",
        title: "CI/CD Pipeline Automation",
        description: "GitHub Actions pipelines for automated testing, linting, and deployment. Push to main, it's live in minutes.",
      },
      {
        icon: "DollarSign",
        title: "Cloud Cost Optimization",
        description: "I'll audit your current AWS bill and identify what's over-provisioned. Most small-to-mid projects I've reviewed are spending 30-50% more than they need to.",
      },
      {
        icon: "Gauge",
        title: "Performance & Core Web Vitals",
        description: "Image optimization, code splitting, font loading strategies, lazy hydration — whatever it takes to get those Lighthouse scores where they need to be.",
      },
    ],

    benefits: [
      {
        title: "Lighthouse Scores in the 90s",
        description: "Not a vague promise — the FinTrack and ShopEase builds both score 90+ on Performance, Accessibility, and SEO. See the case studies for actual screenshots.",
      },
      {
        title: "Faster Time to Launch",
        description: "One developer handling design, code, and deployment means fewer coordination delays. Most business websites go from kickoff to live in 3-5 weeks.",
      },
      {
        title: "Code You Can Actually Maintain",
        description: "Clean component architecture, consistent naming, documented APIs. If you bring on another developer later, they won't need a Rosetta Stone to understand the codebase.",
      },
      {
        title: "Hosting That Doesn't Surprise You",
        description: "I set up cost-effective hosting from day one and explain exactly what you're paying for. No $500/month AWS bills for a marketing site.",
      },
    ],

    process: [
      { step: "01", title: "Discovery & Scoping", description: "I'll ask about your business goals, target audience, technical constraints, and timeline. We'll define exactly what \"done\" looks like before any code is written." },
      { step: "02", title: "Design & Architecture", description: "Wireframes, component structure, and user flows. You'll see the interface before I build it and approve the direction first." },
      { step: "03", title: "Frontend Development", description: "Clean, semantic Next.js code with responsive CSS. I build in the open — you'll have access to a staging URL from the first week." },
      { step: "04", title: "API & Backend Integration", description: "Connecting databases, authentication, payment gateways, CMS platforms, or whatever third-party services your project requires." },
      { step: "05", title: "Testing & Performance Audit", description: "Cross-browser testing, accessibility checks, and Core Web Vitals tuning. I don't ship until Lighthouse is green." },
      { step: "06", title: "Deployment & Handover", description: "Production deploy with SSL, CDN, CI/CD pipeline, monitoring, and a handover doc so you know how everything works." },
    ],

    faqs: [
      {
        question: "What tech stack do you use?",
        answer: "React and Next.js (App Router) for the frontend, Tailwind CSS or vanilla CSS for styling, Node.js for server-side logic when needed. For hosting, Vercel is my default recommendation for most projects — it's purpose-built for Next.js. For projects that need more custom infrastructure, I set up AWS (S3, CloudFront, Lambda, or EC2).",
      },
      {
        question: "How much does a website cost?",
        answer: "It depends on scope, but here's a rough range: a focused landing page or marketing site runs $1,500–$3,000. A multi-page business website with blog and contact forms is typically $3,000–$6,000. A custom web application with authentication, dashboards, and API integrations starts around $6,000+. I'll give you a fixed quote after our initial call — no hourly billing surprises.",
      },
      {
        question: "Do you handle hosting and ongoing deployment, not just building the site?",
        answer: "Yes — deployment is part of every project, not an afterthought. I set up the production environment, SSL certificates, CDN caching, and a CI/CD pipeline so that future updates can be deployed by pushing to a Git branch. If you want ongoing maintenance after launch, we can discuss a monthly retainer, but it's not required.",
      },
      {
        question: "Can you redesign an existing site, or only build from scratch?",
        answer: "Both. I've done full redesigns where the old site was a WordPress template that needed to become a modern Next.js application (ShopEase was essentially this). I've also built sites from a blank canvas. Either way, the process starts with understanding what's working and what isn't.",
      },
      {
        question: "Do you do mobile app development?",
        answer: "No — I focus on web applications. If you need a native iOS or Android app, that's not something I offer. What I can do is build a responsive web app that works great on mobile browsers, or a Progressive Web App (PWA) that can be installed on a phone. For many businesses, that's the better choice anyway.",
      },
      {
        question: "What about design? Do I need to bring my own designer?",
        answer: "No — I handle UI/UX design as part of the project. I design in Figma, get your approval, and then build exactly what we agreed on. That said, if you already have a designer or brand guidelines, I'm happy to work from their specs.",
      },
    ],

    whyChooseUs: {
      heading: "Why Clients Choose Me for Web Development",
      subtitle: "Not the right fit for every project — but for the ones I take on, here's what you get.",
      reasons: [
        { icon: "Zap", title: "One Person, Full Stack", description: "No project manager relaying messages between a designer and a developer. You talk directly to the person writing the code." },
        { icon: "ShieldCheck", title: "Real Performance Numbers", description: "I don't say \"fast websites\" and leave it vague. The FinTrack build loads in under 1.2 seconds on 3G. Lighthouse scores are in the case study." },
        { icon: "Search", title: "SEO Built Into the Code", description: "Semantic HTML, structured data, meta tags, sitemap generation — these aren't add-ons. They're part of how I write code." },
        { icon: "Target", title: "Deployment Is Not Extra", description: "Cloud setup, SSL, CI/CD — included in the project, not billed as a separate phase." },
      ],
    },

    relatedServiceSlugs: ["ai-automation", "seo-content-strategy"],
    relatedBlogSlugs: ["how-to-learn-react", "how-to-build-a-light-and-dark-theme-switch-using-javascript", "future-of-web-development-2026"],
    relatedCaseStudySlugs: ["fintrack-finance-app", "shopease-store-redesign"],
  },

  // ═══════════════════════════════════════════════════════════
  // SERVICE 2 — AI & AUTOMATION
  // ═══════════════════════════════════════════════════════════
  {
    slug: "ai-automation",
    title: "AI & Automation",
    category: "SCALE",
    categoryLabel: "SCALE",
    indexNumber: "02",
    subtitle: "Custom AI integrations and workflow automations — built by one developer, not a sales team.",
    metaTitle: "AI Integration & Workflow Automation | Code with Amrendra",
    metaDescription: "AI integration and workflow automation services that cut manual work, connect your tools, and save your team hours weekly.",
    iconName: "Sparkles",
    shortDescription: "Custom AI API Integrations, Intelligent Chatbots, and Workflow Automation — Practical, Not Hype.",
    ctaText: "Discuss Your AI Use Case",
    ctaSecondaryText: "Chat on WhatsApp",

    hero: {
      tagline: "Practical AI — Not Hype, Not Slides, Just Working Software",
      heading: "I Build AI That Actually Ships Into Your Product",
      description: "There's a lot of noise around AI right now. What I do is concrete: I connect LLM APIs (OpenAI, Anthropic) to your existing systems, build chatbots trained on your actual documentation, and automate the manual workflows that eat up your team's time. The MediCare patient portal and FinTrack dashboard both use AI integrations I built — they're in production, handling real users, not sitting in a pitch deck.",
    },

    problems: [
      {
        title: "Your Team Wastes Hours on Repetitive Tasks",
        description: "Copying data between spreadsheets, formatting reports, responding to the same 20 customer questions — these are automation candidates, not full-time job descriptions.",
      },
      {
        title: "Customer Inquiries Pile Up After Hours",
        description: "If a potential customer visits your site at 10 PM with a question and gets no response until the next morning, there's a decent chance they've already gone to a competitor.",
      },
      {
        title: "Your Tools Don't Talk to Each Other",
        description: "CRM data doesn't sync with your invoicing tool. Form submissions don't trigger the right notifications. Everything requires manual copy-paste between tabs.",
      },
      {
        title: "You've Heard \"AI\" But Don't Know Where to Start",
        description: "Every vendor is selling an AI product now. Most of them are a ChatGPT wrapper with your logo on it. You need someone who can evaluate what actually makes sense for your specific business.",
      },
    ],

    solutions: [
      {
        title: "Custom LLM API Integrations",
        description: "I connect OpenAI or Anthropic APIs directly into your web app or internal tools. Not a generic chatbot — a purpose-built integration that does exactly what your workflow needs.",
      },
      {
        title: "AI Chatbots Trained on Your Knowledge Base",
        description: "A support bot that actually knows your product, trained on your documentation, FAQs, and help articles using RAG (Retrieval-Augmented Generation). The MediCare portal's patient assistant is built this way.",
      },
      {
        title: "Workflow Automation Pipelines",
        description: "Zapier/Make connections, custom webhooks, Node.js scripts — whatever makes sense for your specific automation needs. The goal is eliminating manual steps, not adding new tools.",
      },
      {
        title: "Automated Document Processing",
        description: "Extracting data from PDFs, parsing email attachments, generating structured reports — tasks that are tedious for humans but straightforward for an automated pipeline.",
      },
    ],

    offerings: [
      {
        icon: "Cpu",
        title: "AI Model Integration",
        description: "Connecting modern LLM APIs (OpenAI, Claude, Gemini) into web applications for smart data processing, content generation, or decision support.",
      },
      {
        icon: "MessageSquare",
        title: "Custom AI Chatbots",
        description: "Support bots trained on your docs using RAG — not generic \"how can I help you?\" widgets. They answer real questions with real answers from your knowledge base.",
      },
      {
        icon: "Workflow",
        title: "Workflow Automation",
        description: "Connecting your business applications so data flows automatically — CRM to invoicing, form submissions to Slack notifications, email parsing to database entries.",
      },
      {
        icon: "Layers",
        title: "API & System Integrations",
        description: "Building the connective tissue between your tools: webhooks, REST API connectors, database sync jobs. If it has an API, I can connect it.",
      },
      {
        icon: "Activity",
        title: "Business Process Automation",
        description: "Lead processing, email sequences, user onboarding flows, invoice generation — automated end-to-end so your team doesn't do it manually.",
      },
      {
        icon: "FileCheck",
        title: "Automated Document Processing",
        description: "Extracting structured data from PDFs, emails, and forms using AI parsing. Turns unstructured input into clean database records.",
      },
    ],

    benefits: [
      {
        title: "Hours Saved Per Week, Not Per Year",
        description: "Most automation projects I've done save 10-20 hours of manual work per week. That's immediate, measurable impact — not a vague \"efficiency gain.\"",
      },
      {
        title: "24/7 Customer Support Without Hiring",
        description: "A well-built chatbot handles the routine questions (pricing, hours, product specs) instantly. Your team only deals with the complex cases that actually need a human.",
      },
      {
        title: "Fewer Manual Errors",
        description: "Automation doesn't mistype an email address, forget to update a field, or accidentally delete a row. It does the same thing correctly every time.",
      },
      {
        title: "Scale Without Proportional Headcount",
        description: "When your volume doubles, your automation handles it without blinking. You don't need to hire two more people to handle twice the customer inquiries.",
      },
    ],

    process: [
      { step: "01", title: "Workflow Audit", description: "I'll map your current manual processes, identify the highest-impact automation targets, and flag anything that's not a good fit for AI." },
      { step: "02", title: "Solution Design", description: "Selecting the right tools — which AI model, which integration platform, what error handling looks like. You'll approve the approach before I build." },
      { step: "03", title: "Build & Integration", description: "Writing the actual code: API connections, prompt engineering, logic flows, webhook handlers. I build incrementally so you can test as I go." },
      { step: "04", title: "Testing & Guardrails", description: "AI outputs need guardrails. I test for edge cases, hallucination risks, and failure modes. If the bot doesn't know something, it should say so — not make things up." },
      { step: "05", title: "Deployment & Training", description: "Deploying to production and walking your team through how it works, what the monitoring dashboard shows, and what to do if something unexpected happens." },
      { step: "06", title: "Monitoring & Iteration", description: "Watching the logs, refining prompts based on real user interactions, and tuning the system over the first few weeks until it's running smoothly." },
    ],

    faqs: [
      {
        question: "Do I need expensive infrastructure to run AI in my business?",
        answer: "No. Everything I build runs on cloud-hosted APIs (OpenAI, Anthropic) and serverless functions. There's no GPU to provision, no model to train, no ML infrastructure to manage. You pay per API call, and for most businesses the cost is surprisingly low — often under $50/month for moderate usage.",
      },
      {
        question: "Can a chatbot really answer questions specific to my company?",
        answer: "Yes — that's the whole point of RAG (Retrieval-Augmented Generation). The bot doesn't guess; it searches your actual documentation and generates answers from that. The MediCare patient assistant handles questions about appointment policies, insurance coverage, and medication schedules — all pulled from the clinic's real docs.",
      },
      {
        question: "Is my business data safe when using AI APIs?",
        answer: "I exclusively use the enterprise/API endpoints from OpenAI and Anthropic, which explicitly do not use your data for training. Your customer data stays private. If data sensitivity is a major concern, I can also set up self-hosted models, though that increases infrastructure costs.",
      },
      {
        question: "What if I'm not sure whether AI makes sense for my use case?",
        answer: "That's actually the most common starting point. I'm happy to do a paid 1-hour consultation to evaluate your workflows and give you an honest assessment of where AI would genuinely help vs. where a simpler automation (or even just a better spreadsheet) is the right answer. I'd rather tell you upfront than build something you don't need.",
      },
      {
        question: "Do you build custom machine learning models or train LLMs from scratch?",
        answer: "No — and I want to be upfront about that. I specialize in integrating existing LLMs (GPT-4, Claude, Gemini) and building application logic around them. If you need a custom-trained model for computer vision, speech recognition, or domain-specific NLP, you'd need an ML engineering firm. What I do is connect the capabilities that already exist to your specific business problems.",
      },
    ],

    whyChooseUs: {
      heading: "Why I'm the Right Fit for Your AI Project",
      subtitle: "One developer who builds and ships — not a sales team that hands off to junior devs.",
      reasons: [
        { icon: "Zap", title: "I Build It Myself", description: "No project manager, no handoff to a junior developer halfway through. The person you talk to on the first call is the same person writing the code." },
        { icon: "ShieldCheck", title: "Production Track Record", description: "The MediCare patient assistant and FinTrack's automated reporting are both live, in production, handling real users. Not demos — working software." },
        { icon: "Target", title: "Honest About What AI Can't Do", description: "I'll tell you if a simpler automation solves your problem better than an LLM. Not every workflow needs AI — some just need a well-built webhook." },
        { icon: "MessageSquare", title: "Guardrails Are Not Optional", description: "Every AI integration I build includes fallback handling, confidence thresholds, and human escalation paths. The bot should know when it doesn't know." },
      ],
    },

    relatedServiceSlugs: ["web-development", "seo-content-strategy"],
    relatedBlogSlugs: ["ai-agents-replacing-saas-seats", "rag-chatbot-for-your-business-website", "microservices-vs-modular-monolith-2026"],
    relatedCaseStudySlugs: ["medicare-dashboard", "fintrack-finance-app"],
  },

  // ═══════════════════════════════════════════════════════════
  // SERVICE 3 — SEO & TECHNICAL CONTENT WRITING (absorbs Digital Marketing)
  // ═══════════════════════════════════════════════════════════
  {
    slug: "seo-content-strategy",
    title: "SEO & Technical Content Writing",
    category: "GROW",
    categoryLabel: "GROW",
    indexNumber: "03",
    subtitle: "Technical content written by a developer — SEO strategy that actually drives search traffic.",
    metaTitle: "SEO & Content Strategy Services | Code with Amrendra",
    metaDescription: "SEO and content strategy services that improve rankings, drive organic traffic, and turn visitors into customers.",
    iconName: "FileSearch",
    shortDescription: "Search-Intent Content Strategy, Technical Writing, and SEO Audits — From a Developer Who Writes.",
    ctaText: "Get a Content Strategy Call",
    ctaSecondaryText: "Chat on WhatsApp",

    hero: {
      tagline: "A Developer Who Writes — Not a Writer Who Googles",
      heading: "Technical Content That Ranks and Actually Teaches Something",
      description: "I'm a developer who writes. Not a content agency that outsources to non-technical writers and adds \"comprehensive\" before every noun. Every article on codewithamrendra.in/resources/blog is something I researched, wrote, and coded the examples for myself. If you need technical content for a SaaS blog, developer documentation, or an SEO-driven content strategy — that's what I do, and the proof is on this site.",
    },

    problems: [
      {
        title: "Your Blog Gets Zero Search Traffic",
        description: "You've published 20 articles but none of them rank for anything. No keyword research, no heading structure, no internal linking — just content published into the void.",
      },
      {
        title: "Generic Content Doesn't Impress Technical Buyers",
        description: "A CTO evaluating your product will immediately tell if your blog was written by someone who's never opened a terminal. Surface-level articles actively hurt your credibility with the audience you're trying to reach.",
      },
      {
        title: "Content Exists But Nobody Can Find It",
        description: "You might have genuinely useful docs or guides buried in your site — but without proper on-page SEO, schema markup, and internal linking, Google doesn't know they exist.",
      },
      {
        title: "No Content Strategy, Just Random Posts",
        description: "Publishing when someone has time, about whatever comes to mind, without a keyword plan or topic clustering strategy. Each article lives in isolation instead of building topical authority.",
      },
    ],

    solutions: [
      {
        title: "Search-Intent Keyword Strategy",
        description: "I map keywords to buyer lifecycle stages. \"What is RAG\" is informational intent. \"Best RAG chatbot platform\" is commercial. \"Hire AI chatbot developer\" is transactional. Each type gets different content and CTAs.",
      },
      {
        title: "Technical Content With Real Code Examples",
        description: "Articles with working code snippets, architecture diagrams, and honest trade-off discussions. The kind of content that gets bookmarked by developers and shared in Slack channels.",
      },
      {
        title: "On-Page SEO That Matches How Google Actually Works",
        description: "Proper heading hierarchy, schema markup, meta descriptions that target specific queries, internal linking between related articles and service pages. Not \"SEO magic\" — just doing the basics correctly and consistently.",
      },
      {
        title: "Topic Cluster Architecture",
        description: "Building interconnected content hubs instead of isolated articles. A pillar page on \"SaaS Architecture\" links to supporting articles on microservices, deployment, and database design — and they all link back. Google sees the topical depth.",
      },
    ],

    offerings: [
      {
        icon: "FileSearch",
        title: "SEO Content Strategy & Planning",
        description: "Quarterly content roadmaps built around search data. I identify the keywords your competitors rank for but you don't, and plan content to fill those gaps.",
      },
      {
        icon: "BookOpen",
        title: "Technical Writing & Documentation",
        description: "In-depth engineering articles, API docs, integration guides, and tutorials. Written by someone who can actually run the code examples — because I do, before publishing.",
      },
      {
        icon: "Compass",
        title: "Blog Strategy & Execution",
        description: "End-to-end management of a technical blog: keyword research → outline → writing → SEO formatting → publishing. You get articles that rank, not content you have to rewrite.",
      },
      {
        icon: "Key",
        title: "Search Intent Keyword Discovery",
        description: "Finding the actual phrases your ideal customers type into Google. Not vanity keywords with high volume — phrases with clear commercial or informational intent that match what you sell.",
      },
      {
        icon: "CheckCircle",
        title: "On-Page SEO & Technical Audits",
        description: "Fixing title tags, heading structures, canonical URLs, image alt text, crawl errors, and indexation gaps. The boring-but-critical stuff most sites get wrong.",
      },
      {
        icon: "BarChart",
        title: "Content Audit & Refresh",
        description: "Your existing blog posts might be 80% there but losing rankings because they're outdated. I audit, update, re-optimize, and re-index them — often the fastest path to more search traffic.",
      },
    ],

    benefits: [
      {
        title: "Content That Compounds Over Time",
        description: "An article published today continues generating traffic and leads 12, 18, 24 months later. Unlike ads, you don't pay per click — the ROI compounds.",
      },
      {
        title: "Credibility With Technical Decision Makers",
        description: "When a CTO reads your blog and thinks \"these people actually know what they're talking about,\" that's the moment they go from browsing to considering. Generic content never creates that moment.",
      },
      {
        title: "Search Visibility You Own",
        description: "Rankings are an asset. Unlike paid traffic that stops the day you stop paying, organic search presence is yours as long as you maintain it.",
      },
      {
        title: "A Living Portfolio as Proof",
        description: "Don't take my word for it — browse codewithamrendra.in/resources/blog. That's my technical writing in practice, ranking for real keywords, with real code examples.",
      },
    ],

    process: [
      { step: "01", title: "Content & Keyword Audit", description: "I'll analyze your current content (if any), identify keyword gaps, and look at what your competitors are ranking for that you aren't." },
      { step: "02", title: "Topic Cluster Planning", description: "Building the content architecture: pillar pages, supporting articles, and the internal linking structure that ties them together." },
      { step: "03", title: "Writing & Technical Review", description: "I write each article with code examples, architecture diagrams, and practical advice. Every code snippet is tested. Every claim is sourced." },
      { step: "04", title: "SEO Formatting & Optimization", description: "Heading hierarchy, meta tags, schema markup, image optimization, internal cross-linking. The on-page SEO layer that makes the content findable." },
      { step: "05", title: "Publishing & Distribution", description: "Formatted articles published with proper OG images and shared across relevant channels — dev communities, LinkedIn, Twitter." },
      { step: "06", title: "Performance Tracking & Iteration", description: "Monitoring search rankings, click-through rates, and time-on-page. Updating articles that are close to ranking but need a push." },
    ],

    faqs: [
      {
        question: "What makes your technical writing different from generic content agencies?",
        answer: "I write the code examples before I write the article. When I explain how to build a RAG chatbot or set up a CI/CD pipeline, those are steps I've actually followed, not something paraphrased from the first three Google results. Most content agencies assign your SaaS blog to a generalist writer who Googles the topic that morning. The difference shows up in the technical accuracy — and readers (especially developers) notice immediately.",
      },
      {
        question: "How do you pick which topics to write about?",
        answer: "Search data first, gut feeling second. I look at keyword volume, difficulty scores, competitor rankings, and search intent. But I also consider what questions your actual customers ask during sales calls — those are often the best content topics because someone is literally searching for the answer. I don't pick topics because they \"sound good\" — I pick them because the data says people are searching for them.",
      },
      {
        question: "How long does it take to see SEO results from content?",
        answer: "Honest answer: 3-6 months for meaningful organic traffic gains from new content. Some technically-focused articles with lower competition rank within 4-6 weeks. Content refreshes on existing articles often show improvements within 2-4 weeks. I won't promise page-one rankings in 30 days — anyone who does is either lying or targeting keywords nobody searches for.",
      },
      {
        question: "Can you help refresh our existing blog posts?",
        answer: "Yes, and this is often the fastest win. If you have articles that are ranking on page 2-3, a content refresh (updated information, better heading structure, internal links, schema markup) can push them to page 1. I've seen articles jump 20+ positions after a thorough refresh. It's less glamorous than writing new content, but the ROI is usually better.",
      },
      {
        question: "Do you run paid ad campaigns or manage social media?",
        answer: "No — that's not my strength, and I'd rather be honest about it than take your money for something I can't do well. I focus on organic search strategy and technical content creation. If you need PPC management or social media marketing, I can recommend people who specialize in that. What I do well is write content that ranks organically and builds long-term authority.",
      },
      {
        question: "Do you include links to our services and case studies in articles?",
        answer: "Every article I write includes strategic internal links — to your relevant service pages, case studies, and related blog posts. This isn't random linking; it's deliberate topic-cluster architecture that passes authority between pages and guides readers toward your conversion points. The ShopEase content strategy was built this way.",
      },
    ],

    whyChooseUs: {
      heading: "Why My Content Is Different",
      subtitle: "Technical writing from someone who actually builds software — not a content agency with a developer vocabulary list.",
      reasons: [
        { icon: "Search", title: "A Developer Who Writes", description: "I build Next.js apps and then write about building them. The technical accuracy isn't something I research — it's what I do every day." },
        { icon: "Zap", title: "Live Portfolio as Proof", description: "codewithamrendra.in/resources/blog isn't a sample page — it's my actual production content, ranking for real keywords, with real code examples." },
        { icon: "Target", title: "SEO Grounded in Data, Not Promises", description: "I'll show you the keyword research, the search volume numbers, and the competitive analysis. No \"trust me, this will rank\" without evidence." },
        { icon: "Infinity", title: "Content as a Long-Term Asset", description: "I build content strategies that compound. Articles published 6 months ago still bring traffic today. That's the point — and it's measurable." },
      ],
    },

    relatedServiceSlugs: ["web-development", "ai-automation"],
    relatedBlogSlugs: ["saas-architecture-guide", "docker-tutorial-for-beginners-kubernetes-guide", "microservices-vs-modular-monolith-2026"],
    relatedCaseStudySlugs: ["shopease-store-redesign"],
  },
];

/**
 * Helper to fetch a service by slug.
 */
export function getServiceBySlug(slug) {
  return SERVICES_DATA.find((service) => service.slug === slug);
}

/**
 * Helper to fetch related services for a service slug.
 */
export function getRelatedServices(serviceSlug) {
  const service = getServiceBySlug(serviceSlug);
  if (!service || !service.relatedServiceSlugs) return [];
  return SERVICES_DATA.filter((s) => service.relatedServiceSlugs.includes(s.slug));
}
