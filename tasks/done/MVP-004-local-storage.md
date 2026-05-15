# MVP-004 — localStorage persistence

**Status:** done  
**Plan:** [docs/plans/2026-05-15-mvp-phase1.md](../../docs/plans/2026-05-15-mvp-phase1.md) → Task 4  
**PRD:** §8 Source 5, §9 Returning User flow

## What

Persist selected cards and optional CPP target in localStorage (client-only).

## Acceptance

- [x] Keys `hotelrwd:cards`, `hotelrwd:cppTarget`
- [x] SSR-safe (no window access during render)
- [x] Reload restores prefs

## Notes

- `src/lib/storage.ts`, `src/hooks/useUserPrefs.ts`. UI gated until hydrated.
