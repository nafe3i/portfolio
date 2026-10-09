# Architecture Context

## Stack

| Layer      | Technology                    | Role                                  |
| ---------- | ------------------------------ | -------------------------------------- |
| Framework  | React + Vite + TypeScript      | SPA, build tooling, strict typing      |
| Styling    | Tailwind CSS                   | Utility styling driven by tokens       |
| Components | shadcn/ui                      | Accessible base components on Tailwind |
| Animation  | Framer Motion                  | Scroll-in animations, animated counters|
| 3D         | Three.js (@react-three/fiber)  | Decorative Hero visual                 |
| i18n       | LanguageContext (React)        | EN/FR state and translations           |
| Theme      | ThemeContext (React)           | Light/dark state and token selection   |
| Data       | GitHub REST API                | Dynamic projects section               |
| Contact    | EmailJS                        | Contact form delivery, no backend      |

## System Boundaries

- `src/components/ui/` — shadcn/ui generated components (do not hand-edit internals)
- `src/components/sections/` — page sections: Navbar, Hero, Projects, Skills, Contact
- `src/context/` — LanguageContext and any global state
- `src/data/` — translation dictionaries (`en.ts`, `fr.ts`) and static content (projects fallback, skills list)
- `src/hooks/` — data-fetching hooks (`useGitHubRepos`, etc.)
- `src/services/` — external API clients (GitHub, EmailJS) — components never call fetch or emailjs directly
- `src/lib/` — utilities, design tokens helpers
- `public/` — static assets (photo, icons, favicon)

## Storage Model

- **No database.** Static content lives in the repo; project data comes from the GitHub API at runtime, with a static fallback list if the API fails or rate-limits
- Language choice persisted in `localStorage`, with browser-language detection on first visit
- Theme choice persisted in `localStorage`, with system color-scheme detection on first visit

## Auth and Access Model

- No authentication. Public read-only site
- Contact form: client submits directly to EmailJS using a public key; no server component; EmailJS key is a publishable client key, not a secret

## Invariants

1. All user-visible text goes through LanguageContext — no hardcoded strings in components.
   Single exception: the static `<title>` and meta tags in `index.html` are an SEO/no-JS fallback.
   The app must overwrite `document.title` and `<html lang>` from the dictionaries at runtime
2. Colors, spacing and radius come from design tokens — no hardcoded hex values in components
3. GitHub API calls live only in `src/services/` + `src/hooks/`, with loading, error and empty states
4. shadcn/ui components in `src/components/ui/` are not modified directly — wrap or extend them instead
5. The site uses a single, consistent design language end to end
6. Heavy 3D/animation work is lazy-loaded and never blocks first render or breaks mobile performance
7. No secrets in the client bundle beyond the EmailJS publishable key
