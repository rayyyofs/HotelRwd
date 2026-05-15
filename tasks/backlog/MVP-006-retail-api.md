# MVP-006 — Retail price API

**Status:** pending  
**Plan:** [docs/plans/2026-05-15-mvp-phase1.md](../../docs/plans/2026-05-15-mvp-phase1.md) → Task 6  
**PRD:** §5 Feature 4, §8 Source 1

## What

`POST /api/hotels/search` with Amadeus integration and mock fallback.

## Acceptance

- [ ] Returns `RetailQuote[]` for seeded hotel IDs
- [ ] Mock prices when `AMADEUS_API_KEY` unset
- [ ] Response includes retail disclaimer metadata
- [ ] `.env.local.example` documents keys

## Notes

Blockers / decisions:
