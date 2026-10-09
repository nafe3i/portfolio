# Unit 10: Hero Three.js Visual (Lazy-Loaded)

## Goal

Add a subtle decorative 3D element to the Hero card using Three.js via
@react-three/fiber, lazy-loaded so it never blocks first paint or hurts
mobile performance. Purely decorative — no interaction required, no impact
on Hero content, layout, or accessibility.

## Design

Follow `context/ui-context.md` (Motion, Colors).
- Subtle, not a centerpiece: a soft, slowly rotating/floating abstract shape
  (e.g. a low-poly sphere, a wireframe torus, or a small particle field) sitting
  behind or beside the profile photo, using `--accent-primary` (lime) and/or the
  indigo→violet gradient tones at low opacity — reinforces the black Hero card
  without competing with the heading or CTA
  - This is intentionally different from the illustration style used in Unit 06
    (those are flat SVG); this one is genuinely 3D but restrained — a soft glow
    or a few translucent geometric shapes, not a busy scene
- Must not overlap the heading, badge, CTA or stats text at any breakpoint;
  reduce its footprint or hide it below a certain viewport width if needed to
  avoid crowding on small screens
- Static fallback: on `prefers-reduced-motion`, or while the 3D bundle is still
  loading, or if it fails to load, the Hero renders exactly as it did in Unit 04
  (no visual hole, no layout shift)

## Implementation

### Dependencies
Install `three` and `@react-three/fiber` now (per `architecture.md`, only when
needed — this is that moment).

### Component
`src/components/sections/HeroScene.tsx`: the actual `<Canvas>` and 3D content.
Keep the scene minimal — a handful of meshes/lights at most, no heavy models,
no textures loaded from external URLs (all geometry is procedural).

### Lazy loading
Import `HeroScene` via `React.lazy()` and wrap it in `<Suspense>` with a
`fallback={null}` (the Hero already looks complete without it, per Unit 04) so
there's no loading spinner — the scene just fades or pops in once ready.
Only load it in the browser after initial paint (e.g. mount it in a `useEffect`
or trigger the lazy import post-mount), not blocking the Hero's critical
content.

### Reduced motion
Check `window.matchMedia('(prefers-reduced-motion: reduce)')`; if true, skip
mounting `HeroScene` entirely and rely on the Unit 04 static Hero.

### Performance guardrails
- Cap the renderer's pixel ratio (e.g. `Math.min(window.devicePixelRatio, 2)`)
- Pause or reduce the animation loop when the tab is not visible
  (`document.visibilityState`)
- Keep geometry counts low; no post-processing effects

## Dependencies

- `three`, `@react-three/fiber` (new)

## Verify when done

- [ ] Hero's initial render (text, CTA, photo, stats) is visually complete and
      interactive before the 3D scene appears — no blocking, no layout shift
      when it does appear
- [ ] The 3D element never overlaps Hero text/CTA at mobile, tablet or desktop
      widths
- [ ] `prefers-reduced-motion` fully skips the 3D scene, Hero looks like Unit 04
- [ ] No console errors or warnings from the Three.js/R3F setup
- [ ] Rough performance check: no significant frame drops or jank on scroll
      past the Hero on a mid-range mobile emulation (Chrome DevTools throttling
      is enough for this check)
- [ ] `npm run build` passes; bundle-wise, the Three.js code is lazy-loaded, not
      part of the initial JS chunk (spot-check in the build output or Network
      tab — a separate chunk should appear for it)