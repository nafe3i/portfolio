# UI Context

## Theme

Light and dark themes, inspired by an editorial designer/developer portfolio style,
adapted with our own accent system. In light mode, the white page background frames
the large rounded black Hero. In dark mode, charcoal surfaces preserve hierarchy while
the Hero remains the deepest surface. This contrast is the signature visual move of
the site, echoed in the projects, contact area and footer.

## Colors

All components use these tokens (Tailwind theme / CSS variables). No hardcoded hex
values in components.

| Role                | Token                | Value                    |
| -------------------- | --------------------- | ------------------------- |
| Page background      | `--bg-base`            | `#FFFFFF`                 |
| Inverted surface      | `--bg-inverted`        | `#0D0D0D` (Hero card, footer) |
| Card surface          | `--bg-surface`         | `#FFFFFF`                 |
| Card border            | `--border-default`     | `#E4E4E7` (zinc-200)      |
| Primary text (light bg)| `--text-primary`      | `#0D0D0D`                 |
| Muted text             | `--text-muted`         | `#71717A` (zinc-500)      |
| Text on inverted bg    | `--text-on-inverted`   | `#FFFFFF`                 |
| Accent (primary)       | `--accent-primary`     | `#D6FF3F` (lime)          |
| Accent text (on lime)  | `--accent-foreground`  | `#0D0D0D`                 |
| Accent secondary start | `--accent-2-from`      | `#6366F1` (indigo-500)    |
| Accent secondary end   | `--accent-2-to`        | `#8B5CF6` (violet-500)    |
| Error                  | `--state-error`        | `#EF4444`                 |
| Success                | `--state-success`      | `#22C55E`                 |

**Usage rule:** lime (`--accent-primary`) is the main call-to-action and active-state
color (buttons, active nav pill, badges), matching the reference. The indigo→violet
gradient (`--accent-2-*`) is our own addition, used sparingly — hover underlines,
focus rings, the marquee edge fade, or one accent detail in the Hero — never as a
competing primary color.

## Typography

| Role      | Font         | Variable      |
| --------- | ------------ | ------------- |
| UI text   | Geist Sans   | `--font-sans` |
| Code/mono | Geist Mono   | `--font-mono` |

Headings are bold/black weight, tight tracking, similar to the reference's large
"Designer & Developer" heading.

## Border Radius

| Context             | Class            |
| -------------------- | ---------------- |
| Inline / small UI     | `rounded-lg`      |
| Cards / panels         | `rounded-2xl`     |
| Hero card / large blocks| `rounded-[2rem]` |
| Navbar / badges / pills | `rounded-full`   |

## Component Library

shadcn/ui on top of Tailwind. Components live in `src/components/ui/` and are added
via the shadcn CLI. Section-level components live in `src/components/sections/`.

## Cards

Flat style: white background, 1px `--border-default` border, no shadow by default;
a soft shadow may appear on hover to lift the card slightly. This matches the
reference's white service cards.

## Layout Patterns

- Navbar: white fixed horizontal bar with a subtle bottom border, always visible,
  shrinking in height/padding on scroll; full name on the left, understated centered
  links with a dark active underline, and language/contact actions on the right.
- Hero: full-width rounded black card containing the greeting badge, large heading,
  lime "Hire Me" CTA, profile photo, and a stats row (years / clients / countries or
  equivalent) in white text on black
- Services / Skills: white cards in a grid, category label + short description
- Contact: two columns — info/availability cards left, message form right; stacks
  on mobile
- Skills: icons grouped by category (Frontend, Backend, AI, DevOps), plus a
  horizontal scrolling marquee strip as an extra dynamic accent (our own addition,
  not in the reference)
- Sections: consistent vertical rhythm and max-width container, generous white space

## Motion

- Scroll-in reveal (fade + slight vertical offset) for sections and cards
- Navbar height/padding animates smoothly on scroll
- Animated counters for the Hero stats row when scrolled into view
- Respect `prefers-reduced-motion`: disable non-essential motion when set

## Icons

`lucide-react` for UI icons. Technology logos in the skills section via
`react-icons` (Simple Icons set). Stroke-based icons only. Sizes: `h-4 w-4` inline,
`h-5 w-5` in buttons, `h-8 w-8` in the skills grid.
