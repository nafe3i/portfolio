# Unit 08: Contact Section (UI Only)

## Goal

Build the two-column Contact section UI — info/availability cards on the left,
a message form on the right — fully styled and responsive, with client-side
validation. The form does not submit anywhere yet (Unit 09 wires EmailJS);
submitting for now just validates and can log to the console or show a local
"not wired yet" state.

## Design

Follow `context/ui-context.md` (Layout Patterns → Contact, Cards, Colors).
- Two columns on desktop (roughly balanced, form slightly wider is fine),
  stacked on mobile: info/availability first, form below
- Left column: a few flat cards — e.g. one for direct contact (email, maybe a
  social link), one for availability status ("Available for freelance work" /
  "Open to remote roles"), reusing the flat card style from `ui-context.md`
- Right column: the message form in a flat card — name, email, message fields
  (shadcn `Input` / `Textarea`), a lime `Button` to submit
- Field states: clear label, visible focus ring, inline error text in
  `--state-error` below an invalid field, no layout shift when an error appears
  (reserve the space)
- Section background: white, `#contact` anchor, reachable from navbar and the
  Hero's CTA (already wired in Unit 03/04)

## Implementation

### Component
`src/components/sections/Contact.tsx`. Two sub-sections or two components
(`ContactInfo.tsx`, `ContactForm.tsx`) composed inside it — whichever keeps
each piece small per `code-standards.md`.

### Form state and validation
- Local component state (or a light form approach — no new form library needed
  for three fields; plain `useState` + a small validation function is enough)
- Required: name (non-empty), email (basic format check), message (non-empty,
  reasonable min length e.g. 10 chars)
- Validate on submit; optionally re-validate a field on blur once it has been
  touched — don't validate on every keystroke before first submit attempt

### Submit placeholder
On valid submit: no network call yet. Show a temporary local success state
(e.g. "Message ready to send" or similar neutral copy — avoid implying it was
actually sent, since EmailJS isn't wired until Unit 09) and reset the form
after a short delay, or keep it simple and just log the validated payload to
the console for now. Keep this easy to swap for the real EmailJS call in
Unit 09 without restructuring the component.

### Content
Availability status and contact info text come from `t()`, added to both
dictionaries. Use the actual contact details: [EMAIL TO CONFIRM — use a
placeholder like `contact@example.com` and flag it in progress-tracker.md's
Open Questions until you provide the real one].

## Dependencies

- shadcn `input`, `textarea`, `label` components (added via the CLI if not
  already present)

## Verify when done

- [ ] Two-column layout on desktop, stacked correctly on mobile at 390px
- [ ] All three fields validate correctly (empty, malformed email, short message)
      with inline errors that don't shift the layout
- [ ] Valid submit shows the local placeholder success state, no network call
      is made, no console errors
- [ ] Availability/info card text and form labels are translated EN/FR
- [ ] Section reachable via `#contact` from the navbar and the Hero CTA
- [ ] No hardcoded hex values; `npm run build` passes