# Web3 Brutalist Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the visual layer of `pslucianogomez-95` — replace the Windows 95 react95 skin with a brutalist cream / Bitcoin-orange / black identity, keep the desktop+windows metaphor, add two sections (Stack, Now), drop `react95` and ~5 unused heavy deps, and ship a focused single-page portfolio with a light cosmetic web3 narrative.

**Architecture:** Custom UI primitives in `styled-components` (no `react95`). Single-source-of-truth `WindowsContext` drives draggable windows with z-index. Routes mirror open windows. First-visit boot sequence in `localStorage`. Mobile (< 768px) collapses to vertical card scroll. No tests in this rewrite — verification is manual per task.

**Tech Stack:** React 19, TypeScript (strict), Vite 6, styled-components 6, react-router 7, @emailjs/browser, @fontsource (Space Grotesk + JetBrains Mono + Inter).

**Spec:** `docs/superpowers/specs/2026-05-23-web3-brutalist-redesign-design.md`

---

## Working agreement

- **One feature branch**, all 19 tasks land as one cohesive PR to `main` at the end. Branch name: `redesign/web3-brutalist`.
- **The site WILL NOT build for several intermediate tasks.** That's expected — the rewrite scraps the old `App.tsx`, pages, and components in Task 1. Verification resumes from Task 12 once routes are wired.
- **No new automated tests.** Each task ends with a concrete manual verification command (most are `npm run dev` + a specific browser observation).
- **Commit after every task** with the message shown in the task's commit step.
- TypeScript is strict (`strict`, `noUnusedLocals`, `noUnusedParameters`) — all code must satisfy.

---

### Task 0: Create feature branch

**Files:** none — git only.

- [ ] **Step 1: Confirm clean working tree**

Run: `git status`
Expected: `working tree clean` (the spec commit from earlier should be in `main`).

- [ ] **Step 2: Create and switch to branch**

Run: `git checkout -b redesign/web3-brutalist`
Expected: `Switched to a new branch 'redesign/web3-brutalist'`

---

### Task 1: Dependency swap + scrub of obsolete source

**Files:**
- Modify: `package.json`
- Delete: `src/App.css`, `src/main.css`, `src/components/AppBar/AppMenuBar.tsx`, the now-empty `src/components/AppBar/`, `src/components/Window/`, `src/components/Desktop/`, `src/components/Taskbar/`, `src/pages/`, `src/windows/`
- Delete: `dist/` and `dist.zip` (build artifacts, will be regenerated)
- Delete: `EMAILJS_SETUP.md` (move its content into a section of the project README in Task 19; for now it's stale)

- [ ] **Step 1: Remove obsolete dependencies**

Run: `npm uninstall react95 @storybook/react @tanstack/react-table jspdf pdf-lib pdfjs-dist axios`
Expected: lockfile updates, packages disappear from `package.json` `dependencies`.

- [ ] **Step 2: Add fontsource packages**

Run: `npm install @fontsource/space-grotesk @fontsource/jetbrains-mono @fontsource/inter`
Expected: three new entries under `dependencies`.

- [ ] **Step 3: Delete obsolete source files and folders**

Run (POSIX shell — adapt to PowerShell if needed):
```bash
rm -rf src/App.css src/main.css \
       src/components src/pages src/windows \
       dist dist.zip EMAILJS_SETUP.md
```

Verify: `ls src/` shows only `App.tsx`, `assets/`, `constants.tsx`, `contexts/`, `data/`, `hooks/`, `main.tsx`, `vite-env.d.ts` (and maybe nothing else).

- [ ] **Step 4: Delete src/constants.tsx if it only references removed code**

Run: `cat src/constants.tsx`. If it references react95/PDF utilities, delete it. If it has only assets/strings still used (e.g. social URLs), keep it but plan to inline those into `data/profile.ts` in Task 11.

- [ ] **Step 5: Verify package.json final state**

`package.json` `dependencies` should now read (versions may vary):
```json
{
  "dependencies": {
    "@emailjs/browser": "^4.4.1",
    "@fontsource/inter": "^5.x",
    "@fontsource/jetbrains-mono": "^5.x",
    "@fontsource/space-grotesk": "^5.x",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router": "^7.1.5",
    "react-router-dom": "^7.1.5",
    "styled-components": "^6.1.15"
  }
}
```

`devDependencies` stays unchanged. Remove `@storybook/react` if it lingered as a devDependency too.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/
git commit -m "chore: drop react95, pdf libs, storybook, table, axios; add fontsource"
```

(Deletions are tracked by `git add -u src/` if needed.)

---

### Task 2: Theme — tokens, theme object, GlobalStyle, fonts

**Files:**
- Create: `src/theme/tokens.ts`
- Create: `src/theme/theme.ts`
- Create: `src/theme/fonts.ts`
- Create: `src/theme/GlobalStyle.ts`
- Create: `src/theme/styled.d.ts` (DefaultTheme type augmentation for styled-components)

- [ ] **Step 1: Create `src/theme/tokens.ts`**

```ts
export const colors = {
  ink:        '#0a0a0a',
  paper:      '#f5f1e8',
  paperSoft:  '#ede7d7',
  inkPaper:   '#fffdf7',
  btc:        '#f7931a',
  btcDeep:    '#d97706',
  muted:      '#6b6b6b',
  ok:         '#2f8f4e',
  warn:       '#b91c1c',
} as const;

export const space = {
  '0': 0, '1': 4, '2': 8, '3': 12, '4': 16,
  '5': 20, '6': 24, '8': 32, '12': 48, '16': 64,
} as const;

export const fontSize = {
  xs: '11px', sm: '13px', md: '15px',
  lg: '20px', xl: '28px', '2xl': '44px',
} as const;

export const fontFamily = {
  display: "'Space Grotesk', system-ui, sans-serif",
  mono:    "'JetBrains Mono', ui-monospace, monospace",
  body:    "'Inter', system-ui, sans-serif",
} as const;

export const border = {
  thin:  `2px solid ${colors.ink}`,
  thick: `3px solid ${colors.ink}`,
} as const;

export const shadow = {
  base:   `4px 4px 0 ${colors.ink}`,
  lg:     `6px 6px 0 ${colors.ink}`,
  btc:    `4px 4px 0 ${colors.btc}`,
  focus:  `6px 6px 0 ${colors.btc}`,
  drag:   `8px 8px 0 ${colors.btc}`,
} as const;

export const transition = 'all 80ms steps(4)';

// Cosmetic constants used across the app
export const cosmetic = {
  pseudoAddress: '0x4F…A91C',
  blockBaseline: 800000,
  blockEpoch: Date.UTC(2026, 4, 16, 12, 0, 0), // 2026-05-16T12:00:00Z
  blockTickMs: 12000,
  appVersion: 'v3.0',
} as const;
```

- [ ] **Step 2: Create `src/theme/theme.ts`**

```ts
import { colors, space, fontSize, fontFamily, border, shadow, transition } from './tokens';

export const theme = {
  colors,
  space,
  fontSize,
  fontFamily,
  border,
  shadow,
  transition,
} as const;

export type AppTheme = typeof theme;
```

- [ ] **Step 3: Create `src/theme/styled.d.ts`**

```ts
import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
```

- [ ] **Step 4: Create `src/theme/fonts.ts`**

```ts
import '@fontsource/space-grotesk/700.css';
import '@fontsource/space-grotesk/900.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
```

- [ ] **Step 5: Create `src/theme/GlobalStyle.ts`**

```ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; height: 100%; }
  body {
    font-family: ${({ theme }) => theme.fontFamily.body};
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.ink};
    background: ${({ theme }) => theme.colors.paper};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fontFamily.display};
    margin: 0;
    font-weight: 900;
  }
  button { font-family: inherit; cursor: crosshair; }
  a { color: inherit; }
  input, textarea, select { font-family: inherit; }
  ::selection { background: ${({ theme }) => theme.colors.btc}; color: ${({ theme }) => theme.colors.ink}; }
`;
```

- [ ] **Step 6: Commit**

```bash
git add src/theme
git commit -m "feat(theme): brutalist tokens, GlobalStyle, fontsource imports"
```

No `npm run dev` check yet — there's no working `App.tsx` to render. The theme will be exercised in Task 12.

---

### Task 3: Icons — Glyph wrapper + 7 SVGs

**Files:**
- Create: `src/assets/icons/user.svg`
- Create: `src/assets/icons/briefcase.svg`
- Create: `src/assets/icons/mail.svg`
- Create: `src/assets/icons/box.svg`
- Create: `src/assets/icons/pulse.svg`
- Create: `src/assets/icons/terminal.svg`
- Create: `src/assets/icons/hex.svg`
- Create: `src/ui/Glyph.tsx`

All SVGs share: `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="square"`, `stroke-linejoin="miter"`.

- [ ] **Step 1: Write `src/assets/icons/user.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
  <circle cx="12" cy="8" r="4"/>
  <path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>
</svg>
```

- [ ] **Step 2: Write `src/assets/icons/briefcase.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="3" y="7" width="18" height="13"/>
  <path d="M9 7V4h6v3"/>
  <path d="M3 13h18"/>
</svg>
```

- [ ] **Step 3: Write `src/assets/icons/mail.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="3" y="5" width="18" height="14"/>
  <path d="M3 6l9 7 9-7"/>
</svg>
```

- [ ] **Step 4: Write `src/assets/icons/box.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
  <path d="M3 7l9-4 9 4v10l-9 4-9-4z"/>
  <path d="M3 7l9 4 9-4"/>
  <path d="M12 11v10"/>
</svg>
```

- [ ] **Step 5: Write `src/assets/icons/pulse.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
  <path d="M2 12h5l2-7 4 14 2-7h7"/>
</svg>
```

- [ ] **Step 6: Write `src/assets/icons/terminal.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
  <rect x="3" y="4" width="18" height="16"/>
  <path d="M7 9l4 3-4 3"/>
  <path d="M12 16h5"/>
</svg>
```

- [ ] **Step 7: Write `src/assets/icons/hex.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
  <path d="M12 2l9 5v10l-9 5-9-5V7z"/>
</svg>
```

- [ ] **Step 8: Write `src/ui/Glyph.tsx`**

```tsx
import styled from 'styled-components';

import User from '../assets/icons/user.svg?react';
import Briefcase from '../assets/icons/briefcase.svg?react';
import Mail from '../assets/icons/mail.svg?react';
import Box from '../assets/icons/box.svg?react';
import Pulse from '../assets/icons/pulse.svg?react';
import Terminal from '../assets/icons/terminal.svg?react';
import Hex from '../assets/icons/hex.svg?react';

export type GlyphName =
  | 'user' | 'briefcase' | 'mail' | 'box' | 'pulse' | 'terminal' | 'hex';

const map = { user: User, briefcase: Briefcase, mail: Mail, box: Box, pulse: Pulse, terminal: Terminal, hex: Hex };

const Wrap = styled.span<{ $size: number }>`
  display: inline-flex;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  & > svg { width: 100%; height: 100%; }
`;

export const Glyph = ({ name, size = 24 }: { name: GlyphName; size?: number }) => {
  const Cmp = map[name];
  return <Wrap $size={size}><Cmp /></Wrap>;
};
```

- [ ] **Step 9: Enable `svg?react` imports in Vite**

The `?react` suffix needs `vite-plugin-svgr`. Install it:

Run: `npm install --save-dev vite-plugin-svgr`

- [ ] **Step 10: Update `vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export default defineConfig({
  plugins: [react(), svgr()],
  server: { headers: securityHeaders },
  preview: { headers: securityHeaders },
});
```

- [ ] **Step 11: Add SVG ambient types**

Append to `src/vite-env.d.ts`:

```ts
/// <reference types="vite-plugin-svgr/client" />
```

(Keep any existing references in the file.)

- [ ] **Step 12: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/vite-env.d.ts src/assets/icons src/ui/Glyph.tsx
git commit -m "feat(ui): Glyph component + 7 brutalist SVG icons"
```

---

### Task 4: Small primitives — Panel, Button, Badge, Field, HexAddress

**Files:**
- Create: `src/ui/Panel.tsx`
- Create: `src/ui/Button.tsx`
- Create: `src/ui/Badge.tsx`
- Create: `src/ui/Field.tsx`
- Create: `src/ui/HexAddress.tsx`

- [ ] **Step 1: Write `src/ui/Panel.tsx`**

```tsx
import styled from 'styled-components';

export const Panel = styled.div<{ $accent?: boolean; $soft?: boolean }>`
  background: ${({ theme, $soft }) => $soft ? theme.colors.paperSoft : theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thick};
  box-shadow: ${({ theme, $accent }) => $accent ? theme.shadow.btc : theme.shadow.base};
  padding: ${({ theme }) => theme.space['4']}px;
`;
```

- [ ] **Step 2: Write `src/ui/Button.tsx`**

```tsx
import styled, { css } from 'styled-components';

type Variant = 'primary' | 'ghost' | 'danger';

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.btc};
    color: ${({ theme }) => theme.colors.ink};
  `,
  ghost: css`
    background: ${({ theme }) => theme.colors.inkPaper};
    color: ${({ theme }) => theme.colors.ink};
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.warn};
    color: ${({ theme }) => theme.colors.inkPaper};
  `,
};

export const Button = styled.button<{ $variant?: Variant }>`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['2']}px ${({ theme }) => theme.space['3']}px;
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme }) => theme.shadow.base};
  cursor: crosshair;
  transition: ${({ theme }) => theme.transition};
  ${({ $variant = 'ghost' }) => variantStyles[$variant]};

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 ${({ theme }) => theme.colors.ink};
  }
  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0 0 0 ${({ theme }) => theme.colors.ink};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
```

- [ ] **Step 3: Write `src/ui/Badge.tsx`**

```tsx
import styled from 'styled-components';

export const Badge = styled.span<{ $accent?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  background: ${({ theme }) => theme.colors.inkPaper};
  color: ${({ theme }) => theme.colors.ink};
  box-shadow: ${({ theme, $accent }) => $accent ? theme.shadow.btc : theme.shadow.base};
`;
```

- [ ] **Step 4: Write `src/ui/Field.tsx`**

```tsx
import styled from 'styled-components';

const base = `
  display: block;
  width: 100%;
  font-size: 15px;
  padding: 8px 12px;
  background: #fffdf7;
  border: 2px solid #0a0a0a;
  box-shadow: 4px 4px 0 #0a0a0a;
  outline: none;
  transition: all 80ms steps(4);
  &:focus { box-shadow: 4px 4px 0 #f7931a; }
`;

export const Input = styled.input`${base}`;
export const Textarea = styled.textarea`${base} resize: vertical; min-height: 80px;`;

export const Label = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: ${({ theme }) => theme.space['1']}px;
`;
```

- [ ] **Step 5: Write `src/ui/HexAddress.tsx`**

```tsx
import styled from 'styled-components';
import { cosmetic } from '../theme/tokens';

const Span = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1px;
`;

export const HexAddress = ({ value = cosmetic.pseudoAddress }: { value?: string }) => (
  <Span>{value}</Span>
);
```

- [ ] **Step 6: Commit**

```bash
git add src/ui
git commit -m "feat(ui): Panel, Button, Badge, Field, HexAddress primitives"
```

---

### Task 5: useDraggable hook

**Files:**
- Create: `src/ui/Window/useDraggable.ts`

- [ ] **Step 1: Write the hook**

```ts
import { useEffect, useRef, useState, useCallback } from 'react';

export type Position = { x: number; y: number };

export interface UseDraggableOptions {
  initial: Position;
  bounds?: { width: number; height: number }; // viewport clamp
  snap?: number; // grid snap (px)
  onDragStart?: () => void;
  onDragEnd?: (final: Position) => void;
}

export function useDraggable({ initial, bounds, snap = 0, onDragStart, onDragEnd }: UseDraggableOptions) {
  const [position, setPosition] = useState<Position>(initial);
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef<Position>({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    offsetRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    setIsDragging(true);
    onDragStart?.();
  }, [position, onDragStart]);

  useEffect(() => {
    if (!isDragging) return;
    const move = (e: PointerEvent) => {
      let nx = e.clientX - offsetRef.current.x;
      let ny = e.clientY - offsetRef.current.y;
      if (snap > 0) {
        nx = Math.round(nx / snap) * snap;
        ny = Math.round(ny / snap) * snap;
      }
      if (bounds) {
        nx = Math.max(0, Math.min(nx, bounds.width));
        ny = Math.max(0, Math.min(ny, bounds.height));
      }
      setPosition({ x: nx, y: ny });
    };
    const up = () => {
      setIsDragging(false);
      onDragEnd?.(position);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [isDragging, bounds, snap, position, onDragEnd]);

  return { position, isDragging, onPointerDown, setPosition };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/ui/Window/useDraggable.ts
git commit -m "feat(ui): useDraggable hook (pointer events, snap, bounds clamp)"
```

---

### Task 6: Window primitive (chrome + drag wiring)

**Files:**
- Create: `src/ui/Window/Window.tsx`
- Create: `src/ui/Window/WindowTitleBar.tsx`
- Create: `src/ui/Window/index.ts` (barrel)

- [ ] **Step 1: Write `src/ui/Window/WindowTitleBar.tsx`**

```tsx
import styled from 'styled-components';
import type { ReactNode } from 'react';

const Bar = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['3']}px;
  background: ${({ theme, $active }) => $active ? theme.colors.ink : theme.colors.paperSoft};
  color: ${({ theme, $active }) => $active ? theme.colors.inkPaper : theme.colors.ink};
  border-bottom: ${({ theme }) => theme.border.thin};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  user-select: none;
  cursor: grab;
  &:active { cursor: grabbing; }
`;

const Title = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['2']}px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Controls = styled.span`
  display: inline-flex;
  gap: ${({ theme }) => theme.space['2']}px;
`;

const CtrlBtn = styled.button<{ $accent?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme, $accent }) => $accent ? theme.colors.btc : 'inherit'};
  font-family: inherit;
  font-size: inherit;
  cursor: crosshair;
  padding: 0 ${({ theme }) => theme.space['1']}px;
`;

export interface WindowTitleBarProps {
  title: string;
  icon?: ReactNode;
  active: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onPointerDown: (e: React.PointerEvent) => void;
}

export const WindowTitleBar = ({ title, icon, active, onClose, onMinimize, onPointerDown }: WindowTitleBarProps) => (
  <Bar $active={active} onPointerDown={onPointerDown}>
    <Title>{icon}<span>▮ {title}</span></Title>
    <Controls>
      {onMinimize && <CtrlBtn onClick={onMinimize} aria-label="minimize">—</CtrlBtn>}
      <CtrlBtn $accent onClick={onClose} aria-label="close">✕</CtrlBtn>
    </Controls>
  </Bar>
);
```

- [ ] **Step 2: Write `src/ui/Window/Window.tsx`**

```tsx
import styled from 'styled-components';
import type { ReactNode } from 'react';
import { useDraggable, type Position } from './useDraggable';
import { WindowTitleBar } from './WindowTitleBar';

const Frame = styled.div<{ $active: boolean; $dragging: boolean; $z: number }>`
  position: absolute;
  background: ${({ theme }) => theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thick};
  box-shadow: ${({ theme, $active, $dragging }) =>
    $dragging ? theme.shadow.drag : $active ? theme.shadow.focus : theme.shadow.base};
  z-index: ${({ $z }) => $z};
  display: flex;
  flex-direction: column;
  min-width: 240px;
`;

const Body = styled.div`
  padding: ${({ theme }) => theme.space['4']}px;
  overflow: auto;
`;

export interface WindowProps {
  id: string;
  title: string;
  icon?: ReactNode;
  position: Position;
  size?: { w: number; h: number };
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus: () => void;
  onPositionChange: (p: Position) => void;
  children: ReactNode;
}

export const Window = ({
  title, icon, position, size, zIndex, isActive,
  onClose, onMinimize, onFocus, onPositionChange, children,
}: WindowProps) => {
  const { position: pos, isDragging, onPointerDown, setPosition } = useDraggable({
    initial: position,
    bounds: { width: window.innerWidth - 280, height: window.innerHeight - 80 },
    onDragEnd: (final) => onPositionChange(final),
  });

  return (
    <Frame
      $active={isActive}
      $dragging={isDragging}
      $z={zIndex}
      style={{ left: pos.x, top: pos.y, width: size?.w, height: size?.h }}
      onMouseDownCapture={() => { if (!isActive) onFocus(); }}
    >
      <WindowTitleBar
        title={title}
        icon={icon}
        active={isActive}
        onClose={onClose}
        onMinimize={onMinimize}
        onPointerDown={(e) => { onFocus(); onPointerDown(e); }}
      />
      <Body onScroll={() => { /* no-op; ensures focus stays on click inside */ }}>
        {children}
      </Body>
      {/* setPosition is exposed for future external resize logic — unused for now */}
      {false && <span style={{ display: 'none' }}>{setPosition}</span>}
    </Frame>
  );
};
```

> Note: the `setPosition` reference at the bottom is a stylistic guard against `noUnusedLocals` flagging it. If TypeScript complains about the dead branch instead, refactor `useDraggable` to expose only what's used and drop `setPosition` from its return.

- [ ] **Step 3: Write `src/ui/Window/index.ts`**

```ts
export { Window } from './Window';
export type { WindowProps } from './Window';
export { WindowTitleBar } from './WindowTitleBar';
export { useDraggable } from './useDraggable';
export type { Position } from './useDraggable';
```

- [ ] **Step 4: Commit**

```bash
git add src/ui/Window
git commit -m "feat(ui): Window primitive with title bar, drag, focus, z-index"
```

---

### Task 7: WindowsContext + supporting hooks

**Files:**
- Replace: `src/contexts/WindowContext.tsx` → delete, then create `src/contexts/WindowsContext.tsx` (note plural)
- Create: `src/hooks/useWindow.ts`
- Create: `src/hooks/usePersistedState.ts`

- [ ] **Step 1: Delete the old context**

Run: `rm src/contexts/WindowContext.tsx`

- [ ] **Step 2: Create `src/contexts/WindowsContext.tsx`**

```tsx
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type WindowId = 'profile' | 'experience' | 'contact' | 'stack' | 'now' | 'not-found';

export interface OpenWindow {
  id: WindowId;
  route: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
  zIndex: number;
  minimized: boolean;
}

interface WindowsContextValue {
  windows: OpenWindow[];
  open: (id: WindowId, route: string) => void;
  close: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  toggleMinimize: (id: WindowId) => void;
  updatePosition: (id: WindowId, position: { x: number; y: number }) => void;
  topId: WindowId | null;
}

const Ctx = createContext<WindowsContextValue | null>(null);

const DEFAULTS: Record<WindowId, { position: {x:number;y:number}; size: {w:number;h:number} }> = {
  profile:     { position: { x: 140, y: 80 },  size: { w: 420, h: 360 } },
  experience:  { position: { x: 180, y: 110 }, size: { w: 560, h: 440 } },
  contact:     { position: { x: 220, y: 140 }, size: { w: 460, h: 480 } },
  stack:       { position: { x: 260, y: 170 }, size: { w: 420, h: 360 } },
  now:         { position: { x: 300, y: 200 }, size: { w: 320, h: 340 } },
  'not-found': { position: { x: 200, y: 200 }, size: { w: 360, h: 200 } },
};

export const WindowsProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [counter, setCounter] = useState(1000);

  const bumpZ = useCallback(() => {
    setCounter((c) => c + 1);
    return counter + 1;
  }, [counter]);

  const open = useCallback((id: WindowId, route: string) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: counter + 1 } : w);
      }
      const def = DEFAULTS[id];
      return [...prev, { id, route, position: def.position, size: def.size, zIndex: counter + 1, minimized: false }];
    });
    bumpZ();
  }, [counter, bumpZ]);

  const close = useCallback((id: WindowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focus = useCallback((id: WindowId) => {
    setWindows((prev) => prev.map((w) =>
      w.id === id ? { ...w, minimized: false, zIndex: counter + 1 } : w));
    bumpZ();
  }, [counter, bumpZ]);

  const toggleMinimize = useCallback((id: WindowId) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: !w.minimized } : w));
  }, []);

  const updatePosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, position } : w));
  }, []);

  const topId = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized);
    if (visible.length === 0) return null;
    return visible.reduce((top, w) => w.zIndex > top.zIndex ? w : top).id;
  }, [windows]);

  const value = useMemo<WindowsContextValue>(() => ({
    windows, open, close, focus, toggleMinimize, updatePosition, topId,
  }), [windows, open, close, focus, toggleMinimize, updatePosition, topId]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useWindows = (): WindowsContextValue => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useWindows must be used inside <WindowsProvider>');
  return v;
};
```

- [ ] **Step 3: Create `src/hooks/usePersistedState.ts`**

```ts
import { useEffect, useState } from 'react';

export function usePersistedState<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? initial : JSON.parse(raw) as T;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore quota */ }
  }, [key, value]);
  return [value, setValue];
}
```

- [ ] **Step 4: Create `src/hooks/useWindow.ts`**

```ts
import { useWindows } from '../contexts/WindowsContext';

// Convenience wrapper around useWindows for the common "give me state of one window" lookup.
export const useWindow = (id: Parameters<ReturnType<typeof useWindows>['open']>[0]) => {
  const { windows, topId } = useWindows();
  const w = windows.find((x) => x.id === id);
  return { window: w, isActive: topId === id };
};
```

- [ ] **Step 5: Commit**

```bash
git add src/contexts src/hooks
git commit -m "feat(state): WindowsContext (multi-window state) + usePersistedState/useWindow"
```

---

### Task 8: Desktop + DesktopIcon

**Files:**
- Create: `src/ui/Desktop/Desktop.tsx`
- Create: `src/ui/Desktop/DesktopIcon.tsx`
- Create: `src/ui/Desktop/StatusStrip.tsx`
- Create: `src/ui/Desktop/index.ts`

- [ ] **Step 1: Write `src/ui/Desktop/StatusStrip.tsx`**

```tsx
import styled from 'styled-components';
import { cosmetic } from '../../theme/tokens';
import { HexAddress } from '../HexAddress';

const Strip = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.space['3']}px;
  background: ${({ theme }) => theme.colors.paperSoft};
  border-bottom: ${({ theme }) => theme.border.thin};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const Left = styled.span` font-weight: 900; `;
const Right = styled.span` display: inline-flex; gap: ${({ theme }) => theme.space['3']}px; align-items: center; `;
const Status = styled.span`
  &::before {
    content: '●';
    color: ${({ theme }) => theme.colors.ok};
    margin-right: 4px;
  }
`;
const LangBtn = styled.button`
  background: transparent;
  border: none;
  font: inherit;
  letter-spacing: 1.5px;
  text-transform: none;
  cursor: crosshair;
`;

export interface StatusStripProps {
  language: 'es' | 'en';
  onToggleLanguage: () => void;
}

export const StatusStrip = ({ language, onToggleLanguage }: StatusStripProps) => (
  <Strip>
    <Left>PSLG · {cosmetic.appVersion}</Left>
    <Right>
      <Status>online</Status>
      <HexAddress />
      <LangBtn onClick={onToggleLanguage} aria-label="toggle language">
        {language === 'es' ? 'ES / en' : 'es / EN'}
      </LangBtn>
    </Right>
  </Strip>
);
```

- [ ] **Step 2: Write `src/ui/Desktop/DesktopIcon.tsx`**

```tsx
import styled from 'styled-components';
import type { ReactNode } from 'react';

const Wrap = styled.button<{ $highlight: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 78px;
  gap: ${({ theme }) => theme.space['1']}px;
  padding: ${({ theme }) => theme.space['1']}px;
  background: transparent;
  border: 2px dashed ${({ theme, $highlight }) => $highlight ? theme.colors.ink : 'transparent'};
  cursor: crosshair;
`;

const Tile = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thin};
  box-shadow: 3px 3px 0 ${({ theme }) => theme.colors.ink};
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onActivate: () => void;
  onHighlight: () => void;
  highlighted: boolean;
}

export const DesktopIcon = ({ label, icon, onActivate, onHighlight, highlighted }: DesktopIconProps) => (
  <Wrap
    $highlight={highlighted}
    onClick={onHighlight}
    onDoubleClick={onActivate}
  >
    <Tile>{icon}</Tile>
    <Label>{label}</Label>
  </Wrap>
);
```

- [ ] **Step 3: Write `src/ui/Desktop/Desktop.tsx`**

```tsx
import styled from 'styled-components';
import type { ReactNode } from 'react';

const Root = styled.div`
  position: absolute;
  top: 34px; bottom: 38px; left: 0; right: 0;
  background-color: ${({ theme }) => theme.colors.paper};
  background-image: radial-gradient(${({ theme }) => theme.colors.ink} 1px, transparent 1px);
  background-size: 12px 12px;
  background-position: 0 0;
  /* dots are 35% opacity by virtue of paper bg dominating; if needed, mask: */
  &::before {
    content: '';
    position: absolute; inset: 0;
    background: ${({ theme }) => theme.colors.paper};
    opacity: 0.65;
    pointer-events: none;
  }
  & > * { position: relative; }
`;

const IconColumn = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.space['4']}px;
  left: ${({ theme }) => theme.space['3']}px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']}px;
  z-index: 1;
`;

const WindowCanvas = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  & > * { pointer-events: auto; }
`;

export const Desktop = ({ icons, children }: { icons: ReactNode; children: ReactNode }) => (
  <Root>
    <IconColumn>{icons}</IconColumn>
    <WindowCanvas>{children}</WindowCanvas>
  </Root>
);
```

- [ ] **Step 4: Write `src/ui/Desktop/index.ts`**

```ts
export { Desktop } from './Desktop';
export { DesktopIcon } from './DesktopIcon';
export { StatusStrip } from './StatusStrip';
```

- [ ] **Step 5: Commit**

```bash
git add src/ui/Desktop
git commit -m "feat(ui): Desktop canvas, StatusStrip, DesktopIcon"
```

---

### Task 9: Taskbar + TaskbarItem + BlockBadge

**Files:**
- Create: `src/ui/Taskbar/Taskbar.tsx`
- Create: `src/ui/Taskbar/TaskbarItem.tsx`
- Create: `src/ui/Taskbar/BlockBadge.tsx`
- Create: `src/ui/Taskbar/useBlockNumber.ts`
- Create: `src/ui/Taskbar/index.ts`

- [ ] **Step 1: Write `src/ui/Taskbar/useBlockNumber.ts`**

```ts
import { useEffect, useState } from 'react';
import { cosmetic } from '../../theme/tokens';

const compute = () =>
  cosmetic.blockBaseline + Math.floor((Date.now() - cosmetic.blockEpoch) / cosmetic.blockTickMs);

export const useBlockNumber = () => {
  const [n, setN] = useState(compute);
  useEffect(() => {
    const id = setInterval(() => setN(compute()), cosmetic.blockTickMs);
    return () => clearInterval(id);
  }, []);
  return n;
};

export const getBlockNumber = compute;
```

- [ ] **Step 2: Write `src/ui/Taskbar/BlockBadge.tsx`**

```tsx
import styled from 'styled-components';
import { useBlockNumber } from './useBlockNumber';

const Chip = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.85;
`;

export const BlockBadge = () => {
  const n = useBlockNumber();
  return <Chip>BLOCK #{n.toLocaleString('en-US')}</Chip>;
};
```

- [ ] **Step 3: Write `src/ui/Taskbar/TaskbarItem.tsx`**

```tsx
import styled from 'styled-components';

const Btn = styled.button<{ $active: boolean; $minimized: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['3']}px;
  background: ${({ theme, $active }) => $active ? theme.colors.inkPaper : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.ink : theme.colors.inkPaper};
  border: 2px solid ${({ theme, $active }) => $active ? theme.colors.inkPaper : theme.colors.muted};
  opacity: ${({ $minimized }) => $minimized ? 0.5 : 1};
  text-decoration: ${({ $minimized }) => $minimized ? 'line-through' : 'none'};
  cursor: crosshair;
`;

export interface TaskbarItemProps {
  label: string;
  active: boolean;
  minimized: boolean;
  onClick: () => void;
}

export const TaskbarItem = ({ label, active, minimized, onClick }: TaskbarItemProps) => (
  <Btn $active={active} $minimized={minimized} onClick={onClick}>{label}</Btn>
);
```

- [ ] **Step 4: Write `src/ui/Taskbar/Taskbar.tsx`**

```tsx
import styled from 'styled-components';
import { useEffect, useState, type ReactNode } from 'react';
import { BlockBadge } from './BlockBadge';

const Bar = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 38px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space['2']}px;
  padding: 0 ${({ theme }) => theme.space['2']}px;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.inkPaper};
  border-top: ${({ theme }) => theme.border.thick};
  z-index: 10;
`;

const Start = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.btc};
  color: ${({ theme }) => theme.colors.ink};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-weight: 900;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xs};
  border: 2px solid ${({ theme }) => theme.colors.inkPaper};
  padding: 5px 10px;
  cursor: crosshair;
  transition: ${({ theme }) => theme.transition};
  &:hover { transform: translate(2px, 2px); }
`;

const Right = styled.span`
  margin-left: auto;
  display: inline-flex;
  gap: ${({ theme }) => theme.space['3']}px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const Clock = () => {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const hh = String(t.getHours()).padStart(2, '0');
  const mm = String(t.getMinutes()).padStart(2, '0');
  const offset = -t.getTimezoneOffset() / 60;
  const tz = `GMT${offset >= 0 ? '+' : ''}${offset}`;
  return <span>{hh}:{mm} {tz}</span>;
};

export const Taskbar = ({ items }: { items: ReactNode }) => (
  <Bar>
    <Start aria-label="start" tabIndex={-1}>⬢ Start</Start>
    {items}
    <Right>
      <BlockBadge />
      <Clock />
    </Right>
  </Bar>
);
```

- [ ] **Step 5: Write `src/ui/Taskbar/index.ts`**

```ts
export { Taskbar } from './Taskbar';
export { TaskbarItem } from './TaskbarItem';
export { BlockBadge } from './BlockBadge';
export { useBlockNumber, getBlockNumber } from './useBlockNumber';
```

- [ ] **Step 6: Commit**

```bash
git add src/ui/Taskbar
git commit -m "feat(ui): Taskbar, TaskbarItem, BlockBadge with live cosmetic counter"
```

---

### Task 10: BootSequence

**Files:**
- Create: `src/ui/Boot/bootLines.ts`
- Create: `src/ui/Boot/BootSequence.tsx`
- Create: `src/ui/Boot/index.ts`

- [ ] **Step 1: Write `src/ui/Boot/bootLines.ts`**

```ts
export interface BootLine {
  text: string;
  delayMs: number;
}

export const bootLines: BootLine[] = [
  { text: '$ pslg.boot --user=visitor', delayMs: 80 },
  { text: '> mounting /profile        [ok]', delayMs: 280 },
  { text: '> mounting /experience     [ok]', delayMs: 380 },
  { text: '> mounting /stack          [ok]', delayMs: 480 },
  { text: '> mounting /contact        [ok]', delayMs: 580 },
  { text: '> syncing block            [ok]', delayMs: 680 },
  { text: '> ready ▮', delayMs: 800 },
];

export const TOTAL_BOOT_MS = 2400;
```

- [ ] **Step 2: Write `src/ui/Boot/BootSequence.tsx`**

```tsx
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { bootLines, TOTAL_BOOT_MS } from './bootLines';

const fadeOut = keyframes`from { opacity: 1 } to { opacity: 0 }`;

const Root = styled.div<{ $exiting: boolean }>`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.paper};
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: ${({ theme }) => theme.space['6']}px;
  z-index: 9999;
  ${({ $exiting }) => $exiting && `animation: ${fadeOut} 200ms forwards;`}
`;

const Line = styled.div` line-height: 1.7; `;
const blink = keyframes`50% { opacity: 0 }`;
const Cursor = styled.span` animation: ${blink} 700ms steps(2) infinite; `;
const Skip = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.space['3']}px;
  bottom: ${({ theme }) => theme.space['3']}px;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.muted};
  font: inherit;
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 8px;
  cursor: crosshair;
`;

export const BootSequence = ({ onDone }: { onDone: () => void }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delayMs));
    const endTimer = setTimeout(() => setExiting(true), TOTAL_BOOT_MS - 200);
    const doneTimer = setTimeout(onDone, TOTAL_BOOT_MS);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(endTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <Root $exiting={exiting}>
      {bootLines.slice(0, visibleCount).map((l, i) => (
        <Line key={i}>{l.text}{i === visibleCount - 1 && <Cursor>_</Cursor>}</Line>
      ))}
      <Skip onClick={onDone}>skip</Skip>
    </Root>
  );
};
```

- [ ] **Step 3: Write `src/ui/Boot/index.ts`**

```ts
export { BootSequence } from './BootSequence';
```

- [ ] **Step 4: Commit**

```bash
git add src/ui/Boot
git commit -m "feat(ui): BootSequence (first-visit terminal intro with skip)"
```

---

### Task 11: Data + slim LanguageContext

**Files:**
- Modify: `src/data/experiences.ts` (reshape, fill placeholder; user fills real data later)
- Create: `src/data/profile.ts`
- Create: `src/data/stack.ts`
- Create: `src/data/now.ts`
- Modify: `src/contexts/LanguageContext.tsx` (slim down translations)

> **Important:** the existing `experiences.ts` from the snapshot commit only exports the `Experience` interface — no array. The user populates entries themselves. This task adds a typed placeholder array so the app renders end-to-end; the user replaces it with real data later.

- [ ] **Step 1: Update `src/data/experiences.ts`**

```ts
export interface Experience {
  id: string;
  company: string;
  client?: string;
  location: string;
  period: { en: string; es: string };
  title: { en: string; es: string };
  abstract: { en: string; es: string };
  role: string;
  technologies: string[];
}

// Placeholder content — replace with real experiences before publishing.
export const experiences: Experience[] = [
  {
    id: 'argenway-2023',
    company: 'ARGENWAY',
    location: 'Córdoba, AR',
    period: { en: '2023 — Present', es: '2023 — Presente' },
    title: { en: 'Senior .NET Architect', es: 'Arquitecto Senior .NET' },
    abstract: {
      en: 'Led the migration to .NET 8 and rebuilt the core billing module.',
      es: 'Lideré la migración a .NET 8 y reescribí el módulo central de facturación.',
    },
    role: 'Architect / Tech Lead',
    technologies: ['.NET 8', 'C#', 'Azure', 'React', 'SQL Server'],
  },
];
```

- [ ] **Step 2: Create `src/data/profile.ts`**

```ts
export interface ProfileData {
  name: string;
  city: string;
  bio: { en: string; es: string };
  cvPath: string | null; // null hides the CV button
  socials: { label: string; href: string }[];
}

export const profile: ProfileData = {
  name: 'Pedro S. Luciano Gomez',
  city: 'CÓRDOBA, AR',
  bio: {
    en: 'Senior .NET Full Stack Developer · 15+ years building web and desktop apps. Specialised in C#, .NET Core, React, SQL Server, and Azure.',
    es: 'Senior .NET Full Stack Developer · 15+ años construyendo apps web y desktop. Especializado en C#, .NET Core, React, SQL Server y Azure.',
  },
  cvPath: null, // set to '/cv.pdf' once the file exists in public/
  socials: [
    { label: 'GitHub',   href: 'https://github.com/pslucianogomez' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pslucianogomez/' },
    { label: 'Email',    href: 'mailto:pslucianogomez@gmail.com' },
  ],
};
```

- [ ] **Step 3: Create `src/data/stack.ts`**

```ts
export interface StackItem {
  name: string;
  years: number;
  core?: boolean;
}

export interface StackGroup {
  category: string;
  items: StackItem[];
}

export const stack: StackGroup[] = [
  {
    category: 'LANGUAGES',
    items: [
      { name: 'C#', years: 15, core: true },
      { name: 'TypeScript', years: 6 },
      { name: 'JavaScript', years: 12 },
      { name: 'SQL', years: 14 },
    ],
  },
  {
    category: 'FRAMEWORKS',
    items: [
      { name: '.NET', years: 15, core: true },
      { name: 'React', years: 6, core: true },
      { name: 'Entity Framework', years: 10 },
      { name: 'ASP.NET MVC', years: 12 },
    ],
  },
  {
    category: 'CLOUD',
    items: [
      { name: 'Azure', years: 8, core: true },
      { name: 'Azure DevOps', years: 6 },
    ],
  },
  {
    category: 'DATA',
    items: [
      { name: 'SQL Server', years: 14 },
      { name: 'PostgreSQL', years: 4 },
    ],
  },
  {
    category: 'TOOLS',
    items: [
      { name: 'Git', years: 12 },
      { name: 'Docker', years: 5 },
      { name: 'Vite', years: 2 },
    ],
  },
];
```

- [ ] **Step 4: Create `src/data/now.ts`**

```ts
export interface NowRow {
  label: string;
  value: { en: string; es: string } | null;
}

export const now: NowRow[] = [
  { label: 'STATUS',       value: { en: '● OPEN_TO_WORK', es: '● ABIERTO_A_OFERTAS' } },
  { label: 'LOCATION',     value: { en: 'Córdoba, AR · GMT-3', es: 'Córdoba, AR · GMT-3' } },
  { label: 'CURRENTLY',    value: { en: 'Redesigning this site (meta)', es: 'Rediseñando este sitio (meta)' } },
  { label: 'LAST COMMIT',  value: { en: 'pslucianogomez.com.ar', es: 'pslucianogomez.com.ar' } },
  { label: 'LISTENING TO', value: null },
  { label: 'READING',      value: null },
  { label: 'UPDATED',      value: { en: '2026-05-23', es: '2026-05-23' } },
];
```

- [ ] **Step 5: Slim `src/contexts/LanguageContext.tsx`**

Replace the file's `translations` object with the much smaller set below, keeping the rest of the file (provider, hook) unchanged:

```ts
const translations: Record<Language, Record<string, string>> = {
  en: {
    'icon.profile': 'Profile',
    'icon.experience': 'Experience',
    'icon.contact': 'Contact',
    'icon.stack': 'Stack',
    'icon.now': 'Now',

    'profile.hireMe': 'Hire Me →',
    'profile.downloadCv': 'Download CV',

    'experience.empty': 'No experiences yet.',
    'experience.open': 'open',
    'experience.close': 'close',

    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send →',
    'contact.sending': 'Sending…',
    'contact.success': 'Message sent · Block',
    'contact.error': 'Failed to send. Try again.',

    'notFound.title': 'Route not found',
    'notFound.body': 'The route you typed does not exist.',
    'notFound.back': 'Back to desktop',
  },
  es: {
    'icon.profile': 'Perfil',
    'icon.experience': 'Experiencia',
    'icon.contact': 'Contacto',
    'icon.stack': 'Stack',
    'icon.now': 'Now',

    'profile.hireMe': 'Contratame →',
    'profile.downloadCv': 'Descargar CV',

    'experience.empty': 'Aún no hay experiencias cargadas.',
    'experience.open': 'abrir',
    'experience.close': 'cerrar',

    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar →',
    'contact.sending': 'Enviando…',
    'contact.success': 'Mensaje enviado · Block',
    'contact.error': 'No se pudo enviar. Probá de nuevo.',

    'notFound.title': 'Ruta no encontrada',
    'notFound.body': 'La ruta que ingresaste no existe.',
    'notFound.back': 'Volver al escritorio',
  },
};
```

Verify the file still exports `LanguageProvider`, `useLanguage`, and types unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/data src/contexts/LanguageContext.tsx
git commit -m "feat(data): profile/stack/now data + reshape experiences + slim translations"
```

---

### Task 12: Routes + App assembly (shell visible end-to-end)

**Files:**
- Create: `src/routes.tsx`
- Modify: `src/App.tsx` (complete rewrite)
- Modify: `src/main.tsx` (import fonts; barring that, leave structure)
- Create: `src/ui/Shell.tsx` (composes Desktop + Taskbar + windows from context)

> At the end of this task the site builds and runs. Windows mount with placeholder text — features in Tasks 13-17 fill the bodies.

- [ ] **Step 1: Write `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme/fonts';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 2: Write `src/ui/Shell.tsx`**

```tsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Desktop, DesktopIcon, StatusStrip } from './Desktop';
import { Taskbar, TaskbarItem } from './Taskbar';
import { Window } from './Window';
import { Glyph, type GlyphName } from './Glyph';
import { useWindows, type WindowId } from '../contexts/WindowsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BootSequence } from './Boot';
import { usePersistedState } from '../hooks/usePersistedState';

const ICON_MAP: Array<{ id: WindowId; route: string; glyph: GlyphName; tKey: string }> = [
  { id: 'profile',    route: '/profile',    glyph: 'user',      tKey: 'icon.profile' },
  { id: 'experience', route: '/experience', glyph: 'briefcase', tKey: 'icon.experience' },
  { id: 'stack',      route: '/stack',      glyph: 'box',       tKey: 'icon.stack' },
  { id: 'now',        route: '/now',        glyph: 'pulse',     tKey: 'icon.now' },
  { id: 'contact',    route: '/contact',    glyph: 'mail',      tKey: 'icon.contact' },
];

export const Shell = ({ children }: { children: (id: WindowId) => React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { windows, open, close, focus, toggleMinimize, updatePosition, topId } = useWindows();
  const { t, language, setLanguage } = useLanguage();

  const [highlighted, setHighlighted] = useState<WindowId | null>(null);

  // sync route → open window
  useEffect(() => {
    const match = ICON_MAP.find((i) => location.pathname.startsWith(i.route));
    if (match) open(match.id, match.route);
  }, [location.pathname, open]);

  // sync focused window → URL (replace, not push)
  useEffect(() => {
    if (topId) {
      const match = ICON_MAP.find((i) => i.id === topId);
      if (match && !location.pathname.startsWith(match.route)) {
        navigate(match.route, { replace: true });
      }
    } else if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [topId, navigate, location.pathname]);

  const [bootSeen, setBootSeen] = usePersistedState<boolean>('pslg.boot-seen', false);
  const [showBoot, setShowBoot] = useState(!bootSeen);

  return (
    <>
      {showBoot && (
        <BootSequence onDone={() => { setShowBoot(false); setBootSeen(true); }} />
      )}
      <StatusStrip language={language} onToggleLanguage={() => setLanguage(language === 'es' ? 'en' : 'es')} />
      <Desktop
        icons={ICON_MAP.map((i) => (
          <DesktopIcon
            key={i.id}
            label={t(i.tKey)}
            icon={<Glyph name={i.glyph} size={26} />}
            highlighted={highlighted === i.id}
            onHighlight={() => setHighlighted(i.id)}
            onActivate={() => navigate(i.route)}
          />
        ))}
      >
        {windows.filter(w => !w.minimized).map((w) => {
          const meta = ICON_MAP.find((m) => m.id === w.id);
          return (
            <Window
              key={w.id}
              id={w.id}
              title={meta ? t(meta.tKey) : w.id}
              icon={meta ? <Glyph name={meta.glyph} size={14} /> : null}
              position={w.position}
              size={w.size}
              zIndex={w.zIndex}
              isActive={topId === w.id}
              onClose={() => close(w.id)}
              onMinimize={() => toggleMinimize(w.id)}
              onFocus={() => focus(w.id)}
              onPositionChange={(p) => updatePosition(w.id, p)}
            >
              {children(w.id)}
            </Window>
          );
        })}
      </Desktop>
      <Taskbar
        items={windows.map((w) => {
          const meta = ICON_MAP.find((m) => m.id === w.id);
          return (
            <TaskbarItem
              key={w.id}
              label={meta ? t(meta.tKey) : w.id}
              active={topId === w.id && !w.minimized}
              minimized={w.minimized}
              onClick={() => {
                if (w.minimized) focus(w.id);
                else if (topId === w.id) toggleMinimize(w.id);
                else focus(w.id);
              }}
            />
          );
        })}
      />
    </>
  );
};
```

- [ ] **Step 3: Write `src/routes.tsx`**

```tsx
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Shell } from './ui/Shell';
import type { WindowId } from './contexts/WindowsContext';
import { Button } from './ui/Button';
import { useLanguage } from './contexts/LanguageContext';

// Feature components — created in Tasks 13-17. Until then these are stubs.
import { Profile } from './features/Profile/Profile';
import { ExperienceList } from './features/Experience/ExperienceList';
import { Contact } from './features/Contact/Contact';
import { Stack } from './features/Stack/Stack';
import { Now } from './features/Now/Now';

const NotFound = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <div>
      <p style={{ fontFamily: 'JetBrains Mono', margin: 0, marginBottom: 16 }}>
        0xDEAD · {t('notFound.body')}
      </p>
      <Button $variant="primary" onClick={() => navigate('/')}>{t('notFound.back')}</Button>
    </div>
  );
};

const renderContent = (id: WindowId) => {
  switch (id) {
    case 'profile':     return <Profile />;
    case 'experience':  return <ExperienceList />;
    case 'contact':     return <Contact />;
    case 'stack':       return <Stack />;
    case 'now':         return <Now />;
    case 'not-found':   return <NotFound />;
  }
};

export const AppRoutes = () => (
  <BrowserRouter>
    <Shell>{renderContent}</Shell>
    <Routes>
      <Route path="/" element={null} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/profile" element={null} />
      <Route path="/experience" element={null} />
      <Route path="/experience/:id" element={null} />
      <Route path="/contact" element={null} />
      <Route path="/stack" element={null} />
      <Route path="/now" element={null} />
      <Route path="*" element={null} />
    </Routes>
  </BrowserRouter>
);
```

- [ ] **Step 4: Write feature stubs (will be filled in Tasks 13-17)**

Create each file with a placeholder. They are imported by `routes.tsx` so they must exist.

`src/features/Profile/Profile.tsx`:
```tsx
export const Profile = () => <div>Profile — pending Task 13</div>;
```

`src/features/Experience/ExperienceList.tsx`:
```tsx
export const ExperienceList = () => <div>Experience — pending Task 14</div>;
```

`src/features/Contact/Contact.tsx`:
```tsx
export const Contact = () => <div>Contact — pending Task 15</div>;
```

`src/features/Stack/Stack.tsx`:
```tsx
export const Stack = () => <div>Stack — pending Task 16</div>;
```

`src/features/Now/Now.tsx`:
```tsx
export const Now = () => <div>Now — pending Task 17</div>;
```

- [ ] **Step 5: Write `src/App.tsx`**

```tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyle } from './theme/GlobalStyle';
import { LanguageProvider } from './contexts/LanguageContext';
import { WindowsProvider } from './contexts/WindowsContext';
import { AppRoutes } from './routes';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <LanguageProvider>
      <WindowsProvider>
        <AppRoutes />
      </WindowsProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default App;
```

- [ ] **Step 6: Run dev server and verify the shell**

Run: `npm run dev`
Open: the URL Vite prints (usually `http://localhost:5173/`).

**Manual checks (FIRST visit — clear localStorage if needed):**
- Boot sequence runs: ~7 lines, ends in fade ~2.5s. SKIP button works.
- After boot: cream background with dots, top status strip (`PSLG · v3.0 · ● online · 0x4F…A91C · ES / en`), 5 desktop icons in left column, bottom black taskbar with `⬢ Start`, block number, clock.
- Double-click "Profile" icon → window opens at ~(140, 80) with the stub text. URL updates to `/profile`. Taskbar shows the open window.
- Drag the window's title bar — it moves, shadow turns btc-orange while dragging.
- Click another icon (Experience) → second window opens, becomes active (focused), URL updates to `/experience`.
- Click on the inactive window's body — it focuses, URL changes back, taskbar reflects.
- Click "—" (minimize) on a window — hides it, taskbar item gets strikethrough.
- Click the minimized taskbar item — restores.
- Click "✕" — closes. If last window closed, URL goes to `/`.
- Reload — boot does NOT show again. Status strip language toggle (`ES / en`) switches case to indicate active.
- Visit `/login` directly — redirects to `/`.

Stop the server.

- [ ] **Step 7: Commit**

```bash
git add src/main.tsx src/App.tsx src/routes.tsx src/ui/Shell.tsx src/features
git commit -m "feat(app): wire Shell, routes, providers — site builds & runs end-to-end"
```

---

### Task 13: Profile feature

**Files:**
- Modify: `src/features/Profile/Profile.tsx`

- [ ] **Step 1: Replace stub with full implementation**

```tsx
import styled from 'styled-components';
import { Button } from '../../ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { useWindows } from '../../contexts/WindowsContext';
import { profile } from '../../data/profile';
import { cosmetic } from '../../theme/tokens';
import profileAvatar from '../../assets/profile-avatar.jpg';

const Top = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['3']}px;
  align-items: flex-start;
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border: ${({ theme }) => theme.border.thin};
  flex-shrink: 0;
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-size: ${({ theme }) => theme.fontSize.xl};
  letter-spacing: -0.3px;
  margin: 0;
`;

const Meta = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 2px;
`;

const Bio = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.45;
  margin: ${({ theme }) => theme.space['3']}px 0 0 0;
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']}px;
  margin-top: ${({ theme }) => theme.space['4']}px;
`;

const Socials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space['2']}px;
  margin-top: ${({ theme }) => theme.space['4']}px;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${({ theme }) => theme.colors.inkPaper};
  text-decoration: none;
  cursor: crosshair;
`;

export const Profile = () => {
  const { t, language } = useLanguage();
  const { open } = useWindows();
  return (
    <>
      <Top>
        <Avatar src={profileAvatar} alt={profile.name} />
        <div>
          <Name>{profile.name}</Name>
          <Meta>{cosmetic.pseudoAddress} · {profile.city}</Meta>
        </div>
      </Top>
      <Bio>{profile.bio[language]}</Bio>
      <Actions>
        <Button $variant="primary" onClick={() => open('contact', '/contact')}>
          {t('profile.hireMe')}
        </Button>
        {profile.cvPath && (
          <Button as="a" href={profile.cvPath} download $variant="ghost">
            {t('profile.downloadCv')}
          </Button>
        )}
      </Actions>
      <Socials>
        {profile.socials.map((s) => (
          <SocialLink key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</SocialLink>
        ))}
      </Socials>
    </>
  );
};
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev`
Open `/profile`. Verify:
- Avatar 64×64 shows (profile-avatar.jpg from existing assets)
- Name in Space Grotesk 28px, meta in mono with pseudo-address
- Bio reads in current language; toggle ES/EN → text swaps
- HIRE ME button opens the Contact window (you should see two windows now)
- DOWNLOAD CV button is HIDDEN (because `cvPath: null`)
- 3 social links at the foot, open in new tab

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/features/Profile/Profile.tsx
git commit -m "feat(profile): hero window with bio, HIRE ME, socials, conditional CV"
```

---

### Task 14: Experience feature

**Files:**
- Modify: `src/features/Experience/ExperienceList.tsx`

- [ ] **Step 1: Replace stub with full implementation**

```tsx
import styled from 'styled-components';
import { useState } from 'react';
import { experiences, type Experience } from '../../data/experiences';
import { useLanguage } from '../../contexts/LanguageContext';

const Item = styled.article<{ $expanded: boolean }>`
  background: ${({ theme }) => theme.colors.inkPaper};
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme, $expanded }) => $expanded ? theme.shadow.btc : theme.shadow.base};
  padding: ${({ theme }) => theme.space['3']}px;
  margin-bottom: ${({ theme }) => theme.space['3']}px;
`;

const Period = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink};
  padding-bottom: ${({ theme }) => theme.space['1']}px;
  margin-bottom: ${({ theme }) => theme.space['2']}px;
`;

const Header = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  cursor: crosshair;
`;

const Company = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-weight: 900;
  font-size: ${({ theme }) => theme.fontSize.lg};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Affordance = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.muted};
  &::before { content: '['; }
  &::after  { content: ']'; }
`;

const Role = styled.div`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-top: 2px;
`;

const Detail = styled.div`
  margin-top: ${({ theme }) => theme.space['3']}px;
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.45;
`;

const Techs = styled.div`
  margin-top: ${({ theme }) => theme.space['3']}px;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const Empty = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.muted};
`;

const ExperienceCard = ({ exp, isOpen, onToggle, lang, openLabel, closeLabel }: {
  exp: Experience; isOpen: boolean; onToggle: () => void;
  lang: 'en' | 'es'; openLabel: string; closeLabel: string;
}) => (
  <Item $expanded={isOpen}>
    <Period>{exp.period[lang]}</Period>
    <Header onClick={onToggle} aria-expanded={isOpen}>
      <span>
        <Company>▮ {exp.company}</Company>
        <Role>{exp.title[lang]}</Role>
      </span>
      <Affordance>{isOpen ? closeLabel : openLabel}</Affordance>
    </Header>
    {isOpen && (
      <>
        <Detail>{exp.abstract[lang]}</Detail>
        <Techs>stack: {exp.technologies.join(' · ')}</Techs>
      </>
    )}
  </Item>
);

export const ExperienceList = () => {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);
  if (experiences.length === 0) {
    return <Empty>{t('experience.empty')}</Empty>;
  }
  return (
    <div>
      {experiences.map((e) => (
        <ExperienceCard
          key={e.id}
          exp={e}
          isOpen={openId === e.id}
          onToggle={() => setOpenId(openId === e.id ? null : e.id)}
          lang={language}
          openLabel={t('experience.open')}
          closeLabel={t('experience.close')}
        />
      ))}
    </div>
  );
};
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev` → `/experience`.
- See ARGENWAY card (placeholder data). Period in mono, company uppercase big, role below, `[open]` affordance on the right.
- Click the card header → expands inline, shows abstract + stack list, affordance flips to `[close]`, shadow turns btc.
- Click again → collapses.
- ES/EN toggle swaps period/title/abstract.

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/features/Experience/ExperienceList.tsx
git commit -m "feat(experience): brutalist timeline with inline expand/collapse"
```

---

### Task 15: Contact feature

**Files:**
- Modify: `src/features/Contact/Contact.tsx`

- [ ] **Step 1: Replace stub with full implementation**

```tsx
import styled from 'styled-components';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '../../ui/Button';
import { Input, Textarea, Label } from '../../ui/Field';
import { useLanguage } from '../../contexts/LanguageContext';
import { getBlockNumber } from '../../ui/Taskbar';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space['3']}px;
`;

const Notice = styled.div<{ $tone: 'ok' | 'warn' }>`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  box-shadow: ${({ theme }) => theme.shadow.base};
  background: ${({ theme, $tone }) =>
    $tone === 'ok' ? theme.colors.ok : theme.colors.warn};
  color: ${({ theme }) => theme.colors.inkPaper};
`;

// EmailJS config — pulled from Vite env. Required:
// VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
const SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;

export const Contact = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [errorText, setErrorText] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!SERVICE || !TEMPLATE || !PUBLIC) {
      setErrorText('EmailJS env vars missing'); setState('err'); return;
    }
    setState('sending');
    try {
      await emailjs.send(SERVICE, TEMPLATE, { from_name: name, reply_to: email, message }, { publicKey: PUBLIC });
      setName(''); setEmail(''); setMessage('');
      setState('ok');
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Unknown error');
      setState('err');
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="name">{t('contact.name')}</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">{t('contact.email')}</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="message">{t('contact.message')}</Label>
        <Textarea id="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </div>
      <Button $variant="primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? t('contact.sending') : t('contact.send')}
      </Button>
      {state === 'ok' && (
        <Notice $tone="ok">{t('contact.success')} #{getBlockNumber().toLocaleString('en-US')}</Notice>
      )}
      {state === 'err' && (
        <Notice $tone="warn">{t('contact.error')} {errorText && `· ${errorText}`}</Notice>
      )}
    </Form>
  );
};
```

- [ ] **Step 2: Document required env vars**

Create `.env.example` at the repo root:

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Add `.env` (without the `.example`) to `.gitignore` if it's not already covered by `*.local`.

- [ ] **Step 3: Manual verification**

Run: `npm run dev` → `/contact`.
- Form renders with three fields and a primary "SEND →" button.
- Submit without env vars → red `warn` notice "EmailJS env vars missing".
- (With env vars in `.env`) submit valid data → green `ok` notice "MESSAGE SENT · BLOCK #..." and form clears.
- ES/EN toggle swaps the field labels and button text.

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/features/Contact/Contact.tsx .env.example .gitignore
git commit -m "feat(contact): EmailJS form with ok/warn panels and live block badge"
```

---

### Task 16: Stack feature

**Files:**
- Modify: `src/features/Stack/Stack.tsx`

- [ ] **Step 1: Replace stub with full implementation**

```tsx
import styled from 'styled-components';
import { stack } from '../../data/stack';

const Group = styled.section`
  margin-bottom: ${({ theme }) => theme.space['4']}px;
`;

const Category = styled.h3`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink};
  padding-bottom: ${({ theme }) => theme.space['1']}px;
  margin: 0 0 ${({ theme }) => theme.space['2']}px 0;
  font-weight: 700;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space['2']}px;
`;

const Badge = styled.span<{ $core?: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.space['1']}px ${({ theme }) => theme.space['2']}px;
  border: ${({ theme }) => theme.border.thin};
  background: ${({ theme }) => theme.colors.inkPaper};
  box-shadow: ${({ theme, $core }) => $core ? theme.shadow.btc : theme.shadow.base};
  cursor: help;
`;

export const Stack = () => (
  <div>
    {stack.map((g) => (
      <Group key={g.category}>
        <Category>{g.category}</Category>
        <Grid>
          {g.items.map((it) => (
            <Badge key={it.name} $core={it.core} title={`${it.years}Y`}>
              {it.name}
            </Badge>
          ))}
        </Grid>
      </Group>
    ))}
  </div>
);
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev` → `/stack`.
- 5 category sections, each with badges.
- Core badges (`.NET`, `C#`, `React`, `Azure`) show `shadow-btc`; others show `shadow` (ink).
- Hovering a badge shows native tooltip `15Y`, `8Y`, etc.

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/features/Stack/Stack.tsx
git commit -m "feat(stack): brutalist badge grid with core highlight + year tooltip"
```

---

### Task 17: Now feature

**Files:**
- Modify: `src/features/Now/Now.tsx`

- [ ] **Step 1: Replace stub with full implementation**

```tsx
import styled from 'styled-components';
import { now } from '../../data/now';
import { useLanguage } from '../../contexts/LanguageContext';

const Row = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: ${({ theme }) => theme.space['2']}px;
  padding: ${({ theme }) => theme.space['1']}px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.ink};
  &:last-child { border-bottom: none; }
`;

const RowLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.6;
`;

const Value = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.display};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

export const Now = () => {
  const { language } = useLanguage();
  return (
    <div>
      {now
        .filter((r) => r.value !== null)
        .map((r) => (
          <Row key={r.label}>
            <RowLabel>{r.label}</RowLabel>
            <Value>{r.value![language]}</Value>
          </Row>
        ))}
    </div>
  );
};
```

- [ ] **Step 2: Manual verification**

Run: `npm run dev` → `/now`.
- 5 rows (STATUS, LOCATION, CURRENTLY, LAST COMMIT, UPDATED). `LISTENING TO` and `READING` are HIDDEN because their value is `null` in `data/now.ts`.
- Each row: mono uppercase label opacity 60%, value in Space Grotesk 500.
- ES/EN toggle swaps the STATUS value (`OPEN_TO_WORK` vs `ABIERTO_A_OFERTAS`).

Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/features/Now/Now.tsx
git commit -m "feat(now): static status panel, hides empty rows"
```

---

### Task 18: Mobile fallback (< 768px)

**Files:**
- Create: `src/hooks/useIsMobile.ts`
- Create: `src/ui/MobileLayout.tsx`
- Modify: `src/ui/Shell.tsx` (switch based on `useIsMobile`)

- [ ] **Step 1: Write `src/hooks/useIsMobile.ts`**

```ts
import { useEffect, useState } from 'react';

const QUERY = '(max-width: 767px)';

export const useIsMobile = () => {
  const [is, setIs] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(QUERY).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e: MediaQueryListEvent) => setIs(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return is;
};
```

- [ ] **Step 2: Write `src/ui/MobileLayout.tsx`**

```tsx
import styled from 'styled-components';
import { useRef, type ReactNode } from 'react';
import { Panel } from './Panel';
import { Glyph, type GlyphName } from './Glyph';
import { StatusStrip } from './Desktop/StatusStrip';
import { useLanguage } from '../contexts/LanguageContext';
import type { WindowId } from '../contexts/WindowsContext';

const Page = styled.div`
  padding-top: 44px;
  padding-bottom: 64px;
`;

const Section = styled.section`
  scroll-margin-top: 44px;
  margin: ${({ theme }) => theme.space['4']}px;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xs};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.space['2']}px;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 56px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: ${({ theme }) => theme.colors.ink};
  border-top: ${({ theme }) => theme.border.thick};
  z-index: 20;
`;

const NavBtn = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkPaper};
  border: none;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
`;

const ORDER: Array<{ id: WindowId; glyph: GlyphName; tKey: string }> = [
  { id: 'profile',    glyph: 'user',      tKey: 'icon.profile' },
  { id: 'now',        glyph: 'pulse',     tKey: 'icon.now' },
  { id: 'stack',      glyph: 'box',       tKey: 'icon.stack' },
  { id: 'experience', glyph: 'briefcase', tKey: 'icon.experience' },
  { id: 'contact',    glyph: 'mail',      tKey: 'icon.contact' },
];

export const MobileLayout = ({ render }: { render: (id: WindowId) => ReactNode }) => {
  const { t, language, setLanguage } = useLanguage();
  const refs = useRef<Record<string, HTMLElement | null>>({});
  const scrollTo = (id: WindowId) => refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <>
      <StatusStrip language={language} onToggleLanguage={() => setLanguage(language === 'es' ? 'en' : 'es')} />
      <Page>
        {ORDER.map((o) => (
          <Section key={o.id} ref={(el) => { refs.current[o.id] = el; }} id={o.id}>
            <SectionTitle>{t(o.tKey)}</SectionTitle>
            <Panel>{render(o.id)}</Panel>
          </Section>
        ))}
      </Page>
      <BottomNav>
        {ORDER.map((o) => (
          <NavBtn key={o.id} onClick={() => scrollTo(o.id)} aria-label={t(o.tKey)}>
            <Glyph name={o.glyph} size={20} />
            {t(o.tKey)}
          </NavBtn>
        ))}
      </BottomNav>
    </>
  );
};
```

- [ ] **Step 3: Update `src/ui/Shell.tsx` — branch on `useIsMobile`**

Add the import at the top:

```ts
import { useIsMobile } from '../hooks/useIsMobile';
import { MobileLayout } from './MobileLayout';
```

In the component body, near the top before the desktop JSX, add the early return:

```tsx
const isMobile = useIsMobile();
if (isMobile) {
  return <MobileLayout render={children} />;
}
```

Wrap the existing desktop JSX (status strip + Desktop + Taskbar) inside the otherwise branch.

> Boot sequence: only shown on desktop, per spec. Keep the boot logic where it is — the early return prevents it from rendering on mobile.

- [ ] **Step 4: Manual verification**

Run: `npm run dev`.
- Open the dev URL. DevTools → Toggle device toolbar → set to 375px wide (iPhone SE).
- Page collapses: top status strip, then 5 stacked sections (Profile → Now → Stack → Experience → Contact), each in a Panel.
- Bottom nav of 5 icons.
- Tap a bottom nav icon → smooth-scrolls to that section.
- No boot sequence on mobile. No draggable windows. No horizontal scroll.
- Resize back to desktop (>= 768px) → returns to desktop+windows mode.

Stop server.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useIsMobile.ts src/ui/MobileLayout.tsx src/ui/Shell.tsx
git commit -m "feat(mobile): vertical scroll layout with bottom nav under 768px"
```

---

### Task 19: SEO + index.html + final verification

**Files:**
- Modify: `index.html` (theme-color, descriptions, og:image fallback)
- Modify: `README.md` (replace template content with project doc + EmailJS env vars)

- [ ] **Step 1: Update `index.html`**

Replace the existing `<head>` section. Keep what's already accurate; change `theme-color` and update Open Graph image hint:

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>Pedro S. Luciano Gomez | Senior .NET Full Stack Developer</title>
  <meta name="title" content="Pedro S. Luciano Gomez | Senior .NET Full Stack Developer" />
  <meta name="description" content="Senior .NET Full Stack Developer with 15+ years of experience in web and desktop applications. Specialized in C#, .NET Core, React, SQL Server, and Azure. Based in Córdoba, Argentina." />
  <meta name="keywords" content="developer, .NET, Full Stack, C#, React, SQL Server, Azure, Argentina, software engineer, web development" />
  <meta name="author" content="Pedro S. Luciano Gomez" />
  <meta name="theme-color" content="#f7931a" />

  <link rel="canonical" href="https://pslucianogomez.com.ar/" />
  <link rel="icon" type="image/png" href="/logo1.png" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://pslucianogomez.com.ar/" />
  <meta property="og:title" content="Pedro S. Luciano Gomez | Senior .NET Full Stack Developer" />
  <meta property="og:description" content="Senior .NET Full Stack Developer with 15+ years of experience. Specialized in C#, .NET Core, React, SQL Server, and Azure." />
  <meta property="og:image" content="/og-cover.png" />
  <meta property="og:locale" content="es_AR" />
  <meta property="og:site_name" content="Pedro S. Luciano Gomez - Portfolio" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://pslucianogomez.com.ar/" />
  <meta name="twitter:title" content="Pedro S. Luciano Gomez | Senior .NET Full Stack Developer" />
  <meta name="twitter:description" content="Senior .NET Full Stack Developer with 15+ years of experience. Specialized in C#, .NET Core, React, SQL Server, and Azure." />
  <meta name="twitter:image" content="/og-cover.png" />

  <meta name="robots" content="index, follow" />
</head>
```

> `public/og-cover.png` does not exist yet. Until the user captures a screenshot of the live brutalist build and places it there, social previews fall back gracefully (most platforms tolerate a missing image). This is intentional — see spec §10.

- [ ] **Step 2: Update `README.md`**

Replace the contents with:

```markdown
# pslucianogomez95

Personal portfolio of Pedro S. Luciano Gomez. Brutalist cream / Bitcoin-orange / black redesign on top of a custom desktop+windows React app.

## Development

```bash
npm install
cp .env.example .env   # fill in EmailJS credentials
npm run dev
```

## Required environment variables (for the Contact form)

| Variable | Where to find it |
|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS dashboard → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS dashboard → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS dashboard → Account → API Keys |

Without these the form will render but submission shows a red error notice.

## Design

See `docs/superpowers/specs/2026-05-23-web3-brutalist-redesign-design.md` for the full design spec.

## Build

```bash
npm run build
npm run preview
```

## Stack

React 19, TypeScript (strict), Vite 6, styled-components, react-router 7, EmailJS, @fontsource (Space Grotesk + JetBrains Mono + Inter).
```

- [ ] **Step 3: Run full verification checklist (from spec §11)**

Run: `npm run dev`. Clear `localStorage` first (DevTools → Application → Local Storage → clear).

1. Zero TypeScript errors, zero runtime console errors. ✓
2. Boot sequence runs on fresh load, completes ~2.5s, SKIP works, reload skips it. ✓
3. All 5 windows open, close, drag, focus. Z-index puts focused on top. ✓
4. Taskbar reflects open windows. START is cosmetic (no menu). ✓
5. Contact form submits (with env vars) and shows success/error panels. ✓
6. ES/EN toggle swaps text across all 5 windows. ✓
7. Mobile at 375px: vertical scroll, bottom nav, no horizontal scroll, no boot. ✓
8. `npm run build` produces a clean dist:

```bash
npm run build
```
Expected: success, no TS errors, no Vite warnings beyond the expected ones (sourcemap/chunk hints OK).

9. (Optional, requires Lighthouse) Run an audit on the production build. Performance > 90 desktop / > 85 mobile.

If any check fails, fix and re-run that part of the checklist before commit.

- [ ] **Step 4: Commit**

```bash
git add index.html README.md
git commit -m "chore: SEO meta (theme-color #f7931a, og:image), updated README"
```

- [ ] **Step 5: Push and open PR**

```bash
git push -u origin redesign/web3-brutalist
gh pr create --title "redesign: brutalist web3-tinted portfolio" --body "$(cat <<'EOF'
## Summary
- Replaces the Windows 95 react95 skin with a brutalist cream / Bitcoin-orange / black identity.
- Preserves the desktop + draggable windows metaphor with custom primitives (no react95).
- Adds two sections: Stack (POAP-like badges) and Now (current status panel).
- Drops 5 heavy dependencies (react95, pdf libs, storybook, table, axios). Bundle shrinks accordingly.
- Mobile (< 768px) collapses to vertical scroll with a 5-tab bottom nav.
- Light cosmetic web3 narrative: pseudo-address, live BLOCK counter, hex labels — no wallet integration, no chain calls.

Spec: `docs/superpowers/specs/2026-05-23-web3-brutalist-redesign-design.md`

## Test plan
- [ ] First-visit boot sequence runs and skips on subsequent loads
- [ ] All 5 desktop icons open their windows, windows drag/focus/minimize/close
- [ ] Taskbar reflects window state and shows live block badge
- [ ] HIRE ME on Profile opens Contact; CV button hidden until cv.pdf added
- [ ] Experience inline expand/collapse works
- [ ] Contact form sends via EmailJS (requires env vars) and shows ok/err panels
- [ ] Stack core badges show btc shadow; tooltip shows years on hover
- [ ] Now hides rows whose value is null
- [ ] ES/EN toggle swaps every textual field
- [ ] Mobile (375px) shows vertical scroll layout with bottom nav
- [ ] `npm run build` clean, no TS errors
EOF
)"
```

If the user does not want a PR yet, skip the push/PR step and report the work done on the branch.

---

## Self-Review (post-write check)

**Spec coverage check** — each spec section maps to at least one task:

| Spec § | Topic | Task(s) |
|---|---|---|
| §1 Vision | — | covered by overall execution |
| §2 Scope | dep removal | T1 |
| §2 Scope | five windows | T13–T17 |
| §2 Scope | mobile | T18 |
| §2 Scope | EmailJS preserved | T15 |
| §3.1 Palette | tokens | T2 |
| §3.2 Type | fontsource | T2 (fonts.ts) |
| §3.3 Scale | tokens | T2 (tokens.ts) |
| §3.4 Borders/shadows | tokens | T2 |
| §3.5 Patterns | dots, stripes | T2 (used in T8) |
| §3.6 Interactions | hover/active | T4 (Button), T6 (Window) |
| §3.7 Icons | Glyph + 7 SVGs | T3 |
| §3.8 Cursor | crosshair | T2 (GlobalStyle), T4, T6 |
| §4.1 Folder structure | matches | T2–T11 |
| §4.2 Window contract | matches WindowProps | T6 |
| §4.2 WindowsContext | matches contract | T7 |
| §4.2 useDraggable | ~40 lines, pointer events, snap, bounds | T5 |
| §4.3 Deps remove/add | matches | T1 |
| §5.1 Boot | first-visit, skip, localStorage | T10 + T12 |
| §5.2 Desktop | dots, status strip, icons | T8 + T12 |
| §5.3 Taskbar | START, items, block+clock | T9 + T12 |
| §5.4 Window states | active/inactive/min/drag shadows | T6 |
| §5.5 Lifecycle | open/close/focus, URL sync | T7 + T12 |
| §6.1 Profile | content + HIRE ME + CV conditional | T13 |
| §6.2 Experience | inline expand, one open at a time | T14 |
| §6.3 Contact | EmailJS + live block, ok/warn | T15 |
| §6.4 Stack | grouped badges, core highlight, year tooltip | T16 |
| §6.5 Now | static rows, hide empty | T17 |
| §7 Routing | all routes incl. /login redirect | T12 |
| §8 Mobile | < 768px, bottom nav | T18 |
| §9 Bilingual | LanguageContext slim | T11 |
| §10 SEO | theme-color, og:image fallback | T19 |
| §11 Verification | checklist run | T19 |
| §12 Implementation | branch, in-place | T0 + Working Agreement |

No gaps.

**Placeholder scan:** searched for "TBD", "TODO", "implement later", "appropriate error handling", "similar to". The only remaining placeholders are:
- `experiences.ts` ships with one placeholder entry — explicitly documented and intentional (user populates real data later, outside the rewrite).
- `public/og-cover.png` is created post-implementation — explicitly documented; spec acknowledges fallback to logo1.png until then.
- `profile.cvPath = null` — documented (button is hidden until file exists).
Each placeholder has a clear ownership and a definition of "filled".

**Type consistency check:** `WindowId` defined once in `WindowsContext.tsx`, imported everywhere it's needed. `Position` defined in `useDraggable.ts` and exported via barrel. `OpenWindow` shape matches the spec's `WindowsState.windows` entry. Button uses `$variant` consistently. The `t()` keys in `LanguageContext` translations match exactly the keys called in features (`profile.hireMe`, `experience.open/close`, `contact.*`, `notFound.*`, `icon.*`).

No issues found that require fixing inline.
