# Jaimin Katva — Portfolio

Personal portfolio for Jaimin Katva (Backend Engineer · Team Lead), built with React, Vite, Tailwind CSS,
Framer Motion and Lenis smooth scrolling. Live at <https://jaiminkatva.github.io/portfolio/>.

## Design direction

- **Aesthetic:** engineering-schematic / blueprint — ink surfaces, a single amber "signal" accent, a cyan
  "system" accent, hairline blueprint grids and connected-system diagrams.
- **Themes:** dark and light. The initial theme follows the visitor's OS setting; the nav toggle stores an
  explicit choice in `localStorage`. All colours come from CSS variables in `src/index.css` and are exposed to
  Tailwind in `tailwind.config.js` (`ink`, `paper`, `signal`, `system`, `line`). Use `line/[alpha]` for
  hairlines and translucent tints — it is white on dark and slate on light, so borders and hover states work in
  both themes without overrides.
- **Type:** Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels and data).
- **Motion:** hero load sequence, scroll-triggered reveals, animated data-flow connectors, magnetic CTAs and a
  pointer-only cursor ring. `prefers-reduced-motion` disables smooth scrolling, the cursor, transforms and
  looping animations.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173/portfolio/
npm run lint
npm run build     # outputs to dist/
npm run preview   # serves the production build
```

The site is served from the `/portfolio/` sub-path (see `base` in `vite.config.js`). Deploy the contents of
`dist/` after every build.

## Project structure

```
public/
  logo-mark.png            # Optimised logo used in the UI (jklogo.png is the full-size source)
  favicon-32.png, icon-192.png, icon-512.png, apple-touch-icon.png
  og-image.png             # 1200×630 social preview card
  site.webmanifest, robots.txt, sitemap.xml
src/
  data/content.js          # All site copy — edit this file for text changes
  hooks/useLenis.js        # Smooth scroll + in-page anchor handling; getLenis() for pausing it
  hooks/useTheme.js        # Light/dark theme state
  components/
    shared/                # SectionHeading, MagneticButton, CursorDot, SystemIcon, TechnologyMark
    Nav.jsx                # Fixed nav, active-section highlight, mobile menu (< 1024px)
    Hero.jsx, SystemDiagram.jsx
    About.jsx
    Projects.jsx           # Project cards + accessible detail modal (overview / case study, prev / next)
    Experience.jsx
    EngineeringApproach.jsx
    WhyMe.jsx              # "AI in the workflow" note
    TechStack.jsx
    Services.jsx           # Each capability opens a pre-filled enquiry email
    Contact.jsx, Footer.jsx
  App.jsx, main.jsx, index.css
```

## Before you publish — content to confirm

A few fields are intentionally left as `TODO` rather than invented. Search `src/data/content.js` for `TODO`:

- [ ] Employment dates (`experience.period`) — hidden on the page until filled in
- [ ] Confirm which project details are cleared for public disclosure

## Extending

- To add a project, add an entry to `projects` in `src/data/content.js` (including its `caseStudy` fields) and
  a matching accent in `Projects.jsx`. Cards, the modal and prev/next navigation pick it up automatically.
- To add a technology icon, map its name in `src/components/shared/TechnologyMark.jsx`.
- If the site URL changes, update the canonical, Open Graph and JSON-LD URLs in `index.html`, plus
  `public/robots.txt` and `public/sitemap.xml`.
