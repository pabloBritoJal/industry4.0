# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — `next lint` (ESLint 8, `eslint-config-next`)

No test framework is configured. Node 26.x is pinned in `engines` (for Vercel).

## Architecture

Next.js 14 App Router site (TypeScript strict, Tailwind, zustand), a blog/portfolio about Industry 4.0 plus a few personal pages. Content is static, not CMS- or API-backed.

- **Routes** live in `app/`: `blog`, `solutions` (+ `[slug]` detail), `plans`, `aboutUs`, `solar`, `fitSection`. Route-specific components sit in a `components/` folder next to each page; shared ones are in top-level `components/global` and `components/home`. `app/layout.tsx` wraps every page with `NavBar`/`Footer`.
- **Content as data**: `data/` holds typed content arrays (`blogData.ts`, `solutionsData.ts`, `mockSolutionsMain.ts`) with types in `types/`. `solutions/[slug]/page.tsx` finds the entry whose `meta.url_slug` matches the route param and renders it with `ContentDetailPage`; add a solution by adding an entry to `solutionsData`. Images are imported from `assets/` in the data files.
- **State**: a single zustand store (`store/usePathNameStore.tsx`) tracks the current path name for the nav. `utils/setClasseNames.ts` builds NavBar class names from the menu-open state.
- **`app/fitSection`** is a self-contained client-side workout tracker, unrelated to the rest of the site: `data.ts` (days/exercises/types), `progress.ts` (previous-set lookup and progression suggestions), `styles.ts` (injected CSS string), and a large `page.tsx`. All state is persisted in `localStorage` under `STORAGE_KEY` (`pablo-fullbody-v1`) — changing its shape needs backward-compatible parsing (see `parseJournal`).
- **Path aliases** (`tsconfig.json`): `@*` maps to `./*`, so `@components/...`, `@data/...`, `@assets/...`, `@styles/...` resolve to top-level folders (a path starting with `@` + folder name).
- **SVGs** are imported as React components via `@svgr/webpack` (configured in `next.config.js`, `icon: true`). Remote images must be allowed in `next.config.js` (`images.domains` / `remotePatterns`).
- `locales/en/captions.ts` holds English UI strings; there is no i18n framework.
