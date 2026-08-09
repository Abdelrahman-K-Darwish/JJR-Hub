# Spec — Active Projects

SOP Stages 0–2 for the Active Projects page. Source:
`docs/architecture/JJR-Hub-Active-Projects-Architecture.docx`, updated with the rulings in
Part 4 of `CLAUDE.md`.

**Status: unblocked.** Every Open row on this page is resolved. Nothing here waits on B1 or B2.

**Why this page is first.** It *is* the walking skeleton's page. Building it proves identity,
the permission engine, `ProjectMembership` + `AccessGrant`, scoped aggregates, and
SharePoint-via-Graph — the whole hard part of the architecture — on a page whose rules are
fully settled.

---

## 1 · Section inventory & delivery class

| # | Section | Class | Rule |
|---|---|---|---|
| 1 | Portfolio list (cards) | **B** | `scopeFilter` on membership + grants |
| 2 | Filters — My / All | **A** | Client-side, over an already-scoped set |
| 3 | Hero & context counts | **B** | Aggregate computed over the scoped set only |
| 4 | Quick links — Files | **B** | Graph, security-trimmed, per project |
| 5 | Quick links — Planner / Dashboard | **E** | Deep-link; hub stores nothing |
| 6 | Quick links — SOW | **B** | Specific SharePoint document, per project |
| 7 | Upcoming milestones (30 days) | **B** | Scoped aggregate across user's projects |
| 8 | Portfolio health | **B** | Roll-up over the visible set only |
| 9 | Request project access | **A** | Anyone may request |
| 10 | Create project | **—** | `can('project:create')` — PMO / Leadership / `HUB_ADMIN` (D9) |
| 11 | Edit project | **—** | `can('project:edit', project)` |

**No class C sections on this page.** Everything sensitive is class B — the section renders for
everyone, narrowed to what they may see. That is what makes it a good first conversion: it
exercises `scopeFilter` hard without also requiring the omission machinery.

**Class D:** a project the user cannot see does not appear at all. There is no locked card in
the list. The request-access path (§9) is the discoverable route in, not a placeholder card.

### Role grid

| Section | Consultant | Project lead | Practice lead | PMO | Leadership | Admin |
|---|---|---|---|---|---|---|
| Portfolio list | ◐ | ◐ | ◐ practice | ● all | ● all | — |
| Filters | ● | ● | ● | ● | ● | — |
| Hero & counts | ◐ | ◐ | ◐ | ● | ● | — |
| Quick links | ◐ | ◐ | ◐ | ● | ● | — |
| Milestones (30d) | ◐ | ✎ own | ◐ | ● | ● | — |
| Portfolio health | ◐ | ◐ | ◐ | ● | ● | — |
| Request access | ● | ● | ● | ● | ● | — |
| **Create project** | ○ | ○ | **○** | ✎ | ✎ | ✎ |
| Edit project | ○ | ✎ own | ◐ practice | ✎ | ✎ | — |

D9: practice leads may **not** create projects. Changed from the doc's "Open — consider
practice leads."

---

## 2 · Sensitivity

| Data item | Classification | Scope | Lives in |
|---|---|---|---|
| Project records | Confidential | Member/lead · practice lead: practice · PMO/Leadership: all | App DB |
| Client & service line | Confidential | With project access | App DB |
| Project documents (Files, SOW, deliverables) | Confidential | With project access | SharePoint (Graph) |
| Milestones | Internal → Confidential | User's projects | App DB |
| Portfolio-health metrics | Internal | Scoped roll-up | App DB (computed) |
| Progress % | Internal | With project access | Planner (derived) |
| Project access requests | Internal | Requester + admin/owner | App DB |

Client identity is Confidential and appears on every card. There is no "public" view of this
page.

---

## 3 · Data placement

| Data | System of record | Pointer |
|---|---|---|
| `Project` (name, client, practice) | App DB | → SharePoint document folder |
| `Milestone` | App DB | Same dataset as home context bar + notifications |
| `ProjectMembership` / `AccessGrant` | App DB | Drives every scoped query |
| `Client` / `Practice` | App DB | One project → one client, one practice |
| Status (active / in review / wrapping) | App DB | Lead-maintained field |
| Progress % | **Planner** | Derived from task completion — never stored |
| Portfolio health | App DB (computed) | Roll-up, not persisted |
| `AccessRequest` | App DB | → grant creates `AccessGrant` |
| Documents | SharePoint (Graph) | By reference, security-trimmed |
| Tasks & dashboard | **Planner** | Deep-link only |
| Team identity / avatars | Entra + App DB | Membership (DB) + photo (Entra) |

**Do not persist progress % or portfolio health.** Both are derived. Storing either creates a
second source of truth that silently drifts from Planner.

**`Milestone` is shared.** Same entity as the home context bar and notifications. Model it once.

---

## 4 · Flows — backend checks marked

### A · Load the portfolio
1. User opens the page.
2. **[backend check]** resolve identity + project access (membership + grants).
3. Return **only** in-scope projects. Hero counts and portfolio health are aggregates **over
   that set**.
4. Render. My/All filters client-side within the returned set.

### B · Open a project's files
1. User clicks Files on a card.
2. **[backend check]** re-verify access to **that specific project**. Access is not inherited
   from the list that linked to it.
3. Documents load from SharePoint via Graph, security-trimmed. SOW opens a specific document.
   Planner/Dashboard deep-link out.

### C · Request project access
1. Someone assigned off-system opens the page and doesn't see the project.
2. Clicks Request project access → `AccessRequest` (App DB) → admin/owner.
3. Resolved in ~1 business day. On grant, an `AccessGrant` is written and the project appears.

### D · Milestones & portfolio health
1. Sidebar queries milestones due within 30 days **across the user's projects**.
2. Portfolio health rolls up statuses over the visible set.
3. Both recompute per user. Nothing outside scope is counted.

**The counting rule.** A consultant on 3 of 40 projects sees "3 active," not "40." Aggregates
are computed after `scopeFilter`, never before. A global count leaks portfolio size even
without leaking any project.

---

## 5 · API contract

Write and review this before any component exists.

### `GET /api/projects`
- **scopeFilter:** `ProjectMembership.userId = me OR AccessGrant.userId = me`
  - practice lead → `OR project.practiceId IN (my practices)`
  - PMO / Leadership → no narrowing
- **Response:** `{ projects: [...], counts: { active, inReview, wrapping }, health: {...} }`
- `counts` and `health` computed **after** the filter.
- **Negative case:** a user with no memberships gets `{ projects: [], counts: {0,0,0}, health: null }`
  — a legitimate empty state, not a 403.

### `GET /api/projects/:id`
- **can('project:view', id)** — full re-check, independent of any list.
- **Negative case:** `404`, not `403`. A 403 confirms the project exists, which leaks the
  portfolio to anyone who can guess an ID.

### `GET /api/projects/:id/documents`
- **can('project:view', id)** first, then Graph under the **user's own** permission.
- Never call Graph with an application-level identity here — that would bypass SharePoint's
  own trimming and make the hub the weakest link in a chain that is otherwise secured.

### `GET /api/milestones?window=30d`
- Same scopeFilter as `/api/projects`. Scoped aggregate.

### `POST /api/projects`
- **can('project:create')** → PMO, Leadership, `HUB_ADMIN` only (D9).
- **Negative case:** practice lead → `403`.

### `PATCH /api/projects/:id`
- **can('project:edit', id)** → lead on that project · practice lead within practice ·
  PMO/Leadership.

### `POST /api/access-requests`
- Any authenticated employee. Body: `{ resourceType: 'project', resourceId, justification }`.
- Approval writes an `AccessGrant`. Same entity and review loop as every other request path in
  the hub — do not build a project-specific one.

---

## 6 · Entities

`Project` · `Milestone` · `ProjectMembership` · `AccessGrant` · `AccessRequest` · `Client` ·
`Practice`

All exist in the hub-wide model. **This page introduces no new entities** — another reason
it's the right first conversion.

---

## 7 · Primitives to harvest (Stage 3)

From the Active Projects mockup, once supplied:

project card · status pill (active / in review / wrapping) · progress bar · avatar stack ·
filter bar / toggle · stat block (hero counts) · milestone list item · health indicator ·
quick-link row · empty state · request-access CTA

Check `src/components/ui/` first — several of these also appear on the home page mockup.

---

## 8 · Verification (Stage 5)

Against **raw API responses**, not the rendered page.

- [ ] Consultant on 3 of N projects: `/api/projects` returns exactly 3
- [ ] `counts` and `health` reflect 3, not N
- [ ] `/api/milestones?window=30d` contains milestones from those 3 projects only
- [ ] Deep-link to a project ID the user lacks → **404**, not 403, not a redirect
- [ ] `/api/projects/:id/documents` on an out-of-scope project → 404
- [ ] Graph is called as the user, not as the application
- [ ] Practice lead `POST /api/projects` → 403
- [ ] Project lead `PATCH` on someone else's project → 403
- [ ] User with zero memberships → empty state, not an error
- [ ] No `getElementById` / `innerHTML` / `dangerouslySetInnerHTML`
- [ ] Landmarks, heading order, keyboard traversal
- [ ] `npm run build` and `npm run typecheck` pass

The deep-link test is the one that matters most. The list being correctly scoped tells you
nothing about whether the detail route re-checks — and trusting the ID because it came from a
scoped list is the most common way this exact architecture gets broken.

---

## 9 · Open within this page

None. Carried forward as written from the doc:

- Project status → lead-maintained App DB field; progress stays Planner-derived
- "All projects" semantics → consultant/lead = their set · practice lead = practice ·
  PMO/Leadership = all
- Portfolio health → scoped to visible portfolio; firm-wide roll-up for leadership
- Milestone 30-day window → limited to the user's projects
- Access requests → reuse the shared `AccessRequest`; grant writes an `AccessGrant`

**Mockup received:** `legacy/active-projects.html`. See §13 for findings.

---

## 10 · Page decisions (AP1–AP10)

Made in session after reviewing `legacy/active-projects.html`. These are **rulings**, at the
same precedence as Part 4 of `CLAUDE.md`. Two override rows the architecture marked
**Confirmed** — noted as such.

| ID | Decision | Ruling |
|---|---|---|
| AP1 | Team display on cards | **Initials only**, rendered from App DB names. No Graph photo call. |
| AP2 | Progress source | **Milestone-based.** ⚠ Overrides a *Confirmed* row (Planner-derived). |
| AP3 | Milestone weights | **Normalised at read time.** No rebalancing when a milestone is added. |
| AP4 | Milestone completion | **Binary.** Done contributes full weight; no partial completion. |
| AP5 | Zero milestones | **No progress bar** — status pill only. |
| AP6 | Health derivation | **From overdue milestones.** 1 overdue = Needs Attention · 2+ = At Risk · 0 = On Track. |
| AP7 | Health vs status | **Two independent fields.** A project can be Active *and* At Risk. |
| AP8 | Quick links | **Per-project collection** (`ProjectLink`), not three fixed fields. |
| AP9 | Milestones + health | **Right sidebar.** |
| AP10 | Avg. completion | Scoped derived metric over the visible set. |

### AP2 — the override, stated plainly

The architecture says progress % is Planner-derived and marks it **Confirmed**. This page now
computes it from milestones instead.

- **Gains:** no Planner call per card · no stale-data problem · one source of truth
- **Costs:** milestones are lead-maintained and sparse, so progress is only as accurate as
  leads are diligent
- **Propagates:** the Home page doc also describes Planner-derived progress. Home must use the
  same source or the two pages will disagree about the same project.

### AP3 + AP4 — the progress formula

```
progress = Σ(weight of DONE milestones) ÷ Σ(weight of ALL milestones)
```

Normalising at read time means weights never need to sum to 100 and adding a milestone never
forces a rebalance. The trade-off, accepted: **adding a milestone silently lowers the reported
percentage** even though no work was undone. Leads should know that's expected behaviour, not
a bug.

Zero milestones → denominator is zero → no bar (AP5). Guard the divide.

### AP6 + AP7 — health is its own dimension

The architecture calls portfolio health "a roll-up of statuses." The page shows otherwise:
cards carry Active / In Review / Wrapping Up, the sidebar carries On Track / Needs Attention /
At Risk. These are orthogonal.

Health is **computed, never stored and never hand-set** — it derives from overdue milestone
count at read time, so it cannot go stale and no one has to maintain it.

```
overdue = milestones where dueDate < today AND done = false
0 → On Track · 1 → Needs Attention · 2+ → At Risk
```

Portfolio health in the sidebar buckets the user's **visible** projects by this value.

---

## 11 · Revised entity model

| Entity | Change |
|---|---|
| `Milestone` | **+ `weight` (number), + `done` (bool), + `dueDate`** — required by AP2–AP6. Shared entity: home context bar and notifications read the same records. |
| `ProjectLink` | **NEW.** `{ projectId, label, type, target }` — per-project quick links (AP8). Observed in the mockup: Files, Planner, Dashboard, SOW, KT Checklist, EJ Data, RFP Draft, Scorecard, Audit Log, Report. |
| `Project` | No `progress` column. No `health` column. Both computed. |

`Project.status` (Active / In Review / Wrapping) stays a lead-maintained field. `health` is
derived and must **not** be persisted alongside it (AP7).

---

## 12 · Revised API contract deltas

`GET /api/projects` response per project now carries:

```
{
  id, name, client, practice, status,
  progress,            // computed, null when no milestones (AP5)
  health,              // 'on_track' | 'needs_attention' | 'at_risk' (AP6)
  team: [{ id, name, initials }],   // no photoUrl (AP1)
  links: [{ label, type, target }]  // ProjectLink (AP8)
}
```

Top level adds `avgCompletion` — mean of `progress` across the scoped set, **excluding**
projects with null progress (AP10). Including them as zero would drag the average down for
projects that simply haven't been planned yet.

`progress`, `health`, `avgCompletion`, and the health buckets are **all computed after
`scopeFilter`**. Never before.

---

## 13 · Mockup findings — fix during conversion

From `legacy/active-projects.html` (48KB, 584 lines):

| Finding | Action |
|---|---|
| **Counts don't reconcile** — hero shows 6 Active / 2 In Review / 1 Wrapping = 9, but there are 6 cards and the breadcrumb says 6 projects | Almost certainly "6" is the *total* mislabelled as Active. Decide the three buckets and make them sum to the card count. |
| 237 `<div>`, zero `<section>` / `<main>` / `<nav>` / `<header>`; one `<h1>`, no `<h2>`/`<h3>` | Rebuild semantically. Card titles become `<h3>` under section `<h2>`s. |
| 8 `<button>` elements but 18 `.mini-btn` instances | Several quick links are non-button elements. All interactive controls become real `<button>` or `<a>`. |
| Tailwind CDN + inline config | Replace with the real Tailwind build. |
| 3 × `getElementById`, 2 × `querySelector`, 4 listeners (~2KB JS) | Rewrite as React state — filter toggle, profile panel, visible count. Small; no `innerHTML` anywhere. |

**Good news:** this page is far cleaner than the home mockup. Minimal JS, no `innerHTML`, no
inline base64. The conversion is mostly structural.

---

## 14 · Primitive inventory (Stage 3)

Derived from the mockup's repeated class clusters. Counts show reuse within this page alone.

| Primitive | Reuse | Notes |
|---|---|---|
| `MiniButton` | 18× | The quick-link control. Renders from `ProjectLink`. |
| `ProjectCard` | 6× | Composite of the below |
| `SectionKicker` | 6× | Mono, uppercase, letterspaced — the client · practice line |
| `CardTitle` | 6× | Playfair display, navy |
| `AvatarStack` | 6× | Initials only (AP1), with `+N` overflow |
| `ProgressTrack` | 6× | 3px bar; renders nothing when progress is null (AP5) |
| `StatusPill` | 6× | Active / In Review / Wrapping Up |
| `DateTile` | 5× | Day-over-month block in the milestone list |
| `StatBlock` | 3× | Hero counts |
| `FilterBar` | 1× | Status filter + My/All toggle |
| `HealthBar` | 1× | Three-bucket roll-up |
| `RequestAccessPanel` | 1× | Shared — also used on Home, Exec, Communities |

`MiniButton`, `AvatarStack`, `StatusPill`, `StatBlock`, and `RequestAccessPanel` all recur on
other pages. Build them in `src/components/ui/`, not in `features/active-projects/`.
