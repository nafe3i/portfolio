# Unit 04: Hero Section

## Goal

Build the Hero section as a large rounded black card on the white page background,
with greeting badge, heading, lime CTA, profile photo, and an animated stats row —
matching the reference layout with our own accent and motion touches.

## Design

Reference: full-width black card, `rounded-[2rem]`, generous inner padding.
- Small pill badge top-left: "Hey 👋 I'm [Name]" in `--accent-primary` (lime) text
  on a subtle dark surface, or lime background with dark text — pick whichever
  reads best against black
- Large bold heading (two lines), `--text-on-inverted` (white)
- Lime "Hire Me" / "Let's talk" pill button (`--accent-primary` bg, dark text)
- Profile photo on the right (placeholder for now), integrated into the card,
  cropped/positioned like the reference
- Stats row at the bottom: three stats (e.g. years of experience, projects shipped,
  happy clients), white text, thin divider lines between them like the reference
- Optional subtle indigo→violet accent detail (e.g. a soft glow behind the photo,
  or the badge's border) — our addition, keep it subtle

## Implementation

### HeroSection component
`src/components/sections/Hero.tsx`. Composes shadcn `Button` for the CTA.
All text via `t()` from LanguageContext.

### Stats sub-component
Reusable `StatCounter` component (used again if needed elsewhere) that animates
from 0 to its target value when scrolled into view (Framer Motion + `useInView`,
or a placeholder static version if Unit 11 hasn't landed yet — see Dependencies).

### Photo
Use a placeholder image for now; component accepts an `photoSrc` prop so the real
photo can be swapped in later without touching layout code.

## Dependencies

- None beyond Unit 01–03 (scaffold, i18n, navbar/layout)
- Animated counters can ship as static numbers now and be upgraded in Unit 11
  (Framer Motion pass) — do not block this unit on Unit 11

## Verify when done

- [ ] Hero renders as a rounded black card with correct spacing on desktop and mobile
- [ ] Badge, heading, CTA and stats all read from LanguageContext (EN/FR both work)
- [ ] CTA button uses `--accent-primary` (lime), correctly readable text
- [ ] Photo placeholder displays and is responsive
- [ ] No hardcoded hex values used
- [ ] `npm run build` passes
