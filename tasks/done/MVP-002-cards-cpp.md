# MVP-002 — Cards and CPP engine

**Status:** done  
**Plan:** [docs/plans/2026-05-15-mvp-phase1.md](../../docs/plans/2026-05-15-mvp-phase1.md) → Task 2  
**PRD:** §5 Feature 1, Glossary (CPP, MR, UR)

## What

Four supported cards with info-panel metadata; CPP presets, benchmarks, and `evaluateCpp()`.

## Acceptance

- [x] `cards.json` + `cards.ts` expose 4 MVP cards
- [x] CPP presets 1.5 / 1.8 / 2.0 / 2.5 + custom; benchmarks MR 2.0, UR 1.8, C1 1.85, Bonvoy 0.7
- [x] Unit tests in `src/lib/__tests__/cpp.test.ts` pass

## Notes

- `evaluateCpp` takes `currency` for benchmark/threshold selection; Bonvoy always uses benchmark threshold.
