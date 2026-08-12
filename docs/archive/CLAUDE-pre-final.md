# JJR Hub — Working Agreement & Build Standard

**Single source of truth for this repo.** Read this file fully before your first edit in any
session. It is not background reading; it is the standard.

Everything the build needs is in this one file:

| Part | Contents |
|---|---|
| **1** | Working agreement — the security rule, stack, permission engine, conventions |
| **2** | SOP — the repeatable per-page conversion procedure |
| **3** | Permissions matrix — the authorisation source of truth, all 8 surfaces |
| **4** | Decisions log — rulings D1–D16, plus the 2 items still blocked |

**Precedence when sources conflict:**
Part 4 (decisions) → Part 3 (matrix) → Part 1 (agreement) → `docs/architecture/*.docx` → `legacy/`

Part 4 records rulings made *after* the architecture documents were written. Several Open rows
in those `.docx` files are now settled, and two are settled differently from the recommendation
printed in the doc. When a `.docx` and this file disagree, this file wins.

---

# PART 1 · Working Agreement

You are working on the JJR Consulting internal Hub. Read this file fully before your first
edit in any session. It is not background reading; it is the standard.

---

### 1. The one rule that outranks everything

**Authorisation is enforced on the server. The front-end never decides who sees what.**

Every architecture document in `docs/architecture/` says a version of this sentence. It is
the reason the project exists in this shape.

Concretely, in this codebase:

- A section the current user may not see is **absent from the API response**. It is not
  rendered and hidden. It is not fetched and discarded. The bytes never leave the server.
- `{user.isLeadership && <FinancialStats />}` is a **bug**, not a guard. If you write a
  conditional render on a sensitive section, you have implemented the vulnerability the
  architecture was written to prevent.
- Client-side role checks are permitted for **one** purpose: not showing a person a control
  that would fail. They are cosmetic. They are never the boundary.

If a task seems to require the client to decide access, stop and ask. Do not improvise.

#### The specific trap in this repo

`legacy/` contains the original Tailwind mockups. In those files **every section is present
in the DOM and all data is hardcoded**. That was correct for a design prototype and is
catastrophic as an app.

> **The mockups supply layout, styling, and interaction feel. They supply nothing else.**
> Every data path, every access decision, and every fetch is rebuilt from
> `docs/architecture/`. Never port a data path out of a mockup.

---

### 2. Stack

| Layer | Choice |
|---|---|
| Front-end | React + TypeScript, built with Vite |
| Styling | Tailwind (real build, not CDN) + CSS custom properties for the design tokens |
| Auth | Entra ID / OIDC (MSAL) |
| API tier | Owns the permission engine; **all** authorisation lives here |
| App DB | Postgres / Azure SQL |
| Documents | SharePoint via Microsoft Graph, security-trimmed |
| External | QuickBooks, Planner, Outlook, Teams presence, Power BI — by reference only |

The hub is a standalone SPA. It is **not** an SPFx webpart and not a SharePoint-hosted page.
SPFx was considered and rejected: it is client-side, so it cannot enforce the permission
engine this architecture requires.

---

### 3. The permission engine

Two functions, defined once, called everywhere. Defined in the API tier.

```
can(user, capability, resource) -> boolean      // single-resource gate
scopeFilter(user, entityType)   -> query clause // list-narrowing, applied before fetch
```

`scopeFilter` runs **before** the query, not after. Never fetch a full set and filter it in
memory — that pulls unauthorised rows into application memory and one logging mistake leaks
them.

#### Scope kinds

Permission is always a capability **on a resource**, never a role in the abstract.

| Scope | Resolved by |
|---|---|
| Self | Identity |
| Project | `ProjectMembership` + explicit `AccessGrant` |
| Practice | Practice assignment |
| Community | `CommunityMembership` (+ steward flag) |
| CAB ring | `CABMembership` (Rings 1/2/3) |
| Firm | Functional role |

A project lead reaches **only** the projects they are on or have been granted. Never all
projects. This has been wrong in enough systems that it is worth restating.

#### Roles vs capabilities vs status — do not conflate

- **Functional roles:** Consultant · Project lead · Practice lead · PMO · Firm leadership
- **Capabilities (layered on top of any role):** Editor (**firm-wide**, D5) · `HUB_ADMIN` ·
  Community lead/steward (per community) · CAB Chair
- **Status flags (not roles):** onboarding / new-hire status (D3)
- **Manager scope:** ⛔ **undefined — blocked, see Part 4 B1.** Do not
  implement anything depending on "my team" until this is resolved.

A consultant can be a community steward. A practice lead can be a plain member. Model
capabilities as grants, never by widening a functional role.

Full matrix: **Part 3**. It is the source of truth. If the matrix and a
component disagree, the matrix wins and the component is a bug.

**Precedence order** when sources conflict:
Part 4 → Part 3 → `docs/architecture/*.docx` → `legacy/`

The decisions log records rulings made after the architecture documents were written. Several
Open rows in those `.docx` files are now settled, and two are settled *differently* from the
recommendation printed in the doc.

---

### 4. Build order

From the App Architecture Flows document. Build vertical slices in dependency order — do not
build all of one layer before starting the next.

0. **Walking skeleton first.** Sign in (Entra/OIDC) → resolve identity + grants →
   `GET /api/projects` with `scopeFilter` → open project via `can('view')` → list files from
   SharePoint via Graph. One thin path, deployed end to end. This proves identity, engine,
   and content seams once, up front.
1. Permission engine — foundation, everything calls `can()` / `scopeFilter()`
2. Scoped read — projects, milestones, counts, health
3. Request-access + review — the Deny branch; approval writes an `AccessGrant`
4. Native content — discussions, comments, lessons learned
5. Tracked work — action tracker, onboarding progress
6. Targeted messaging — Action Needed, notifications, announcements
7. Orchestrated events — Meeting Hub (Graph + Power Automate behind seams)
8. Cross-cutting — edit mode, profile three-face render (recombines 1–7)

Do not start a page conversion whose data dependencies sit at a later stage than the work
already shipped.

---

### 5. Component conventions

- **Primitives before pages.** Shared UI lands in `src/components/ui/` first. Never
  reimplement a button, card, tile, tag, modal, or empty state inside a page component.
- **Semantic HTML.** The mockups are ~318 `<div>`s with zero `<main>`, `<section>`, or
  `<header>`. Conversion is the moment to fix this. Landmarks, real headings in order, real
  `<button>` elements. Given JJR's accessibility posture this is a requirement, not polish.
- **No imperative DOM.** The mockups use `getElementById`, `innerHTML`, and manual class
  toggling. That logic is **rewritten** as React state, not ported. If a converted component
  contains `getElementById` or `dangerouslySetInnerHTML`, it was ported wrong.
- **Design tokens only.** Colours, fonts, and spacing come from the token layer. No raw hex
  in components. Tokens are in `src/styles/tokens.css`, derived from the mockups' CSS
  custom properties.
- **The locked-tile pattern is deliberate.** Restricted areas stay visible with a dignified
  request-access state — never a 404, never a silently missing nav item. Discoverable but
  enforced. Use the shared `<RequestAccess />` component; it files an `AccessRequest`.

#### Design tokens (from the mockups, confirmed)

```
navy #1B365D   navy-deep #0F2340   navy-mid #2A4A78
green #4CBB17  green-dark #3da312  green-bright #7de852
pink #E91E8C   amber #E8A838
off-white #F8F7F4  warm-gray #F0EEEA  stone #E5E2DC
rule #D0CCC4   text-secondary #5A6B80   text-muted #8A95A5

display: 'Playfair Display', Georgia, serif
body:    'IBM Plex Sans', -apple-system, sans-serif
mono:    'IBM Plex Mono', 'SF Mono', monospace
```

The mockups use Playfair/IBM Plex while JJR's *document* brand standard is Aptos/Segoe UI.
**Settled (D16): the Hub keeps the mockup type.** It is a product surface, not a document.
Do not "correct" it to the document standard.

---

### 6. Data placement — three buckets

Before writing any fetch, identify which bucket the data belongs to. Getting this wrong
produces duplicated state and silent divergence from the system of record.

| Bucket | Contains | Rule |
|---|---|---|
| **App DB** | Structured records with relationships and rules | The hub owns these |
| **SharePoint (Graph)** | Documents and existing firm content | Served security-trimmed; hub links, never copies |
| **External by reference** | QuickBooks, Planner, Outlook, Teams, Power BI | The hub **points**; the source system owns and governs |

The hub **stores no hours** and stores no task state. Log Hours is an SSO deep-link into
QuickBooks. Progress % is derived from Planner. If you find yourself writing a schema for
something owned externally, stop.

`Milestone` is a first-class App DB entity surfaced in three places (home context bar,
notifications, projects list). One dataset, three views. Never model it three times.

---

### 7. Status keys in the architecture docs

The docs mark every row. Respect them.

- **Confirmed** — decided; build it
- **Proposed** — recommended, awaiting sign-off; build behind a flag or ask
- **Open** — undecided; **do not implement**, do not guess a default
- **Pending** — not yet analysed

If a task requires an **Open** row, stop and surface it. Silently picking a default on an
Open decision is how an architecture drifts away from what was agreed.

**Most Open rows are now resolved** — check Part 4 before treating anything
as blocked. Only two remain open (B1 manager scope, B2 past deliverables) plus the JEDI-CAB
cohort program, which is Pending analysis rather than awaiting a decision.

---

### 8. Definition of done for a converted page

A page is not done until all of these hold:

- [ ] Sensitive sections are **omitted server-side**, verified by inspecting the raw API
      response as a low-privilege user — not by looking at the rendered UI
- [ ] Every list endpoint applies `scopeFilter` before the query
- [ ] Every single-resource route re-checks `can()` — access is never inherited from the
      list that linked to it
- [ ] No new colour, spacing, or type value outside the token layer
- [ ] No `getElementById`, no `innerHTML`, no `dangerouslySetInnerHTML`
- [ ] Landmarks and heading order are correct; interactive elements are keyboard-reachable
- [ ] Restricted areas show the request-access state, not an error or a blank
- [ ] Rows marked **Open** are not silently implemented
- [ ] `npm run build` and `npm run typecheck` pass

---

### 9. Repo layout

```
src/
  components/ui/      shared primitives — build these first
  components/         composed, still page-agnostic
  features/<page>/    page-specific composition only
  lib/permissions/    client-side cosmetic helpers ONLY (never the boundary)
  styles/tokens.css   design tokens
docs/
  architecture/       the original .docx set — reference for humans, never edit
  specs/<page>.md     per-page extracted specs (SOP Stage 0 output)
legacy/               original Tailwind mockups — reference for layout ONLY
```

---

### 10. When to stop and ask

Stop and ask rather than proceeding if:

- The task needs a row marked **Open**
- The architecture and a mockup disagree (**the architecture always wins** — but flag it)
- A change would put an access decision in the client
- A new entity seems needed that is not in any data-placement table
- Something is required from a later build stage than the work already shipped

---

# PART 2 · SOP — Converting a Page from Mockup to React

**Scope:** one page, start to finish. Run this same procedure for every page so the eighth
conversion looks like the first.

**Prerequisite:** the walking skeleton is deployed and the permission engine exists. Until
then there is nothing correct to build a page against.

---

### Before you start: the pairing rule

Every page has two inputs and they are **not** equal in authority.

| Input | Supplies | Authority |
|---|---|---|
| `legacy/<page>.html` | Layout, visual styling, interaction feel | Cosmetic only |
| `docs/architecture/<page>.docx` | Roles, sensitivity, data placement, flows | **Authoritative** |

Where they conflict, the architecture wins — every time, without exception. The most common
conflict is the important one: the mockup renders a section that the architecture says must
never reach that user.

---

### Stage 0 — Extract the spec (do this in Claude chat, not Claude Code)

Before touching the repo, turn the page's `.docx` into a machine-checkable spec. Produce
`docs/specs/<page>.md` containing:

1. **Section inventory** — every section on the page, with its access row from Artifact 1
2. **Sensitivity table** — from Artifact 2, each item tagged with its classification
3. **Data sources** — from Artifact 3, each section mapped to App DB / SharePoint / External
4. **Flows** — from Artifact 4, with every `[backend check]` preserved as an explicit step
5. **Open rows** — anything marked Open, listed separately as *do not implement*

This stage is analysis, not code. Do it in chat where iterating is cheap and you can compare
across pages. Then commit the result into the repo so Claude Code can read it.

---

### Stage 1 — Classify every section

For each section, assign exactly one **delivery class**. This single decision determines the
implementation, so make it explicitly rather than letting it emerge.

| Class | Meaning | Implementation |
|---|---|---|
| **A — Universal** | Everyone gets it | Plain render, no gate |
| **B — Scoped set** | Everyone gets the section, contents narrowed | `scopeFilter` before query |
| **C — Omitted** | Some users must never receive the bytes | Server omits from response entirely |
| **D — Locked-visible** | Everyone sees it exists; contents restricted | Shell renders; `<RequestAccess />` in place of contents |
| **E — External** | Owned by another system | Deep-link only; store nothing |

**The class C test:** *if this reached the wrong person's browser, would that be an
incident?* If yes, it is class C, and it must never be a conditional render.

Worked examples from the docs:

- Exec & Strategy hero financials → **C** (the doc marks non-leadership as "not sent")
- Exec & Strategy page shell + restricted badge → **D**
- My Profile contact & emergency contact → **C** for colleagues, A for owner
- Active Projects portfolio list → **B**
- Log Hours → **E** (QuickBooks; the hub stores no hours)
- Start Here checklist content → **A** (content is identical per scenario; only *progress* is personal)
- Communities discussion previews → **A**; full threads → **C** for non-members

Note the Start Here subtlety: the scenario selector is *cosmetic personalisation*, not
access. The doc is emphatic — "the scenario is a lens, not a lock." Anyone may view the
People Manager scenario. Only the manager **actions** are gated. Do not let a view preference
drift into an access mechanism.

---

### Stage 2 — API contract before components

Write the endpoint contract and get it reviewed **before** any JSX exists. Once components
exist, the shape of the response tends to get retrofitted to whatever the UI already assumed,
which is how class C sections quietly become conditional renders.

For each endpoint specify: the `scopeFilter` clause, which fields are omitted for which
viewer relationships, and which `can()` check guards it.

Include the **negative** cases in the contract — what a non-leader's response to
`GET /api/exec-strategy` looks like. That absence is the security property. Write it down and
test it.

---

### Stage 3 — Harvest primitives

Before writing page components, check `src/components/ui/` for what already exists. If the
page needs a primitive that is not there, build it there first — never inline in the page.

Recurring primitives across the eight surfaces (identified from the mockups): tile/card, stat
block, section header with kicker, tag/pill, avatar + avatar stack, empty state, locked state
+ request-access, modal, slider/carousel, filter bar, progress indicator, notification item.

The single largest failure mode in this kind of conversion is forty divergent button
implementations. It is much cheaper to prevent than to fix.

---

### Stage 4 — Convert the markup

- Rebuild structure semantically. Do not preserve the `<div>` nesting; preserve the *visual
  result*. `<main>`, `<section>`, `<nav>`, `<header>`, heading order, real `<button>`s.
- Move every hardcoded value into props or fetched data. Nothing from the mockup's `posts`
  array or inline markup survives as content.
- Rewrite interaction as React state. Every `getElementById` and `classList.toggle` in the
  mockup becomes state. Do not port it.
- Map inline SVGs (there are 86 in the home mockup) into an icon component set. Do not paste
  raw SVG into page components.
- Replace CDN Tailwind with the real build. Custom CSS from the `<style>` block moves into
  either token-driven utility classes or scoped component styles — not a global stylesheet.

---

### Stage 5 — Verify

Verification is done against the **API response**, not the rendered page. A correct-looking
UI is compatible with a total data leak, which is precisely the failure this architecture is
designed to prevent.

1. Sign in as a low-privilege user (or stub the identity).
2. Call each endpoint and read the **raw JSON**.
3. Confirm every class C section is **absent** — not `null`, not empty, not present-and-empty.
4. Confirm every class B list contains only in-scope rows.
5. Deep-link directly to a restricted resource, bypassing the list. Confirm `can()` denies it.
   Access must never be inherited from the list that linked to it.
6. Run the accessibility pass: keyboard traversal, landmark order, heading order.
7. Confirm no **Open** row was implemented.

Step 5 catches the most common real-world hole: the list is scoped correctly, but the detail
route trusts that anyone holding the ID must have been given it.

---

### Stage 6 — Record what moved

Append to Part 4 anything the conversion surfaced: a mockup/architecture
conflict, a missing entity, an Open row that blocked work. These accumulate across pages and
several are hub-wide rather than page-local.

---

### Recommended page order

Not the order the docs were written. This order front-loads the pages that prove the hardest
mechanisms while the engine is still malleable.

| # | Page | Why here |
|---|---|---|
| 1 | **Active Projects** | The walking skeleton's own page. Membership + AccessGrant + Graph documents. Proves class B. |
| 2 | **Home** | Composition-heavy; reuses the projects scope and surfaces Milestone. Proves the primitive library. |
| 3 | **Exec & Strategy** | Smallest surface, strictest gate. Proves class C and D cleanly, in isolation. |
| 4 | **My Profile** | Three-face render. The hardest single page — do it once C is proven. |
| 5 | **Communities** | Introduces community scope, orthogonal to functional roles. |
| 6 | **PMO Hub** | Mostly class A; introduces targeted messaging and LessonLearned. |
| 7 | **Start Here** | Depends on onboarding status (Open) and the LMS decision (Open). |
| 8 | **JEDI-CAB app** | Largest new entity set; three rings. Effectively an app, not a page. |

Start Here is deliberately late despite being an onboarding page: two of its decisions are
still Open and both are hub-wide. Building it early would force a guess that then propagates.

---

### Where to do each stage

| Stage | Surface | Reason |
|---|---|---|
| 0 — Extract spec | **Chat** | Cross-document analysis; cheap iteration; no repo state needed |
| 1 — Classify | **Chat** | Judgement call per section; benefits from discussion |
| 2 — API contract | **Chat**, commit to repo | Design work; must be reviewable before code exists |
| 3 — Primitives | **Claude Code** | Filesystem, build loop, checking what already exists |
| 4 — Convert | **Claude Code** | Reads mockup + spec from disk, writes components, runs build |
| 5 — Verify | **Claude Code** | Runs the server, calls endpoints, reads raw responses |
| 6 — Record | Either | Small |

The dividing line: **chat decides, Claude Code builds.** Anything requiring judgement across
many documents belongs in chat. Anything requiring the filesystem, the build, or the run loop
belongs in Claude Code.

Do not paste code between the two. Commit the artifacts from stages 0–2 into the repo and let
Claude Code read them from disk alongside `CLAUDE.md`.

---

# PART 3 · Consolidated Permissions Matrix

Derived from the eight architecture documents, **updated with the August 2026 rulings** in
`decisions-log.md`. Decision IDs (D1–D16) mark rows that changed. **This is the source of
truth for authorisation.** If a component and this file disagree, the component is a bug.

Phase 1 is employee-only. Client and public visitors exist in the model as placeholders and
are neither built nor enforced.

---

### 1. Actor model

Three independent axes. Never collapse them into a single `role` string — several pages
depend on a person being high on one axis and low on another.

#### Functional roles (exactly one per person)
`CONSULTANT` · `PROJECT_LEAD` · `PRACTICE_LEAD` · `PMO` · `LEADERSHIP`

#### Capabilities (zero or more, layered on any role, scoped)
| Capability | Scope | Notes |
|---|---|---|
| `EDITOR` | **Firm-wide (D5)** | Covers thought leadership, PMO methodology, JJR Material, Knowledge Spotlight, Topics, Directory. Keep the grant list short; audit quarterly. |
| `HUB_ADMIN` | Firm | IT is staff + this capability, **not** a functional role (D4) |
| `COMMUNITY_STEWARD` | One community | The community-lead capability |
| `CAB_CHAIR` | JEDI-CAB | |

A consultant may be a community steward. A practice lead may be a plain member. Model these
as grants; never widen a functional role to express one.

#### Status flags (not roles, not capabilities)
| Flag | Effect |
|---|---|
| `onboardingStatus` | Drives the Start Here gate and the scenario smart-default. **(D3 — status flag, not a role.)** Pacing only (D10): never the sole protection for a section. |
| `managerOf` | ⛔ **UNDEFINED — blocked (B1).** Required by training verification (D2), the Start Here gate, and Compliance Hub oversight. Do not implement. |

#### System actor
The application itself, calling Graph and running background sync. Named and in scope.

---

### 2. Scope resolution

Permission is a capability **on a resource**. Every backend check answers: *does this user
hold this capability on this resource?*

| Scope | Resolved by | Applies to |
|---|---|---|
| Self | Identity | Profile, progress, calendar, hours |
| Project | `ProjectMembership` + explicit `AccessGrant` | Projects, milestones, project docs |
| Practice | Practice assignment | Practice-lead visibility |
| Community | `CommunityMembership` (+ steward) | Discussions, resources, events |
| CAB ring | `CABMembership` → Ring 1 / 2 / 3 | JEDI-CAB modules |
| Viewer relationship | owner / **teammate** / colleague / privileged (D6, D7) | My Profile only — four faces, not three |
| Firm | Functional role | Firm-wide content |

**Project access is membership plus grants — never role-implied.** A project lead reaches
only their own projects.

---

### 3. Sensitivity classification

| Tier | Delivery rule | Examples |
|---|---|---|
| `HIGHLY_CONFIDENTIAL` | Omit server-side; leadership + explicit grant only | Financial model, board deck, risk register, hiring plan, live KPIs |
| `CONFIDENTIAL` | Omit server-side outside scope | Client relationships, project records, deliverables, equity audit, strategy pillars |
| `SENSITIVE_PERSONAL` | Self + privileged only; omit for peers | Contact & emergency contact, HR & compliance, hours & billing, time/allocation |
| `INTERNAL` | Scoped, varies by content | Notifications, milestones, community posts, access requests |
| `LOW_INTERNAL` | All employees | Directory, firm content, methodology, templates, community records |

Community discussion **content and previews** are class C for non-members (D14).

**Anything at `SENSITIVE_PERSONAL` or above is delivery class C** — omitted from the response.
Never a conditional render.

---

### 4. Legend

`●` view · `◐` view (self / scoped) · `✎` edit / manage · `↗` external system ·
`○` **none — not sent** · `—` n/a

`○` on a sensitive row means the bytes are absent from the response. It does not mean hidden.

---

### 5. Page matrices

#### 5.1 Home

| Section | Consultant | Project lead | Practice lead | PMO | Leadership | Editor/Admin | Class | Status |
|---|---|---|---|---|---|---|---|---|
| Nav — primary links | ● | ● | ● | ● | ● | ○ | A | In review |
| Nav — training menu | ● | ● | ● | ● | ● | ○ | A | In review |
| Nav — notifications | ◐ | ◐ | ◐ | ◐ | ◐ | ✎ | B | Proposed |
| Nav — Admin / Hub Actions | ○ | ○ | ○ | ○ | ○ | ● | D | Proposed |
| Context — greeting & date | ● | ● | ● | ● | ● | — | A | Confirmed |
| Context — milestones this week | ◐ | ◐ | ◐ | ◐ | ◐ | — | B | Proposed |
| My Stuff — Log Hours | ↗ | ↗ | ↗ | ↗ | ↗ | — | E | Confirmed |
| My Stuff — My Tasks | ↗ | ↗ | ↗ | ↗ | ↗ | — | E | ⚠ **Case B (D10)** — only protection is the onboarding flag. Needs real scoping. |
| My Stuff — Reporting | ◐ own slice | ◐ own projects | ◐ | ● | ● | — | B/E | **D8** |
| My Stuff — My Calendar | ↗ | ↗ | ↗ | ↗ | ↗ | — | E | Confirmed |
| Resources — Consultant Directory | ● | ● | ● | ● | ● | ✎ | A | Confirmed |
| Resources — Compliance Hub | ◐ | ◐ | ◐ | ● | ● | ✎ | B/C | Proposed |
| Resources — Client Hub | ◐ | ◐ | ◐ | ● | ● | ✎ | C | Confirmed scope |
| Resources — Past Deliverables | ? | ● | ● | ● | ● | — | C | ⛔ **Blocked (B2)** — do not implement |
| JJR Material | ● | ● | ● | ● | ● | ✎ | A | Confirmed |
| Knowledge Spotlight | ● | ● | ● | ● | ● | ✎ | A | Confirmed |
| Jenna's Thought Leadership | ● | ● | ● | ● | ● | ✎ | A | Confirmed |
| Topics | ● | ● | ● | ● | ● | ✎ | A | Proposed |
| Projects (slider) | ◐ | ✎ | ◐ | ● | ● | — | B | Proposed |
| Knowledge | ● | ● | ● | ● | ● | ✎ | A | Confirmed |
| Communities | ◐ | ◐ | ◐ | ● | ● | ✎ | B | Confirmed |

Milestones are **always personal** ("my week") even for leads and PMO.

#### 5.2 Active Projects

| Section | Consultant | Project lead | Practice lead | PMO | Leadership | Editor/Admin | Class | Status |
|---|---|---|---|---|---|---|---|---|
| Portfolio list (cards) | ◐ | ◐ | ◐ | ● | ● | — | B | Confirmed |
| Filters — My / All | ● | ● | ● | ● | ● | — | A | Confirmed |
| Hero & context counts | ◐ | ◐ | ◐ | ● | ● | — | B | Proposed |
| Quick links — Files / Planner / SOW | ◐ | ◐ | ◐ | ● | ● | — | B/E | Confirmed |
| Upcoming milestones (30d) | ◐ | ✎ | ◐ | ● | ● | — | B | Proposed |
| Portfolio health | ◐ | ◐ | ◐ | ● | ● | — | B | Proposed |
| Request project access | ● | ● | ● | ● | ● | — | A | Confirmed |
| Create project | ○ | ○ | **○** | ✎ | ✎ | ✎ | — | **D9 — PMO/Leadership/Admin only** |
| Edit project | ○ | ✎ | ◐ | ✎ | ✎ | — | — | Proposed |

The My/All filter is **client-side over an already-scoped set**. "All" means everything in
the user's scope, not everything in the firm.

#### 5.3 Exec & Strategy — strictest gate in the hub

| Section | All employees | Leadership + granted | Admin | Class | Status |
|---|---|---|---|---|---|
| Page shell / hero / restricted badge | ● | ● | ● | D | Confirmed |
| Access gate + Request Access | ✎ | — | ✎ | D | Confirmed |
| Hero financial stats | ○ | ● | ● | **C** | Proposed |
| Strategic Pillars 2026 | ○ | ● | ● | **C** | Confirmed |
| Firm Roadmap 2026 | ○ | ✎ | ● | **C** | Confirmed |
| Performance dashboard / KPIs | ○ | ● | ● | **C** | Confirmed |
| Key Documents | ○ | ● | ● | **C** | Confirmed |
| Leadership-team roster | **●** | ● | ● | **A** | **D15 — visible to all** |
| Strategic-idea feedback | ○ | ✎ | ● | C | Proposed |
| Grant access / manage | ○ | ● | ✎ | — | Proposed |

Every content row is class C. A non-leader's response contains the shell and their own
access request — nothing else.

#### 5.4 My Profile — **four faces** (D6, D7)

The architecture document describes three. D7 adds **teammate** — a colleague who shares a
project. "Squad" is settled as **privileged staff only** (D6): leadership / IT / HR. Project
teammates are *not* squad.

| Section | Owner | Teammate | Colleague | Privileged | Class | Status |
|---|---|---|---|---|---|---|
| Identity — name, title, photo | ● | ● | ● | ● | A | Confirmed |
| Bio & pronouns | ✎ | ● | ● | ● | A | Confirmed |
| Expertise & skills | ✎ | ● | ● | ● | A | Proposed |
| Past project highlights | ● | ● | ● | ● | A | Proposed |
| **Shared-project context** | ● | **●** | ○ | ● | B | **D7** |
| **Availability** | ✎ | **●** | ○ | ● | B | **D7** |
| Contact & emergency contact | ✎ | ○ | ○ | ● | **C** | D6 |
| Documents · HR & compliance | ● | ○ | ○ | ● | **C** | D6 |
| Projects tab — allocation, time, stats | ● | ○ | ○ | ● | **C** | D6 |
| Edit mode | ✎ | ○ | ○ | ○ | — | Confirmed |
| Settings — notifications | ✎ | ○ | ○ | ○ | **C** | Confirmed |
| Privacy & visibility toggles | ✎ | ○ | ○ | ○ | **C** | Confirmed |
| Manage / delete profile | ○ | ○ | ○ | ✎ | — | Proposed |
| Message this person | — | ✎ | ✎ | ✎ | E | Proposed |

**Field ownership differs within one page** — treat the profile as a blend of four systems,
not one editable form:

| Ownership | Fields |
|---|---|
| Entra (read-only mirror) | name, email, title, phone, reports-to, joined, office |
| Self-editable (App DB) | bio, pronouns, expertise tags, photo, emergency contact |
| Admin-assigned (App DB) | role, service line |
| Derived | project highlights, allocation, stats |

Privacy toggles are applied **server-side at read time**, combined with the viewer
relationship. Never client-side.

#### 5.5 Communities — membership scope, orthogonal to functional role

| Section | Any employee | Member | Steward | Leadership/Admin | Class | Status |
|---|---|---|---|---|---|---|
| Community directory | ● | ● | ● | ● | A | Confirmed |
| Discussion previews (titles) | ○ | ● | ● | ● | **C** | **D14 — members-only** |
| Full discussions + replies | ○ | ✎ | ✎ | ● | **C** | Confirmed |
| Post / reply | ○ | ✎ | ✎ | ○ | — | Confirmed |
| Top Resources | ● | ● | ✎ | ● | A | Proposed |
| Deposit artifact | ○ | ✎ | ✎ | ○ | — | Proposed |
| Key Experts | ● | ● | ✎ | ● | A | Proposed |
| Join a community | ✎ request | — | ✎ approve | ✎ fallback | A | **D12/D13 — request-to-join via AccessRequest** |
| Upcoming Events | ● | ● | ✎ | ● | A | Proposed |
| Your Communities | ◐ | ◐ | ◐ | ◐ | B | Confirmed |
| Request a new community | ✎ | ✎ | ✎ | ✎ | A | Proposed |
| Steward / moderation | ○ | ○ | ✎ | ✎ | — | Confirmed |

Note leadership can **read** full discussions but not post — a rare shape. Do not simplify it.

#### 5.6 PMO Hub

| Section | All employees | PM / Project lead | PMO | Leadership | Class | Status |
|---|---|---|---|---|---|---|
| Hero + ops stats | ● | ● | ● | ● | A | Proposed |
| PMO announcements | ● | ● | ✎ | ● | A | Proposed |
| Project lifecycle | ● | ● | ✎ | ● | A | Confirmed |
| Governance & best practices | ● | ● | ✎ | ● | A | Confirmed |
| Lessons learned — browse | ● | ● | ● | ● | A | Confirmed |
| Lessons learned — submit | ✎ | ✎ | ✎ | ✎ | A | Proposed |
| Review calendar | ● | ● | ✎ | ● | A/B | Proposed |
| PMO contacts | ● | ● | ● | ● | A | Confirmed |
| PM templates | ● | ● | ✎ | ● | A | Confirmed |
| Improve the PMO | ✎ | ✎ | ✎ | ● | A | Proposed |

Financial-gate reviews within the calendar are scoped to PMO + Leadership.

#### 5.7 Start Here — onboarding status, not functional role

| Section | New hire | Onboarded | Manager/Lead | Admin/HR | Class | Status |
|---|---|---|---|---|---|---|
| Scenario selector | ✎ | ✎ | ✎ | ✎ | A | Confirmed |
| Welcome video / hero | ● | ● | ● | ● | A/E | Confirmed |
| Checklist content | ● | ● | ● | ● | A | Confirmed |
| Checklist progress (ticking) | ✎ | ✎ | ✎ | ● | B | Proposed |
| Compliance / mandatory training | ◐ | ◐ | ✎ team | ● | B | **D1/D2** — manager verifies. ⛔ Depends on B1. |
| Tools & policy cards | ● | ● | ● | ● | A/E | Confirmed |
| Locked 'Advanced Access' gate | ◐ | ● | ● | ✎ | D | Proposed |
| Resources / next steps | ● | ● | ● | ● | A | Confirmed |
| Onboarding buddy link | ● | ● | ● | ✎ | B | Proposed |
| Manager actions | ○ | ○ | ✎ | ● | — | Proposed |
| Access / project-request items | ✎ | ✎ | ✎ | ✎ | A | Confirmed |

**The scenario is a lens, not a lock.** Anyone may select any scenario and read its
checklist. Only the *actions* it points to are gated. The Advanced Access gate is
progressive disclosure — pacing — while each section still enforces its own normal scoping.

#### 5.8 JEDI-CAB app — three rings

Ring 1 = all employees (mission, decisions log, roster) · Ring 2 = CAB members, leadership,
admin · Ring 3 = cohort members.

| Module | Leadership | Admin | CAB Chair | CAB Member | Cohort | Everyone else | Status |
|---|---|---|---|---|---|---|---|
| Enter workspace | ● | ● | ● | ● | ◐ | ○ | Confirmed |
| Topics & cases (view) | ● | ● | ● | ● | ● | ● | Proposed |
| Discussion / comments | ✎ | ✎ | ✎ | ✎ | ○ | ○ | Confirmed |
| Assignments | ✎ | ✎ | ✎ | ● | ○ | ○ | Confirmed |
| Meeting Hub (view) | ● | ● | ● | ● | ◐ | ● | Proposed |
| Create / schedule meeting | ✎ | ✎ | ✎ | ○ | ○ | ○ | Confirmed |
| Add to calendar | ● | ● | ● | ● | ● | ● | Confirmed |
| Notes email after event | ✎ | ✎ | ✎ | ○ | ○ | ○ | Confirmed |
| Archive meeting / event | ✎ | ✎ | ○ | ○ | ○ | ○ | Confirmed |
| Action tracker (view) | ● | ● | ● | ● | ◐ | ● | Proposed |
| Create / assign action | ✎ | ✎ | ✎ | ○ | ○ | ○ | Confirmed |
| Update action status | ✎ | ✎ | ✎ | ◐ | ○ | ○ | Confirmed |
| Decisions log | ✎ | ◐ | ● | ● | ● | ● | Proposed |
| Cohort program | ● | ✎ | ● | ● | ✎ | ● | **Pending** |
| CAB & cohort requests | ● | ✎ | ● | ● | ● | ◐ | Confirmed |

Topic summaries are Ring 1; the full case is Ring 2. Action status: the assignee updates
their own; chair/leadership/admin update any.

---

### 6. Shared mechanisms — implement once

Several pages describe the same mechanism in different words. Build each once, behind a seam.

| Mechanism | Used by | Entity |
|---|---|---|
| Request access + quarterly review | Home, Projects, Exec, JEDI-CAB, Communities | `AccessRequest` → `AccessGrant` |
| Targeted messaging | Notifications, Action Needed, PMO announcements | shared messaging engine |
| Meeting lifecycle | JEDI-CAB Meeting Hub, Community events, PMO reviews | Graph calendar + Power Automate |
| Native discussion | Communities, JEDI-CAB, lessons learned | `DiscussionSource` seam |
| Locked-visible state | Every restricted surface | `<RequestAccess />` |
| Milestone | Home context bar, notifications, Active Projects | one `Milestone` dataset |

---

### 7. Entity index

**Core:** `ProjectMembership` · `AccessGrant` · `AccessRequest` · `Project` · `Milestone` ·
`Client` · `Practice` · `Notification` · `FeaturedTopic`

**Communities:** `Community` · `CommunityMembership` · `Post` · `Resource` ·
`CommunityRequest`

**JEDI-CAB:** `CABMembership` · `Topic` · `Comment` · `Assignment` · `Decision` · `Action` ·
`Meeting` · `AsyncInput` · `Cohort` · `CohortMembership` · `MentorPairing` · `Capstone` ·
`CABRequest` · `CohortApplication`

**PMO:** `LessonLearned` · `PMOAnnouncement` · `ReviewEvent`

**Training (new — required by D1):** `TrainingRequirement` (item, gating?, renewal interval) ·
`TrainingCompletion` (user × requirement + **verifiedBy, verifiedAt, method** — audit fields
are mandatory under D2)

**Onboarding:** `OnboardingProgress` · `BuddyAssignment` · tour completion flag

**Profile:** privacy settings · notification settings · emergency contact

---

# PART 4 · Decisions Log

Decided in session, August 2026. Supersedes the Open rows in the source architecture
documents. Where a decision here differs from a `.docx`, **this file wins** — the architecture
docs are the original analysis, this is the ruling.

Two items remain blocked and are listed first.

---

### BLOCKED — with Jenna

#### B1 · Manager scope — what does "my team" mean at JJR? ⛔ HIGHEST PRIORITY

**Blocks:** training verification · Start Here Advanced Access gate · Compliance Hub oversight ·
Start Here manager actions

A chain created by two earlier decisions. Training now lives in SharePoint/Stream (D1), which
means nothing issues a completion record, so verification became a human act. That act was
assigned to managers (D2). But the actor model has no Manager — the functional roles are
Consultant, Project lead, Practice lead, PMO, Leadership.

The candidate answer is the Entra `manager` / reports-to attribute, which the My Profile
document already mirrors read-only. That would need no new entity.

**But the prior question is organisational, not technical:** does JJR actually run on
reporting lines? If people organise by project and practice rather than by line management,
then "manager confirms for their team" may not describe anything real, and the honest fix is a
different verifier — not a manufactured hierarchy. Put it to Jenna that way.

#### B2 · Past Deliverables — consultant view?

**Blocks:** one row on the Home page (conversion order #2)

Can a consultant see a self-scoped view of their own contributions, or is Past Deliverables
leads-and-up only? Not fatal to the Home conversion — the row stays unimplemented while the
rest proceeds — but worth resolving before reaching it.

---

### RESOLVED

#### Foundations

| ID | Decision | Ruling |
|---|---|---|
| D1 | Mandatory training location & tracking | **SharePoint / Stream + App DB progress.** No LMS procurement. |
| D2 | Who marks a gating item verified | **Manager confirms for their team.** ⚠ Depends on B1. |
| D3 | "New hire" — role or status | **Status flag on Consultant.** Not a functional role. |
| D4 | "IT" — role or capability | **`HUB_ADMIN` capability** on a staff account. Not a functional role. |
| D5 | Editor capability granularity | **Firm-wide.** Not per-area. |

**D1 consequence — new entities required.** With no LMS, the hub owns completion tracking:

- `TrainingRequirement` — the item, whether it gates, its renewal interval
- `TrainingCompletion` — user × requirement, plus **verifiedBy, verifiedAt, method**

The audit fields are not optional. D2 puts verification in the hands of the person who most
wants their report unblocked, so the record needs to show who confirmed what and when.
Admin/HR retain an override and an oversight view.

**D5 consequence.** One Editor grant covers thought leadership, PMO methodology, JJR Material,
Knowledge Spotlight, Topics, and the Consultant Directory. Keep the grant list short and audit
it in the quarterly access review. Firm-wide is the grant that cannot be partially revoked —
revisit if the Editor population grows past a handful. Steward and CAB Chair remain scoped and
are unaffected.

#### Access & scope

| ID | Decision | Ruling |
|---|---|---|
| D6 | "Squad" definition (My Profile) | **Privileged staff only** — leadership / IT / HR. |
| D7 | Shared-project colleague | **Availability + shared-project context.** No squad fields. |
| D8 | Reporting owner / reviewer | **Leadership + PMO + leads (own projects); consultants see own slice.** |
| D9 | Who may create a project | **PMO + Leadership + Admin only.** Practice leads may not. |
| D10 | Advanced Access gate | **Pacing only.** Every gated section must carry its own scoping. |

**D6 + D7 consequence — the profile has four faces, not three.** The architecture describes
owner / colleague / privileged. D7 adds **teammate**. The profile endpoint now resolves four
viewer relationships:

| Face | Receives |
|---|---|
| Owner | Everything + edit mode + settings |
| Teammate (shares a project) | Public profile + availability + shared-project context |
| Colleague | Public professional profile only |
| Privileged (leadership/IT/HR) | Everything except edit; plus manage/delete |

This is a change to the My Profile architecture document, not just a decision — it needs
writing back into the source.

**D10 consequence — the Case B audit.** A "Case B" section is one whose *only* protection is
the onboarding status flag, with no scoping underneath. That is an access control living in an
HR process field, flipped by someone closing a paperwork task rather than making a security
decision.

Audit result from the source documents:

| Section | Status |
|---|---|
| Reporting | ✅ Fixed by D8 — now has real scope |
| Log Hours | ✅ Not gated (everyone, including new hires) |
| My Calendar | ✅ Not gated (anyone with a mailbox) |
| Active Projects | ✅ Already two-layer (membership + grants) |
| **My Tasks** | ⚠ **Case B — needs real scoping added** |

One section to fix, not a sweep.

#### Communities

| ID | Decision | Ruling |
|---|---|---|
| D11 | Member roster visibility | **Visible to all employees.** |
| D12 | Join model | **Request-to-join; steward approves.** |
| D13 | Join request modelling | **Extend `AccessRequest`** with a fallback approver. |
| D14 | Discussion previews | **Members-only.** Nothing visible outside. |

**D12 + D14 stack — confirm this is intended.** Together, a non-member sees that a community
exists, its purpose, steward, roster, and Key Experts — but nothing of what is discussed — and
must request access and wait for a volunteer steward.

The Communities document describes the page as a directory every employee can browse; this is
meaningfully more private than that. It does hold together — the roster and Key Experts let
someone judge a community by *who* is in it rather than *what* is in it — but it reads as more
closed than the mockup implies. Flagged, not overridden.

**D12 + D13 consequences:**

- Stewards become queue owners on top of client work. `AccessRequest` gains a fallback
  approver (leadership/admin) for when a steward is unresponsive, so joins never stall
  silently.
- The mockup's one-click Join needs a **pending** state.
- `CommunityRequest` stays what it is — a request for a *new* community. Join requests are a
  different thing and ride the shared `AccessRequest` loop, inheriting its review-and-grant
  flow and quarterly audit.

#### Exec & Strategy

| ID | Decision | Ruling |
|---|---|---|
| D15 | Leadership roster | **Visible to all.** Everything else stays gated. |

Gating a roster the firm already knows would read as secretive rather than appropriately
restricted — the opposite of the discoverable-but-enforced posture the page is built on.

#### Presentation

| ID | Decision | Ruling |
|---|---|---|
| D16 | Typography | **Keep the mockup type** — Playfair Display + IBM Plex Sans. |

The Hub is a product surface, not a document. JJR's Aptos/Segoe UI document standard continues
to govern deliverables. Two systems, two media, deliberately.

---

### Carried forward from the source docs (Proposed, accepted as written)

No objection raised; build as the documents specify.

- Milestone count scope — always personal ("my week"), even for leads and PMO
- Locked-tile behaviour — restricted tiles stay visible with a dignified request-access state
- Community scope — its own scope, alongside project / practice / firm
- Steward = the community-lead capability
- Project status — lead-maintained App DB field; progress stays Planner-derived
- "All projects" semantics — consultant/lead = their set · practice lead = practice ·
  PMO/Leadership = all
- Portfolio health — scoped to the user's visible portfolio; firm-wide roll-up for leadership
- Milestone "next 30 days" — limited to the user's projects
- Tour completion — lightweight flag in App DB
- Buddy assignment — `BuddyAssignment` entity; Admin/HR assigns
- Onboarding buddy/mentor — relationship tags in the directory
- Scenario persistence — cosmetic preference only, grants nothing
- Checklist completion — self-attest soft items; verify gating items (per D1/D2)
- Privacy enforcement — server-side at read time, by viewer relationship
- Community events — reuse the JEDI-CAB Meeting Hub pattern
- Resource placement — documents → SharePoint, index → App DB
- New-community approval — Leadership/Admin approve, then assign a steward
- Compliance & Client Hub oversight — self-view for all; oversight PMO/Leadership

---

### Still Pending analysis (not a decision — needs a working session)

| Item | Note |
|---|---|
| JEDI-CAB cohort program (Ring 3) | Marked **Pending** in the source: not yet analysed. Needs its own session before the JEDI-CAB app is built. It is last in the conversion order, so this is not yet blocking. |

---

### Surfaced during conversion (append below)

| Date | Page | Issue | Resolution |
|---|---|---|---|
| Aug 2026 | All | Mockups render every section in the DOM with hardcoded data; architecture requires server-side omission | Resolved — `CLAUDE.md` §1 |
| Aug 2026 | Home | 98KB inline base64 image (~37% of the file) | Replace with a real asset reference during conversion |
| Aug 2026 | Profile | Architecture describes three viewer faces; D7 creates a fourth | Write back into the source `.docx` |
| Aug 2026 | Communities | Mockup shows one-click Join; D12 requires a pending state | Mockup change during conversion |