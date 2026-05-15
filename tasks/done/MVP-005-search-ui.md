# MVP-005 — Search screen UI

**Status:** done  
**Plan:** [docs/plans/2026-05-15-mvp-phase1.md](../../docs/plans/2026-05-15-mvp-phase1.md) → Task 5  
**PRD:** §5 Feature 1, §10 UX Principles

## What

CardSelector, CardInfoPanel, CppTargetInput, SearchForm on single SEARCH screen.

## Acceptance

- [x] Card toggles + ⓘ dismissible info panel
- [x] CPP presets + custom; benchmark label when empty
- [x] City + check-in/out; search enabled when city, dates valid, and ≥1 card selected
- [x] No separate setup flow

## Notes

- Orchestrator: `src/components/search/SearchScreen.tsx`. Discovery preview lists eligible hotels (MVP-007 will replace with full list UX).
