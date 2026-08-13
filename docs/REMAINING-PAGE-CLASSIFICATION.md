# Remaining-Page Architecture Classification

This is a **derived coordination document** per `docs/SOURCE-AUTHORITY.md` — it summarizes and
cross-references `docs/PAGE-INVENTORY.md`, `docs/DATA-AND-BEHAVIOR-MAP.md`,
`docs/DATA-SOURCE-CATALOG.md`, `docs/DELIVERY-CLASSES.md`, `docs/WORKFLOW-CATALOG.md`,
`docs/decisions/OPEN-DECISIONS.md`, and per-page architecture docs under `docs/architecture/`.
It does not carry independent authority. If this file ever conflicts with one of those sources,
the higher-authority source wins and this file must be corrected.

It classifies the 17 JJR Hub pages that are **not** one of the two existing reference service-seam
patterns, so that implementation work picks the minimum architecture each page actually needs
instead of defaulting every page to a full `Page → hook → service → adapter` seam.

## Classification model

Every page gets one primary class, and a secondary class where meaningful:

- **A — Full dynamic service seam.** `Page → hook/controller → typed service contract → mock
  adapter`. Warranted when a page has meaningful structured runtime data, loading/error state,
  user-specific/scoped data, multiple data sources, or clear future backend interaction.
- **B — Lightweight content/data adapter.** Dynamic/governed data exists, but not enough to
  justify a full hook/service/controller stack — typically one small typed read function with no
  loading/error state machinery and no adapter swap-point yet.
- **C — Static/editorial.** Primarily firm content/presentation; no runtime data orchestration
  needed today. Static/editorial does **not** mean the future storage system is known — where
  future content ownership is MISSING in the map/catalog, it stays MISSING here too.
- **D — Blocked.** A meaningful architecture/business/access decision must resolve first. The
  exact blocking decision ID is always named.
- **E — External/document-oriented integration.** The Hub primarily discovers, links to, or
  surfaces canonical resources owned by another system. Never classified as SharePoint/Graph/
  Planner/Power BI unless an authoritative source explicitly supports it — otherwise recorded as
  "External/document source — MISSING."

**Architecture intent vs. implementation readiness.** These are tracked separately for every
blocked or not-yet-specified page. A page can have a clear intended architecture (e.g. "A/D") while
its implementation readiness is `BLOCKED` or `SPEC FIRST` — the two are not the same statement, and
collapsing them risks either guessing at a blocked decision or skipping a needed spec.

## Reference patterns (already implemented — not migration candidates)

- **P-04 Active Projects** — single-page dynamic service seam: `ActiveProjectsPage.tsx →
  useActiveProjects.ts → activeProjectsService.ts → activeProjectsMockAdapter.ts →
  src/mocks/activeProjects.ts`. Class A reference.
- **P-05 Communities / P-06 Community Detail** — shared-domain read service seam: one
  `CommunitiesService` contract (`getDirectory()` + `getCommunityDetail(slug)`), one shared
  `communitiesMockAdapter.ts`, two separate hooks (`useCommunities.ts`, `useCommunityDetail.ts`)
  each calling only the method it needs. Class A reference; demonstrates that "one service" does
  not mean "one physical data source" or "one hook."

These two patterns are references, not mandatory templates — most of the 17 pages below do not
need the same shape.

## Master classification table

| Page | Status | Frontend source | Arch coverage | Architecture intent | Implementation readiness | Structured entities | User-specific? | Delivery class(es) | Workflow IDs | Known source system(s) | Open/Missing decisions |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P-01 Home | NOT STARTED | none | STRONG (v0.3 doc) | **A, composition-only** (reuses other domains' services; no monolithic HomeService) | READY | Project, Milestone, ProjectMembership, AccessRequest, Community, Client | Yes | A, B, B/C boundary | WF-001, 002, 003 | Entra/OIDC, SharePoint (generic), Planner, QuickBooks, Outlook, Teams | Progress conflict (Planner vs. milestone — D-006/spec AP2); D-014 (Past Deliverables scope) |
| P-02 Start Here | NOT STARTED | none | STRONG (dedicated doc) | **C** (static content) + **dynamic state boundary LATER** (progress/personalization) + **D** (compliance/Advanced Access) | Content: READY. Progress: READY to design as its own typed state boundary once prioritized — not a synchronous content adapter. Gate: BLOCKED | OnboardingProgress, BuddyAssignment | Yes (progress), no (static content) | A (content), A/B (progress), B/C+D (gate) | WF-001, 003, 005 | Stream (video), Compliance Hub/LMS (undecided) | D-003 (compliance source, OPEN), D-013 (manager/team scope, OPEN) — both preserved unresolved |
| P-03 My Profile | NOT STARTED | none | STRONG (dedicated doc) | **A** (owner/colleague/privileged payload shapes, edit rights, squad-scoped sensitive fields) | READY for public/self tiers; sensitive tiers depend on D-013/D-014 | ConsultantProfile | Yes, heavily | A (public), C (contact/HR), A (settings) | WF-001, 002, 009 | Entra/M365 (Graph identity mirror), Teams presence, Compliance Hub/SharePoint | D-014 (Past Deliverables cross-ref, OPEN), D-013 (squad definition, OPEN) |
| P-07 Templates | KEEP (mock import) | `templates.ts` | PARTIAL (rule only) | **E** (exact system MISSING) + **B** (lightweight browse/filter) | SPEC FIRST for the E integration; B adapter is READY | none confirmed | No | A (browse) | WF-002 | MISSING | Exact external system MISSING |
| P-08 PMO | KEEP (mock import) | `pmo.ts` | STRONG (dedicated doc) | Mixed — no single class; see sub-section split below | Split — see below | LessonLearned | Partially (financial gate) | A, A→B, B/E, E | WF-002, 008, 011 | SharePoint (generic), Outlook (proposed), Power BI (proposed, unreconciled) | D-008 (KPI-source conflict w/ P-15, OPEN) |
| P-09 How We Work | KEEP (mock import) | `howWeWork.ts` | MISSING (rule only) | **C** | READY (already correct) | none | No | A | — | MISSING | Future content ownership MISSING |
| P-10 Tool Guides | KEEP (mock import) | `toolGuides.ts` | PARTIAL (rule only) | **E** (exact system MISSING) + **B** | SPEC FIRST for the E integration; B adapter is READY | none confirmed | No | A | WF-002 | MISSING | Exact external system MISSING |
| P-11 Accessibility | KEEP (mock import) | `accessibility.ts` | MISSING (rule only) | **C** + **B** (if request path is ever built) | READY (content); request path not yet designed | AccessRequest (generic, WF-003) | No (unless request path built) | A | WF-003 | MISSING | Future content ownership MISSING |
| P-12 AI for Good | KEEP (shared `ContentPage`) | `aiForGood.ts` | MISSING (rule only) | **C** | READY (already correct) | none | No | A | — | MISSING | Future content ownership MISSING |
| P-13 Consultant Directory | KEEP (mock import) | `consultantDirectory.ts` | PARTIAL (DERIVED only, no dedicated doc) | **B** now; possible A/E later if a dedicated doc confirms live presence integration | SPEC FIRST (needs its own architecture note before any upgrade past B) | ConsultantProfile (app-owned fields, DERIVED) | No (until presence added) | A/B split | WF-002, 009 | Entra (DERIVED), Teams presence (DERIVED, not CONFIRMED for this page) | No decision named specifically for P-13; the DERIVED-only status is itself the gap |
| P-14 Environmental Justice | KEEP (shared `ContentPage`) | `environmentalJustice.ts` | MISSING (rule only) | **C** | READY (already correct) | none | No | A | — | MISSING | Future content ownership MISSING |
| P-15 Exec & Strategy | **BLOCKED** | none | STRONG (dedicated doc) | Full restricted service architecture (Class C/D delivery: locked shell + backend-omitted payload) | **BLOCKED — D-004** | AccessRequest, StrategicIdea | Yes (leadership + granted) | C (financials/KPIs/key docs), D (shell/lock) | WF-003, 010 | QuickBooks (proposed KPI), SharePoint restricted library (Graph, page-specific CONFIRMED), Power BI (unreconciled) | D-004 (blocking), D-008 (KPI conflict w/ P-08) |
| P-16 Under Development | KEEP | `underDevelopment.ts` | STRONG (confirmed permanent static) | **C** | READY (already correct — confirmed end state, not a gap) | none | No | A | — | none needed | none |
| P-17 Vision & Values | KEEP (shared `ContentPage`) | `visionValues.ts` | MISSING (rule only) | **C** | READY (already correct) | none | No | A | — | MISSING | Future content ownership MISSING |
| P-18 Site Owners | KEEP (mock import) | `siteOwners.ts` | MISSING (rule only) | **C** | READY (already correct) | none | No | A | WF-002 | MISSING | Future content ownership MISSING |
| P-19 JEDI CAB | **BLOCKED** | none | STRONG (v0.3 doc, Artifact 5) | A→D by ring (multi-entity governance workflow with real write behavior) | **BLOCKED — D-015** | Topic, Case, Comment, Assignment, Decision, Action, Cohort, MentorPairing, Capstone, CABRequest, CohortApplication, CABMembership | Yes, ring-based | A/C/D mixed by ring | WF-002, 003, 008, 012 | Outlook (Graph, page-specific CONFIRMED — meeting creation), Power Automate, SharePoint (generic) | D-015 (blocking) |
| P-20 Admin · Hub Actions | REFINE (local UI state only) | `adminActions.ts` | MISSING (no dedicated doc) | **A/D** (capability-gated write + auditability, once specified) | **SPEC FIRST** — see Correction below | HubAction (entity name inferred, not formally defined) | Capability-scoped, not personalized | D (capability-gated write), A (published content) | WF-002, 013 | MISSING | No dedicated architecture doc; `HubAction` entity, capability model, and audit-event semantics are all undefined |

*(P-04, P-05, P-06 intentionally excluded — reference patterns, not classified here.)*

### P-20 Admin · Hub Actions — architecture intent vs. readiness

- **Architecture intent:** A/D — a capability-gated publish/schedule/expire lifecycle with future
  auditability (WF-013) plausibly warrants a full service boundary eventually.
- **Implementation readiness: SPEC FIRST**, not "implement now." No dedicated architecture
  document exists for this page; the `HubAction` entity is inferred rather than formally defined;
  capability behavior (`can('admin:publish-action')` or equivalent) is not fully specified; audit-
  event semantics are not formally defined. Building a capability check or local audit modeling
  from `docs/PROJECT-STATUS.md`'s flagged gap alone — without a spec defining what the capability
  actually gates or what an audit event actually records — risks presenting a frontend-only check
  as if it were security enforcement, which CLAUDE.md §6 and §11 both forbid. A frontend capability
  check is UX only until a backend enforces it; nothing here should be built or described as if it
  already does.

### P-08 PMO — sub-section split (no single class)

| Sub-section | Class | Readiness |
|---|---|---|
| Methodology/editorial content | C (static/content) | READY |
| Lessons Learned | **A — dynamic seam candidate** | READY (clear service-seam candidate, smallest scoped seam) |
| Announcements / targeted messaging | LATER | Not part of the immediate lightweight-adapter recommendation — targeted-messaging behavior is not yet specified |
| Review / calendar | LATER / integration | Graph calendar dependency is PROPOSED, page-specific, not built |
| Dashboards | LATER / external integration | Power BI reference is PROPOSED and unreconciled with P-15 (D-008) |

## Service-seam candidates (Class A, ready now)

- **P-03 My Profile** — public/self tiers only; sensitive tiers wait on D-013/D-014.
- **P-01 Home** — composition-only; see domain-service reuse section below. This is explicitly
  **not** a new monolithic `HomeService` — Home's own new data needs are limited to sections with
  no existing domain service to reuse (see below).
- **P-08 PMO — Lessons Learned only.** The one PMO sub-section ready for a real seam today.

## Lightweight-boundary candidates (Class B)

- **P-07 Templates** — a single typed `getTemplates(): TemplateEntry[]` function, synchronous, no
  service interface or adapter swap-point until the real external document system is named.
- **P-10 Tool Guides** — same shape: `getToolGuides(): ToolGuideEntry[]`.
- **P-13 Consultant Directory** — a single typed `getDirectory(): ConsultantProfile[]` function;
  do not upgrade past B until a dedicated P-13 architecture note exists.

**P-02 Start Here's progress/personalization is explicitly excluded from this lightweight-B list.**
Per-user onboarding progress is genuinely persistent state, not read-only reference data — if and
when it is implemented, it should use an appropriately typed service/state boundary (its own
hook + contract, sized to whether it ends up read-only or read/write), not be characterized as a
synchronous content adapter merely because it's small today.

**PMO announcements are explicitly excluded from the immediate lightweight-adapter list** per the
sub-section split above — held at LATER pending targeted-messaging design.

## Static/editorial pages (Class C)

P-09 How We Work, P-11 Accessibility (content portion), P-12 AI for Good, P-14 Environmental
Justice, P-17 Vision & Values, P-18 Site Owners — all MISSING future storage per
`docs/DATA-SOURCE-CATALOG.md` §6; no SharePoint or other system is inferred for any of them.
P-16 Under Development is the one page where "no future source" is itself the confirmed
permanent end state, not an open gap.

## External/document-oriented pages needing a system decision (Class E)

- **P-07 Templates**, **P-10 Tool Guides** — DERIVED existence of an external canonical source
  only; exact system MISSING for both, no library named.
- **P-08 PMO** (methodology/template sections, Power BI dashboard section) — SharePoint named
  generically (no library); Power BI reference unreconciled with P-15 (D-008).
- **P-01 Home** (JJR Material/Knowledge/Spotlight, Client Hub, Past Deliverables) — SharePoint
  named generically only, no library.
- **P-03 My Profile** (HR & compliance docs) — SharePoint/Compliance Hub named generically, tied
  to D-003.

## Blocked pages

- **P-15 Exec & Strategy — BLOCKED (D-004)**, secondary D-008 (KPI conflict with PMO). Class C/D
  delivery requirements from `docs/DELIVERY-CLASSES.md` preserved unchanged.
- **P-19 JEDI CAB — BLOCKED (D-015)**.
- Sub-section-only blocks (do not block the whole page): P-02 Start Here's compliance gate
  (D-013, D-003); P-03 My Profile's Past Deliverables cross-reference (D-014) and sensitive-field
  squad scope (D-013).

## Pages requiring a spec before implementation

- **P-20 Admin · Hub Actions** — no dedicated architecture doc; `HubAction` entity, capability
  model, and audit semantics all undefined. See detail above.
- **P-13 Consultant Directory** — no dedicated architecture doc; everything is DERIVED from Home's
  directory-tile description, not a standalone page spec.
- **P-07 Templates**, **P-10 Tool Guides** — need the exact external system named before any E
  integration is designed (the B-class browse/filter adapter does not require this and is ready
  now).

## Domain-service reuse opportunities

- **Home's Projects (slider) section** should call the existing `activeProjectsService` rather
  than duplicating project-summary/scoping logic inside a new "HomeService." Note: this is
  precisely where the documented, unresolved conflict between Home's doc (Planner-derived
  progress) and Active Projects' spec (milestone-derived progress, spec decision AP2) will
  surface — wiring this section requires flagging that conflict, not resolving it.
- **Home's Communities (summary) section** should call `communitiesService.getDirectory()`
  (already implemented) rather than re-deriving community-summary logic.
- **Home's Client Hub / Milestones context-bar data** overlaps the same `Project`/`Milestone`
  entities Active Projects already owns — Home should consume the same entities via the same
  service contracts, not introduce a parallel read path.
- Home sections that do **not** have an existing service to reuse (need their own future source):
  "My Stuff" (QuickBooks/Planner/Outlook deep-links), "Resources — Client Hub/Past
  Deliverables/JJR Material" (SharePoint-backed), nav/context-bar identity (Entra/OIDC).

## Recommended implementation order

1. **P-01 Home** — composition-only architecture, reusing `activeProjectsService` and
   `communitiesService` for the sections that mirror those domains; no new monolithic
   `HomeService`. Not blocked. The Planner-vs-milestone progress conflict must be flagged when
   the Projects section is wired, not resolved by this work.
2. **P-03 My Profile** — full typed service seam for the public/self tiers; sensitive sections
   (Past Deliverables, HR/compliance fields) excluded pending D-013/D-014.
3. **P-02 Start Here** — static content first; user progress/personalization designed separately
   as its own dynamic state boundary once prioritized; compliance/Advanced-Access gate excluded
   pending D-003/D-013.

**P-20 Admin · Hub Actions moves to "document/spec first"** — not in the next-three
implementation order. A dedicated architecture note (entity definition, capability model, audit
semantics) is a prerequisite, not an alternative path to skip.

## Documentation gaps discovered

- **P-13 Consultant Directory** has no dedicated architecture document — everything is DERIVED
  from Home's directory-tile description, not a standalone page spec.
- **P-20 Admin · Hub Actions** has no dedicated architecture document, and its core entity
  (`HubAction`) is inferred only, not named by any source. `docs/DATA-AND-BEHAVIOR-MAP.md` and
  `docs/DATA-SOURCE-CATALOG.md` both already flag this; restated here as a standing gap that
  blocks P-20's readiness, not a newly discovered one.
- **P-07 Templates / P-10 Tool Guides** — exact external system undocumented anywhere;
  `docs/DATA-SOURCE-CATALOG.md` §3 already confirms no library/system name exists for either.
- No dedicated architecture doc exists for P-09, P-11, P-12, P-14, P-16, P-17, P-18 — all rely
  solely on `docs/PAGE-INVENTORY.md`'s one-line "Key rule" column. Already known; restated to
  confirm the Class C classification above is grounded, not assumed.

## Unresolved decisions affecting sections/pages (referenced only, not resolved here)

| Decision | Affects |
|---|---|
| D-003 (compliance/training source) | P-02 Start Here's compliance-status sub-section |
| D-004 (exact Leadership membership rule) | P-15 Exec & Strategy — blocks the whole page |
| D-006 (project status ownership) | Progress-source conflict relevant to Home's Projects section |
| D-008 (Strategy KPI source) | P-15 Exec & Strategy and P-08 PMO's dashboard sub-section (unreconciled between them) |
| D-013 (manager/team scope) | P-02 Start Here's gate sub-section; P-03 My Profile's sensitive-field squad scope |
| D-014 (Past Deliverables visibility) | P-01 Home and P-03 My Profile |
| D-015 (JEDI-CAB ring-3/cohort behavior) | P-19 JEDI CAB — blocks the whole page |

None of these decisions are resolved, narrowed, or guessed at by this document.
