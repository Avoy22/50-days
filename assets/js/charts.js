/**
 * charts.js
 * Initializes all three Chart.js visualizations.
 *
 * Exports (as named functions on the global scope):
 *   initCharts() — called once by main.js after DOM is ready
 *
 * Charts:
 *   1. mainChart  — Line chart: Deep Work vs Waste (50-day timeline)
 *   2. sleepChart — Bar chart: Sleep hours per day
 *   3. influenceChart — Line chart: Bad influence hours per day
 *
 * Depends on: DAYS (data.js), Chart.js (CDN)
 */

/**
 * Generates day labels ("Jan 1", "Jan 2", ...) from the dataset dates.
 * @param {Array} days - The DAYS dataset
 * @returns {string[]}
 */
function buildLabels(days) {
  return days.map(d => {
    const dt = new Date(d.date);
    return `${dt.toLocaleString('en', { month: 'short' })} ${dt.getDate()}`;
  });
}

/**
 * Custom Chart.js plugin that draws phase-colored background bands
 * behind the chart data. Each band spans from one phase boundary
 * to the next, using semi-transparent phase colors.
 *
 * @type {Object} Chart.js plugin object
 */
const phaseBgPlugin = {
  id: 'phaseBg',

  /** @param {Chart} chart */
  beforeDraw(chart) {
    const { ctx, chartArea: { top, bottom }, scales: { x } } = chart;

    // Identify where each phase starts (index in DAYS)
    const regions = [];
    let prevPhase = null;
    DAYS.forEach((d, i) => {
      if (d.phase !== prevPhase) {
        regions.push({ x: i, phase: d.phase });
        prevPhase = d.phase;
      }
    });

    const phaseColors = {
      Collapse:  'rgba(255,59,59,.08)',
      Reset:     'rgba(0,212,177,.08)',
      Relapse:   'rgba(255,140,0,.08)',
      Execution: 'rgba(200,255,0,.08)',
    };

    regions.forEach((region, i) => {
      const start = region.x;
      const end   = i + 1 < regions.length ? regions[i + 1].x : DAYS.length - 1;
      const xStart = x.getPixelForValue(start);
      const xEnd   = x.getPixelForValue(end);

      ctx.fillStyle = phaseColors[region.phase];
      ctx.fillRect(xStart, top, xEnd - xStart, bottom - top);
    });
  },
};

/**
 * Shared tooltip configuration reused across all three charts.
 * @type {Object}
 */
const sharedTooltip = {
  backgroundColor: '#111',
  borderColor:     '#1e1e1e',
  borderWidth:     1,
  titleFont:  { family: "'JetBrains Mono'", size: 10 },
  bodyFont:   { family: "'JetBrains Mono'", size: 10 },
};

/**
 * Shared tick font configuration.
 * @type {Object}
 */
const monoFont = { family: "'JetBrains Mono'", size: 10 };

/**
 * Initializes all Chart.js instances.
 * Must be called after the DOM is fully loaded.
 */
function initCharts() {
  // Apply global Chart.js defaults
  Chart.defaults.color       = '#555';
  Chart.defaults.borderColor = '#1e1e1e';

  const labels = buildLabels(DAYS);

  // ── 1. Main Chart: Deep Work vs Waste ─────────────────────── //
  const mainCtx = document.getElementById('mainChart').getContext('2d');

  new Chart(mainCtx, {
    type: 'line',
    plugins: [phaseBgPlugin],
    data: {
      labels,
      datasets: [
        {
          label:                   'Deep Work (hrs)',
          data:                    DAYS.map(d => d.work),
          borderColor:             '#c8ff00',
          backgroundColor:         'rgba(200,255,0,.12)',
          borderWidth:             2,
          pointRadius:             0,
          pointHoverRadius:        5,
          pointHoverBackgroundColor: '#c8ff00',
          fill:                    true,
          tension:                 0.4,
          order:                   1,
        },
        {
          label:                   'Waste (hrs)',
          data:                    DAYS.map(d => d.waste),
          borderColor:             '#ff3b3b',
          backgroundColor:         'rgba(255,59,59,.06)',
          borderWidth:             1.5,
          pointRadius:             0,
          pointHoverRadius:        5,
          pointHoverBackgroundColor: '#ff3b3b',
          fill:                    true,
          tension:                 0.3,
          order:                   2,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color:       '#555',
            font:        monoFont,
            boxWidth:    12,
            usePointStyle: true,
          },
        },
        tooltip: {
          ...sharedTooltip,
          callbacks: {
            afterBody(items) {
              const d = DAYS[items[0].dataIndex];
              return [
                `Phase:  ${d.phase}`,
                `Mental: ${d.mental}`,
                `"${d.log.substring(0, 55)}..."`,
              ];
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,.02)' },
          ticks: { font: { ...monoFont, size: 9 }, maxTicksLimit: 10 },
        },
        y: {
          grid:  { color: 'rgba(255,255,255,.04)' },
          ticks: { font: monoFont },
          min: 0,
          max: 16,
        },
      },
    },
  });

  // ── 2. Sleep Chart ─────────────────────────────────────────── //
  const sleepCtx = document.getElementById('sleepChart').getContext('2d');

  new Chart(sleepCtx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label:           'Sleep (hrs)',
        data:            DAYS.map(d => d.sleep),
        // Zero-sleep days are red; normal days are teal
        backgroundColor: DAYS.map(d => d.sleep === 0 ? 'rgba(255,59,59,.8)' : 'rgba(0,212,177,.4)'),
        borderColor:     DAYS.map(d => d.sleep === 0 ? '#ff3b3b' : 'rgba(0,212,177,.8)'),
        borderWidth:     1,
        borderRadius:    2,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend:  { display: false },
        tooltip: sharedTooltip,
      },
      scales: {
        x: { grid: { display: false }, ticks: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { font: monoFont }, min: 0, max: 10 },
      },
    },
  });

  // ── 3. Bad Influence Chart ─────────────────────────────────── //
  const infCtx = document.getElementById('influenceChart').getContext('2d');

  new Chart(infCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label:           'Bad Influence (hrs)',
        data:            DAYS.map(d => d.bad),
        borderColor:     '#ff8c00',
        backgroundColor: 'rgba(255,140,0,.08)',
        borderWidth:     2,
        pointRadius:     0,
        fill:            true,
        tension:         0.3,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend:  { display: false },
        tooltip: sharedTooltip,
      },
      scales: {
        x: { grid: { display: false }, ticks: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { font: monoFont }, min: 0, max: 12 },
      },
    },
  });
}