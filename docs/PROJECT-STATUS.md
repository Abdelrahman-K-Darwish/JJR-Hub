# JJR Hub — Project Status

This file is intentionally separate from the SOP because build status changes frequently.

## Current status

Repository adoption audit completed (Phase A). 16 of 20 pages have working React implementations
under `src/features/`, sharing a single `AppShell`/`BareLayout` shell and a 36-component
`src/components/ui/` primitive library. React Router (`react-router@^7.18.2`) is fully wired —
`src/main.tsx` wraps `<App/>` in `<BrowserRouter>` and `src/App.tsx` defines a full `<Routes>`
table for all 20 pages, including alias redirects, with routing behavior covered by
`src/App.test.tsx`. `npm run typecheck` and `npm run build` both pass clean against current
`main`. Vitest + `@testing-library/react` are installed and working (`vitest`, `jsdom`,
`@testing-library/react` in `package.json` devDependencies; `npm run test` runs `vitest run`).
No lint tooling is installed yet — see Technical debt.

This supersedes the "previous working SOP reported multiple pages converted" caveat: the code
has now been inspected directly, not taken on faith.

For which architecture class (A/B/C/D/E) and implementation readiness (READY/SPEC FIRST/BLOCKED)
each remaining page warrants, see `docs/REMAINING-PAGE-CLASSIFICATION.md` — the current
implementation-planning guide for page work beyond Active Projects/Communities/Community Detail.
Page statuses below are not changed by that classification alone.

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
| Active Projects | KEEP | Reference pattern, reviewed per SOP Phase C. `ProjectCard`/`FilterBar`/`HealthBar`/`StatBlock` reuse; client-side My/All filter over an already-"scoped" mock set matches WF-002 shape; has `docs/specs/active-projects.md`. Has a full typed service seam — see Cross-cutting technical debt below. Approved — do not rebuild. |
| Consultant Directory | KEEP | `ConsultantDirectoryPage`, routed at `/consultant-directory`. Filter/search over `src/mocks/consultantDirectory.ts`. No dedicated architecture doc; DERIVED from the Home doc's directory-tile description — see `docs/DATA-AND-BEHAVIOR-MAP.md` P-13 entry. |
| Communities | KEEP | `CommunityCard` (shared with Community Detail) correctly models D14: `recentDiscussions` is `undefined` for communities the mock user hasn't joined, and the card renders a join prompt instead of the discussion list — the class C omission is modeled at the data-shape level, not just visually hidden. Has a full typed service seam: `CommunitiesPage.tsx` → `useCommunities.ts` → `communitiesService.getDirectory()` → `communitiesMockAdapter.ts` → `src/mocks/communities.ts`. |
| Community Detail | KEEP | Slug-keyed lookup (`COMMUNITY_DETAILS[slug]`) with an explicit not-found state — reasonable shape for real routing later. Shares `AvatarChip`/`ResourceLink`/`DiscussionThread` with Communities. Has a full typed service seam: `CommunityDetailPage.tsx` → `useCommunityDetail(slug)` → `communitiesService.getCommunityDetail(slug)` → `communitiesMockAdapter.ts` → `src/mocks/communityDetail.ts`. |
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

- **Typed service seam exists on two pages/features, not yet replicated to the rest.** SOP §13
  specifies `Page → Feature hook/controller → Typed service contract → Mock adapter now`. Active
  Projects has this seam fully built end-to-end:
  `src/features/active-projects/ActiveProjectsPage.tsx` → `useActiveProjects.ts` →
  `activeProjectsService.ts` (typed service contract) → `activeProjectsMockAdapter.ts` (mock
  adapter) → `src/mocks/activeProjects.ts`, with test coverage in
  `activeProjectsMockAdapter.test.ts` and `useActiveProjects.test.ts` (3 cases, including a
  scoping-isolation test). Communities and Community Detail now share the same pattern over one
  service contract, `communitiesService.ts`, backed by one shared `communitiesMockAdapter.ts`:
  `CommunitiesPage.tsx` → `useCommunities.ts` → `communitiesService.getDirectory()` →
  `communitiesMockAdapter.ts` → `src/mocks/communities.ts`; and `CommunityDetailPage.tsx` →
  `useCommunityDetail(slug)` → `communitiesService.getCommunityDetail(slug)` →
  `communitiesMockAdapter.ts` → `src/mocks/communityDetail.ts`. The adapter is shared (it
  implements both methods), but each page's own call path reads only its own mock file, not both.
  Test coverage: `communitiesMockAdapter.test.ts`, `useCommunities.test.ts`, and
  `useCommunityDetail.test.ts`.
  Every other converted page instead imports mock constants directly from `src/mocks/*.ts` into
  the page component — no adapter boundary, so swapping mock data for a real API will mean
  editing each page's data-fetching individually rather than swapping one adapter. Worth closing
  (replicating this pattern to the remaining pages) before Phase E.
- **No lint tooling.** No ESLint config/dependency exists; `npm run lint` isn't a defined script.
  CLAUDE.md §10 says "run lint... when scripts exist" — none does yet, so this isn't a failing
  check, just a gap.
- **Tests exist but coverage is minimal.** Vitest + `@testing-library/react` are installed and
  working (`npm run test` runs `vitest run`). Three test files exist:
  `src/features/active-projects/activeProjectsMockAdapter.test.ts`,
  `src/features/active-projects/useActiveProjects.test.ts`, and `src/App.test.tsx` (routing
  tests, including alias redirects). No other feature has test coverage yet — a gap to close
  page-by-page, not a missing framework.
- **Repo layout diverges from the SOP's suggested tree** (`src/app`, `src/pages`, `src/services`,
  `src/hooks`, `src/types`, `src/utils`, `src/test` don't exist; the repo uses
  `src/components` + `src/features` + `src/mocks` instead). SOP §8 explicitly allows this
  ("do not move working files merely to match this exact tree") — recorded as a fact, not a
  defect.
- **Router is fully implemented.** `react-router@^7.18.2` is installed; `src/main.tsx` wraps
  `<App/>` in `<BrowserRouter>`; `src/App.tsx` is a route table (`<Routes>`/`<Route>`) covering
  all 20 pages, including two alias redirects for pre-correction nav hrefs and a catch-all
  redirect. `src/App.test.tsx` covers routing behavior. Routing existing is a separate fact from
  a page having real content, though: 5 routes (`/`, `/start-here`, `/my-profile`,
  `/exec-strategy`, `/jedi-cab`) currently render the `UnderDevelopmentPage` stub rather than a
  real page component — see the page tracker above (Home, Start Here, My Profile: NOT STARTED;
  Exec & Strategy, JEDI CAB: BLOCKED). A route existing does not mean the page is implemented.
