# JJR Hub — Project Status

This file is intentionally separate from the SOP because build status changes frequently.

## Current status

Repository adoption audit completed (Phase A). 15 of 20 pages have working React implementations
under `src/features/`, sharing a single `AppShell`/`BareLayout` shell and a 36-component
`src/components/ui/` primitive library. `npm run typecheck` and `npm run build` both pass clean
against current `main`. No lint or test tooling is installed yet — see Technical debt.

This supersedes the "previous working SOP reported multiple pages converted" caveat: the code
has now been inspected directly, not taken on faith.

## Status values

- `NOT STARTED`
- `BLOCKED` — an OPEN decision blocks the page's primary path, not just a sub-section
- `KEEP` — already follows the final standard
- `REFINE` — working but needs targeted improvement
- `REPLACE`
- `DONE` — reserved for DoD-B (production-integrated); nothing qualifies yet

## Page tracker

| Page | Status | Notes |
|---|---|---|
| Home | NOT STARTED | Heaviest legacy page (141.7 KB JS). No blocking decision; can start once prioritized. WF-001/002/003. |
| Start Here | NOT STARTED | Scenario selection is buildable now (personalization, not permission). Verified-status/advanced-access gating sub-section depends on D-013 (manager/team scope, OPEN) — model that state explicitly rather than guess. |
| My Profile | NOT STARTED | Public/self/relationship-scoped tiers are buildable now (WF-009). Past Deliverables section depends on D-014 (OPEN) — do not guess consultant-vs-leads-and-up visibility. |
| Active Projects | KEEP | Reference pattern, reviewed per SOP Phase C. `ProjectCard`/`FilterBar`/`HealthBar`/`StatBlock` reuse; client-side My/All filter over an already-"scoped" mock set matches WF-002 shape; has `docs/specs/active-projects.md`. Approved — do not rebuild. |
| Communities | KEEP | `CommunityCard` (shared with Community Detail) correctly models D14: `recentDiscussions` is `undefined` for communities the mock user hasn't joined, and the card renders a join prompt instead of the discussion list — the class C omission is modeled at the data-shape level, not just visually hidden. |
| Community Detail | KEEP | Slug-keyed lookup (`COMMUNITY_DETAILS[slug]`) with an explicit not-found state — reasonable shape for real routing later. Shares `AvatarChip`/`ResourceLink`/`DiscussionThread` with Communities. |
| Templates | KEEP | `FilterBar` (category + role), `Modal` for doc preview, `ListPanel` reuse. |
| Tool Guides | KEEP | Search/filter over mock guide list, `ListPanel`, shared icon set. |
| How We Work | KEEP | `Timeline`, `Accordion`, `ListPanel` reuse; FAQ accordion is real component state, not innerHTML toggling. |
| PMO | KEEP | `StatBlock`, `DateTile`, `ListPanel`, collapsible review-calendar panel; Lessons Learned section gives WF-011 a concrete home. |
| Admin · Hub Actions | REFINE | Correctly uses `BareLayout` (chrome-less, per P-20). Priority/publish flow is local UI state only — no capability check stub (`can('admin:publish-action')`), no locked state for non-admins, no audit-trail modeling even at the mock level. WF-013 says "eventually auditable"; right now there's nothing to eventually connect. Flag before this page gets a real publish action. |
| Accessibility | KEEP | |
| AI for Good | KEEP | Built on shared `ContentPage` template (with Environmental Justice, Vision & Values) per PAGE-INVENTORY's reuse note — not rebuilt three times. |
| Environmental Justice | KEEP | Shares `ContentPage`. |
| Vision & Values | KEEP | Shares `ContentPage`. |
| Site Owners | KEEP | |
| Under Development | KEEP | Utility stub, correctly minimal. |
| Exec & Strategy | BLOCKED | Entire page is the restricted area (WF-010, Class C/D). D-004 (exact Leadership membership rule, OPEN) blocks modeling the primary access boundary correctly — building the shell without it risks presenting mock protection as real, which CLAUDE.md §6 forbids. |
| JEDI CAB | BLOCKED | PAGE-INVENTORY and D-015 both say ring-3/cohort behavior needs dedicated analysis before implementation. Do not start from the legacy mockup alone. |

## Cross-cutting technical debt (not a per-page issue)

- **No typed service seam.** SOP §13 specifies `Page → Feature hook/controller → Typed service
  contract → Mock adapter now`. All 15 converted pages instead import mock constants directly
  from `src/mocks/*.ts` into the page component. Types are decent (each mock file exports
  interfaces), but there is no adapter boundary — swapping mock data for a real API will mean
  editing every page's data-fetching, not swapping one adapter. Worth closing before Phase E.
- **No lint tooling.** No ESLint config/dependency exists; `npm run lint` isn't a defined script.
  CLAUDE.md §10 says "run lint... when scripts exist" — none does yet, so this isn't a failing
  check, just a gap.
- **No tests.** No test framework is installed and no `*.test.*`/`*.spec.*` files exist anywhere
  in `src/`. Same treatment — not a failure, a gap.
- **Repo layout diverges from the SOP's suggested tree** (`src/app`, `src/pages`, `src/services`,
  `src/hooks`, `src/types`, `src/utils`, `src/test` don't exist; the repo uses
  `src/components` + `src/features` + `src/mocks` instead). SOP §8 explicitly allows this
  ("do not move working files merely to match this exact tree") — recorded as a fact, not a
  defect.
- **No router.** `src/App.tsx` is a `useState`-driven dev page switcher, explicitly commented as
  a placeholder ("there is no router yet"). Every page hard-codes `href="/..."` strings that
  assume real routes will exist later.
