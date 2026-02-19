# Design Decisions

> This document logs the key decisions made during development of the 50 Days project — useful for portfolio interviews, code reviews, and future reference.

---

## Architecture Decisions

### 1. No Build Tools (Zero Config)
**Decision:** Vanilla HTML/CSS/JS with no Webpack, Vite, or bundler.  
**Reason:** This is a portfolio/static site with minimal complexity. Adding a build pipeline would add maintenance overhead with no measurable benefit. GitHub Pages deploys directly from the repo root.  
**Trade-off:** No tree-shaking or minification. Acceptable at this scale.

### 2. ES Module Pattern (Without Native `type="module"`)
**Decision:** Each JS file is responsible for one concern and loaded in dependency order via `<script>` tags in `index.html`.  
**Reason:** Native ES modules require a local server (CORS). Loading ordered scripts allows direct `file://` opening during development without any tooling.  
**Order:** `data.js` → `charts.js` → `mindmap.js` → `story.js` → `execution.js` → `animations.js` → `main.js`

### 3. CSS Custom Properties for Design Tokens
**Decision:** All colors, fonts, and spacing defined in `variables.css` as CSS custom properties.  
**Reason:** Single source of truth. Changing `--lime` in one place updates the entire design system. Also enables future dark/light theme toggling with one class swap.

### 4. Intersection Observer for All Animations
**Decision:** Used `IntersectionObserver` API instead of scroll event listeners for reveal animations and counter triggers.  
**Reason:** Scroll listeners fire on every scroll frame (potentially 60+ times/second) and must be throttled manually. `IntersectionObserver` is async, non-blocking, and far more performant.

### 5. Chart.js via CDN
**Decision:** Loaded Chart.js from cdnjs.cloudflare.com, not bundled locally.  
**Reason:** CDN delivers the library from an edge server likely cached in the user's browser. No local copy to maintain. For a static portfolio site, this is the right call.

---

## CSS Architecture Decisions

### Component-Based File Splitting
Each UI section has its own CSS file in `assets/css/components/`. This mirrors how professional teams structure CSS in component-based frameworks (React, Vue) — making it easy to find, edit, and reason about styles for a specific section.

### No CSS Preprocessor
Plain CSS3 is sufficient. Custom properties replace variables, nesting isn't needed at this scale, and mixins aren't used. Adding Sass would add a compilation step with no design benefit.

### Mix-Blend-Mode Cursor
The custom cursor uses `mix-blend-mode: exclusion` — this inverts colors where the cursor overlaps content, creating a sophisticated effect that works on any background without needing to know what's underneath.

---

## Data Decisions

### Data Stored in `data.js` as a Plain Array
**Decision:** Raw data is a JavaScript array of objects, not a JSON file fetched via `fetch()`.  
**Reason:** Fetching a JSON file requires a server (CORS issue with `file://`). An inline JS array works everywhere, including double-clicking `index.html` to open it locally.

### Mental State Color Mapping
States are mapped to colors along a semantic gradient:
- Dark reds → Destroyed, Unstable (negative)
- Dark blues/grays → Confused, Passive, Drained (low)
- Dark greens → Neutral, Reflective (transitional)
- Bright lime greens → Determined → Unstoppable (execution arc)

This creates a natural "heat" story when you look at the 50-cell grid — dark and cold for 42 days, then blazing bright for the last 8.

---

## Performance Decisions

### CSS Animations Preferred Over JS
Where possible, animations use CSS `@keyframes` and `transition` rather than JS `requestAnimationFrame`. CSS animations run on the compositor thread and don't block the main thread.

### JS Counter Animation Uses `requestAnimationFrame`
The number counter animation does use `rAF` — this is appropriate because it's a tightly controlled, short-duration animation (1.6s) that only fires once per counter on scroll entry.

### No Images
Zero image assets. All visual effects (noise texture, gradients, backgrounds) are pure CSS. This makes the project load instantly with no network image requests beyond fonts.

---

## Future Improvements

- [ ] Add `prefers-reduced-motion` media query to disable animations for accessibility
- [ ] Add `aria-label` attributes to chart canvases for screen readers
- [ ] Add a "Download Data as CSV" button
- [ ] Add a dark/light theme toggle using CSS custom property swap
- [ ] Add a `/data` route showing the raw data table with sort/filter
- [ ] Minify CSS/JS with a simple npm script for production