---
title: Prompt Engineer
description: A local desktop tool that teaches prompt engineering by doing — refine prompts, understand why they work, and master the language of AI.
author: Marvin
date: 2026-06-27
---

# Prompt Engineer

> **⚠️ Project Status: Early Development** — Prompt Engineer is in active development and not yet ready for production use. See [Current Status & Roadmap](#current-status--roadmap) below for what's built and what's coming.

**Repository:** [github.com/777marvin/prompt-engineer](https://github.com/777marvin/prompt-engineer)

A local desktop application that teaches prompt engineering through guided practice. Built with **Tauri v2**, **React 18**, and **TypeScript** — fully offline-capable with no account required.

## Table of Contents

- [What is Prompt Engineer?](#what-is-prompt-engineer)
- [Current Status & Roadmap](#current-status--roadmap)
- [Tech Stack](#tech-stack)
- [Getting Started (Dev Setup)](#getting-started-dev-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Commands](#development-commands)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## What is Prompt Engineer?

Prompt Engineer closes the gap between knowing AI exists and mastering it. 90% of people use AI like a basic chatbot — unaware of structured prompts, iterative refinement, or LLM-specific adaptation. Prompt Engineer solves this by being both **tool and teacher**:

- **Fast Refine:** Instant prompt improvement via local LLM (<500ms). No internet, no API key.
- **Master Mode:** A 2–5 turn coaching dialog that deepens your intent using cloud LLM APIs.
- **Prompt Dissector:** Color-coded visual deconstruction of prompt anatomy (Role, Task, Format, Context) with adaptive complexity based on user skill.
- **LLM Adapter Preview:** Side-by-side comparison of the same prompt formatted for Claude XML, GPT-4o Markdown, and Gemini Few-Shot.
- **Skill Tree:** Gamified progression through 4 tiers (Discoverer → Knower → Expert → Grandmaster) with quests and streak mechanics.

**Mission:** No one should be left behind in the AI age because they can't prompt. Built as an open-source portfolio project with no financial agenda.

---

## Current Status & Roadmap

The project is in **active development**. The MVP is being built incrementally across 7 epics. Here's where things stand today:

### ✅ Completed

| Epic | Story | Status |
|------|-------|--------|
| **Epic 1 — Core Foundation** | 1.1 Project Foundation & Welcome Screen | ✅ Done |
| | Tauri v2 scaffold, React 18 + Vite + TypeScript, Tailwind CSS v4 with custom design tokens, Framer Motion animations, Zustand state management (5 stores), Vitest + React Testing Library setup, theme toggle, demo prompt banner, chip navigation, state-based view routing | |

### 🚧 In Progress

| Epic | Story | Status |
|------|-------|--------|
| **Epic 1 — Core Foundation** | 1.2 Local LLM Integration & Async Model Download | 🔜 Next |
| | 1.3 Fast Refine Engine | 📋 Backlog |
| | 1.4 Connectivity Detection & Offline Awareness | 📋 Backlog |
| | 1.5 Prompt Dissector — Visual Deconstruction | 📋 Backlog |
| | 1.6 Before/After Diff Viewer | 📋 Backlog |

### 📋 Planned (Backlog)

| Epic | Stories |
|------|---------|
| **Epic 2 — Master Mode** | API key secure storage, coaching dialog (2–5 turns) with cloud LLM APIs |
| **Epic 3 — Application Shell** | Mode switching with context preservation, settings panel, command palette (`Ctrl+Shift+P`) |
| **Epic 4 — LLM Adapters** | Adapter transformation pipeline (GPT, Claude, Gemini formats), three-column preview view |
| **Epic 5 — Gamification** | Skill tree data model + progress tracking, visualization, quest system + streak mechanics |
| **Epic 6 — NLP Domain Detection** | Python sidecar (spaCy + Intent Classifier, stdin/stdout JSON-RPC), Rust keyword fallback |
| **Epic 7 — Distribution** | Auto-update system, community contribution infrastructure (`good first issue` labels) |

The full epic and story breakdown is available in [`_bmad-output/planning-artifacts/epics.md`](_bmad-output/planning-artifacts/epics.md).

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Desktop Runtime** | Tauri v2 (Rust backend + WebView frontend) |
| **Frontend** | React 18, TypeScript 5.x (strict), Vite |
| **Styling** | Tailwind CSS v4, Framer Motion (animations) |
| **State Management** | Zustand v5.x (5 stores) |
| **Local LLM** | llama-cpp-rs (Rust), Llama 3.2 1B Q4_K_M |
| **Python Sidecar** | Python 3.11+, spaCy + Intent Classifier, stdin/stdout JSON-RPC |
| **Database** | SQLite via tauri-plugin-sql |
| **Credential Storage** | OS-native keychain via tauri-plugin-stronghold |
| **Testing** | Vitest + React Testing Library (frontend), cargo test (Rust) |
| **CI/CD** | GitHub Actions (cross-platform matrix) |
| **Distribution** | GitHub Releases, tauri-plugin-updater |

**Target Platforms:** Windows 10+ (Tier 1), macOS 12+ (Tier 1), Ubuntu 22.04+ (Tier 2)

---

## Getting Started (Dev Setup)

### Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | 20+ | Install via [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) |
| **pnpm** | 9+ | `npm install -g pnpm` |
| **Rust** | 1.77+ | Install via [rustup](https://rustup.rs) |
| **C++ Compiler** | — | Required for llama-cpp-rs. Windows: Visual Studio Build Tools with C++ workload. macOS: Xcode CLT. Linux: `build-essential` |
| **CMake** | 3.20+ | Required for llama-cpp-rs build |
| **Python** | 3.11+ | Required for NLP sidecar (domain detection). Not needed for core functionality. |

### Installation

```bash
# Clone the repository
git clone https://github.com/777marvin/prompt-engineer.git
cd prompt-engineer

# Install frontend dependencies
pnpm install

# Start the Tauri dev environment (Vite + Rust + Tauri window)
pnpm tauri dev
```

### Development Commands

| Command | Description |
|---------|-------------|
| `pnpm tauri dev` | Start full dev environment (Vite HMR + Rust compilation + Tauri window) |
| `pnpm tauri build` | Production build (Vite → cargo build --release → platform bundling) |
| `pnpm dev` | Start Vite dev server only (no Tauri/Rust, for UI development) |
| `pnpm test` | Run all frontend tests (Vitest) |
| `pnpm test:watch` | Run frontend tests in watch mode |
| `pnpm lint` | Lint TypeScript/TSX files (ESLint with zero warnings policy) |
| `pnpm format` | Format code with Prettier |
| `cargo test` | Run Rust unit tests (run from `src-tauri/`) |
| `cargo clippy` | Rust linter (run from `src-tauri/`) |

**Pre-commit checks:** Ensure `pnpm lint && cargo clippy && cargo test` pass before pushing.

---

## Project Structure

```
prompt-engineer/
├── src/                          # React frontend (TypeScript)
│   ├── components/
│   │   ├── FastRefineView.tsx     # Fast Refine view component
│   │   └── navigation/           # Welcome screen components
│   │       ├── ChipNavigationBar.tsx
│   │       ├── DemoPromptBanner.tsx
│   │       ├── HeroSection.tsx
│   │       └── ThemeToggle.tsx
│   ├── stores/
│   │   ├── useAppStore.ts        # View routing, theme, app state
│   │   ├── useModelStore.ts      # Model download progress, LLM status
│   │   ├── usePromptStore.ts     # Prompt input, refinement state
│   │   ├── useSettingsStore.ts   # User preferences, API keys (references, not values)
│   │   └── useSkillTreeStore.ts  # Skill tree progress, quests, tiers
│   ├── lib/
│   │   ├── tauri.ts              # Tauri invoke() wrappers
│   │   └── types.ts              # Shared TypeScript types
│   ├── styles/
│   │   └── globals.css           # Tailwind directives + CSS custom properties
│   ├── assets/                   # Static assets (fonts, images)
│   ├── App.tsx                   # Root component with state-based view routing
│   ├── main.tsx                  # React entry point
│   └── test-setup.ts             # Vitest setup (jsdom, testing-library)
│
├── src-tauri/                    # Rust backend (Tauri)
│   ├── src/                      # Rust source
│   │   ├── lib.rs                # Tauri command registration + plugin setup
│   │   └── main.rs               # Tauri app entry point
│   ├── Cargo.toml                # Rust dependencies
│   └── tauri.conf.json           # Tauri configuration (CSP, window, plugins)
│
├── public/                       # Public static assets
├── docs/                         # Additional documentation
├── _bmad/                        # BMAD methodology config + agent definitions
├── _bmad-output/                 # BMAD planning artifacts (PRD, architecture, etc.)
│   ├── planning-artifacts/
│   └── implementation-artifacts/
│
├── vite.config.ts                # Vite + Vitest configuration
├── tsconfig.json                 # TypeScript configuration (strict)
├── tailwind.config.js            # Tailwind CSS design tokens
├── eslint.config.js              # ESLint configuration
├── package.json                  # Frontend dependencies + scripts
└── pnpm-workspace.yaml           # pnpm workspace definition
```

### Key Architectural Patterns

- **Frontend Routing:** State-based view switching via `useAppStore.currentView`. No React Router.
- **IPC:** Tauri Commands (`invoke`) for request/response; Tauri Events (`listen`) for push notifications.
- **Zustand Pattern:** Every store uses `create<State & Actions>((set, get) => ({}))`. Cross-store coordination happens in components, never stores importing each other.
- **Naming:** Rust = `snake_case`, TypeScript = `camelCase` (vars/fns) / `PascalCase` (components), CSS = `kebab-case`.
- **Tauri Commands:** All return `Result<T, AppError>`. Never panic or unwrap in command handlers.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React 18)                │
│  ┌──────────┐ ┌───────────┐ ┌────────────────────┐  │
│  │ Fast     │ │ Master    │ │ Prompt Dissector   │  │
│  │ Refine   │ │ Mode      │ │ (color-coded)      │  │
│  └────┬─────┘ └─────┬─────┘ └─────────┬──────────┘  │
│       │              │                │              │
│  ┌────┴──────────────┴────────────────┴──────────┐  │
│  │           Zustand Stores (v5)                  │  │
│  │  App · Prompt · Model · Settings · SkillTree   │  │
│  └──────────────────────┬────────────────────────┘  │
└─────────────────────────┼───────────────────────────┘
                          │ invoke() / listen()
┌─────────────────────────┼───────────────────────────┐
│                   Tauri IPC Bridge                    │
└─────────────────────────┼───────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────┐
│                   Rust Backend                       │
│  ┌──────────────────────┼──────────────────────────┐ │
│  │              LLM Router                          │ │
│  │  ┌──────────────┐    │   ┌──────────────────┐   │ │
│  │  │ Local LLM    │        │ Cloud APIs       │   │ │
│  │  │ llama-cpp-rs │        │ OpenAI/Claude/   │   │ │
│  │  │ Llama 3.2 1B │        │ Gemini (reqwest) │   │ │
│  │  └──────────────┘        └──────────────────┘   │ │
│  └─────────────────────────────────────────────────┘ │
│  ┌────────────────┐  ┌─────────────────────────────┐ │
│  │ Prompt Pipeline│  │ Adapter Engine              │ │
│  │ (Refine/Diff)  │  │ (GPT·Claude·Gemini formats) │ │
│  └────────────────┘  └─────────────────────────────┘ │
│  ┌────────────────┐  ┌─────────────────────────────┐ │
│  │ Skill Tree     │  │ Python Sidecar (spaCy NLP)  │ │
│  │ Engine         │  │ stdin/stdout JSON-RPC       │ │
│  └────────────────┘  └─────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────┐  ┌────────────────────────┐ │
│  │ OS Keychain         │  │ SQLite (prompt history │ │
│  │ (stronghold)        │  │ + skill tree + config) │ │
│  └─────────────────────┘  └────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

For full architecture details, see [`_bmad-output/planning-artifacts/architecture.md`](_bmad-output/planning-artifacts/architecture.md).

---

## Testing

### Frontend (Vitest + React Testing Library)

```bash
pnpm test          # Run all tests once
pnpm test:watch    # Watch mode
```

- Unit tests: Co-located `*.test.ts` next to source files
- Component tests: Co-located `*.test.tsx`, uses React Testing Library
- Test naming: `describe("ComponentName")`, `it("should {expected behavior}")`
- Mock Tauri APIs: `vi.mock('@tauri-apps/api/core')` with typed mock implementations

### Rust (cargo test)

```bash
cd src-tauri
cargo test           # All tests
cargo test <name>    # Specific test
cargo clippy         # Linter (zero warnings required)
```

- Unit tests: `#[cfg(test)] mod tests { ... }` inline in source files
- Integration tests: `src-tauri/tests/integration/` directory

---

## Contributing

Contributions are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for:

- Build prerequisites (CMake, C++ compiler for llama-cpp-rs)
- Development workflow and branch naming conventions
- Pull request checklist
- Issue labeling (including `good first issue` tags)

### Quick Workflow

1. Fork the repository
2. Create a feature branch: `feature/my-feature`
3. Make changes following project conventions
4. Run `pnpm lint && cargo clippy && cargo test`
5. Open a pull request

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.

---

## License

This project is open source. See [LICENSE](LICENSE) for details.
