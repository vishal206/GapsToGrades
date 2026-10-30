---
name: component-structure
description: Rules for structuring React components in frontend/ — folder layout, file naming, props, size limits, composition and Tailwind usage. Use whenever creating, splitting, moving or reviewing a component, screen or layout in frontend/src.
---

# Component structure

Goal: every component is **small, single-purpose and obvious at a glance**. If a reader needs to scroll or hold state in their head to understand a file, it is too big.

## Folder layout

```
frontend/src/
  App.tsx                     # app shell: composes navigation + active screen, nothing else
  index.css                   # Tailwind import + design tokens (@theme) only
  router/
    navigation.ts             # usePathname() + navigate(): History API paths (/dashboard/<id>), no "#"
  components/
    <domain>/                 # grouped by what they are for: navigation/, icons/, buttons/, cards/ …
      ComponentName.tsx
  screens/
    <screen>/                 # one folder per screen: dashboard/, schedule/ …
      <Screen>Screen.tsx      # the screen entry
      <PartOfScreen>.tsx      # pieces only this screen uses
```

- **components/** = reusable, presentational building blocks. They know nothing about which screen they are on.
- **screens/** = one per page. A screen composes components and owns that page's data/state.
- A piece used by only one screen lives in that screen's folder. Move it to `components/` **the second time** something else needs it — not before.
- URLs are clean paths, never `#` hashes. Change them with `navigate()` from `router/navigation.ts`, never `window.location`, which reloads the page and drops in-memory state. Components get navigation as a callback prop (`onNavigate`).
- Icons live in `components/icons/`, one icon per file, named `<Name>Icon.tsx`.

## Files

- One component per file. File name = component name, PascalCase (`NavItem.tsx` exports `NavItem`).
- **Named exports only** (`export function NavItem`). No default exports, no barrel `index.ts` files — import from the file directly.
- Declare with `function`, not `const X = () =>`.
- Static config (like a nav item list) is an `UPPER_SNAKE` const at the top of the file that uses it. Keep it unexported unless a second file needs it.

## Size and responsibility

- Aim for **under ~60 lines**; past ~100 lines it must be split.
- One responsibility per component. If you describe it with "and", split it (e.g. `SideNav` lays out the sidebar; `NavItem` renders one link).
- Lists: the parent maps over data and renders a child item component; the item component never knows about the list.
- No nested component definitions inside another component's body.

## Props

- Type props with a local `type <Component>Props = { … }` right above the component. Do not export it unless another file needs it.
- Destructure in the signature and put defaults there: `function NavItem({ active = false }: NavItemProps)`.
- Keep props minimal and primitive (strings, booleans, numbers, callbacks, a component type for icons). Do not pass whole objects when two fields are used.
- Booleans read as states: `active`, `disabled`, `selected` — not `isActiveState`.
- Pass icons as a component (`icon: ComponentType<SVGProps<SVGSVGElement>>`) and render `<Icon className="size-5" />`.
- Data flows down, events flow up (`onSelect`, `onClose`). Do not drill a prop more than two levels; restructure via composition (`children`) first.

## State and logic

- Components in `components/` are presentational: no fetching, no global state, no routing decisions. They receive what they show.
- Local UI-only state is fine inside a component when nothing else needs it (e.g. `SideNav` owns `collapsed`). Lift it to the screen/app only when a sibling needs to read it.
- Screens own state and data. Extract a `use<Thing>` hook into the screen folder once logic exceeds a few lines.
- Derive values; don't mirror props into state.

## Styling

- Tailwind utility classes only, using **design-system tokens** (`bg-surface`, `text-ink-muted`, `rounded-card`). See the `design-system` skill. No raw hex values, no inline `style`, no new CSS files.
- Conditional classes: a single ternary inside a template literal. If you need more than two conditions, the component probably has too many variants — split it.
- Layout spacing (margins/gaps between siblings) is set by the **parent**; a component does not add outer margin to itself.

## Accessibility (non-negotiable)

- Semantic elements: `<nav>`, `<aside>`, `<main>`, `<section>`, `<button>` for actions, `<a>` for navigation, real `<ul>/<li>` for lists.
- One `<h1>` per screen.
- Active nav link gets `aria-current="page"`; landmarks with more than one instance get `aria-label`.
- Decorative SVGs/spans get `aria-hidden="true"`.

## Before you finish — checklist

- [ ] Each new file has exactly one component, named export, matching file name
- [ ] It sits in the right place (`components/<domain>/` vs `screens/<screen>/`)
- [ ] Under ~60 lines, one responsibility
- [ ] Props typed, minimal, defaults in destructuring
- [ ] Only token-based Tailwind classes
- [ ] `npm run build` and `npm run lint` pass in `frontend/`
