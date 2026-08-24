const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (!process.env[key]) process.env[key] = value;
    }
  });
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function countWords(content) {
  if (!content) return 0;
  const clean = content.replace(/```[\s\S]*?```/g, '').replace(/<[^>]*>/g, '');
  const words = clean.match(/[\w\d'-]+/g);
  return words ? words.length : 0;
}

function calculateReadingTime(content) {
  const words = countWords(content);
  return Math.max(1, Math.ceil(words / 200));
}

const title = 'JavaScript Enlightenment: Master the Core Concepts in 2026';
const slug = 'javascript-enlightenment-master-core-concepts';
const metaDescription =
  "JavaScript Enlightenment means understanding scope, closures, prototypes, and the event loop deeply, not just using React. Here's how to get there in 2026.";
const excerpt = metaDescription;
const featuredImage = '/images/javascript-enlightenment-master-core-concepts.jpg';
const rawTags = ['JavaScript', 'Web Development', 'Frontend', 'React', 'Programming Fundamentals'];

const content = `# JavaScript Enlightenment: Master the Core Concepts in 2026

## Quick Answer

JavaScript Enlightenment means you understand **how the language actually works**: scope, closures, prototypes, \`this\`, and the event loop, instead of only knowing how to use a framework on top of it. In 2026, this matters more than ever because AI tools generate JS code fast, but only developers with strong fundamentals can debug it, review it, and know when it's wrong.

## What "JavaScript Enlightenment" Actually Means

The term comes from a well-known O'Reilly book by Cody Lindley, written to help developers move from "library user" to "JavaScript developer." The idea is simple: most people learn JavaScript through jQuery, React, or Next.js first, and the language itself second, if at all.

That order works fine until something breaks. A state update that doesn't trigger a re-render. A \`this\` value that's suddenly \`undefined\`. A closure that quietly leaks memory in a long-running app. These bugs don't show up in framework documentation. They live in the language underneath it.

Getting "enlightened" means you can explain **why** your code behaves the way it does, not just **how** to make it work by trial and error.

## Why Fundamentals Matter More in the AI-Coding Era

In 2026, a lot of JavaScript gets written by AI assistants first and reviewed by a human second. That flips the skill that matters most. You used to need to write code fast. Now you need to read code fast and catch what's wrong with it.

If you don't understand the event loop, you won't notice that a \`Promise\` callback runs before a \`setTimeout(fn, 0)\`. That detail causes real race conditions in production. If you don't understand prototypes, an AI-suggested class hierarchy can look correct and still behave oddly under the hood. Fundamentals are what let you say "wait, that's not right" before a bug ships.

This is also why interview processes at both startups and larger companies still lean on closures, scope, and the event loop. They're a fast way to check if a candidate understands the engine, not just the steering wheel.

## The 5 Concepts That Separate Framework Users From JS Developers {#the-5-concepts}

1. **Scope and Hoisting.** Every variable lives somewhere: function scope, block scope, or global scope. Knowing which one you're in explains 80% of "why is this undefined" bugs.
2. **Closures.** A closure is a function that remembers the variables from where it was created, even after that outer function has finished running. This is what powers custom hooks, debounce functions, and private state, all without a class.
3. **The \`this\` Keyword.** \`this\` isn't fixed. It depends on how a function is called, not where it's defined. Arrow functions inherit \`this\` from their surrounding scope; regular functions don't. Mixing these up is one of the most common sources of silent bugs in event handlers.
4. **Prototypes & Inheritance.** JavaScript doesn't use classical inheritance under the hood. Objects inherit from other objects through a prototype chain. \`class\` syntax is just a readable layer on top of this. Understanding the chain explains why some properties show up on \`console.log\` and others don't.
5. **The Event Loop.** JavaScript is single-threaded, but it doesn't block on network requests or timers. The call stack, microtask queue (\`Promise\`), and macrotask queue (\`setTimeout\`, events) run in a specific order, and that order explains almost every "why did this run before that" question.

Want to see one of these in practice? Our walkthrough on [building a light and dark theme switch with vanilla JavaScript](/resources/blog/how-to-build-a-light-and-dark-theme-switch-using-javascript) uses scope and event handling directly, without any framework in the way.

## Framework-First vs Fundamentals-First: A Comparison

| Metric / Aspect | Framework-First Learning | Fundamentals-First Learning |
| :--- | :--- | :--- |
| **Time to first working app** | Fast (days) | Slower (a few weeks) |
| **Debugging unfamiliar errors** | Hard (relies on Stack Overflow / AI) | Faster (root-cause reasoning) |
| **Reading AI-generated code critically** | Weak | Strong |
| **Moving between React, Vue, or vanilla JS** | Difficult (framework-locked skills) | Easy (transferable mental model) |
| **Interview performance (mid-to-senior roles)** | Often exposed on JS internals | Consistently stronger |
| **Long-term ceiling** | Plateaus around "it works" | Extends to performance & architecture |

Neither path is wrong to *start* with. Most developers, including working professionals, learn React or Next.js first because it ships products faster. The problem is stopping there. If you want to see how this plays out for React specifically, our guide on [why and how to learn React](/resources/blog/how-to-learn-react) covers the same idea from the framework side.

## Common Mistakes and Red Flags to Watch For

- **Treating \`console.log\` debugging as understanding.** Seeing something work is not the same as knowing why.
- **Skipping \`this\` because arrow functions "fix it."** They sidestep the problem in most cases, but not inside object methods or class fields.
- **Assuming closures only matter for interviews.** They quietly power \`useState\` and \`useEffect\` cleanup in every [React](/category/react) app you ship.
- **Learning TypeScript before JavaScript fundamentals.** TypeScript adds types on top of runtime behavior; it doesn't change that behavior.
- **Copy-pasting AI-generated JavaScript without tracing execution order.** Code that looks clean can still have subtle scope or timing bugs an AI won't flag on its own.

For teams shipping production apps, this isn't just a learning-curve issue. It shows up as real bugs and slower reviews. If your team needs a second pair of eyes on architecture or code quality, our [web development](/services/web-development) team works hands-on with React and Next.js codebases day to day.

## A Simple Path to Get There

You don't need a 400-page book to get "enlightened." A practical order that works well:

1. **Rebuild 2–3 small utilities from scratch**, like a debounce function or a \`once(fn)\` helper, without a library.
2. **Read the [MDN closures guide](/category/development)** once, then explain it out loud to someone else.
3. **Trace one real async bug you've hit** and write down exactly why it happened.
4. **Only after that, layer TypeScript and framework patterns on top.**

This order is slower for the first week and faster for the next five years.

## Conclusion

JavaScript Enlightenment isn't about memorizing trivia or finishing a 400-page book cover to cover. It's about reaching the point where scope, closures, prototypes, and the event loop stop feeling like separate topics and start feeling like one connected mental model. That model is what lets you debug faster, review AI-generated code with confidence, and move between React, Vue, or plain JavaScript without relearning the basics each time.

If you've been leaning on a framework without ever looking underneath it, you don't need to start over. Pick one concept from this guide — closures are usually the best starting point. Rebuild a small piece of it from scratch this week. If you want more hands-on JavaScript walkthroughs like this one, our [blog](/resources/blog) has more practical guides to work through. That single habit, repeated over a few months, is the real path to enlightenment.

## Frequently Asked Questions

### What is JavaScript Enlightenment?
It's the point where you understand JavaScript's core mechanics, including scope, closures, prototypes, \`this\`, and the event loop, well enough to explain your own code's behavior, not just get it to run.

### Should I learn JavaScript fundamentals if I only use React?
Yes. React's hooks, state updates, and re-render behavior are all built on closures and scope. Skipping fundamentals makes React bugs harder to debug, not easier.

### Is learning closures still worth it in 2026 with AI code assistants?
More than before. AI tools write code fast; they don't guarantee it's correct. Understanding closures and scope is what lets you catch subtle bugs an AI assistant won't flag.

### Should I learn JavaScript before TypeScript?
Yes, at least the fundamentals. TypeScript adds compile-time types but doesn't change JavaScript's runtime behavior. Closures, \`this\`, and the event loop work exactly the same either way.

### How long does it take to really understand JavaScript deeply?
Most developers get a solid grasp of scope, closures, and \`this\` within 3–4 weeks of focused practice, not by reading passively, but by rebuilding small utilities from scratch.

### Is "JavaScript Enlightenment" a book or just a concept?
Both. It's the title of a well-known O'Reilly book by Cody Lindley, and it's become shorthand in the developer community for "deeply understanding JS instead of just using a library on top of it."

### What's the fastest way to test if I actually understand a concept like closures?
Try explaining it without code, then write a small example from memory. If you have to look up the syntax for something basic like a closure or \`this\`, that's a sign to slow down and rebuild it yourself.
`;

async function publishBlog() {
  console.log('🚀 Publishing new blog post to database...');

  // 1. Find Author
  const author = await prisma.user.findFirst();
  const authorId = author?.id || null;

  // 2. Find Category (Development)
  let category = await prisma.category.findUnique({ where: { slug: 'development' } });
  if (!category) {
    category = await prisma.category.findFirst();
  }

  // 3. Register or Find Media item
  const mediaFileName = 'javascript-enlightenment-master-core-concepts.jpg';
  let media = await prisma.media.findFirst({ where: { fileName: mediaFileName } });
  if (!media) {
    media = await prisma.media.create({
      data: {
        fileName: mediaFileName,
        publicId: `media_${Date.now()}_js_enlightenment`,
        url: featuredImage,
        secureUrl: featuredImage,
        format: 'jpg',
        width: 1200,
        height: 800,
        bytes: 287666,
        folder: 'blog',
      },
    });
    console.log('✅ Registered media item in database:', media.id);
  }

  // 4. Resolve Tags
  const tagIds = [];
  for (const tagName of rawTags) {
    const tagSlug = slugify(tagName);
    let tag = await prisma.tag.findFirst({
      where: {
        OR: [{ slug: tagSlug }, { name: tagName }],
      },
    });
    if (!tag) {
      tag = await prisma.tag.create({
        data: { name: tagName, slug: tagSlug },
      });
    }
    tagIds.push(tag.id);
  }

  // 5. Upsert Blog Post
  const post = await prisma.blog.upsert({
    where: { slug },
    update: {
      title,
      slug,
      content,
      excerpt,
      description: excerpt,
      featuredImage,
      metaTitle: title,
      metaDescription,
      canonicalUrl: `https://www.codewithamrendra.in/resources/blog/${slug}`,
      ogImage: featuredImage,
      status: 'PUBLISHED',
      readingTime: `${calculateReadingTime(content)} min`,
      wordCount: countWords(content),
      categoryId: category ? category.id : null,
      categorySlug: category ? category.slug : null,
      authorId,
      authorName: 'Amrendra Kumar',
      publishedAt: new Date(),
    },
    create: {
      title,
      slug,
      content,
      excerpt,
      description: excerpt,
      featuredImage,
      metaTitle: title,
      metaDescription,
      canonicalUrl: `https://www.codewithamrendra.in/resources/blog/${slug}`,
      ogImage: featuredImage,
      status: 'PUBLISHED',
      readingTime: `${calculateReadingTime(content)} min`,
      wordCount: countWords(content),
      categoryId: category ? category.id : null,
      categorySlug: category ? category.slug : null,
      authorId,
      authorName: 'Amrendra Kumar',
      publishedAt: new Date(),
    },
  });

  // 6. Connect tags
  await prisma.blogTag.deleteMany({ where: { blogId: post.id } });
  for (const tagId of tagIds) {
    await prisma.blogTag.create({
      data: {
        blogId: post.id,
        tagId,
      },
    });
  }

  console.log('🎉 Blog post published successfully!');
  console.log(`📌 ID:       ${post.id}`);
  console.log(`📌 Title:    ${post.title}`);
  console.log(`📌 Slug:     ${post.slug}`);
  console.log(`📌 Words:    ${post.wordCount}`);
  console.log(`📌 Read:     ${post.readingTime} min`);
  console.log(`📌 Category: ${category ? category.name : 'None'}`);
  console.log(`📌 URL:      https://www.codewithamrendra.in/resources/blog/${post.slug}`);
}

publishBlog()
  .catch((err) => {
    console.error('❌ Failed to publish post:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
