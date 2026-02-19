/**
 * story.js
 * Builds the timeline story feed from a curated set of key entries.
 *
 * Rather than showing all 50 days (would be too long), this module
 * selects 9 pivotal moments that represent the narrative arc:
 *   - The worst lows (zero sleep, mental low points)
 *   - The escape (Cox's Bazar)
 *   - The relapse moment
 *   - The turning point and execution milestones
 *
 * Depends on: DAYS (data.js)
 */

/**
 * Curated key entries.
 * Each object maps to an index in DAYS and defines display metadata.
 *
 * type:
 *   'low'       → Red timeline dot (bad day)
 *   'milestone' → Lime timeline dot (breakthrough)
 *   'normal'    → Default muted dot
 *
 * @type {Array.<{idx: number, type: string, title: string}>}
 */
const KEY_ENTRIES = [
  { idx: 2,  type: 'low',       title: "Day 3 — System Failure" },
  { idx: 9,  type: 'low',       title: "Day 10 — Third Sleepless Night" },
  { idx: 24, type: 'low',       title: "Day 25 — Mental Low Point" },
  { idx: 27, type: 'normal',    title: "Day 28 — Cox's Bazar" },
  { idx: 30, type: 'normal',    title: "Day 31 — Back in the City" },
  { idx: 33, type: 'normal',    title: "Day 34 — Full Relapse" },
  { idx: 42, type: 'milestone', title: "Day 43 — The Decision" },
  { idx: 44, type: 'milestone', title: "Day 45 — First Real Code" },
  { idx: 49, type: 'milestone', title: "Day 50 — Project Shipped" },
];

/**
 * Background and text colors for the phase tags.
 * @type {Object.<string, {bg: string, color: string}>}
 */
const PHASE_TAG_COLORS = {
  Collapse:  { bg: 'rgba(255,59,59,.15)',  color: '#ff3b3b' },
  Reset:     { bg: 'rgba(0,212,177,.15)',  color: '#00d4b1' },
  Relapse:   { bg: 'rgba(255,140,0,.15)',  color: '#ff8c00' },
  Execution: { bg: 'rgba(200,255,0,.15)',  color: '#c8ff00' },
};

/**
 * Builds a single story entry DOM element.
 *
 * @param {Object} entry - Item from KEY_ENTRIES
 * @param {Object} d     - Corresponding item from DAYS
 * @returns {HTMLElement}
 */
function buildEntry(entry, d) {
  const dt      = new Date(d.date);
  const dateStr = dt.toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' });
  const pc      = PHASE_TAG_COLORS[d.phase];

  const el = document.createElement('div');
  el.className = `story-entry ${entry.type}`;

  el.innerHTML = `
    <div class="entry-date">
      ${dateStr}
      <div class="entry-phase-tag" style="background:${pc.bg}; color:${pc.color};">
        ${d.phase}
      </div>
    </div>
    <div class="entry-body">
      <div class="entry-title">${entry.title}</div>
      <div class="entry-text">${d.log}</div>
      <div class="entry-stats">
        <div class="entry-stat">Sleep <strong>${d.sleep}h</strong></div>
        <div class="entry-stat">Bad Influence <strong>${d.bad}h</strong></div>
        <div class="entry-stat">Waste <strong>${d.waste}h</strong></div>
        <div class="entry-stat">Deep Work <strong>${d.work}h</strong></div>
        <div class="entry-stat">Mental <strong>${d.mental}</strong></div>
      </div>
    </div>
  `;

  return el;
}

/**
 * Entry point — builds and injects all story entries into #storyFeed.
 * Returns the created elements so animations.js can observe them.
 *
 * @returns {HTMLElement[]} Array of created story entry elements
 */
function initStory() {
  const feed = document.getElementById('storyFeed');
  if (!feed) return [];

  const elements = KEY_ENTRIES.map(entry => {
    const d  = DAYS[entry.idx];
    const el = buildEntry(entry, d);
    feed.appendChild(el);
    return el;
  });

  return elements;
}