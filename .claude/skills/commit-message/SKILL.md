---
name: commit-message
description: Commit message convention for this repo (Conventional Commits, e.g. "feat(auth): add multi-factor authentication support"). Use whenever writing, suggesting or reviewing a git commit message or PR title.
---

# Commit messages

Format (Conventional Commits):

```
<type>(<scope>): <summary>
```

**A single header line only — no body, no bullet list of changes.**

Example: `feat(auth): add multi-factor authentication support`

## Header rules

- **type** — one of:
  | type | use for |
  |---|---|
  | `feat` | a new user-facing feature or screen |
  | `fix` | a bug fix |
  | `style` | visual/design-only changes (colors, spacing, typography) with no behavior change |
  | `refactor` | code restructuring with no behavior or visual change |
  | `docs` | README and other documentation |
  | `chore` | tooling, config, dependencies, Claude agents/skills |
  | `test` | adding or fixing tests |
  | `perf` | performance improvements |
- **scope** — the area touched, lowercase, one word. Use an existing scope when one fits:
  `dashboard`, `nav`, `design-system`, `layout`, `claude` (agents/skills), `deps`, `config`, `readme`. Add a new screen's name as its scope (`schedule`, `reports` …).
- **summary** — imperative mood ("add", not "added"/"adds"), lowercase first letter, no trailing period, whole header ≤ 72 characters.
- Breaking change: add `!` after the scope — `feat(nav)!: replace hash links with router paths`.

## Scope of a commit

- One logical change per commit. If the summary needs "and" across unrelated areas (e.g. a new screen *and* new Claude skills), prefer separate commits.
- Pick the type for the most significant part of the change: a new screen that also adds tokens is `feat`, not `style`.

## Examples

```
feat(dashboard): add dashboard screen with collapsible side navigation
style(design-system): switch palette to pale-blue canvas and lime accent
fix(nav): keep active indicator aligned when sidebar is collapsed
chore(claude): add component-structure and design-system skills
docs(readme): add local development instructions
```
