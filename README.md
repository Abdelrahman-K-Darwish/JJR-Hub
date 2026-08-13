# JJR Internal Hub

> **Status:** Active React/Vite rebuild — frontend architecture and governance established; Home visual-parity work is in progress on `feat/home-page`.
>
> **Repository:** `Abdelrahman-K-Darwish/JJR-Hub`
>
> **Last documented checkpoint:** 13 August 2026, branch `feat/home-page`, latest pushed commit `df2f081`.
> **SOP** https://github.com/Abdelrahman-K-Darwish/JJR-Hub/blob/main/docs/JJR-Hub-Comprehensive-SOP-and-Architecture-Handbook.docx

## 1. What this project is

The JJR Internal Hub is an employee-only internal portal for JJRconsulting. The project started from **20 detailed HTML/Tailwind mockups** plus page-specific architecture documents, access concepts, and workflow requirements. The goal is not simply to convert static HTML into React. The goal is to build a maintainable, responsive, permission-aware application that can later connect to production identity, backend, SharePoint/Microsoft Graph, Planner, calendar, QuickBooks, compliance, reporting, and other approved systems without rewriting the UI architecture.

The current frontend stack is:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Vitest + React Testing Library
- mock adapters behind typed service contracts while the production backend is intentionally deferred

The project follows one central rule:

> **Architecture/specification documents govern data, access, security, and business behavior. Legacy HTML governs visual hierarchy, interaction feel, and visual identity where it does not conflict with those rules.**

This README explains **how the project has been developed, what has been completed, why the architecture looks the way it does, and how another developer should continue it safely.**

---

## 2. Where we started

The repository originally contained:

- 20 legacy HTML/Tailwind mockup pages under `legacy/`
- existing React/Vite conversion work under `src/`
- architecture documents under `docs/architecture/`
- page-specific specifications and older conversion notes
- mock data for many pages
- no finalized single development/governance standard tying all sources together

The 20 legacy pages are:

1. Home
2. Start Here
3. My Profile
4. Active Projects
5. Communities
6. Community Detail
7. Templates
8. PMO
9. How We Work
10. Tool Guides
11. Accessibility
12. AI for Good
13. Consultant Directory
14. Environmental Justice
15. Exec & Strategy
16. Under Development
17. Vision & Values
18. Site Owners
19. JEDI CAB
20. Admin · Hub Actions

The important decision made early was **not to throw away the existing React work**. Instead, the repository would be audited, classified, and evolved.

---

## 3. Phase 1 — Final SOP and governance package

The first major project step was to replace the earlier ad-hoc conversion approach with a formal SOP/governance package.

The package established:

- source precedence and conflict handling
- functional roles versus scoped capabilities
- delivery classes for universal/scoped/sensitive/locked/external content
- workflow catalog and workflow diagrams
- page inventory for all 20 pages
- Definition of Done for frontend and production integration
- open-decision register
- repository adoption checklist
- page specification template
- repository keep/refine/replace rules

The permanent operating principle became:

> **Understand → classify → reuse → implement → verify → record.**

### Source authority

When sources disagree, product/access precedence is:

1. Confirmed decisions
2. Access model / explicit permission rules
3. Page-specific architecture documents
4. General hub architecture documents
5. Page specifications
6. Legacy mockups — visual/interaction authority only
7. Existing code — evidence of current implementation, not automatic proof of intended behavior

Development-process authority is:

1. `CLAUDE.md`
2. `JJR-INTERNAL-HUB-SOP.md`
3. supporting governance documents under `docs/`

### Core security rule

The frontend is **never** the production authorization boundary.

Frontend code may hide unavailable actions and render locked states for UX. Production authorization must eventually happen server-side by checking:

`ACTION + RESOURCE + SCOPE + authenticated identity/capability`

For sensitive content, unauthorized bytes must not be returned to the browser at all.

---

## 4. Phase 2 — Repository adoption and audit

After the SOP was adopted, the existing codebase was audited rather than replaced.

The audit found that approximately **15 of the 20 page concepts already had React implementations**, while Home, Start Here, My Profile, Exec & Strategy, and JEDI CAB were not real page implementations at that point.

The audit also identified cross-cutting gaps:

- routing was incomplete
- test infrastructure was incomplete
- data-driven pages imported mocks directly instead of using service seams
- navigation still contained legacy/static href assumptions
- transient build status was mixed with permanent architecture guidance

The outcome was to keep useful converted work and fix the foundation incrementally.

---

## 5. Phase 3 — Foundation stabilization

### Router

A real React Router foundation was added with routes for all 20 planned pages plus aliases such as:

- `/projects` → Active Projects
- `/knowledge` → Templates/knowledge destination
- `/communities/:slug` → reusable Community Detail route

Pages not yet implemented use controlled placeholder routes rather than disappearing from navigation.

### Test baseline

Vitest + jsdom + React Testing Library were introduced using a Vite-compatible Vitest version. The project gained route tests and service/hook tests.

The principle is now:

> A page migration is not complete because it renders. It must also pass type checking, tests, production build, and interaction/accessibility checks appropriate to its scope.

---

## 6. Phase 4 — Active Projects became the first reference pattern

Active Projects was selected as the first serious reference page because it is scoped, data-driven, and linked to the authorization/access-request/project-resource workflows.

The direct-mock pattern was replaced by:

```text
ActiveProjectsPage
        ↓
useActiveProjects
        ↓
ActiveProjectsService
        ↓
activeProjectsMockAdapter   ← current frontend phase
        ↓
mock data

Later:
ActiveProjectsService
        ↓
production API/integration adapter
```

Key outcomes:

- domain types moved into the feature/domain layer
- pages stopped owning transport/data-source assumptions
- `getPortfolio()` and `getMilestones()` became the service contract
- loading/error/filter behavior moved into the hook/controller
- stale async updates were guarded
- service and hook tests were added
- backend authorization was deliberately **not** faked in the hook

This established the first reusable migration pattern:

> **Page → hook/controller → typed domain service → adapter → source**

---

## 7. Phase 5 — Data & Behavior Architecture mapping

After Active Projects, the project needed a cross-page view of data rather than making page-by-page assumptions.

A Data & Behavior mapping layer was introduced to coordinate:

- entities
- source systems
- data ownership
- read/write behavior
- permissions/scoping
- delivery classes
- workflows
- unresolved decisions
- confidence levels

Confidence tags are deliberately preserved:

- `CONFIRMED`
- `PROPOSED`
- `DERIVED`
- `OPEN`
- `MISSING`

The mapping layer is a coordination index, not a new source of truth. If a derived map conflicts with a higher-authority architecture document or confirmed decision, the higher-authority source wins.

### Important backend decision

The production backend technology remains intentionally **OPEN** (`D-001`). Frontend service contracts must remain transport-neutral until that decision is made.

---

## 8. Phase 6 — Internal navigation migration

Legacy/static links were audited and only destinations that were clearly internal application navigation were converted to React Router links.

Confirmed examples included:

- My Profile links
- Community directory → `/communities/:slug`
- Start Here contextual links

Potential business actions and uncertain external/document destinations were deliberately **not** converted blindly. Examples left alone until their semantics are confirmed include join actions, request-access actions, document/resource links, project quick links, and unresolved project detail links.

This reflects another project rule:

> A URL-looking string is not automatically navigation. It may represent a business action, external system, document resource, same-page anchor, or unresolved destination.

---

## 9. Phase 7 — Communities shared-domain service seam

Communities and Community Detail became the second reference architecture pattern.

Instead of creating two separate services, both pages share one domain service:

```ts
interface CommunitiesService {
  getDirectory(): Promise<CommunitiesDirectory>
  getCommunityDetail(slug: string): Promise<CommunityDetail | null>
}
```

Architecture:

```text
CommunitiesPage
     ↓
useCommunities
     ↓
CommunitiesService.getDirectory()

CommunityDetailPage
     ↓
useCommunityDetail(slug)
     ↓
CommunitiesService.getCommunityDetail(slug)

Both
     ↓
communitiesMockAdapter
```

Key decisions:

- one domain owns both directory and detail reads
- route handling stays outside the domain hook
- separate hooks provide separate page/view-state behavior
- literal mock data stayed unchanged
- sensitive/membership data concerns were documented rather than falsely solved in the frontend
- write workflows such as join, moderation, uploads, and event creation remain separate future concerns

After this phase the test suite had grown to **24 passing tests**.

---

## 10. Phase 8 — Remaining-page architecture classification

Before creating service seams for every page, all remaining pages were classified by the minimum architecture they actually need.

The key outcome was **not to mass-refactor every page into Page → Hook → Service → Adapter**.

The current architectural families are:

- **Full dynamic service seam** — meaningful runtime/scoped/user-specific data
- **Lightweight content/data boundary** — governed data without complex orchestration
- **Static/editorial** — presentation content with no current runtime orchestration need
- **Blocked/spec-first** — important decisions are unresolved
- **External/document-oriented** — another system owns the canonical resource

Examples:

- Home → composition-oriented; reuse existing Project and Community domains
- My Profile → full typed service seam candidate
- Start Here → static content plus future user-progress state; compliance gate remains blocked
- Templates / Tool Guides → external/document source decision required; do not guess SharePoint details
- PMO → mixed page; Lessons Learned is the clearest dynamic seam candidate
- Exec & Strategy → restricted architecture intended, implementation blocked by `D-004`
- JEDI CAB → restricted/dynamic architecture intended, blocked by `D-015`
- Admin · Hub Actions → architecture likely dynamic/admin, but specification must come before implementation

This classification is maintained separately from transient page completion status.

---

## 11. Phase 9 — Home page specification

Home was chosen as the next real page because it proves a third architecture pattern: **composition without domain duplication**.

The approved rule is:

```text
Home owns composition.
Active Projects owns project data.
Communities owns community data.
```

There is intentionally **no `HomeService`**.

Home uses thin presentation/view-model hooks over existing services:

```text
HomePage
 ├─ useHomeProjects
 │     ↓
 │   activeProjectsService
 │
 └─ useHomeCommunities
       ↓
     communitiesService
```

The Home specification also froze several important boundaries:

### Implement

- navigation/shell
- greeting/context treatment
- milestone summary from approved existing data
- projects without the unresolved progress representation
- Communities summary
- My Stuff confirmed links
- Consultant Directory entry
- JJR Material / editorial content
- Knowledge Spotlight
- Thought Leadership
- Priority Topics

### Stub

- Client Hub — existence is confirmed but backing source is missing

### Defer

- Compliance Hub (`D-003`)
- Past Deliverables (`D-014`)
- unresolved Reporting behavior

### Open

- Home project-progress semantics: the Home architecture describes Planner-derived progress while Active Projects uses milestone-derived progress. Home therefore does **not** display a progress value until this conflict is formally resolved.

---

## 12. Phase 10 — Home implementation and visual-parity work

The first React Home implementation was functionally correct but visually too simplified compared with the rich legacy mockup. The workflow was therefore changed:

> Preserve the approved data/security architecture, but treat the legacy Home HTML as the visual acceptance reference.

The Home presentation was substantially rebuilt to restore:

- compact context treatment
- 2×2 Your Hub quadrants
- Jenna's Thought Leadership editorial carousel
- Priority Topics
- Active Projects cards
- Knowledge Spotlight
- Communities of Practice
- Access & Equity/footer treatment
- scroll reveal and reduced-motion behavior
- hover depth and focus/de-emphasis patterns
- slider behavior
- Leadership image/overlay/ambient effects

The project intentionally allows substantial rewrites of presentation components when the current React markup prevents visual parity. What must be preserved is the **domain/service/security architecture**, not a weak previous UI implementation.

---

## 13. gstack design-review workflow

To improve browser-level design verification, gstack skills were added to the development workflow.

The important change is that visual verification is no longer treated as successful merely because:

- the dev server answers HTTP requests, or
- the source code appears correct.

The browser must actually render the page and be inspected.

A gstack design review discovered that scroll-reveal elements could appear blank in a one-shot full-page screenshot because the IntersectionObserver had not been triggered by incremental scrolling. It also found a real slider-layout issue where cards left unused dead space.

The verified slider fix was committed as:

`2913c3b — style(design): FINDING-001 — slider rows leave dead space instead of filling the row`

A robustness follow-up for `RevealOnScroll` is still recommended: reveal animation should **fail open** so important content can never remain permanently invisible because an observer callback fails.

---

## 14. Home extensibility pass

Home sliders were then made ready for future content growth.

A shared `SectionSlider` now supports:

- Priority Topics
- Active Projects
- Knowledge Spotlight
- Communities

It:

- accepts arbitrary item counts
- detects real overflow
- shows arrows only when overflow actually exists
- recalculates on resize/content changes
- supports keyboard navigation
- keeps native mouse/trackpad/touch scrolling
- respects reduced motion
- does not assume exactly three or four cards

Jenna's Thought Leadership remains a specialized data-driven carousel because its interaction is different. It supports an arbitrary article collection and uses adaptive navigation:

- small article count → dots
- larger article count → `N / total` counter rather than dozens of dots

The extensibility work was committed as:

`3565fb7 — feat(home): extensibility for sliders, topics, and leadership carousel`

---

## 15. Current Git checkpoint

At the last saved checkpoint, the feature branch was clean and fully pushed:

```text
df2f081  chore: ignore gstack local state
3565fb7  feat(home): extensibility for sliders, topics, and leadership carousel
2913c3b  style(design): FINDING-001 - slider rows leave dead space instead of filling the row
6970cdc  feat: implement P-01 Home with legacy visual parity
29508e0  Add Home page specification
```

`HEAD` and `origin/feat/home-page` both pointed to `df2f081`, so the work was safely backed up on GitHub.

The Home branch is **not yet ready to merge**. Remaining gates are:

1. complete the exhaustive browser `/design-review`
2. complete `/qa`
3. run `/review`
4. perform final screenshot/visual approval
5. open/merge the Home PR only after those checks

At the latest reported browser verification, the test suite was **40/40 passing**, typecheck was clean, production build succeeded, and `git diff --check` was clean.

---

## 16. Current page/architecture snapshot

| ID | Page | Current implementation direction | Current readiness |
|---|---|---|---|
| P-01 | Home | Composition over existing Project/Community domains | **Implemented on feature branch; visual/QA review in progress** |
| P-02 | Start Here | Static onboarding + future progress state + blocked compliance gate | Real page still to build; D-003/D-013 affect gated sections |
| P-03 | My Profile | Full user-specific typed service seam | Real page still to build; strong architecture source exists |
| P-04 | Active Projects | Full dynamic scoped service seam | **Reference implementation complete** |
| P-05 | Communities | Shared Communities-domain read seam | **Reference implementation complete** |
| P-06 | Community Detail | Same Communities domain; route-driven detail | **Reference implementation complete** |
| P-07 | Templates | External/document-oriented; lightweight boundary later | Existing UI; exact future canonical source still needs specification |
| P-08 | PMO | Mixed editorial + dynamic + external; Lessons Learned seam candidate | Existing UI; targeted sections need later refinement |
| P-09 | How We Work | Static/governed editorial | Existing UI |
| P-10 | Tool Guides | External/document-oriented | Existing UI; exact canonical source not documented |
| P-11 | Accessibility | Governance/editorial | Existing UI |
| P-12 | AI for Good | Static/governed editorial | Existing UI |
| P-13 | Consultant Directory | Dynamic identity/professional directory intended | Existing UI; dedicated architecture/spec should be written before integration |
| P-14 | Environmental Justice | Static/governed editorial | Existing UI |
| P-15 | Exec & Strategy | Restricted service architecture intended | **Blocked by D-004**; placeholder route |
| P-16 | Under Development | Utility page | Existing UI |
| P-17 | Vision & Values | Static/governed editorial | Existing UI |
| P-18 | Site Owners | Lightweight governed ownership directory | Existing UI |
| P-19 | JEDI CAB | Restricted/dynamic governance architecture intended | **Blocked by D-015**; placeholder route |
| P-20 | Admin · Hub Actions | Dynamic/admin architecture likely; capability/audit semantics | Existing UI, but **SPEC FIRST** before deeper implementation |

---

## 17. Data placement summary

Production technology is deliberately not selected yet, but logical ownership is defined.

| Data/domain | Canonical logical owner | Hub treatment |
|---|---|---|
| Identity, name, email, photo | Microsoft Entra ID | Read through identity/auth integration; do not make Hub source of truth |
| Roles, tags, memberships, grants | Application Data Store | Backend-authoritative capability/scope decisions |
| Project records and membership | Application Data Store | Scoped read service |
| Project documents/SOW/deliverables | SharePoint where defined | Security-trimmed references/deep links; do not duplicate canonical files |
| Planner tasks/progress | Microsoft Planner | Integration/deep-link seam; Home progress conflict remains open |
| Milestones | Project/Application domain | Reused by Active Projects/Home through the project service |
| Community membership/directory | Application Data Store | Directory broad; participation membership-scoped |
| Community discussions | Application Data Store | Members-only writes; sensitive payload must be scoped server-side later |
| Community resources/files | SharePoint + app index | File canonical externally, metadata/index in app domain |
| Events/calendar | Outlook/Teams via Microsoft Graph | Authorized integration seam |
| Profile editable/private fields | Application Data Store + approved upstream systems | Viewer relationship determines payload; privacy enforced server-side later |
| Hours/finance | QuickBooks / approved finance source | External system remains authoritative |
| Compliance/training | **OPEN — D-003** | Do not implement verified compliance gate until source is decided |
| Strategy KPIs | **OPEN — D-008** | Do not embed production numbers until reporting source is approved |
| Access requests/grants | Application Data Store | Shared auditable workflow |
| Lessons learned | Application Data Store linked to projects | PMO/project closeout workflow |
| Admin Hub Actions | Future application domain; semantics still spec-first | Do not treat frontend capability checks as authorization |
| Static/editorial content | Local/static now or governed source later | Preserve source-confidence tags; do not invent SharePoint locations |

---

## 18. Delivery classes

Every meaningful section should be classified before production integration:

- **A — Universal:** every authenticated employee may receive it.
- **B — Scoped set:** the section exists broadly, but returned records differ by scope.
- **C — Omitted:** unauthorized users must not receive the bytes.
- **D — Locked-visible:** users may know the resource exists but must not receive restricted content.
- **E — External:** another system owns the canonical record/content.

Examples:

- Active Projects → B
- sensitive profile fields → C
- Exec & Strategy locked shell → D + C for actual payload
- SharePoint documents / Planner / Outlook → E

---

## 19. Workflow catalog

The hub uses shared workflow IDs rather than duplicating business logic per page:

- WF-001 — Sign-in & identity resolution
- WF-002 — Authorization & scoped resource access
- WF-003 — Shared access request & approval
- WF-004 — Project portfolio → project resource
- WF-005 — Onboarding & advanced-access gate
- WF-006 — Community join & participation
- WF-007 — Knowledge artifact submission
- WF-008 — Event/calendar creation
- WF-009 — Profile view/edit & privacy scope
- WF-010 — Leadership restricted area
- WF-011 — Project closeout & lessons learned
- WF-012 — CAB topic → decision → action
- WF-013 — Admin Hub Action publishing

The source SVG diagrams live under `docs/workflows/`.

---

## 20. Open decisions that must not be guessed

Current decision register includes:

- D-001 production backend technology
- D-002 production authentication library/flow
- D-003 mandatory training/compliance source
- D-004 exact Leadership membership rule
- D-005 who may create projects
- D-006 project status ownership — proposed
- D-007 community join policy
- D-008 strategy KPI source
- D-009 expiry for exceptional restricted grants — proposed
- D-010 global search source/index — deferred
- D-011 notification persistence/read-state model — deferred
- D-012 project detail page — deferred
- D-013 manager/team scope for onboarding verification
- D-014 Past Deliverables visibility for consultants
- D-015 JEDI CAB cohort/ring-3 behavior

If a feature requires an OPEN decision, keep that part reversible or defer it. Do not let an implementation agent choose the business rule.

---

## 21. How to work on a page

Before implementation:

1. Read `CLAUDE.md`.
2. Read `JJR-INTERNAL-HUB-SOP.md`.
3. Read source authority/access/delivery-class rules.
4. Read the page inventory row.
5. Read referenced workflow(s).
6. Read page-specific architecture/specification.
7. Open the matching `legacy/*.html` mockup.
8. Inspect current React components/services before creating anything new.
9. Identify OPEN/MISSING decisions.
10. State exact files to change.

During implementation:

1. reuse meaningful existing components
2. keep domain data behind typed service contracts
3. keep presentation-specific shaping outside the domain service
4. preserve loading/error/empty/restricted behavior
5. never encode mock role checks as production authorization
6. preserve legacy visual/interaction intent where it does not violate approved architecture
7. make responsiveness/accessibility part of the build, not post-build cleanup

After implementation:

```bash
npm run test
npm run typecheck
npm run build
git diff --check
git status
```

Then perform browser-level visual/interaction review.

---

## 22. Browser/design verification workflow

For visually rich pages, the recommended workflow is now:

```text
Implement against approved page spec
        ↓
Visual parity against legacy HTML
        ↓
/design-review
        ↓
Fix verified visual issues
        ↓
/qa
        ↓
Fix interaction/responsive/accessibility issues
        ↓
/review
        ↓
Final screenshots + human approval
        ↓
PR / merge
```

Do not use an HTTP header check as proof that a page visually renders correctly.

---

## 23. Git workflow used by this project

Work is performed on focused branches, then merged into `main` after verification.

Examples used so far include:

- SOP/governance adoption branch
- `refactor/internal-link-navigation`
- `refactor/communities-service-seam`
- `docs/remaining-page-classification`
- `feat/home-page`

Typical flow:

```bash
git switch main
git pull
git status

git switch -c <feature-branch>
git push -u origin <feature-branch>

# work + verify

git add <approved-files>
git commit -m "..."
git push

# PR → review → merge

git switch main
git pull
git status
```

Never start the next major page while local `main` is stale or dirty.

---

## 24. Definition of Done

### DoD-A — Frontend migration complete

A page must have:

- working route
- approved shell/layout
- meaningful component reuse
- typed domain data
- mocks outside page composition
- relevant workflow behavior
- documented delivery classes where relevant
- loading/empty/error/restricted states where needed
- mobile/tablet/desktop verification
- keyboard/focus/semantic checks
- no change-caused console errors
- passing applicable tests/typecheck/build
- meaningful deviations from legacy documented

### DoD-B — Production integration complete

Later, production integration also requires:

- approved authentication
- backend authorization
- Class C bytes absent when unauthorized
- Class B data scoped before return/aggregation
- direct resource authorization re-check
- approved external integrations
- timeout/failure/partial-integration handling
- audit requirements where applicable
- negative security tests

Do not claim DoD-B while the backend is intentionally deferred.

---

## 25. Key repository documentation

Read these first:

- `CLAUDE.md`
- `JJR-INTERNAL-HUB-SOP.md`
- `docs/SOURCE-AUTHORITY.md`
- `docs/ACCESS-MODEL.md`
- `docs/DELIVERY-CLASSES.md`
- `docs/PAGE-INVENTORY.md`
- `docs/WORKFLOW-CATALOG.md`
- `docs/DEFINITION-OF-DONE.md`
- `docs/decisions/OPEN-DECISIONS.md`
- `docs/DATA-AND-BEHAVIOR-MAP.md`
- `docs/DATA-SOURCE-CATALOG.md`
- `docs/REMAINING-PAGE-CLASSIFICATION.md`
- `docs/specs/PAGE-SPEC-TEMPLATE.md`
- page-specific specs such as `docs/specs/active-projects.md` and `docs/specs/home.md`
- authoritative page architecture sources under `docs/architecture/`

For a consolidated human-readable version of the SOP, matrices, workflows, open decisions, and diagrams, see:

**`docs/JJR-Hub-Comprehensive-SOP-and-Architecture-Handbook.docx`**

---

## 26. What to do next

When work resumes:

1. stay on `feat/home-page`
2. finish the exhaustive Home `/design-review`
3. make `RevealOnScroll` fail-open if the final review confirms the robustness requirement
4. run `/qa`
5. run `/review`
6. capture final Home screenshots and approve visual parity
7. push final fixes
8. open/merge the Home PR
9. sync `main`
10. proceed to the next approved page — currently My Profile / Start Here sequencing should follow the maintained classification/status documents rather than this README if priorities change

---

## 27. Important maintenance rule

This README explains project history and the current handoff. It should be updated after major milestones, but it must not replace the formal governance files.

- SOP = how the project must be developed
- decision register = what is unresolved/confirmed
- page specs = what a specific page must do
- project status/classification = where implementation currently stands
- this README = orientation, history, and practical handoff
