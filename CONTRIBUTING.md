---
title: Contributing to Prompt Engineer
description: Build prerequisites, development workflow, and pull request checklist for Prompt Engineer contributors.
author: Marvin
date: 2026-06-27
---

# Contributing to Prompt Engineer

Thanks for your interest in contributing. Prompt Engineer is an open-source portfolio project — every contribution, from a typo fix to a new LLM adapter, helps move the mission forward.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [First-Time Contributors](#first-time-contributors)
- [Build Prerequisites](#build-prerequisites)
- [Development Workflow](#development-workflow)
- [Project Conventions](#project-conventions)
- [Testing](#testing)
- [Pull Request Checklist](#pull-request-checklist)
- [Finding Issues](#finding-issues)
- [Architecture & IPC Reference](#architecture--ipc-reference)

---

## Code of Conduct

Be respectful, constructive, and patient. This is a learning project — questions are welcome.

---

## First-Time Contributors

Look for issues labeled **`good first issue`** — these are scoped, well-defined, and don't require deep architecture knowledge.

1. Fork the repository
2. Clone your fork
3. Follow the [Build Prerequisites](#build-prerequisites) below
4. Pick a `good first issue` and comment that you're working on it
5. Open a pull request

---

## Build Prerequisites

The following tools are required to build Prompt Engineer locally:

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 20+ | [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) recommended |
| **pnpm** | 9+ | `npm install -g pnpm` |
| **Rust** | 1.77+ | Install via [rustup](https://rustup.rs). Required Tauri targets are configured automatically. |
| **C++ Compiler** | — | Required for `llama-cpp-rs` (builds llama.cpp from source). **Windows:** Visual Studio Build Tools with "Desktop Development with C++" workload. **macOS:** Xcode Command Line Tools (`xcode-select --install`). **Linux:** `build-essential` |
| **CMake** | 3.20+ | Required for `llama-cpp-rs` build |
| **Python** | 3.11+ | Only required for the NLP sidecar (domain detection). Not needed for core frontend or Rust backend work. |

### Verify Your Setup

```bash
node --version    # 20+
pnpm --version    # 9+
rustc --version   # 1.77+
cmake --version   # 3.20+
python --version  # 3.11+ (optional)
```

---

## Development Workflow

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/prompt-engineer.git
cd prompt-engineer

# Install dependencies
pnpm install

# Start full Tauri dev environment
pnpm tauri dev
```

### Available Commands

| Command | What it does |
|---------|-------------|
| `pnpm tauri dev` | Full dev environment: Vite HMR + Rust compilation + Tauri desktop window |
| `pnpm dev` | Vite dev server only (no Rust/Tauri — useful for UI-only work) |
| `pnpm tauri build` | Production build across all platforms |
| `pnpm test` | Run all frontend tests (Vitest) |
| `pnpm test:watch` | Frontend tests in watch mode |
| `pnpm lint` | Lint all TypeScript/TSX (ESLint, zero warnings required) |
| `pnpm format` | Auto-format with Prettier |
| `cargo test` | Run all Rust tests (from `src-tauri/`) |
| `cargo clippy` | Rust linter (from `src-tauri/`, zero warnings required) |

### Branch Naming

Use the following prefixes for branch names:

| Prefix | Purpose |
|--------|---------|
| `feature/` | New functionality |
| `fix/` | Bug fixes |
| `refactor/` | Code restructuring without behavior change |
| `test/` | Adding or improving tests |
| `docs/` | Documentation changes |
| `chore/` | Tooling, CI, dependencies |

**Example:** `feature/add-gemini-adapter`, `fix/offline-mode-crash`

### Before You Push

Run the full pre-commit check suite:

```bash
# Frontend
pnpm lint
pnpm test

# Rust backend
cd src-tauri
cargo clippy
cargo test
```

All four must pass with zero warnings and zero test failures.

---

## Project Conventions

### Technology Stack

| Layer | Technology |
|-------|-----------|
| Desktop Runtime | Tauri v2 (Rust + WebView) |
| Frontend | React 18, TypeScript 5.x (strict), Vite |
| Styling | Tailwind CSS v4, Framer Motion |
| State Management | Zustand v5 (5 stores, no cross-store imports) |
| Database | SQLite via `tauri-plugin-sql` |
| Testing | Vitest + React Testing Library (frontend), `cargo test` (Rust) |

### Naming Conventions (Mandatory)

| Language | Convention | Example |
|----------|-----------|---------|
| Rust | `snake_case` | `fn fast_refine()`, `llm_router.rs` |
| TypeScript variables/functions | `camelCase` | `usePromptStore`, `handleRefine` |
| TypeScript components/types | `PascalCase` | `FastRefineView`, `RefineResult` |
| Python | `snake_case` | `detect_domain.py` |
| CSS classes | `kebab-case` | `.dissector-role` |
| Tauri commands/events | `snake_case` | `fast_refine`, `model_ready` |
| Git commits | Conventional Commits | `feat: add diff viewer` |

### File Organization

- **Frontend:** Type-first — `src/components/{type}/`, `src/stores/`, `src/hooks/`, `src/lib/`
- **Rust:** Domain-first — `src-tauri/src/commands/`, `src-tauri/src/llm/`, `src-tauri/src/pipeline/`
- No ad-hoc top-level files in `src/` or `src-tauri/src/`

### Zustand Store Pattern

Every store follows this exact structure:

```typescript
interface XState { /* state fields */ }
interface XActions { /* action signatures */ }

export const useXStore = create<XState & XActions>((set, get) => ({
  // state
  someField: initialValue,

  // actions
  setSomeField: (value) => set({ someField: value }),

  // async actions
  fetchSomething: async () => {
    set({ isLoading: true });
    try {
      const result = await invoke<Something>('command_name', { args });
      set({ isLoading: false, result });
    } catch (error) {
      set({ isLoading: false });
      // handle AppError
    }
  },
}));
```

**Never import one Zustand store from another.** Cross-store coordination happens in React components or custom hooks.

### Tauri IPC

All calls to the Rust backend go through `invoke()` wrapped in `try/catch`:

```typescript
import { invoke } from '@tauri-apps/api/core';

try {
  const result = await invoke<RefineResult>('fast_refine', { input });
  // handle success
} catch (error) {
  // parse error.code for specific handling
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add prompt diff viewer
fix: resolve crash when sidecar unavailable
refactor: extract adapter formatting to separate module
test: add edge case for empty input in fast refine
docs: update architecture diagram
chore: upgrade tauri to v2.1
```

Keep the first line under 72 characters. Add a blank line and details for complex changes.

---

## Testing

### Writing Tests

**Frontend (Vitest + React Testing Library):**

- Unit tests: Co-located `*.test.ts` next to source file
- Component tests: Co-located `*.test.tsx`
- Test naming: `describe("ComponentName")`, `it("should {expected behavior}")`

```typescript
// src/stores/usePromptStore.test.ts
import { describe, it, expect } from 'vitest';

describe('usePromptStore', () => {
  it('should update input text', () => {
    const { setInput, getState } = usePromptStore;
    setInput('hello');
    expect(getState().input).toBe('hello');
  });
});
```

**Mocking Tauri APIs:**

```typescript
import { vi } from 'vitest';

vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn().mockResolvedValue({ /* mock result */ }),
}));
```

**Rust (cargo test):**

- Unit tests inline in source: `#[cfg(test)] mod tests { ... }`
- Integration tests: `src-tauri/tests/integration/`

All Tauri commands must return `Result<T, AppError>` — never panic or unwrap.

### Running Tests

```bash
pnpm test                    # Frontend (all)
pnpm test -- path/to/file    # Frontend (specific file)
cd src-tauri && cargo test   # Rust (all)
```

---

## Pull Request Checklist

Before opening a pull request, verify the following:

- [ ] Branch is named correctly (`feature/`, `fix/`, etc.)
- [ ] Code follows naming conventions (Rust: `snake_case`, TS vars: `camelCase`, TS components: `PascalCase`)
- [ ] No `unwrap()` or `panic!` in Rust Tauri commands (use `Result<T, AppError>`)
- [ ] No Zustand store imports another store (coordinate in components)
- [ ] `pnpm lint` passes with zero warnings
- [ ] `pnpm test` passes all tests
- [ ] `cargo clippy` passes with zero warnings
- [ ] `cargo test` passes all tests
- [ ] New code has corresponding tests
- [ ] Tauri `invoke()` calls are typed and wrapped in `try/catch`
- [ ] No API keys, secrets, or credentials in code or logs
- [ ] PR description explains what changed and why

---

## Finding Issues

Browse [open issues](https://github.com/777marvin/prompt-engineer/issues) on GitHub. Look for these labels:

| Label | Meaning |
|-------|---------|
| `good first issue` | Scoped and beginner-friendly |
| `bug` | Something isn't working |
| `enhancement` | New feature or improvement |
| `documentation` | Docs need updating |
| `adapter` | LLM adapter work (new provider or format) |

---

## Architecture & IPC Reference

For a complete overview of the system architecture, see:

- **Architecture Decision Document:** [`_bmad-output/planning-artifacts/architecture.md`](_bmad-output/planning-artifacts/architecture.md)
- **IPC Documentation:** `docs/IPC.md` (Tauri commands, events, and AppError codes)
- **Project Context (for AI agents):** [`_bmad-output/project-context.md`](_bmad-output/project-context.md)
- **Product Requirements:** [`_bmad-output/planning-artifacts/prd.md`](_bmad-output/planning-artifacts/prd.md)

### Key Architecture Facts

- **State-based view routing** — no React Router. `useAppStore.currentView` controls the active view.
- **LLM Router** is the central architectural spine — routes every user action to local llama.cpp or cloud API.
- **Adapter system** is plugin-friendly — community adapters follow a defined interface (Epic 4).
- **Python sidecar** is optional — Rust keyword fallback ensures core functionality without it.
- **API keys** live in OS keychain (stronghold), never in Zustand or localStorage.

---

## Questions?

Open a [discussion](https://github.com/777marvin/prompt-engineer/discussions) or comment on a relevant issue. The project is in early development — questions help shape the contribution experience.
