# CLAUDE.md — JJR Internal Hub

## 1. Project mode

This repository is an **existing React/Vite migration project**, not a greenfield build.

Do not:
- scaffold a new Vite project over the repository;
- delete or replace `src/` wholesale;
- reconvert pages that already work without first auditing them;
- treat legacy HTML as implementation code;
- implement unresolved business/security rules by guessing.

## 2. Mandatory reading order

Before meaningful work:
1. `JJR-INTERNAL-HUB-SOP.md`
2. `docs/SOURCE-AUTHORITY.md`
3. `docs/ACCESS-MODEL.md`
4. `docs/PAGE-INVENTORY.md`
5. `docs/WORKFLOW-CATALOG.md`
6. workflow SVGs referenced by the page being changed
7. `docs/DELIVERY-CLASSES.md`
8. `docs/decisions/OPEN-DECISIONS.md`
9. relevant page architecture/spec files already in `docs/architecture/` and `docs/specs/`
10. the matching file in `legacy/` for visual reference only

## 3. Source rule

- Confirmed decisions outrank older assumptions.
- Permission/access rules outrank visual mockups.
- Architecture/specs define product behavior.
- Legacy mockups define visual intent and interaction feel only.
- If two authoritative sources conflict, STOP and record the conflict. Do not silently choose.

## 4. Existing-repo adoption rule

Before changing architecture:
1. inspect `package.json` and available scripts;
2. inspect routes, layouts, services, hooks, and shared components;
3. run the existing build/type/lint/test commands that actually exist;
4. compare current implementation with the final SOP;
5. classify findings as `KEEP`, `REFINE`, `REPLACE`, or `OPEN`;
6. make small reversible changes.

## 5. Development rules

- React + TypeScript + Vite + Tailwind remain the baseline unless explicitly changed.
- Reuse before creating.
- Extend before duplicating, but do not over-abstract.
- Shared-looking is not automatically shared-meaning.
- Keep route pages compositional.
- Put business behavior under feature/domain code.
- Put mock/real data behind typed service contracts.
- Components must not care whether the adapter is mock or production.
- Keep mock data outside page components.
- Use stable domain IDs, not array indexes.
- Preserve the JJR design language while fixing accessibility, spacing, responsiveness, and obvious mockup defects.

## 6. Security rules

- Frontend visibility is never authorization.
- Client-side filtering is never authorization.
- Sensitive Class C data must eventually be omitted by the backend, not merely hidden.
- Route guards improve UX only.
- Never hard-code broad `role === 'admin'` / `role === 'leadership'` checks throughout JSX.
- Functional roles and scoped capabilities are separate.
- Use resource/action/scope-aware access decisions.
- Until the backend exists, model authorization states explicitly but do not present mock protection as production security.

## 7. Workflow rule

A page is not a workflow.

For each page:
- identify the referenced workflow IDs;
- preserve the workflow contract;
- do not duplicate shared workflow logic inside multiple page components;
- distinguish business flow from technical integration details.

## 8. Delivery-class rule

Every meaningful section must be understood as one of:
- A — Universal
- B — Scoped set
- C — Omitted/sensitive
- D — Locked-visible
- E — External/system-owned

Read `docs/DELIVERY-CLASSES.md` before implementing restricted/data-driven sections.

## 9. Before coding

Report briefly:
- page/feature being changed;
- source files read;
- workflow IDs involved;
- delivery classes involved;
- existing components/services to reuse;
- files intended to change;
- open decisions or conflicts.

## 10. After coding

Run the repository's existing applicable checks. At minimum, when scripts exist:
- lint;
- type-check;
- tests;
- production build.

Also check:
- mobile/tablet/desktop;
- keyboard behavior;
- loading/empty/error/restricted states;
- console errors;
- no accidental raw hard-coded business data in page components.

## 11. Stop conditions

STOP instead of guessing when:
- a permission rule is unresolved;
- an architecture source conflicts with a confirmed decision;
- a backend-only security rule would be implemented as client-only protection;
- a destructive refactor is proposed without need;
- a new dependency is proposed without a clear requirement;
- existing working code would be discarded solely to match a preferred pattern.

## 12. Current implementation sequence

1. Adopt/audit the existing repository.
2. Stabilize foundation gaps only.
3. Review Active Projects as the reference pattern; do not rebuild it blindly if already converted.
4. Continue remaining pages using approved patterns.
5. Keep project status in `docs/PROJECT-STATUS.md`, not in this file.
6. Integrate production auth/backend later through the existing service seams.
