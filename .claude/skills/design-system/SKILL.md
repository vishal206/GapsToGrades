---
name: design-system
description: The visual design language for frontend/ — color tokens, typography, radii, spacing, surfaces and component patterns (sidebar, nav items, cards, pills, chips, avatars). Use whenever building or styling any UI in frontend/src, choosing a color, size or radius, or reviewing a screen for visual consistency.
---

# Design system

The look: **bright, friendly, flat.** A pale-blue canvas, white cards with large rounded corners, one dark charcoal sidebar, and bold saturated accents — lime green, warm yellow, coral orange — used as status/category fills, each with a pale tint for row or panel backgrounds. No shadows, almost no borders, generous whitespace, dark pill buttons.

All tokens live in `frontend/src/index.css` under `@theme`. **Use the token classes. Never hard-code hex values.** If a design truly needs a new value, add a token there first and document it here.

## Color tokens

| Token | Tailwind classes | Use for |
|---|---|---|
| `canvas` `#eff6fd` | `bg-canvas` | Page background (pale blue) |
| `surface` `#ffffff` | `bg-surface` | Cards, tables, secondary buttons, inactive pills, icon buttons, `+N` avatar |
| `ink` `#22262b` | `text-ink`, `bg-ink` | Primary text; primary buttons, active pills/tabs, "today" highlights |
| `ink-muted` `#8c939c` | `text-ink-muted` | Secondary text: meta lines, times, column headers, field labels |
| `sidebar` `#1e2226` | `bg-sidebar` | The left navigation panel only |
| `sidebar-text` `#f1f5f9` | `text-sidebar-text` | Nav item labels on the sidebar |
| `sidebar-muted` `#8c939c` | `text-sidebar-muted` | Secondary text on the sidebar (rare — the sidebar has no section labels) |
| `primary` → `accent-green` | `text-primary`, `bg-primary` | **The brand accent.** Active nav item, brand highlight, collapse toggle, search button, focus states. Components use `primary`, never the raw accent, for this role. |
| `accent-green` `#84d61a` | `bg-accent-green` | Status: good / mastered / on track |
| `accent-yellow` `#ffc328` | `bg-accent-yellow` | Status: in progress / working towards |
| `accent-orange` `#ff8257` | `bg-accent-orange` | Status: needs attention / low score |
| `accent-red` `#eb3b3b` | `bg-accent-red` | Small notification/alert count badges only |
| `accent-blue` `#2db4e6` | `bg-accent-blue` | Informational highlights; use sparingly |
| `tint-green` `#e7f2da` | `bg-tint-green` | Row/panel background for a green-status item |
| `tint-yellow` `#fef2d6` | `bg-tint-yellow` | Row/panel background for a yellow-status item |
| `tint-orange` `#fde7e4` | `bg-tint-orange` | Row/panel background for an orange-status item |

Rules:
- Status colors are a set: **green = good, yellow = in progress, orange = needs attention.** Keep that meaning everywhere; don't use them decoratively.
- A status item pairs a tint background (`bg-tint-*`) with solid accent marks (`bg-accent-*`) of the same hue — e.g. an orange-tinted row with orange score bubbles.
- Accents are **fills**, never body-text color on the canvas or white (contrast is too low). Text on green/yellow/orange fills is `text-ink`; text on red is `text-white`.
- `primary` is the one exception allowed as text color, and only on the dark sidebar.
- Muted text uses `text-ink-muted`; do not fake it with opacity.
- To change the brand accent, repoint `--color-primary` in `index.css` — don't edit components.

## Typography

Font: **Onest** (loaded in `index.html`), set as `font-sans`. Weights: 400, 500, 600 only.

| Role | Classes |
|---|---|
| Screen title (`h1`) | `text-4xl font-semibold tracking-tight` |
| Brand wordmark | `text-xl font-medium tracking-tight` |
| Card title | `text-lg font-medium` |
| Body / nav item | `text-[15px]` (regular) |
| Meta / labels | `text-sm text-ink-muted` |
| Uppercase day headers | `text-sm uppercase tracking-wide` |
| Tiny (avatars, chip text) | `text-xs font-medium` |

**Wordmark ↔ screen title top alignment.** The sidebar wordmark and each screen's `h1` start at the same y (page `p-4` + `py-8` on both the sidebar and `main`), and their sizes are chosen so the glyph tops land on the same pixel row. Onest metrics: ascent 0.970em, descent 0.305em, cap height 0.707em, so the cap top sits `L/2 − 0.3745·S` below the line box top (S = font size, L = line height). Wordmark 20/28 → 6.51px; title 36/40 → 6.52px. If you change either size or line height, recompute and compensate with padding so the two stay equal.

Titles are sentence case ("Stay up to date"), never Title Case or ALL CAPS (except weekday headers).

## Shape and spacing

- Radius tokens: `rounded-panel` (1.75rem) for the sidebar and large containers; `rounded-card` (1.5rem) for cards; `rounded-full` for buttons, pills, chips, avatars, icon buttons.
- Nothing is square-cornered except text inputs inside a rounded-full field.
- Spacing scale: Tailwind defaults. Common values: `gap-1` between nav items, `gap-3` icon-to-label, `p-4`–`p-5` inside cards, `gap-8` between major regions, `p-4` page gutter.
- **No shadows.** Separation comes from color (pale-blue canvas vs white surface vs dark sidebar), not elevation.
- Borders only for inputs and dashed filter chips: `border border-ink/20` (dashed for chips).

## Iconography

- Outline icons, `stroke="currentColor"`, `strokeWidth={1.5}`, round caps/joins, 24×24 viewBox.
- Render at `size-5` (20px) in nav and buttons, `size-4` inside chips.
- Icons inherit color from text — set color on the parent, not the icon.
- One icon per file in `components/icons/`, `aria-hidden="true"` by default.

## Component patterns

**App shell** — `flex h-screen gap-8 p-4` on canvas; black sidebar on the left floats inside the page gutter; `main` scrolls independently.

**Sidebar** — slim: `w-52` expanded, `w-19` collapsed, `rounded-panel bg-sidebar py-8`, width animates with `transition-[width] duration-200`. Wordmark at top (`theparent.tech`, collapsed to `t.`), its left edge aligned with the active nav item's `primary` bar (no extra inset), then a single flat list of nav items. **No section headings** ("General", "Tools") — keep the list flat. Log out sits apart at the bottom.

**Sidebar collapse toggle** — a black bump that bulges out of the sidebar's right edge (SVG path with concave fillets, `fill-sidebar`) holding a small round `primary` button (`size-5 rounded-full bg-primary text-ink`, `size-3` chevron). The button sits **3/4 inside the sidebar, 1/4 outside** (its centre is 5px inside the edge); the dark bump is concentric with it, leaving a 4px ring. Vertically aligned with the wordmark. Chevron points the way the sidebar will move: `<` when expanded, `>` when collapsed. See `components/navigation/SideNavToggle.tsx`.

**Nav item** — icon + label, `gap-3 py-2.5 pl-4`. When the sidebar is collapsed the label becomes `sr-only` and is shown as a `title` tooltip.
- Default: `text-sidebar-text`, hover `text-white`.
- Active: `text-primary` plus a 2px bar on the left edge (`absolute left-0 h-6 w-0.5 rounded-full bg-primary`), and `aria-current="page"`.

**Primary button** — `rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white`.
**Secondary / disabled button** — `rounded-full bg-surface text-ink` (disabled: `bg-ink-muted/30 text-ink-muted`).
**Icon button** — `size-10 rounded-full grid place-items-center`, `bg-surface` (default) or `bg-ink text-white` (emphasis). 40px so a row of them fits exactly inside the screen title's 40px line box; a count badge sits at `top-0 right-0`, inside that box.

**Segmented toggle (Today / Week / Month)** — row of `rounded-full px-4 py-1.5 text-sm`; inactive `bg-surface`, active `bg-ink text-white`.

**Card** — `rounded-card bg-surface p-5` with: optional small round icon badge at top (`size-8 rounded-full bg-tint-green`), title, `text-sm text-ink-muted` meta lines. Big-number stat cards: label, huge figure (`text-5xl font-semibold`), muted caption.

**Status card** — a solid status fill (`rounded-card bg-accent-green|yellow|orange p-5`) with a large `text-ink` number and a short caption. Use for summary counts per status.

**Status row** — `rounded-card bg-tint-*` row; values shown as round bubbles `rounded-full bg-accent-*` of the same hue, sized to the value where useful.

**Tag** — `rounded-full bg-tint-green px-3 py-1 text-xs font-medium text-ink` (or the matching tint for a status).

**Count badge** — `min-w-4 h-4 rounded-full bg-accent-red px-1 text-[10px] font-semibold text-white` on icons/labels (neutral count: `bg-ink-muted`).

**Filter chip** — `rounded-full border border-dashed border-ink/30 px-3 py-1 text-xs`.

**Avatar stack** — `size-7 rounded-full text-xs font-medium` initials on tint fills, overlapping with `-ml-1.5` and a `ring-2 ring-surface`; overflow shown as `+3` on a `bg-surface` circle.

**Header actions** — notifications, settings and profile icon buttons (`gap-3`) at the top right of `main`, positioned `absolute top-8 right-6` so they share the screen title's 40px line box without pushing the `h1` down. Profile is a `size-10 rounded-full bg-tint-green text-sm font-medium` initials circle, no ring. Nothing may extend outside the title line box. See `components/header/HeaderActions.tsx`.

**Search field** — `rounded-full border border-ink/20 px-5 py-3` with a separate circular search button (`size-12 rounded-full bg-primary`).

## Don'ts

- No shadows, gradients, or glassmorphism.
- No white page background — the page is `canvas`; white (`surface`) is for cards on top of it.
- No status colors used decoratively, and no mixing hues inside one status item.
- No new colors, font sizes or radii without adding a token here first.
- No accent-colored body text on the canvas or on white.
