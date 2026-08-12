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
