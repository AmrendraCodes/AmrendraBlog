---
title: "How to Build a Light & Dark Theme Toggle Using JavaScript"
slug: "how-to-build-a-light-and-dark-theme-switch-using-javascript"
date: "July 19, 2026"
readTime: "6 min read"
category: "Development"
categorySlug: "development"
excerpt: "Learn how to build a responsive Light and Dark Theme Toggle using HTML, CSS, and JavaScript. Includes complete source code, localStorage support, and best practices."
description: "Learn how to build a responsive Light and Dark Theme Toggle using HTML, CSS, and JavaScript. Includes complete source code, localStorage support, and best practices."
image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1200&auto=format&fit=crop"
featuredImage: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1200&auto=format&fit=crop"
author: "Amrendra Kumar"
tags:
  - JavaScript
  - CSS
  - HTML
  - Frontend
  - Web Development
---

# How to Build a Light & Dark Theme Toggle Using JavaScript

In today's digital era, most websites offer light and dark themes for better usability. Dark mode reduces color intensity, helping protect eyes and improve visibility, while light mode works well during daytime viewing.

Adding light and dark mode features using [HTML](https://codewithamrendra.vercel.app/category/frontend-development), [CSS](https://codewithamrendra.vercel.app/blog/mastering-tailwind-css), and [JavaScript](https://codewithamrendra.vercel.app/blog/how-to-learn-react) is straightforward. In this blog, we'll explore how to implement these themes using modern web development practices.

---

## Why Light/Dark Mode Matters

Light/Dark mode is essential for professionals who spend long hours reading or working on websites. Several factors are improved when you provide theme choices:

*   **Reduces Eye Strain:** Dark mode helps reduce eye strain, especially in low-light environments.
*   **Saves Battery:** Devices with OLED or AMOLED screens consume significantly less power rendering dark pixels.
*   **Accessibility:** Some users rely on high-contrast dark themes for better readability.
*   **User Preference:** Letting users customize their viewing experience builds a more engaging user experience.

---

## Understanding Basic Concepts

Before jumping into the code, it is important to understand the workflow of a theme switcher:

1.  **Themes:** Custom CSS rules (typically defined via variables or utility classes) that specify the background colors, text colors, and borders for each theme state.
2.  **Toggle Function:** A JavaScript event handler attached to a button that listens for click events and toggles the active theme state.
3.  **Class Manipulation:** Changing the className of a high-level element like `<body>` or `<html>` so all descendant elements update their styling accordingly.

---

## Required HTML Structure

We will start with a basic HTML structure containing a title, a description, and a button element to act as our theme switcher.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Light/Dark Mode Toggle</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>Toggle between light and dark mode for a better experience.</p>
        <button id="theme-toggle">🌙 Dark Mode</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### Key Elements of HTML
*   The `<button>` with id `theme-toggle` triggers the theme switch.
*   The `<body>` element will have the theme class toggled dynamically.

---

## Adding CSS for Light and Dark Themes

Next, we write the CSS rules. We set CSS transition effects to make background color shifts feel smooth.

```css
body {
    background-color: #ffffff;
    color: #333333;
    transition: background-color 0.3s, color 0.3s;
    font-family: Arial, sans-serif;
}

body.dark-mode {
    background-color: #121212;
    color: #f0f0f0;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    text-align: center;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
}

button:hover {
    background-color: #0056b3;
}
```

---

## Writing a JavaScript Toggle Function

Now, we add JavaScript behavior to make the button interactive. We find the button by its ID and listen for a `"click"` event.

```javascript
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});
```

---

## Adding a Toggle Button with Custom Style

To enhance the visual design of the button, we can apply custom button styles:

```css
#theme-toggle {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

#theme-toggle:hover {
  background-color: #ddd;
}
```

### Style Highlights
*   **Padding:** Provides a touch-friendly target size.
*   **Cursor Pointer:** Indicates clear hover interactivity.
*   **Transitions:** Delivers a smooth animation feedback loop.

---

## Using Icons for Better Clarity

Using emojis or SVG icons (🌞/🌙) makes the button highly intuitive. Let's rewrite the button element to use icons dynamically:

```html
<button id="theme-toggle">🌞</button>
```

```javascript
const toggleButton = document.getElementById('theme-toggle');
let isDarkMode = false;

toggleButton.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-theme');
  toggleButton.textContent = isDarkMode ? '🌙' : '🌞';
});
```

---

## Final Code Integration

Let's integrate all the methods into a single, cohesive, production-ready example including a toggle slider switch.

### HTML Layout
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toggle Button Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="toggle-container">
        <button id="themeToggle" class="toggle-btn">
            <span class="toggle-thumb"></span>
            <span class="icons">
                <span class="moon">🌙</span>
                <span class="sun">☀️</span>
            </span>
        </button>
        <span id="toggleLabel" class="toggle-label">Dark Mode</span>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### CSS Styling
```css
.toggle-container {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: Arial, sans-serif;
}

.toggle-btn {
    position: relative;
    width: 60px;
    height: 30px;
    border-radius: 15px;
    background: #ddd;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
}

.toggle-btn.active {
    background: #4CAF50;
}

.toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: all 0.3s ease;
}

.toggle-btn.active .toggle-thumb {
    left: calc(100% - 27px);
}

.icons {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    box-sizing: border-box;
}

.moon, .sun {
    font-size: 14px;
    opacity: 0.7;
}

.toggle-btn.active .moon {
    opacity: 0;
}

.toggle-btn:not(.active) .sun {
    opacity: 0;
}

.toggle-label {
    font-size: 14px;
    color: #333;
}

body.dark-mode {
    background-color: #222;
    color: #fff;
}

body.dark-mode .toggle-label {
    color: #fff;
}
```

### JavaScript Implementation
```javascript
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('themeToggle');
    const toggleLabel = document.getElementById('toggleLabel');
    
    // Check for saved user preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    // Set initial state
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        toggleBtn.classList.add('active');
        toggleLabel.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-mode');
        toggleBtn.classList.remove('active');
        toggleLabel.textContent = 'Dark Mode';
    }
    
    // Toggle button click handler
    toggleBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            toggleLabel.textContent = 'Light Mode';
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            toggleLabel.textContent = 'Dark Mode';
        }
    });
    
    // Listen for system preference changes
    prefersDarkScheme.addListener(e => {
        const newTheme = e.matches ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            document.body.classList.add('dark-mode');
            toggleBtn.classList.add('active');
            toggleLabel.textContent = 'Light Mode';
        } else {
            document.body.classList.remove('dark-mode');
            toggleBtn.classList.remove('active');
            toggleLabel.textContent = 'Dark Mode';
        }
    });
});
```

---

## Conclusion

Creating a Light/Dark toggle switch using HTML, CSS, and JavaScript is a simple yet effective way to improve the user experience on your website. Implementing preference persistence with `localStorage` and respecting system preferences with `prefers-color-scheme` ensures that your website behaves naturally for all visitors.

Feel free to customize the design to match your branding! If you have any questions or want to share your implementations, let me know in the comments below.

---

## FAQs

### 1. Can I implement dark mode without using JavaScript?

> [!NOTE]
> Yes, you can use the CSS `@media (prefers-color-scheme: dark)` media query to automatically detect and apply the user's system theme. However, using JavaScript is required if you want to let users manually override their system theme choice.

### 2. Is localStorage the only way to save theme preferences?

No, you can also use cookies or server-side session databases to remember the user's theme choice. `localStorage` is preferred for static websites because it requires no backend communication.

### 3. Will the theme reset after the user refreshes the page?

If you check `localStorage` on page load (before rendering body content, to prevent white flash), the user's selected theme will persist even after a refresh or browser restart.

### 4. Can I animate the transition between light and dark modes?

Yes! You can add CSS transitions to `background-color`, `color`, and `border-color` properties to create a smooth fade effect between themes.
