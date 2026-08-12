# JJR Hub — Workflow SVGs

## Rule

A page is not automatically a workflow.

A dedicated SVG is maintained when the workflow scores 4+ using:
- multiple actors;
- permission/security decision;
- branch/decision;
- data write/change;
- cross-system integration;
- meaningful denial/failure;
- reuse across pages.

## Reading diagrams

Treat diagrams as **logical contracts**.

- Business steps should remain stable.
- Technical adapters may change when the backend/integration stack is finalized.
- Any named system of record from approved architecture remains authoritative until changed by a confirmed decision.
- Do not convert a backend authorization step into client-only logic.
