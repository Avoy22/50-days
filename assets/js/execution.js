/**
 * execution.js
 * Builds and animates the execution sprint progress bars.
 *
 * Filters DAYS for Phase === 'Execution', renders one bar row per day.
 * Bar width starts at 0% and animates to the target percentage when
 * the section enters the viewport (IntersectionObserver).
 *
 * Max deep work is 8 hours (100% bar width).
 *
 * Depends on: DAYS (data.js)
 */

/**
 * Renders a single execution bar row.
 *
 * @param {Object} d       - A DAYS entry with phase === 'Execution'
 * @param {number} maxWork - Maximum possible work hours (used to calc percentage)
 * @returns {HTMLElement}  - The .exec-row div
 */
function buildExecRow(d, maxWork = 8) {
  const dt      = new Date(d.date);
  const dateStr = `${dt.toLocaleString('en', { month: 'short' })} ${dt.getDate()}`;
  const pct     = (d.work / maxWork) * 100;

  const row = document.createElement('div');
  row.className = 'exec-row reveal';

  row.innerHTML = `
    <div class="exec-date">${dateStr}</div>
    <div class="exec-state">${d.mental.toUpperCase()}</div>
    <div class="exec-bar-wrap">
      <div class="exec-bar" data-pct="${pct}"></div>
    </div>
    <div class="exec-hours">${d.work}h</div>
  `;

  return row;
}

/**
 * Triggers all bar fill animations with a stagger delay.
 * Called once by the IntersectionObserver when the section is visible.
 *
 * @param {HTMLElement} container - The parent container with .exec-bar elements
 */
function animateBars(container) {
  const bars = container.querySelectorAll('.exec-bar');
  bars.forEach((bar, i) => {
    setTimeout(() => {
      bar.style.width = bar.dataset.pct + '%';
    }, i * 120); // 120ms stagger between each bar
  });
}

/**
 * Entry point — builds all rows, sets up scroll-triggered animation.
 * Returns the created elements so animations.js can observe them for reveal.
 *
 * @returns {HTMLElement[]} Array of created exec-row elements
 */
function initExecution() {
  const container = document.getElementById('execBars');
  if (!container) return [];

  // Filter only Execution phase days
  const execDays = DAYS.filter(d => d.phase === 'Execution');

  const elements = execDays.map(d => {
    const row = buildExecRow(d);
    container.appendChild(row);
    return row;
  });

  // Watch the parent section — animate bars when it enters viewport
  const section = document.getElementById('execution-section');
  if (section) {
    let animated = false;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !animated) {
        animated = true; // Prevent re-triggering on scroll back up
        animateBars(container);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
  }

  return elements;
}