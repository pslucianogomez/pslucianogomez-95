# Web3 Brutalist Redesign — Design Spec

**Status:** approved — pending implementation plan
**Author:** Pedro S. Luciano Gomez
**Date:** 2026-05-23
**Project:** `pslucianogomez-95`

---

## 1. Vision

Visual redesign of Pedro S. Luciano Gomez's personal portfolio. The "desktop with draggable windows" metaphor is preserved; the Windows 95 skin is replaced by a **brutalist cream / Bitcoin-orange / black** identity with light, cosmetic web3 accents. **No wallets, no smart contracts, no on-chain anything is integrated.** Web3 shows up only as a tonal layer: pseudo-addresses, hex labels in chrome, a fake `BLOCK #...` counter in the taskbar — never as a barrier to consuming the portfolio.

Narrative intensity: **Light · tinted.** Pedro is the protagonist. The site is `PSLG`, not `pslg.os`. Experiences are jobs, not transactions. A recruiter can read it as a portfolio at a glance.

---

## 2. Scope

### In scope
- Replace `react95` with custom primitives in `styled-components`
- Full visual system rewrite (palette, type, spacing, shadows, iconography)
- Animated boot sequence on first visit only
- Five windows: `Profile`, `Experience`, `Contact`, `Stack` (new), `Now` (new)
- Custom drag/focus/z-index logic via `WindowsContext`
- Mobile fallback (vertical scroll of cards, no draggable windows)
- Bilingual ES/EN preserved via existing `LanguageContext`
- EmailJS contact integration preserved

### Out of scope (explicit)
- Wallet integrations (Wagmi, WalletConnect, ENS, etc.) — narrative is cosmetic only
- Smart contract interaction
- Tests beyond the manual verification checklist in §11
- Dark mode (the cream palette already has strong contrast; duplicating the system adds no clear value)
- Runtime PDF generation (`jspdf`, `pdf-lib`, `pdfjs-dist` are removed; a static CV PDF in `/public` is acceptable)
- Storybook
- Animations beyond the boot sequence and micro hover/active states
- Backwards compatibility with the Win95 design (no `/classic` route, no shim)

---

## 3. Visual System (tokens)

### 3.1 Palette

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0a0a0a` | text, borders, hard shadows |
| `paper` | `#f5f1e8` | base background (cream) |
| `paper-soft` | `#ede7d7` | secondary panels, status strip |
| `ink-paper` | `#fffdf7` | active window background |
| `btc` | `#f7931a` | primary accent (Bitcoin orange) |
| `btc-deep` | `#d97706` | accent hover/pressed |
| `muted` | `#6b6b6b` | metadata text |
| `ok` | `#2f8f4e` | rare: online status, success |
| `warn` | `#b91c1c` | rare: errors, offline |

Operational roles: 4 (`ink`, `paper`, `btc`, `muted`). `ok`/`warn` are contextual.

### 3.2 Type

- **Display / titles:** `Space Grotesk` (700, 900) via `@fontsource/space-grotesk`
- **Mono / chrome / data:** `JetBrains Mono` (400, 700) via `@fontsource/jetbrains-mono`
- **Body:** `Inter` (400, 500) via `@fontsource/inter` — used only for long-form copy (experience descriptions). Removed if unused.

Self-hosted; no Google Fonts CDN requests at runtime.

### 3.3 Scale

```
xs   11px   labels, metadata
sm   13px   chrome text (title bars, taskbar)
md   15px   body
lg   20px   large window titles, h3
xl   28px   h2
2xl  44px   single hero h1
```

Spacing scale (multiples of 4): `0, 4, 8, 12, 16, 20, 24, 32, 48, 64`. No values outside this scale.

### 3.4 Borders and shadows (the signature)

| Token | Value | Use |
|---|---|---|
| `border` | `2px solid ink` | default |
| `border-thick` | `3px solid ink` | windows, primary panels |
| `radius` | `0` | square everything, no exceptions |
| `shadow` | `4px 4px 0 ink` | inactive windows, panels, secondary buttons |
| `shadow-lg` | `6px 6px 0 ink` | reserved (unused by default; available for emphasis) |
| `shadow-btc` | `4px 4px 0 btc` | primary buttons, expanded experience items |
| `shadow-focus` | `6px 6px 0 btc` | focused (active) window |
| `shadow-drag` | `8px 8px 0 btc` | window while being dragged |

### 3.5 Decorative patterns

- `stripes-45`: `repeating-linear-gradient(45deg, ink 0 3px, transparent 3px 6px)` — progress bars, separators
- `dots`: 1px ink radial-gradient every 12px — desktop background

### 3.6 Interactions

- **Hover** (buttons / windows): shadow shifts to `2px 2px 0`, element translates `2px 2px` (looks like it sinks toward the shadow)
- **Active / pressed:** shadow `0 0`, element fully translated onto shadow position
- **Transition:** `all 80ms steps(4)` — stepped, not curved easing. Brutalist motion.

### 3.7 Icons

Custom mono-stroke SVG set, 2px strokes, 24×24, no fills. They inherit `currentColor`. Initial set: `user` (Profile), `briefcase` (Experience), `mail` (Contact), `box` (Stack), `pulse` (Now), `terminal` (Taskbar `START` button), `hex` (status strip / cosmetic block badge). Wrapped by `<Glyph>` for size/color props.

### 3.8 Cursor

`crosshair` over primary clickables (window icons, primary buttons). `default` elsewhere.

---

## 4. Component Architecture

### 4.1 Folder structure (post-rewrite)

```
src/
├── main.tsx
├── App.tsx                       # GlobalStyle + ThemeProvider + Router + Providers
├── theme/
│   ├── tokens.ts
│   ├── theme.ts                  # typed object for ThemeProvider
│   ├── GlobalStyle.ts
│   └── fonts.ts
├── ui/                           # pure visual primitives, no domain logic
│   ├── Window/
│   │   ├── Window.tsx
│   │   ├── WindowTitleBar.tsx
│   │   └── useDraggable.ts
│   ├── Taskbar/
│   │   ├── Taskbar.tsx
│   │   ├── TaskbarItem.tsx
│   │   └── BlockBadge.tsx
│   ├── Desktop/
│   │   ├── Desktop.tsx
│   │   └── DesktopIcon.tsx
│   ├── Boot/
│   │   ├── BootSequence.tsx
│   │   └── bootLines.ts
│   ├── Button.tsx
│   ├── Panel.tsx
│   ├── Field.tsx                 # input / textarea
│   ├── Badge.tsx
│   ├── Glyph.tsx
│   └── HexAddress.tsx
├── features/                     # composition: a window + its content
│   ├── Profile/Profile.tsx
│   ├── Experience/
│   │   ├── ExperienceList.tsx
│   │   └── ExperienceDetail.tsx
│   ├── Contact/Contact.tsx
│   ├── Stack/Stack.tsx
│   └── Now/Now.tsx
├── contexts/
│   ├── LanguageContext.tsx       # kept
│   └── WindowsContext.tsx        # refactored from WindowContext
├── data/
│   ├── experiences.ts            # reshape to bilingual { es, en } fields
│   ├── stack.ts                  # new
│   └── now.ts                    # new
├── hooks/
│   ├── useWindow.ts
│   └── usePersistedState.ts
├── routes.tsx
└── assets/icons/*.svg
```

### 4.2 Contracts

**`<Window>`**

```ts
type WindowProps = {
  id: string;
  title: string;
  icon?: ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { w: number; h: number };
  resizable?: boolean;            // default: true desktop, false mobile
  onClose: () => void;
  isActive: boolean;              // controlled by WindowsContext
  children: ReactNode;
};
```

Responsibilities: chrome (title bar + close), drag, focus dispatch, z-index. Does not know its content — features compose into it.

**`WindowsContext`**

```ts
type WindowsState = {
  windows: Array<{
    id: string;
    route: string;
    position: { x: number; y: number };
    size: { w: number; h: number };
    zIndex: number;
    minimized: boolean;
  }>;
  open: (id: string, route: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  toggleMinimize: (id: string) => void;
};
```

Single source of truth. Features mount in `<Window>` only when they appear in `windows[]`. Route changes dispatch `open()`. Focused window's route is reflected in the URL.

**`useDraggable`**

Custom hook (~40 lines) using `pointerdown` / `pointermove` / `pointerup`. No `react-draggable` or `framer-motion drag` — adding deps for a simple drag is unjustified. Optional 8px grid snap. Clamps to viewport bounds.

### 4.3 Dependencies

**Remove:** `react95`, `@storybook/react`, `@tanstack/react-table`, `jspdf`, `pdf-lib`, `pdfjs-dist`, `axios`
**Add:** `@fontsource/space-grotesk`, `@fontsource/jetbrains-mono`, `@fontsource/inter`
**Keep:** `react`, `react-dom`, `react-router`, `react-router-dom`, `styled-components`, `@emailjs/browser`

`dist.zip` is a build artifact (gitignored) regenerated on each publish; leave as-is.

---

## 5. Shell: Boot, Desktop, Taskbar

### 5.1 Boot sequence

Shown **only on first visit** (flag in `localStorage`: `pslg.boot-seen=true`). Subsequent loads skip directly to desktop. A small `SKIP` button sits in the bottom-right.

Duration ~2.5s total. Mono text, cream on black. Lines appear sequentially via chained `setTimeout` — no animation library:

```
$ pslg.boot --user=visitor
> mounting /profile        [ok]
> mounting /experience     [ok]
> mounting /stack          [ok]
> mounting /contact        [ok]
> syncing block #847,231   [ok]
> ready ▮
```

Cursor blink via `@keyframes`. On completion, 200ms fade to desktop. **No boot on mobile** — straight to content.

### 5.2 Desktop

- **Background:** `paper` with dot grid (1px `ink` dots every 12px, 35% opacity).
- **Status strip (top, 34px):** `PSLG · v3.0` left; right cluster: `● online` (`ok` dot), pseudo-address `0x4F…A91C` (hand-chosen static string defined once in `theme/tokens.ts`), language toggle `ES / en` (active locale uppercase, inactive lowercase — clicking swaps).
- **Desktop icons:** left column of 5 (`Profile`, `Experience`, `Stack`, `Now`, `Contact`). Each: 48px square, `border 2px ink`, `shadow 3px 3px 0 ink`, glyph centered, uppercase label below. Double-click opens. Single-click highlights.
- **Canvas:** windows render with `WindowsContext` z-index. Drag clamps to viewport.

### 5.3 Taskbar (38px, fixed bottom)

- **`⬢ START` button** (cosmetic, no menu) in `btc`. Hover shifts `2px 2px`.
- **Open windows list:** `<TaskbarItem>` per window. Active window: cream solid. Inactive: gray border, 0.7 opacity. Click toggles minimize / focus.
- **Right cluster:** `BLOCK #...` chip (cosmetic counter, derived client-side as `baseline + floor((now - epoch) / 12000)` where `baseline` and `epoch` are constants in `theme/tokens.ts`; deterministic, no persistence) and local clock `HH:MM GMT-3` (real, refreshed every 60s with `setInterval`).

### 5.4 Window states

| State | Border | Shadow | Title bar |
|---|---|---|---|
| Active | `3px ink` | `6px 6px 0 btc` | `ink` bg / `ink-paper` text / `btc` close |
| Inactive | `3px ink` | `4px 4px 0 ink` | `paper-soft` bg / `ink` text |
| Minimized | hidden | — | listed in taskbar with strikethrough |
| Dragging | `3px ink` | `8px 8px 0 btc` | cursor `grabbing` |

### 5.5 Window lifecycle

- **Open:** route change → context mounts window. Slides from triggering icon's position via `transform: translate` (~140ms, stepped).
- **Close:** unmounts immediately, no exit animation (brutalist > smooth).
- **Focus:** click brings to top z-index. URL syncs to focused window's route.

---

## 6. Content Sections

### 6.1 Profile

Hero window.

- Avatar 64×64, striped pattern placeholder until the real photo (`src/assets/profile-avatar.jpg`) is wired
- Name (Space Grotesk 900, 28px)
- Meta line in mono: pseudo-address + city (`0x4F…A91C · CÓRDOBA, AR`)
- 3-line bio (bilingual via `data/profile.ts`, new)
- Two buttons:
  - `HIRE ME →` (primary btc) — opens the Contact window via `WindowsContext.open('contact', '/contact')`
  - `DOWNLOAD CV` (ghost) — `<a href="/cv.pdf" download>`. Rendered only if a `public/cv.pdf` file exists at build time (detected via a build-time check or a feature flag in `data/profile.ts`); hidden otherwise.
- Social chips at the foot: GitHub, LinkedIn, Email — open in new tab

### 6.2 Experience

Vertical timeline of jobs. Each item:

```
┌─ 2023 ─ PRESENT ───────────────────────────┐
│ ▮ ARGENWAY                          [open] │
│   Senior .NET Architect                    │
│   Lideré la migración a .NET 8 y el ...    │
│   stack: .NET · Azure · React              │
└────────────────────────────────────────────┘
```

- Click expands inline. No new window — that would be disorienting with multiple experiences.
- The `[open]` affordance is a label, not a button — it toggles to `[close]` when the item is expanded.
- Expanded item: `shadow-btc`. Collapsed: `shadow` (ink).
- Only one item expanded at a time; expanding another collapses the previous.
- Dates render in mono. Company name uppercase 700.
- Data lives in `data/experiences.ts`, reshaped to expose `{ es, en }` per field.

### 6.3 Contact

Form in a `<Panel>`:

- `<Field>` `name` (text)
- `<Field>` `email` (text)
- `<Field>` `message` (textarea, 5 rows)
- `SEND →` button (primary btc)

Submit calls EmailJS — integration unchanged. Success: `ok` panel "MESSAGE SENT · BLOCK #<current>" where `<current>` reads the live block counter at send-time. Failure: `warn` panel with the error message. Form clears on success.

### 6.4 Stack (new)

Grid of POAP-style brutalist badges.

- Tech name in mono uppercase
- Default shadow `ink`. Core stack (`.NET`, `C#`, `React`, `Azure`) — exactly 3-4 — gets `shadow-btc`.
- Hover shows years of experience as a tooltip: `15Y`, `8Y`, etc.
- Grouped by category with uppercase labels: `LANGUAGES`, `FRAMEWORKS`, `CLOUD`, `DATA`, `TOOLS`.
- Data in `data/stack.ts`.

### 6.5 Now (new)

Small single-column panel. Quick read. Content lives in `data/now.ts`:

```
STATUS         ● OPEN_TO_WORK
LOCATION       Córdoba, AR · GMT-3
CURRENTLY      Diseñando este rediseño (meta)
LAST COMMIT    2h ago · pslucianogomez.com.ar
LISTENING TO   <hidden if empty>
READING        <hidden if empty>
UPDATED        2026-05-23
```

Each row: label in mono uppercase, opacity 60%; value in Space Grotesk 500. Static — no fetch, no animation. Rows whose value is empty/null in `data/now.ts` are not rendered (no empty label visible). `UPDATED` is hand-edited.

---

## 7. Routing

| Route | Behavior |
|---|---|
| `/` | Desktop (boot sequence if first visit). Reached also when all windows are closed. |
| `/profile` | Opens Profile window |
| `/experience` | Opens Experience list window |
| `/experience/:id` | Opens Experience window, expands the matching item |
| `/contact` | Opens Contact window |
| `/stack` | Opens Stack window |
| `/now` | Opens Now window |
| `/login` | Redirects to `/` (backwards compatibility with the Win95-era URL; the new app has no login) |
| `*` | "ROUTE NOT FOUND · 0xDEAD" window with back button; desktop visible behind |

The focused window's route is the canonical URL. Opening a window via icon click pushes its route. Closing the last open window pops the URL back to `/`. Focusing a different already-open window replaces (not pushes) the URL.

On mobile, routes scroll to the matching section instead of opening a window. `/` shows the top of the page.

---

## 8. Mobile (`< 768px`)

Detected via `window.matchMedia('(max-width: 767px)')`.

- No desktop, no draggable windows. App collapses to vertical scroll.
- Status strip kept at top (compact).
- Single column of cards (reusing `<Panel>` with `shadow`). Order: Profile → Now → Stack → Experience → Contact.
- Taskbar replaced by a fixed-bottom nav of 5 icon chips that scroll-to-section.
- No boot sequence — straight to content.
- Type scale unchanged; spacing tightens to multiples of 4.

---

## 9. Bilingual (ES/EN)

`LanguageContext` is preserved as the single source of language state. All textual data (`experiences.ts`, `stack.ts`, `now.ts`) exposes `{ es, en }` per field; consumers read the active locale via the context. The toggle `ES / en` in the top status strip swaps active locale on click.

Persistence: locale stored in `localStorage` so the choice survives reloads.

---

## 10. SEO and metadata

`index.html` updated:

- `title` / meta description: kept in English ("Senior .NET Full Stack Developer")
- `theme-color`: `#008080` (Win95 teal) → `#f7931a` (btc)
- `og:image`: new screenshot of the brutalist desktop, replacing `/logo1.png`. Captured post-implementation against the final build and committed as `public/og-cover.png`. Falls back to `/logo1.png` until then.
- `canonical`, `robots`, sitemap: unchanged

---

## 11. Verification Checklist (manual)

Before declaring complete:

1. `npm run dev` runs with zero TypeScript errors and zero runtime errors in the console.
2. Boot sequence animates and completes on first visit; reload does not re-show it; `SKIP` button works.
3. All 5 windows open, close, drag, and focus correctly. Z-index works (focused window goes on top).
4. Taskbar reflects open windows accurately; `START` button is cosmetic (no menu).
5. Contact form sends via EmailJS and shows success/error panels.
6. ES/EN toggle swaps every textual field across all 5 windows.
7. Mobile view (DevTools at 375px): vertical scroll works, bottom nav scrolls between sections, no horizontal scroll.
8. `npm run build` produces a clean `dist` with no TypeScript or Vite warnings.
9. Lighthouse: performance > 90 desktop, > 85 mobile.

No automated tests are added in this rewrite. Adding tests is a separate project, scoped later.

---

## 12. Implementation Strategy

In-place rewrite, branch-based. The current `src/` (excluding the kept files listed below) is removed and rebuilt against this spec.

**Kept verbatim from the existing codebase:**
- `src/contexts/LanguageContext.tsx` (audit, possibly minor edits)
- `src/data/experiences.ts` (data; reshape to bilingual)
- `src/assets/*` (images, including the avatar candidates)
- `public/*` (logos, robots, sitemap)
- `index.html` (modified for SEO and theme-color, not rewritten)

**Removed:**
- `src/App.css`, `src/main.css`
- All of `src/components/AppBar`, `Desktop`, `Taskbar`, `Window`
- All of `src/pages/` (login, profile, experience, contact, Layout)
- All of `src/windows/`

The site will not build during the rewrite — work happens on a feature branch and lands on `main` as one cohesive PR.
