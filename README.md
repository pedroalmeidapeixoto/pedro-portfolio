
![Capa do Projeto](docs/cover.png)

# Pedro Henrique Peixoto — Portfolio

Personal portfolio built with React + Vite, featuring a real-time infrastructure panel powered by a Vercel Serverless API, PostgreSQL/Supabase and GitHub API integration.

The portfolio goes beyond a static presentation: the infrastructure panel consumes real API endpoints, executes database operations and displays live request activity.

## Tech Stack

- React
- Vite
- JavaScript
- Node.js
- Vercel Serverless Functions
- PostgreSQL
- Supabase
- GitHub API

## Project Structure

```text
pedro-portfolio/
├── api/
│   ├── activity.js
│   ├── github.js
│   ├── health.js
│   └── projects.js
├── db/
│   └── schema.sql
├── public/
├── src/
├── index.html
├── package.json
└── vite.config.js
## Motion

The page motion comes from the client sites built with the same method (DJ Auto Center, Thiago Bike, Aluizio Bicicletas), in the portfolio's own palette:

| Effect | Where |
| --- | --- |
| Intro on every visit: the `{ P }` monogram draws itself, the name appears, three lines of a first request and a loader count to 100, then the curtain lifts (never with reduced motion) | `src/components/Intro.jsx`, `src/motion3.css` |
| Smooth scroll (Lenis), sheets that slide over each other, reveals, parallax, progress bar | `src/hooks/useMotion.js`, `src/motion.css` |
| Masked headline in the hero | `Hero.jsx`, `.mask` in `motion.css` |
| Two meshing gears that turn with the scroll speed | `src/components/Gears.jsx`, `useSpin` in `src/hooks/useScrollFx.js` |
| Manifesto: one sentence lights up word by word | `src/components/Manifesto.jsx`, `useScrubWords` |
| "One request, end to end": a pinned blueprint where a packet crosses CLIENT, API, SERVICE and DATABASE | `src/components/Journey.jsx`, `useSceneProgress` |
| Projects as a pinned horizontal rail, with a packet crossing the layers of each project (React, Express, RBAC, PostgreSQL / Controller, Service, Repository, PostgreSQL); vertical list on narrow screens | `src/components/Projects.jsx`, `useRail` |
| The profile terminal types itself out; headlines wipe up; gears behind the contact block | `About.jsx`, `src/motion2.css`, `Contact.jsx` |
| Project covers (one 4.3:1 banner shape for all): cropped screenshots of MedRecord and the Panificadora Sevylha site, and a cover drawn in code with the real loan routes for the Library API. A project can carry a `live` address (Sevylha: https://panificadora-sevylha-site.vercel.app/, shown as a button, the arrow and the cover link) and/or a repository `url`; Sevylha has no repository link because its repository is private. Details open and close with a grid-row transition | `Projects.jsx`, `LibraryCover.jsx`, `src/assets/` |
| The rail is split into categories by divider blocks (Back-end: GymCore (C#, first), MedRecord, Library; Front-end: Sevylha; Portals I maintain, technical side only: Portal do Callado, Infforma). Each project carries a `cat` (and optional `caseLabels`, `live`, `url`) in `translations.js`; the covers are cropped screenshots (GymCore: the admin dashboard of the V4 HTML prototype) | `Projects.jsx` (`CategoryDivider`, `COVERS`), `src/motion3.css` |
| API Client: explains what the live panel is, shows the request cycle (GET, POST, PATCH, GET, DELETE) and a history table of the last responses | `Skills.jsx`, `src/motion3.css` |
| Route meter fixed at the bottom: the same packet crosses the stack as the page is read | `src/components/RouteWidget.jsx` |

Everything is drawn in SVG and CSS; the only new dependency is `lenis`. With `prefers-reduced-motion` nothing moves and the scenes show their final state.
