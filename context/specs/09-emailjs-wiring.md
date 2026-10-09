# Unit 09: EmailJS Wiring

## Goal

Connect the Contact form built in Unit 08 to EmailJS, so a valid submission
actually sends an email, with proper loading/success/error states. No visual
redesign of the form — this unit only replaces the local placeholder submit
logic with a real network call.

## Design

Reuse the existing form UI from Unit 08 exactly. Only the submit behavior and
its states change:
- **Sending**: submit button shows a loading state (disabled + spinner or
  "Sending..." label), fields disabled during the request
- **Success**: same neutral success state pattern from Unit 08, now genuinely
  triggered by EmailJS's success response, form resets after a short delay
- **Error**: an inline error message near the submit button (not replacing the
  field-level validation errors), e.g. "Something went wrong, try again or
  email me directly at [address]" — translated, calm tone, no technical detail
  exposed to the user

## Implementation

### Environment variables
Add to `.env.example` (committed, no real values) and document that the real
values go in `.env.local` (git-ignored, already covered by Vite's default
`.gitignore` — verify this is the case):

```
VITE_EMAILJS_SERVICE_ID=service_tjoir0r
VITE_EMAILJS_TEMPLATE_ID=K6Wlf2jQm9GyUFtor4z-U
VITE_EMAILJS_PUBLIC_KEY=N1iqfkt4Q0eGOYp5L
```

The real values are supplied by the user locally; never hardcode them in
source files. `VITE_EMAILJS_SERVICE_ID` may ship in `.env.example` since a
Service ID is not itself sensitive, but `TEMPLATE_ID` and `PUBLIC_KEY` should
follow the same placeholder pattern for consistency.

### Service
`src/services/email.ts`: install `@emailjs/browser`, wrap its `send()` call in
a typed function, e.g. `sendContactMessage({ name, email, message })`, reading
the three env vars via `import.meta.env`. Throws or returns a typed
result/error — components never call `@emailjs/browser` directly.

### Wiring into ContactForm
Replace the Unit 08 placeholder submit with a call to `sendContactMessage`.
Manage a `status: 'idle' | 'sending' | 'success' | 'error'` state (or similar)
driving the UI states described above. Keep the existing field-level
validation from Unit 08 unchanged — it still runs before any network call.

### Fallback contact info
Real contact email: **nafiai.medamine@gmail.com** — replace the
`contact@example.com` placeholder from Unit 08 everywhere it appears (contact
info card, error-state fallback text, any mailto link), in both dictionaries.

## Dependencies

- `@emailjs/browser` (new)

## Verify when done

- [ ] `.env.example` documents the three variable names, no real secrets
      committed; `.gitignore` confirmed to exclude `.env.local`
- [ ] A valid submission with real EmailJS credentials in `.env.local` sends
      an actual email and shows the success state
- [ ] Temporarily using an invalid template/public key shows the error state
      gracefully, with the real email as a fallback, no crash or console error
      leaking implementation details
- [ ] Submit button and fields are disabled while sending; no double-submit
      possible on repeated clicks
- [ ] `contact@example.com` placeholder is fully replaced by
      nafiai.medamine@gmail.com across the codebase
- [ ] All new UI text translated EN/FR
- [ ] `npm run build` passes, no console errors