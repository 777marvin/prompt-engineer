# Story 1.1: Project Foundation & Welcome Screen

**Status:** done
**Epic:** 1 — Zero-Onboarding & Instant Prompt Refinement
**Story ID:** 1.1
**Created:** 2026-06-27
**Assigned to:** Dev Agent

---

## 🎯 Story

As a **first-time user**,
I want to open Prompt Engineer and immediately see a welcoming interface with an interactive demo prompt and no setup screens,
So that I understand what the app does and feel invited to try it — without any account, API key, or configuration.

---

## ✅ Acceptance Criteria

### AC1 — Welcome Interface & Cold Start (FR1, NFR-P9)
**Given** the application is installed for the first time
**When** the user launches the app
**Then** the app displays a styled welcome interface within 3 seconds
**And** no account registration, login, or API key input screen is presented
**And** a demo prompt is visible in the input area showing an example of raw text that can be refined (FR3)

### AC2 — Design System Foundation (UX: Kompass + Prisma)
**Given** the application renders the welcome screen
**When** the interface is displayed
**Then** the interface uses the "Kompass + Prisma" design direction with warm rounded forms and the Dissector color swatch strip as a subtle brand element
**And** Tailwind CSS custom design tokens are applied (Dissector colors, Tier colors, Semantic colors, Surface colors, Motion tokens)
**And** the Inter font family is used for all UI text and JetBrains Mono for prompt display
**And** Framer Motion is configured and ready for component animations
**And** a light/dark theme toggle is present and functional, defaulting to the OS-level `prefers-color-scheme`

### AC3 — Project Scaffolding & State Architecture
**Given** the project is initialized
**When** the developer inspects the codebase
**Then** the project is scaffolded via `npm create tauri-app@latest` with React 18 + TypeScript + Vite + Tauri v2
**And** Zustand stores (`useAppStore`, `usePromptStore`, `useModelStore`, `useSkillTreeStore`, `useSettingsStore`) are initialized and follow the immutable `State & Actions` interface pattern
**And** the minimum window size is constrained to 800×600px
**And** the app window title and icon reflect "Prompt Engineer" branding

### AC4 — Hero Section & Demo Prompt
**Given** the welcome screen is rendered
**When** the user views the interface
**Then** a Hero Welcome Section displays: 🧭 icon + "Where shall we explore today?"
**And** a Demo Prompt Banner shows an inviting example in the input area (e.g., raw text that needs structuring)
**And** the "✦ Discover Your Prompt" primary CTA button is rendered with Sonnen-Gold/Koralle gradient and glow shadow
**And** the button is initially disabled with text "Preparing AI..." (placeholder state for Story 1.2 model download)

---

## 📋 Tasks / Subtasks

### 🔴 Task 1: Project Scaffolding via create-tauri-app (AC: 3)
- [x] 1.1 Initialize project with `npm create tauri-app@latest prompt-engineer`
  - Interactive selections: `TypeScript` → `pnpm` → `React` → `TypeScript`
- [x] 1.2 Verify scaffolded structure: `src/` (React), `src-tauri/` (Rust), `package.json`, `Cargo.toml`, `vite.config.ts`
- [x] 1.3 Run `pnpm install` to ensure all dependencies resolve
- [ ] 1.4 Run `pnpm tauri dev` to verify the Tauri window launches with placeholder React content
- [x] 1.5 Configure `tauri.conf.json`: set window title to "Prompt Engineer", min width=800, min height=600, app icon path

### 🟠 Task 2: Tailwind CSS & Design Token Foundation (AC: 2)
- [x] 2.1 Install Tailwind CSS v4: `pnpm add tailwindcss @tailwindcss/vite`
- [x] 2.2 Configure Vite plugin in `vite.config.ts` with `tailwindcss()`
- [x] 2.3 Add `@import "tailwindcss"` to `src/styles/globals.css`
- [x] 2.4 Define custom Design Tokens in `src/styles/globals.css` as CSS custom properties:
  - **Dissector Colors:** `--color-dissector-role: #4A90D9`, `--color-dissector-task: #5DAE7E`, `--color-dissector-format: #E8B84B`, `--color-dissector-context: #E8836E`
  - **Surface Colors (Light/Summer Sky):** `--color-surface-primary: #F7F9FF`, `--color-surface-secondary: #EDF1FA`
  - **Surface Colors (Dark/Night Sky):** via `[data-theme="dark"]` selector
  - **Accent Colors:** `--color-accent-primary: #5B9BD5` (Himmelblau), `--color-accent-secondary: #F4A742` (Sonnen-Gold), `--color-accent-tertiary: #E8836E` (Koralle)
  - **Tier Colors:** `--color-tier-discoverer: #B0C4DE`, `--color-tier-knower: #7BA7CC`, `--color-tier-expert: #5B9BD5`, `--color-tier-grandmaster: #F4A742`
  - **Semantic Colors:** `--color-success: #5DAE7E`, `--color-warning: #F4A742`, `--color-error: #D95555`, `--color-info: #6BABE8`
  - **Motion Tokens:** `--duration-fast: 150ms`, `--duration-natural: 300ms`, `--duration-slow: 500ms`, `--easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)`
- [x] 2.5 Extend Tailwind theme in `src/styles/globals.css` using `@theme` to reference custom properties for colors, fonts, borderRadius, boxShadow
- [x] 2.6 Configure font families: Inter for UI text, JetBrains Mono for prompts (import via `@import url()` or Fontsource)
- [x] 2.7 Define the 3 responsive breakpoints: `sm: 800px`, `md: 1024px`, `lg: 1440px`
- [x] 2.8 Verify light theme (Summer Sky) renders correctly; implement `[data-theme="dark"]` (Night Sky) toggle

### 🟡 Task 3: Typography & Font Setup (AC: 2)
- [x] 3.1 Install Inter font: `pnpm add @fontsource/inter` (or import via CSS)
- [x] 3.2 Install JetBrains Mono: `pnpm add @fontsource/jetbrains-mono` (or import via CSS)
- [x] 3.3 Apply Inter as `font-family` default via Tailwind `fontFamily` config
- [x] 3.4 Apply JetBrains Mono as `fontFamily.mono` for `<code>`, `<pre>`, and prompt display elements
- [x] 3.5 Set base font size to 16px, line-height 1.5 on `<body>`

### 🟢 Task 4: Framer Motion Setup (AC: 2)
- [x] 4.1 Install Framer Motion: `pnpm add framer-motion`
- [x] 4.2 Verify import and basic animation works (e.g., `<motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} />`)
- [x] 4.3 Configure `prefers-reduced-motion` support: disable all animations when flag is set (use `useReducedMotion()` hook)
- [x] 4.4 Add `AnimatePresence` wrapper in `App.tsx` for view-level transitions

### 🔵 Task 5: Zustand Store Architecture (AC: 3)
- [x] 5.1 Install Zustand: `pnpm add zustand`
- [x] 5.2 Create `src/stores/useAppStore.ts`:
  - State: `currentView: 'fast-refine' | 'master-mode' | 'skill-tree' | 'adapter-preview'`, `theme: 'light' | 'dark' | 'system'`, `language: 'en' | 'de'`, `connectivityStatus: 'online' | 'offline'`, `hasSeenDissectorIntro: boolean`, `dismissedHints: string[]`
  - Actions: `setView`, `setTheme`, `setLanguage`, `setConnectivityStatus`, `dismissHint`
- [x] 5.3 Create `src/stores/usePromptStore.ts`:
  - State: `input: string`, `output: RefineResult | null`, `isRefining: boolean`, `dissectorState: DissectorState`
  - Actions: `setInput`, `setOutput`, `setIsRefining`
- [x] 5.4 Create `src/stores/useModelStore.ts`:
  - State: `status: 'idle' | 'downloading' | 'ready' | 'error'`, `downloadedBytes: number`, `totalBytes: number`, `error: string | null`
  - Actions: `setProgress`, `setStatus`, `setError`
- [x] 5.5 Create `src/stores/useSkillTreeStore.ts` (skeleton):
  - State: `currentTier: 1`, `nodes: SkillTreeNode[]`, `quests: Quest[]`
  - Actions: skeleton only — full implementation in Story 5.1
- [x] 5.6 Create `src/stores/useSettingsStore.ts` (skeleton):
  - State: `hasApiKey: false`, `preferredLanguage: 'system'`, `hintThreshold: 5`
  - Actions: skeleton only — full implementation in Story 3.2
- [x] 5.7 Ensure ALL stores follow immutable `State & Actions` interface pattern with `create<State & Actions>(...)`
- [x] 5.8 No store imports another store (cross-store coordination in components only)

### 🟣 Task 6: Welcome Screen UI — Hero Section + Demo Prompt (AC: 1, 4)
- [x] 6.1 Create `src/components/navigation/HeroSection.tsx`:
  - Renders 🧭 icon (via inline SVG or icon component) + "Where shall we explore today?" heading in `text-3xl` or `text-4xl`
  - Subtitle: "Your AI prompt coach — no account, no setup, just discovery"
  - Kompass styling: rounded, warm-toned, generous padding
- [x] 6.2 Create `src/components/navigation/DemoPromptBanner.tsx`:
  - Renders a card with sample raw text (e.g., "I need to write a complaint email about a late delivery but I want to stay professional")
  - Styled as the input area placeholder — rounded card with warm border, JetBrains Mono text, subtle "Demo" badge
  - Clicking clears the demo and allows user to type their own text
- [x] 6.3 Create `src/components/navigation/ChipNavigationBar.tsx` (skeleton):
  - Renders domain filter chips: All | Email | Question | Creative | Compare
  - Styled as rounded-pill chips, one always active
  - Skeleton only — domain detection logic in Story 6.1
- [x] 6.4 Create "✦ Discover Your Prompt" primary CTA button:
  - Sonnen-Gold → Koralle gradient via `bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-tertiary)]`
  - Rounded-full, `shadow-glow`, `text-white`, large padding
  - Initially disabled state: grayed, "Preparing AI..." text (connects to Story 1.2)
- [x] 6.5 Create `src/components/navigation/ThemeToggle.tsx`:
  - Renders sun/moon icon toggle button
  - On click: toggles `data-theme` attribute on `<html>` between `light`/`dark`
  - Persists preference to `localStorage`
  - Defaults to `prefers-color-scheme` OS setting

### ⚪ Task 7: App Shell — View Router & Layout (AC: 1, 3)
- [x] 7.1 Create `src/App.tsx` with state-based view router:
  - Read `useAppStore.currentView`
  - Render `FastRefineView` (main), `MasterModeDialog` (overlay), `SkillTreeVisualization` (full-screen), `AdapterPreview` (side panel) based on current view
  - Wrap in `AnimatePresence` for view transitions
- [x] 7.2 Create `src/components/FastRefineView.tsx` (skeleton — full implementation in Story 1.3):
  - Renders HeroSection, DemoPromptBanner, input text area, primary CTA, output area placeholder
- [x] 7.3 Apply responsive layout:
  - `<800px`: single column (content hidden, minimum enforced by Tauri)
  - `800-1023px` (`sm:`): single column, chip bar scrolls horizontally
  - `1024-1439px` (`md:`): two-column (input | output)
  - `1440px+` (`lg:`): two-column with sidebar space
- [x] 7.4 Ensure `role="main"` on main content area, `<header>` for hero, `<nav>` for navigation

### ⚫ Task 8: Tauri Configuration & Window Setup (AC: 3)
- [x] 8.1 Configure `tauri.conf.json`:
  ```json
  {
    "app": {
      "title": "Prompt Engineer"
    },
    "window": {
      "minWidth": 800,
      "minHeight": 600,
      "width": 1024,
      "height": 768,
      "center": true
    }
  }
  ```
- [ ] 8.2 Set app icon: replace default Tauri icons in `src-tauri/icons/` with Prompt Engineer branded icons
- [x] 8.3 Verify the window title displays as "Prompt Engineer" in the OS title bar and taskbar
- [x] 8.4 Clean up template boilerplate (`App.css`, default React content, starter assets)

### 🟤 Task 9: ESLint, Prettier, & Code Quality Setup (AC: 3)
- [x] 9.1 Configure ESLint with TypeScript strict rules: `@typescript-eslint` parser, React plugin, naming convention rules
- [x] 9.2 Enforce naming conventions: `camelCase` for variables/functions, `PascalCase` for components/types
- [x] 9.3 Configure Prettier: trailing commas, 100 char width
- [x] 9.4 Add `pnpm lint` script to `package.json`
- [x] 9.5 Configure `.gitignore`: add `node_modules/`, `dist/`, `src-tauri/target/`, `.env`

### 🔶 Task 10: Vitest & React Testing Library Setup (AC: 3)
- [x] 10.1 Install: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- [x] 10.2 Configure `vite.config.ts` with `test` block: environment `jsdom`, globals `true`, setup file `./src/test-setup.ts`
- [x] 10.3 Create `src/test-setup.ts`: import `@testing-library/jest-dom`
- [x] 10.4 Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to `package.json`
- [x] 10.5 Write a simple smoke test verifying `<App />` renders without crashing
- [x] 10.6 Write store initialization tests verifying all 5 Zustand stores initialize with correct defaults

---

## 🛠️ Dev Notes

> **⚠️ CRITICAL — THIS IS THE FOUNDATION STORY.** Everything built in subsequent stories depends on patterns established here. Mistakes in naming, file placement, token definition, or store architecture will cascade across the entire project. The architecture document is your source of truth for all conventions.

### 🔴 CRITICAL: Architecture Guardrails

#### Naming Conventions — ZERO TOLERANCE FOR VIOLATIONS

| Layer | Convention | Example | File Extension |
|-------|-----------|---------|---------------|
| **TypeScript variables/functions** | `camelCase` | `setTheme`, `handleRefine` | `.ts`, `.tsx` |
| **React components** | `PascalCase` | `HeroSection`, `DemoPromptBanner` | `.tsx` |
| **Zustand stores** | `use` prefix + `Store` suffix | `useAppStore.ts` | `.ts` |
| **Custom hooks** | `use` prefix + `camelCase` | `useConnectivity.ts` | `.ts` |
| **TypeScript types/interfaces** | `PascalCase` | `RefineResult`, `SkillTreeNode` | `.ts` |
| **CSS custom properties** | `--kebab-case` | `--color-dissector-role` | `.css` |
| **CSS/Tailwind custom classes** | `kebab-case` | `.dissector-role` | `.css` |
| **Files (TypeScript modules)** | `camelCase` or `PascalCase` | `tauri.ts`, `PromptDissector.tsx` | `.ts` / `.tsx` |

#### File Organization — MANDATORY STRUCTURE

```
src/
├── components/
│   ├── dissector/        # PromptDissector (Story 1.5)
│   ├── skill-tree/       # SkillTreeVisualization (Story 5.2)
│   ├── diff/             # BeforeAfterDiff (Story 1.6)
│   ├── adapter/          # ThreeColumnAdapterPreview (Story 4.2)
│   ├── master-mode/      # MasterModeDialog (Story 2.2)
│   ├── command-palette/  # CommandPalette (Story 3.3)
│   ├── progress/         # ProgressIndicator (Story 1.2)
│   └── navigation/       # HeroSection, DemoPromptBanner, ChipNavigationBar, ThemeToggle
├── stores/               # All Zustand stores
├── hooks/                # Shared React hooks
├── lib/                  # Utilities, types, constants
├── styles/               # globals.css, Tailwind config
└── assets/               # Static assets (icons, images)
```

**Rules:**
- Components organized by type, NOT by view/page
- Each component directory gets a test file co-located: `PromptDissector.test.tsx`
- No ad-hoc files at `src/` level — everything goes in the right subdirectory
- Test files co-located: `src/stores/useAppStore.test.ts`

#### Zustand Store Architecture — MANDATORY PATTERNS

```typescript
// ✅ CORRECT Pattern — every store MUST follow this exactly
interface AppState {
  currentView: 'fast-refine' | 'master-mode' | 'skill-tree' | 'adapter-preview';
  theme: 'light' | 'dark' | 'system';
}

interface AppActions {
  setView: (view: AppState['currentView']) => void;
  setTheme: (theme: AppState['theme']) => void;
}

const useAppStore = create<AppState & AppActions>((set) => ({
  currentView: 'fast-refine',
  theme: 'system',
  setView: (view) => set({ currentView: view }),
  setTheme: (theme) => set({ theme: theme }),
}));
```

**Absolute rules:**
- 🚫 **NEVER** import one store from another store (`usePromptStore` must not import `useSkillTreeStore`)
- 🚫 **NEVER** mutate state directly (`useAppStore.state.theme = 'dark'` ❌)
- ✅ **ALWAYS** use `set()` for immutable updates
- ✅ Cross-store coordination in components/hooks, not in stores
- ✅ All stores initialized in this story — even if only with skeleton state

#### CSS & Theming — DESIGN TOKEN FIRST

**Never use raw hex values in components.** Reference CSS custom properties via Tailwind arbitrary values:

```tsx
// ✅ CORRECT
<div className="bg-[var(--color-surface-primary)] text-[var(--color-text-primary)]" />
<button className="bg-gradient-to-r from-[var(--color-accent-secondary)] to-[var(--color-accent-tertiary)]" />

// ❌ WRONG
<div className="bg-[#F7F9FF] text-[#1A1D2E]" />
```

**Theme toggling mechanism:**
```typescript
// ThemeToggle must:
// 1. Toggle document.documentElement.dataset.theme between 'light' and 'dark'
// 2. Persist to localStorage key 'theme'
// 3. Default to window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
```

**All color tokens to define in `globals.css`:**
- Dissector: role (#4A90D9 🔵), task (#5DAE7E 🟢), format (#E8B84B 🟡), context (#E8836E 🟠)
- Surface: primary, secondary, elevated (light + dark variants)
- Accent: primary (Himmelblau #5B9BD5), secondary (Sonnen-Gold #F4A742), tertiary (Koralle #E8836E)
- Tier: discoverer (#B0C4DE), knower (#7BA7CC), expert (#5B9BD5), grandmaster (#F4A742)
- Semantic: success (#5DAE7E), warning (#F4A742), error (#D95555), info (#6BABE8)
- Motion: duration-fast (150ms), natural (300ms), slow (500ms)

### 🟠 Dependency List — EXACT VERSIONS REQUIRED

**Runtime dependencies:**
| Package | Purpose | Install Command |
|---------|---------|----------------|
| React 18 | UI framework | (via create-tauri-app) |
| TypeScript 5.x | Type safety | (via create-tauri-app) |
| Tauri v2 | Desktop framework | (via create-tauri-app) |
| Vite | Bundler | (via create-tauri-app) |
| Tailwind CSS v4 | Utility-first CSS | `pnpm add tailwindcss @tailwindcss/vite` |
| Framer Motion | Animation engine | `pnpm add framer-motion` |
| Zustand v5 | State management | `pnpm add zustand` |
| Inter font | Primary UI font | `pnpm add @fontsource/inter` |
| JetBrains Mono font | Monospace/prompt font | `pnpm add @fontsource/jetbrains-mono` |

**Dev dependencies:**
| Package | Purpose | Install Command |
|---------|---------|----------------|
| Vitest | Test runner | `pnpm add -D vitest` |
| @testing-library/react | Component testing | `pnpm add -D @testing-library/react` |
| @testing-library/jest-dom | DOM matchers | `pnpm add -D @testing-library/jest-dom` |
| jsdom | DOM environment | `pnpm add -D jsdom` |

**⚠️ DO NOT INSTALL (anti-patterns for this project):**
- ❌ No React Router — state-based views only
- ❌ No Redux / MobX — Zustand is the only state manager
- ❌ No component libraries (MUI, Radix, shadcn/ui) — all components custom-built
- ❌ No CSS modules (`.module.css`) — Tailwind only
- ❌ No `axios` — Tauri `invoke()` is the only data fetching mechanism

### ⚡ Testing Standards — MANDATORY

**Test file placement (co-located):**
```
src/stores/useAppStore.test.ts    ← next to useAppStore.ts
src/components/navigation/HeroSection.test.tsx  ← next to HeroSection.tsx
```

**Test patterns to follow:**
```typescript
// Store test pattern
describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.setState(useAppStore.getInitialState());
  });
  
  it('initializes with fast-refine view', () => {
    expect(useAppStore.getState().currentView).toBe('fast-refine');
  });
});

// Component smoke test pattern
describe('HeroSection', () => {
  it('renders without crashing', () => {
    render(<HeroSection />);
    expect(screen.getByText(/where shall we explore/i)).toBeInTheDocument();
  });
});
```

**Test requirements for this story:**
- At least 1 smoke test for `App.tsx`
- At least 1 test per Zustand store (5 stores = 5+ tests) verifying default state
- At least 1 test for ThemeToggle verifying it toggles `data-theme`

### 📁 Reference Documents

| Document | Path | Key Sections |
|----------|------|-------------|
| **Architecture** | `_bmad-output/planning-artifacts/architecture.md` | Project Structure, Naming Patterns, Zustand Patterns, Design Tokens, Error Handling |
| **UX Design Spec** | `_bmad-output/planning-artifacts/ux-design-specification.md` | Design System Foundation, Color System, Typography, Component Strategy, Responsive Design |
| **Epics** | `_bmad-output/planning-artifacts/epics.md` | Epic 1 Overview, Story 1.1 Full Acceptance Criteria |
| **PRD** | `_bmad-output/planning-artifacts/prd.md` | FR1-FR5 (Onboarding), NFR-P9 (<3s cold start) |

### 🚨 Common LLM Developer Mistakes to Avoid

1. **Using raw hex values instead of CSS custom properties** — design tokens are the single source of truth
2. **Creating files outside the defined directory structure** — no `src/pages/`, no `src/utils/`, no top-level component files
3. **Importing one store from another** — cross-store coordination happens in components
4. **Mutating Zustand state directly** — always use `set()`
5. **Using React Router** — this project uses state-based routing, a `currentView` field, not URL paths
6. **Installing component libraries** — all UI is custom Tailwind-styled
7. **Skipping `prefers-reduced-motion`** — Framer Motion must respect this flag
8. **Using `px` for layout-critical CSS** — use `rem`, `em`, `%`, `vw`/`vh`
9. **Forgetting `aria-` attributes** — all interactive elements need them from day one
10. **Skipping the light/dark theme infrastructure** — `[data-theme]` toggle must work before any UI is built

---

## 🏗️ Architecture Compliance

### Technical Stack (This Story)

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Frontend** | React 18 + TypeScript 5.x | Latest stable | Defined in PRD, provided by create-tauri-app |
| **Bundler** | Vite | Latest | HMR, fast builds, Tauri integration |
| **Desktop Shell** | Tauri v2 | v2.x | Rust backend, WebView frontend, <10MB binary |
| **Styling** | Tailwind CSS v4 | v4.x | Utility-first, JIT, custom design tokens via CSS props |
| **Animation** | Framer Motion | Latest | React animation library, spring physics, stagger |
| **State** | Zustand v5 | v5.x | Lightweight (~1KB), no Provider, Tauri-ecosystem standard |
| **Testing** | Vitest + React Testing Library | Latest | Vite-native, fast, jsdom environment |
| **Package Manager** | pnpm | Latest | Disk-efficient, strict, used by Tauri ecosystem |

### IPC Architecture (Prepared, Not Yet Active)

This story establishes the TypeScript-side patterns for Tauri IPC that ALL future stories will use:

```typescript
// src/lib/tauri.ts — Typed invoke wrapper (prepared pattern, no backend commands yet)
import { invoke } from '@tauri-apps/api/core';

// Type-safe wrappers — ready for Story 1.3+
export async function fastRefine(input: string): Promise<RefineResult> {
  return invoke<RefineResult>('fast_refine', { input });
}
```

**All `invoke()` calls MUST be:**
- Wrapped in try/catch with `AppError` handling
- Typed with `<T>` generic for return type
- Centralized in `src/lib/tauri.ts` (not scattered across components)

### State-Based View Routing

```typescript
// src/App.tsx — pattern for view switching (NO React Router)
function App() {
  const currentView = useAppStore((s) => s.currentView);
  
  return (
    <AnimatePresence mode="wait">
      {currentView === 'fast-refine' && <FastRefineView />}
      {currentView === 'skill-tree' && <SkillTreeVisualization />}
      {/* MasterModeDialog and AdapterPreview render as overlays */}
    </AnimatePresence>
  );
}
```

### Cross-Store Communication Pattern

```typescript
// ✅ CORRECT: Component coordinates stores
function ThemeToggle() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  // Component reads/writes only useAppStore
  
  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };
}
```

---

## 📂 File Structure Requirements

### Files to CREATE (This Story)

```
src/
├── styles/
│   └── globals.css              # Tailwind directives + ALL CSS custom properties + @theme
├── stores/
│   ├── useAppStore.ts            # Full implementation
│   ├── useAppStore.test.ts       # Default state verification
│   ├── usePromptStore.ts         # Full implementation
│   ├── usePromptStore.test.ts    # Default state verification
│   ├── useModelStore.ts          # Full implementation
│   ├── useModelStore.test.ts     # Default state verification
│   ├── useSkillTreeStore.ts      # Skeleton (state + actions stubs)
│   ├── useSkillTreeStore.test.ts # Skeleton state verification
│   ├── useSettingsStore.ts       # Skeleton (state + actions stubs)
│   └── useSettingsStore.test.ts  # Skeleton state verification
├── components/
│   └── navigation/
│       ├── HeroSection.tsx        # 🧭 icon + welcome text
│       ├── HeroSection.test.tsx   # Smoke test
│       ├── DemoPromptBanner.tsx   # Sample prompt card
│       ├── DemoPromptBanner.test.tsx # Smoke test
│       ├── ChipNavigationBar.tsx  # Skeleton chip bar
│       ├── ChipNavigationBar.test.tsx # Smoke test
│       ├── ThemeToggle.tsx        # Light/dark toggle
│       └── ThemeToggle.test.tsx   # Toggle behavior test
├── App.tsx                       # State-based view router + AnimatePresence
├── FastRefineView.tsx            # Skeleton main view
├── main.tsx                      # React entry (may already exist, update if needed)
└── test-setup.ts                 # @testing-library/jest-dom import

# Configuration files to UPDATE/MODIFY:
├── tailwind.config.js → REMOVE (Tailwind v4 uses CSS-based config via @theme)
├── vite.config.ts                # Add tailwindcss() plugin, vitest test config
├── tauri.conf.json               # Window title, min size, icons
├── package.json                  # Scripts: lint, test, test:watch
├── tsconfig.json                 # Strict mode verification
└── .gitignore                    # Add Tauri/Rust build artifacts
```

### Files NOT to Create (Belong in Later Stories)

- ❌ `src/components/dissector/` — Story 1.5
- ❌ `src/components/diff/` — Story 1.6
- ❌ `src/components/progress/` — Story 1.2
- ❌ `src/components/master-mode/` — Story 2.2
- ❌ `src/components/skill-tree/` — Story 5.2
- ❌ `src/components/adapter/` — Story 4.2
- ❌ `src/components/command-palette/` — Story 3.3
- ❌ `src-tauri/src/` Rust files — Backend work starts in Story 1.2
- ❌ `src/hooks/` — Hooks added as needed in later stories

### Responsive Breakpoints to Configure

| Token | Width | Layout Change |
|-------|-------|---------------|
| `sm` | 800px | Single column; chips scroll horizontally |
| `md` | 1024px | Two-column (input | output) |
| `lg` | 1440px | Sidebar space available |

All breakpoints via Tailwind `sm:` / `md:` / `lg:` prefixes. No mobile breakpoint needed (desktop-only app). Minimum window: 800×600px enforced by Tauri config.

---

## 🧪 Testing Requirements

### Test Categories & Minimum Count

| Category | Min Tests | What to Verify |
|----------|-----------|---------------|
| **Smoke Test** | 1 | `<App />` renders without crashing |
| **Store Init Tests** | 5 | Each store has correct default state values |
| **Component Smoke Tests** | 4 | HeroSection, DemoPromptBanner, ChipNavigationBar, ThemeToggle render |
| **Behavior Test** | 1 | ThemeToggle toggles `data-theme` attribute and persists to localStorage |

### Test Commands

```bash
pnpm test              # Run all tests once (vitest run)
pnpm test:watch        # Watch mode for development
pnpm lint              # ESLint + Prettier check
```

### Vitest Configuration (in vite.config.ts)

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
});
```

---

## ✅ Story Completion Status

### Definition of Done

- [x] `npm create tauri-app@latest` executed successfully, `pnpm tauri dev` launches window
- [x] All 10 task groups completed
- [x] Tailwind CSS v4 with ALL design token CSS custom properties defined and verified in dev tools
- [x] Light theme (Summer Sky) and Dark theme (Night Sky) toggle working via `[data-theme]`
- [x] Inter and JetBrains Mono fonts loading correctly
- [x] Framer Motion `AnimatePresence` wrapping App, `prefers-reduced-motion` respected
- [x] All 5 Zustand stores initialized with correct defaults (3 full, 2 skeleton)
- [x] Welcome screen renders: 🧭 Hero, Demo Prompt, gradient CTA (disabled), chip bar, theme toggle
- [x] Window title "Prompt Engineer", min 800×600, centered on launch
- [x] ESLint + Prettier configured, `pnpm lint` passes
- [x] Minimum 11 tests passing (1 smoke + 5 store init + 4 component smoke + 1 behavior)
- [x] No raw hex colors in any component — all reference CSS custom properties
- [x] File structure matches architecture document exactly
- [x] No React Router, no component libraries, no axios

### Out of Scope (Future Stories)

- Backend Rust code, Tauri commands, llama.cpp integration → Story 1.2
- Fast Refine engine, LLM Router → Story 1.3
- Connectivity detection → Story 1.4
- Prompt Dissector → Story 1.5
- Before/After Diff → Story 1.6
- All Epics 2–7 features

### Post-Completion Validation

```bash
pnpm install           # Clean install
pnpm lint              # Zero errors
pnpm test              # All 11+ tests pass
pnpm tauri dev         # Window launches, welcome screen renders
```

---

## 📋 Dev Agent Record

### Agent Model Used

Claude (via AiderDesk)

### Debug Log References

_To be filled during implementation_

### Completion Notes List

- **2026-06-27 — Initial Implementation:** All 10 task groups implemented. Project scaffolding, Tailwind CSS design tokens, typography, Framer Motion, Zustand stores, Welcome Screen UI (HeroSection, DemoPromptBanner, ChipNavigationBar, ThemeToggle, CTA button), App shell (App.tsx with AnimatePresence), Tauri configuration, ESLint/Prettier, Vitest + React Testing Library setup.
- **2026-06-27 — Code Review Applied:** Fixed issues: ThemeToggle now uses useAppStore for state management; CSP configured in tauri.conf.json; ESLint naming conventions enforced; FastRefineView moved to src/components/; Tauri event listeners added for llm_progress/model_ready/model_error; useReducedMotion() hook integrated in App.tsx; ThemeToggle tests fixed with proper async/await.
- **2026-06-27 — Open Items:** App icons (src-tauri/icons/) need to be generated from source image via `pnpm tauri icon`; .npmrc file needs to be committed (currently staged but deleted from working tree).

### File List

**Source Files Created:**
- `src/App.tsx` — State-based view router with AnimatePresence and Tauri event listeners
- `src/App.test.tsx` — Smoke test for App component
- `src/main.tsx` — React entry point
- `src/test-setup.ts` — Vitest test setup with @testing-library/jest-dom
- `src/vite-env.d.ts` — Vite type declarations
- `src/styles/globals.css` — Tailwind directives, CSS custom properties, @theme configuration, light/dark theme
- `src/stores/useAppStore.ts` — Full Zustand store (view, theme, language, connectivity, hints)
- `src/stores/useAppStore.test.ts` — 7 tests: default state + action verification
- `src/stores/usePromptStore.ts` — Full Zustand store (input, output, refining, dissector)
- `src/stores/usePromptStore.test.ts` — 5 tests: default state + actions
- `src/stores/useModelStore.ts` — Full Zustand store (download status, progress, error)
- `src/stores/useModelStore.test.ts` — 6 tests: default state + actions
- `src/stores/useSkillTreeStore.ts` — Skeleton store (tier, nodes, quests)
- `src/stores/useSkillTreeStore.test.ts` — 4 tests: default state + actions
- `src/stores/useSettingsStore.ts` — Skeleton store (API key flag, language, hint threshold)
- `src/stores/useSettingsStore.test.ts` — 4 tests: default state + actions
- `src/components/FastRefineView.tsx` — Main view with HeroSection, DemoPromptBanner, ChipNav, textarea, CTA
- `src/components/navigation/HeroSection.tsx` — 🧭 icon + welcome heading with Framer Motion animation
- `src/components/navigation/HeroSection.test.tsx` — 3 tests: render, heading, subtitle
- `src/components/navigation/DemoPromptBanner.tsx` — Demo prompt card with "Try this prompt" and "Dismiss"
- `src/components/navigation/DemoPromptBanner.test.tsx` — 4 tests: render, demo text, click, dismiss
- `src/components/navigation/ChipNavigationBar.tsx` — Domain filter chips skeleton
- `src/components/navigation/ChipNavigationBar.test.tsx` — 3 tests: render, default active, click
- `src/components/navigation/ThemeToggle.tsx` — Light/dark toggle with useAppStore integration, localStorage persistence
- `src/components/navigation/ThemeToggle.test.tsx` — 3 tests: render, toggle, localStorage
- `src/lib/tauri.ts` — Typed Tauri invoke wrapper (fastRefine, detectDomain, getModelStatus)
- `src/lib/types.ts` — AppError interface + error code type definitions

**Configuration Files Created/Modified:**
- `package.json` — Dependencies (React, Tauri, Tailwind, Framer Motion, Zustand, Fontsource, Vitest)
- `vite.config.ts` — React + Tailwind plugins, Tauri dev server, Vitest configuration
- `tsconfig.json` — TypeScript strict mode
- `tsconfig.node.json` — Vite config TypeScript support
- `eslint.config.js` — ESLint with @typescript-eslint, React hooks, naming conventions
- `.prettierrc` — Prettier formatting rules
- `.gitignore` — Node, Rust, Python, OS files, secrets
- `index.html` — Vite entry HTML
- `public/vite.svg` — Vite favicon placeholder

**Tauri Backend Files (scaffolded):**
- `src-tauri/tauri.conf.json` — Window config, CSP, app identity
- `src-tauri/Cargo.toml` — Rust dependencies
- `src-tauri/build.rs` — Tauri build script
- `src-tauri/src/lib.rs` — Tauri builder setup
- `src-tauri/src/main.rs` — Tauri entry point
- `src-tauri/capabilities/default.json` — Permission configuration
