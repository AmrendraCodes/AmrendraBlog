---
title: "How to Build a Light & Dark Theme Toggle Using JavaScript"
slug: "how-to-build-a-light-and-dark-theme-switch-using-javascript"
date: "July 19, 2026"
readTime: "6 min read"
category: "Development"
categorySlug: "development"
excerpt: "Learn how to build a production-ready Light and Dark Theme Toggle using HTML, CSS, and JavaScript with localStorage persistence, system preference detection, and zero FOUC."
description: "Learn how to build a production-ready Light and Dark Theme Toggle using HTML, CSS, and JavaScript with localStorage persistence, system preference detection, and zero FOUC."
image: "/images/how-to-build-light-dark-theme-toggle-javascript.png"
featuredImage: "/images/how-to-build-light-dark-theme-toggle-javascript.png"
author: "Amrendra Kumar"
tags:
  - JavaScript
  - CSS
  - HTML
  - Frontend
  - Web Development
  - UI/UX
---

# How to Build a Light & Dark Theme Toggle Using JavaScript

In today's digital era, offering a dark mode isn't just a nice-to-have; it's a core expectation for user accessibility and comfort, and a small but meaningful part of good [UI/UX and product design](https://www.codewithamrendra.in/services/ui-ux-product-design).

While adding a basic light and dark mode feature using [HTML](https://www.codewithamrendra.in/category/development), [CSS](https://www.codewithamrendra.in/resources/blog/mastering-tailwind-css), and [JavaScript](https://www.codewithamrendra.in/resources/blog/how-to-learn-react) seems straightforward, many developers run into the same annoying problem: **The Flash of Unstyled Content (FOUC)**.

This happens when a user who prefers dark mode visits your site, but the page flashes blindingly white for a split second before the JavaScript loads and applies the dark theme.

In this guide, we will explore how to build a production-ready theme toggle that respects system preferences (`prefers-color-scheme`), saves user choices in `localStorage`, uses modern CSS variables, and—most importantly—prevents that dreaded white flash on page load.

This is the kind of frontend detail we obsess over as part of our [web development services](https://www.codewithamrendra.in/services/web-development) at [Code with Amrendra](https://www.codewithamrendra.in/).

---

## The Modern Workflow for Theme Switching

Before jumping into the code, it is important to understand the modern architecture of a theme switcher. Instead of overriding specific classes on elements, we use a scalable approach:

1. **CSS Custom Properties (Variables)** — We define our colors in variables.
2. **Data Attributes** — We toggle a `data-theme="dark"` attribute on the root `<html>` element.
3. **Local Storage** — We save the user's manual preference so it persists across sessions.
4. **System Preferences** — We fall back to the OS-level theme if the user hasn't made a manual choice.

---

## Step 1: The HTML and Accessibility

We will start with a basic HTML structure. Notice the `<button>` element. It's crucial to use semantic HTML and include an `aria-label` so screen readers understand what the button does.

Accessible, semantic markup like this is a core principle we follow across every [UI/UX and product design](https://www.codewithamrendra.in/services/ui-ux-product-design) engagement.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Light/Dark Mode Toggle</title>
    <link rel="stylesheet" href="styles.css">

    <!-- We will put our anti-FOUC script here later -->
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>Toggle between light and dark mode for a better experience.</p>

        <!-- Theme Toggle Button -->
        <button id="theme-toggle" aria-label="Toggle Dark Mode">
            <span class="icon">🌓</span>
        </button>
    </div>

    <!-- Main JavaScript at the bottom -->
    <script src="script.js"></script>
</body>
</html>
```

---

## Step 2: CSS Custom Properties (Variables)

Next, we write the CSS rules. Instead of hardcoding background colors everywhere, we define them at the `:root` level.

When the `data-theme="dark"` attribute is added to the HTML tag, the variables swap out globally.

```css
/* Base styles and Light Mode (Default) */
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --button-bg: #eeeeee;
    --button-text: #333333;
}

/* Dark Mode Overrides */
[data-theme="dark"] {
    --bg-color: #121212;
    --text-color: #f0f0f0;
    --button-bg: #333333;
    --button-text: #ffffff;
}

/* Let the browser know this page supports both */
html {
    color-scheme: light dark;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: Arial, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease; /* Smooth fade */
    margin: 0;
    padding: 0;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    text-align: center;
}

button {
    padding: 10px 20px;
    font-size: 24px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: var(--button-bg);
    color: var(--button-text);
    transition: background-color 0.3s ease;
}
```

---

## Step 3: Preventing the White Flash (FOUC)

This is the most critical step that many tutorials miss.

If you wait for your main `script.js` to load at the bottom of the `<body>`, the browser will render the page in light mode first, then read `localStorage`, and then flip to dark mode. This causes a nasty flash.

To fix this, we place a tiny, render-blocking script directly in the `<head>` of our HTML document. This executes instantly before the `<body>` is painted.

Add this inside your `<head>` tag in the HTML:

```html
<script>
    // Execute immediately to prevent FOUC
    (function() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    })();
</script>
```

> [!TIP]
> Placing this inline script in `<head>` ensures that the DOM receives `data-theme="dark"` before initial painting, completely eliminating Flash of Unstyled Content (FOUC) without adding external network latency.

---

## Step 4: The JavaScript Toggle Logic

Now, in your `script.js` file (loaded at the bottom of the body), we handle the button click event.

This script will read the current state, flip it, update the HTML attribute, and save the new preference to `localStorage`.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', () => {
        // Check current theme
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Update the DOM
        htmlElement.setAttribute('data-theme', newTheme);

        // Save to localStorage
        localStorage.setItem('theme', newTheme);

        // Update Accessibility Label
        themeToggleBtn.setAttribute(
            'aria-label',
            newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
        );
    });

    // Optional: Listen for system theme changes while the user is on the page
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only update automatically if the user hasn't set a manual preference
        if (!localStorage.getItem('theme')) {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newSystemTheme);
        }
    });
});
```

---

## Bonus: The Future of CSS with `light-dark()`

Modern web development is moving incredibly fast. If you are building for modern browsers, you can now skip CSS variables entirely and use the new `light-dark()` CSS function.

As long as you have `color-scheme: light dark;` defined, you can write CSS like this:

```css
body {
    background-color: light-dark(#ffffff, #121212);
    color: light-dark(#333333, #f0f0f0);
}
```

This automatically applies the first color in light mode and the second color in dark mode, drastically reducing the amount of CSS you have to write.

---

## Conclusion & Related Resources

Creating a Light/Dark toggle switch using HTML, CSS, and JavaScript is essential for modern user experience. By utilizing `data-theme` attributes, `localStorage`, and placing an initialization script in your `<head>`, you guarantee that your website respects the user's eyes without any jarring flashes of light.

Details like this also feed directly into [SEO and content strategy](https://www.codewithamrendra.in/services/seo-content-strategy), since performance and Core Web Vitals are ranking factors.

If you are scaling up your application, explore these related guides and services:

*   **Tailwind CSS Workflow**: Check out my complete guide on [Mastering Tailwind CSS](https://www.codewithamrendra.in/resources/blog/mastering-tailwind-css) for utility-first styling.
*   **Next.js Architecture**: Learn global state management in [Building Scalable Next.js Applications](https://www.codewithamrendra.in/resources/blog/scalable-nextjs).
*   **React Foundations**: Learn modern state and component patterns in [How to Learn React](https://www.codewithamrendra.in/resources/blog/how-to-learn-react).
*   **Professional Services**: If you'd rather have custom frontend architecture built for your business, explore our [Web Development Services](https://www.codewithamrendra.in/services/web-development), [UI/UX & Product Design](https://www.codewithamrendra.in/services/ui-ux-product-design), or browse our [Real-World Case Studies](https://www.codewithamrendra.in/resources/case-studies).

---

## FAQs

### 1. Can I implement dark mode without using JavaScript?

> [!NOTE]
> Yes. You can use the CSS `@media (prefers-color-scheme: dark)` media query to automatically detect and apply the user's system theme. However, JavaScript is required if you want to provide a button that allows users to manually override their system settings.

### 2. Why does my screen flash white before turning dark?

This is called a Flash of Unstyled Content (FOUC). It happens because your JavaScript is executing after the browser has already rendered the page in its default (light) state.

Move your `localStorage` check into a `<script>` tag inside your HTML `<head>` to fix this.

### 3. Is localStorage the best way to save theme preferences?

For static websites and single-page applications, `localStorage` is perfect.

However, if you are using Server-Side Rendering (SSR) with a framework like Next.js, it is often better to use a Cookie. Cookies can be read by the server before the HTML is even sent to the browser, entirely preventing FOUC without inline head scripts.
