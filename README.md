# Jaimin Katva — Portfolio

A premium, futuristic React portfolio for Jaimin Katva (Backend Engineer · Team Lead · Product Builder),
built with React, Vite, Tailwind CSS, Framer Motion and Lenis smooth scrolling.

## Design direction

- **Aesthetic:** engineering-schematic / blueprint — deep ink-navy background, a single amber "signal" accent
  (used the way a status indicator light is used: sparingly, to mark what matters), a hairline blueprint grid,
  and an animated system-architecture diagram in the hero as the one bold, memorable visual.
- **Type:** Space Grotesk for display/headings, IBM Plex Sans for body copy, IBM Plex Mono for
  labels, coordinates and data.
- **Motion:** one orchestrated hero load sequence, scroll-triggered reveals (once per element, not looping),
  a magnetic CTA button, a lightweight custom cursor, and a continuously animated data-flow diagram. Reduced
  motion preferences are respected throughout (see `useLenis` and `CursorDot`).

## Getting started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/content.js         # All site copy in one place — edit this file for text changes
  hooks/useLenis.js        # Smooth-scroll setup
  components/
    shared/                # SectionHeading, MagneticButton, CursorDot — reused across sections
    Nav.jsx
    Hero.jsx
    SystemDiagram.jsx      # Animated SVG architecture diagram used in the hero
    About.jsx
    WhatIBuild.jsx
    Projects.jsx
    EngineeringApproach.jsx
    TechStack.jsx
    Experience.jsx
    Leadership.jsx
    Services.jsx
    Contact.jsx
    Footer.jsx
  App.jsx
  main.jsx
  index.css
```

## Before you publish — content to confirm

This site was built strictly from the approved content brief. A few fields are intentionally left as
`TODO` rather than invented, per the brief's own case-study rule ("never manufacture performance numbers
or outcomes"). Search `src/data/content.js` for `TODO` and fill in:

- [ ] Public email address and GitHub URL (`identity`)
- [ ] Exact job title / employment dates (`experience.period`)
- [ ] Confirm which project details/screenshots are cleared for public disclosure

## Notes on the architecture diagram

`SystemDiagram.jsx` renders a representative request/data flow (client → API → services → data → infra),
not a diagram of any specific client's proprietary architecture. Swap the `nodes`/`edges` arrays if you'd
like it to reflect a particular project instead.

## Extending

- To add a project, add an entry to the `projects` array in `src/data/content.js`. Cards render automatically.
- To add a project, include its project brief and `caseStudy` fields; both modal views render from the same entry.
- Tailwind tokens (colors, fonts) live in `tailwind.config.js` — the palette is intentionally narrow (ink,
  paper, signal, system) to keep the site restrained.
