# Unit 07: GitHub Integration (Enrichment)

## Goal

Enrich the four static project cards from Unit 06 with live GitHub data (stars,
last updated, primary language) fetched client-side, without replacing any
hand-written content. Descriptions, categories and illustrations stay exactly
as defined in `src/data/projects.ts`. If the API fails or is rate-limited, cards
render exactly as they did in Unit 06 — the enrichment is additive, never a
dependency for the section to work.

## Design

Follow `context/ui-context.md` (Colors, Cards).
- Add a small metadata row at the bottom of each card, below the existing
  Code link: a star icon + count, and a relative "updated X ago" label
- Language badge: a small colored dot + language name (e.g. a muted chip),
  optional — only show if space allows without crowding the card
- While loading: a subtle skeleton/placeholder in place of the metadata row
  (a thin gray bar), not a layout-shifting spinner
- On error or rate limit: metadata row is simply omitted — no error message,
  no broken UI, the rest of the card (already static) is unaffected

## Implementation

### Service
`src/services/github.ts`. One function, e.g. `fetchRepoMeta(owner, repo)`,
calling `https://api.github.com/repos/{owner}/{repo}` (unauthenticated, public
endpoint). Extract only what's needed: `stargazers_count`, `pushed_at`,
`language`. Typed response, validated before use per `code-standards.md`.

Derive `owner`/`repo` from each project's `codeUrl` in `projects.ts` — do not
duplicate them as separate fields.

### Caching
Cache each repo's response in `sessionStorage` under a key like
`gh-repo:{owner}/{repo}`, with a timestamp. Reuse the cached value if it is
less than ~30 minutes old; otherwise refetch. This keeps normal development
and repeat visits well under GitHub's 60 requests/hour unauthenticated limit.

### Hook
`src/hooks/useGitHubRepoMeta.ts`: takes a `codeUrl`, returns
`{ data, loading, error }`, wraps the service + cache logic. `Projects.tsx`
calls this once per project card.

### Rate limit / failure handling
On a non-OK response (including `403` rate-limit) or a network error: set
`error`, leave `data` undefined, and do not retry automatically. The card
component treats `error` and "still loading past a short timeout" the same
way — just don't render the metadata row.

### Relative time
Format `pushed_at` as a short relative string ("2 months ago" / "il y a 2 mois")
using either a small utility or a lightweight approach — no need for a new
dependency if it can be done in a few lines; use `date-fns` only if truly
needed, and only its `formatDistanceToNow` if so.

## Dependencies

- None strictly required; `date-fns` only if the relative-time formatting
  proves awkward to hand-roll — prefer hand-rolled first

## Verify when done

- [ ] Each project card shows stars and "updated X ago" once the API responds,
      without shifting the card's layout compared to Unit 06
- [ ] Reloading the page within ~30 minutes does not trigger a new network
      request per card (check the Network tab); after that window, it does
- [ ] Simulating a failed request (e.g. offline, or a bad repo path temporarily)
      leaves the card fully usable — description, illustration, Code link all
      still work, metadata row just doesn't appear
- [ ] No description, category or illustration content changed from Unit 06
- [ ] All new UI text (e.g. "updated") goes through LanguageContext
- [ ] No hardcoded hex values; `npm run build` passes, no console errors