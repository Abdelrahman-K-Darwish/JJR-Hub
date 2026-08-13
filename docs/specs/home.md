# Page Spec — Home

## Identity
- Page ID: P-01
- Route: `/`
- Legacy mockup: `legacy/*.html` Home mockup — visual/interaction reference only, per `docs/SOURCE-AUTHORITY.md`'s pairing rule (never copy access logic or data ownership from it)
- Architecture source: `docs/architecture/JJR-Hub-Phase1-Architecture-v0_3.docx` (Artifacts 1–4), current authority per `docs/architecture/README.md`'s supersession rule over the earlier `JJR-Hub-Phase1-Architecture-Home-Page.docx` (v0.1, historical reference only)

## Purpose and source authority
- Home is the firm's front door: a composition surface over several already-owned domains
  (Active Projects, Communities) plus a small number of Home-only static/editorial sections. It
  does not own project data, community data, or any other domain's business rules.
- Precedence for this spec follows `docs/SOURCE-AUTHORITY.md`: confirmed decisions and the access
  model outrank this document; the v0.3 architecture document outranks this spec on any claim
  this spec doesn't explicitly override; this spec (a page spec, tier 5) is itself outranked by
  the Active Projects domain's own architecture on Active-Projects-owned data, and by the
  Communities domain's own architecture on Communities-owned data. This spec's job is to say how
  Home *composes* those, not to redefine them.
- **Home owns composition. Active Projects owns project data. Communities owns community data.**
  This spec does not introduce a `HomeService`, does not duplicate Active Projects' or
  Communities' scoping/read logic, and does not invent a competing source of truth for any entity
  those two domains already own.

## Home v1 scope

| Section | Status |
|---|---|
| Nav (primary/training/notifications/admin) | IMPLEMENT (existing `AppShell` chrome) |
| Greeting & date | IMPLEMENT |
| Milestones this week | IMPLEMENT |
| Projects (slider) — non-progress fields | IMPLEMENT |
| Projects (slider) — progress display | OPEN |
| Projects — "View all projects" link | IMPLEMENT |
| Communities (summary) | IMPLEMENT |
| My Stuff — Log Hours / My Tasks / My Calendar | IMPLEMENT (placeholder deep-links) |
| My Stuff — Reporting | DEFER |
| Resources — Consultant Directory tile | IMPLEMENT (plain link, no data call) |
| Resources — Client Hub | STUB |
| Resources — Compliance Hub | DEFER |
| Resources — Past Deliverables | DEFER |
| JJR Material | IMPLEMENT (static) |
| Knowledge Spotlight | IMPLEMENT (static) |
| Jenna's Thought Leadership | IMPLEMENT (static) |
| Topics | IMPLEMENT (static curated links) |

> **Correction:** an earlier version of this spec listed a separate "Knowledge" row
> (Templates Library / How We Work / Tool Guides quick-links, "SharePoint News + App DB
> counts") as a distinct IMPLEMENT section from Knowledge Spotlight. A full re-read of
> `legacy/jjr-hub-tw.html` found no such section — legacy's Home page has exactly one
> Knowledge section, the `.knowledge__grid` of `.k-card` entries (i.e. Knowledge Spotlight
> itself). The separate row was not backed by the visual source and has been removed from
> both this table and the implementation. Per `docs/SOURCE-AUTHORITY.md`'s conflict-handling
> rule, an assumption not backed by its source should not have been labeled CONFIRMED.

## Users / access
- Functional roles: all authenticated employees (Home is Class A shell + section-level scoping
  inherited from whichever domain a section reuses — this spec does not add new role logic).
- Capabilities: none introduced by Home itself; the Admin · Hub Actions nav entry's capability
  gating belongs to P-20, referenced not redefined here.
- Scope: per-section, inherited from the reused domain (Active Projects' own scoping for
  Projects/Milestones data; Communities' own scoping for the Communities summary). Home performs
  no additional client-side filtering that could be mistaken for authorization — see States/Open
  decisions below.

## Sections

| Section | Delivery class | Data owner | Editable by | Source system | CRUD | Confidence | Notes |
|---|---|---|---|---|---|---|---|
| Nav | A | — | — | — | R | CONFIRMED | Existing `AppShell`, no change |
| Greeting & date | A | — (client-side) | — | — | R | CONFIRMED | Date/time-of-day only |
| Greeting — user display name | A | Entra/OIDC (future) | — | `CURRENT_USER` mock stand-in | R | MISSING/LATER — see Identity handling | Same pre-existing app-wide stand-in every other page already uses |
| Milestones this week | B | Active Projects domain (App DB) | — | `activeProjectsService.getMilestones()` | R | PROPOSED | 7-day window computed client-side over already-scoped data |
| Projects slider — core fields | B | Active Projects domain (App DB) | — | `activeProjectsService.getPortfolio()` | R | CONFIRMED (doc), MISSING (impl until built) | `name`, `clientLine`, `description`, `status`, `dueLabel`, `team` |
| Projects slider — progress | — | Active Projects domain | — | — | — | **OPEN** | See Project-progress conflict below; not rendered in v1 |
| Projects — "View all projects" | A | — | — | `/active-projects` (existing route) | R (navigation) | CONFIRMED | Confirmed existing router path, not a new route |
| Communities summary | B | Communities domain (App DB) | — | `communitiesService.getDirectory()` | R | CONFIRMED | Rendered via `HomeCommunityTile`, not `CommunityCard` |
| My Stuff — Log Hours | E | QuickBooks (external) | — | MISSING (deep-link target undetermined) | R (navigation) | CONFIRMED (existence/type), MISSING (URL) | Placeholder link, same pattern as other pages' `/under-development?from=...` |
| My Stuff — My Tasks | E | Planner (external) | — | MISSING | R (navigation) | CONFIRMED (existence/type), MISSING (URL) | Placeholder link |
| My Stuff — My Calendar | E | Outlook (external) | — | MISSING | R (navigation) | CONFIRMED (existence/type), MISSING (URL) | Placeholder link |
| My Stuff — Reporting | — | — | — | — | — | OPEN | Owner/reviewer undecided per the v0.3 doc's own open-items log; deferred |
| Consultant Directory tile | A | — | — | `/consultant-directory` (existing route) | R (navigation) | DERIVED | Plain link tile, no data fetch |
| Client Hub | B | SharePoint/App DB (generic, unconfirmed library) | — | MISSING | R | CONFIRMED (existence), MISSING (backing source) | STUB — see Client Hub classification below |
| Compliance Hub | — | — | — | — | — | OPEN (D-003) | Deferred entirely, not rendered as data-backed |
| Past Deliverables | — | — | — | — | — | OPEN (D-014) | Deferred entirely, not rendered as data-backed |
| JJR Material | A | SharePoint (generic, unconfirmed library) | Editor | MISSING | R | CONFIRMED (existence) | Static/editorial content, no live call |
| Knowledge Spotlight | A | Editorial | Editor | — | R | CONFIRMED | Static content |
| Jenna's Thought Leadership | A | SharePoint News (generic, unconfirmed) | Leadership | MISSING | R | CONFIRMED (existence) | Static content. Featured image: one entry ("Advancing the Work of JJR") uses the actual photo embedded in legacy's own mockup (extracted from its data-URI), the rest use the same gradient treatment legacy uses for its other entries. |
| Topics | A | Editorial curation | Editor | — | R | PROPOSED | Static curated links; JEDI-CAB destination itself remains BLOCKED (D-015), the link is not |

CRUD short codes: R = read, C = create, U = update, D = delete, A = approve.

## Data placement

| Entity | System of record | Pointer |
|---|---|---|
| Project, Milestone | Active Projects domain (Application Data Store) | `activeProjectsService` — Home does not read `src/mocks/activeProjects.ts` directly |
| Community | Communities domain (Application Data Store) | `communitiesService` — Home does not read `src/mocks/communities.ts` directly |

No new entity is introduced by Home. Home's own static content (My Stuff links, JJR Material,
Knowledge Spotlight, Thought Leadership, Topics) is local presentational data, not a domain
entity, and lives outside the page component per CLAUDE.md §5.

## Workflows
- WF-001, WF-002, WF-003 (per `docs/PAGE-INVENTORY.md`'s P-01 entry — referenced, not redefined)

## Domain-service reuse

**Home owns composition. Active Projects owns project data. Communities owns community data.**
No `HomeService` is created. Home reads through two composition hooks, each calling one existing
domain service directly:

### `useHomeProjects()`
- Calls `activeProjectsService.getPortfolio()` and `activeProjectsService.getMilestones()`.
- Responsibilities: slice the returned portfolio to a small "top N" set for the slider; compute
  the 7-day "milestones this week" count from the already-scoped milestone list; **strip/omit any
  progress value before it reaches presentation** — see Project-progress conflict.
- Must NOT: import `src/mocks/activeProjects.ts`; duplicate Active Projects' own scoping logic;
  perform authorization; introduce a "top N" business rule beyond a display-ordering choice over
  data the service already returned; resolve the progress conflict by picking a value.
- Owns its own `isLoading`/`error`/`data` state, independent of `useHomeCommunities()`.

### `useHomeCommunities()`
- Calls `communitiesService.getDirectory()`.
- Responsibilities: reduce the returned `CommunitySummary[]` to whatever `HomeCommunityTile`
  needs (name, icon, member count, short description).
- Must NOT: import `src/mocks/communities.ts`; duplicate Communities' own scoping/join logic;
  perform authorization; introduce new business rules.
- Owns its own `isLoading`/`error`/`data` state, independent of `useHomeProjects()`.

### Independent loading/error behavior
Each hook manages its own state machine. A rejection in `useHomeCommunities()` must not block or
blank the Projects section, and vice versa — `HomePage.tsx` renders each section's loading/error/
loaded state locally, not behind one page-wide gate. This mirrors the per-hook `useEffect` +
cancelled-flag pattern already used by `useActiveProjects.ts`/`useCommunities.ts`, applied twice,
independently, inside Home's own hooks — not by calling those page hooks directly.

### Static/local-content responsibilities
Sections with no service call (Greeting/date presentation, My Stuff link targets, JJR Material,
Knowledge Spotlight, Thought Leadership, Topics) are sourced from a local,
feature-owned constants file (`src/features/home/homeContent.ts`, once created), kept out of the
page component per CLAUDE.md §5 — the same discipline already applied to every other converted
page's mock data.

## Components

- Reuse: `AppShell`, `ListPanel`, `QuickLinkList`, `PageHero`/`HeroGrain`, `MiniButton`,
  `ResourceLink` — no new primitives justified for these sections.
- New domain components:

  ### `HomeProjectTile` decision
  **`ProjectCard` is not reused on Home.** `ProjectCard` carries presentation semantics beyond
  raw `Project` fields — a stretched-link to a project-detail route (`/projects/{id}`, which does
  not exist in the router) and `MiniButton` quick-links (Files/Planner/Dashboard/SOW — themselves
  unresolved per the earlier link-classification work, DOCUMENT_RESOURCE/EXTERNAL_SYSTEM/MISSING
  depending on the label). Home should not inherit either of those by accident just because it
  consumes the same `Project` type. Propose a Home-specific presentational component,
  `HomeProjectTile`, consuming only confirmed `Project` fields
  (`name`, `clientLine`, `description`, `status`, `dueLabel`, `team`) returned by
  `activeProjectsService`. It must NOT: display progress while the conflict is OPEN; invent or
  resolve a project-detail route; surface quick-links; duplicate any Active-Projects-domain logic.
  Home v1 instead provides one confirmed page-level navigation — **"View all projects" →
  `/active-projects`** — using the existing, already-registered router path, not a new route.

  ### `HomeCommunityTile` decision
  **`CommunityCard` is not reused on Home.** Its actual layout (Top Resources / Recent
  Discussions / Key Experts three-column card + Join action + full description) is built for the
  Communities directory page, not a compact homepage summary. Propose a small
  `HomeCommunityTile`, consuming `CommunitySummary` fields directly (`name`, `icon`,
  `memberCount`, `description`) — no new domain logic, purely a different rendering of
  already-typed, already-fetched data from `useHomeCommunities()`.

## States
- Loading — per-section, independent (`useHomeProjects`/`useHomeCommunities` each own their own)
- Loaded — per-section
- Empty — e.g. zero projects/communities returned; render the section shell with an empty state,
  not an error
- Error — per-section, independent; one domain feed failing does not blank the whole page
- Restricted — not applicable to Home v1's IMPLEMENT/STUB scope; Compliance Hub/Past Deliverables
  are DEFERRED (not rendered), not rendered-then-restricted, since no access model for them exists
  yet to enforce
- Partial integration unavailable — **Client Hub**, explicitly. See Client Hub classification.

### Client Hub classification
**STUB, not STUB/LOCKED.** Client Hub's existence and scope are architecture-CONFIRMED; only its
backing data source is MISSING (no SharePoint library or App DB client-record adapter exists
anywhere in the codebase). A locked/restricted visual treatment would imply an access denial that
no source actually states — per CLAUDE.md §6, frontend visibility must not be presented as
authorization, and the inverse is equally true: an integration gap must not be presented as an
authorization gap. Client Hub renders as a visible, clearly-labeled "not yet connected" panel —
partial-integration-unavailable, not restricted-access.

## Identity handling

No real authenticated-user identity source exists anywhere in this repository — every converted
page, not just Home, currently renders `CURRENT_USER` from `src/mocks/currentUser.ts`, itself
explicitly documented as *"Stand-in for the identity the walking skeleton will resolve from
Entra/OIDC"* (CLAUDE.md §4 step 0). Home does not invent a new identity source. Two concerns are
kept explicitly separate:
- **Current date / time-of-day greeting logic** — pure client-side presentation, no data source
  needed, CONFIRMED/IMPLEMENT.
- **Authenticated user's display name** — sourced from the same pre-existing `CURRENT_USER`
  stand-in used app-wide. Marked **MISSING/LATER** for a real identity source — this is a
  standing, app-wide gap, not something this spec resolves or newly discovers for Home alone.

## Project-progress conflict

`docs/architecture/JJR-Hub-Phase1-Architecture-v0_3.docx` (Home, Artifact 1) describes project
progress as Planner-derived. `docs/specs/active-projects.md` decision AP2 explicitly overrides a
previously-Confirmed row to milestone-derived instead, and its own text flags that Home must
eventually agree or the two pages will disagree about the same project's progress.

Per `docs/SOURCE-AUTHORITY.md`'s precedence order, a page-specific architecture document (tier 3)
outranks a page spec (tier 5) — meaning Home's own architecture document's Planner-derived claim
is not automatically overridden by Active Projects' spec-level decision on a shared entity.
Per the same document's conflict-handling rule (*"If ambiguity remains, add an `OPEN` decision.
Use the safest reversible implementation. Do not label an assumption `CONFIRMED`"*), Home v1 does
not pick either side. `HomeProjectTile` never receives or renders a progress value. This is a
genuinely reversible choice — `ProjectCard`'s own `progress: number | null` / `ProgressTrack`'s
`value == null → render nothing` pattern already treats "no progress shown" as first-class, so
adding progress later requires no structural rework, only a resolved decision.

**This spec does not resolve the conflict.** It should eventually be closed by either updating
Home's architecture document to match AP2, or by formally recording D-006 (currently PROPOSED) as
a tracked OPEN decision with an explicit resolution — neither of which this spec does.

## Deferred / Open decisions

| Decision | Confidence | Affects |
|---|---|---|
| Project-progress source (Home doc vs. AP2) | OPEN | Projects slider — progress display only |
| D-003 (compliance/training source) | OPEN | Compliance Hub — deferred entirely |
| D-014 (Past Deliverables visibility) | OPEN | Past Deliverables — deferred entirely |
| My Stuff — Reporting owner/reviewer | OPEN (v0.3 doc's own open-items log, not a numbered D-xxx) | Reporting — deferred, deep-link only excluded too |
| Client Hub backing source | MISSING (no D-xxx; no source names one) | Client Hub — STUB |
| Real authenticated-identity source | MISSING/LATER (app-wide, not Home-specific) | Greeting display name only |

## Testing requirements

- `useHomeProjects.test.ts` — loading→loaded; service rejection→error (independent of Communities
  hook); confirms no `progress` field is exposed/rendered from returned data; confirms "top N"
  slicing operates only on the service-returned set (scoping-isolation style, mirroring
  `useActiveProjects.test.ts`).
- `useHomeCommunities.test.ts` — loading→loaded; service rejection→error (independent of Projects
  hook); confirms summary shaping operates only on the service-returned set.
- `HomePage.test.tsx` — smoke render; independent-failure test (one hook rejecting does not blank
  the other section or the page); confirms `HomeProjectTile` renders no progress UI; confirms
  Client Hub renders a labeled not-yet-connected state, not a restricted/locked one; confirms
  "View all projects" navigates to `/active-projects`.
- `App.test.tsx` update — `/` route renders `HomePage`, not the `UnderDevelopmentPage` stub.
- No test may assert or imply that a frontend check constitutes authorization, and none may assert
  a resolved value for the progress conflict.

## Acceptance criteria (Definition of Done, DoD-A)
- [ ] Meets DoD-A.
- [ ] Home renders via composition only — no `HomeService`, no direct `src/mocks/*` imports from
      Home's own hooks, no duplicated Active-Projects/Communities scoping or business logic.
- [ ] `useHomeProjects()` and `useHomeCommunities()` each own independent loading/error state;
      one failing does not blank the whole page.
- [ ] `HomeProjectTile` never displays progress, never links to an invented project-detail route,
      never surfaces project quick-links.
- [ ] `HomeCommunityTile` is used for the Communities summary, not `CommunityCard`.
- [ ] "View all projects" links to the existing `/active-projects` route only.
- [ ] Client Hub renders as STUB (partial-integration-unavailable), not a locked/restricted state.
- [ ] Compliance Hub and Past Deliverables are not rendered as data-backed sections.
- [ ] No workflow behavior (WF-006/007/008/009/010/012/013 etc.) beyond WF-001/002/003 is
      implemented or simulated.
- [ ] No unresolved rule was invented; no OPEN decision was resolved by this spec or by a later
      implementation following it.
