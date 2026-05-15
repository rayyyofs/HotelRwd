# MVP-001 — Tooling and design foundation

**Status:** done  
**Plan:** [docs/plans/2026-05-15-mvp-phase1.md](../../docs/plans/2026-05-15-mvp-phase1.md) → Task 1  
**PRD:** §11 Design Language, §12 Navigation

## What

Add Vitest, global CSS design tokens, fonts, and header stub (`● RATES LIVE`).

## Acceptance

- [x] `npm run test` runs (even if no tests yet)
- [x] `npm run build` and `npm run lint` pass
- [x] `globals.css` defines PRD colors; layout imports it
- [x] Header shows date, time, rates-live indicator stub

## Notes

- Vitest config: `vitest.config.ts`, `vitest.setup.ts`. Header: `src/components/shared/AppHeader.tsx`.
