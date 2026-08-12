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
