# Unit 11: Framer Motion Pass

## Goal

Install Framer Motion and use it to: (1) animate Hero stats as real counting-up
numbers when scrolled into view, (2) add scroll-in reveal animations to section
content, and (3) optionally replace the CSS-only navbar shrink and skills
marquee with Framer Motion equivalents where it genuinely improves smoothness —
without changing their visual result. This is a polish pass, not a redesign.

## Design

Follow `context/ui-context.md` (Motion).
- Scroll-in reveal: sections and cards fade in with a small upward offset
  (e.g. 16–24px) as they enter the viewport, once each (not re-triggering on
  every scroll up/down)
- Stats counters: numbers animate from 0 to their target value over ~1–1.5s
  when the Hero (or the stats row specifically) enters the viewport, easing
  out, not linear
- Keep timing subtle and consistent — same duration/easing values reused
  across sections via a small shared config, not ad hoc per component
- `prefers-reduced-motion`: all of the above should either skip straight to
  the end state or use near-instant transitions — content must never depend on
  motion to become visible or readable

## Implementation

### Dependency
Install `framer-motion`.

### Shared motion config
`src/lib/motion.ts`: shared variants/transition presets (e.g. `fadeInUp`,
common `duration`/`ease` values) imported by section components, so timing
stays consistent without duplicating numbers everywhere.

### Stats counter upgrade
Replace the static `StatCounter` from Unit 04 with an animated version using
Framer Motion's `useInView` + a simple animated count (either
`animate()`/`useMotionValue` or a small custom interval-based counter driven
by `useInView` — whichever is simpler and dependency-light). Keep the same
component API (`photoSrc`-style prop pattern) so `Hero.tsx` doesn't need
restructuring.

### Scroll-in reveal
Wrap section-level content blocks (not every individual element — avoid
over-animating) in `motion.div` using the shared `fadeInUp` variant with
`whileInView` and `viewport={{ once: true }}`.

### Navbar / marquee (optional upgrade)
The Unit 03 navbar shrink and Unit 05 marquee already work in plain CSS and
meet their specs. Only touch them here if switching to Framer Motion clearly
improves smoothness (e.g. the CSS transition feels janky) — do not treat this
as mandatory. If left as CSS, note that explicitly in
`context/progress-tracker.md` rather than silently skipping it.

### Reduced motion
Respect `prefers-reduced-motion` globally for anything added in this unit —
Framer Motion's `useReducedMotion` hook is the simplest way to branch behavior.

## Dependencies

- `framer-motion` (new)

## Verify when done

- [ ] Hero stats genuinely count up from 0 when scrolled into view, once, not
      on every scroll
- [ ] Section content reveals with a consistent fade/offset animation on first
      scroll into view across at least About, Skills and Projects
- [ ] `prefers-reduced-motion` removes/shortcuts all motion added in this unit;
      no content is hidden or delayed because of it
- [ ] Navbar and marquee still behave correctly (whether left as CSS or
      upgraded) — no regression from Units 03/05
- [ ] No jank or dropped frames on a mid-range mobile emulation while
      scrolling through the full page
- [ ] `npm run build` passes, no console errors or warnings