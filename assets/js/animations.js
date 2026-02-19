/**
 * animations.js
 * Handles all page-wide animation and interaction behaviors:
 *
 *   1. Custom cursor (mouse follower with hover expansion)
 *   2. Reading progress bar (fixed top bar, width = scroll progress)
 *   3. Scroll reveal (IntersectionObserver adds .visible to .reveal elements)
 *   4. Counter animations (hero stats + metrics strip)
 *
 * This module must be initialized after all DOM-building modules
 * (story.js, execution.js) have run, so it can observe their elements.
 */

/* ── 1. Custom Cursor ────────────────────────────────────────── */

/**
 * Tracks mouse position and updates the custom cursor element.
 * Cursor enlarges on hover over interactive elements.
 */
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Follow the mouse
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  // Expand on interactive element hover
  const interactiveSelectors = 'a, button, .phase-card, .state-cell, .conclusion-cta';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

/* ── 2. Reading Progress Bar ─────────────────────────────────── */

/**
 * Updates the fixed progress bar width based on scroll position.
 * Uses a passive scroll listener for performance.
 */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  document.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.body.scrollHeight - window.innerHeight;
    const pct      = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ── 3. Scroll Reveal ────────────────────────────────────────── */

/**
 * Uses IntersectionObserver to add .visible to elements with .reveal
 * when they enter the viewport. Stagger variants are handled by CSS
 * transition-delay on .reveal-delay-* classes.
 *
 * @param {HTMLElement[]} extraElements - Additional elements to observe
 *   (e.g., dynamically built story entries, execution rows)
 */
function initScrollReveal(extraElements = []) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — allows re-revealing if user scrolls back
      }
    });
  }, { threshold: 0.1 });

  // Static .reveal elements in the HTML
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Dynamic elements built by story.js / execution.js
  extraElements.forEach(el => observer.observe(el));
}

/* ── 4. Counter Animations ───────────────────────────────────── */

/**
 * Animates a number from 0 to `target` over `duration` milliseconds.
 * Uses an ease-out-quartic easing for a satisfying deceleration.
 *
 * @param {HTMLElement} el       - Element whose textContent will be updated
 * @param {number}      target   - Final value
 * @param {number}      duration - Animation duration in ms (default: 1600)
 */
function animateCount(el, target, duration = 1600) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out quartic: fast start, smooth deceleration
    const eased = 1 - Math.pow(1 - progress, 4);

    el.textContent = Math.round(eased * target);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Fires hero counter animations when the hero section is visible.
 * Staggered with slight delays for a cascade effect.
 */
function initHeroCounters() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => animateCount(document.getElementById('counter-days'),  50),  800);
      setTimeout(() => animateCount(document.getElementById('counter-work'),  40),  900);
      setTimeout(() => animateCount(document.getElementById('counter-zero'),   5), 1000);
      setTimeout(() => animateCount(document.getElementById('counter-peak'),   8), 1100);
      observer.disconnect(); // Only animate once
    }
  }, { threshold: 0.3 });

  observer.observe(hero);
}

/**
 * Fires metrics strip counter animations when the metrics section is visible.
 * Each metric has a `data-target` attribute with its final value.
 */
function initMetricCounters() {
  const metrics = document.getElementById('metrics');
  if (!metrics) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.metric-value[data-target]').forEach((el, i) => {
        setTimeout(() => animateCount(el, parseInt(el.dataset.target, 10)), i * 150);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(metrics);
}

/**
 * Entry point — initializes all animation systems.
 *
 * @param {HTMLElement[]} dynamicElements - Elements built by JS modules
 *   that need to be added to the scroll reveal observer
 */
function initAnimations(dynamicElements = []) {
  initCursor();
  initProgressBar();
  initScrollReveal(dynamicElements);
  initHeroCounters();
  initMetricCounters();
}