# Conversion Plan — All 20 Mockup Pages

Analysis of every `legacy/*.html` file. Read alongside Part 2 of `CLAUDE.md` (the per-page
SOP) — this document covers what is true *across* the set.

**Scale:** 20 pages · 1.2 MB · 3,552 `<div>` · 19 semantic elements total · 235 KB of JS

---

## 1 · The single most important finding

**19 of 20 pages repeat the same chrome.** Nav, profile dropdown, footer, and the
"Access & Equity" panel are duplicated in every file.

| Page | Nav | Profile | Footer | Access panel |
|---|---|---|---|---|
| All 18 standard pages | ✅ | ✅ | ✅ | ✅ |
| `exec-strategy.html` | ❌ | ✅ | ✅ | ✅ |
| `admin-actions.html` | ❌ | ❌ | ❌ | ❌ |

**Build `<AppShell>` first.** It is the largest single deduplication available and the place
to fix semantic HTML once for every page: `<header>`, `<nav>`, `<main>`, `<footer>` live here,
not in page components.

`admin-actions.html` is chrome-less by design — a standalone/modal surface. Give it a
`<BareLayout>` rather than forcing it into the shell.

`exec-strategy.html` having a footer but no nav matches its gated design. Confirm this is
intentional before the shell "fixes" it — a restricted page that also loses navigation may
strand the user.

---

## 2 · Design tokens — no conflicts, only aliases

Every hex value is **identical across all 19 configs**. Navy is `#1B365D` on every page;
green is `#4CBB17` on every page. There is no design reconciliation to do.

What differs is naming. Fifteen aliases to normalise:

| Alias in mockups | Canonical |
|---|---|
| `gold-br` | `gold-bright` |
| `gold-dk` | `gold-dark` |
| `gold-dp` | `gold-deep` |
| `green-br` | `green-bright` |
| `green-dk` | `green-dark` |
| `green-sf` | `green-soft` |
| `navy-ctx` | `navy-context` |
| `navy-rec` | `navy-recess` |
| `rule-lt` | `rule-light` |
| `stone-brand` | `stone` |
| `text-mute` | `text-muted` |
| `text-sec` | `text-secondary` |
| `txt` | `navy` |
| `txt-muted` | `text-muted` |
| `txt-sec` | `text-secondary` |

`tokens.css` is the canonical set. Delete all 19 inline `tailwind.config` blocks and normalise
class names against this table during conversion.

Watch `txt` → `navy`: it is a *semantic* rename (`txt` was the body text colour, which happens
to equal navy). Verify each use reads correctly as `navy` rather than blind-replacing.

---

## 3 · Shared primitives (appear on 4+ pages)

Build every one of these in `src/components/ui/` before converting any page.

| Primitive | Pages | Notes |
|---|---|---|
| `DropdownPanel` | 18 | The profile/notification panel — most-shared component in the set |
| `Spotlight` | 11 | Cursor-following ambient effect; one hook, not per-page JS |
| `RevealOnScroll` | 10 | 88 uses. One `IntersectionObserver` hook, not 88 listeners |
| `ShimmerText` | 15 | Two speeds (6s, 9s) — one component, a `speed` prop |
| `HeroGrain` | 14 | Texture overlay |
| `HeroBreath` | 9 | Breathing opacity animation |
| `SearchBar` + `SearchGlow` | 9 | Paired |
| `HeroKicker` | 7 | Mono uppercase eyebrow |
| `Timeline` + `TimelineItem` | 4 | 16 uses |
| `NavActive` | 5 | Active-state nav indicator |
| `RiseIn` | 6 | Staggered entry — take `delay` as a prop, not 6 hardcoded variants |

**The animation classes are the trap.** `animate-[rise_0.6s_...0.15s_both]` appears as six
near-identical hardcoded variants that differ only in delay. Collapse them into one component
with a `delay` prop or you will carry six copies of the same animation forever.

Also page-specific but worth checking for reuse: `ProjectCard`, `StatusPill`, `AvatarStack`,
`ProgressTrack`, `StatBlock`, `DateTile`, `MiniButton`, `RequestAccessPanel`.

---

## 4 · Page inventory

Sorted by conversion difficulty. `JS` is inline script weight — the strongest predictor of
effort, since imperative DOM code must be **rewritten**, not ported.

| Page | KB | div | JS KB | Difficulty |
|---|---|---|---|---|
| `under-development.html` | 20 | 40 | 2.3 | Trivial |
| `accessibility.html` | 27 | 50 | 2.4 | Trivial |
| `site-owners.html` | 32 | 86 | 2.3 | Easy |
| `vision-values.html` | 30 | 92 | 2.3 | Easy |
| `ai-for-good.html` | 31 | 92 | 2.3 | Easy |
| `environmental-justice.html` | 31 | 92 | 2.3 | Easy |
| `admin-actions.html` | 30 | 104 | 3.8 | Easy — no chrome |
| `consultant-directory.html` | 34 | 85 | 4.4 | Easy |
| `community-detail.html` | 44 | 147 | 2.7 | Moderate |
| `pmo.html` | 49 | 205 | 1.6 | Moderate |
| `tool-guides.html` | 50 | 188 | 2.1 | Moderate |
| `active-projects.html` | 46 | 237 | 2.0 | Moderate — **spec ready** |
| `communities.html` | 50 | 226 | 1.5 | Moderate |
| `exec-strategy.html` | 53 | 175 | 2.5 | Moderate |
| `how-we-work.html` | 52 | 228 | 1.6 | Moderate |
| `templates.html` | 62 | 272 | 4.1 | Moderate |
| `my-profile.html` | 73 | 324 | 11.5 | Hard — four render faces |
| `start-here.html` | 73 | 149 | 31.8 | Hard — scenario switching |
| `jedi-cab-tw.html` | 105 | 316 | 17.2 | Hard — three rings |
| `jjr-hub-tw.html` | 260 | 318 | 141.7 | Hardest — 96 KB is one base64 image |

`ai-for-good.html`, `environmental-justice.html`, and `vision-values.html` are structurally
identical (31 KB, 92 div, 14 svg each). They are the same template with different content —
build one `ContentPage` component and pass content, don't convert three times.

---

## 5 · Revised order

The per-page order in `CLAUDE.md` Part 2 assumed eight pages. With twenty, insert a
foundation phase first.

**Phase 0 — foundation (no pages)**
1. `tokens.css` + real Tailwind build
2. `<AppShell>` — semantic landmarks, nav, profile, footer, access panel
3. Shared primitives from §3
4. Icon set — the inline SVGs (86 in the home page alone)

**Phase 1 — prove the pipeline on easy pages**
`under-development` → `accessibility` → `site-owners`. Low risk, and they validate the shell
before anything complex depends on it.

**Phase 2 — the template trio**
One `ContentPage` component → `vision-values`, `ai-for-good`, `environmental-justice`.

**Phase 3 — the specced page**
`active-projects` — full spec exists at `docs/specs/active-projects.md`.

**Phase 4 — remaining moderate pages**
`consultant-directory` · `templates` · `tool-guides` · `how-we-work` · `pmo` ·
`communities` → `community-detail` · `exec-strategy` · `admin-actions`

**Phase 5 — hard pages**
`my-profile` (four faces) · `jedi-cab` (three rings) · `home` · `start-here` (blocked on B1)

Home moves later than its original slot: it is the heaviest page and mostly composes
primitives the earlier pages will have already produced.

---

## 6 · Cross-cutting fixes

| Issue | Where | Fix |
|---|---|---|
| 3,552 `<div>`, 19 semantic elements | Everywhere | Landmarks in `AppShell`; `<section>` per page block; card titles as real headings |
| 96 KB base64 image | `jjr-hub-tw.html` | Extract to `public/`, reference by URL |
| Tailwind CDN × 19 | Everywhere | Real build; delete inline configs |
| Duplicate `<style>` blocks | Everywhere | Keyframes and effects live once in `tokens.css` |
| `getElementById` / `classList` | Everywhere | Rewrite as React state |
| Buttons that aren't `<button>` | e.g. active-projects: 8 `<button>` vs 18 `.mini-btn` | Real `<button>` or `<a>` for anything interactive |

---

## 7 · The rule that governs all of this

Everything in this phase is **presentational**. Components take props and render. No fetching,
no role checks, no conditional rendering on user identity.

This is what makes it safe to convert all twenty pages before the permission engine exists — a
component that only renders what it is handed cannot leak anything, because the decision about
what to hand it lives in the API tier.

Reject any prop named `isLeadership`, `userRole`, `canEdit`, or similar. The shape is *"here is
the data you were given,"* never *"here is who you are."* If a page seems to need one, the
answer is that the parent decides and passes different data — not that the component decides.

Sensitive sections stay class C: when the API omits them, the component never receives the
prop and renders nothing. That works without the component knowing why.
