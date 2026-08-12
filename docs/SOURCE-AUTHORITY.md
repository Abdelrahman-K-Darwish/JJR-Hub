# JJR Hub — Source Authority

## Purpose

Prevent architecture drift when mockups, older architecture documents, specs, decisions, and current code disagree.

## Product / access precedence

Use this order:

1. **Confirmed decisions** — `docs/decisions/OPEN-DECISIONS.md` rows marked `CONFIRMED`.
2. **Access model / explicit permission rules** — `docs/ACCESS-MODEL.md` plus approved matrices/decisions.
3. **Page-specific architecture documents** — existing files in `docs/architecture/`.
4. **General hub architecture documents** — app-wide architecture sources.
5. **Page specs** — working implementation specifications in `docs/specs/`.
6. **Legacy mockups** — `legacy/*.html`, visual/interaction authority only.
7. **Existing code** — evidence of current implementation, not automatic proof of intended business behavior.

## Development-process authority

For how work is performed:

1. `CLAUDE.md`
2. `JJR-INTERNAL-HUB-SOP.md`
3. supporting governance documents in `docs/`

These do not silently override product requirements. If a process rule conflicts with an approved business requirement, record the conflict.

## Pairing rule for every page

Each migrated page has two primary inputs:

- **Architecture/spec** → purpose, roles, sensitivity, data ownership, workflows.
- **Legacy HTML** → layout, visual identity, hierarchy, interaction feel.

Never copy access logic or data ownership assumptions from the mockup.

## Conflict handling

When sources disagree:

1. Identify both sources.
2. Apply the precedence above only when the higher source is clearly authoritative.
3. If ambiguity remains, add an `OPEN` decision.
4. Use the safest reversible implementation.
5. Do not label an assumption `CONFIRMED`.
