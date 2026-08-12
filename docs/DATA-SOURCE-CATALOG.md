# JJR Hub — Data Source Catalog

Derived coordination document, companion to `docs/DATA-AND-BEHAVIOR-MAP.md`. Not primary
authority — see `docs/SOURCE-AUTHORITY.md`. Organized per-system rather than per-page.

## 1. Purpose

`docs/DATA-AND-BEHAVIOR-MAP.md` indexes every page and asks "what does this page show, and
where does it come from." This file inverts the question: for each of the systems the hub's
architecture documents actually name, what does it hold and which pages touch it. Use it to
answer "if the Application Data Store's schema changes, which pages are affected" or "does
anything actually depend on SharePoint yet" without re-reading eight documents.

Confidence tags (CONFIRMED / PROPOSED / DERIVED / OPEN / MISSING) follow the same definitions as
`docs/DATA-AND-BEHAVIOR-MAP.md` §1.

## 2. Application Data Store

Backend-agnostic term. D-001 (production backend technology) is OPEN — this catalog and the map
never name a specific database product.

| Entity | Pages that touch it | Status |
|---|---|---|
| Project | P-01 (doc), P-04 (spec, CONFIRMED), P-08 (lesson links) | CONFIRMED |
| Milestone | P-01, P-04 | CONFIRMED |
| ProjectMembership / AccessGrant | P-01, P-04, P-15, P-19 | CONFIRMED |
| AccessRequest | P-01, P-04, P-05, P-15, P-19 | CONFIRMED |
| Client / Practice | P-01, P-04 | CONFIRMED |
| Community | P-05, P-06 (derived) | CONFIRMED (P-05), DERIVED (P-06) |
| CommunityMembership | P-05, P-06 (derived) | CONFIRMED (P-05), DERIVED (P-06) |
| Post / Discussion (DiscussionSource) | P-05, P-06 (derived), P-19 | CONFIRMED (P-05, P-19), DERIVED (P-06) |
| LessonLearned | P-08 | CONFIRMED |
| CABMembership | P-19 | CONFIRMED |
| ConsultantProfile (app-owned fields: role, bio, pronouns, expertise, privacy settings) | P-03, P-01 (directory tile), P-13 (derived) | CONFIRMED (P-03), DERIVED (P-13) |
| HubAction | P-20 | MISSING — no architecture doc names this entity; inferred only from the page's documented publish behavior and PROJECT-STATUS's gap note |
| ProjectLink | P-04 | CONFIRMED |
| CommunityRequest | P-05 | PROPOSED |
| StrategicIdea | P-15 | PROPOSED |
| BuddyAssignment | P-02 | PROPOSED |
| OnboardingProgress | P-02 | PROPOSED |
| Topic / Case / Comment / Assignment / Decision / Action / Cohort / MentorPairing / Capstone / CABRequest / CohortApplication | P-19 | CONFIRMED entity, D-015 (OPEN) blocks Ring-3/cohort implementation |
| Compliance/training progress | P-02, P-03 | OPEN — D-003 undecided (LMS vs. Application Data Store) |
| Tour completion flag | P-01 | PROPOSED |
| Chosen scenario (view preference) | P-02 | PROPOSED — "App DB or client," undecided which |

Undocumented entities referenced only informally by page content (e.g., whatever backs P-07
Templates or P-10 Tool Guides) are **MISSING** — see §6.

## 3. SharePoint

No architecture document names a specific SharePoint site, library, list, or content type for
any page. Every reference below is to "SharePoint" as a category, generically, per the source
document's own wording — never a named library.

| Page | What's said to live there | Library/list named? | Status |
|---|---|---|---|
| P-01 Home | JJR Material, Knowledge, client documents, past deliverables, compliance policies | No | CONFIRMED existence (generic), MISSING (specific library) |
| P-03 My Profile | HR & compliance docs, personal documents | No | CONFIRMED existence, MISSING (library) |
| P-04 Active Projects | Project document folder, SOW | No | CONFIRMED existence, MISSING (library) |
| P-05 Communities | Community knowledge resources/artifacts | No | PROPOSED existence, MISSING (library) |
| P-08 PMO | Lifecycle/governance pages, templates (SOW, budget, status, closeout) | No | CONFIRMED existence, MISSING (library) |
| P-15 Exec & Strategy | Board deck, financial model, risk register, hiring plan, equity audit — "restricted SharePoint library" | Named only as "restricted," not by actual library name | CONFIRMED existence, MISSING (exact library name) |
| P-19 JEDI CAB | Agendas, notes, bios, templates, capstone documents | No | CONFIRMED existence, MISSING (library) |
| P-07 Templates | Implied by PAGE-INVENTORY's "don't duplicate canonical resources" rule only | No | DERIVED existence, MISSING (system) |
| P-10 Tool Guides | Implied by PAGE-INVENTORY's "surface canonical guide/video sources" rule only | No | DERIVED existence, MISSING (system) |
| P-02 Start Here | Welcome video (Stream, not SharePoint, for video specifically), guides, "How We Work", policy documents | No | CONFIRMED existence, MISSING (library) |
| P-09, P-11, P-12, P-14, P-16, P-17, P-18 | Not named at all | — | MISSING — do not infer SharePoint for these pages |

**Do not treat "SharePoint" as confirmed-with-details anywhere in this hub's documentation.**
Every row above that says "CONFIRMED existence" means only that a source document names
SharePoint as the conceptual home for that content category — never that a specific
list/library/site has been created or agreed.

## 4. Microsoft Graph

**No hub-wide Microsoft Graph authorization model exists.** `docs/ACCESS-MODEL.md` does not
mention Graph anywhere. This is an OPEN/MISSING gap at the hub level — there is no confirmed rule
for how Graph calls should be authorized in general.

The only actually-documented Graph dependency is **page-specific and delegated/user-context**:

| Page | Graph usage | Status |
|---|---|---|
| P-04 Active Projects | Project documents read from SharePoint via Graph, called under the user's own delegated permission — spec explicitly warns: "Never call Graph with an application-level identity here... that would bypass SharePoint's own trimming." | CONFIRMED, page-specific |
| P-15 Exec & Strategy | Restricted key-document library read via Graph, security-trimmed | CONFIRMED, page-specific |
| P-19 JEDI CAB | Graph creates the Outlook calendar event on meeting creation | CONFIRMED, page-specific |
| P-03 My Profile | Identity fields mirrored from Entra/M365 via Graph; Teams presence read for availability | CONFIRMED, page-specific |
| P-01 Home | Directory tile reads Teams presence via Graph (per doc); calendar deep-links (not necessarily a Graph call, may be a plain link) | CONFIRMED (presence), unclear (calendar deep-link mechanism) |
| P-05 Communities | Proposed Graph calendar integration for events (reuses "JEDI-CAB Meeting Hub pattern") | PROPOSED, page-specific |
| P-08 PMO | Proposed Graph calendar integration for review scheduling | PROPOSED, page-specific |

**Do not promote any of the above to a hub-wide rule.** Each page's Graph dependency must be
modeled independently until (or unless) a hub-wide Graph authorization document is written and
approved.

## 5. External systems by name

Only systems actually named in source documents. Confidence reflects each document's own status
marking for that reference.

| System | Referenced by | Purpose | Status |
|---|---|---|---|
| QuickBooks | P-01 (doc), P-03 (doc), P-15 (doc, hero financial stats) | Hours/billing (deep-link, hub stores nothing); referenced as a possible KPI source for Exec & Strategy | CONFIRMED (hours/billing use), PROPOSED (as a KPI source for P-15) |
| Microsoft Planner | P-01 (doc), P-04 (spec) | Tasks/dashboard deep-link; progress-percentage derivation per the Home docs (both v0.1 and v0.3) | CONFIRMED (deep-link), CONFIRMED-but-conflicting (as progress source — see `docs/DATA-AND-BEHAVIOR-MAP.md` §4 conflict #1, since P-04's spec overrides this with milestone-based progress for Active Projects specifically) |
| Entra / M365 | P-01, P-03, P-13 (derived), P-19 | Identity mirror (name, title, email, reports-to); OIDC sign-in | CONFIRMED |
| Microsoft Teams | P-01, P-03, P-13 (derived) | Presence/availability (via Graph); messaging (P-03's "Message this person") | CONFIRMED (presence), PROPOSED (messaging action) |
| Outlook / M365 Calendar | P-01, P-05, P-08, P-19 | Calendar deep-links and event creation | CONFIRMED (P-01, P-19), PROPOSED (P-05, P-08) |
| Power BI | P-08 PMO doc — "Financial dashboards (governance)... External — Power BI... referenced for real-time financials" | Governance financial dashboard reference | **PROPOSED, not CONFIRMED** — flagged because it appears only in the PMO doc, unreconciled with P-15's own separate KPI-source proposal (see conflict #2 in the map's §4/§6) |
| Compliance Hub / LMS | P-02, P-03 | Mandatory training/compliance status source | OPEN — D-003, source itself undecided (LMS vs. SharePoint/Stream + Application Data Store progress) |
| Power Automate | P-19 JEDI CAB doc | Post-meeting notes email, triggered on meeting completion | CONFIRMED, page-specific |
| Stream | P-02 Start Here doc | Welcome video hosting | CONFIRMED |

## 6. Static frontend content register

The 8 pages with no dedicated architecture document, plus P-06 and P-13 which are derived-only
(no dedicated doc of their own). For each: current mock file (verified to exist under
`src/mocks/`) and intended future source, which is **MISSING** for the no-doc pages — do not
infer SharePoint or any other storage system for them merely because the content reads as
editorial or document-oriented.

| Page | Current mock file | Intended future source | Basis |
|---|---|---|---|
| P-09 How We Work | `src/mocks/howWeWork.ts` | MISSING | PAGE-INVENTORY Key rule only: "Use governed editorial components" — says nothing about storage |
| P-10 Tool Guides | `src/mocks/toolGuides.ts` | MISSING (system) — existence of an external canonical source DERIVED from PAGE-INVENTORY's "surface canonical guide/video sources" rule | See `docs/DATA-AND-BEHAVIOR-MAP.md` P-10 entry |
| P-11 Accessibility | `src/mocks/accessibility.ts` | MISSING | PAGE-INVENTORY Key rule only |
| P-12 AI for Good | `src/mocks/aiForGood.ts` | MISSING | PAGE-INVENTORY Key rule only |
| P-14 Environmental Justice | `src/mocks/environmentalJustice.ts` | MISSING | PAGE-INVENTORY Key rule only |
| P-16 Under Development | `src/mocks/underDevelopment.ts` | None needed — confirmed permanently static utility stub | PAGE-INVENTORY Key rule: "Temporary destination only" (the page's *role* is temporary, not its data source) |
| P-17 Vision & Values | `src/mocks/visionValues.ts` | MISSING | PAGE-INVENTORY Key rule only |
| P-18 Site Owners | `src/mocks/siteOwners.ts` | MISSING | PAGE-INVENTORY Key rule only |
| P-06 Community Detail | `src/mocks/communityDetail.ts` | Application Data Store + SharePoint (DERIVED from P-05 Communities doc — no dedicated doc for P-06 itself) | DERIVED only |
| P-13 Consultant Directory | `src/mocks/consultantDirectory.ts` | Entra + Application Data Store (DERIVED from P-01 Home's directory-tile description — no dedicated doc for P-13 itself) | DERIVED only |

P-07 Templates is documented separately in §3 above (DERIVED existence of an external source,
MISSING exact system) rather than repeated here, since it is not purely static in the same sense
— PAGE-INVENTORY explicitly frames it as surfacing an external canonical document set, even
though that set's identity is undocumented.

## 7. Per-system open decisions

Cross-referenced to `docs/decisions/OPEN-DECISIONS.md`. Referenced, not resolved, here.

| System/topic | Open decision | ID | Status |
|---|---|---|---|
| Production backend technology (Application Data Store's actual implementation) | Keep frontend service contracts backend-agnostic until selected | D-001 | OPEN |
| Production authentication library/flow (Entra/OIDC adapter) | Entra ID/OIDC is the identity target; select exact adapter during integration | D-002 | OPEN |
| Compliance Hub / LMS source | Decide authoritative source before verified compliance gating | D-003 | OPEN |
| Leadership membership rule (gates P-15's SharePoint/Graph-fed content) | Define group/rule and explicit exception grants | D-004 | OPEN |
| Who may create projects (affects who can write Project records) | PMO/Leadership/Admin baseline; confirm Practice Lead behavior | D-005 | OPEN |
| Project status ownership (Application Data Store vs. Planner as progress source) | Keep lead-maintained status in app data; external progress source remains separate | D-006 | PROPOSED |
| Community join policy (affects CommunityMembership writes) | Decide instant join vs. request/approval by community | D-007 | OPEN |
| Strategy KPI source (Exec & Strategy vs. PMO conflict, §5 Power BI entry) | Use approved reporting/finance source; do not embed production values | D-008 | OPEN |
| Global search source/index | Define after backend/SharePoint integration decisions | D-010 | DEFERRED |
| Manager/team scope for onboarding verification (affects P-02's Compliance Hub read) | Confirm JJR organizational meaning; do not invent a Manager role | D-013 | OPEN |
| Past Deliverables visibility for consultants (affects SharePoint-sourced document read scope on P-01) | Confirm self-scoped view vs. leads-and-up only | D-014 | OPEN |
| JEDI-CAB cohort/ring-3 behavior (affects the entire Application Data Store entity set in §2's JEDI CAB row) | Requires dedicated analysis before implementation | D-015 | OPEN |

None of these are resolved by this catalog. Where a page's implementation would require
resolving one of them, stop the irreversible part per `docs/decisions/OPEN-DECISIONS.md`'s own
rule and continue only with reversible work.
