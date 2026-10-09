# Unit 06: Projects Section (Static Data)

## Goal

Build the "Projects" section with the four real, confirmed projects, each as a
flat white card with a custom SVG illustration, category badge, description,
tech tags, and links. No GitHub API yet — that is Unit 07.

## Design

Follow `context/ui-context.md` (Cards, Colors, Layout Patterns).
- Grid of flat white cards, `rounded-2xl`, `--border-default` border, responsive
  (1 column mobile, 2 tablet, up to 4 desktop, or 2x2 — either is fine as long as
  cards stay comfortably readable, not cramped)
- Each card: illustration block on top (see below), category badge (lime pill,
  `--accent-primary` bg, dark text), project name, short description, tech tag
  chips, and a link row at the bottom
- Illustration block: **no stock photos, no external images**. Each project gets
  a small custom inline SVG icon/illustration on a dark (`--bg-inverted`) block,
  drawn to abstractly represent what the project does (see per-project notes
  below). Keep every illustration built from simple shapes (circles, paths,
  rounded rects) in the site's palette — lime as the main illustration color,
  the indigo→violet gradient used sparingly for one accent shape or glow if it
  helps a design, white/light for outlines
- Link row: GitHub icon + "Code" link, always present. No "Live" link for any of
  these four projects — none have a public demo. Leave the data model open to add
  one later per project (`liveUrl?: string`) without changing the layout

## Data

`src/data/projects.ts`. Typed array, one entry per project:

### 1. AUI Email Support System — featured
- `slug`: `aui-email-system`
- `category`: "AI · Backend"
- `description` (EN + FR): local-AI email triage system for Al Akhawayn University —
  Ollama/Mistral + ChromaDB RAG generates suggested replies, but nothing is sent
  without human approval (JWT-secured API, role-based access)
- `stack`: FastAPI, Ollama, Mistral, ChromaDB, SQLite, JWT
- `codeUrl`: `https://github.com/nafe3i/email_traitment`
- `featured`: true — this card may be visually larger or placed first; it is the
  strongest project for the AI Engineer positioning stated in `project-overview.md`
- Illustration idea: an envelope shape with a small lime checkmark badge (human
  approval), or a chat-bubble + checkmark

### 2. ElectroCharge Maroc
- `slug`: `electrocharge`
- `category`: "Full-stack"
- `description`: platform addressing the lack of visibility on EV charging
  stations in Morocco — location, availability, price and charging time
- `stack`: Laravel, Tailwind CSS, Vite
- `codeUrl`: `https://github.com/nafe3i/Electrocharge`
- Illustration idea: a lightning-bolt / charging-plug shape, optionally inside a
  thin circular "map pin" ring

### 3. Salus — AI Health Assistant Platform
- `slug`: `salus`
- `category`: "AI · Health tech"
- `description`: REST API for a health assistant — symptom tracking, medical
  appointment booking, AI-generated health guidance
- `stack`: Laravel (REST API)
- `codeUrl`: `https://github.com/nafe3i/Salus---AI-Health-Assistant-Platform`
- Illustration idea: a heartbeat/pulse line, or a simple cross + pulse

### 4. EasyColoc
- `slug`: `easycoloc`
- `category`: "Full-stack"
- `description`: web platform for managing shared housing / roommate
  arrangements — [DESCRIPTION TO CONFIRM: the GitHub repo currently has no
  description; use this as a reasonable placeholder and flag it in
  progress-tracker.md's Open Questions for the user to confirm or rewrite]
- `stack`: Laravel
- `codeUrl`: `https://github.com/nafe3i/Plateforme-Web-de-Gestion-de-Colocation-EasyColoc`
- Illustration idea: a simple house/roof shape with two small figures or two
  overlapping keys

## Implementation

### Component
`src/components/sections/Projects.tsx`, `#projects` anchor, reachable from the
navbar. Maps over `projects.ts`.

### Illustration components
One small SVG component per project (e.g. `src/components/sections/illustrations/
AuiEmailIllustration.tsx` etc.), or a single `ProjectIllustration.tsx` that
switches on `slug` — either is fine, pick whichever keeps `Projects.tsx` clean.

### Card
Reuse the shadcn `Card` from Unit 05 if it fits, or a purpose-built `ProjectCard`
component — stay consistent with the Skills cards' visual style either way.

### i18n
Category labels and descriptions go through `t()` — add `projects.<slug>.category`
and `projects.<slug>.description` (or similar) keys to both dictionaries.
Tech tags and project names may stay as-is (proper nouns / technology names).

## Dependencies

- None new — reuses shadcn `card`, `lucide-react` (GitHub icon) already installed

## Verify when done

- [ ] All four projects render with the correct name, category, description,
      stack tags and GitHub link
- [ ] Each project has its own distinct custom SVG illustration — no stock
      photos, no generic repeated icon across cards
- [ ] AUI Email System is visually distinguished as the featured project
- [ ] Grid is responsive from mobile to desktop, no cramped or overflowing cards
- [ ] EN/FR toggle translates all section text; the EasyColoc description
      placeholder is flagged as unconfirmed in `progress-tracker.md`
- [ ] No hardcoded hex values; `npm run build` passes, no console errors