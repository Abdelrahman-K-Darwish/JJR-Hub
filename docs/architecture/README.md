# docs/architecture/ — Version Authority Index

Purpose: record which architecture document is authoritative for current
implementation decisions when more than one version exists for the same
page. This file does not restate content — see docs/SOURCE-AUTHORITY.md
for the general precedence rule.

## Known version pairs

- Home / Phase 1: `JJR-Hub-Phase1-Architecture-v0_3.docx` is the current
  authority for overlapping Home/Phase-1 implementation decisions.
  `JJR-Hub-Phase1-Architecture-Home-Page.docx` is historical/superseded
  for those same decisions and is retained for historical reference only.
  Note: decision states differ between the two documents (some rows Open
  in the Home-Page doc are Confirmed in v0.3) — this is a superseded
  historical difference, not an active unresolved architecture conflict.
  Genuinely unresolved conflicts are tracked separately in
  docs/DATA-AND-BEHAVIOR-MAP.md §6 (Home Planner-derived progress vs.
  Active Projects milestone-derived progress; Exec & Strategy vs. PMO
  KPI/reporting-source disagreement).

- JEDI CAB: `JJR-Hub-Phase1-Architecture-v0_3.docx` contains JEDI CAB's
  architecture as Artifact 5 ("JEDI-CAB app — roles & responsibilities" /
  "data & placement" / "user flows" / "entities"), appended after the
  Home page's four artifacts in the same document. There is no separate
  standalone JEDI CAB architecture file in this directory — verified by
  listing `docs/architecture/*` directly. Treat v0.3's Artifact 5 as
  JEDI CAB's architecture source; do not look for or expect a second
  file.

## Single-version documents (no conflict to record)

Active Projects (superseded in turn by docs/specs/active-projects.md,
the higher-authority current spec), Communities, Exec & Strategy,
My Profile, PMO, Start Here — one architecture document each.

## Non-architecture reference in this directory

`JJR-Hub-App-Architecture-Flows.html` and
`# How We Will Build the JJR Hub Dev.txt` are process/flow references,
not page architecture; not subject to the versioning rule above.
