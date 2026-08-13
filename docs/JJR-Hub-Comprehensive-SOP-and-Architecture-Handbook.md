---
title: "JJR Internal Hub — Comprehensive SOP & Architecture Handbook"
subtitle: "React/Vite Rebuild · Governance · Data Placement · Workflows · Current Implementation Handoff"
author: "JJR Hub Development Team"
date: "13 August 2026"
---

# Document Purpose

This handbook consolidates the final JJR Internal Hub React/Vite rebuild SOP, supporting governance documents, data-placement guidance, workflow catalog, all workflow/governance diagrams, open decisions, Definition of Done, repository-adoption rules, and the approved implementation history through the current Home feature branch.

It is designed so a developer, reviewer, architect, or project stakeholder who has never seen the repository can understand both **how the Hub must be built** and **what has been accomplished so far**.

This handbook does not replace the source files in the repository. When a conflict exists, `docs/SOURCE-AUTHORITY.md` and the decision register govern precedence.

# Contents

- Part I — Final Operating SOP
- Part II — Source Authority and Access Governance
- Consolidated Data Placement and Integration Matrix
- Part III — Page Inventory and Implementation Classification
- Part IV — Workflow Catalog
- Part V — Workflow Diagrams (WF-001 through WF-013)
- Part VI — Repository Adoption, Definition of Done, and Change Control
- Part VII — Open Decisions
- Part VIII — Page Specification Template
- Current Development History and Implementation Snapshot
- Final Handoff Checklist


## Governance Diagram — Source Authority

![GOV-001 Source Authority](/mnt/data/jjr_docs_work/diagrams_png/GOV-001-source-authority.png){width=6.2in}

## Governance Diagram — Delivery Classification

![GOV-002 Delivery Classification](/mnt/data/jjr_docs_work/diagrams_png/GOV-002-delivery-classification.png){width=6.2in}

## Governance Diagram — Existing Repository Adoption

![GOV-003 Existing Repository Adoption](/mnt/data/jjr_docs_work/diagrams_png/GOV-003-existing-repo-adoption.png){width=6.2in}


# Part I — Final Operating SOP

# JJR Internal Hub — Final React/Vite Rebuild SOP

**Purpose:** govern the existing JJR Hub migration from HTML/Tailwind mockups into a maintainable, responsive, backend-ready React application.

**Important:** this repository already contains React/Vite work. This SOP is an **adoption and continuation standard**, not permission to restart the project.

---

## 1. Operating principle

Build the hub in this order:

**Understand → classify → reuse → implement → verify → record.**

Do not optimize for “convert all 20 pages quickly.” Optimize for one consistent architecture that survives all 20 pages.

---

## 2. What the mockups are

The 20 files in `legacy/` are:
- visual references;
- content/hierarchy references;
- interaction-feel references.

They are **not**:
- authorization rules;
- database design;
- backend contracts;
- proof that hard-coded data should exist in production;
- code to paste wholesale into React.

See `docs/SOURCE-AUTHORITY.md`.

---

## 3. Existing repository rule

Before any broad refactor:

1. Inspect the current repository.
2. Run its current checks.
3. Understand existing routes/components/services.
4. Compare current work against this SOP.
5. Mark code `KEEP`, `REFINE`, `REPLACE`, or `OPEN`.
6. Change only what has a clear reason.

**Never wipe `src/` simply to create a cleaner architecture.**

Use `docs/REPO-ADOPTION-CHECKLIST.md`.

---

## 3A. Decision work vs repository work

Use the repository as the handoff between planning and implementation.

- **Cross-document judgement:** resolve source conflicts, workflow meaning, access rules, and open decisions before coding.
- **Claude Code:** inspect files, implement/refactor, run checks, and report repository facts.
- Do not solve an unresolved business rule by asking Claude Code to “choose the best option.” Record the decision instead.

For a new data-driven feature, define the intended typed service/API contract **before** shaping components around hard-coded mock data.

---

## 4. Product model

The hub is an authenticated internal employee experience that will later connect to production backend/integration services.

Core principles:
- authentication required;
- different users see/act on different data;
- functional role and scoped capability are different concepts;
- SharePoint/external platforms remain systems of record where defined;
- frontend should be ready for real APIs without component rewrites;
- frontend visibility never becomes the production security boundary.

---

## 5. Roles and capabilities

### Functional roles
- New Hire / onboarding status
- Consultant
- Project Lead
- Practice Lead
- PMO
- Leadership

### Layered capabilities
- Hub Admin
- Editor / Content Owner
- Community Steward / Moderator
- CAB Chair
- HR / Squad profile administration
- approved resource-specific grants

Do not assume a functional title automatically grants unrelated administrative power.

Read `docs/ACCESS-MODEL.md`.

---

## 6. Delivery classes

Every meaningful data/content section should be understood as:

| Class | Meaning |
|---|---|
| A | Universal |
| B | Scoped set |
| C | Sensitive/omitted |
| D | Locked-visible |
| E | External/system-owned |

The class determines implementation behavior.

Read `docs/DELIVERY-CLASSES.md` before restricted or data-driven work.

---

## 7. Technical baseline

Maintain the existing baseline unless a confirmed requirement changes it:
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router where already adopted
- existing lint/type/test tooling

Rules:
- do not upgrade major framework versions during page migration without reason;
- do not add a dependency for convenience only;
- use one package manager and its existing lock file;
- do not introduce a global state library unless a real cross-app state problem appears.

---

## 8. Preferred code boundaries

Use the current repository structure where practical. Aim for these responsibilities:

```text
src/
├── app/          # router/providers/config
├── components/   # reusable layout/navigation/ui/feedback
├── features/     # business/domain behavior
├── pages/        # route composition
├── services/     # contracts + mock/API adapters
├── hooks/
├── types/
├── utils/
├── styles/
└── test/
```

Do not move working files merely to match this exact tree. Refactor when it improves clarity/reuse or removes a real problem.

---

## 9. Component rule

Before creating a component:

1. Search for an existing component with the same **meaning and behavior**.
2. Reuse it if suitable.
3. Extend it if the new requirement is a true variant.
4. Create a new component if the meaning is genuinely different.

**Shared-looking is not shared-meaning.**

Avoid:
- giant route components;
- 20 copies of the same header/card/modal;
- “universal” abstractions with dozens of unrelated props;
- page-specific duplicates differing only in spacing/color.

---

## 10. Design system

Preserve the established JJR direction:
- navy structural color;
- restrained green accent;
- light/off-white surfaces;
- Playfair Display for editorial display headings;
- IBM Plex Sans for body;
- IBM Plex Mono for labels/metadata where established.

Improve where needed:
- spacing consistency;
- semantic HTML;
- focus states;
- typography hierarchy;
- responsive behavior;
- contrast;
- inaccessible click targets;
- hard-coded visual defects.

Do not port known mockup bugs simply because they are visible in HTML.

---

## 11. Responsive standard

### Mobile
- single-column by default;
- compact/drawer navigation;
- no hover-only meaning;
- actions remain reachable;
- complex tables adapt rather than overflow blindly.

### Tablet
- use two columns only when useful;
- filters wrap cleanly;
- sidebars may stack below primary content.

### Desktop
- preserve editorial rhythm/sidebar intent;
- keep readable line lengths;
- do not stretch cards merely because space exists.

Check small mobile, tablet, standard desktop, and wide desktop before DoD-A.

---

## 12. Accessibility standard

Minimum:
- semantic landmarks;
- logical heading order;
- keyboard-operable controls;
- visible focus;
- proper labels/errors;
- color not used as the only status signal;
- reduced motion respected;
- modal focus management;
- appropriate accessible names;
- contrast checked, not guessed.

---

## 13. Data/service pattern

Components should not know whether data comes from mock or production services.

```text
Page
 ↓
Feature hook/controller
 ↓
Typed service contract
 ↓
Mock adapter now
API/integration adapter later
```

Rules:
- mock data outside page composition;
- typed domain models;
- map API-specific shapes before components;
- stable IDs;
- explicit loading/error/restricted states;
- external systems remain behind integration seams.

---

## 14. Authorization pattern

During frontend-only development:
- model identities/capabilities/scopes with mock services;
- render allowed/locked states realistically;
- keep access behavior centralized.

During production integration:
- backend validates identity;
- backend authorizes action/resource/scope;
- Class B lists are scoped before return;
- Class C payloads are omitted;
- direct resource routes re-check access;
- client-side hiding remains UX only.

Do not claim production security while authorization is mocked.

---

## 15. Workflow documentation

Use `docs/WORKFLOW-CATALOG.md` and `docs/workflows/`.

A workflow gets a dedicated SVG when it scores 4+ for complexity/security/reuse.

Important:
- a page can reference several workflows;
- a workflow can serve several pages;
- do not diagram trivial navigation;
- split business and technical flow when one diagram becomes overloaded.

---

## 16. Page specification

Before a complex page is created/refactored, capture:
- page identity/route;
- architecture source;
- legacy mockup;
- purpose;
- roles/capabilities/scope;
- section delivery classes;
- data owners;
- workflow IDs;
- reusable components;
- states;
- responsive notes;
- open decisions;
- acceptance criteria.

Use `docs/specs/PAGE-SPEC-TEMPLATE.md`.

---

## 17. Standard page procedure

For each page:

1. Read the architecture/spec.
2. Open the matching legacy mockup.
3. Identify sections and data owners.
4. Assign delivery classes where relevant.
5. Identify workflow IDs.
6. Inspect existing React components/routes/services.
7. Decide `KEEP`, `REFINE`, or `REPLACE` for existing implementation.
8. Reuse/extend meaningful shared components.
9. Keep data behind typed service contracts.
10. Implement states intentionally.
11. Make responsive behavior part of the implementation, not cleanup.
12. Verify keyboard/semantic behavior.
13. Run repository checks.
14. Record meaningful deviations/decisions.

---

## 18. Current migration sequence

Because the repository already contains converted work, use this sequence:

### Phase A — Repository adoption
- install the final SOP package;
- audit current code;
- record baseline build/check results;
- classify existing pages/components;
- update `docs/PROJECT-STATUS.md`.

### Phase B — Foundation stabilization
Fix only proven gaps in:
- routing;
- shell/layout;
- design tokens;
- shared states;
- service seams;
- accessibility foundations.

Do **not** rebuild foundation that is already correct.

### Phase C — Reference-pattern review
Use **Active Projects** as the reference pattern.

If already converted:
- review it;
- refine only gaps;
- approve the pattern.

Check:
- WF-002/WF-003/WF-004;
- components;
- typed service seam;
- filters/states;
- responsive behavior;
- future scoped-data readiness.

### Phase D — Continue remaining pages
Prioritize based on:
- dependencies;
- unresolved decisions;
- shared component value;
- workflow risk;
- current repo status.

Do not follow a stale “13 done / 7 remaining” count without verifying the code.

### Phase E — Production integration
Later connect:
- approved identity flow;
- backend API;
- database;
- Microsoft Graph/SharePoint/Planner/calendar integrations where approved;
- audit/notification services where required.

Preserve frontend contracts while adapters change.

---

## 19. Verification

### Frontend phase
Verify:
- visual intent;
- responsive states;
- component reuse;
- typed mock/service behavior;
- accessibility;
- loading/empty/error/restricted states;
- tests/build.

### Production phase
Additionally verify raw responses and negative access cases:
- Class C fields absent when unauthorized;
- Class B lists/counts scoped;
- direct restricted resource request denied safely;
- external integrations do not bypass access rules.

See `docs/DEFINITION-OF-DONE.md`.

---

## 20. Mockup correction rule

Conversion is allowed to fix:
- incorrect counts derived from hard-coded values;
- non-semantic controls;
- duplicate CSS/components;
- inaccessible contrast/focus;
- layout bugs;
- imperative DOM logic;
- duplicated inline SVGs;
- oversized embedded assets.

Record large intentional behavior/design deviations.

---

## 21. Change control

When a requirement is undecided:

1. Add/update `docs/decisions/OPEN-DECISIONS.md`.
2. Mark `OPEN`, `PROPOSED`, `DEFERRED`, or `CONFIRMED`.
3. Keep the implementation reversible.
4. Do not present a proposal as confirmed.
5. Continue unrelated work where safe.

---

## 22. Project status rule

The SOP describes **how** to work.

`docs/PROJECT-STATUS.md` describes **where the build is now**.

Never put transient page counts or “next page” instructions into permanent architecture rules.

---

## 23. Definition of Done

Use two gates:

- **DoD-A:** frontend migration complete.
- **DoD-B:** production integration/security complete.

See `docs/DEFINITION-OF-DONE.md`.

---

## 24. SOP maintenance

Update the SOP when:
- reusable architecture changes materially;
- a workflow changes;
- authorization policy changes;
- a system of record changes;
- a page gains a new role/capability rule;
- an open decision becomes confirmed and changes implementation.

Do not edit the SOP for trivial cosmetic fixes.


# Part II — Source Authority and Access Governance

# JJR Hub — Source Authority

## Purpose

Prevent architecture drift when mockups, older architecture documents, specs, decisions, and current code disagree.

## Product / access precedence

Use this order:

1. **Confirmed decisions** — `docs/decisions/OPEN-DECISIONS.md` rows marked `CONFIRMED`.
2. **Access model / explicit permission rules** — `docs/ACCESS-MODEL.md` plus approved matrices/decisions.
3. **Page-specific architecture documents** — existing files in `docs/architecture/`.
4. **General hub architecture documents** — app-wide architecture sources.
5. **Page specs** — working implementation specifications in `docs/specs/`.
6. **Legacy mockups** — `legacy/*.html`, visual/interaction authority only.
7. **Existing code** — evidence of current implementation, not automatic proof of intended business behavior.

## Development-process authority

For how work is performed:

1. `CLAUDE.md`
2. `JJR-INTERNAL-HUB-SOP.md`
3. supporting governance documents in `docs/`

These do not silently override product requirements. If a process rule conflicts with an approved business requirement, record the conflict.

## Pairing rule for every page

Each migrated page has two primary inputs:

- **Architecture/spec** → purpose, roles, sensitivity, data ownership, workflows.
- **Legacy HTML** → layout, visual identity, hierarchy, interaction feel.

Never copy access logic or data ownership assumptions from the mockup.

## Conflict handling

When sources disagree:

1. Identify both sources.
2. Apply the precedence above only when the higher source is clearly authoritative.
3. If ambiguity remains, add an `OPEN` decision.
4. Use the safest reversible implementation.
5. Do not label an assumption `CONFIRMED`.


# JJR Hub — Access Model

## 1. Identity layers

### Functional roles
- New Hire / onboarding status
- Consultant
- Project Lead
- Practice Lead
- PMO
- Leadership

### Layered capabilities
These are separate from functional roles:
- Hub Admin
- Editor / Content Owner
- Community Steward / Moderator
- CAB Chair
- HR / Squad profile administration
- other resource-specific grants approved later

## 2. Core access question

Do not ask only:

`What role is this person?`

Ask:

`Can this authenticated user perform ACTION on RESOURCE within SCOPE?`

## 3. Scope examples

| Scope | Example |
|---|---|
| Self | own profile/settings |
| Project | projects the user belongs to/leads/is granted |
| Practice | practice-specific areas |
| Community | member/steward actions in that community |
| CAB | CAB membership/chair capabilities |
| Firm | employee-wide governed content |
| Restricted | explicit leadership/approved grant rules |

## 4. Frontend vs backend

Frontend may:
- show/hide actions for UX;
- render locked states;
- display mock authorization states during frontend development.

Frontend must not be treated as the security boundary.

Production backend must eventually:
- validate identity;
- enforce action/resource/scope permissions;
- scope list queries before returning data;
- omit sensitive payloads when required;
- re-check direct/detail resource access.

## 5. Important anti-patterns

Do not scatter:

```ts
if (user.role === 'admin') ...
if (user.role === 'leadership') ...
```

throughout pages.

Prefer a centralized UI-facing contract such as:

```ts
can(user, action, resource)
```

while keeping real authorization server-side when the backend is introduced.


# JJR Hub — Delivery Classes

Classify meaningful page sections before implementation.

| Class | Meaning | Frontend / future backend treatment | Example |
|---|---|---|---|
| **A — Universal** | Every authenticated employee may receive it | Plain render | Firm values/content |
| **B — Scoped set** | Section exists broadly; records differ by user scope | Query/return only allowed records; client filters only within returned set | Active Projects |
| **C — Omitted** | Wrong recipient receiving the bytes is a security/privacy issue | Backend must omit the data entirely | Restricted KPIs, sensitive profile fields |
| **D — Locked-visible** | Users may know the resource exists but not see contents | Render shell/locked state; do not return restricted payload | Exec & Strategy shell, access request |
| **E — External** | Another system owns the authoritative record/content | Deep-link/integrate; do not duplicate system-of-record state unnecessarily | SharePoint docs, Planner, Outlook/Teams, approved external tools |

## Classification order

For each section:

1. Is another system the system of record? → **E**
2. Would receiving the data unauthorized be an incident? → **C**
3. Should users see that it exists but not its contents? → **D**
4. Does everyone get the section but only an allowed subset? → **B**
5. Otherwise → **A**

## Rules

- A Class C section is not protected by `{condition && <Component />}` alone.
- Class B counts/aggregates must be based on the allowed set, not the global set.
- Class D is a UX pattern plus backend enforcement, not an alternative to authorization.
- Class E state should not be copied into the JJR app without a requirement.



# Consolidated Data Placement and Integration Matrix

The following table is a coordination view. It does not choose the production backend technology. Where the source is undecided, the status remains OPEN/MISSING.

| Data / entity domain | Logical system of record | In-Hub representation | Delivery / security treatment | Confidence / decision |
|---|---|---|---|---|
| Employee identity, name, email, photo | Microsoft Entra ID | Authenticated identity/profile mirror | Identity resolved centrally; Hub is not identity source of truth | CONFIRMED target; exact adapter D-002 OPEN |
| Functional roles, tags, memberships, grants | Application Data Store | Capability/scope context | Backend-authoritative ACTION/RESOURCE/SCOPE checks | CONFIRMED logical ownership; backend tech D-001 OPEN |
| Access requests and approved grants | Application Data Store | Request status / future grant | Auditable shared workflow; affects future access | CONFIRMED logical ownership |
| Project records, membership, status metadata | Application Data Store | Project cards/detail metadata | Class B scoped set; query scoped before return | CONFIRMED logical ownership |
| Milestones | Project/application domain | Active Projects + Home summaries | Reuse same Project domain service; counts based on allowed set | CONFIRMED domain reuse; exact production source may evolve |
| Project progress/tasks | Microsoft Planner / approved project progress source | Deep-link / future integration | External system; do not duplicate authoritative state | Planner ownership established; Home-vs-Active-Projects progress semantics remain OPEN |
| Project documents, SOWs, deliverables | SharePoint where defined | Security-trimmed references | Class E; direct access rechecked by upstream permissions | CONFIRMED where architecture names SharePoint |
| Community directory and membership | Application Data Store | Directory cards / membership state | Discovery broader than participation; membership-scoped actions | CONFIRMED logical ownership |
| Community discussions/posts/replies | Application Data Store | Member discussion UI | Class C/B depending section; members-only writes | CONFIRMED in Communities architecture |
| Community resources/attachments | SharePoint + Application Data Store index | Resource metadata + file pointer | External canonical file + app relationship/index | CONFIRMED/PROPOSED by section |
| Calendar / meeting events | Outlook / Teams via Microsoft Graph | Event cards / create-add flows | Authorized integration seam | PROPOSED/CONFIRMED by page; WF-008 |
| Profile identity fields | Entra ID + Application Data Store mirror | Public professional profile | Viewer relationship affects returned payload | CONFIRMED |
| Profile self-editable/privacy fields | Application Data Store | Owner edit/settings | Sensitive fields omitted from unauthorized payloads | CONFIRMED logical model |
| Time/allocation/work data | QuickBooks + Planner + Application Data Store | Read-only aggregates / links | External; owner/privileged scope | PROPOSED in Profile architecture |
| Compliance / mandatory training | Compliance Hub / LMS or other approved source | Verified status/gating | Must not fake verified completion in frontend | **D-003 OPEN** |
| Buddy assignment / onboarding progress | Application Data Store | Start Here personalization/progress | Personal state; advanced gate separate from cosmetic scenario | PROPOSED; some manager semantics D-013 OPEN |
| Firm templates/policies/documents | SharePoint where explicitly defined | Discovery/link cards | External canonical content; avoid duplicates | CONFIRMED for named areas; MISSING for some pages |
| Templates page canonical store | External/document source | Resource discovery | Do not guess library/system | MISSING / spec-first |
| Tool Guides canonical store | External/document source | Guide/video discovery | Do not guess library/system | MISSING / spec-first |
| PMO lessons learned | Application Data Store linked to Projects | Browse/submit/review | Dynamic seam candidate; project closeout workflow | CONFIRMED/PROPOSED by PMO architecture |
| PMO announcements | Targeted messaging source not finalized | Announcement surface | Audience/scoping semantics must be specified | LATER / source not fully confirmed |
| Strategy KPIs/reporting | Approved reporting/finance source | Restricted KPI cards | Class C restricted payload; source must be approved | **D-008 OPEN** |
| Leadership membership | Entra/group/grant rule to be finalized | Restricted route capability | Locked-visible shell + omitted confidential payload | **D-004 OPEN** |
| JEDI CAB topics/decisions/actions | Application Data Store / governance domain | Restricted CAB workspace | Ring/capability-scoped, auditable governance | Architecture strong; **D-015 OPEN** |
| Admin Hub Actions | Future application domain | Draft/scheduled/published action cards | Admin/editor capability + audit trail required | Architecture intent known; entity/audit semantics SPEC FIRST |
| Static/editorial page content | Local constants now; governed source later | ContentPage/editorial components | Class A unless page-specific rule says otherwise | Current frontend confirmed; future source may be MISSING |
| Global search index | Not selected | Search results | Must respect delivery/scoping rules | D-010 DEFERRED |
| Notification persistence/read state | Not selected | Bell/dropdowns | Must not invent durable state before backend design | D-011 DEFERRED |


# Part III — Page Inventory and Implementation Classification

# JJR Hub — Page Inventory

## How to use

- `Access` describes intended scope, not client-side security.
- `Workflows` reference shared behavior; do not duplicate workflow logic per page.
- Complexity metrics are a historical snapshot from the legacy HTML and help estimate conversion effort only.

| ID | Page | Legacy file | Type | Primary access | Workflows | Legacy complexity | Key rule |
|---|---|---|---|---|---|---|---|
| P-01 | Home | `jjr-hub-tw.html` | Dynamic hub | All employees; personalized | WF-001, WF-002, WF-003 | 260 KB / 318 div / 141.7 KB JS | Compose approved primitives; role/scope-aware data must come through services. |
| P-02 | Start Here | `start-here.html` | Onboarding | All; status-aware | WF-001, WF-005, WF-003 | 73 KB / 149 div / 31.8 KB JS | Scenario selection is personalization, not permission. |
| P-03 | My Profile | `my-profile.html` | Data-driven/editable | Self; scoped privileged access | WF-001, WF-002, WF-009 | 73 KB / 324 div / 11.5 KB JS | Separate public, self, relationship-scoped, and sensitive fields. |
| P-04 | Active Projects | `active-projects.html` | Data-driven/scoped | Project-scoped + approved broader roles | WF-002, WF-003, WF-004 | 46 KB / 237 div / 2.0 KB JS | Reference-pattern page; returned portfolio must already be scoped in production. |
| P-05 | Communities | `communities.html` | Directory/membership | Employees; membership affects actions | WF-002, WF-006 | 50 KB / 226 div / 1.5 KB JS | Discovery and participation are different permissions. |
| P-06 | Community Detail | `community-detail.html` | Membership/content | Preview per approved policy; member writes | WF-002, WF-006, WF-007, WF-008 | 44 KB / 147 div / 2.7 KB JS | Route-driven reusable community page; keep external files canonical. |
| P-07 | Templates | `templates.html` | Knowledge library | Employees; editor manages | WF-002 | 62 KB / 272 div / 4.1 KB JS | Hub discovers/surfaces canonical documents; do not duplicate them. |
| P-08 | PMO | `pmo.html` | Governance/operations | Employees; PMO manages | WF-002, WF-011 | 49 KB / 205 div / 1.6 KB JS | Governance, lifecycle, reviews, and lessons learned. |
| P-09 | How We Work | `how-we-work.html` | Editorial | All employees | — | 52 KB / 228 div / 1.6 KB JS | Use governed editorial components. |
| P-10 | Tool Guides | `tool-guides.html` | Knowledge/search | All employees | WF-002 | 50 KB / 188 div / 2.1 KB JS | Surface canonical guide/video sources. |
| P-11 | Accessibility | `accessibility.html` | Governance/editorial | All employees | WF-003 | 27 KB / 50 div / 2.4 KB JS | Accessible issue/accommodation/access paths. |
| P-12 | AI for Good | `ai-for-good.html` | Editorial/capability | All employees | — | 31 KB / 92 div / 2.3 KB JS | Reuse ContentPage-style sections if meaning remains shared. |
| P-13 | Consultant Directory | `consultant-directory.html` | Directory/filter | All employees | WF-002, WF-009 | 34 KB / 85 div / 4.4 KB JS | Identity and app-owned professional metadata remain separated. |
| P-14 | Environmental Justice | `environmental-justice.html` | Editorial/capability | All employees | — | 31 KB / 92 div / 2.3 KB JS | Governed content; reuse editorial structure. |
| P-15 | Exec & Strategy | `exec-strategy.html` | Restricted/confidential | Approved leadership/restricted grants | WF-002, WF-003, WF-010 | 53 KB / 175 div / 2.5 KB JS | Class C payload must never reach unauthorized clients in production. |
| P-16 | Under Development | `under-development.html` | Utility | All employees | — | 20 KB / 40 div / 2.3 KB JS | Temporary destination only. |
| P-17 | Vision & Values | `vision-values.html` | Editorial | All employees | — | 30 KB / 92 div / 2.3 KB JS | Governed firm content. |
| P-18 | Site Owners | `site-owners.html` | Directory/governance | All employees | WF-002 | 32 KB / 86 div / 2.3 KB JS | Clear ownership/escalation. |
| P-19 | JEDI CAB | `jedi-cab-tw.html` | Restricted community/governance | CAB scope + approved capabilities | WF-002, WF-003, WF-008, WF-012 | 105 KB / 316 div / 17.2 KB JS | Multiple access rings/capabilities; unresolved cohort behavior remains OPEN. |
| P-20 | Admin · Hub Actions | `admin-actions.html` | Admin authoring | Hub Admin / approved editor capability | WF-002, WF-013 | 30 KB / 104 div / 3.8 KB JS | Publishing is capability-scoped and eventually auditable. |

## Cross-cutting legacy issues to correct, not port

- Excessive generic `<div>` usage → use semantic landmarks/sections/headings.
- Inline imperative DOM behavior → React state/events.
- Clickable non-controls → semantic links/buttons.
- Repeated inline SVGs → named/shared icon system where meaning is shared.
- Base64 page assets → real asset files when appropriate.
- Hard-coded counts/statuses → derive from the same source data.



# Implementation Architecture Classification — Current Coordination View

This table uses descriptive implementation patterns to avoid confusing them with Delivery Classes A-E.

| ID | Page | Recommended implementation pattern | Current readiness / major blocker |
|---|---|---|---|
| P-01 | Home | Composition over existing Project + Community services; static presentation for approved content | Implemented on `feat/home-page`; visual/QA review pending |
| P-02 | Start Here | Hybrid: static onboarding + future typed progress state + separate gated compliance section | Static portion implementable; D-003/D-013 affect gated behavior |
| P-03 | My Profile | Full user-specific typed service seam | Strong architecture; implementation candidate |
| P-04 | Active Projects | Full scoped dynamic service seam | Reference implementation complete |
| P-05 | Communities | Shared Communities-domain directory seam | Reference implementation complete |
| P-06 | Community Detail | Same Communities domain, route-driven detail seam | Reference implementation complete |
| P-07 | Templates | External/document-oriented, likely lightweight content boundary | Exact future source missing; spec first |
| P-08 | PMO | Mixed page; editorial + Lessons Learned dynamic seam + later integrations | Existing UI; refine by section |
| P-09 | How We Work | Static/governed editorial | Existing UI |
| P-10 | Tool Guides | External/document-oriented | Exact canonical source missing |
| P-11 | Accessibility | Static/governance editorial + access/report links | Existing UI |
| P-12 | AI for Good | Static/governed editorial | Existing UI |
| P-13 | Consultant Directory | Dynamic identity/professional directory seam intended | Existing UI; dedicated architecture/spec missing |
| P-14 | Environmental Justice | Static/governed editorial | Existing UI |
| P-15 | Exec & Strategy | Restricted dynamic/service architecture with locked shell | BLOCKED by D-004 |
| P-16 | Under Development | Static utility | Existing UI |
| P-17 | Vision & Values | Static/governed editorial | Existing UI |
| P-18 | Site Owners | Lightweight governed directory/content boundary | Existing UI; source ownership should remain explicit |
| P-19 | JEDI CAB | Restricted dynamic governance architecture | BLOCKED by D-015 |
| P-20 | Admin · Hub Actions | Dynamic/admin architecture intended | SPEC FIRST: capability/audit/entity semantics incomplete |


# Part IV — Workflow Catalog

# JJR Hub — Workflow Catalog

## 1. Why a workflow gets an SVG

Score 1 point for each:
1. multiple actors;
2. permission/security check;
3. decision branch;
4. data write/change;
5. cross-system integration;
6. meaningful failure/denial;
7. reused by multiple pages.

Treatment:
- **0–1** → no dedicated diagram;
- **2–3** → page-spec description;
- **4–7** → dedicated SVG.

## 2. Workflow register

| ID | Workflow | Score | Primary type | Used by | Core contract |
|---|---|---:|---|---|---|
| WF-001 | Sign-in & identity resolution | 5/7 | Technical foundation | Protected routes | Resolve authenticated identity and approved role/capability context. |
| WF-002 | Authorization & scoped resource access | 7/7 | Security | Projects, profiles, communities, strategy, admin | Backend is authoritative; client receives only allowed payload in production. |
| WF-003 | Shared access request & approval | 6/7 | Business + security | Projects, strategy, CAB, access concerns | Denied user can request; approved grant changes future access. Exact approval policy may vary. |
| WF-004 | Project portfolio → project resource | 6/7 | Business + integration | Active Projects, Home | Scope portfolio, re-check detail, then open permitted app/external resources. |
| WF-005 | Onboarding & advanced-access gate | 6/7 | Business + security | Start Here, Home | Personalization does not equal permission; verified status gates only approved actions/resources. |
| WF-006 | Community join & participation | 5/7 | Business + security | Communities, Community Detail | Discovery, membership, posting, and moderation are separate actions. Join policy remains configurable until confirmed. |
| WF-007 | Knowledge artifact submission | 5/7 | Business + integration | Community Detail | Submit metadata/content; preserve canonical external document ownership where defined. |
| WF-008 | Event/calendar creation | 4/7 | Integration | Communities, JEDI CAB, PMO | Authorized creator → backend/integration seam → approved calendar/meeting system. |
| WF-009 | Profile view/edit & privacy scope | 6/7 | Security + business | Profile, Directory | Viewer relationship/capability determines returned fields and edit rights. |
| WF-010 | Leadership restricted area | 7/7 | Security | Exec & Strategy | Locked/discoverable UX may exist; confidential payload remains omitted when unauthorized. |
| WF-011 | Project closeout & lessons learned | 5/7 | Business | PMO, Projects | Closeout → capture lesson → review/govern → reusable knowledge. |
| WF-012 | CAB topic → decision → action | 6/7 | Business/governance | JEDI CAB | Authorized topic, moderated decision, assigned action, retained record. |
| WF-013 | Admin hub action publishing | 6/7 | Business/admin | Admin Actions, Home | Draft/schedule/publish/expire to approved audience; production path eventually auditable. |

## 3. Business vs technical diagrams

When one diagram becomes overloaded, split it:

- **Business flow** → actors, decisions, outcomes.
- **Technical flow** → React, service contract, backend, Graph/SharePoint/external adapter.

Do not freeze a future backend technology merely because an SVG needs a box. Use logical labels such as `Backend/API` or `Calendar Integration` until the decision is confirmed.

## 4. Rule

A page is not a workflow. Reference shared workflow IDs from pages instead of redrawing the same behavior.


# Part V — Workflow Diagrams

## WF-001 — Sign-in & identity resolution

![WF-001 — Sign-in & identity resolution](/mnt/data/jjr_docs_work/diagrams_png/WF-001-sign-in-identity.png){width=6.1in}

## WF-002 — Authorization & scoped resource access

![WF-002 — Authorization & scoped resource access](/mnt/data/jjr_docs_work/diagrams_png/WF-002-authorization-scoped-access.png){width=6.1in}

## WF-003 — Shared access request & approval

![WF-003 — Shared access request & approval](/mnt/data/jjr_docs_work/diagrams_png/WF-003-shared-access-request.png){width=6.1in}

## WF-004 — Project portfolio → project resource

![WF-004 — Project portfolio → project resource](/mnt/data/jjr_docs_work/diagrams_png/WF-004-project-resource.png){width=6.1in}

## WF-005 — Onboarding & advanced-access gate

![WF-005 — Onboarding & advanced-access gate](/mnt/data/jjr_docs_work/diagrams_png/WF-005-onboarding-gate.png){width=6.1in}

## WF-006 — Community join & member participation

![WF-006 — Community join & member participation](/mnt/data/jjr_docs_work/diagrams_png/WF-006-community-membership.png){width=6.1in}

## WF-007 — Knowledge artifact submission

![WF-007 — Knowledge artifact submission](/mnt/data/jjr_docs_work/diagrams_png/WF-007-knowledge-artifact.png){width=6.1in}

## WF-008 — Event / calendar creation

![WF-008 — Event / calendar creation](/mnt/data/jjr_docs_work/diagrams_png/WF-008-calendar-event.png){width=6.1in}

## WF-009 — Profile view/edit & privacy scope

![WF-009 — Profile view/edit & privacy scope](/mnt/data/jjr_docs_work/diagrams_png/WF-009-profile-privacy.png){width=6.1in}

## WF-010 — Leadership restricted area

![WF-010 — Leadership restricted area](/mnt/data/jjr_docs_work/diagrams_png/WF-010-leadership-restricted.png){width=6.1in}

## WF-011 — Project closeout & lessons learned

![WF-011 — Project closeout & lessons learned](/mnt/data/jjr_docs_work/diagrams_png/WF-011-closeout-lessons.png){width=6.1in}

## WF-012 — CAB topic → decision → action

![WF-012 — CAB topic → decision → action](/mnt/data/jjr_docs_work/diagrams_png/WF-012-cab-decision-action.png){width=6.1in}

## WF-013 — Admin hub action publishing

![WF-013 — Admin hub action publishing](/mnt/data/jjr_docs_work/diagrams_png/WF-013-admin-hub-actions.png){width=6.1in}


# Part VI — Repository Adoption, Definition of Done, and Change Control

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


# JJR Hub — What to Keep, Replace, Archive, and Add

Based on the current repository layout shown in the screenshots.

## Root folder

| Current item | Action | Reason |
|---|---|---|
| `.claude/` | **KEEP** | Claude project settings/history may be useful. |
| `docs/` | **KEEP + MERGE** | Existing architecture/spec sources stay. Add final governance docs. |
| `legacy/` | **KEEP** | All 20 HTML mockups remain visual references. |
| `node_modules/` | **KEEP LOCALLY** | No need to delete. Ensure Git ignores it. |
| `scripts/` | **KEEP** | Existing checks/utilities may be useful. |
| `src/` | **KEEP** | Existing React work must be audited, not wiped. |
| `.gitignore` | **KEEP / CHECK** | Ensure `node_modules`, `dist`, `.env*` are handled safely. |
| `CLAUDE.md` (shown as `CLAUDE`) | **REPLACE** | Replace the old large working instructions with final concise rules. |
| `index.html` | **KEEP** | Vite app entry. |
| `package.json` | **KEEP** | Existing project/dependencies/scripts are authoritative for current repo. |
| `package-lock.json` | **KEEP** | Preserve current lock file. |
| `postcss.config.*` | **KEEP** | Existing build config. |
| `tailwind.config.*` | **KEEP** | Existing Tailwind config/tokens may already be implemented. |
| `tsconfig*` | **KEEP** | Existing TypeScript config. |
| `vite.config.*` | **KEEP** | Existing Vite config. |

## `docs/architecture/`

| Current item | Action |
|---|---|
| Page architecture `.docx` files | **KEEP** |
| App Architecture Flows HTML | **KEEP** |
| `# How We Will Build the JJR Hub...` temporary text file | **MOVE TO `docs/archive/`** after checking it is only the old process guide |

## `docs/specs/`

| Current item | Action |
|---|---|
| `active-projects.md` | **KEEP** |
| old `conversion-plan.md` | **MOVE TO `docs/archive/`** if it describes the pre-final migration sequence |

## Add from final package

At repository root:
- `CLAUDE.md` — replace current one
- `JJR-INTERNAL-HUB-SOP.md`
- `REPO-REPLACEMENT-MAP.md` optional reference

Under `docs/`:
- `SOURCE-AUTHORITY.md`
- `ACCESS-MODEL.md`
- `DELIVERY-CLASSES.md`
- `DEFINITION-OF-DONE.md`
- `REPO-ADOPTION-CHECKLIST.md`
- `PROJECT-STATUS.md`
- `PAGE-INVENTORY.md`
- `WORKFLOW-CATALOG.md`
- `decisions/OPEN-DECISIONS.md`
- `workflows/*.svg`
- `diagrams/*.svg`
- `specs/PAGE-SPEC-TEMPLATE.md`

## Do not delete yet

Do not delete:
- any `src` code;
- architecture Word files;
- the 20 legacy HTML files;
- package/build configuration;
- existing specs that contain page-specific facts;
- old process documents until they have been archived and the final audit is complete.


# JJR Hub — Definition of Done

## DoD-A — Frontend migration complete

A page is frontend-complete when:

- [ ] Route works.
- [ ] Uses the approved shell/layout.
- [ ] Reuses existing meaningful components where appropriate.
- [ ] No avoidable giant page component.
- [ ] Domain data is typed.
- [ ] Mock data lives outside page composition.
- [ ] Relevant workflow IDs are respected.
- [ ] Delivery classes are documented for sensitive/data-driven sections.
- [ ] Loading/empty/error/restricted states exist where relevant.
- [ ] Mobile/tablet/desktop checked.
- [ ] Keyboard interactions checked.
- [ ] Focus/labels/heading structure checked.
- [ ] No console errors caused by the change.
- [ ] Existing applicable lint/type/test/build checks pass.
- [ ] Intentional differences from the legacy mockup are recorded when meaningful.

## DoD-B — Production integration complete

A feature is production-integrated when applicable checks also prove:

- [ ] Authentication uses the approved production identity flow.
- [ ] Backend authorization is enforced.
- [ ] Class C data is absent from unauthorized responses.
- [ ] Class B data is scoped before return/aggregation.
- [ ] Direct resource requests re-check authorization.
- [ ] External systems are accessed through approved integration seams.
- [ ] Failure/timeout/partial-integration states are handled.
- [ ] Audit requirements are implemented where required.
- [ ] Security-sensitive workflows have negative tests.

Do not block frontend migration on DoD-B while the backend is intentionally deferred. Do not claim DoD-B until the backend exists and is tested.


# Part VII — Open Decisions

# JJR Hub — Decision Register

Use `CONFIRMED`, `PROPOSED`, `OPEN`, or `DEFERRED`.

| ID | Decision | Current recommendation | Status |
|---|---|---|---|
| D-001 | Production backend technology | Keep frontend service contracts backend-agnostic until selected. | OPEN |
| D-002 | Production authentication library/flow | Entra ID/OIDC is the identity target; select exact adapter during integration. | OPEN |
| D-003 | Mandatory training/compliance source | Decide authoritative source before verified compliance gating. | OPEN |
| D-004 | Exact Leadership membership rule | Define group/rule and explicit exception grants. | OPEN |
| D-005 | Who may create projects | PMO/Leadership/Admin baseline; confirm Practice Lead behavior. | OPEN |
| D-006 | Project status ownership | Keep lead-maintained status in app data; external progress source remains separate. | PROPOSED |
| D-007 | Community join policy | Decide instant join vs request/approval by community. | OPEN |
| D-008 | Strategy KPI source | Use approved reporting/finance source; do not embed production values. | OPEN |
| D-009 | Expiry for exceptional restricted grants | Prefer time-bounded grants where appropriate. | PROPOSED |
| D-010 | Global search source/index | Define after backend/SharePoint integration decisions. | DEFERRED |
| D-011 | Notification persistence/read-state model | Define during backend integration. | DEFERRED |
| D-012 | Project detail page | Finalize after Active Projects reference-pattern review. | DEFERRED |
| D-013 | Manager/team scope for onboarding verification | Confirm JJR organizational meaning; do not invent a Manager role. | OPEN |
| D-014 | Past Deliverables visibility for consultants | Confirm self-scoped view vs leads-and-up only. | OPEN |
| D-015 | JEDI-CAB cohort/ring-3 behavior | Requires dedicated analysis before implementation. | OPEN |

## Rule

If implementation requires an `OPEN` rule, stop that irreversible part and continue only with reversible/presentational work that does not encode the decision.


# Part VIII — Page Specification Template

# Page Spec — <Page Name>

## Identity
- Page ID:
- Route:
- Legacy mockup:
- Architecture source:

## Purpose
- One or two bullets only.

## Users / access
- Functional roles:
- Capabilities:
- Scope:

## Sections

| Section | Delivery class | Data owner | Editable by | Notes |
|---|---|---|---|---|

## Workflows
- WF-___

## Components
- Reuse:
- New domain components only if needed:

## States
- Loading
- Loaded
- Empty
- Error
- Restricted
- Partial integration unavailable, if relevant

## Responsive notes
- Mobile:
- Tablet:
- Desktop:

## Open decisions
- None / D-___

## Acceptance criteria
- [ ] Meets DoD-A.
- [ ] Workflow behavior is represented correctly.
- [ ] No unresolved rule was invented.



# Current Development History and Implementation Snapshot

This section records the major implementation work completed after the original governance package was adopted. It is a handoff summary, not a replacement for repository history or the source documents.

## Repository audit and adoption

The final SOP package was adopted into the existing React/Vite repository rather than using it as a reason to restart the project. The audit classified existing work, retained working pages/components, archived obsolete process documents, and established the governance reading order.

The initial audit found roughly 15 of 20 page concepts already represented in React, with Home, Start Here, My Profile, Exec & Strategy, and JEDI CAB lacking real page implementations at that point.

## Active Projects reference seam

Active Projects became the first approved dynamic reference pattern:

```text
ActiveProjectsPage
        ↓
useActiveProjects
        ↓
ActiveProjectsService
        ↓
activeProjectsMockAdapter
        ↓
mock data
```

The seam exposes `getPortfolio()` and `getMilestones()`, keeps data-source knowledge out of the page, and is deliberately ready for a future production adapter. Hook/adapter tests were added.

## Router and tests

React Router was added as the application route foundation. Planned internal routes were defined, including the reusable `/communities/:slug` route and aliases. Vitest/jsdom/React Testing Library became the frontend test baseline.

## Data and behavior mapping

The project later added coordination documents `docs/DATA-AND-BEHAVIOR-MAP.md` and `docs/DATA-SOURCE-CATALOG.md`. These do not outrank architecture/decision sources; they consolidate entities, system-of-record assumptions, CRUD/read behavior, delivery classes, workflow references, confidence tags, and open gaps.

## Internal navigation migration

Confirmed internal navigation was migrated to React Router links. Ambiguous destinations such as join actions, request-access flows, document resources, project quick links, and unresolved detail routes were intentionally left untouched until their semantics are confirmed.

## Communities shared-domain seam

Communities and Community Detail use one domain service:

```text
CommunitiesPage → useCommunities → CommunitiesService.getDirectory()
CommunityDetailPage → useCommunityDetail(slug) → CommunitiesService.getCommunityDetail(slug)
```

Both methods are currently implemented by one mock adapter. Membership/write workflows remain separate concerns rather than being smuggled into the read seam.

## Remaining-page classification

The remaining pages were classified by minimum appropriate architecture so the project would not create a service seam for every static page. Home was identified as composition-oriented; My Profile as a full dynamic candidate; Start Here as a hybrid static/progress/gated page; several editorial pages as static; Templates/Tool Guides as external/document-oriented; Exec & Strategy and JEDI CAB as blocked; and Admin Hub Actions as specification-first.

## Home specification and implementation

Home is the third reference pattern:

```text
Home owns composition
Active Projects owns project data
Communities owns community data
```

There is no monolithic `HomeService`.

Home uses presentation/view-model hooks over the existing domain services. The project-progress source conflict remains open, so Home does not display the disputed progress percentage/bar. Client Hub is a visible stub because its backing source is missing; Compliance Hub and Past Deliverables remain deferred under their open decisions.

The first Home implementation was functionally correct but visually too simplified. The project then adopted a stricter visual-parity workflow: approved architecture governs behavior/security, while `legacy/jjr-hub-tw.html` governs visual hierarchy, spacing, motion, and interaction where no approved rule conflicts.

## Browser-based design verification with gstack

A browser-aware design-review workflow was introduced. This exposed a gap in earlier verification: source inspection and HTTP response checks do not prove visual correctness.

The design review found and fixed a real slider layout problem. It also revealed that scroll-reveal content can remain invisible in one-shot screenshot capture until actual scrolling triggers the observer. A fail-open `RevealOnScroll` strategy is recommended so important content cannot become permanently hidden if an observer callback fails.

## Home extensibility

A reusable `SectionSlider` now supports Priority Topics, Projects, Knowledge Spotlight, and Communities. It detects actual overflow, shows arrows only when needed, recalculates on resize/content changes, supports keyboard navigation, preserves native touch/trackpad behavior, and respects reduced motion.

Jenna's Thought Leadership remains a specialized data-driven carousel that accepts an arbitrary article collection and switches from dots to a compact counter when the article count grows.

## Last saved Git checkpoint

```text
df2f081  chore: ignore gstack local state
3565fb7  feat(home): extensibility for sliders, topics, and leadership carousel
2913c3b  style(design): FINDING-001 - slider rows leave dead space instead of filling the row
6970cdc  feat: implement P-01 Home with legacy visual parity
29508e0  Add Home page specification
```

At that checkpoint `feat/home-page` was clean and fully pushed to `origin/feat/home-page`. Home still requires final exhaustive design review, QA, code review, and human screenshot approval before merge.


# Final Handoff Checklist

Before another developer continues the project:

1. Pull `main` and confirm it is clean and current.
2. Read `CLAUDE.md`, the SOP, source authority, access model, delivery classes, decision register, page inventory, workflow catalog, data/behavior maps, and the relevant page spec/architecture source.
3. Do not resolve OPEN business decisions in code.
4. Reuse the Active Projects and Communities service-seam patterns only where their semantics fit.
5. Treat Home as a composition pattern, not permission to create a cross-domain Home service.
6. Preserve the legacy mockups as visual/interaction references while following architecture for data/security behavior.
7. Run tests, typecheck, production build, diff check, and browser-level review before committing a milestone.
8. Keep frontend authorization claims honest: UI visibility is UX; production security is backend-enforced.
9. Update project-status/classification documents after meaningful milestones.
10. Merge only after the feature branch is reviewed, verified, and approved.
