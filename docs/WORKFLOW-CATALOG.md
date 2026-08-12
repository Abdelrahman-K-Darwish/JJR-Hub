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
