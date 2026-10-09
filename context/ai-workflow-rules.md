# AI Workflow Rules

## Approach

Build this project incrementally from scratch using a spec-driven workflow.
Context files define what to build, how to build it, and the current state of
progress. Always implement against these specs — do not infer or invent behavior.

## Scoping Rules

- Work on one feature unit at a time
- Prefer small, verifiable increments over large speculative changes
- Do not combine unrelated system boundaries in a single implementation step

## When to Split Work

Split an implementation step if it combines:

- UI changes and data/service changes
- Multiple unrelated sections or routes
- Behavior not clearly defined in the context files

If a change cannot be verified end to end quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent product behavior, copy or design decisions not defined in the
  context files
- If a requirement is ambiguous, resolve it in the relevant context file before
  implementing
- If a requirement is missing, add it as an open question in `progress-tracker.md`
  before continuing

## Protected Files

Do not modify the following unless explicitly instructed:

- `src/components/ui/*` — generated shadcn/ui components
- Lockfiles and generated build output
- Any third-party library internals

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries
- Storage model decisions
- Code conventions or standards
- Feature scope

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope, in both EN and FR
2. No invariant defined in `architecture.md` was violated
3. Responsive check done at mobile and desktop
4. `progress-tracker.md` reflects the completed work
5. `npm run build` passes with no console errors
