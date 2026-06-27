# Story 1.2: Local LLM Integration & Async Model Download

**Status:** ready-for-dev
**Epic:** 1 — Zero-Onboarding & Instant Prompt Refinement
**Story ID:** 1.2
**Created:** 2026-06-27
**Assigned to:** Dev Agent

---

## 🔥 CRITICAL MISSION — ULTIMATE DEV CONTEXT

This story file is the **exhaustive implementation guide** for the LLM developer agent. It contains everything needed to implement Story 1.2 flawlessly — no guessing, no re-inventing, no mistakes. Read every section carefully before writing a single line of code.

**This story builds on Story 1.1 (COMPLETED — `done`):** The project is already scaffolded with Tauri v2 + React 18 + TypeScript + Vite, Tailwind CSS v4 with design tokens, all 5 Zustand stores initialized, Framer Motion configured, Welcome Screen rendered.

**What this story delivers:** The Rust backend comes alive. `llama-cpp-2` is integrated for local LLM inference. The Llama 3.2 1B model downloads asynchronously on first launch with a polished progress UI. The `model_ready` event bridges Rust to the frontend, unlocking the Fast Refine button. All future stories depend on this one — it's the **first backend story** and the **critical path blocker** for Epic 1.

## Story

As a {{role}},
I want {{action}},
so that {{benefit}}.

## Acceptance Criteria

1. [Add acceptance criteria from epics/PRD]

## Tasks / Subtasks

- [ ] Task 1 (AC: #)
  - [ ] Subtask 1.1
- [ ] Task 2 (AC: #)
  - [ ] Subtask 2.1

## Dev Notes

- Relevant architecture patterns and constraints
- Source tree components to touch
- Testing standards summary

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
- Detected conflicts or variances (with rationale)

### References

- Cite all technical details with source paths and sections, e.g. [Source: docs/<file>.md#Section]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

---

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
- [ ] 1.1 Create `src-tauri/src/llm/` module structure:
  - Create `src-tauri/src/llm/mod.rs` — Module declaration, re-exports
  - Create `src-tauri/src/llm/local.rs` — llama-cpp-2 wrapper, model lifecycle (download, load, unload)
  - Create `src-tauri/src/llm/router.rs` — LLM Router (this story: local mode only; cloud routing in Epic 2)
- [ ] 1.2 Register `llm` module in `src-tauri/src/lib.rs` or `main.rs`
- [ ] 1.3 Integrate `llama-cpp-2` crate in `src-tauri/Cargo.toml` with version "0.1"
- [ ] 1.4 Ensure CMake and C++ build tools are documented as prerequisites
- [ ] 1.5 Verify `cargo build` succeeds with the new dependency

### Red Task 2: Async Model Download with Progress Events (AC: 1, 2, 3, 4)
- [ ] 2.1 In `src-tauri/src/llm/local.rs`, implement model download logic:
  - Define model constants: MODEL_URL (Llama 3.2 1B GGUF URL), MODEL_FILENAME, EXPECTED_CHECKSUM
  - Determine model path: resolve `{app_data_dir}/models/` via `tauri::api::path::app_data_dir()`
  - Implement `download_model()` as async function using `reqwest` with streaming download
  - Emit `llm_progress` Tauri event every N bytes downloaded with `{ downloadedBytes, totalBytes }`
  - On completion: emit `model_ready` event
  - On failure: emit `model_error` event with error message string
- [ ] 2.2 Implement model caching check:
  - On app start: check if model file exists at `{app_data_dir}/models/{MODEL_FILENAME}`
  - If exists: skip download, emit `model_ready` immediately
  - If not exists: start async download
- [ ] 2.3 Implement download resumption via HTTP Range headers (optional but recommended)
- [ ] 2.4 Handle retry logic:
  - On failure: emit `model_error` event
  - Frontend retry button triggers `retry_model_download` Tauri command
  - Retry re-checks cache, resumes or restarts download

### Red Task 3: Tauri Commands and Events Setup (AC: 5)
- [ ] 3.1 Create `src-tauri/src/commands/` module structure:
  - Create `src-tauri/src/commands/mod.rs`
  - Create `src-tauri/src/commands/refine.rs` — starter file with `get_model_status` command
- [ ] 3.2 Register `commands` module in `lib.rs` and register Tauri commands:
  - `get_model_status` command: returns current model state (status, progress, error)
- [ ] 3.3 Register Tauri events: `llm_progress`, `model_ready`, `model_error`
- [ ] 3.4 Create `src-tauri/src/state.rs` for Tauri managed state:
  - `AppState` struct holding `LlmState` (model path, status, download handle)
- [ ] 3.5 Register state in `lib.rs` via `tauri::Builder::default().manage()`

### Red Task 4: AppError Enum and Error Handling (AC: 5)
- [ ] 4.1 Create `src-tauri/src/error.rs` with AppError enum:
  - Variants: `LlmNotReady`, `LlmInferenceFailed`, `DownloadFailed`, `InternalError`
  - Implement `Serialize` and conversion into `tauri::InvokeError`
  - User-safe error messages for each variant
  - Error codes: "LLM_NOT_READY", "LLM_INFERENCE_FAILED", "INTERNAL_ERROR"
- [ ] 4.2 Register `mod error` in `src-tauri/src/lib.rs`

### Orange Task 5: ProgressIndicator Component (AC: 1, 2, 4)
- [ ] 5.1 Create `src/components/progress/ProgressIndicator.tsx`:
  - Props: `value: number` (0-100), `status: 'idle' | 'downloading' | 'ready' | 'error'`, `error?: string`, `onRetry?: () => void`
  - Rendering states: idle (hidden), downloading (linear bar with percentage and bytes), ready (green bar with "Your AI is ready", fades after 2s via Framer Motion), error (red bar with retry button)
  - ARIA: `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
  - Styling: Full-width bar at top, CSS custom properties from design tokens
  - Framer Motion: spring physics for width changes
  - Downloading tips area: rotates through informative facts every 8 seconds
- [ ] 5.2 Create `src/components/progress/ProgressIndicator.test.tsx`:
  - Test rendering in downloading, ready, error states
  - Test ARIA attributes present
  - Test retry button fires callback
- [ ] 5.3 Connect ProgressIndicator to `useModelStore`:
  - Read `status`, `downloadedBytes`, `totalBytes`, `error` from store
  - Wire retry button to invoke `retry_model_download` command

### Orange Task 6: Model Download Lifecycle in App.tsx (AC: 2, 4)
- [ ] 6.1 Create `src/hooks/useModelDownload.ts` with Tauri event listeners:
  - `listen('llm_progress', ...)`: update `useModelStore.setProgress(downloadedBytes, totalBytes)`
  - `listen('model_ready', ...)`: update `useModelStore.setStatus('ready')`
  - `listen('model_error', ...)`: update `useModelStore.setStatus('error')` and `useModelStore.setError(message)`
- [ ] 6.2 On app startup, call `get_model_status` to restore state
- [ ] 6.3 Ensure cleanup on unmount: return `unlisten()` from useEffect
- [ ] 6.4 Render ProgressIndicator in App.tsx based on model status

### Orange Task 7: Disabled CTA State and Demo Prompt (AC: 1, 2)
- [ ] 7.1 In `FastRefineView.tsx`, wire CTA button to `useModelStore.status`:
  - When status is `idle` or `downloading`: button disabled, text "Preparing AI..."
  - When status is `error`: button disabled, text "Download failed"
  - When status is `ready`: button enabled, gradient active, text "Discover Your Prompt"
- [ ] 7.2 Verify DemoPromptBanner remains fully interactive during all download states (FR3)
