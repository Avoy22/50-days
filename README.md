# 50 Days — A System Rebuilt from Collapse

> A data-driven personal narrative visualizing 50 days of behavioral tracking, mental state mapping, and the turning point that changed everything.

**Live Demo:** [avoy22.github.io/50-days](https://avoy22.github.io/50-days)  
**Author:** Avoy  
**Location:** Dhaka, Bangladesh  
**Period:** January 1 – February 19, 2026

---

## Project Overview

This is a frontend data storytelling project built with vanilla HTML, CSS, and JavaScript. It transforms a personal 50-day behavioral log into an interactive, scroll-driven narrative — demonstrating data visualization, animation, and editorial design at a professional level.

### What It Tracks
- **Sleep Hours** per day
- **Bad Influence Hours** (people/environments that drain focus)
- **Waste Hours** (unproductive time)
- **Deep Work Hours** (focused, productive output)
- **Mental State** (daily subjective assessment)
- **System Phase** (Collapse → Reset → Relapse → Execution)

---

## Features

| Feature | Description |
|---|---|
| Hero Section | Animated counters, large editorial typography, phase intro |
| Phase Cards | 4-phase breakdown with key stats per phase |
| Line Charts | Deep Work vs Waste over 50 days with phase background shading |
| Sleep Chart | Bar chart with zero-sleep days highlighted in red |
| Influence Chart | Bad influence trend line across all 50 days |
| Metrics Strip | Animated scroll-triggered counters on highlight background |
| Mental State Grid | 50-cell heatmap, one cell per day, color-coded by mental state |
| Execution Bars | Animated progress bars for the 8-day execution sprint |
| Story Feed | 9 key journal entries with stats, phase tags, timeline dots |
| Scroll Animations | Intersection Observer-based reveal on scroll |
| Custom Cursor | CSS blend-mode cursor with hover state |
| Progress Bar | Fixed reading progress bar at top of viewport |
| Fully Responsive | Mobile-first breakpoints at 600px and 900px |

---

## File Structure

```
50-days/
│
├── index.html                  # Entry point — semantic HTML shell
│
├── assets/
│   ├── css/
│   │   ├── variables.css       # Design tokens (colors, fonts, spacing)
│   │   ├── base.css            # Reset, body, global utilities
│   │   ├── animations.css      # Keyframes and transition classes
│   │   └── components/
│   │       ├── nav.css         # Navigation bar
│   │       ├── hero.css        # Hero section
│   │       ├── phases.css      # Phase cards grid
│   │       ├── charts.css      # Chart wrapper containers
│   │       ├── metrics.css     # Metrics highlight strip
│   │       ├── mindmap.css     # Mental state heatmap grid
│   │       ├── story.css       # Story feed / journal entries
│   │       ├── execution.css   # Execution sprint bars
│   │       └── footer.css      # Footer and conclusion
│   │
│   └── js/
│       ├── data.js             # Raw dataset (50 days)
│       ├── charts.js           # All Chart.js chart initializations
│       ├── mindmap.js          # Mental state grid builder
│       ├── story.js            # Story feed DOM builder
│       ├── execution.js        # Execution bars DOM builder + animation
│       ├── animations.js       # Scroll reveal, counters, cursor, progress
│       └── main.js             # Entry point — initializes all modules
│
├── docs/
│   └── DECISIONS.md            # Engineering & design decisions log
│
└── README.md                   # This file
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 (custom properties, grid, flexbox, keyframes) |
| Logic | Vanilla JavaScript ES6+ (modules pattern) |
| Charts | Chart.js 4.4.1 (via CDN) |
| Fonts | Google Fonts (Bebas Neue, Cormorant Garamond, JetBrains Mono) |
| Hosting | GitHub Pages |

**No build tools. No frameworks. No dependencies beyond Chart.js.**  
Pure frontend — opens directly in any browser.

---

## Getting Started

### Run Locally

```bash
# Clone the repository
git clone https://github.com/avoy22/50-days.git

# Navigate into the project
cd 50-days

# Open in browser (any of these work)
open index.html
# or
python3 -m http.server 8080
# then visit http://localhost:8080
```

### Deploy to GitHub Pages

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "feat: initial release — 50 Days data story"

# Push to GitHub
git remote add origin https://github.com/avoy22/50-days.git
git branch -M main
git push -u origin main
```

Then in GitHub repo:
1. Go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select **main** branch, **/ (root)** folder
4. Click **Save**
5. Site will be live at `https://avoy22.github.io/50-days`

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080808` | Page background |
| `--surface` | `#111111` | Card / section backgrounds |
| `--border` | `#1e1e1e` | Dividers, borders |
| `--text` | `#e8e3d8` | Primary text |
| `--muted` | `#555555` | Secondary text, labels |
| `--lime` | `#c8ff00` | Primary accent, Execution phase |
| `--red` | `#ff3b3b` | Collapse phase, zero-sleep alerts |
| `--teal` | `#00d4b1` | Reset phase |
| `--orange` | `#ff8c00` | Relapse phase |

### Typography

| Role | Font | Weight |
|---|---|---|
| Display / Headings | Bebas Neue | 400 |
| Body / Narrative | Cormorant Garamond | 300, 400, 600 |
| Data / Labels / Code | JetBrains Mono | 300, 400, 500 |

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Chrome/Safari | ✅ Responsive |

---

## License

MIT License — use freely, credit appreciated.

---

*Built as a portfolio project demonstrating frontend data visualization, editorial design, and personal narrative storytelling.*