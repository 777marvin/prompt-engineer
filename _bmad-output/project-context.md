---
project_name: 'Prompt Engineer'
user_name: 'Marvin'
date: '2026-06-27'
sections_completed: ['technology_stack', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality', 'workflow_rules', 'critical_rules']
status: 'complete'
rule_count: 45
optimized_for_llm: true
existing_patterns_found: 12
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

**Desktop Runtime:** Tauri v2 (Rust backend + WebView frontend)
**Frontend:** React 18, TypeScript 5.x (strict), Vite
**Styling:** Tailwind CSS (design tokens in tailwind.config.js), Framer Motion (animations)
**State Management:** Zustand v5.x — 5 stores (useAppStore, usePromptStore, useSkillTreeStore, useModelStore, useSettingsStore)
**Rust Backend:** Tauri Commands + Events, reqwest (HTTPS), llama-cpp-rs (local LLM), tauri-plugin-sql (SQLite), tauri-plugin-stronghold (encrypted storage), tauri-plugin-shell (sidecar), tauri-plugin-updater
**Python Sidecar:** Python 3.11+, spaCy + Intent Classifier, stdin/stdout JSON-RPC, fallback: Rust keyword matching
**Database:** SQLite via tauri-plugin-sql (sqlx), feature flag: `sqlite`
**Testing:** Vitest + React Testing Library (frontend), cargo test (Rust), Playwright (E2E)
**CI/CD:** GitHub Actions, cross-platform matrix (Windows, macOS, Linux)
**Distribution:** GitHub Releases, tauri-plugin-updater
**Target Platforms:** Windows 10+ (Tier 1), macOS 12+ (Tier 1), Ubuntu 22.04+ (Tier 2)

## Critical Implementation Rules

### Language-Specific Rules

**TypeScript (src/):**
- Strict mode enabled in tsconfig.json — no implicit any, strict null checks
- All Tauri `invoke()` calls typed: `const result = await invoke<RefineResult>('fast_refine', { input })`
- Wrap every `invoke()` in try/catch — parse `AppError.code` for error-specific handling
- No direct state mutation — always use Zustand `set()` / `getState().setX()`
- Selectors for derived state: `const input = usePromptStore(s => s.input)`

**Rust (src-tauri/):**
- All Tauri commands return `Result<T, AppError>` — never panic, never return plain strings
- `AppError` enum defined in `src-tauri/src/error.rs` with 9 codes (LLM_NOT_READY, API_KEY_MISSING, etc.)
- Serialize via `serde` with `#[serde(rename_all = "camelCase")]` for TypeScript compatibility
- Tauri State for long-lived resources: LlmRouter, Settings, SkillTreeEngine
- `#[cfg(test)] mod tests { ... }` inline for unit tests
- `cargo clippy` with `#[deny(clippy::all)]` — no warnings allowed

**Python (sidecar/):**
- JSON-RPC loop on stdin/stdout: read line → parse JSON → dispatch → write response JSON
- Catch all exceptions — return structured error response, never crash
- Log to stderr only (stdout is the JSON-RPC channel)

### Framework-Specific Rules

**React / Tauri IPC:**
- All Tauri commands are `snake_case`: `fast_refine`, `master_mode_start`, `detect_domain`
- All Tauri events are `snake_case`: `model_ready`, `llm_progress`, `skill_tree_updated`
- Event listeners: always set up in `useEffect` with cleanup via `unlisten.then(fn => fn())`
- State-based view routing — no React Router. `useAppStore.currentView` switches views
- `AnimatePresence` from Framer Motion for view transitions

**Zustand Stores:**
- Every store: `create<State & Actions>((set, get) => ({...}))`
- Interface pattern: `interface XState { ... }`, `interface XActions { ... }`
- Async actions: `set({ isLoading: true })` before, `set({ isLoading: false, result })` after
- **Never import one store from another** — cross-store coordination in components/hooks
- Persistence: SkillTreeStore and SettingsStore sync to SQLite via debounced Tauri commands (500ms)

**Tailwind CSS:**
- Design tokens in `tailwind.config.js`: dissector colors, tier colors, semantic colors
- CSS custom properties on `:root` for runtime theme switching (`[data-theme="dark"]`)
- Components accept `className` for composability — no inline styles
- All interactive elements: 2px focus outline in accent color + 2px offset

### Testing Rules

- **Unit tests (TypeScript):** Co-located `*.test.ts` next to source file
- **Component tests:** Co-located `*.test.tsx`, use React Testing Library
- **Unit tests (Rust):** Inline `#[cfg(test)] mod tests { ... }` in source files
- **Integration tests (Rust):** `src-tauri/tests/integration/` directory
- **E2E tests:** `tests/e2e/` using Playwright with `tauri-driver`
- Test naming: describe block = component/store name; test names = "should {expected behavior}"
- Mock Tauri APIs: `vi.mock('@tauri-apps/api/core')` with typed mock implementations

### Code Quality & Style Rules

**Naming Conventions (MANDATORY across all languages):**

| Language | Convention | Example |
|----------|-----------|---------|
| Rust | `snake_case` | `llm_router.rs`, `fn fast_refine()` |
| TypeScript | `camelCase` (vars/fns), `PascalCase` (components/types) | `usePromptStore`, `<PromptDissector>`, `RefineResult` |
| Python | `snake_case` | `detect_domain.py` |
| SQLite | `snake_case` | `prompt_history`, `skill_tree_nodes` |
| CSS | `kebab-case` | `.dissector-role` |

**File Organization:**
- Frontend: Type-first — `src/components/{type}/`, `src/stores/`, `src/hooks/`, `src/lib/`
- Rust: Domain-first — `src-tauri/src/commands/`, `src-tauri/src/llm/`, `src-tauri/src/pipeline/`
- No ad-hoc top-level files in `src/` or `src-tauri/src/`
- Config files at project root: `tailwind.config.js`, `vite.config.ts`, `tsconfig.json`

**Documentation:**
- `README.md`: Project overview, quick start, architecture links
- `CONTRIBUTING.md`: Build prerequisites (CMake, C++ compiler for llama-cpp-rs), dev workflow, PR checklist
- `docs/IPC.md`: Tauri IPC documentation for contributors (Commands, Events, AppError codes)
- JSDoc on exported functions/types in TypeScript; `///` doc comments on public items in Rust

### Development Workflow Rules

- Dev command: `pnpm tauri dev` (starts Vite + Rust compilation + Tauri window)
- Build command: `pnpm tauri build` (Vite build → cargo build --release → platform bundling)
- Pre-commit: `pnpm lint && cargo clippy && cargo test` (configure via husky/lefthook)
- CI on every PR: Lint → Test (Vitest + cargo test) → Build matrix (Windows, macOS, Linux)
- Commit messages: conventional commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`)
- Branch naming: `feature/`, `fix/`, `refactor/` prefixes

### Critical Don't-Miss Rules

**Anti-Patterns — NEVER do these:**
- ❌ Panic or unwrap in Rust Tauri commands — always return `Result<T, AppError>`
- ❌ Direct state mutation in Zustand — always use `set()` or `getState().setX()`
- ❌ Import one Zustand store from another — coordinate in components, not stores
- ❌ Log API keys — they live in stronghold, never in logs, Zustand, or console
- ❌ Return plain strings from Rust commands — use typed `Result<T, AppError>`
- ❌ Hardcode URLs or magic strings — use `src/lib/constants.ts` or Rust config

**Edge Cases to Handle:**
- LLM model still downloading → return `AppError::LlmNotReady` with progress percentage
- Python sidecar unavailable → fall back to Rust keyword matching silently
- Cloud API rate limited → exponential backoff, show `AppError::ApiRateLimited`
- Internet disconnected → gray out Master Mode/Adapter Preview, show offline indicator
- First launch (no model) → show DemoPromptBanner, async download with ProgressIndicator

**Security Rules:**
- API keys: stored via stronghold only, retrieved per-request, never cached in Zustand
- Fast Refine: prompt text never leaves local machine (local LLM only)
- Master Mode: prompt text transmitted to cloud provider only on explicit user action
- No telemetry without explicit opt-in (checkbox in settings, off by default)
- HTTPS/TLS 1.3 for all cloud API communication

**Performance Gotchas:**
- Loading indicators only appear if operation >200ms (prevents flicker for sub-200ms Fast Refine)
- Memoize Dissector output — re-parses only on input change, not every render
- Vite code splitting by view — lazy load SkillTree and AdapterPreview panels
- Zustand selectors are granular: `usePromptStore(s => s.input)` not `usePromptStore()`
- Framer Motion `layoutId` for shared element transitions — avoid full re-renders on view switch
- Python sidecar started once at app launch, kept alive — don't spawn per-request


---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: 2026-06-27
