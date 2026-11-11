/**
 * Educational content, FAQs, and cross-linking data for SEO Content Reviewer.
 * Written with strict SEO focus, clear plain English, and zero unsupported claims.
 */

export const SEO_REVIEWER_CONTENT = {
  heading: 'How the Free SEO Content Checker Works',
  subheading: 'Paste your draft or enter a live URL to get an instant SEO score out of 100. Fix missing keywords, heading structure, and readability issues as you type.',
  trustBullets: [
    { title: 'Free Forever', description: 'No subscriptions, paywalls, or daily limits.' },
    { title: 'No Signup', description: 'Open the page and start editing immediately.' },
    { title: '100% Private', description: 'Your draft text is analyzed inside your browser.' },
  ],

  howItWorksSteps: [
    {
      step: '01',
      title: 'Paste Your Content or Enter a URL',
      description: 'Paste your raw draft or Markdown text into the editor, or switch to URL mode to fetch the main content of any published web page. Enter an optional focus keyword to evaluate placement and density.',
    },
    {
      step: '02',
      title: 'Inspect Your Score & Priority Fixes',
      description: 'Our on-page SEO checker evaluates your copy across 5 core dimensions and calculates an overall score out of 100. Review the top priority fixes first so you know exactly which warnings or errors to address.',
    },
    {
      step: '03',
      title: 'Edit and Re-Score in Real Time',
      description: 'Tweak your copy, refine your headings, or expand thin sections directly in the editor. The tool re-evaluates your changes with a 200ms debounce so you can watch your SEO score improve before you publish.',
    },
  ],

  coreChecks: [
    {
      id: 'title-meta',
      weight: '25%',
      title: '1. Title and Meta Description',
      description: 'Checks title length (50–60 chars) and meta description (120–160 chars) to prevent Google SERP truncation while confirming focus keyword placement.',
    },
    {
      id: 'headings',
      weight: '20%',
      title: '2. Headings and Logical Structure',
      description: 'Verifies your article has exactly one H1 headline, includes your focus keyword, and maintains an orderly H2 and H3 hierarchy without skipped levels.',
    },
    {
      id: 'keyword',
      weight: '20%',
      title: '3. Keyword Optimization and Placement',
      description: 'Ensures your target keyword appears in the first 100 words and maintains a balanced 0.5%–2.5% density to prevent keyword stuffing penalties.',
    },
    {
      id: 'length',
      weight: '20%',
      title: '4. Content Length and Topic Depth',
      description: 'Flags thin content under 300 words, scales score with topic depth, and awards full marks for comprehensive articles reaching 800 words or more.',
    },
    {
      id: 'readability',
      weight: '15%',
      title: '5. Readability and Sentence Flow',
      description: 'Calculates Flesch Reading Ease (target 60+), detects overly long sentences, and flags dense paragraphs exceeding 120 words for smooth reading.',
    },
  ],

  scoringRules: {
    title: 'How the Score Is Calculated',
    summary: 'The overall score out of 100 is a weighted average of the 5 core checks: Title & Meta Description (25%), Headings & Structure (20%), Keyword Optimization (20%), Content Length & Depth (20%), and Readability & Sentence Flow (15%).',
    provisionalRule: "Missing a focus keyword or heading tags? We don't penalize your draft. Unspecified checks are excluded and the remaining weights automatically scale to 100% under a provisional score. Add your keyword anytime to see the full 5-check review.",
  },

  useCases: [
    {
      title: 'Bloggers & Content Creators',
      description: 'Verify that your upcoming article has a strong title, readable paragraphs, and sufficient topic depth before hitting publish in WordPress, Ghost, or Substack.',
    },
    {
      title: 'Freelance Writers & Copywriters',
      description: 'Deliver polished, client-ready drafts with verified keyword placement and readability scores without paying for bloated agency subscriptions.',
    },
    {
      title: 'Web Developers & Site Builders',
      description: 'Audit client landing pages and verify clean heading hierarchy, meta descriptions, and structural tags directly in your development workflow.',
    },
    {
      title: 'Small Business Owners & Founders',
      description: 'Check the SEO of your article or service page drafts without needing complicated software or technical SEO training.',
    },
  ],

  commonMistakes: [
    {
      title: 'Title Tags Truncating in Google Search',
      description: 'Writing a 75-character title that gets cut off mid-thought on desktop and mobile search screens.',
    },
    {
      title: 'Missing Keywords in the Introduction',
      description: 'Discussing a topic for several paragraphs before ever mentioning the target phrase readers searched for.',
    },
    {
      title: 'Multiple or Missing H1 Tags',
      description: 'Having multiple conflicting H1 tags or jumping straight from an H1 to nested H3 tags without an H2 structure.',
    },
    {
      title: 'Accidental Keyword Stuffing',
      description: 'Repeating the exact same phrase too frequently, pushing density above 2.5% and creating an unnatural reading experience.',
    },
    {
      title: 'Dense Walls of Text',
      description: 'Packing 250 words into a single uninterrupted block of text that causes mobile readers to abandon the page.',
    },
  ],

  quickExample: {
    note: 'Illustrative Example: Notice how fixing the title, meta description, and heading hierarchy immediately elevates the calculated on-page score.',
    before: {
      label: 'Before: Unoptimized Draft Snippet',
      score: 32,
      status: 'Needs Improvement',
      title: 'Guide (5 characters — Too short, missing keyword)',
      meta: 'Check this out. (16 characters — Too short)',
      h1: 'None detected',
      intro: "In today's fast world we look at many things that happen in software development every single day. (Keyword missing in first 100 words)",
    },
    after: {
      label: 'After: Refined Draft Snippet',
      score: 94,
      status: 'Passing',
      title: 'Beginner Guide to Next.js SEO: Best Practices for 2026 (54 characters — Optimal)',
      meta: 'Learn practical Next.js SEO best practices to optimize titles, heading hierarchy, and meta tags for higher search visibility and faster indexing. (148 characters — Optimal)',
      h1: '# Beginner Guide to Next.js SEO (Contains target keyword)',
      intro: 'Optimizing your Next.js SEO is essential if you want search engines to crawl and index your web application efficiently. (Keyword present in opening sentence)',
    },
  },

  privacy: {
    title: 'Privacy and Data Handling',
    browserPaste: 'When you paste text or edit content, all checks, regular expressions, and readability math run locally in your web browser. Your draft text is never sent to our database or logged on our servers.',
    serverUrl: 'When you enter a public URL, our server fetches only the publicly available HTML to extract the main article text and returns it to your browser. The fetched text is processed in memory and discarded immediately; nothing is retained or stored.',
  },

  faqs: [
    {
      question: 'Is this SEO content checker completely free to use?',
      answer: 'Yes. The tool is 100% free with no hidden charges, paywalls, or daily check caps. You can analyze as many article drafts or live web pages as you need without creating an account, signing up, or entering credit card details.',
    },
    {
      question: 'Is my content kept private and secure?',
      answer: 'Yes. When you paste or edit text in the browser, all evaluations run locally in your browser memory via client-side JavaScript. Your text is never stored in a database or logged on our servers. When using URL mode, the server fetches the public page statelessly to extract text and discards it immediately after processing.',
    },
    {
      question: 'How is the overall SEO score calculated?',
      answer: 'The overall score out of 100 is a weighted average of 5 core on-page checks: Title & Meta Description (25%), Headings & Structure (20%), Keyword Optimization (20%), Content Depth (20%), and Readability (15%). If you omit a focus keyword or heading info, those checks are excluded and the remaining weights re-normalize to 100% automatically under a provisional score.',
    },
    {
      question: 'What is the ideal title tag and meta description length?',
      answer: 'The ideal title tag length is between 50 and 60 characters. Titles under 50 characters often lack descriptive context, while titles over 60 characters get truncated by Google with ellipses in search results. For meta descriptions, the optimal length is between 120 and 160 characters to ensure clean display on both desktop and mobile screens.',
    },
    {
      question: 'Does achieving a 100/100 score guarantee Google rankings?',
      answer: 'No automated tool can guarantee search engine rankings. Search algorithms evaluate hundreds of ranking factors including backlinks, domain authority, search intent, page speed, and content helpfulness. A high score confirms your technical on-page structure and readability are clean, giving your article the best possible on-page foundation to compete.',
    },
  ],

  servicesCta: {
    title: 'Need Help Scaling Your Web Presence?',
    description: 'Building great content is only one part of growing an online business. If you need assistance building fast Next.js applications, deploying autonomous AI automation pipelines, or establishing a robust technical SEO strategy, we are here to help.',
    services: [
      { name: 'Web Development', desc: 'Modern, high-performance web applications built with Next.js and React.' },
      { name: 'AI & Automation', desc: 'Custom AI agent workflows, vector search integrations, and process automation.' },
      { name: 'SEO & Content Strategy', desc: 'Technical SEO audits, site architecture optimization, and content roadmaps.' },
    ],
    buttonText: 'Discuss Your Project',
    buttonHref: '/contact',
  },
};

export const RELEVANT_BLOG_POSTS = [
  {
    title: 'Google Spam Updates & Content Ranking Impact',
    slug: 'google-september-2026-spam-update-check-impact',
    route: '/resources/blog/google-september-2026-spam-update-check-impact',
    excerpt: 'Practical ways to audit site traffic shifts, safeguard content quality, and optimize for helpfulness.',
  },
  {
    title: 'How Much Does a Next.js Website Cost in 2026?',
    slug: 'how-much-does-a-nextjs-website-cost-in-2026',
    route: '/resources/blog/how-much-does-a-nextjs-website-cost-in-2026',
    excerpt: 'Comprehensive pricing breakdown, architecture decisions, and hosting considerations for modern web apps.',
  },
  {
    title: 'Track Search & AI Traffic Shifts in GA4',
    slug: 'check-chatgpt-traffic-drop-ga4',
    route: '/resources/blog/check-chatgpt-traffic-drop-ga4',
    excerpt: 'How to monitor referral traffic drops, segment AI bot visits, and adapt your on-page strategy in Google Analytics 4.',
  },
];
