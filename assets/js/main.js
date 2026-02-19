/**
 * main.js
 * Application entry point.
 *
 * Bootstraps all modules in the correct dependency order after the DOM
 * is fully parsed. Each module is self-contained — main.js only calls
 * their public init functions and passes results between them where needed.
 *
 * Initialization order:
 *   1. initCharts()    — Renders Chart.js visualizations (reads DAYS)
 *   2. initMindmap()   — Builds mental state heatmap grid (reads DAYS)
 *   3. initStory()     — Builds story feed DOM (reads DAYS) → returns elements
 *   4. initExecution() — Builds exec bars DOM (reads DAYS) → returns elements
 *   5. initAnimations(dynamicElements) — Observes all reveal targets
 *
 * All modules depend on DAYS from data.js, which is loaded first via
 * script tag order in index.html.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Step 1: Charts ─────────────────────────────────────────── //
  // Chart.js must be available (loaded via CDN before this script)
  if (typeof Chart !== 'undefined') {
    initCharts();
  } else {
    console.warn('[main.js] Chart.js not loaded — charts will not render.');
  }

  // ── Step 2: Mental State Heatmap ───────────────────────────── //
  initMindmap();

  // ── Step 3: Story Feed ─────────────────────────────────────── //
  // Returns newly created DOM elements that need scroll-reveal observers
  const storyElements = initStory();

  // ── Step 4: Execution Sprint Bars ──────────────────────────── //
  // Returns newly created DOM elements that need scroll-reveal observers
  const execElements = initExecution();

  // ── Step 5: Animations ─────────────────────────────────────── //
  // Combine all dynamically built elements for the scroll reveal observer
  const dynamicElements = [...storyElements, ...execElements];
  initAnimations(dynamicElements);

});