---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-06-27'
inputDocuments:
  - "_bmad-output/planning-artifacts/product-brief-Prompt Engineer-2026-06-27.md"
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/ux-design-directions.html"
  - "_bmad-output/planning-artifacts/ux-design-color-themes.html"
  - "_bmad-output/brainstorming/brainstorming-session-2026-06-26.md"
workflowType: 'architecture'
project_name: 'Prompt Engineer'
user_name: 'Marvin'
date: '2026-06-27'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:** 43 FRs across 10 categories:

| Category | FRs | Architectural Impact |
|----------|-----|---------------------|
| Onboarding & First-Run | FR1–FR5 | Async model download, connectivity detection, offline fallback |
| Fast Refine | FR6–FR9 | Local LLM inference, prompt restructuring, diff engine, clipboard API |
| Master Mode | FR10–FR15 | Cloud API integration, dialog state machine, secure credential storage |
| Prompt Dissector & Learning | FR16–FR19 | Color-coded text parsing, adaptive complexity engine, inline educational content |
| LLM Adapter System | FR20–FR23 | Multi-format prompt transformation pipeline, side-by-side rendering |
| Gamification & Skill Tree | FR24–FR28 | Progress tracking engine, quest system, streak management |
| Domain Detection & NLP | FR29–FR32 | Python sidecar IPC, intent classification, fallback routing |
| Application Shell | FR33–FR36 | Mode switching with state preservation, command palette, settings management |
| Update & System | FR37–FR40 | Tauri updater plugin, background download, patch notes rendering |
| Open-Source Readiness | FR41–FR43 | Modular adapter interface, contribution documentation, issue labeling |

**Non-Functional Requirements:** 28 NFRs driving architectural decisions:

- **Performance (P1–P9):** Fast Refine <500ms (local LLM), Time-to-Interactive <60s, 60fps animations, <500MB RAM idle, <2GB RAM inference, <100MB installer
- **Security (S1–S5):** OS-native credential store, no key logging, HTTPS/TLS 1.3 for all cloud communication, local-only data processing for Fast Refine, opt-in telemetry only
- **Scalability (SC1–SC4):** Standalone desktop (no server dependency), community adapter plugins without recompilation, GitHub Releases for distribution
- **Accessibility (A1–A5):** Full keyboard navigation, non-color differentiators for Dissector, OS font scaling to 150%, English + German i18n, plain language educational content
- **Integration (I1–I5):** OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google AI (Gemini 1.5 Flash), Python sidecar stdin/stdout JSON-RPC, GitHub Releases API for updates

### Scale & Complexity

- **Primary domain:** Desktop Application (cross-platform, AI/LLM tooling)
- **Complexity level:** Medium — standalone desktop app with no regulatory domain, no multi-tenancy, no centralized backend
- **Estimated architectural components:** 8–10 major subsystems (LLM Router, Prompt Pipeline, NLP Sidecar, Skill Tree Engine, Adapter Engine, UI Shell, Settings Manager, Update Manager)
- **Target platforms:** Windows 10+ (Tier 1), macOS 12+ (Tier 1), Ubuntu 22.04+ (Tier 2)

### Technical Constraints & Dependencies

- **Runtime:** Tauri v2 (Rust backend + WebView frontend) — chosen over Electron for <10MB binary, Rust performance for local LLM inference, native system integration
- **Local LLM:** llama.cpp Rust bindings, Llama 3.2 1B Q4_K_M (~1.2 GB quantized) — downloaded async on first launch
- **Python Sidecar:** spaCy + Intent Classifier, stdin/stdout JSON-RPC communication, Rust keyword-matching fallback when unavailable
- **Cloud APIs:** Direct HTTPS communication to OpenAI, Anthropic, Google AI — no intermediate proxy
- **Credential Storage:** OS-native keychain (Windows Credential Manager, macOS Keychain, Linux libsecret)
- **Updates:** Tauri built-in updater plugin → GitHub Releases API
- **No cloud backend required** — fully standalone desktop application

### Cross-Cutting Concerns Identified

1. **Offline/Online Dual Mode:** Fast Refine, Dissector, Diff, Skill Tree display operate fully offline; Master Mode, Adapter Preview, cloud NLP fallback require internet. Architecture must cleanly separate these paths with graceful degradation.
2. **LLM Routing Decision:** Every user action routes through the LLM Router — local llama.cpp or cloud API based on mode, connectivity, and API key availability. This is the central architectural spine.
3. **Adaptive UI Complexity:** The Learning Dissector scales from 2 colors (Tier 1) to 7+ structural layers (Tier 4). UI components must accept a `skillLevel` parameter that controls information density.
4. **API Key Security:** Keys stored in OS-native credential store, never logged, never displayed after entry, transmitted only to the corresponding LLM provider over HTTPS.
5. **Python Sidecar Resilience:** NLP domain detection is an enhancement layer. The Rust keyword fallback ensures core functionality when the sidecar is unavailable.
6. **Internationalization (i18n):** English and German UI strings required for MVP. Educational content in plain, non-technical language.
7. **Progressive Feature Disclosure:** Features unlock through Skill Tree tiers and contextual hints — not settings toggles. Architecture must support feature gating based on user tier.

## Starter Template Evaluation

### Primary Technology Domain
Desktop Application (cross-platform) via Tauri v2, identified from PRD and brainstorming architecture selection (Architecture A: "Hybrid Power").

### Starter Options Considered
- **create-tauri-app (React + TypeScript):** Official Tauri v2 scaffold. Provides Vite + React 18 + TypeScript frontend with Rust backend bridge. Maintained by the Tauri team.
- **Manual Vite + Tauri CLI:** Alternative for full control over every configuration file. Functionally identical end state but requires more setup.

### Selected Starter: create-tauri-app (React + TypeScript)

**Rationale:** Official and maintained by the Tauri team. Provides the IPC bridge (Tauri Commands/Events), project structure, and cross-platform build configuration out of the box. React 18 + TypeScript matches the PRD-defined stack. The manual alternative offers no architectural advantage for this project.

**Initialization Command:**

```bash
npm create tauri-app@latest prompt-engineer
# Interactive selections: TypeScript → pnpm → React → TypeScript
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:** TypeScript 5.x strict mode, React 18, Vite bundler with HMR, Tauri v2 Rust backend
**Styling Solution:** CSS Modules (default); Tailwind CSS added manually per UX Design System specification
**Build Tooling:** Vite + Tauri CLI (`tauri dev` / `tauri build`), cross-platform Rust compilation (Windows, macOS, Linux)
**Testing Framework:** Not included by default; Vitest + React Testing Library added per project testing requirements
**Code Organization:** `src/` (React frontend), `src-tauri/` (Rust backend with Cargo.toml), `public/` (static assets), `src-tauri/src/` (Rust commands, state, plugins)
**Development Experience:** Hot Module Reload, TypeScript strict mode, Tauri Devtools, integrated `tauri dev` for full desktop development environment

### Manually Added Foundations
The following must be added to the scaffolded project to meet architecture requirements:

- **Tailwind CSS** — Custom Design Tokens (Dissector colors, tier colors, theme system) per UX Design System Foundation
- **Framer Motion** — Animation engine for component transitions, micro-interactions, and stagger effects
- **Tauri Plugins:** `tauri-plugin-updater` (auto-updates via GitHub Releases), `tauri-plugin-stronghold` (encrypted API key storage), `tauri-plugin-shell` (Python sidecar process management), `tauri-plugin-window-state` (window position/size persistence)
- **Vitest + React Testing Library** — Component and integration testing per Open-Source Readiness requirements (FR41–FR43)
- **llama-cpp-rs** — Rust crate for local Llama 3.2 1B inference (Fast Refine engine)
- **Python Sidecar IPC** — Custom stdin/stdout JSON-RPC protocol for spaCy NLP domain detection

**Note:** Project initialization using `npm create tauri-app@latest` should be the first implementation task, followed immediately by Tailwind CSS + Framer Motion setup to establish the UI foundation layer.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- State Management: Zustand (v5.x) — lightweight, Tauri-friendly, no Provider wrapping
- Local Data Persistence: SQLite via tauri-plugin-sql — structured prompt history, queryable, migration support
- Frontend Routing: State-based views — no URL router needed for desktop app

**Important Decisions (Shape Architecture):**
- Tauri IPC Pattern: Commands + Events for Frontend↔Rust bridge
- Python Sidecar IPC: stdin/stdout JSON-RPC with structured error codes
- API Key Security: OS-native keychain via tauri-plugin-stronghold
- Cloud API Communication: HTTPS via reqwest (Rust) directly to LLM providers

**Deferred Decisions (Post-MVP):**
- Full-text search for prompts (FTS via SQLite) — DB schema prepared for it
- Prompt Marketplace community features — platform phase v2.0
- Telemetry/Monitoring — optional opt-in for v1.1

### Data Architecture

**Local Data Persistence: SQLite via tauri-plugin-sql**

- **Choice:** SQLite with tauri-plugin-sql (sqlx under the hood), `sqlite` feature flag
- **Version:** tauri-plugin-sql v2.x (Tauri v2 compatible, current as of Nov 2025)
- **Rationale:** Prompt history grows over time and benefits from structured querying (search by domain, adapter, date). SQLite provides migration support for schema evolution across releases. The plugin provides a clean JavaScript API (`Database.load('sqlite:prompt-engineer.db')`) and Rust-side migration definitions.
- **Schema domains:** prompt_history, skill_tree_state, user_settings, usage_stats, quest_progress
- **Migrations:** Defined in Rust at build time; applied automatically on `Database.load()`. Each migration has version, description, SQL, and kind (Up/Down). All migrations execute within a transaction for atomicity.
- **Permission:** `sql:allow-execute`, `sql:allow-select` in Tauri capabilities config
- **Affects:** FR24–FR28 (Gamification/Skill Tree), FR6–FR9 (Prompt History), Skill Tree Engine, Adapter Engine

**Caching Strategy:**
- Local LLM model: Filesystem cache at `{app_data_dir}/models/` — downloaded once, verified by checksum
- In-memory: Zustand stores (transient UI state), Tauri State (Rust-side LLM Router, Settings)
- No distributed cache needed (standalone desktop app)

### Authentication & Security

**Authentication: None (Zero-Onboarding)**

- **Choice:** No user authentication — account-less, registration-free by design
- **Rationale:** Core product requirement: "No account, no API key, no configuration required at first launch" (PRD FR1). Non-technical users must not face any login barrier.
- **Affects:** Entire Onboarding flow (FR1–FR5)

**API Key Security: OS-native Keychain via tauri-plugin-stronghold**

- **Choice:** tauri-plugin-stronghold for encrypted API key storage
- **Rationale:** API keys (OpenAI, Anthropic, Google) stored encrypted at rest using OS-native secure storage. Stronghold provides Rust-level encryption with snapshot-based persistence. Keys never logged, never displayed after initial entry, never transmitted to any endpoint other than the corresponding LLM provider.
- **Affects:** FR14, FR15, NFR-S1, NFR-S2

**WebView Security:**
- Content Security Policy (CSP) configured in Tauri configuration
- Asset protocol for local resources
- No remote content execution; all frontend bundled locally

**Data Privacy:**
- Fast Refine: 100% local processing (prompt never leaves the machine)
- Master Mode: Prompt transmitted to user-selected cloud LLM provider only on explicit user action
- No telemetry without explicit opt-in (NFR-S4)

### API & Communication Patterns

**Frontend ↔ Rust Backend: Tauri Commands + Events**

- **Pattern:** `invoke('command_name', { args })` for request/response; `listen('event_name', callback)` for push notifications
- **Commands:** `fast_refine`, `master_mode_start`, `master_mode_respond`, `detect_domain`, `get_adapter_preview`, `get_skill_tree`, `get_settings`, `update_settings`, `get_prompt_history`
- **Events:** `llm_progress`, `model_ready`, `master_mode_message`, `skill_tree_updated`, `update_available`, `update_downloaded`
- **State Management:** Tauri State for LLM Router, Settings, Skill Tree Engine, Adapter Registry

**Python Sidecar IPC: stdin/stdout JSON-RPC**

- **Pattern:** Request/Response JSON-RPC over stdin/stdout
- **Requests:** `{ "id": 1, "method": "detect_domain", "params": { "text": "..." } }`
- **Responses:** `{ "id": 1, "result": { "domain": "email", "confidence": 0.92 } }`
- **Error handling:** `{ "id": 1, "error": { "code": -32000, "message": "..." } }` with structured error codes
- **Fallback:** Rust keyword-matching when sidecar unavailable (NFR-I3, FR32)
- **Process management:** tauri-plugin-shell for sidecar lifecycle (start on app launch, restart on crash, shutdown on app close)

**Cloud API Communication: HTTPS via reqwest (Rust)**

- **Pattern:** Direct HTTPS calls from Rust backend to LLM provider APIs
- **Providers:** OpenAI (GPT-4o), Anthropic (Claude 3.5 Sonnet), Google AI (Gemini 1.5 Flash)
- **Authentication:** API key retrieved from stronghold, sent as Bearer token or API key header
- **Error handling:** Structured error types with user-facing messages; timeout at 30s per request
- **Rate limiting:** Client-side respect for rate-limit headers; exponential backoff on 429 responses

### Frontend Architecture

**State Management: Zustand (v5.x)**

- **Choice:** Zustand — lightweight (~1KB), minimal boilerplate, no Provider wrapping required
- **Rationale:** Desktop app with no server state (no React Query caching needed). Zustand's simplicity suits the medium-complexity state needs: skill-tree progress, active prompt, mode selection, theme, UI language, model download status, master-mode dialog state. Well-adopted in the Tauri ecosystem.
- **Store structure:**
  - `useAppStore` — currentMode, theme, language, connectivity status
  - `usePromptStore` — currentInput, refinedOutput, dissectorState, adapterViewState
  - `useSkillTreeStore` — currentTier, discoveredNodes, questProgress, streak
  - `useModelStore` — downloadProgress, modelStatus, availableModels
  - `useSettingsStore` — apiKeys (presence only, never values), preferences

**Component Architecture:**

- **Pattern:** Custom Tailwind-styled React components, no 3rd-party UI library
- **All components accept `className` for composability**
- **Framer Motion** for all animated transitions and micro-interactions
- **Key custom components (8):** PromptDissector, SkillTreeVisualization, BeforeAfterDiff, ThreeColumnAdapterPreview, MasterModeDialog, CommandPalette, ProgressIndicator, ChipNavigationBar

**Routing: State-based Views**

- **Choice:** No React Router — a single `currentView` state switches between component trees
- **Rationale:** Desktop app with no URL bar. Only ~4 views: FastRefine (main), MasterMode (overlay), SkillTree (full-screen), AdapterPreview (side panel). State-based routing avoids unnecessary complexity.
- **View switching:** Via Zustand `useAppStore.currentView`; Command Palette can also trigger view changes
- **Transitions:** Framer Motion `AnimatePresence` for view transitions

**Performance Optimization:**
- Vite code splitting by view (lazy loading for SkillTree, AdapterPreview panels)
- Framer Motion `layoutId` for shared element transitions between views
- Memoization of Dissector output (re-parses only on input change)
- Tailwind JIT for minimal CSS bundle

### Infrastructure & Deployment

**CI/CD: GitHub Actions**

- **Trigger:** Push to `main`, Pull Requests, Version Tags
- **Matrix:** Windows (x86_64), macOS (x86_64 + aarch64 universal), Linux (AppImage)
- **Steps:** Lint → Test (Vitest + cargo test) → Build (tauri build) → Sign (macOS/Windows) → Release
- **Artifacts:** Platform-specific installers (.msi, .dmg, .AppImage)

**Distribution: GitHub Releases**

- **Primary:** GitHub Releases with platform-specific binaries
- **Update mechanism:** tauri-plugin-updater polling GitHub Releases API
- **Update flow:** Background download → Patch notes dialog → User confirms → App restarts

**Environment Configuration:**
- `tauri.conf.json` — App metadata, window config, CSP, plugins
- `.env` / Tauri config — dev/production API endpoints
- `capabilities/default.json` — Plugin permissions

**Monitoring:**
- Opt-in anonymous usage statistics (v1.1+)
- tauri-plugin-log for local log files
- Crash reporting via Rust panic hooks (local only)

### Decision Impact Analysis

**Implementation Sequence (First Tasks):**
1. `npm create tauri-app@latest` → scaffold project
2. Tailwind CSS + Framer Motion → UI foundation
3. Zustand stores → state architecture
4. tauri-plugin-sql → database layer with migrations
5. tauri-plugin-stronghold → credential storage
6. LLM Router (llama-cpp-rs) → Fast Refine engine
7. Tauri Commands + Events → IPC layer
8. Python Sidecar IPC → NLP integration

**Cross-Component Dependencies:**
- Zustand `useAppStore` depended on by all UI components
- SQLite schema depended on by SkillTreeEngine, PromptHistory, Settings
- LLM Router depended on by FastRefine, MasterMode, AdapterEngine
- Python Sidecar depended on by DomainDetector (with Rust fallback independence)
- tauri-plugin-stronghold depended on by MasterMode, Settings (API key CRUD)

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 12 areas across 4 dimensions (naming, structure, format, communication) where AI agents could make incompatible choices without explicit patterns. The following rules eliminate these conflicts across Rust, TypeScript, Python, and SQLite.

### Naming Patterns

**Multi-Language Naming Conventions:**

| Language | Convention | Example | Scope |
|----------|-----------|---------|-------|
| **Rust** | `snake_case` | `llm_router.rs`, `fn fast_refine()`, `struct LlmConfig` | `src-tauri/` |
| **TypeScript** | `camelCase` (vars/fns), `PascalCase` (components/types) | `usePromptStore`, `<PromptDissector>`, `RefineResult` | `src/` |
| **Python** | `snake_case` | `detect_domain.py`, `intent_classifier` | `sidecar/` |
| **SQLite** | `snake_case` | `prompt_history`, `skill_tree_state` | DB schema |
| **CSS/Tailwind** | `kebab-case` for custom classes | `.dissector-role`, `.skill-tree-node` | `src/styles/` |

**Tauri IPC Naming:**

- **Commands:** `snake_case`, verb-first — `fast_refine`, `master_mode_start`, `detect_domain`, `get_adapter_preview`, `get_skill_tree`
- **Events:** `snake_case`, `entity_event` pattern — `model_ready`, `llm_progress`, `master_mode_message`, `skill_tree_updated`, `update_available`
- **Command arguments:** `camelCase` at TypeScript call site, mapped to `snake_case` in Rust via `#[tauri::command(rename_all = "snake_case")]`

**React Component Naming:**

- **Components:** `PascalCase` files — `PromptDissector.tsx`, `SkillTreeVisualization.tsx`, `BeforeAfterDiff.tsx`
- **Hooks:** `use` prefix, `camelCase` — `useModelDownload.ts`, `usePromptHistory.ts`
- **Stores:** `use` prefix + `Store` suffix — `useAppStore.ts`, `usePromptStore.ts`
- **Types/Interfaces:** `PascalCase` — `RefineResult`, `SkillTreeNode`, `AdapterConfig`

**Database Naming:**

- **Tables:** `snake_case` plural — `prompt_history`, `skill_tree_nodes`, `user_settings`, `quest_progress`
- **Columns:** `snake_case` — `created_at`, `user_id`, `prompt_text`, `tier_level`
- **Primary keys:** `id` (integer, auto-increment)
- **Foreign keys:** `{referenced_table_singular}_id` — `prompt_id`, `node_id`
- **Indexes:** `idx_{table}_{column}` — `idx_prompt_history_created_at`
- **Timestamps:** `created_at`, `updated_at` (ISO 8601 text)

### Structure Patterns

**Project Organization — Type-first structure:**

```
prompt-engineer/
├── src/                          # React frontend (TypeScript)
│   ├── components/               # UI components organized by type
│   │   ├── dissector/            # PromptDissector + variants
│   │   ├── skill-tree/           # SkillTreeVisualization
│   │   ├── diff/                 # BeforeAfterDiff
│   │   ├── adapter/              # ThreeColumnAdapterPreview
│   │   ├── master-mode/          # MasterModeDialog
│   │   ├── command-palette/      # CommandPalette
│   │   ├── progress/             # ProgressIndicator variants
│   │   └── navigation/           # ChipNavigationBar, Sidebar
│   ├── stores/                   # Zustand stores
│   │   ├── useAppStore.ts
│   │   ├── usePromptStore.ts
│   │   ├── useSkillTreeStore.ts
│   │   ├── useModelStore.ts
│   │   └── useSettingsStore.ts
│   ├── hooks/                    # Shared React hooks
│   ├── lib/                      # Utilities, API wrappers, type definitions
│   │   ├── tauri.ts              # Typed invoke wrappers
│   │   ├── types.ts              # Shared TypeScript types
│   │   └── constants.ts          # Magic strings, config
│   ├── styles/                   # Global styles, Tailwind config
│   └── assets/                   # Static assets (icons, images)
├── src-tauri/                    # Rust backend
│   ├── src/
│   │   ├── main.rs               # Entry point, plugin registration
│   │   ├── lib.rs                # Tauri Builder setup
│   │   ├── commands/             # Tauri command handlers
│   │   │   ├── mod.rs
│   │   │   ├── refine.rs         # fast_refine, master_mode commands
│   │   │   ├── adapter.rs        # adapter preview commands
│   │   │   ├── skill_tree.rs     # skill tree commands
│   │   │   ├── settings.rs       # settings commands
│   │   │   └── history.rs        # prompt history commands
│   │   ├── llm/                  # LLM integration
│   │   │   ├── mod.rs
│   │   │   ├── router.rs         # LLM Router (local vs cloud)
│   │   │   ├── local.rs          # llama.cpp wrapper (llama-cpp-rs)
│   │   │   └── cloud.rs          # reqwest-based cloud API calls
│   │   ├── pipeline/             # Prompt transformation pipeline
│   │   │   ├── mod.rs
│   │   │   ├── adapter.rs        # LLM-specific format adapters
│   │   │   └── domain.rs         # Domain detection (keyword fallback)
│   │   ├── sidecar/              # Python sidecar IPC
│   │   │   └── mod.rs
│   │   ├── db/                   # Database layer
│   │   │   ├── mod.rs
│   │   │   └── migrations.rs     # SQL migration definitions
│   │   ├── state.rs              # Tauri managed state types
│   │   └── error.rs              # AppError enum + serialization
│   ├── capabilities/             # Tauri permissions
│   │   └── default.json
│   ├── icons/                    # App icons
│   └── Cargo.toml
├── sidecar/                      # Python NLP sidecar
│   ├── main.py                   # Entry point, JSON-RPC loop
│   ├── classifier.py             # Intent/domain classifier (spaCy)
│   └── requirements.txt
├── tests/                        # Integration & E2E tests
│   ├── e2e/                      # Playwright E2E tests
│   └── integration/              # Tauri command integration tests
├── docs/                         # Project documentation
├── .github/                      # GitHub Actions workflows
│   └── workflows/
│       └── build.yml
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

**Test Location Rules:**

- **Unit tests (Rust):** `#[cfg(test)] mod tests { ... }` inline in source files (Rust convention)
- **Unit tests (TypeScript):** `*.test.ts` co-located next to source file — e.g., `src/stores/usePromptStore.test.ts`
- **Component tests:** `*.test.tsx` co-located — e.g., `src/components/dissector/PromptDissector.test.tsx`
- **Integration tests (Rust):** `src-tauri/tests/` directory
- **E2E tests:** `tests/e2e/` using Playwright with `tauri-driver`

**File Naming:**

- TypeScript modules: `camelCase` — `useModelDownload.ts`, `tauriClient.ts`
- React components: `PascalCase` — `PromptDissector.tsx`
- Rust modules: `snake_case` — `llm_router.rs`, `mod.rs` for directory modules
- Test files: source name + `.test.ts(x)` — `usePromptStore.test.ts`
- Config files: framework convention — `tailwind.config.js`, `vite.config.ts`

### Format Patterns

**Tauri Command Response Format:**

All Tauri commands return `Result<T, AppError>` where `AppError` serializes as:
```json
{
  "code": "LLM_NOT_READY",
  "message": "The local LLM model is still downloading. 67% complete."
}
```

Success responses return the payload directly (no wrapper).

**AppError Error Codes:**

| Code | Meaning | User-Visible? |
|------|---------|---------------|
| `LLM_NOT_READY` | Model still downloading/loading | Yes |
| `LLM_INFERENCE_FAILED` | Local inference error | Yes |
| `API_KEY_MISSING` | No cloud API key configured | Yes |
| `API_RATE_LIMITED` | Cloud provider rate limit hit | Yes |
| `API_TIMEOUT` | Cloud API request timed out | Yes |
| `SIDECAR_UNAVAILABLE` | Python sidecar not running | No (falls back to keyword) |
| `DATABASE_ERROR` | SQLite operation failed | No (logged only) |
| `INVALID_INPUT` | Input validation failed | Yes |
| `UPDATE_FAILED` | Auto-update error | Yes |

**Python Sidecar JSON-RPC Format:**

```json
// Request
{ "id": 1, "method": "detect_domain", "params": { "text": "..." } }

// Success Response
{ "id": 1, "result": { "domain": "email", "confidence": 0.92 } }

// Error Response
{ "id": 1, "error": { "code": -32000, "message": "Model not loaded" } }
```

**Cross-Language JSON Serialization:**

- **TypeScript ↔ Rust (Tauri IPC):** Automatic via `serde` + `tauri::command`. Rust uses `snake_case` fields with `#[serde(rename_all = "camelCase")]` for TypeScript compatibility.
- **Rust ↔ Python:** JSON-RPC over stdin/stdout. Both sides use `snake_case` field names (Python/Rust convention alignment).

**Date/Time Format:**

- Storage (SQLite): ISO 8601 text (`2026-06-27T14:30:00Z`)
- Tauri IPC: ISO 8601 string (serialized via `serde`)
- Display (UI): Localized via `Intl.DateTimeFormat`, relative time for recent (<24h)

### Communication Patterns

**Tauri Event System:**

| Event | Direction | Payload | When |
|-------|-----------|---------|------|
| `model_ready` | Rust → Frontend | `{}` | Local LLM loaded and ready |
| `llm_progress` | Rust → Frontend | `{ "downloaded": 734003200, "total": 1288490188 }` | During model download |
| `master_mode_message` | Rust → Frontend | `{ "role": "assistant", "content": "..." }` | Each coaching turn |
| `skill_tree_updated` | Rust → Frontend | `{ "node_id": "role_discovery", "tier": 1 }` | Node unlocked |
| `update_available` | Rust → Frontend | `{ "version": "1.1.0", "notes": "..." }` | Update detected |
| `update_downloaded` | Rust → Frontend | `{}` | Update ready to install |

**Frontend event listener pattern:**
```typescript
// Always set up listeners in useEffect with cleanup
useEffect(() => {
  const unlisten = listen<LlmProgress>('llm_progress', (event) => {
    useModelStore.getState().setProgress(event.payload);
  });
  return () => { unlisten.then(fn => fn()); };
}, []);
```

**Zustand State Update Patterns:**

- **Always immutable updates** via `set()` — never mutate state directly
- **Async operations** in store actions, loading flags via `set({ isLoading: true })` / `set({ isLoading: false })`
- **No derived state in stores** — use selectors: `const input = usePromptStore(s => s.input)`
- **Store composition** — stores never import each other; cross-store coordination in components/hooks
- **Persistence:** SkillTreeStore and SettingsStore sync to SQLite via Tauri commands on significant changes (debounced, 500ms)

### Process Patterns

**Error Handling:**

| Layer | Pattern |
|-------|---------|
| **Rust commands** | Return `Result<T, AppError>`. Log full error with `tracing`. Return user-safe message in `AppError`. |
| **Frontend invoke** | Wrap all `invoke()` calls in try/catch. Parse `AppError.code` for specific handling. Show `AppError.message` in UI for user-visible codes. |
| **React components** | Error boundaries at view level (FastRefineView, SkillTreeView, etc.). Fallback UI: "Something went wrong — [Retry]" with the error message. |
| **Python sidecar** | Catch all exceptions in JSON-RPC loop. Return structured error response. Log to stderr. Never crash the process. |

**Loading State Patterns:**

- **Naming:** `is{Action}ing` — `isRefining`, `isDownloading`, `isLoading`
- **Granularity:** Per-store, per-action loading flags. No global loading state.
- **UI:** Skeleton screens for initial loads; disabled buttons with spinner text for actions.
- **Display rule:** Loading indicators only appear if operation exceeds 200ms (prevents flicker for sub-200ms operations).

**Model Download Pattern:**

```typescript
// Zustand store drives a single ProgressIndicator component
interface ModelState {
  status: 'idle' | 'downloading' | 'ready' | 'error';
  downloadedBytes: number;
  totalBytes: number;
  error: string | null;
}
// Progress bar: <ProgressIndicator value={downloadedBytes / totalBytes * 100} />
// Ready: bar turns green, fades out after 2s
// Error: bar turns red, shows retry button
```

### Enforcement Guidelines

**All AI Agents MUST:**

1. Follow the naming convention table exactly — `snake_case` in Rust/Python/SQLite, `camelCase`/`PascalCase` in TypeScript
2. Return `Result<T, AppError>` from all Tauri commands — never panic or return plain strings
3. Use the defined Zustand store structure — `State` + `Actions` interface, `create<State & Actions>(...)`
4. Place files in the defined directory structure — no ad-hoc top-level files
5. Use ISO 8601 for all date/time values crossing IPC boundaries
6. Wrap all `invoke()` calls in try/catch with `AppError` handling
7. Co-locate tests next to source files (TypeScript) or inline (Rust unit tests)
8. Never import one Zustand store from another — use component-level coordination

**Pattern Enforcement:**

- ESLint rules for TypeScript naming conventions
- `cargo clippy` with `#[deny(clippy::all)]` for Rust
- Pre-commit hook: `pnpm lint && cargo clippy && cargo test`
- CI pipeline verifies lint + test on every PR
- Architecture decision document is the source of truth for pattern disputes

### Pattern Examples

**Good: Tauri Command (Rust)**
```rust
#[tauri::command]
async fn fast_refine(input: String) -> Result<RefineResult, AppError> {
    let router = crate::state::LlmRouter::from_state()?;
    router.refine(&input).await.map_err(|e| AppError::LlmNotReady(e.to_string()))
}
```

**Good: Zustand Store (TypeScript)**
```typescript
const usePromptStore = create<PromptState & PromptActions>((set, get) => ({
  input: '',
  output: null,
  isRefining: false,
  setInput: (text) => set({ input: text }),
  refine: async () => {
    set({ isRefining: true });
    try {
      const result = await invoke<RefineResult>('fast_refine', { input: get().input });
      set({ output: result, isRefining: false });
    } catch (e) {
      set({ isRefining: false });
      throw e;
    }
  },
}));
```

**Anti-Pattern: Direct state mutation**
```typescript
// ❌ Never do this
usePromptStore.state.input = 'new text';

// ✅ Always use set()
usePromptStore.getState().setInput('new text');
```

**Anti-Pattern: Cross-store import**
```typescript
// ❌ Bad: usePromptStore imports useSkillTreeStore
import { useSkillTreeStore } from './useSkillTreeStore';

// ✅ Good: Component coordinates both stores
function RefineButton() {
  const refine = usePromptStore(s => s.refine);
  const addProgress = useSkillTreeStore(s => s.addProgress);
  
  const handleClick = async () => {
    await refine();
    addProgress('fast_refine_used');
  };
}
```

## Project Structure & Boundaries

### Complete Project Directory Structure

```
prompt-engineer/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── .github/
│   └── workflows/
│       └── build.yml
├── src/                          # React frontend (TypeScript)
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Root component, view router
│   ├── components/
│   │   ├── dissector/
│   │   │   ├── PromptDissector.tsx
│   │   │   ├── DissectorLegend.tsx
│   │   │   ├── DissectorSegment.tsx
│   │   │   ├── DissectorOverlay.tsx
│   │   │   └── PromptDissector.test.tsx
│   │   ├── skill-tree/
│   │   │   ├── SkillTreeVisualization.tsx
│   │   │   ├── SkillTreeNode.tsx
│   │   │   ├── SkillTreeMini.tsx
│   │   │   └── SkillTreeVisualization.test.tsx
│   │   ├── diff/
│   │   │   ├── BeforeAfterDiff.tsx
│   │   │   └── BeforeAfterDiff.test.tsx
│   │   ├── adapter/
│   │   │   ├── ThreeColumnAdapterPreview.tsx
│   │   │   ├── AdapterColumn.tsx
│   │   │   └── ThreeColumnAdapterPreview.test.tsx
│   │   ├── master-mode/
│   │   │   ├── MasterModeDialog.tsx
│   │   │   ├── CoachMessage.tsx
│   │   │   ├── UserInput.tsx
│   │   │   └── MasterModeDialog.test.tsx
│   │   ├── command-palette/
│   │   │   ├── CommandPalette.tsx
│   │   │   └── CommandPalette.test.tsx
│   │   ├── progress/
│   │   │   ├── ProgressIndicator.tsx
│   │   │   └── ProgressIndicator.test.tsx
│   │   └── navigation/
│   │       ├── ChipNavigationBar.tsx
│   │       ├── HeroSection.tsx
│   │       ├── DemoPromptBanner.tsx
│   │       └── ThemeToggle.tsx
│   ├── stores/
│   │   ├── useAppStore.ts
│   │   ├── useAppStore.test.ts
│   │   ├── usePromptStore.ts
│   │   ├── usePromptStore.test.ts
│   │   ├── useSkillTreeStore.ts
│   │   ├── useSkillTreeStore.test.ts
│   │   ├── useModelStore.ts
│   │   ├── useModelStore.test.ts
│   │   ├── useSettingsStore.ts
│   │   └── useSettingsStore.test.ts
│   ├── hooks/
│   │   ├── useTauriEvent.ts
│   │   ├── useKeyboardShortcut.ts
│   │   ├── useConnectivity.ts
│   │   └── useDebounce.ts
│   ├── lib/
│   │   ├── tauri.ts              # Typed invoke wrappers
│   │   ├── types.ts              # Shared TypeScript types
│   │   ├── constants.ts
│   │   ├── formatters.ts         # Date, text formatters
│   │   └── validators.ts
│   ├── styles/
│   │   ├── globals.css           # Tailwind directives, CSS custom properties
│   │   └── design-tokens.ts      # Token constants for TypeScript
│   └── assets/
│       ├── icons/
│       └── images/
├── src-tauri/                    # Rust backend
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   ├── capabilities/
│   │   └── default.json
│   ├── icons/
│   │   ├── icon.ico
│   │   ├── icon.png
│   │   └── icon.icns
│   ├── src/
│   │   ├── main.rs               # Entry point, plugin registration
│   │   ├── lib.rs                # Tauri Builder setup, command registration
│   │   ├── commands/
│   │   │   ├── mod.rs
│   │   │   ├── refine.rs         # fast_refine, master_mode_start, master_mode_respond
│   │   │   ├── adapter.rs        # get_adapter_preview, list_adapters
│   │   │   ├── skill_tree.rs     # get_skill_tree, unlock_node, get_quests
│   │   │   ├── settings.rs       # get_settings, update_settings, set_api_key
│   │   │   └── history.rs        # get_prompt_history, save_prompt, delete_prompt
│   │   ├── llm/
│   │   │   ├── mod.rs
│   │   │   ├── router.rs         # LLM Router: mode → backend selection
│   │   │   ├── local.rs          # llama-cpp-rs wrapper, model lifecycle
│   │   │   └── cloud.rs          # reqwest-based OpenAI/Anthropic/Google API
│   │   ├── pipeline/
│   │   │   ├── mod.rs
│   │   │   ├── adapter.rs        # Claude XML, GPT-4o Markdown, Gemini Few-Shot
│   │   │   └── domain.rs         # Keyword-based domain detection fallback
│   │   ├── sidecar/
│   │   │   └── mod.rs            # Python process management, JSON-RPC client
│   │   ├── db/
│   │   │   ├── mod.rs            # Database connection, query helpers
│   │   │   └── migrations.rs     # SQL migration definitions
│   │   ├── state.rs              # Tauri managed state: LlmRouter, Settings, SkillTree
│   │   └── error.rs              # AppError enum, Serialize/Deserialize
│   └── tests/
│       └── integration/
│           ├── refine_tests.rs
│           ├── adapter_tests.rs
│           └── db_tests.rs
├── sidecar/                      # Python NLP sidecar (PyOxidizer packaged)
│   ├── main.py                   # Entry point: JSON-RPC stdin/stdout loop
│   ├── classifier.py             # spaCy + Intent classifier
│   ├── models/                   # Downloaded spaCy models
│   └── requirements.txt
├── tests/                        # E2E tests
│   └── e2e/
│       ├── first-refine.spec.ts
│       ├── master-mode.spec.ts
│       ├── adapter-preview.spec.ts
│       └── fixtures/
└── docs/
    ├── CONTRIBUTING.md
    ├── ARCHITECTURE.md
    └── IPC.md                    # Tauri IPC documentation for contributors
```

### Requirements to Structure Mapping

**FR1–FR5 (Onboarding & First-Run):**
- `src-tauri/src/llm/local.rs` — Async model download, progress events
- `src/stores/useModelStore.ts` — Download state, status tracking
- `src/components/progress/ProgressIndicator.tsx` — Download progress UI
- `src/components/navigation/DemoPromptBanner.tsx` — Interactive demo prompt
- `src/hooks/useConnectivity.ts` — Network status detection

**FR6–FR9 (Fast Refine):**
- `src-tauri/src/commands/refine.rs` — `fast_refine` command handler
- `src-tauri/src/llm/router.rs` — Routes `fast_refine` → local LLM
- `src-tauri/src/llm/local.rs` — llama.cpp inference
- `src/stores/usePromptStore.ts` — Input/output/refining state
- `src/components/diff/BeforeAfterDiff.tsx` — Visual comparison
- `src/lib/tauri.ts` — `invoke('fast_refine')` typed wrapper

**FR10–FR15 (Master Mode):**
- `src-tauri/src/commands/refine.rs` — `master_mode_start`, `master_mode_respond`
- `src-tauri/src/llm/router.rs` — Routes Master Mode → cloud API
- `src-tauri/src/llm/cloud.rs` — OpenAI/Anthropic/Google API calls
- `src-tauri/src/state.rs` — Secure API key retrieval from stronghold
- `src/components/master-mode/MasterModeDialog.tsx` — Chat UI
- Tauri Events: `master_mode_message` for streaming coach responses

**FR16–FR19 (Prompt Dissector & Learning):**
- `src/components/dissector/PromptDissector.tsx` — Color-coded inline display
- `src/components/dissector/DissectorLegend.tsx` — Interactive legend
- `src/components/dissector/DissectorOverlay.tsx` — First-contact animated intro
- `src/stores/useSkillTreeStore.ts` — Tier → dissector complexity mapping

**FR20–FR23 (LLM Adapter System):**
- `src-tauri/src/pipeline/adapter.rs` — Claude XML, GPT-4o Markdown, Gemini Few-Shot formatters
- `src-tauri/src/commands/adapter.rs` — `get_adapter_preview` command
- `src/components/adapter/ThreeColumnAdapterPreview.tsx` — Side-by-side view
- `src/components/adapter/AdapterColumn.tsx` — Single adapter output column

**FR24–FR28 (Gamification & Skill Tree):**
- `src-tauri/src/commands/skill_tree.rs` — Tree state management, quest tracking
- `src-tauri/src/db/migrations.rs` — `skill_tree_nodes`, `quest_progress` tables
- `src/stores/useSkillTreeStore.ts` — Client-side tree state
- `src/components/skill-tree/SkillTreeVisualization.tsx` — Spatial tree display
- `src/components/skill-tree/SkillTreeMini.tsx` — Sidebar compact variant
- Tauri Events: `skill_tree_updated` for progress notifications

**FR29–FR32 (Domain Detection & NLP):**
- `sidecar/main.py` — JSON-RPC loop, request dispatch
- `sidecar/classifier.py` — spaCy + Intent classifier
- `src-tauri/src/sidecar/mod.rs` — Process lifecycle, JSON-RPC client
- `src-tauri/src/pipeline/domain.rs` — Rust keyword fallback

**FR33–FR36 (Application Shell & Navigation):**
- `src/App.tsx` — View router (state-based)
- `src/stores/useAppStore.ts` — `currentMode`, `currentView`, `theme`
- `src/components/navigation/ChipNavigationBar.tsx` — Domain chips
- `src/components/navigation/HeroSection.tsx` — Welcome header
- `src/components/command-palette/CommandPalette.tsx` — Ctrl+Shift+P overlay

**FR37–FR40 (Update & System):**
- `src-tauri/src/main.rs` — `tauri-plugin-updater` registration
- Tauri Events: `update_available`, `update_downloaded`

**FR41–FR43 (Open-Source Readiness):**
- `CONTRIBUTING.md` — Build instructions, architecture overview
- `docs/ARCHITECTURE.md` — This document
- `docs/IPC.md` — Tauri IPC documentation for contributors
- `src-tauri/src/pipeline/adapter.rs` — Community adapter interface

### Architectural Boundaries

**API Boundaries — Tauri IPC:**

| Boundary | Mechanism | Direction |
|----------|-----------|-----------|
| Frontend → Rust | `invoke(command, args)` | TypeScript → Rust |
| Rust → Frontend | `app.emit(event, payload)` | Rust → TypeScript |
| Rust → Python | stdin/stdout JSON-RPC | Rust → Python subprocess |
| Rust → Cloud LLM | HTTPS (reqwest) | Rust → External API |
| Frontend → SQLite | `invoke()` → Rust → `Database.load()` | TypeScript → Rust → SQLite |

**Component Boundaries — Frontend:**

- Views are mounted by `App.tsx` based on `useAppStore.currentView`
- Components communicate only through Zustand stores — never direct prop drilling beyond 2 levels
- MasterModeDialog is an overlay, not a route — rendered over FastRefineView
- AdapterPreview is a side panel — slides in/out over current view
- CommandPalette is a modal overlay — renders above all content
- SkillTreeVisualization is a full-screen view — replaces current view

**Service Boundaries — Rust Backend:**

- `llm::router` is the sole decision point for local vs cloud routing — all commands call through it
- `pipeline::adapter` depends on `llm::router` output — pipeline runs after routing
- `sidecar` is an optional enhancement layer — `pipeline::domain` provides the fallback
- `db` is a utility layer, not a service — called by commands, never by other services directly
- `state` modules own long-lived resources (LlmRouter, models, connections)

**Data Boundaries:**

| Data | Location | Access Pattern |
|------|----------|---------------|
| Prompt history | SQLite `prompt_history` | Via `invoke()` commands only |
| Skill tree state | SQLite `skill_tree_nodes` + Zustand cache | Read on app start, write via commands |
| API keys | OS Keychain (stronghold) | Via `settings::get_api_key` only — never in Zustand |
| User settings | SQLite `user_settings` + Zustand cache | Read/write via commands |
| LLM model | Filesystem `{app_data}/models/` | Rust `llm::local` only |
| Transient UI state | Zustand stores (memory only) | Direct access in components |

### Data Flow

**Fast Refine Flow:**
```
User Input (React) 
  → invoke('fast_refine', { input }) 
  → Rust command handler 
  → llm::router → local LLM inference (llama.cpp)
  → Return RefineResult { refined_prompt, components: { role, task, format, context } }
  → Zustand usePromptStore.output updated
  → PromptDissector reads output, renders color-coded segments
```

**Master Mode Flow:**
```
User clicks "Deepen" after Fast Refine
  → View switches to MasterModeDialog overlay
  → invoke('master_mode_start', { prompt, history })
  → llm::router → cloud API (OpenAI/Anthropic/Google)
  → Event 'master_mode_message' streams coach response
  → User types response
  → invoke('master_mode_respond', { session_id, response })
  → Repeat 2-5 turns
  → User accepts → RefineResult returned
```

**Domain Detection Flow:**
```
User submits text
  → invoke('detect_domain', { text })
  → Rust tries sidecar JSON-RPC call
  → If sidecar responds: return { domain, confidence }
  → If sidecar unavailable: fallback to pipeline::domain (keyword matching)
  → Adapter pipeline uses detected domain for structuring rules
```

**Skill Tree Progression Flow:**
```
User action triggers progress check (e.g., after Fast Refine)
  → invoke('unlock_node', { node_id: 'role_discovery' })
  → Rust checks conditions in SQLite
  → If unlocked: emit event 'skill_tree_updated' { node_id, tier }
  → Zustand useSkillTreeStore updates
  → UI: SkillTreeMini node glows, toast notification
```

### Development Workflow Integration

**Development Server:**
- `pnpm tauri dev` starts Vite dev server (frontend HMR) + Rust compilation + Tauri window
- Frontend on `http://localhost:5173` (Vite default), Tauri loads this URL in WebView
- Rust recompiles on `src-tauri/` changes via `cargo watch` (integrated in Tauri CLI)
- Python sidecar not started in dev — Rust keyword fallback used unless explicitly configured

**Build Process:**
- `pnpm tauri build` triggers:
  1. `vite build` → optimized frontend bundle
  2. `cargo build --release` → Rust binary with embedded WebView assets
  3. Platform-specific bundling (.msi, .dmg, .AppImage)
  4. Optional code signing (macOS, Windows)

**Environment Configuration:**
- Development: `tauri.conf.json` `devUrl: "http://localhost:5173"`
- Production: Frontend bundled into Rust binary via `tauri.conf.json` `frontendDist: "../dist"`
- CI builds: GitHub Actions matrix with platform-specific runners

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices form a coherent stack without conflicts:
- Tauri v2 (Rust) + React 18 (TypeScript) + Tailwind CSS + Framer Motion — established, well-documented combination
- llama-cpp-rs within Tauri Rust backend — compatible via Cargo; requires CMake and C++ build tools (documented in prerequisites)
- Python sidecar via tauri-plugin-shell — officially supported external process management
- tauri-plugin-sql (SQLite) + tauri-plugin-stronghold — both official Tauri v2 plugins, no version conflicts
- Zustand v5 + React 18 — fully compatible, widely used together
- reqwest HTTP client + Tauri async runtime (Tokio) — share the same async runtime, no conflicts

**Pattern Consistency:**
- Naming conventions align with each language's idioms: `snake_case` (Rust/Python/SQLite), `camelCase`/`PascalCase` (TypeScript)
- Tauri `rename_all` bridge handles Rust↔TypeScript naming translation consistently
- All 5 Zustand stores follow identical `State & Actions` interface pattern
- Single `AppError` enum provides uniform error handling across all 9+ Tauri commands
- Co-located test pattern (TypeScript) and inline test modules (Rust) are consistent with each ecosystem's conventions

**Structure Alignment:**
- `src/` (TypeScript frontend) + `src-tauri/` (Rust backend) + `sidecar/` (Python NLP) — clean separation with clear ownership
- Commands organized by functional domain (refine, adapter, skill_tree, settings, history) — maps directly to FR categories
- Components organized by type (dissector, skill-tree, diff, adapter, master-mode, etc.) — matches UX specification component list exactly
- Plugin dependencies isolated to `main.rs` and `lib.rs` — services never import plugin code directly

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
All 43 functional requirements (FR1–FR43) across 10 categories are mapped to specific source files and components:

| FR Category | FRs | Coverage | Key Files |
|-------------|-----|----------|-----------|
| Onboarding & First-Run | FR1–FR5 | ✅ Complete | `llm/local.rs`, `useModelStore`, `ProgressIndicator`, `DemoPromptBanner` |
| Fast Refine | FR6–FR9 | ✅ Complete | `commands/refine.rs`, `llm/router.rs`, `llm/local.rs`, `BeforeAfterDiff` |
| Master Mode | FR10–FR15 | ✅ Complete | `llm/cloud.rs`, `MasterModeDialog`, `state.rs` (stronghold keys) |
| Prompt Dissector | FR16–FR19 | ✅ Complete | `PromptDissector.tsx`, `DissectorOverlay.tsx`, `useSkillTreeStore` |
| LLM Adapter System | FR20–FR23 | ✅ Complete | `pipeline/adapter.rs`, `ThreeColumnAdapterPreview` |
| Gamification & Skill Tree | FR24–FR28 | ✅ Complete | `commands/skill_tree.rs`, `SkillTreeVisualization`, DB migrations |
| Domain Detection | FR29–FR32 | ✅ Complete | `sidecar/`, `sidecar/mod.rs`, `pipeline/domain.rs` (fallback) |
| Application Shell | FR33–FR36 | ✅ Complete | `App.tsx`, `useAppStore`, `ChipNavigationBar`, `CommandPalette` |
| Update & System | FR37–FR40 | ✅ Complete | `tauri-plugin-updater`, update events |
| Open-Source Readiness | FR41–FR43 | ✅ Complete | `CONTRIBUTING.md`, `docs/`, modular adapter interface |

**Non-Functional Requirements Coverage:**

| NFR Category | Count | Coverage | Status |
|-------------|-------|----------|--------|
| Performance (P1–P9) | 9 | ✅ Complete | Local LLM <500ms target, 60fps animations via Framer Motion, <100MB installer via Tauri |
| Security (S1–S5) | 5 | ✅ Complete | OS-native keychain, HTTPS-only cloud, local-only Fast Refine, opt-in telemetry |
| Scalability (SC1–SC4) | 4 | ✅ Complete | Standalone desktop (no server), community adapter plugins, GitHub Releases distribution |
| Accessibility (A1–A5) | 5 | ✅ Complete | Keyboard nav, non-color differentiators, 150% font scaling, English/German i18n, plain language |
| Integration (I1–I5) | 5 | ✅ Complete | 3 cloud providers, Python JSON-RPC, Rust fallback (NFR-I3), GitHub Releases API, LLM-specific formats |

### Implementation Readiness Validation ✅

**Decision Completeness:**
- All critical architectural decisions documented with technology versions
- Starter template initialization command specified with exact flags
- 9 AppError codes defined for consistent error handling across all IPC boundaries
- 6 Tauri events specified with payload structures
- 5 Zustand stores with State + Actions interfaces

**Structure Completeness:**
- Complete directory tree with ~80+ specific files mapped
- Every FR category mapped to specific source locations
- Integration boundaries defined for all 5 communication paths
- 4 data flow diagrams (Fast Refine, Master Mode, Domain Detection, Skill Tree)
- Build and development workflow documented

**Pattern Completeness:**
- Naming conventions for 5 languages/contexts (Rust, TypeScript, Python, SQLite, CSS)
- 8 mandatory enforcement rules for AI agents
- Good/bad pattern examples with concrete code
- Store composition rule (no cross-store imports)
- Event listener cleanup pattern

### Gap Analysis Results

**Minor Gaps Identified (Non-Blocking):**

1. **llama-cpp-rs Build Prerequisites:** CMake and C++ compiler requirement must be documented in `CONTRIBUTING.md` and CI workflow. These are standard build tools but must be explicit for contributor onboarding.
   - **Resolution:** Add prerequisites section to CONTRIBUTING.md during implementation.

2. **Python Sidecar Packaging Strategy:** Decision between PyOxidizer (single-file executable) and embedded Python (miniconda-portable) deferred. The Rust keyword fallback ensures this is non-blocking — the sidecar is an optional enhancement layer.
   - **Resolution:** Default to PyOxidizer for MVP (single binary, no Python runtime dependency for end users). Can be changed during implementation.

**No Critical or Important Gaps Found.**

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed (43 FRs, 28 NFRs, 10 categories)
- [x] Scale and complexity assessed (medium, desktop app)
- [x] Technical constraints identified (Tauri v2, llama.cpp, Python sidecar)
- [x] Cross-cutting concerns mapped (7 concerns: offline/online, LLM routing, adaptive UI, API key security, sidecar resilience, i18n, progressive disclosure)

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified (Rust, TypeScript, Python, SQLite)
- [x] Integration patterns defined (Tauri IPC, JSON-RPC sidecar, HTTPS cloud)
- [x] Performance considerations addressed (<500ms Fast Refine, 60fps UI, <60s first-run)

**✅ Implementation Patterns**
- [x] Naming conventions established (5 contexts)
- [x] Structure patterns defined (type-first organization)
- [x] Communication patterns specified (6 events, 9+ commands, JSON-RPC)
- [x] Process patterns documented (error handling, loading states, model download)

**✅ Project Structure**
- [x] Complete directory structure defined (~80+ files)
- [x] Component boundaries established (frontend views, Rust services, sidecar process)
- [x] Integration points mapped (5 communication paths)
- [x] Requirements to structure mapping complete (all 10 FR categories)

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** High — all architectural decisions validated, all requirements covered, all patterns defined with examples.

**Key Strengths:**
- Complete requirements-to-code mapping — every FR has a known home in the project structure
- Multi-language consistency rules prevent the most common cross-agent conflicts
- Graceful degradation built into the architecture (sidecar fallback, offline-first design)
- Error handling standardized across all IPC boundaries via AppError enum
- The LLM Router pattern cleanly separates local/cloud routing — the central architectural spine

**Areas for Future Enhancement:**
- Database schema details (table definitions) — to be defined during implementation as SQL migrations
- Master Mode prompt engineering templates — content design, not architecture
- Python sidecar packaging — decision deferred, non-blocking due to Rust fallback
- Community adapter plugin interface — design in v1.1 when community contributions begin

### Implementation Handoff

**AI Agent Guidelines:**

1. Follow all architectural decisions exactly as documented in this file
2. Use implementation patterns consistently across all components — refer to pattern examples for correct usage
3. Respect project structure and boundaries — place files in their designated directories
4. Return `Result<T, AppError>` from all Tauri commands — never panic
5. Use the defined Zustand store structure — never import one store from another
6. Wrap all `invoke()` calls in try/catch with AppError handling
7. This document is the source of truth for all architectural questions

**First Implementation Priority:**

```bash
npm create tauri-app@latest prompt-engineer
# Selections: TypeScript → pnpm → React → TypeScript
```

Followed immediately by: Tailwind CSS + Framer Motion setup, Zustand store scaffolding, and Tauri plugin installation (sql, stronghold, shell, updater, window-state).
