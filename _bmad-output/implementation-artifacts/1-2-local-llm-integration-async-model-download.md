# Story 1.2: Local LLM Integration & Async Model Download

**Status:** review
**Epic:** 1 — Zero-Onboarding & Instant Prompt Refinement
**Story ID:** 1.2
**Created:** 2026-06-27
**Assigned to:** Dev Agent

---

## 🔥 CRITICAL MISSION — ULTIMATE DEV CONTEXT

This story file is the **exhaustive implementation guide** for the LLM developer agent. It contains everything needed to implement Story 1.2 flawlessly — no guessing, no re-inventing, no mistakes. Read every section carefully before writing a single line of code.

**This story builds on Story 1.1 (COMPLETED — `done`):** The project is already scaffolded with Tauri v2 + React 18 + TypeScript + Vite, Tailwind CSS v4 with design tokens, all 5 Zustand stores initialized, Framer Motion configured, Welcome Screen rendered.

**What this story delivers:** The Rust backend comes alive. `llama-cpp-2` is integrated for local LLM inference. The Llama 3.2 1B model downloads asynchronously on first launch with a polished progress UI. The `model_ready` event bridges Rust to the frontend, unlocking the Fast Refine button. All future stories depend on this one — it's the **first backend story** and the **critical path blocker** for Epic 1.


## 🎯 Story

As a **first-time user**,
I want the local AI model to download automatically in the background with a visible progress indicator,
So that the app works fully offline afterward without me needing to understand models, downloads, or configuration.

---

## ✅ Acceptance Criteria

### AC1 — Async Model Download Starts on First Launch (FR2, NFR-P7)
**Given** the application is launched for the first time
**When** the welcome screen is displayed
**Then** the local LLM model (Llama 3.2 1B Q4_K_M, less than 1.5 GB) begins downloading asynchronously to `{app_data_dir}/models/`
**And** a linear progress indicator is displayed at the top of the window showing download percentage and bytes
**And** the progress indicator uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes
**And** the demo prompt banner remains visible and interactive during the download (FR3)
**And** the "Discover Your Prompt" button is shown in a disabled state with text "Preparing AI..." while the model downloads
**And** informative facts or tips rotate in a subtle text area near the progress bar during download

### AC2 — Download Completion and Frontend Handoff (FR5)
**Given** the model download completes successfully
**When** the Rust backend finishes downloading
**Then** the progress bar turns green, displays "Your AI is ready", and fades out after 2 seconds
**And** a `model_ready` event is emitted from the Rust backend to the frontend
**And** the "Discover Your Prompt" button becomes active and clickable
**And** after model is ready, Fast Refine and Prompt Dissector operate fully offline

### AC3 — Subsequent Launch Caching
**Given** the model was previously downloaded
**When** the app launches
**Then** the model loads from the cached filesystem path (`{app_data_dir}/models/`) without re-downloading
**And** the model status transitions to "ready" immediately (or during background loading)
**And** the progress bar does not appear (model is loaded silently)

### AC4 — Download Failure and Retry
**Given** the model download fails (network error, server unavailable)
**When** the failure occurs
**Then** the progress bar turns red and displays a retry button with the error message
**And** the "Discover Your Prompt" button remains disabled with text "Download failed - Retry"
**And** clicking the retry button restarts the download from where it left off (resumable)

### AC5 — Backend Integration (llama-cpp-2)
**Given** the Rust backend is initialized
**When** the app starts
**Then** `llama-cpp-2` (latest v0.1.x) is integrated in the Rust backend for local inference
**And** the LLM Router in `src-tauri/src/llm/router.rs` is structured to route `fast_refine` to the local inference engine
**And** the model download logic lives in `src-tauri/src/llm/local.rs`
**And** a `start_model_download` Tauri command is available (or auto-triggered on app start)
**And** the `llm_progress` event emits `{ downloadedBytes: number, totalBytes: number }` during download
**And** the `model_ready` event emits `{}` on completion
**And** a `model_error` event emits `{ error: string }` on failure
**And** all Tauri commands return `Result<T, AppError>` with structured error codes (`LLM_NOT_READY`, `LLM_INFERENCE_FAILED`)

---

## Tasks / Subtasks

### Red Task 1: Rust Backend Foundation — LLM Module Structure (AC: 5)
- [x] 1.1 Create `src-tauri/src/llm/` module structure:
  - Create `src-tauri/src/llm/mod.rs` — Module declaration, re-exports
  - Create `src-tauri/src/llm/local.rs` — llama-cpp-2 wrapper, model lifecycle (download, load, unload)
  - Create `src-tauri/src/llm/router.rs` — LLM Router (this story: local mode only; cloud routing in Epic 2)
- [x] 1.2 Register `llm` module in `src-tauri/src/lib.rs` or `main.rs`
- [x] 1.3 Integrate `llama-cpp-2` crate in `src-tauri/Cargo.toml` with version "0.1"
- [x] 1.4 Ensure CMake and C++ build tools are documented as prerequisites
- [x] 1.5 Verify `cargo build` succeeds with the new dependency

### Red Task 2: Async Model Download with Progress Events (AC: 1, 2, 3, 4)
- [x] 2.1 In `src-tauri/src/llm/local.rs`, implement model download logic:
  - Define model constants: MODEL_URL (Llama 3.2 1B GGUF URL), MODEL_FILENAME, EXPECTED_CHECKSUM
  - Determine model path: resolve `{app_data_dir}/models/` via `tauri::api::path::app_data_dir()`
  - Implement `download_model()` as async function using `reqwest` with streaming download
  - Emit `llm_progress` Tauri event every N bytes downloaded with `{ downloadedBytes, totalBytes }`
  - On completion: emit `model_ready` event
  - On failure: emit `model_error` event with error message string
- [x] 2.2 Implement model caching check:
  - On app start: check if model file exists at `{app_data_dir}/models/{MODEL_FILENAME}`
  - If exists: skip download, emit `model_ready` immediately
  - If not exists: start async download
- [x] 2.3 Implement download resumption via HTTP Range headers (optional but recommended)
- [x] 2.4 Handle retry logic:
  - On failure: emit `model_error` event
  - Frontend retry button triggers `retry_model_download` Tauri command
  - Retry re-checks cache, resumes or restarts download

### Red Task 3: Tauri Commands and Events Setup (AC: 5)
- [x] 3.1 Create `src-tauri/src/commands/` module structure:
  - Create `src-tauri/src/commands/mod.rs`
  - Create `src-tauri/src/commands/refine.rs` — starter file with `get_model_status` command
- [x] 3.2 Register `commands` module in `lib.rs` and register Tauri commands:
  - `get_model_status` command: returns current model state (status, progress, error)
- [x] 3.3 Register Tauri events: `llm_progress`, `model_ready`, `model_error`
- [x] 3.4 Create `src-tauri/src/state.rs` for Tauri managed state:
  - `AppState` struct holding `LlmState` (model path, status, download handle)
- [x] 3.5 Register state in `lib.rs` via `tauri::Builder::default().manage()`

### Red Task 4: AppError Enum and Error Handling (AC: 5)
- [x] 4.1 Create `src-tauri/src/error.rs` with AppError enum:
  - Variants: `LlmNotReady`, `LlmInferenceFailed`, `DownloadFailed`, `InternalError`
  - Implement `Serialize` and conversion into `tauri::InvokeError`
  - User-safe error messages for each variant
  - Error codes: "LLM_NOT_READY", "LLM_INFERENCE_FAILED", "INTERNAL_ERROR"
- [x] 4.2 Register `mod error` in `src-tauri/src/lib.rs`

### Orange Task 5: ProgressIndicator Component (AC: 1, 2, 4)
- [x] 5.1 Create `src/components/progress/ProgressIndicator.tsx`:
  - Props: `value: number` (0-100), `status: 'idle' | 'downloading' | 'ready' | 'error'`, `error?: string`, `onRetry?: () => void`
  - Rendering states: idle (hidden), downloading (linear bar with percentage and bytes), ready (green bar with "Your AI is ready", fades after 2s via Framer Motion), error (red bar with retry button)
  - ARIA: `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
  - Styling: Full-width bar at top, CSS custom properties from design tokens
  - Framer Motion: spring physics for width changes
  - Downloading tips area: rotates through informative facts every 8 seconds
- [x] 5.2 Create `src/components/progress/ProgressIndicator.test.tsx`:
  - Test rendering in downloading, ready, error states
  - Test ARIA attributes present
  - Test retry button fires callback
- [x] 5.3 Connect ProgressIndicator to `useModelStore`:
  - Read `status`, `downloadedBytes`, `totalBytes`, `error` from store
  - Wire retry button to invoke `retry_model_download` command

### Orange Task 6: Model Download Lifecycle in App.tsx (AC: 2, 4)
- [x] 6.1 Create `src/hooks/useModelDownload.ts` with Tauri event listeners:
  - `listen('llm_progress', ...)`: update `useModelStore.setProgress(downloadedBytes, totalBytes)`
  - `listen('model_ready', ...)`: update `useModelStore.setStatus('ready')`
  - `listen('model_error', ...)`: update `useModelStore.setStatus('error')` and `useModelStore.setError(message)`
- [x] 6.2 On app startup, call `get_model_status` to restore state
- [x] 6.3 Ensure cleanup on unmount: return `unlisten()` from useEffect
- [x] 6.4 Render ProgressIndicator in App.tsx based on model status

### Orange Task 7: Disabled CTA State and Demo Prompt (AC: 1, 2)
- [x] 7.1 In `FastRefineView.tsx`, wire CTA button to `useModelStore.status`:
  - When status is `idle` or `downloading`: button disabled, text "Preparing AI..."
  - When status is `error`: button disabled, text "Download failed"
  - When status is `ready`: button enabled, gradient active, text "Discover Your Prompt"
- [x] 7.2 Verify DemoPromptBanner remains fully interactive during all download states (FR3)

---

## Dev Notes

### Architecture Guardrails

#### Naming Conventions

| Layer | Convention | Example |
|-------|-----------|---------|
| Rust modules/types | snake_case | local.rs, llm_router, AppError |
| Rust structs/enums | PascalCase | LlmState, ModelStatus |
| Tauri commands | snake_case | get_model_status, retry_model_download |
| Tauri events | snake_case, entity_event pattern | llm_progress, model_ready, model_error |
| React components | PascalCase | ProgressIndicator |
| Zustand stores | use prefix + Store suffix | useModelStore.ts |

#### Tauri IPC Patterns

- Commands return Result<T, AppError> — never panic or return raw strings
- Events use entity_event pattern — llm_progress, model_ready, model_error
- Event payloads are flat objects with snake_case keys
- Frontend listeners set up in useEffect with cleanup via unlisten()

#### Model Download Architecture

- Model stored at: {app_data_dir}/models/ (resolved via tauri::api::path::app_data_dir())
- Model file: llama-3.2-1b-instruct-q4_k_m.gguf (name TBD from Hugging Face)
- Async download via reqwest::Client::get().send() with .bytes_stream()
- Progress emitted from Rust via app_handle.emit("llm_progress", payload)
- Download state persisted in useModelStore (already created in Story 1.1)

#### Cross-Store Coordination

- useModelStore is the sole source of truth for download/model state
- FastRefineView reads useModelStore.status to enable/disable CTA button
- ProgressIndicator reads useModelStore for display state
- App.tsx orchestrates event listeners and dispatches to useModelStore
- No store imports another store — coordination in components/hooks only

### Files to CREATE (This Story)

```
src-tauri/src/
├── error.rs                    # AppError enum
├── state.rs                    # Tauri managed state (LlmState, AppState)
├── llm/
│   ├── mod.rs                  # Module declaration
│   ├── local.rs                # Model download + llama-cpp-2 wrapper
│   └── router.rs               # LLM Router (local mode for this story)
└── commands/
    ├── mod.rs                  # Module declaration
    └── refine.rs               # get_model_status command

src/components/progress/
├── ProgressIndicator.tsx       # Download progress bar component
└── ProgressIndicator.test.tsx  # Tests for all states

src/hooks/
└── useModelDownload.ts         # Tauri event listener hook (optional)
```

### Files to MODIFY (This Story)

```
src-tauri/
├── Cargo.toml                  # Add llama-cpp-2, reqwest dependencies
├── src/lib.rs                  # Register llm, commands, error modules; register state, commands, events
├── src/main.rs                 # May need plugin registration
└── capabilities/default.json   # Verify event permissions

src/
├── App.tsx                     # Add model download lifecycle (event listeners, init check)
├── stores/useModelStore.ts     # Already created in Story 1.1 — update if any missing actions
└── components/FastRefineView.tsx # Wire CTA button to model status
```

---

## File List

### Files CREATED:
- src-tauri/src/error.rs
- src-tauri/src/state.rs
- src-tauri/src/llm/mod.rs
- src-tauri/src/llm/local.rs
- src-tauri/src/llm/router.rs
- src-tauri/src/commands/mod.rs
- src-tauri/src/commands/refine.rs
- src/components/progress/ProgressIndicator.tsx
- src/components/progress/ProgressIndicator.test.tsx
- src/hooks/useModelDownload.ts
- src-tauri/icons/icon.png
- src-tauri/icons/icon.ico

### Files MODIFIED:
- src-tauri/Cargo.toml
- src-tauri/src/lib.rs
- src-tauri/tauri.conf.json
- src/App.tsx
- src/components/FastRefineView.tsx
- src/lib/tauri.ts

## Dev Agent Record

### Implementation Plan
- Created Rust backend: error.rs, state.rs, llm/ module, commands/ module
- Implemented async model download with reqwest streaming and progress events
- Created ProgressIndicator component with 4 visual states (idle, downloading, ready, error)
- Created useModelDownload hook for Tauri event listeners
- Updated App.tsx with model lifecycle orchestration
- Updated FastRefineView CTA button to react to model status

### Debug Log
- Fixed tauri.conf.json "title" field (invalid for Tauri v2)
- Created placeholder icons for Windows build
- AppError uses manual Serialize for frontend-compatible JSON format
- Removed conflicting From<AppError> impl (Tauri v2 provides blanket impl for Serialize types)
- Used response.chunk() instead of StreamExt to avoid extra dependency
- Fixed test async state flushing in ProgressIndicator tests with act()

### Completion Notes
Story 1.2 completed successfully. All 7 tasks implemented. 128 frontend tests pass (31 test files). 4 Rust unit tests pass. Rust backend compiles cleanly.

## Architecture Compliance

### Technical Stack (This Story)

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| LLM Inference | llama-cpp-2 | 0.1.x | Rust bindings for llama.cpp, up-to-date with upstream |
| HTTP Client | reqwest | 0.12.x | Streaming responses for async download, Tokio-native |
| Async Runtime | Tokio | 1.x | Provided by Tauri, used for async download tasks |
| Serialization | serde + serde_json | 1.x | Tauri IPC serialization, event payloads |
| State Management | Zustand (useModelStore) | v5 | Already created in Story 1.1, download progress state |
| UI | ProgressIndicator | Custom | ARIA-compliant, Framer Motion animations |

### IPC Architecture

Commands:
- get_model_status: returns { status: string, progress: number, error: string | null }
- retry_model_download: returns { success: boolean }

Events:
- llm_progress: { downloadedBytes: number, totalBytes: number } — Rust to Frontend
- model_ready: {} — Rust to Frontend
- model_error: { error: string } — Rust to Frontend

---

## Library and Framework Requirements

### llama-cpp-2 Integration

- Crate: llama-cpp-2, version 0.1.x (latest stable 0.1.150)
- Source: crates.io/crates/llama-cpp-2
- Docs: docs.rs/llama-cpp-2/0.1.150
- Build requirement: CMake >= 3.20, C++ build tools
- Model: Llama 3.2 1B Instruct, GGUF format, Q4_K_M quantization (~1.2 GB)
- Model source: Hugging Face — bartowski/Llama-3.2-1B-Instruct-GGUF or equivalent

### reqwest Integration

- Features needed: stream feature
- Usage: reqwest::Client::get(url).send().await then response.bytes_stream()
- Download approach: Stream chunks, write to file, emit progress events

### Cargo.toml Dependencies to Add

```
llama-cpp-2 = "0.1"
reqwest = { version = "0.12", features = ["stream"] }
```

---

## Testing Requirements

### Minimum Test Cases

Rust Unit Tests (inline in source files):
- error.rs: Test AppError serialization to JSON with correct code/message
- state.rs: Test LlmState default initialization
- commands/refine.rs: Test get_model_status response structure

Component Tests:
- ProgressIndicator.test.tsx: Test rendering in downloading, ready, error states
- ProgressIndicator.test.tsx: Test ARIA attributes (role=progressbar, aria-valuenow etc.)
- ProgressIndicator.test.tsx: Test retry button fires onRetry callback

### Test Commands

```
cargo test                    # Run ALL Rust tests
pnpm test                     # Run TypeScript tests (vitest run)
```

---

## Previous Story Intelligence

### Story 1.1 — Project Foundation and Welcome Screen (COMPLETED)

Key existing state:
1. Project scaffolded with create-tauri-app — React 18 + TypeScript + Vite + Tauri v2
2. Tailwind CSS v4 with all design tokens defined in globals.css
3. 5 Zustand stores created: useAppStore, usePromptStore, useModelStore, useSkillTreeStore, useSettingsStore
4. useModelStore already has: status, downloadedBytes, totalBytes, error, setProgress, setStatus, setError, reset
5. Framer Motion configured with AnimatePresence in App.tsx
6. App.tsx already has Tauri event listener scaffolding for llm_progress, model_ready, model_error
7. FastRefineView.tsx already has disabled CTA button with "Preparing AI..." text
8. src/lib/tauri.ts already has typed wrapper: getModelStatus()
9. src/lib/types.ts already has AppError interface with LLM_NOT_READY, LLM_INFERENCE_FAILED codes
10. No Rust backend commands exist yet — this story creates the first ones

---

## Git Intelligence Summary

Recent commits:
- 365f8a3: "feat: implement Phase 1-1 project foundation and welcome screen" — Created all 5 Zustand stores, welcome UI, event listeners, FastRefineView with disabled CTA (47 files, 6246 lines)
- e1e1ebf: "chore: initial commit - BMAD planning artifacts" — Planning artifacts

---

## Story Completion Status

### Definition of Done

- [x] All Rust backend files created: llm/, commands/, error.rs, state.rs
- [x] llama-cpp-2 and reqwest dependencies added to Cargo.toml, cargo build succeeds
- [x] Model download logic in local.rs working: async download, progress events, caching, retry
- [x] ProgressIndicator.tsx renders correctly in all 4 states (idle, downloading, ready, error)
- [x] ProgressIndicator uses Framer Motion for smooth animations
- [x] ProgressIndicator has role="progressbar" with proper ARIA attributes
- [x] CTA button in FastRefineView reacts to model status (disabled/enabled, text changes)
- [x] Demo prompt remains interactive during download (FR3)
- [x] model_ready event transitions store to "ready" status, button becomes active
- [x] Model loads from cache on subsequent launches without re-downloading
- [x] Download failure shows red bar with retry button, retry works
- [x] All event listeners set up in App.tsx with proper cleanup
- [x] All Tauri commands return Result<T, AppError>
- [x] Minimum 11 tests passing (3 Rust + 3 component + 3 store + 2 integration)
- [x] cargo test and pnpm test both pass
- [x] No raw hex colors — all CSS references design tokens
- [x] File structure matches architecture document

## Change Log

- 2026-06-27: Implemented Story 1.2 - LLM module structure, async model download with progress events, ProgressIndicator component, Tauri commands/events, error handling

### Out of Scope (Future Stories)

- Fast Refine inference, LLM Router routing — Story 1.3
- Connectivity detection — Story 1.4
- Prompt Dissector — Story 1.5
- Before/After Diff — Story 1.6
- All Epics 2-7 features
- Cloud API integration — this story is local-only

### Post-Completion Validation

```
cargo build
cargo test
pnpm lint
pnpm test
pnpm tauri dev
```
