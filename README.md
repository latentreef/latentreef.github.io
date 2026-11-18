# Senior AI Engineer Portfolio

A vCard-style portfolio for a Senior AI Engineer, built with **Node.js + Vite**. A side menu, a tilted profile card with a CRT/TV photo effect, and a rounded panel that shows one page at a time (About, Resume, Works, Stack, Contact). Graphite with a green accent, dark by default, with a light theme.

All page content lives in **one file**, [`src/data/profile.js`](src/data/profile.js).

## Quick start

Requires **Node.js 20.19+** (or 22.12+).

```bash
npm install
npm run dev       # dev server with hot reload → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the built dist/ locally
npm run resume    # regenerate public/resume.pdf from profile.js
```

## Pages

Each page has its own URL hash, so links like `/#works` or `/#contact` open that page directly. The browser back button moves between pages.

| Page | Contents |
|---|---|
| About | Intro, info list (location, role, cloud, availability, skills), impact stats, "What I Do", "How I Work" |
| Resume | Experience and education timelines |
| Works | Products I built (real screenshots, live links), then current work; filter tabs from each project's `category`; role, metrics and tags |
| Stack | `whoami --verbose` terminal + grouped tools |
| Contact | World clocks, contact details, and a form that opens the visitor's email app with the message filled in (no server needed) |

## Light and dark theme

- On first visit the page is dark. The sun/moon button at the bottom of the side menu switches themes with a circular reveal (View Transitions API).
- Every page load starts dark (`data-theme="dark"` on `<html>` in `index.html`). The toggle only changes the current visit and is not saved.
- All colors are CSS variables in [`src/styles/base.css`](src/styles/base.css): light under `:root`, dark under `[data-theme="dark"]`. The profile card and side menu stay dark in both themes.

## Responsive design

| Width | Layout |
|---|---|
| > 1100px | Side menu + tilted card + panel with its own scrollbar, all on one screen |
| ≤ 1100px | Card on top (not tilted), panel below at full width, side menu becomes a floating bottom bar |
| ≤ 700px | Panel grids become 1 column; contact form fields stack |

The custom cursor, card tilt and spotlight turn off on touch devices. Everything respects `prefers-reduced-motion` (the photo keeps its scanlines but stops glitching; the video shows a still frame).

## Make it yours

| What | Where |
|---|---|
| Name, roles, email, socials, info list, skills | `src/data/profile.js` |
| Services, principles, stack, projects (+ category, role, image, metrics, links), experience, education | `src/data/profile.js` |
| Project screenshots | `public/works/*.jpg` (960×600), referenced by `image` in each project |
| Photo | Put `me.jpg` in `public/`, set `photo: 'me.jpg'`, tune the crop with `photoPosition` |
| "Download Resume" button | `public/resume.pdf` is generated from `profile.js`: run `npm run resume` after editing (needs a Chromium-based browser). Or drop in your own PDF. Set `cv: ''` to show "Copy email" instead |
| Background video | Replace `public/videos/fish.mp4` (or change `bgVideo.src`); tune `bgVideo.opacity`; set `bgVideo: null` to remove |
| Theme colors, radius, fonts | CSS variables at the top of `src/styles/base.css` |
| Page markup | `src/sections/pages.js` (About, Resume, Works, Contact), `src/sections/stack.js` |

In `profile.js`, wrap words in `*asterisks*` to highlight them in the accent color.

## Project structure

```
├── index.html            Vite entry shell (loader, cursor, theme pre-paint)
├── public/               Static files copied as-is (favicon, photo, video)
├── src/
│   ├── main.js           Builds the layout from data, then starts the effects
│   ├── icons.js          Inline SVG icons
│   ├── utils.js          Small helpers
│   ├── data/profile.js   ← ALL YOUR CONTENT
│   ├── sections/
│   │   ├── sidenav.js    Side menu (page links + theme button)
│   │   ├── card.js       Profile card with the CRT photo
│   │   ├── pages.js      About, Resume, Works, Contact
│   │   ├── stack.js      Stack page (terminal + tool groups)
│   │   └── shared.js     Page titles and label chips
│   ├── effects/
│   │   ├── loader.js     "Hello, world." intro + panel wipe
│   │   ├── cursor.js     Custom cursor, green burst on click
│   │   ├── hover.js      Mouse spotlight on cards
│   │   ├── background.js Background video + neural-network canvas
│   │   ├── card.js       Typing role, CRT glitches, card tilt
│   │   ├── pages.js      Page switching, Works filters, contact form, counters
│   │   └── ui.js         Clocks, theme, copy email, toast, easter egg
│   └── styles/           base.css (tokens), layout, sidenav, card, panel, pages, stack, loader, cursor
└── vite.config.js
```

## Features

- Profile card tilted in 3D that leans toward the mouse
- CRT / TV photo: grayscale, scanlines, RGB subpixel stripes, a rolling scan band, red/cyan color fringing and short glitch bursts (also on hover)
- Role typed out letter by letter with a blinking underscore
- Page titles with a green first letter on a glow dot; green label chips; divider-line grids
- Faint underwater video and a green neural-network canvas behind everything
- Animated stats, filterable project cards drawn as app-window previews, terminal that types out your profile
- "Download Resume" on the card (a PDF generated from the same data); contact form that opens an email draft
- Greeting by time of day and live world clocks (local time first)
- Fonts bundled as npm packages, so it works offline
- Easter egg: type a secret word on the page

## Credits

The background video is stitched from four free stock clips, used under a license that allows commercial and personal use without attribution.

## Deploy

`npm run build` creates static files in `dist/`. Upload them to any static host. Use build command `npm run build` and output directory `dist`.

`base: './'` in `vite.config.js` means the build also works from a sub-folder.
