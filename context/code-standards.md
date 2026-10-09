# Code Standards

## General

- Keep components small and single-purpose
- Fix root causes; do not layer workarounds
- Do not mix data fetching, translation and presentation in one component

## TypeScript

- Strict mode required throughout the project
- No `any` — use explicit interfaces or narrowly scoped types
- Validate unknown external input (GitHub API responses) at the service boundary
  before trusting it

## React

- Function components and hooks only
- Extract reusable logic into custom hooks (e.g. `useGitHubRepos`, `useInView`)
- Every async UI has loading, error and empty states
- Memoize only where profiling shows a need

## shadcn/ui

- Add new components via the shadcn CLI; never hand-write a component that
  duplicates one shadcn already provides
- Do not edit files under `src/components/ui/` directly — wrap them in
  `src/components/sections/` instead
- Compose, don't fork

## Styling

- Tailwind utilities using tokens from `ui-context.md`; no hardcoded hex
- Follow the border-radius scale in `ui-context.md`
- Mobile-first; verify at mobile and desktop breakpoints
- Reserve the accent gradient for CTAs, key headings and hover/active states

## i18n

- Add every new string to both `src/data/en.ts` and `src/data/fr.ts` at the same time
- Components read text via LanguageContext; never inline literals
- `index.html` keeps a static fallback `<title>` (SEO / before hydration); the app syncs
  `document.title` and `<html lang>` from the dictionaries on load and on every language change

## API Routes / Services

- `src/services/github.ts` — all GitHub API calls, with typed responses and a
  static fallback list on failure
- `src/services/email.ts` — EmailJS call, with success/error handling
- Components call hooks, hooks call services — never fetch directly in a component

## Accessibility and SEO

- Semantic HTML, one `h1`, logical heading order
- Alt text on images, labels on form fields, visible focus states
- Meta title/description and Open Graph tags maintained

## Performance

- Lazy-load the Three.js scene and heavy assets
- Respect `prefers-reduced-motion` for animations

## File Organization

- `src/components/ui/` — shadcn/ui generated components
- `src/components/sections/` — Navbar, Hero, Projects, Skills, Contact
- `src/context/` — LanguageContext
- `src/hooks/` — data-fetching and utility hooks
- `src/services/` — GitHub and EmailJS clients
- `src/data/` — translation dictionaries and static fallback content
- `src/lib/` — shared utilities
- `public/` — static assets