# MVP-003 — Eligibility database

**Status:** done  
**Plan:** [docs/plans/2026-05-15-mvp-phase1.md](../../docs/plans/2026-05-15-mvp-phase1.md) → Task 3  
**PRD:** §5 Feature 2, §8 Source 3–4

## What

Static JSON for eligibility, quality, benefits; `getEligibleHotels()` filter logic.

## Acceptance

- [x] 10–20 seeded properties across 2–3 cities
- [x] Multi-program overlap (e.g. FHR + EDIT on one hotel)
- [x] Kimpton-like test: FHR + EDIT when user holds Amex + Chase
- [x] `npm run test` passes eligibility tests

## Notes

- 15 properties across Salt Lake City, Buenos Aires, Chicago. `benefits.json` keyed by program for later UI.
