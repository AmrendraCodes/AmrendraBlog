/**
 * Code with Amrendra — Services Data Architecture
 * Centralized data module for services landing page and service detail routes.
 */

export const SERVICES_CATEGORIES = {
  BUILD: {
    id: "BUILD",
    label: "BUILD",
    tagline: "Modern Engineering & Design",
    description: "Craft high-performance web applications, landing pages, and intuitive user interfaces built for scale.",
  },
  GROW: {
    id: "GROW",
    label: "GROW",
    tagline: "Audience & Traffic Expansion",
    description: "Amplify your online presence, attract high-intent organic traffic, and convert visitors into loyal customers.",
  },
  SCALE: {
    id: "SCALE",
    label: "SCALE",
    tagline: "Automation & Infrastructure",
    description: "Streamline business operations with intelligent AI automation and robust cloud infrastructure.",
  },
};

export const SERVICES_DATA = [
  {
    slug: "web-development",
    title: "Web Development",
    category: "BUILD",
    categoryLabel: "BUILD",
    indexNumber: "01",
    subtitle: "Build fast, modern, and scalable websites for your business.",
    metaTitle: "Modern Web Development Services | Code with Amrendra",
    metaDescription: "Fast, responsive, and SEO-optimized web development using React, Next.js, and modern frontend architecture. Build digital experiences that convert.",
    iconName: "Code2",
    shortDescription: "Custom Web Applications, High-Performance Landing Pages, and Scalable Next.js Solutions Engineered for Velocity.",
    
    hero: {
      tagline: "Fast, Scalable & Production-Ready",
      heading: "Custom Web Development Engineered for Business Growth",
      description: "We build modern, lightning-fast web applications and high-converting websites using Next.js, React, and cutting-edge web technology. Built with mobile responsiveness, Core Web Vitals optimization, and clean architecture at the core.",
    },

    problems: [
      {
        title: "Slow Page Loading Speeds",
        description: "Legacy code and unoptimized assets cause visitor bounce rates to skyrocket and tank search engine rankings.",
      },
      {
        title: "Poor Mobile Responsiveness",
        description: "Broken layouts on mobile devices alienate over 60% of potential web traffic and reduce conversion rates.",
      },
      {
        title: "Low Conversion Performance",
        description: "Outdated design patterns and slow interactions fail to guide visitors effectively towards purchase or inquiry.",
      },
      {
        title: "Weak Technical SEO Foundations",
        description: "Missing metadata, bad semantic HTML, and poor crawlability make it impossible to rank for competitive industry keywords.",
      },
    ],

    solutions: [
      {
        title: "Modern React & Next.js Architecture",
        description: "Leveraging Server-Side Rendering (SSR) and Static Site Generation (SSG) for sub-second page loads and seamless user experiences.",
      },
      {
        title: "Mobile-First Responsive Engineering",
        description: "Pixel-perfect, fluid layouts optimized for desktop, tablet, and mobile screens across all modern browsers.",
      },
      {
        title: "Conversion-Centric UX & Micro-Interactions",
        description: "Engaging interactive components and clear user pathways designed to maximize leads and customer sign-ups.",
      },
      {
        title: "Built-In SEO & Core Web Vitals Optimization",
        description: "Structured data, perfect HTML semantics, dynamic open-graph tags, and zero layout shifts out of the box.",
      },
    ],

    offerings: [
      {
        icon: "Globe",
        title: "Business Websites",
        description: "Professional corporate websites that clearly communicate your value proposition and brand authority.",
      },
      {
        icon: "Zap",
        title: "High-Converting Landing Pages",
        description: "Focused single-page experiences built to capture leads, launch SaaS products, or promote targeted campaigns.",
      },
      {
        icon: "Code",
        title: "React & Next.js Development",
        description: "Custom web application development with full state management, dynamic routing, and API integration.",
      },
      {
        icon: "Layout",
        title: "Responsive Web Engineering",
        description: "Adaptive layouts crafted to look stunning and perform smoothly across all devices and viewport sizes.",
      },
      {
        icon: "FileText",
        title: "Blog & Content Platforms",
        description: "Fast markdown or CMS-driven publishing platforms with optimized typography, search, and reading experience.",
      },
      {
        icon: "Cpu",
        title: "API & Backend Integration",
        description: "Seamless integration with third-party RESTful APIs, GraphQL endpoints, payment gateways, and authentication services.",
      },
      {
        icon: "Gauge",
        title: "Website Performance Optimization",
        description: "Drastically improve Lighthouse scores, eliminate rendering bottlenecks, and optimize JavaScript bundles.",
      },
      {
        icon: "Search",
        title: "SEO-Friendly Development",
        description: "Semantic HTML5 markup, automated sitemap generation, structured schema JSON-LD, and meta tags.",
      },
    ],

    benefits: [
      {
        title: "Sub-Second Page Load Speeds",
        description: "Delight users and satisfy search engines with blazing fast page load times and minimal layout shifts.",
      },
      {
        title: "Higher Lead & Sales Conversions",
        description: "Strategic layout structure and clear call-to-actions turn casual site visitors into paying clients.",
      },
      {
        title: "Scalable Code Maintenance",
        description: "Clean component hierarchy and modular code structure ensure easy updates as your business expands.",
      },
      {
        title: "Search Engine Dominance",
        description: "Built-in technical SEO best practices give your content the best opportunity to rank high on Google.",
      },
    ],

    process: [
      { step: "01", title: "Discovery", description: "Analyzing your business goals, target audience, technical requirements, and competitor landscape." },
      { step: "02", title: "Architecture & Wireframing", description: "Designing component structures, user flow diagrams, and interactive interface prototypes." },
      { step: "03", title: "Frontend Development", description: "Writing clean, semantic Next.js code with responsive Tailwind/CSS styling and modular components." },
      { step: "04", title: "API & Backend Integration", description: "Connecting databases, authentication, contact forms, and third-party service endpoints." },
      { step: "05", title: "Testing & Performance Audit", description: "Rigorous cross-browser testing, accessibility checking, and Core Web Vitals performance tuning." },
      { step: "06", title: "Production Deployment", description: "Deploying to edge networks (Vercel/AWS) with automated SSL, CDN caching, and domain setup." },
    ],

    faqs: [
      {
        question: "What technology stack do you use for web development?",
        answer: "We specialize in modern frontend technology including React, Next.js (App Router), HTML5, Tailwind CSS, JavaScript (ES6+), and Node.js. For hosting, we leverage platforms like Vercel and AWS.",
      },
      {
        question: "Will my website be mobile-friendly and responsive?",
        answer: "Yes, every website we build follows a mobile-first design philosophy, ensuring seamless responsiveness across smartphones, tablets, laptops, and ultra-wide desktops.",
      },
      {
        question: "How long does it take to build a custom website?",
        answer: "Project timelines depend on complexity. Landing pages typically take 1-2 weeks, while full business websites or custom web applications range from 3-6 weeks.",
      },
      {
        question: "Do you optimize websites for search engines (SEO)?",
        answer: "Yes, technical SEO is baked into our development workflow—including dynamic title tags, canonical URLs, Schema.org markup, XML sitemap generation, and Core Web Vitals optimization.",
      },
      {
        question: "Can I easily update content after launch?",
        answer: "Absolutely. We build solutions with headless CMS integration or structured content management (MDX/Markdown) so you can add blog posts or update content without touching code.",
      },
    ],

    relatedServiceSlugs: ["ui-ux-product-design", "cloud-devops", "seo-content-strategy"],
    relatedBlogSlugs: ["high-converting-landing-page", "scalable-nextjs", "react-component-systems"],
    relatedCaseStudySlugs: ["shopease-store-redesign", "fintrack-finance-app"],
  },

  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "GROW",
    categoryLabel: "GROW",
    indexNumber: "02",
    subtitle: "Grow your online visibility and reach the right audience.",
    metaTitle: "Digital Marketing & Growth Services | Code with Amrendra",
    metaDescription: "Data-driven digital marketing strategies including SEO, technical SEO, content marketing, and performance tracking to grow your online reach.",
    iconName: "TrendingUp",
    shortDescription: "Strategic Digital Marketing, SEO Campaigns, and Content Ecosystems Designed to Expand Brand Reach & Inbound Leads.",
    
    hero: {
      tagline: "Data-Driven Organic Growth",
      heading: "Strategic Digital Marketing That Drives Qualified Leads",
      description: "We help businesses grow online through high-impact SEO campaigns, technical optimization, targeted content distribution, and search visibility strategies that deliver sustainable organic growth.",
    },

    problems: [
      {
        title: "Invisible to Search Engines",
        description: "Potential customers cannot find your products or services when searching for relevant industry solutions on Google.",
      },
      {
        title: "Low Organic Traffic Volume",
        description: "Relying solely on expensive paid ads creates unsustainable customer acquisition costs and zero compound value.",
      },
      {
        title: "Unfocused Content Strategy",
        description: "Publishing content without search intent analysis leads to low engagement and visitors who never convert.",
      },
      {
        title: "Lack of Conversion Tracking",
        description: "Operating without actionable analytics makes it impossible to measure marketing ROI or identify drop-off points.",
      },
    ],

    solutions: [
      {
        title: "Comprehensive Search Engine Optimization",
        description: "Targeted keyword strategies and technical optimizations that place your brand in front of ready-to-buy searchers.",
      },
      {
        title: "Sustainable Inbound Content Marketing",
        description: "High-value articles and landing pages structured to attract, educate, and convert ideal business personas.",
      },
      {
        title: "Data-Backed Analytics & Funnel Tracking",
        description: "Clear tracking dashboards and funnel insights to continuously refine campaigns and boost conversions.",
      },
      {
        title: "Authority & Technical Outreach",
        description: "Solid technical foundations paired with ethical link-building and domain authority expansion.",
      },
    ],

    offerings: [
      {
        icon: "Search",
        title: "Search Engine Optimization (SEO)",
        description: "Complete end-to-end SEO strategy tailored to your niche, audience, and search competition.",
      },
      {
        icon: "Wrench",
        title: "Technical SEO Audits",
        description: "Resolving site architecture issues, crawl errors, canonical tags, indexation gaps, and speed bottlenecks.",
      },
      {
        icon: "FileText",
        title: "Content Marketing Strategy",
        description: "Creating buyer-focused content calendars that solve real customer problems and command search rankings.",
      },
      {
        icon: "Share2",
        title: "Social & Professional Marketing",
        description: "Strategic content sharing on platforms like LinkedIn and Twitter to build brand credibility.",
      },
      {
        icon: "Key",
        title: "Search Intent Keyword Research",
        description: "Identifying high-volume, low-competition, and high-conversion keywords for your service offerings.",
      },
      {
        icon: "Sliders",
        title: "On-Page Optimization",
        description: "Optimizing title tags, headers, image alt attributes, internal links, and content readability.",
      },
      {
        icon: "Link2",
        title: "Off-Page SEO & Authority",
        description: "Building backlink profiles through guest posting, brand mentions, and industry resource placement.",
      },
      {
        icon: "BarChart3",
        title: "Analytics & Performance Tracking",
        description: "Google Analytics 4 and Search Console setup with custom reporting dashboards for clear ROI tracking.",
      },
    ],

    benefits: [
      {
        title: "Compound Organic Traffic",
        description: "Build an evergreen acquisition engine that brings qualified leads without continuous ad spend.",
      },
      {
        title: "Higher Conversion Rates",
        description: "Attract users with clear commercial search intent who are actively looking for solutions.",
      },
      {
        title: "Stronger Brand Authority",
        description: "Establish your brand as a trusted industry leader through top search rankings and expert content.",
      },
      {
        title: "Transparent Measurable Growth",
        description: "Track keyword movements, organic impression gains, and lead submissions with complete transparency.",
      },
    ],

    process: [
      { step: "01", title: "Audit & Analysis", description: "Comprehensive review of current search visibility, backlink profile, and technical performance." },
      { step: "02", title: "Keyword & Audience Research", description: "Mapping search intent to your core service offerings and target buyer personas." },
      { step: "03", title: "Technical & On-Page Fixes", description: "Optimizing website code, metadata, internal links, and content readability." },
      { step: "04", title: "Content Engine Execution", description: "Producing and publishing keyword-optimized articles, guides, and landing pages." },
      { step: "05", title: "Authority Building", description: "Distributing content across key channels and acquiring high-quality backlinks." },
      { step: "06", title: "Monitoring & Iteration", description: "Analyzing traffic trends and refining keyword targets for continuous growth." },
    ],

    faqs: [
      {
        question: "How long does it take to see results from SEO?",
        answer: "SEO is a medium-to-long term growth channel. Initial technical improvements show impact in 4-8 weeks, with significant organic traffic gains compounding within 3-6 months.",
      },
      {
        question: "What is the difference between On-Page and Technical SEO?",
        answer: "On-Page SEO focuses on content quality, keywords, title tags, and user engagement. Technical SEO ensures search engines can crawl, render, and index your website without errors.",
      },
      {
        question: "Do you guarantee #1 ranking on Google?",
        answer: "No legitimate marketing professional guarantees #1 rankings, as Google's algorithm changes constantly. We follow industry best practices that give your site the highest probability of ranking on page one.",
      },
      {
        question: "How do you measure marketing campaign success?",
        answer: "We track organic traffic metrics, keyword position improvements, conversion rate percentages, and lead generation goal completions using Google Analytics 4 and Search Console.",
      },
    ],

    relatedServiceSlugs: ["seo-content-strategy", "web-development", "ui-ux-product-design"],
    relatedBlogSlugs: ["seo-ai-era", "high-converting-landing-page"],
    relatedCaseStudySlugs: ["shopease-store-redesign"],
  },

  {
    slug: "ai-automation",
    title: "AI & Automation",
    category: "SCALE",
    categoryLabel: "SCALE",
    indexNumber: "03",
    subtitle: "Automate workflows and integrate AI into your business.",
    metaTitle: "AI Integration & Workflow Automation Services | Code with Amrendra",
    metaDescription: "Streamline business operations with custom AI integrations, smart chatbots, automated data pipelines, and workflow optimization.",
    iconName: "Sparkles",
    shortDescription: "Custom AI API Integrations, Intelligent Chatbots, and Workflow Automation Engineering to Scale Operations Effortlessly.",
    
    hero: {
      tagline: "Intelligent Workflows & Smart AI Solutions",
      heading: "Automate Repetitive Tasks & Integrate Practical AI",
      description: "Transform your business operations by automating manual workflows and integrating tailored AI solutions. From intelligent chatbots to automated data processing and API integrations, we help you save time and focus on strategic growth.",
    },

    problems: [
      {
        title: "Manual & Time-Consuming Tasks",
        description: "Teams spend hours manually copying data, managing customer inquiries, or formatting repetitive documents.",
      },
      {
        title: "Slow Customer Response Times",
        description: "Delayed responses to customer questions lead to missed business opportunities and lower satisfaction scores.",
      },
      {
        title: "Fragmented Tool Ecosystems",
        description: "Disconnected web applications force manual data entry across multiple platforms, introducing human error.",
      },
      {
        title: "High Operational Overhead",
        description: "Scaling operations requires hiring additional support staff for tasks that can be fully automated.",
      },
    ],

    solutions: [
      {
        title: "Tailored AI API Integrations",
        description: "Connecting powerful OpenAI, Anthropic, or custom LLM APIs directly into your web applications and internal tools.",
      },
      {
        title: "24/7 Intelligent Support Agents",
        description: "Deploying custom chatbots trained on your company knowledge base to handle routine inquiries instantly.",
      },
      {
        title: "End-to-End Workflow Automation",
        description: "Creating seamless webhooks, Zapier/Make integrations, and custom Node.js automation scripts.",
      },
      {
        title: "Automated Content & Report Pipelines",
        description: "Building automated data processing systems that summarize reports, process documents, and trigger alerts.",
      },
    ],

    offerings: [
      {
        icon: "Cpu",
        title: "AI Model Integration",
        description: "Integrating modern LLM APIs (OpenAI, Claude) into web applications for smart data processing.",
      },
      {
        icon: "MessageSquare",
        title: "Custom AI Chatbots",
        description: "Building intelligent support bots trained on your documentation, FAQs, and product catalogs.",
      },
      {
        icon: "Workflow",
        title: "Workflow Automation",
        description: "Connecting business applications to eliminate repetitive manual data entry and file transfers.",
      },
      {
        icon: "Layers",
        title: "API & System Integrations",
        description: "Developing robust webhooks and API connectors between CRMs, databases, and third-party tools.",
      },
      {
        icon: "Activity",
        title: "Business Process Automation",
        description: "Streamlining lead processing, email notifications, user onboarding, and invoicing workflows.",
      },
      {
        icon: "FileCheck",
        title: "Automated Document Processing",
        description: "Extracting structured data from PDFs, emails, and forms using automated AI parsing.",
      },
    ],

    benefits: [
      {
        title: "Massive Time Savings",
        description: "Eliminate dozens of hours of weekly manual work and free up team bandwidth for core priorities.",
      },
      {
        title: "Instant Customer Support",
        description: "Provide immediate, accurate 24/7 assistance to customers, improving satisfaction and retention.",
      },
      {
        title: "Error-Free Operations",
        description: "Reduce human mistakes in data entry, invoice generation, and customer record syncs.",
      },
      {
        title: "Scalable Without Staff Bloat",
        description: "Handle 10x the volume of customer requests and background tasks without linear headcount growth.",
      },
    ],

    process: [
      { step: "01", title: "Workflow Audit", description: "Mapping current manual processes, bottlenecks, and high-impact automation targets." },
      { step: "02", title: "Architecture & Tool Selection", description: "Selecting the best combination of AI APIs, webhooks, and automation frameworks." },
      { step: "03", title: "Integration & Development", description: "Building custom API connections, prompts, logic flows, and error-handling routines." },
      { step: "04", title: "Testing & Guardrails", description: "Testing AI responses and workflows to ensure high accuracy and zero hallucinations." },
      { step: "05", title: "Deployment & Training", description: "Deploying automated workflows to production and training your team on usage." },
      { step: "06", title: "Continuous Optimization", description: "Monitoring execution logs, response quality, and refining prompts for peak efficiency." },
    ],

    faqs: [
      {
        question: "Do I need complex infrastructure to use AI in my business?",
        answer: "Not at all. We utilize cloud-hosted AI APIs (OpenAI, Anthropic) and serverless functions, meaning you get cutting-edge AI capabilities without managing hardware.",
      },
      {
        question: "Can an AI chatbot answer questions specific to my company?",
        answer: "Yes! We build chatbots using retrieval techniques trained on your specific documentation, product manuals, and company guides.",
      },
      {
        question: "Is my business data secure when integrating AI?",
        answer: "Security is paramount. We implement strict data privacy standards using official enterprise API endpoints that do not use your private data for training.",
      },
      {
        question: "What platforms can you integrate with?",
        answer: "We integrate with any platform offering an API, including Stripe, HubSpot, Slack, WhatsApp, Notion, Google Workspace, and custom SQL/NoSQL databases.",
      },
    ],

    relatedServiceSlugs: ["web-development", "cloud-devops", "digital-marketing"],
    relatedBlogSlugs: ["autonomous-ai-agents", "seo-ai-era"],
    relatedCaseStudySlugs: ["medicare-dashboard", "fintrack-finance-app"],
  },

  {
    slug: "ui-ux-product-design",
    title: "UI/UX & Product Design",
    category: "BUILD",
    categoryLabel: "BUILD",
    indexNumber: "04",
    subtitle: "Create digital experiences that are simple, intuitive, and user-focused.",
    metaTitle: "UI/UX & Product Design Services | Code with Amrendra",
    metaDescription: "User-centered UI/UX design, conversion-focused landing pages, design systems, and product interfaces that deliver delightful digital experiences.",
    iconName: "Palette",
    shortDescription: "User-Centered UI/UX Interfaces, Design Systems, and Conversion-Driven Layouts Built for Clarity & Elegance.",
    
    hero: {
      tagline: "Intuitive, Elegant & Purposeful Design",
      heading: "Design Interfaces That Users Love & Convert Effortlessly",
      description: "We craft clean, intuitive user interfaces and user experiences that solve complex workflow problems, delight users, and drive measurable business metrics across web and mobile platforms.",
    },

    problems: [
      {
        title: "Confusing User Navigation",
        description: "Cluttered layouts cause user frustration, high drop-off rates, and abandoned sign-up forms.",
      },
      {
        title: "Inconsistent Visual Brand",
        description: "Lack of visual standards across pages makes products look unprofessional and damages brand trust.",
      },
      {
        title: "Poor Conversion Layouts",
        description: "Weak visual hierarchy fails to direct user focus toward high-value calls-to-action.",
      },
      {
        title: "Inaccessible Interface Elements",
        description: "Poor color contrast and tiny touch targets create barriers for users on mobile or with accessibility needs.",
      },
    ],

    solutions: [
      {
        title: "User-Centered Wireframes & Prototypes",
        description: "Designing intuitive user flows based on empirical user behavior and visual hierarchy principles.",
      },
      {
        title: "Scalable Design Systems",
        description: "Establishing reusable typography, color tokens, and UI components for brand consistency.",
      },
      {
        title: "Conversion-Focused UI Layouts",
        description: "Strategically positioning call-to-actions, social proof, and key messaging to drive actions.",
      },
      {
        title: "Accessible & Responsive Standards",
        description: "Adhering strictly to WCAG accessibility guidelines and mobile-first responsive design specs.",
      },
    ],

    offerings: [
      {
        icon: "Monitor",
        title: "Website UI Design",
        description: "Creating modern visual interfaces for web applications, SaaS dashboards, and marketing sites.",
      },
      {
        icon: "Layout",
        title: "Landing Page Design",
        description: "Crafting high-impact landing page visual layouts optimized for clarity and high conversion rates.",
      },
      {
        icon: "Smartphone",
        title: "Responsive Design Architecture",
        description: "Designing adaptive interfaces that look stunning on mobile phones, tablets, and desktop displays.",
      },
      {
        icon: "Eye",
        title: "User Experience (UX) Audit",
        description: "Analyzing existing product interfaces to identify UX bottlenecks, friction points, and conversion gaps.",
      },
      {
        icon: "Grid",
        title: "Design Systems & Token Libraries",
        description: "Building component libraries and style guides to streamline design-to-code workflows.",
      },
      {
        icon: "Target",
        title: "Conversion Rate UX Optimization",
        description: "Redesigning key user funnels (onboarding, checkout, signup) to maximize conversion potential.",
      },
    ],

    benefits: [
      {
        title: "Delightful User Retention",
        description: "Intuitive user experiences keep visitors engaged and reduce customer churn.",
      },
      {
        title: "Higher Conversion Rates",
        description: "Clear visual hierarchy guides users effortlessly from entry to target goal completion.",
      },
      {
        title: "Faster Engineering Velocity",
        description: "Comprehensive design systems eliminate ambiguity during frontend code implementation.",
      },
      {
        title: "Premium Brand Recognition",
        description: "Sleek, modern visuals instill instant trust and position your business as an industry leader.",
      },
    ],

    process: [
      { step: "01", title: "User Research & Discovery", description: "Understanding target audience expectations, competitor designs, and user goals." },
      { step: "02", title: "Information Architecture", description: "Mapping site maps, user journeys, and wireframe structural layouts." },
      { step: "03", title: "High-Fidelity Visual Design", description: "Crafting sleek UI mockups with custom color schemes, typography, and micro-interactions." },
      { step: "04", title: "Design System Assembly", description: "Creating reusable component specs, color tokens, and UI guidelines." },
      { step: "05", title: "Usability Review", description: "Evaluating contrast ratios, touch targets, and visual consistency across viewports." },
      { step: "06", title: "Developer Handout", description: "Providing clean Figma/CSS specifications ready for pixel-perfect code implementation." },
    ],

    faqs: [
      {
        question: "What is the difference between UI and UX design?",
        answer: "UI (User Interface) focuses on visual design—colors, typography, buttons, and layout aesthetics. UX (User Experience) focuses on how the interface functions—usability, navigation logic, and user satisfaction.",
      },
      {
        question: "What deliverables will I receive from a design project?",
        answer: "You receive responsive design mockups, component style guides, design tokens (colors, typography, spacing), and developer-ready code specifications.",
      },
      {
        question: "Do you design for both mobile and desktop?",
        answer: "Yes, all design work is executed mobile-first and fully specified across mobile, tablet, and desktop breakpoints.",
      },
      {
        question: "Can you redesign an existing website or app?",
        answer: "Enthusiastically! We conduct a thorough UX audit of your current product, pinpointing usability issues and creating a modern, high-converting redesign.",
      },
    ],

    relatedServiceSlugs: ["web-development", "digital-marketing", "seo-content-strategy"],
    relatedBlogSlugs: ["minimalist-ui", "future-of-user-interfaces", "typography-rules"],
    relatedCaseStudySlugs: ["shopease-store-redesign", "medicare-dashboard"],
  },

  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    category: "SCALE",
    categoryLabel: "SCALE",
    indexNumber: "05",
    subtitle: "Deploy, optimize, and scale your digital products with confidence.",
    metaTitle: "Cloud Infrastructure & DevOps Services | Code with Amrendra",
    metaDescription: "Reliable cloud deployment, AWS infrastructure setup, CI/CD automation, serverless architecture, and performance monitoring for high-availability apps.",
    iconName: "Cloud",
    shortDescription: "Automated CI/CD Pipelines, AWS Infrastructure Optimization, and High-Availability Deployments Built for Reliability.",
    
    hero: {
      tagline: "Scalable, Secure & Automated Deployments",
      heading: "Cloud Infrastructure Built for Peak Reliability & Speed",
      description: "Ensure your applications are always fast, secure, and available. We handle AWS cloud infrastructure setup, automated CI/CD deployment pipelines, server monitoring, and cost optimization for modern web applications.",
    },

    problems: [
      {
        title: "Frequent Deployment Failures",
        description: "Manual deployment steps lead to server downtime, broken builds, and stressed engineering teams.",
      },
      {
        title: "Unexpected Server Downtime",
        description: "Unmonitored infrastructure crashes under traffic surges, causing lost revenue and damaged reputation.",
      },
      {
        title: "Bloated Cloud Infrastructure Costs",
        description: "Unoptimized AWS or cloud resources result in monthly hosting bills far higher than necessary.",
      },
      {
        title: "Slow Release Cycles",
        description: "Lack of automated testing and deployment pipelines delays feature launches by weeks.",
      },
    ],

    solutions: [
      {
        title: "Automated CI/CD Pipelines",
        description: "GitHub Actions or Vercel automated deployment pipelines for continuous integration and zero-downtime shipping.",
      },
      {
        title: "Reliable AWS & Cloud Infrastructure",
        description: "Architecting cloud setups utilizing S3, CloudFront, Lambda, ECS, and serverless edge functions.",
      },
      {
        title: "Cloud Cost & Performance Tuning",
        description: "Auditing cloud resource utilization to lower monthly infrastructure costs while boosting speed.",
      },
      {
        title: "Automated Health & Uptime Monitoring",
        description: "Real-time logging, uptime tracking, and alerting systems to catch issues before users notice.",
      },
    ],

    offerings: [
      {
        icon: "Cloud",
        title: "AWS Cloud Setup & Architecture",
        description: "Configuring secure, scalable Amazon Web Services infrastructure tailored to your app requirements.",
      },
      {
        icon: "GitBranch",
        title: "CI/CD Pipeline Automation",
        description: "Setting up GitHub Actions pipelines for automated testing, code linting, and production builds.",
      },
      {
        icon: "Server",
        title: "Website & App Deployment",
        description: "Deploying Next.js, Node.js, and static applications to Vercel, AWS CloudFront, or Docker containers.",
      },
      {
        icon: "DollarSign",
        title: "Cloud Cost Optimization",
        description: "Analyzing cloud billing and rightsizing resources to eliminate wasteful infrastructure spending.",
      },
      {
        icon: "ShieldCheck",
        title: "Security & SSL Setup",
        description: "Implementing SSL certificates, Cloudflare WAF, secure CORS headers, and environment variable vaults.",
      },
      {
        icon: "Activity",
        title: "Performance & Health Monitoring",
        description: "Setting up log aggregation, error tracking (Sentry), and synthetic uptime checks.",
      },
    ],

    benefits: [
      {
        title: "Zero-Downtime Deployments",
        description: "Ship new code updates to production seamlessly without disrupting active users.",
      },
      {
        title: "Lower Monthly Hosting Bills",
        description: "Eliminate unused resources and optimize cloud architecture to reduce monthly spend.",
      },
      {
        title: "High Availability & Uptime",
        description: "Ensure 99.9% application availability even during unexpected traffic spikes.",
      },
      {
        title: "Faster Feature Delivery",
        description: "Automate code checks and deployment steps to release product improvements daily.",
      },
    ],

    process: [
      { step: "01", title: "Infrastructure Audit", description: "Reviewing current server configurations, security policies, and deployment methods." },
      { step: "02", title: "Architecture Blueprint", description: "Designing optimal cloud architecture for scalability, speed, and cost-efficiency." },
      { step: "03", title: "Pipeline Setup", description: "Configuring GitHub Actions or CI/CD runners for automated build, test, and release flows." },
      { step: "04", title: "Cloud Deployment", description: "Provisioning AWS resources, CDN caching layers, DNS routing, and SSL security certificates." },
      { step: "05", title: "Monitoring Setup", description: "Integrating error logging, metric dashboards, and automated downtime notification alerts." },
      { step: "06", title: "Handover & Optimization", description: "Documenting infrastructure procedures and tuning resource limits for peak cost performance." },
    ],

    faqs: [
      {
        question: "Which cloud providers do you work with?",
        answer: "We specialize in AWS (Amazon Web Services), Vercel, Cloudflare, Netlify, and Docker environments tailored for web applications.",
      },
      {
        question: "What is CI/CD and why does my project need it?",
        answer: "CI/CD (Continuous Integration / Continuous Deployment) automates testing and deployment. It ensures that whenever code is updated, it is automatically checked for bugs and deployed safely without manual work.",
      },
      {
        question: "Can you help lower our current cloud hosting bill?",
        answer: "Yes! Cloud cost optimization is a key service. We audit provisioned servers, database sizes, and CDN usage to eliminate waste without sacrificing speed.",
      },
      {
        question: "Do you handle domain and SSL configuration?",
        answer: "Yes, we handle complete domain setup, DNS records, HTTPS/SSL certificates, and CDN caching configuration.",
      },
    ],

    relatedServiceSlugs: ["web-development", "ai-automation", "seo-content-strategy"],
    relatedBlogSlugs: ["aws-infrastructure-startups", "github-actions-docker", "saas-architecture-scale"],
    relatedCaseStudySlugs: ["fintrack-finance-app", "medicare-dashboard"],
  },

  {
    slug: "seo-content-strategy",
    title: "SEO & Content Strategy",
    category: "GROW",
    categoryLabel: "GROW",
    indexNumber: "06",
    subtitle: "Create content that attracts the right audience and drives organic growth.",
    metaTitle: "SEO & Content Strategy Services | Code with Amrendra",
    metaDescription: "Organic search strategy, technical SEO audits, content marketing plans, and technical writing that attract high-intent traffic to your product.",
    iconName: "FileSearch",
    shortDescription: "High-Intent Keyword Research, Content Strategy Execution, and Technical Article Writing Structured for Search Success.",
    
    hero: {
      tagline: "High-Authority Content & Technical SEO",
      heading: "Turn Strategic Content into an Evergreen Organic Traffic Engine",
      description: "Build organic reach with high-value technical content and search-focused strategies. We combine search intent research, technical writing, and structural SEO to help your brand rank higher and build lasting industry trust.",
    },

    problems: [
      {
        title: "Content That Nobody Reads",
        description: "Writing articles without search keyword strategy yields zero traffic, zero shares, and zero customer leads.",
      },
      {
        title: "Lack of Technical Authority",
        description: "Generic surface-level blog posts fail to impress technical decision makers or build industry credibility.",
      },
      {
        title: "Poor Content Structure & Formatting",
        description: "Unformatted text walls without clear headings or table of contents lead to high reader drop-off.",
      },
      {
        title: "Missing Topic Clusters",
        description: "Isolated articles without clear internal linking fail to pass domain authority or build topical relevance.",
      },
    ],

    solutions: [
      {
        title: "Search Intent Keyword Strategy",
        description: "Mapping search queries directly to buyer lifecycle stages to attract high-intent traffic.",
      },
      {
        title: "Technical & Developer Content Writing",
        description: "In-depth, accurate articles, tutorials, and guides written with authentic technical depth.",
      },
      {
        title: "SEO-Optimized Content Formatting",
        description: "Proper heading hierarchy (H1-H4), code blocks, schema markup, and clear call-to-actions.",
      },
      {
        title: "Strategic Internal Link Architecture",
        description: "Building topic clusters that interlink related articles, service pages, and case studies to boost authority.",
      },
    ],

    offerings: [
      {
        icon: "FileSearch",
        title: "SEO Content Strategy & Planning",
        description: "Quarterly content roadmaps targeted at high-converting search keywords in your industry.",
      },
      {
        icon: "BookOpen",
        title: "Technical Writing & Documentation",
        description: "In-depth engineering articles, API documentation, tutorials, and technical explainers.",
      },
      {
        icon: "Compass",
        title: "Blog Strategy & Execution",
        description: "End-to-end management of blog content calendars, from keyword selection to final publishing.",
      },
      {
        icon: "Key",
        title: "Search Intent Keyword Discovery",
        description: "Uncovering commercial and informational search phrases used by your ideal target clients.",
      },
      {
        icon: "CheckCircle",
        title: "On-Page SEO Optimization",
        description: "Refining meta titles, descriptions, heading structures, image alt text, and URL permalinks.",
      },
      {
        icon: "BarChart",
        title: "Content Audit & Refresh",
        description: "Auditing existing blog posts to update outdated content, fix broken links, and boost search rankings.",
      },
    ],

    benefits: [
      {
        title: "Topical Search Dominance",
        description: "Build authority across key industry topics so Google recognizes your domain as a primary resource.",
      },
      {
        title: "High-Intent Lead Attraction",
        description: "Connect with buyers right when they are searching for solutions to their technical challenges.",
      },
      {
        title: "Enhanced Brand Credibility",
        description: "Deep, well-researched content demonstrates technical competence and builds instant client trust.",
      },
      {
        title: "Evergreen ROI",
        description: "Articles published today continue to generate organic traffic and leads month after month for years.",
      },
    ],

    process: [
      { step: "01", title: "Content & Keyword Discovery", description: "Researching target search terms, buyer intent, and competitor content gaps." },
      { step: "02", title: "Topic Cluster Architecture", description: "Structuring pillar pages and supporting cluster articles for optimal SEO juice." },
      { step: "03", title: "Technical Writing & Review", description: "Writing detailed, well-researched content with practical examples and clean code snippets." },
      { step: "04", title: "On-Page SEO Tuning", description: "Optimizing headings, meta tags, schema markup, and internal cross-linking." },
      { step: "05", title: "Publishing & Distribution", description: "Publishing formatted articles with optimized images and sharing across channels." },
      { step: "06", title: "Performance Analysis", description: "Tracking search rank updates, page views, time-on-page, and lead conversion rates." },
    ],

    faqs: [
      {
        question: "What makes your technical writing different from generic content agencies?",
        answer: "We combine active software engineering experience with SEO knowledge. Content is written with genuine technical understanding rather than superficial AI paraphrasing.",
      },
      {
        question: "How do you select topics for our blog or content strategy?",
        answer: "We analyze search volume, keyword difficulty, competitor rankings, and buyer search intent to pick topics that directly align with your service offerings.",
      },
      {
        question: "Can you update and improve our existing blog posts?",
        answer: "Yes, content refreshing is one of the fastest ways to gain search traffic. We audit existing posts, update outdated info, fix SEO formatting, and re-index them.",
      },
      {
        question: "Do you include internal links to our services and case studies?",
        answer: "Every article is strategically interlinked with your service pages and relevant case studies to guide readers into your sales funnel.",
      },
    ],

    relatedServiceSlugs: ["digital-marketing", "web-development", "ui-ux-product-design"],
    relatedBlogSlugs: ["seo-ai-era", "high-converting-landing-page"],
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
