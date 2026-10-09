# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Unit 12 in progress

## Current Goal

- Unit 12 — SEO, accessibility, performance pass + deployment

## Completed

- Unit 01 — Scaffold (Vite + React + TypeScript + Tailwind + shadcn/ui + design tokens)
- Unit 02 — LanguageContext + EN/FR dictionaries + toggle
- Unit 03 — Layout shell + navbar pill
- Unit 04 — Hero section
- Unit 05 — Skills section
- Unit 06 — Projects section with static data
- Unit 07 — GitHub integration
- Unit 08 — Contact section UI
- Unit 09 — EmailJS wiring for the contact form
- Unit 10 — Three.js decorative visual in the Hero
- Unit 11 — Framer Motion: scroll-in animations + animated counters

## In Progress

- Unit 12 — SEO, accessibility, performance pass + deployment

## Next Up

- Deployment once the public production URL is known

## Open Questions

- Hosting target (Vercel / Netlify / other)?
- EasyColoc: confirm or rewrite the current shared-housing management description; it is a reasonable placeholder because the repository has no description.
- Project selection: the current UI features AUI Email System, ElectroCharge, Salus and EasyColoc, while `project-overview.md` still mentions Minerva. Confirm the intended selection before the next content pass.
- Provide a production URL before adding `og:url`, a canonical URL and `sitemap.xml`.
- Provide a professional profile photo, live-demo URLs (where available), and the social profiles to expose in the footer.

## Architecture Decisions

- Design: light theme with a black Hero/footer, indigo → violet gradient accent, Geist Sans/Mono, flat cards
- Stack: React + Vite + TypeScript strict, Tailwind + shadcn/ui, Framer Motion, Three.js
- Contact form via EmailJS (no backend)
- Skills section: grouped-by-category icons + scrolling marquee

## Session Notes

- Building from zero — no existing code to preserve
- Core projects to feature: EasyColoc, Minerva, Salus
- Unit 01 scaffold implemented and verified: `npm run build` passes; desktop and 390 px mobile checks have no layout overflow or console errors.
- The "dark background" checklist line in `context/specs/01-scaffold.md` was outdated; `ui-context.md` and its white page background are the source of truth going forward.
- Unit 02 LanguageContext verified: live EN/FR switching, browser-language detection, localStorage persistence, and runtime `document.title`/`<html lang>` synchronization pass; `npm run build` passes without console errors.
- Unit 03 navbar/layout implemented and verified: desktop/mobile navigation, active sections, anchors, shrink-on-scroll, EN/FR toggle, and Sheet menu behavior pass; `npm run build` passes without console errors.
- Unit 04 Hero implemented and verified: responsive card, local photo placeholder, translated content, and static stats pass; counters remain static until Unit 11; `npm run build` passes without console errors.
- Unit 05 About/Skills implemented and verified: translated category grid, responsive Simple Icons, CSS marquee, and a reduced-motion fallback; the AI/ML category now lists Python, Ollama, LangChain, Spring AI, and RAG (Retrieval-Augmented Generation); `npm run build` passes without console errors.
- Unit 11: navbar shrink and Skills marquee intentionally remain CSS-only; their existing transitions are already smooth and the marquee retains its reduced-motion fallback.
- Unit 12 started: bilingual meta descriptions, base Open Graph metadata, `robots.txt`, a keyboard skip link, a footer, and abortable GitHub metadata requests were added. The build currently warns that the main JavaScript chunk is above Vite's 500 kB threshold; analyze it with production Lighthouse data before making artificial code-splitting changes.
- Hero refreshed with Mohamed Amine's optimized portrait (1200 px JPEG, ~103 kB). The new composition combines an editorial left-aligned text layout with a technical grid/photo treatment while preserving the portfolio's black, white, lime and indigo-violet visual system.
- Hero interaction pass: added a bilingual positioning statement, project/contact CTAs, subtle floating accents, portrait entrance/hover effects, and a color overlay. All non-essential motion follows `prefers-reduced-motion`.
- Education section implemented: a bilingual three-entry timeline presents YouCode (in progress), ISTA Mohammed El Fassi and the Faculty of Multidisciplinary Studies of Errachidia. It is available from desktop and mobile navigation.
- Visual refinement pass: the Hero portrait is now a personal identity card with a color overlay, caption and scroll parallax. Project cards reveal in sequence and lift slightly on hover; the contact area now reveals on scroll. These effects retain the existing light-page / black-hero / lime-accent system and respect reduced-motion preferences.
- Editorial Tech implementation, foundation pass: tightened section rhythm, strengthened headings, and established contrast chapters. Projects and contact now use rounded black surfaces while education, skills and about remain editorial white-space sections. This is the visual foundation for the next per-section refinements.
- The Hero no longer displays a project count; it now keeps only the language and location identity stats.
- Project imagery pass: split the supplied 2×2 product showcase into four optimized JPEG screenshots (AUI Email Support, ElectroCharge, Salus and EasyColoc), then replaced the generic project illustrations with their matching interface preview.
- Personal-details and interaction pass: redesigned the about area as an editorial profile composition with translated location, YouCode program and backend/AI focus. Added a subtle fine-pointer cursor glow, disabled for touch devices and reduced-motion preferences.
- Hero portrait art direction: created a separate, identity-preserving black-and-white editorial portrait with a high-collared black coat and overcast-sky backdrop. The original portrait remains preserved; the optimized editorial version is now used by the Hero.
- Navbar direction updated to an editorial horizontal bar inspired by the provided reference. It now shows Mohamed Amine Nafiai’s full name, uses understated active underlines, and retains the existing language and contact actions.
- Theme and CV pass: added ThemeContext with persisted light/dark selection, a keyboard-accessible navbar toggle, global token overrides, and a verified downloadable CV at `public/mohamed-amine-nafiai-cv.pdf`.
- Footer refinement: changed the footer to a transparent, theme-aware minimal separator and removed the greeting emoji from the hero badge in both languages.
- Hero wording refinement: replaced the generic "Full-stack Developer & Freelancer" headline with a concise value proposition, with its second line highlighted in lime.
- Hero headline motion: added a dependency-free looping typewriter that writes the two translated lines in sequence, pauses, then erases them in reverse. It renders as static text for reduced-motion preferences and exposes the complete title to screen readers.
- EmailJS alignment: the contact service now sends the `name`, `time` and `message` variables expected by the configured email template, plus `reply_to` for use in its EmailJS dashboard settings. The configured template ID still needs to be replaced with the actual `template_…` ID from EmailJS.
- Skills interaction: every technology chip in the marquee and category cards stays neutral; only its logo reveals its brand color on hover.
