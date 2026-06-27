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
