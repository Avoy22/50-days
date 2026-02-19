/**
 * mindmap.js
 * Builds the 50-cell mental state heatmap grid dynamically from DAYS data.
 *
 * Each cell:
 *   - Is colored by mental state (defined in STATE_COLORS map)
 *   - Shows a CSS tooltip on hover (date · state · phase)
 *   - Highlights with an outline on click
 *
 * Also builds the legend below the grid.
 *
 * Depends on: DAYS (data.js)
 */

/**
 * Color mapping for each mental state.
 * Colors follow a semantic gradient:
 *   Reds/deep     → Destroyed states (worst)
 *   Dark grays    → Passive/Confused states (low)
 *   Muted greens  → Reflective/Neutral (transitional)
 *   Lime greens   → Determined → Unstoppable (execution arc)
 *
 * @type {Object.<string, string>}
 */
const STATE_COLORS = {
  Passive:      '#1a1a1a',
  Drained:      '#1a3a4a',
  Unstable:     '#5c1a1a',
  Destroyed:    '#8b0000',
  Confused:     '#2a2a4a',
  Reflective:   '#1a3a2a',
  Overshadowed: '#0a2a2a',
  Tired:        '#2a2222',
  Neutral:      '#1e2a1e',
  Relapsed:     '#4a2a00',
  Conflicted:   '#3a2a1a',
  Determined:   '#1a3a00',
  Focused:      '#2a5a00',
  Clear:        '#3a7a00',
  Driven:       '#5a9a00',
  Optimized:    '#7aba00',
  Peak:         '#a0d400',
  Unstoppable:  '#c8ff00',
};

/**
 * Builds the grid of 50 colored cells and injects them into #stateGrid.
 * Also sets up click-to-highlight interaction on each cell.
 */
function buildMindmap() {
  const grid = document.getElementById('stateGrid');
  if (!grid) return;

  DAYS.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'state-cell';

    // Background color driven by mental state
    cell.style.background = STATE_COLORS[d.mental] || '#1a1a1a';
    cell.style.border     = '1px solid rgba(255,255,255,.04)';

    // Tooltip content via data attribute (CSS ::after reads this)
    const dt = new Date(d.date);
    const dateStr = `${dt.toLocaleString('en', { month: 'short' })} ${dt.getDate()}`;
    cell.setAttribute('data-label', `${dateStr} · ${d.mental} · ${d.phase}`);

    // Click to highlight: outline this cell, clear all others
    cell.addEventListener('click', () => {
      grid.querySelectorAll('.state-cell').forEach(c => {
        c.style.outline      = 'none';
        c.style.outlineOffset = '0';
      });
      cell.style.outline      = `2px solid ${STATE_COLORS[d.mental]}`;
      cell.style.outlineOffset = '2px';
    });

    grid.appendChild(cell);
  });
}

/**
 * Builds the legend below the grid.
 * Shows one entry per unique mental state in order of first appearance.
 */
function buildLegend() {
  const legend = document.getElementById('stateLegend');
  if (!legend) return;

  // Preserve order of first appearance in the dataset
  const seen   = new Set();
  const states = [];
  DAYS.forEach(d => {
    if (!seen.has(d.mental)) {
      seen.add(d.mental);
      states.push(d.mental);
    }
  });

  states.forEach(state => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.innerHTML = `
      <div class="legend-dot" style="background:${STATE_COLORS[state] || '#1a1a1a'}; border:1px solid rgba(255,255,255,.1)"></div>
      ${state}
    `;
    legend.appendChild(item);
  });
}

/**
 * Entry point — call this from main.js
 */
function initMindmap() {
  buildMindmap();
  buildLegend();
}