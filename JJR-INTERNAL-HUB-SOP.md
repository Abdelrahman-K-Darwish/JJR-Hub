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

Use `docs/specs/PAGE-SPEC-TEMPLATE.md`. Before writing a new page spec, cross-check it against
`docs/DATA-AND-BEHAVIOR-MAP.md`; if the page introduces or touches a shared entity, update the
map's Global entities register (§2) as part of the spec work.

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
- an open decision becomes confirmed and changes implementation;
- a shared entity's system of record changes.

Do not edit the SOP for trivial cosmetic fixes.
