# JJR Hub — Data & Behavior Map

Derived coordination document. Not primary authority — see `docs/SOURCE-AUTHORITY.md`.
If anything here conflicts with an architecture document, a confirmed decision, or
`docs/ACCESS-MODEL.md` / `docs/DELIVERY-CLASSES.md`, the higher-authority source wins and
this file must be corrected.

## 1. Purpose & tag legend

This file indexes, per page, what data each section shows, who owns it, and what remains
undecided — so implementation work can be checked against one place instead of re-deriving it
from eight architecture documents, one spec, and PAGE-INVENTORY every time.

Tags used throughout:

- **CONFIRMED** — an architecture document, spec, or `docs/decisions/OPEN-DECISIONS.md` marks
  this row `Confirmed`, or `docs/ACCESS-MODEL.md` / `docs/DELIVERY-CLASSES.md` states it directly.
- **PROPOSED** — a source document recommends this but marks it `Proposed`/`In review`; treat as
  likely but not settled.
- **DERIVED** — no document addresses this page/claim directly; it is inferred from a related
  page's documented behavior (e.g., Community Detail from the Communities doc) or from a
  cross-cutting rule (e.g., PAGE-INVENTORY's "don't duplicate canonical resources" note).
  DERIVED is not CONFIRMED — do not implement it as if a decision-maker approved it for this
  specific page.
- **OPEN** — a named open decision (`docs/decisions/OPEN-DECISIONS.md`, D-xxx) blocks this
  claim.
- **MISSING** — no source document, spec, or decision addresses this at all.

**Rule: MISSING must never be silently replaced with a guess.** Where this file says MISSING,
implementation must model that gap explicitly (e.g., an explicit "not yet defined" state) rather
than inventing a plausible-sounding system (a SharePoint list, a Graph call, a role name) that no
source actually names.

## 2. Global entities register

One row per entity referenced by two or more pages, or introduced by a page and likely reused.
"System of record" uses "Application Data Store" (backend-agnostic; per D-001, OPEN, the actual
backend technology is not selected) rather than naming a database product, and "SharePoint" /
"Microsoft Graph" / a named external system only where a source document actually says so.

| Entity | System of record | First introduced | Also used by | Confidence |
|---|---|---|---|---|
| Project | Application Data Store | P-04 Active Projects (spec) | P-01 Home (doc), P-08 PMO (lessons-learned links) | CONFIRMED (P-04), DERIVED (Home reuse) |
| Milestone | Application Data Store | P-04 Active Projects (spec) — "first-class entity... context bar, notifications, and projects" | P-01 Home context bar, notifications | CONFIRMED |
| ProjectMembership / AccessGrant | Application Data Store | P-01 Home doc / P-04 spec | P-04, P-15 (leadership grants), P-19 (CAB request→grant pattern) | CONFIRMED |
| AccessRequest | Application Data Store | P-01 Home doc ("request-access prompt") | P-04, P-15, P-19, P-05 (new-community request reuses the same loop per Communities doc) | CONFIRMED |
| Client / Practice | Application Data Store | P-04 Active Projects spec | P-01 Home (Client Hub tile) | CONFIRMED |
| Community | Application Data Store | P-05 Communities doc | P-06 Community Detail (derived), P-01 Home (summary surface) | CONFIRMED |
| CommunityMembership | Application Data Store | P-05 Communities doc | P-06 Community Detail (derived) | CONFIRMED |
| Post / Discussion (DiscussionSource) | Application Data Store | P-05 Communities doc | P-06 Community Detail (derived), P-19 JEDI CAB (Comment/Post, same pattern name) | CONFIRMED (P-05, P-19), DERIVED (P-06) |
| LessonLearned | Application Data Store | P-08 PMO doc | P-04 (closeout link) | CONFIRMED |
| CABMembership | Application Data Store | P-19 JEDI CAB (v0.3 doc, Artifact 5) | — | CONFIRMED |
| ConsultantProfile | Entra + Application Data Store + Teams (presence) | P-03 My Profile doc | P-01 Home (Consultant Directory tile), P-13 Consultant Directory (derived) | CONFIRMED (P-03), DERIVED (P-13) |
| HubAction | Application Data Store (implied by P-20's publish flow) | P-20 Admin · Hub Actions | P-01 Home (per PAGE-INVENTORY, WF-013 "Used by" includes Home) | MISSING — no dedicated architecture doc for P-20 names this entity explicitly; inferred only from `docs/PROJECT-STATUS.md`'s note that the page has no `can('admin:publish-action')` stub or audit-trail modeling yet |
| ProjectLink | Application Data Store | P-04 spec ("NEW" entity, §11) | — | CONFIRMED |
| CommunityRequest | Application Data Store | P-05 Communities doc | — | PROPOSED |
| StrategicIdea | Application Data Store | P-15 Exec & Strategy doc | — | PROPOSED |
| BuddyAssignment | Application Data Store | P-02 Start Here doc | — | PROPOSED |
| OnboardingProgress | Application Data Store | P-02 Start Here doc | — | PROPOSED |
| Topic / Case / Comment / Assignment / Decision / Action / Cohort / MentorPairing / Capstone / CABRequest / CohortApplication | Application Data Store | P-19 JEDI CAB (v0.3 doc, Artifact 5) | — | CONFIRMED, but D-015 (OPEN) blocks Ring-3/cohort implementation |

## 3. Per-page dimension sections

Each page lists: UI section/capability · entity/data · source system · storage/data owner ·
SharePoint object (MISSING unless named) · Graph dependency (page-specific only) · external
dependency · CRUD/approval behavior · access requirement · delivery class (per
`docs/DELIVERY-CLASSES.md`) · workflow ID(s) (per `docs/WORKFLOW-CATALOG.md`) · service seam ·
current frontend source · intended future source · unresolved decisions · confidence.

---

### P-01 Home

Source: `docs/architecture/JJR-Hub-Phase1-Architecture-v0_3.docx` (current authority — see
`docs/architecture/README.md`); superseded companion:
`JJR-Hub-Phase1-Architecture-Home-Page.docx` (v0.1, historical).

| Section | Entity | Source system | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Nav / context bar | Identity, Milestone | App + Entra | App DB | MISSING | Page-specific: none named for nav itself | Entra/OIDC | R | All employees | A | WF-001 | NOT PRESENT — page routes to `UnderDevelopmentPage` stub (`src/App.tsx`); no real Home component exists | `src/mocks/underDevelopment.ts` (stub only) | MISSING | D-001 (backend), D-002 (auth) | CONFIRMED (doc), MISSING (implementation) |
| My Stuff (Log Hours / Tasks / Reporting / Calendar) | — | External | QuickBooks / Planner / Outlook | MISSING | Deep-link only, no Graph query documented for these tiles | QuickBooks, Planner, Outlook | R (deep-link) | Per role, see doc | E | WF-004 (partially) | NOT PRESENT | none | MISSING | D-008 (KPI/reporting source, indirectly) | CONFIRMED |
| Resources — Client Hub | Client, Project | App DB + SharePoint | App DB (record), SharePoint (docs) | Named generically as "client documents in SharePoint"; no library named | Not documented for this tile specifically | — | R | Scoped: consultant=own engagements, practice lead=practice, PMO/Leadership=all | B | WF-002 | NOT PRESENT | none | MISSING | none named beyond scope rule | CONFIRMED scope, MISSING implementation |
| Resources — Past Deliverables | — | SharePoint + App DB index | SharePoint | Named generically, no library | Not documented | — | R | "Leads-and-up... consultant self-scoped (proposed)" | B/C boundary — "Partly open" per doc | WF-002 | NOT PRESENT | none | MISSING | D-014 (consultant visibility, OPEN) | PROPOSED / OPEN |
| Projects (slider) | Project, ProjectMembership | App DB | App DB | pointer to P-04's SharePoint folder | none page-specific | Planner (progress, per v0.1) | R | Scoped via membership+grants | B | WF-004 | Reuses P-04's seam conceptually, but Home itself has none | none | MISSING | Planner-vs-milestone progress conflict — see §4 | CONFIRMED (doc), MISSING (impl) |
| Communities (summary) | Community | App DB | App DB | attachments only | none | — | R | Own scope | B | WF-006 | NOT PRESENT | none | MISSING | D-007 | CONFIRMED |
| JJR Material / Knowledge / Spotlight | — | SharePoint | SharePoint | "Entirely SharePoint" per doc, no library named | none | — | R | All | A | — | NOT PRESENT | none | MISSING | none | CONFIRMED |

**Overall:** P-01 has no real React implementation; `src/App.tsx` routes `/` to
`UnderDevelopmentPage`. `docs/PROJECT-STATUS.md` correctly lists it NOT STARTED. Service seam:
N/A — nothing to seam yet.

---

### P-02 Start Here

Source: `docs/architecture/JJR-Hub-Start-Here-Architecture.docx` (single version, no conflict).

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Scenario selector | — (UI preference) | App DB or client | App DB/client | MISSING | none | — | R/U | All; cosmetic, grants nothing | A | WF-001, WF-005 | NOT PRESENT — routes to stub | none | MISSING | none | CONFIRMED |
| Checklist content | — | App DB (content) | App DB | MISSING | none | — | R | All | A | WF-005 | NOT PRESENT | none | MISSING | none | CONFIRMED |
| Checklist progress (ticking) | OnboardingProgress | App DB | App DB | MISSING | none | — | C/U | Self; Admin/HR view | A/B | WF-005 | NOT PRESENT | none | MISSING | none | PROPOSED |
| Compliance/mandatory-training items | — | Compliance Hub / LMS or App DB | External/App DB (undecided) | MISSING | none | LMS (undecided) | R | Self; manager (team); Admin/HR | B/C | WF-005 | NOT PRESENT | none | MISSING | D-003 (training source, OPEN), D-013 (manager/team scope, OPEN) | OPEN |
| Locked "Advanced Access" gate | — | status flag | App DB | MISSING | none | — | R | New hire locked until onboarding+compliance clear | D | WF-005 | NOT PRESENT | none | MISSING | D-013 | PROPOSED |
| Onboarding buddy link | BuddyAssignment | App DB | App DB | MISSING | none | — | R | Self + buddy; Admin/HR assigns | B | — | NOT PRESENT | none | MISSING | none | PROPOSED |

**Overall:** NOT STARTED per `docs/PROJECT-STATUS.md` (routes to `UnderDevelopmentPage` stub in
`src/App.tsx`). Non-gating sub-sections (scenario selection) are buildable now per
PROJECT-STATUS; the verified-status/advanced-access sub-section depends on D-013 (OPEN).

---

### P-03 My Profile

Source: `docs/architecture/JJR-Hub-My-Profile-Architecture.docx` (single version).

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Identity (name, title, photo) | ConsultantProfile | Entra/M365 | Entra (read-only mirror) | MISSING | Page-specific Graph read for identity mirror named in doc | — | R | All viewers | A/B | WF-009 | NOT PRESENT — stub | none | MISSING | none | CONFIRMED |
| Bio, pronouns, expertise | ConsultantProfile | App DB | App DB | MISSING | none | — | R/U | Self-edit; all view | A | WF-009 | NOT PRESENT | none | MISSING | none | CONFIRMED |
| Contact & emergency contact | ConsultantProfile | Entra + App DB | Entra+App DB | MISSING | none documented | — | R/U | Owner + privileged; "not sent" to colleague | C | WF-009 | NOT PRESENT | none | MISSING | D-013 ("squad" definition, OPEN) | CONFIRMED |
| HR & compliance docs | — | Compliance Hub/SharePoint | SharePoint | Named generically ("Compliance Hub / SharePoint"), no library | Not documented | — | R | Squad-only (owner+privileged) | C | WF-009 | NOT PRESENT | none | MISSING | D-003 | CONFIRMED |
| Projects tab (allocation/time/stats) | — (derived) | App DB (derived) + QuickBooks/Planner | App DB | MISSING | none | QuickBooks, Planner | R | Squad-only | C | WF-009 | NOT PRESENT | none | MISSING | none | PROPOSED |
| Settings — notifications/privacy | — | App DB | App DB | MISSING | none | — | R/U | Owner only | A | — | NOT PRESENT | none | MISSING | none | CONFIRMED |
| Manage/delete profile | ConsultantProfile | Entra + App DB | Entra+App DB | MISSING | none | — | D | Privileged only | C | WF-009 | NOT PRESENT | none | MISSING | none | PROPOSED |

**Overall:** NOT STARTED per `docs/PROJECT-STATUS.md`; routes to `UnderDevelopmentPage` stub.
Public/self/relationship-scoped tiers "buildable now"; Past Deliverables cross-reference depends
on D-014 (OPEN).

---

### P-04 Active Projects

Source: `docs/specs/active-projects.md` — supersedes
`docs/architecture/JJR-Hub-Active-Projects-Architecture.docx` per that spec's own statement and
`docs/architecture/README.md`.

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Portfolio list (cards) | Project, ProjectMembership | App DB | App DB | pointer only | none | — | R | Scoped by membership+grant | B | WF-002, WF-004 | YES | `src/mocks/activeProjects.ts` (verified present) | Application Data Store (backend TBD, D-001) | none within page | CONFIRMED |
| Filters — My/All | — | client-side | client | — | — | — | R | All (client-side over scoped set) | A | WF-004 | YES | same | same | none | CONFIRMED |
| Hero & context counts | Project (aggregate) | App DB (computed) | App DB | — | — | — | R | Scoped aggregate | B | WF-004 | YES | same | same | none | CONFIRMED |
| Quick links — Files | Project documents | SharePoint | SharePoint | Named generically: "project's SharePoint document folder"; no specific library/site named | **CONFIRMED, page-specific**: Graph called under the user's own delegated permission, security-trimmed (spec §5, "Never call Graph with an application-level identity") | — | R | With project access | B | WF-004 | YES | same | same | none | CONFIRMED |
| Quick links — Planner/Dashboard | — | Planner | Planner | — | — | Planner | R (deep-link) | With project access | E | WF-004 | YES | same | same | none | CONFIRMED |
| Quick links — SOW | Project document | SharePoint | SharePoint | Named generically | page-specific, delegated | — | R | With project access | B | WF-004 | YES | same | same | none | CONFIRMED |
| Upcoming milestones (30d) | Milestone | App DB | App DB | — | — | — | R | Scoped to user's projects | B | WF-004 | YES | same | same | none | CONFIRMED |
| Portfolio health | Project (computed) | App DB (computed) | App DB | — | — | — | R | Scoped roll-up | B | WF-004 | YES | same | same | none | CONFIRMED |
| Request project access | AccessRequest | App DB | App DB | — | — | — | C | All may request | A | WF-003 | YES | same | same | none | CONFIRMED |
| Create project | Project | App DB | App DB | — | — | — | C | PMO/Leadership/Admin (AP9 ruling: not practice leads) | — | WF-002 | YES (service contract has the shape; UI not necessarily built) | same | same | D-005 (who may create, OPEN at hub level; page-level AP9 ruling stands) | CONFIRMED (page-level) |
| Edit project | Project | App DB | App DB | — | — | — | U | Lead(own)/practice lead(practice)/PMO/Leadership | — | WF-002 | YES | same | same | none | CONFIRMED |

**Service seam — CONFIRMED, fully implemented (reference pattern):**
`src/features/active-projects/ActiveProjectsPage.tsx` → `useActiveProjects.ts` (feature hook) →
`activeProjectsService.ts` (typed service contract) → `activeProjectsMockAdapter.ts` (mock
adapter) → `src/mocks/activeProjects.ts` (mock data). Tested by
`src/features/active-projects/activeProjectsMockAdapter.test.ts` and
`src/features/active-projects/useActiveProjects.test.ts` (3 cases total, including a
scoping-isolation test). This is the only page in the hub with this seam built end-to-end; see
`docs/PROJECT-STATUS.md` for the corrected cross-cutting note (the seam exists, it is just not
yet replicated to other pages).

**Graph dependency is page-specific.** The spec's delegated/user-context Graph rule
("Graph is called as the user, not as the application") is CONFIRMED for this page only. No
hub-wide Microsoft Graph authorization model exists — see §5 below and
`docs/DATA-SOURCE-CATALOG.md` §4.

---

### P-05 Communities

Source: `docs/architecture/JJR-Hub-Communities-Architecture.docx` (single version).

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Community directory (cards) | Community | App DB | App DB | — | — | — | R | All employees | A | WF-006 | NOT PRESENT — direct mock import (per PROJECT-STATUS) | `src/mocks/communities.ts` | Application Data Store | none | CONFIRMED |
| Discussion previews | Community, Post | App DB | App DB | — | — | — | R | All (titles only) | A | WF-006 | NOT PRESENT | same | same | none | PROPOSED |
| Full discussions + replies | Post/Discussion | App DB (DiscussionSource) | App DB | — | — | — | R/C | Members only; steward moderates | C (members-only) | WF-006 | NOT PRESENT | same | same | none | CONFIRMED |
| Top Resources / knowledge | Resource | SharePoint + App DB | SharePoint (docs) + App DB (index) | Named generically as "documents"; no library named | not documented | — | R | All view; steward curates | B | WF-007 | NOT PRESENT | same | same | none | PROPOSED |
| Join a community | CommunityMembership | App DB | App DB | — | — | — | C | Open self-join (proposed) | A | WF-006 | NOT PRESENT | same | same | D-007 (join policy, OPEN) | PROPOSED |
| Upcoming Events | — | App DB + Outlook | App DB + Outlook (Graph) | — | Proposed, page-specific: "Graph calendar + add-to-calendar" | Outlook/Teams | C/R | All see; steward creates | B/E | WF-008 | NOT PRESENT | same | same | none | PROPOSED |
| Request a new community | CommunityRequest | App DB | App DB | — | — | — | C | Anyone requests; Leadership/Admin approve | A→B | WF-003 | NOT PRESENT | same | same | none | PROPOSED |

**Overall:** `docs/PROJECT-STATUS.md` marks this KEEP with the D-014-relevant note that
`CommunityCard` already models the class-C-shaped omission of `recentDiscussions` at the data
level for non-members. Service seam: not present — imports `src/mocks/communities.ts` directly
into the page component (cross-cutting gap, same as all pages except P-04).

---

### P-06 Community Detail

No dedicated architecture doc. DERIVED from P-05 Communities doc (PAGE-INVENTORY calls this a
"route-driven reusable community page" that reuses P-05's model — Key rule: "keep external files
canonical").

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Community header/stats | Community | App DB (derived from P-05) | App DB | — | — | — | R | All | A | WF-006 | NOT PRESENT | `src/mocks/communityDetail.ts` | Application Data Store | none | DERIVED |
| Discussion thread | Post/Discussion | App DB (DiscussionSource, derived from P-05) | App DB | — | — | — | R/C | Members-only per P-05 | C | WF-006, WF-007 | NOT PRESENT | same | same | none | DERIVED |
| Resources | Resource | SharePoint + App DB (derived) | SharePoint+App DB | MISSING (no library named for this page specifically) | not documented | — | R | Members/all per P-05 | B | WF-007 | NOT PRESENT | same | same | none | DERIVED |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` — slug-keyed lookup
(`COMMUNITY_DETAILS[slug]`) with explicit not-found state; shares `AvatarChip`/`ResourceLink`/
`DiscussionThread` with P-05.

---

### P-07 Templates

PAGE-INVENTORY Key rule (quoted verbatim): *"Hub discovers/surfaces canonical documents; do not
duplicate them."* This rule is CONFIRMED (it is the page's documented governing rule in
PAGE-INVENTORY). What follows from it is DERIVED, not confirmed for this page specifically: an
external/document source of some kind almost certainly exists, but the **exact system is
MISSING** and the **SharePoint object/library is MISSING** — no architecture doc names one. Do
not infer that a SharePoint library already exists for Templates.

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Template library (browse/filter) | — | MISSING (external, derived only from the canonical-document rule) | MISSING | MISSING — DERIVED existence, no library named | MISSING | MISSING | R | Employees | A | WF-002 | NOT PRESENT | `src/mocks/templates.ts` | MISSING | none | DERIVED (existence), MISSING (system) |
| Editor management | — | MISSING | MISSING | MISSING | MISSING | MISSING | C/U | Editor | A/D | WF-002 | NOT PRESENT | same | MISSING | none | MISSING |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` (`FilterBar`, `Modal` for doc preview,
`ListPanel` reuse) — a working frontend shape exists over mock data; its intended real backing
system is undocumented.

---

### P-08 PMO

Source: `docs/architecture/JJR-Hub-PMO-Hub-Architecture.docx` (single version).

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Hero + ops stats | — (computed) | App DB (computed) | App DB | — | — | — | R | All | A | — | NOT PRESENT | `src/mocks/pmo.ts` | Application Data Store | none | PROPOSED |
| PMO announcements | — (targeted message) | App DB | App DB | — | — | — | R/C | All read; PMO authors | A/B | — | NOT PRESENT | same | same | none | PROPOSED |
| Project lifecycle / templates | — | SharePoint | SharePoint | Named generically ("templates in SharePoint"), no library | not documented | — | R/U | All read; PMO maintains | A | — | NOT PRESENT | same | same | D-006 (indirectly, project status ownership) | CONFIRMED |
| Governance & best practices | — | SharePoint | SharePoint | Named generically, no library | not documented | — | R/U | All read; PMO maintains | A | — | NOT PRESENT | same | same | none | CONFIRMED |
| Lessons learned — browse | LessonLearned | App DB | App DB | — | — | — | R | All | A | WF-011 | NOT PRESENT | same | same | none | CONFIRMED |
| Lessons learned — submit | LessonLearned | App DB | App DB | — | — | — | C | Anyone at closeout; PMO curates | A→B | WF-011 | NOT PRESENT | same | same | none | PROPOSED |
| Review calendar | — | App DB + Outlook | App DB+Outlook (Graph) | — | Proposed, page-specific ("Graph calendar") | Outlook | R/C | All see; PMO schedules; financial gates PMO+Leadership | A/B | WF-008 | NOT PRESENT | same | same | none | PROPOSED |
| PM templates (quick access) | — | SharePoint | SharePoint | Named generically | not documented | — | R | All | A | — | NOT PRESENT | same | same | none | CONFIRMED |
| Financial dashboards (governance ref.) | — | External — Power BI | Power BI | — | — | Power BI | R | Reference only | E | — | NOT PRESENT | same | same | D-008 (KPI source, OPEN — ties to Exec/PMO conflict, §4) | PROPOSED |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` (`StatBlock`, `DateTile`, `ListPanel`,
collapsible review-calendar panel; Lessons Learned gives WF-011 a concrete home).

---

### P-09 How We Work

No dedicated architecture doc. PAGE-INVENTORY Key rule (quoted verbatim): *"Use governed
editorial components."*

Current frontend source: `src/mocks/howWeWork.ts` (verified present). Intended future source:
**MISSING** — no doc names SharePoint or any other storage system. Do not infer one; editorial
content ownership is undocumented beyond "governed."

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Editorial content (timeline, FAQ, accordion) | — | MISSING | MISSING | MISSING | MISSING | MISSING | R | All employees | A | — | NOT PRESENT | `src/mocks/howWeWork.ts` | MISSING | none | MISSING |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` (`Timeline`, `Accordion`, `ListPanel` reuse; FAQ
accordion uses real component state, not innerHTML toggling).

---

### P-10 Tool Guides

No dedicated architecture doc. PAGE-INVENTORY Key rule (quoted verbatim): *"Surface canonical
guide/video sources."* Same treatment as P-07: this confirms an external canonical source is
intended in principle, but the exact system and any SharePoint object/library are **MISSING**.

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Guide/video library (search/filter) | — | MISSING (derived existence only) | MISSING | MISSING | MISSING | MISSING | R | All employees | A | WF-002 | NOT PRESENT | `src/mocks/toolGuides.ts` | MISSING | none | DERIVED (existence), MISSING (system) |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` (search/filter over mock guide list, `ListPanel`,
shared icon set).

---

### P-11 Accessibility

No dedicated architecture doc. PAGE-INVENTORY Key rule (quoted verbatim): *"Accessible
issue/accommodation/access paths."*

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Accessibility content / accommodation request path | — | MISSING | MISSING | MISSING | MISSING | MISSING | R/C | All employees | A | WF-003 | NOT PRESENT | `src/mocks/accessibility.ts` | MISSING | none | MISSING |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` (no notes beyond KEEP).

---

### P-12 AI for Good

No dedicated architecture doc. PAGE-INVENTORY Key rule (quoted verbatim): *"Reuse
ContentPage-style sections if meaning remains shared."*

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Editorial/capability content | — | MISSING | MISSING | MISSING | MISSING | MISSING | R | All employees | A | — | NOT PRESENT | `src/mocks/aiForGood.ts` | MISSING | none | MISSING |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` — built on shared `ContentPage` template (with
Environmental Justice, Vision & Values) per PAGE-INVENTORY's reuse note, not rebuilt three times.
Note: the v0.3 Home doc's "Topics" section (Artifact 1, "reading the placement") describes AI for
Good as reachable via a SharePoint practice page from Home's Topics signpost — that is a
statement about Home's Topics tile pointing outward, not a confirmed architecture for this page
itself; treat as DERIVED context only, not a confirmed source for P-12's own content.

---

### P-13 Consultant Directory

No dedicated architecture doc. DERIVED from P-01 Home's doc, which describes a "Consultant
Directory" resources tile: "Everyone views. Identity (Entra) + role/tags (DB) + availability
(Teams presence)." This is Home's documented model for its directory *tile*, not a confirmed
architecture for the standalone P-13 page.

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Directory listing / filter | ConsultantProfile | Entra + App DB (derived from Home doc) | Entra (identity) + App DB (role/tags) | — | Page-specific to Home's tile, not confirmed for P-13: availability via Teams presence | Teams (presence, derived) | R | All employees | A/B (identity vs. tags split per Home doc pattern) | WF-002, WF-009 | NOT PRESENT | `src/mocks/consultantDirectory.ts` (verified present) | Entra + Application Data Store | none named for P-13 specifically | DERIVED |

**Overall:** Implemented and routed (`ConsultantDirectoryPage`, `/consultant-directory` in
`src/App.tsx`) but was missing from `docs/PROJECT-STATUS.md`'s page tracker table — corrected as
part of this task (see item 5 in the task list / `docs/PROJECT-STATUS.md` diff).

---

### P-14 Environmental Justice

No dedicated architecture doc. PAGE-INVENTORY Key rule (quoted verbatim): *"Governed content;
reuse editorial structure."*

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Editorial/capability content | — | MISSING | MISSING | MISSING | MISSING | MISSING | R | All employees | A | — | NOT PRESENT | `src/mocks/environmentalJustice.ts` | MISSING | none | MISSING |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` — shares `ContentPage` with P-12/P-17.

---

### P-15 Exec & Strategy

Source: `docs/architecture/JJR-Hub-Exec-Strategy-Architecture.docx` (single version).

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Page shell / restricted badge / Request Access | AccessRequest | App DB | App DB | — | — | — | R/C | All see shell; anyone requests | D | WF-003, WF-010 | NOT PRESENT — routes to `UnderDevelopmentPage` stub | none | MISSING | D-004 (leadership membership rule, OPEN — blocks this page's primary path per PROJECT-STATUS) | CONFIRMED |
| Hero financial stats | — | Finance/ops (QuickBooks + project data) or reporting tool | External | — | — | QuickBooks (per doc) | R | Leadership+granted only; not sent to others | C | WF-010 | NOT PRESENT | none | MISSING | D-004, D-008 (KPI source conflict, §4) | PROPOSED |
| Strategic Pillars / Firm Roadmap | — | App DB or SharePoint | App DB (leadership-maintained) | Linked docs, no library named | not documented | — | R/U | Leadership+granted | C/D | WF-010 | NOT PRESENT | none | MISSING | D-004; pillars/roadmap placement itself OPEN per doc | CONFIRMED existence, OPEN placement |
| Performance dashboard / KPIs | — | Finance/ops systems | External | — | — | Finance/ops (unnamed tool, "or a reporting tool") | R | Leadership+granted | C | WF-010 | NOT PRESENT | none | MISSING | D-004, D-008 | CONFIRMED existence, PROPOSED source |
| Key Documents (board deck, financial model, risk register, hiring plan, equity audit) | — | SharePoint (restricted library) | SharePoint | Named generically as "restricted SharePoint library"; specific library name MISSING | **CONFIRMED for this page**: security-trimmed via Graph | — | R | Leadership+granted | C | WF-010 | NOT PRESENT | none | MISSING | D-004 | CONFIRMED |
| Strategic-idea feedback | StrategicIdea | App DB | App DB | — | — | — | C | Submit (leadership-scoped per doc); monthly review | C | — | NOT PRESENT | none | MISSING | D-004 | PROPOSED |

**Overall:** BLOCKED per `docs/PROJECT-STATUS.md` — D-004 (OPEN) blocks modeling the primary
access boundary; building the shell without it risks presenting mock protection as real
(CLAUDE.md §6). Route in `src/App.tsx` renders `UnderDevelopmentPage` with an explicit
Class-C/D-aware comment, not a gated real page.

---

### P-16 Under Development

PAGE-INVENTORY Key rule (quoted verbatim): *"Temporary destination only."*

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Placeholder message | — | Static | Static/client | MISSING | MISSING | MISSING | R | All employees | A | — | NOT PRESENT (does not need one — purely static) | `src/mocks/underDevelopment.ts` | Purely static frontend content — no future source needed | none | CONFIRMED |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` — "Utility stub, correctly minimal." This is the
one page in the hub-wide static-content bucket that is intentionally permanent-static, not a gap.

---

### P-17 Vision & Values

No dedicated architecture doc. PAGE-INVENTORY Key rule (quoted verbatim): *"Governed firm
content."*

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Editorial content | — | MISSING | MISSING | MISSING | MISSING | MISSING | R | All employees | A | — | NOT PRESENT | `src/mocks/visionValues.ts` | MISSING | none | MISSING |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` — shares `ContentPage`.

---

### P-18 Site Owners

No dedicated architecture doc. PAGE-INVENTORY Key rule (quoted verbatim): *"Clear
ownership/escalation."*

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Owner/escalation directory | — | MISSING | MISSING | MISSING | MISSING | MISSING | R | All employees | A | WF-002 | NOT PRESENT | `src/mocks/siteOwners.ts` | MISSING | none | MISSING |

**Overall:** KEEP per `docs/PROJECT-STATUS.md` (no notes beyond KEEP).

---

### P-19 JEDI CAB

Source: `docs/architecture/JJR-Hub-Phase1-Architecture-v0_3.docx`, Artifact 5 ("JEDI-CAB app").
Confirmed: this is part of the v0.3 Home/Phase-1 document, not a standalone architecture file —
see `docs/architecture/README.md`.

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Enter workspace (Ring 1/2/3) | CABMembership | App DB | App DB | — | — | — | R | Ring-based: all/members/cohort | A→D per ring | WF-002, WF-012 | NOT PRESENT — routes to `UnderDevelopmentPage` stub | none | MISSING | D-015 (Ring-3/cohort behavior, OPEN — blocks primary path) | CONFIRMED |
| Topics & cases | Topic/Case | App DB | App DB | working docs → SharePoint, no library named | not documented | — | R | Summaries Ring 1; full case Ring 2 | A/C | WF-012 | NOT PRESENT | none | MISSING | D-015 | PROPOSED |
| Discussion/comments | Comment/Post | App DB (DiscussionSource) | App DB | attachments → SharePoint, no library named | not documented | — | R/C | Ring 2 only; chair/leadership/admin moderate | C | WF-012 | NOT PRESENT | none | MISSING | D-015 | CONFIRMED |
| Assignments / Decisions / Actions | Assignment/Decision/Action | App DB | App DB | — | — | — | R/C/U | Ring-based per role grid | B/C | WF-012 | NOT PRESENT | none | MISSING | D-015 | CONFIRMED |
| Meeting Hub | Meeting/Event | App DB + Outlook | App DB (calendarEventId) + Outlook | agenda/notes → SharePoint, no library named | **CONFIRMED, page-specific**: Graph creates the Outlook event | Outlook, Power Automate (post-event notes email) | C/R | Ring-based | B/E | WF-008, WF-012 | NOT PRESENT | none | MISSING | D-015 | CONFIRMED |
| Cohort program (mentorship, capstone) | Cohort/MentorPairing/Capstone | App DB | App DB | capstone docs → SharePoint, no library named | not documented | — | R | Ring 3 internals; Ring 1 info only | C/D | — | NOT PRESENT | none | MISSING | D-015 (explicitly, "requires dedicated analysis before implementation") | CONFIRMED existence, OPEN behavior |
| CAB & cohort requests | CABRequest/CohortApplication/AccessRequest | App DB | App DB | — | — | — | C | Anyone submits | A→B | WF-003 | NOT PRESENT | none | MISSING | D-015 | CONFIRMED |

**Overall:** BLOCKED per `docs/PROJECT-STATUS.md` — PAGE-INVENTORY and D-015 both require
dedicated analysis before implementation; do not start from the legacy mockup alone.

---

### P-20 Admin · Hub Actions

No dedicated architecture doc for this page. PAGE-INVENTORY Key rule (quoted verbatim):
*"Publishing is capability-scoped and eventually auditable."*

| Section | Entity | Source | Owner | SharePoint | Graph | External | CRUD | Access | Class | WF | Seam | Frontend src | Future src | Open decisions | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Draft/schedule/publish/expire hub action | HubAction (inferred name only — MISSING documented entity) | MISSING | MISSING | MISSING | MISSING | MISSING | C/R/U/D | Hub Admin / approved editor capability | D (should be; not yet enforced) | WF-013 | NOT PRESENT | `src/mocks/adminActions.ts` | MISSING | none named, but real code gap per PROJECT-STATUS | MISSING |

**Overall:** REFINE per `docs/PROJECT-STATUS.md` — correctly uses `BareLayout` (chrome-less,
per P-20), but the priority/publish flow is local UI state only: no `can('admin:publish-action')`
capability-check stub, no locked state for non-admins, no audit-trail modeling even at the mock
level. WF-013 says "eventually auditable"; nothing exists yet to eventually connect. This is a
known MISSING-architecture case with a real, already-flagged implementation consequence — carried
forward here, not newly discovered.

## 4. Cross-page consistency notes (unresolved conflicts)

These two conflicts are **not resolved by this file**. They are recorded here so implementation
does not silently pick a side.

1. **Home Planner-derived progress vs. Active Projects milestone-derived progress.** The Home
   architecture docs (`JJR-Hub-Phase1-Architecture-Home-Page.docx` v0.1 and
   `JJR-Hub-Phase1-Architecture-v0_3.docx`) both describe project progress as "External —
   Microsoft Planner... Derived from task completion" (Confirmed status in both). The Active
   Projects spec (`docs/specs/active-projects.md`, decision AP2) explicitly overrides this for
   the Active Projects page: *"Progress source: Milestone-based. ⚠ Overrides a Confirmed row
   (Planner-derived)."* The spec itself flags the propagation risk: *"The Home page doc also
   describes Planner-derived progress. Home must use the same source or the two pages will
   disagree about the same project."* Relates to D-006 (Project status ownership, PROPOSED —
   keeps lead-maintained status in app data, but does not itself resolve the progress-percentage
   source question). **Not resolved here** — Home has no implementation yet, so the conflict is
   latent, not yet manifest in running code, but must be settled before Home is built.

2. **Exec & Strategy vs. PMO — KPI/reporting-source disagreement.** The Exec & Strategy doc
   proposes KPI source as "A finance/ops integration (QuickBooks + project data, or a reporting
   tool)" (Proposed, Open decision #4). The PMO doc separately references "Financial dashboards
   (governance)... External — Power BI... referenced for real-time financials" (Proposed). The
   two documents name different/unreconciled reporting mechanisms for what may overlap in
   practice (firm financial/delivery KPIs). Ties to D-008 (Strategy KPI source, OPEN: "Use
   approved reporting/finance source; do not embed production values"). **Not resolved here.**

Both conflicts require a decision (via `docs/decisions/OPEN-DECISIONS.md`) before either page's
data-source implementation should be finalized.

## 5. Five-bucket data summary

1. **Application Data Store (app/database-owned structured data).** Backend-agnostic term used
   throughout this hub's documentation because D-001 (production backend technology) is OPEN.
   Covers: Project, Milestone, ProjectMembership/AccessGrant, AccessRequest, Client/Practice,
   Community, CommunityMembership, Post/Discussion, LessonLearned, CABMembership,
   ConsultantProfile's app-owned fields, HubAction (name inferred only), ProjectLink,
   CommunityRequest, StrategicIdea, BuddyAssignment, OnboardingProgress, and the full JEDI-CAB
   governance/meeting/pipeline/intake entity set (§2).
2. **SharePoint-managed documents.** Confirmed to exist conceptually for: P-04 (project document
   folder, SOW), P-05 (community resources), P-08 (lifecycle/governance/template docs), P-15
   (restricted key-document library), P-19 (agendas/notes/bios/templates/capstone docs), P-03
   (HR & compliance docs, personal documents). **No specific SharePoint library/list/content name
   is documented for any page** — every "SharePoint" cell above says "named generically" or
   "no library named." For P-07 and P-10, even the generic existence is DERIVED rather than
   confirmed (from PAGE-INVENTORY's "don't duplicate canonical resources" rule and "surface
   canonical guide/video sources" rule respectively) — MISSING for the exact system. For P-09,
   P-11, P-12, P-14, P-16, P-17, P-18, no source names SharePoint or any other storage system at
   all — MISSING, do not infer.
3. **Microsoft Graph as integration mechanism.** Confirmed and page-specific only:
   - P-04 Active Projects — delegated/user-context Graph read of project documents (spec §5).
   - P-15 Exec & Strategy — Graph read of the restricted key-document library, security-trimmed
     (doc, Artifact 3).
   - P-19 JEDI CAB — Graph creates Outlook calendar events on meeting creation (doc, Artifact 5).
   - P-03 My Profile — Graph mirrors identity fields from Entra/M365, and reads Teams presence
     for availability (doc, Artifact 3/4).
   - P-05 Communities and P-08 PMO — Proposed (not yet Confirmed) Graph calendar integration for
     events/reviews.
   **No hub-wide Microsoft Graph authorization model exists.** `docs/ACCESS-MODEL.md` never
   mentions Graph. Do not generalize any of the above page-specific rules into a hub-wide rule.
4. **External-system-owned data.** QuickBooks (hours/billing, deep-link only, hub stores
   nothing — P-01, P-03), Microsoft Planner (tasks/dashboard deep-link, and progress-derivation
   per the Home docs — conflicts with P-04's milestone-based override, see §4), Outlook/M365
   (calendar, P-01/P-05/P-08/P-19), Microsoft Teams (presence, P-01/P-03/P-13-derived), Power BI
   (referenced by P-08 for financial dashboards, Proposed), Power Automate (P-19 post-event notes
   email, Confirmed), Compliance Hub/LMS (P-02/P-03, source undecided — D-003 OPEN), Entra
   (identity mirror across P-01/P-03/P-13/P-19).
5. **Purely static frontend content.** P-16 Under Development is the one page whose content is
   intentionally, permanently static (a temporary-destination utility stub — "temporary" refers
   to the *page's role*, not the need for a future data source). The 8 no-architecture-doc pages
   (P-09, P-10, P-11, P-12, P-14, P-16, P-17, P-18) currently render from static mock files with
   no documented future source; P-16 is the only one of these where "no future source" is itself
   the confirmed intended end state rather than a documentation gap.

## 6. Known conflicts register

| # | Conflict | Pages | Cross-reference | Status |
|---|---|---|---|---|
| 1 | Planner-derived vs. milestone-derived project progress | P-01 Home, P-04 Active Projects | D-006 (Project status ownership, PROPOSED); spec `docs/specs/active-projects.md` AP2 | Unresolved — requires a decision before Home is implemented |
| 2 | KPI/reporting-source mismatch | P-08 PMO, P-15 Exec & Strategy | D-008 (Strategy KPI source, OPEN) | Unresolved — requires a decision before either page's KPI/dashboard section is implemented |

Home's v0.1-vs-v0.3 document-version difference is **not** listed here — it is a
superseded-version classification, tracked in `docs/architecture/README.md` instead, per that
file's explicit note.

## 7. Revision log

| Date | Change |
|---|---|
| 2026-08-13 | Initial creation. |
