# HotelRwd

Next.js site with PRD and task folders for planning.

## Layout

- `docs/prd/PRD.md` — product requirements
- `docs/plans/` — implementation plans (see `2026-05-15-mvp-phase1.md` for MVP)
- `tasks/mvp/STATUS.md` — MVP progress dashboard
- `tasks/backlog/` — active tasks (`MVP-*.md`); `tasks/done/` — completed archive
- `.cursor/rules/` — Cursor guidance (`hotelrwd`, `plan-and-task-tracking`, **`prd-feedback-and-changes`** — classify feedback vs PRD before edits)
- `src/app/` — Next.js App Router (`layout.tsx`, `page.tsx`, routes)
- `src/components/`, `src/lib/` — shared UI and helpers
- `public/` — static assets

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
