# JJR Hub — Existing Repository Adoption Checklist

Use this once before continuing the migration.

## Safety

- [ ] Commit or stash current work.
- [ ] Create a backup branch/tag.
- [ ] Confirm `node_modules/` is ignored by Git.
- [ ] Do not delete `src/`, `legacy/`, `docs/architecture/`, or `scripts/`.

## Replace / add governance files

- [ ] Replace root `CLAUDE.md` with the final one.
- [ ] Add root `JJR-INTERNAL-HUB-SOP.md`.
- [ ] Add final supporting files under `docs/`.
- [ ] Add `docs/workflows/*.svg` and `docs/diagrams/*.svg`.
- [ ] Move obsolete conversion guides to `docs/archive/` instead of deleting immediately.

## Repository audit

Claude Code must inspect before refactoring:

- [ ] `package.json` scripts/dependencies.
- [ ] router/routes.
- [ ] layouts and AppShell.
- [ ] shared UI primitives.
- [ ] feature/domain folders.
- [ ] mock services/data.
- [ ] current converted pages.
- [ ] design tokens/Tailwind configuration.
- [ ] tests.

## Baseline checks

- [ ] Install dependencies only if needed.
- [ ] Run existing lint command if present.
- [ ] Run existing type-check command if present.
- [ ] Run existing tests if present.
- [ ] Run production build.
- [ ] Record baseline failures before changing code.

## Classification

For each existing page/component, mark:

- `KEEP` — already follows the final standard.
- `REFINE` — working but needs targeted improvement.
- `REPLACE` — architecture/quality issue justifies replacement.
- `OPEN` — requirement/decision unresolved.

## Reference-pattern review

Review **Active Projects** against:
- page inventory;
- WF-002, WF-003, WF-004;
- delivery classes;
- responsiveness;
- typed service seam;
- component reuse.

If it is already good, approve it. Do not rebuild it merely because the SOP is new.
