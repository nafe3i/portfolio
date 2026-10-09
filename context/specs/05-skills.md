# Unit 05: Skills Section (Static Data)

## Goal

Build the "About" and "Skills" sections with static data: a short bio/intro block,
then a technology grid grouped by category, plus a horizontal scrolling marquee
strip as a secondary, more dynamic presentation of the same technologies.

## Design

Follow `context/ui-context.md` (Layout Patterns → Skills, Cards, Colors).

- Section background: white, same as the rest of the page (not the black Hero style)
- About: short intro paragraph (bio) + maybe 1-2 stat chips reusing `StatCounter`
  from Unit 04 if relevant, otherwise plain text — keep it simple, this section is
  primarily about the skills grid
- Skills grid: one flat white card (`rounded-2xl`, `--border-default` border) per
  category (Frontend, Backend, AI, DevOps), each listing its technologies as small
  icon + label rows or chips
- Marquee: a full-width strip below or above the grid, technology icons scrolling
  horizontally on a continuous loop, pausing on hover; edges fade out using a mask
  gradient (can use the indigo→violet accent subtly in the fade or a divider line —
  this is our own creative addition, keep it understated)
- Category labels and technology names come from data, not hardcoded per-instance

## Implementation

### Static data

`src/data/skills.ts`: typed array of categories, each with a name key and a list of
technologies (`{ name, icon }`, icon = a Simple Icons component from `react-icons/si`
or a slug used to resolve one). Base the list on the user's actual stack: HTML/CSS/JS,
React, Tailwind, Node.js, Laravel, PHP, Java, MySQL, Git/GitHub, and any AI/ML tools
already in their tech-stack notes — use reasonable placeholders where unsure and
mark them so they're easy to adjust.

### Components

- `src/components/sections/About.tsx` — intro/bio block, `#about` anchor
- `src/components/sections/Skills.tsx` — category grid, `#skills` anchor
- `src/components/sections/SkillsMarquee.tsx` — the scrolling strip, pure CSS
  animation (`@keyframes`, no Framer Motion yet — same reasoning as Unit 03)

### Category cards

Map over `skills.ts` categories; each card is a shadcn-compatible flat card
(reuse the card pattern from `ui-context.md`, componentize as `Card` if not
already done via shadcn's `card` primitive — add it via the CLI if missing).

### Marquee mechanics

Duplicate the technology list once in the DOM to create a seamless loop; animate
`transform: translateX` via CSS; `animation-play-state: paused` on hover/focus.
Respect `prefers-reduced-motion`: fall back to a static row when set.

## Dependencies

- shadcn `card` component (added via the CLI if not already present)
- `react-icons` (Simple Icons) — install now, first real usage

## Verify when done

- [ ] About and Skills sections render under their anchors (`#about`, `#skills`)
      and are reachable from the navbar
- [ ] Skills grid shows all categories with correct icons and labels, responsive
      from mobile to desktop (no overflow, no squeezed icons)
- [ ] Marquee scrolls continuously and seamlessly, pauses on hover/focus, and
      shows a static row when `prefers-reduced-motion` is set
- [ ] All labels (category names, bio text) go through LanguageContext, added to
      both dictionaries; technology names themselves may stay as-is (proper nouns)
- [ ] No hardcoded hex values; cards follow the flat style from `ui-context.md`
- [ ] `npm run build` passes, no console errors
