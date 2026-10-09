# Unit 01: Project Scaffold

## Goal

Initialize the project with Vite + React + TypeScript, Tailwind, shadcn/ui, and the
design tokens and fonts from `ui-context.md`, resulting in a blank page that already
shows the correct background, typography and color tokens.

## Design

Apply the full token table from `context/ui-context.md` (colors, radius, fonts).
No components yet beyond a placeholder page proving the tokens work
(e.g. a heading in the accent gradient, body text in the primary/muted colors).

## Implementation

### Project init
Vite + React + TypeScript strict template. Configure `tsconfig` for strict mode.

### Tailwind + tokens
Install Tailwind, configure the theme with the color tokens, border-radius scale,
and font variables from `ui-context.md`. Load Geist Sans and Geist Mono.

### shadcn/ui
Initialize shadcn/ui on top of the Tailwind config. Add the `button` component as
a smoke test.

### Folder structure
Create the folders defined in `architecture.md`: `components/ui`, `components/sections`,
`context`, `hooks`, `services`, `data`, `lib`.

## Dependencies

- react, react-dom, typescript, vite
- tailwindcss and its peer dependencies
- shadcn/ui CLI and its dependencies

## Verify when done

- [ ] `npm run dev` shows a page with the correct dark background and fonts
- [ ] A gradient-accent heading and a shadcn `Button` render correctly
- [ ] Folder structure matches `architecture.md`
- [ ] No hardcoded hex values used
- [ ] `npm run build` passes
