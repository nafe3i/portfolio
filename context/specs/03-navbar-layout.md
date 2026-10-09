# Unit 03: Layout Shell + Navbar Pill

## Goal

Create the page layout shell and a floating pill navbar that stays visible, shrinks
on scroll, highlights the active section, and hosts the EN/FR toggle. Sections are
empty placeholders with anchor ids; no real section content yet.

## Design

Follow `context/ui-context.md` (Layout Patterns → Navbar).

- White pill, `rounded-full`, 1px `--border-default` border, fixed at the top with
  a small gap from the viewport edge, centered within the max-width container
- Left: circular logo mark, `--bg-inverted` background, white initials
- Center: rounded link group. The active link is a `--accent-primary` (lime) pill
  with `--accent-foreground` text; inactive links are plain `--text-primary`
- Right: EN/FR toggle and a "Let's talk" button (outline, `rounded-full`) that
  scrolls to the contact section
- On scroll (past ~24px): the pill reduces its vertical padding and height with a
  smooth CSS transition. No layout shift, no jump
- Mobile (below `md`): logo, EN/FR toggle and a menu button opening a shadcn
  `Sheet` with the links and the "Let's talk" button

## Implementation

### Layout

`src/components/sections/Layout.tsx`: wraps the app, renders the Navbar and a
`main` with a max-width container. Adds top padding so content never hides under
the fixed navbar.

### Navbar

`src/components/sections/Navbar.tsx`. Links: Home, About, Skills, Projects.
Labels and the CTA come from `t()`; add the keys to `en.ts` and `fr.ts` together.

### Scroll state

Custom hook `src/hooks/useScrolled.ts` returning a boolean (scrollY > threshold),
using a passive scroll listener. The shrink is done with Tailwind classes and CSS
transitions, not Framer Motion (installed later in Unit 11).

### Active section

Custom hook `src/hooks/useActiveSection.ts` using `IntersectionObserver` on the
section ids: `home`, `about`, `skills`, `projects`, `contact`.

### Placeholder sections

In `App.tsx`, render five empty sections with those ids and enough height
(e.g. `min-h-screen`) to test scrolling, anchor links and the active state.
Remove the scaffold demo content, and move the EN/FR toggle from the demo page
into the navbar.

### Anchor behavior

Smooth scrolling for anchors, with `scroll-margin-top` on sections so the fixed
navbar does not cover section headings.

## Dependencies

- shadcn `sheet` component (added via the shadcn CLI)
- No other new packages

## Verify when done

- [ ] Navbar is a floating white pill, fixed, always visible on desktop and mobile
- [ ] Navbar shrinks smoothly after scrolling and returns at the top, no layout shift
- [ ] Active link follows the section in view and uses the lime pill style
- [ ] Clicking a link or "Let's talk" scrolls to the right section without hiding it
      under the navbar
- [ ] EN/FR toggle works from the navbar; all navbar text is translated
- [ ] Mobile menu opens and closes, links work and close the menu
- [ ] No hardcoded strings or hex values; shadcn `ui/` files untouched except the
      generated `sheet`
- [ ] `npm run build` passes, no console errors
