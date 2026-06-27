---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "_bmad-output/planning-artifacts/prd.md"
  - "_bmad-output/planning-artifacts/architecture.md"
  - "_bmad-output/planning-artifacts/ux-design-specification.md"
  - "_bmad-output/planning-artifacts/product-brief-Prompt Engineer-2026-06-27.md"
  - "_bmad-output/planning-artifacts/ux-design-color-themes.html"
  - "_bmad-output/planning-artifacts/ux-design-directions.html"
---

# Prompt Engineer - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Prompt Engineer, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

### Onboarding & First-Run Experience

- FR1: The application can launch without requiring account registration or API key configuration
- FR2: The application can download the local LLM model asynchronously on first launch with progress indication
- FR3: The application can display an interactive demo prompt that users can refine immediately during model download
- FR4: The application can detect and indicate network connectivity status for cloud-dependent features
- FR5: Users can access Fast Refine and Prompt Dissector fully offline after initial model download

### Prompt Refinement — Fast Refine

- FR6: Users can input raw text and receive a refined, structured prompt using the local LLM
- FR7: The application can restructure input text into a prompt with role, task, format, and context components
- FR8: The application can display a before/after comparison (diff) between the original input and the refined prompt
- FR9: Users can copy the refined prompt to clipboard for use in external LLM tools

### Prompt Refinement — Master Mode

- FR10: Users can initiate a dialog-based prompt refinement session using a cloud LLM API
- FR11: The application can conduct a 2–5 turn conversational exchange to deepen and sharpen the user's intent
- FR12: Users can accept the refined prompt at any point during the Master Mode dialog
- FR13: Users can cancel the Master Mode dialog at any point without losing their original input
- FR14: Users can optionally provide a cloud API key (OpenAI, Anthropic, Google) to enable Master Mode and cloud features
- FR15: The application can store API keys securely using the operating system's native credential store

### Prompt Dissector & Learning

- FR16: The application can visually deconstruct a refined prompt into color-coded structural components (Role, Task, Format, Context)
- FR17: The application can adapt the complexity of prompt dissection based on the user's current skill level
- FR18: Users can interact with individual prompt components to view explanations of their purpose
- FR19: The application can display inline educational content explaining why each prompt component contributes to prompt quality

### LLM Adapter System

- FR20: The application can transform a refined prompt into LLM-specific formats (GPT-4o Markdown, Claude XML, Gemini Few-Shot)
- FR21: Users can view a side-by-side comparison of the same prompt formatted for multiple target LLMs
- FR22: Users can select which target LLM adapter to apply to their refined prompt
- FR23: Users can copy the adapter-formatted prompt for use with the corresponding LLM

### Gamification & Skill Tree

- FR24: The application can track user progress through a skill tree with progressive tiers (Discoverer → Knower → Expert → Grandmaster)
- FR25: Users can view their current skill tier and progress toward the next tier
- FR26: The application can present tutorial quests that guide users through core features
- FR27: The application can present daily quests that encourage feature exploration and regular usage
- FR28: Users can earn a streak-freeze token through quest completion to preserve their usage streak

### Domain Detection & NLP

- FR29: The application can automatically detect the intent domain of user input (Comparison, Planning, Email, Research, Explanation, Creative, Technical, General)
- FR30: The application can apply domain-specific prompt structuring rules based on detected intent
- FR31: The application can fall back to a universal prompt adapter when domain confidence is low
- FR32: The application can operate domain detection locally when the Python NLP sidecar is unavailable

### Application Shell & Navigation

- FR33: Users can switch between Fast Refine and Master Mode with visual differentiation and context preservation
- FR34: Users can access a command palette (Ctrl+Shift+P) to search and execute any application command
- FR35: Users can configure optional settings including cloud API key, interface language, and theme preference
- FR36: The application can display a context-sensitive hint to try Master Mode after a configurable number of Fast Refine uses

### Update & System Management

- FR37: The application can automatically check for updates on startup
- FR38: The application can download updates in the background while the user continues working
- FR39: Users can review patch notes in a dedicated window before applying an update
- FR40: Users can defer an update to a later time

### Open-Source Contribution Readiness

- FR41: The repository can provide a CONTRIBUTING.md with build instructions, architecture overview, and contribution workflow
- FR42: The repository can label issues suitable for first-time contributors
- FR43: The adapter system can support community-contributed LLM adapters through a defined interface

### NonFunctional Requirements

### Performance

- NFR-P1: Fast Refine response time <500ms from input submission to refined prompt display (local LLM, Llama 3.2 1B)
- NFR-P2: First-Run time-to-interactive <60 seconds from application launch to first prompt refinement possible
- NFR-P3: UI rendering frame rate 60fps for all Framer Motion transitions and animations
- NFR-P4: Application idle memory <500 MB RAM with loaded LLM model
- NFR-P5: Application inference memory <2 GB RAM during active local LLM inference
- NFR-P6: Installer package size <100 MB (excluding optional model download)
- NFR-P7: Local LLM model size <1.5 GB (quantized Q4_K_M format)
- NFR-P8: Master Mode response time cloud API-dependent; user perceives <3 seconds per dialog turn under normal network conditions
- NFR-P9: Application cold start <3 seconds to UI-ready state (model may still be loading)

### Security

- NFR-S1: Cloud API keys stored exclusively in OS-native credential store (Windows Credential Manager, macOS Keychain, Linux libsecret)
- NFR-S2: API keys never logged, displayed in plaintext after initial entry, or transmitted to any endpoint other than the corresponding LLM provider
- NFR-S3: All LLM API communication conducted over HTTPS/TLS 1.3
- NFR-S4: Local LLM model and user prompt history stored in application-local directories; no telemetry or data exfiltration without explicit opt-in
- NFR-S5: User prompt data processed locally for Fast Refine; transmitted to cloud provider only when user explicitly uses Master Mode or Adapter features

### Scalability

- NFR-SC1: Application functions as standalone desktop software with no centralized server dependency for core features
- NFR-SC2: Adapter plugin system supports community-contributed adapters without application recompilation
- NFR-SC3: Repository and CI/CD infrastructure supports external contributor pull requests with automated build verification
- NFR-SC4: GitHub Releases-based update distribution scales to thousands of concurrent downloads without additional infrastructure cost

### Accessibility

- NFR-A1: All core functionality operable via keyboard navigation (Fast Refine, Master Mode, Dissector, command palette)
- NFR-A2: Color-coded prompt dissection supplemented with non-color differentiators (labels, patterns, icons) for color-blind users
- NFR-A3: UI supports operating system font scaling up to 150% without layout breakage
- NFR-A4: Interface language defaults to operating system locale; English and German supported in MVP
- NFR-A5: Educational content in Prompt Dissector uses plain, non-technical language targeting users with no prior AI knowledge

### Integration

- NFR-I1: Master Mode supports OpenAI API (GPT-4o), Anthropic API (Claude 3.5 Sonnet), and Google AI API (Gemini 1.5 Flash)
- NFR-I2: Python NLP sidecar communicates via stdin/stdout JSON-RPC with structured error codes
- NFR-I3: Fast Refine operates with full functionality when Python sidecar is unavailable (Rust keyword fallback)
- NFR-I4: Update mechanism integrates with GitHub Releases API for version checking and binary download
- NFR-I5: Adapter output formats conform to each target LLM's documented best practices (XML for Claude, Markdown for GPT, Few-Shot for Gemini)

### Additional Requirements

### Starter Template (Architecture)

- **CRITICAL — Epic 1 Story 1:** Project must be initialized using `npm create tauri-app@latest prompt-engineer` (React + TypeScript template). This is the first implementation task.
- The starter provides: Tauri v2 Rust backend, React 18 + TypeScript frontend, Vite bundler, IPC bridge (Commands + Events), cross-platform build configuration.
- Manually add after scaffolding: Tailwind CSS, Framer Motion, tauri-plugin-updater, tauri-plugin-stronghold, tauri-plugin-sql, tauri-plugin-shell, tauri-plugin-window-state, Vitest + React Testing Library.

### Infrastructure & Deployment (Architecture)

- SQLite persistence via tauri-plugin-sql for prompt_history, skill_tree_state, user_settings, usage_stats, quest_progress.
- OS-native credential storage via tauri-plugin-stronghold for cloud API keys.
- Python sidecar (spaCy NLP) communicates via stdin/stdout JSON-RPC; Rust keyword-matching fallback when sidecar unavailable.
- GitHub Actions CI/CD with platform matrix: Windows (x86_64), macOS (x86_64 + aarch64 universal), Linux (AppImage).
- GitHub Releases as distribution channel with tauri-plugin-updater for auto-updates.
- No centralized backend — fully standalone desktop application.

### State Management & Routing (Architecture)

- Zustand v5 for state management: useAppStore, usePromptStore, useSkillTreeStore, useModelStore, useSettingsStore.
- State-based view routing (no React Router): single `currentView` state switches between component trees.
- Views: FastRefine (main), MasterMode (overlay), SkillTree (full-screen), AdapterPreview (side panel).

### Cross-Language Patterns (Architecture)

- Naming: snake_case (Rust, Python, SQLite), camelCase/PascalCase (TypeScript), kebab-case (CSS/Tailwind custom classes).
- Tauri IPC: Commands use snake_case (e.g., `fast_refine`, `master_mode_start`); Events use `entity_event` pattern.
- Error handling: Uniform `AppError` enum across all Tauri commands with user-safe messages.
- Date/Time: ISO 8601 text across all IPC boundaries.
- All Tauri commands return `Result<T, AppError>` — no panics or raw strings.
- All frontend `invoke()` calls wrapped in try/catch with AppError handling.

### Design System & Visual Identity (UX)

- Design Direction: "Kompass + Prisma" — warm rounded forms (Kompass) + Dissector colors as brand identity (Prisma).
- Tailwind CSS + Custom Design Tokens (Dissector colors, Tier colors, Semantic colors, Surface colors, Motion tokens).
- Light Theme (Summer Sky) and Dark Theme (Night Sky) via CSS custom properties with `[data-theme="dark"]`.
- Typography: Inter (UI primary), JetBrains Mono (prompts/monospace).
- Framer Motion for all animated transitions and micro-interactions.
- 8 custom components: PromptDissector, SkillTreeVisualization, BeforeAfterDiff, ThreeColumnAdapterPreview, MasterModeDialog, CommandPalette, ProgressIndicator, ChipNavigationBar.

### Accessibility (UX)

- WCAG 2.1 Level AA compliance target.
- Full keyboard navigation (Tab flow, arrow keys in Skill Tree, Escape for overlays, Ctrl+Shift+P for Command Palette).
- Colorblind Mode toggle for Dissector: switches to pattern-based display (stripes, dots, hatching).
- All Dissector colors paired with non-color differentiators (labels, patterns, icons).
- OS font scaling support up to 150% without layout breakage.
- `prefers-reduced-motion` support: Framer Motion disabled when flag is set.

### Responsive Desktop (UX)

- Desktop-first approach with breakpoint degradation (not mobile responsive).
- Small Window (800–1023px): single column, sidebar collapsed, chips scroll horizontally.
- Standard Desktop (1024–1439px): two-column (Input/Output), sidebar optional.
- Large Desktop (1440px+): sidebar visible, 3-Column Adapter View, Skill Tree full-screen.
- Minimum window size: 800×600px.

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Launch without account or API key |
| FR2 | Epic 1 | Async LLM model download with progress |
| FR3 | Epic 1 | Interactive demo prompt during download |
| FR4 | Epic 1 | Network connectivity detection |
| FR5 | Epic 1 | Fast Refine and Dissector fully offline |
| FR6 | Epic 1 | Raw text input → structured prompt via local LLM |
| FR7 | Epic 1 | Restructure input into role/task/format/context |
| FR8 | Epic 1 | Before/after diff comparison |
| FR9 | Epic 1 | Copy refined prompt to clipboard |
| FR10 | Epic 2 | Dialog-based refinement via cloud LLM |
| FR11 | Epic 2 | 2–5 turn conversational coaching exchange |
| FR12 | Epic 2 | Accept refined prompt at any dialog point |
| FR13 | Epic 2 | Cancel Master Mode without data loss |
| FR14 | Epic 2 | Optional cloud API key configuration |
| FR15 | Epic 2 | Secure API key storage via OS credential store |
| FR16 | Epic 1 | Color-coded dissector (Role, Task, Format, Context) |
| FR17 | Epic 5 | Adaptive dissector complexity per skill tier |
| FR18 | Epic 1 | Interactive component explanations |
| FR19 | Epic 1 | Inline educational content per component |
| FR20 | Epic 4 | Transform prompt into LLM-specific formats |
| FR21 | Epic 4 | Side-by-side multi-LLM comparison view |
| FR22 | Epic 4 | Select target LLM adapter |
| FR23 | Epic 4 | Copy adapter-formatted prompt |
| FR24 | Epic 5 | Skill tree progress tracking (4 tiers) |
| FR25 | Epic 5 | Current tier and progress display |
| FR26 | Epic 5 | Tutorial quests for core features |
| FR27 | Epic 5 | Daily quests for exploration |
| FR28 | Epic 5 | Streak-freeze token via quest completion |
| FR29 | Epic 6 | Auto-detect intent domain (6–8 categories) |
| FR30 | Epic 6 | Domain-specific structuring rules |
| FR31 | Epic 6 | Universal fallback on low confidence |
| FR32 | Epic 6 | Local domain detection (keyword fallback) |
| FR33 | Epic 3 | Mode switching with context preservation |
| FR34 | Epic 3 | Command palette (Ctrl+Shift+P) |
| FR35 | Epic 3 | Settings: API key, language, theme |
| FR36 | Epic 3 | Context-sensitive Master Mode hint |
| FR37 | Epic 7 | Auto check for updates on startup |
| FR38 | Epic 7 | Background update download |
| FR39 | Epic 7 | Patch notes review window |
| FR40 | Epic 7 | Defer update option |
| FR41 | Epic 7 | CONTRIBUTING.md with build instructions |
| FR42 | Epic 7 | Good-first-issue labels |
| FR43 | Epic 4 | Community-contributed adapter interface |

## Epic List

### Epic 1: Zero-Onboarding & Instant Prompt Refinement

A non-technical user opens the app for the first time, sees a demo prompt, and within 60 seconds receives a visibly improved, color-coded prompt — no account, no API key, no internet required. The local LLM downloads asynchronously in the background, and the Prompt Dissector reveals the structure of every refined prompt through color-coded components (Role, Task, Format, Context). The Before/After Diff makes improvement visible at a glance.

**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR16, FR18, FR19
**Key NFRs:** NFR-P1, NFR-P2, NFR-P3, NFR-P4, NFR-P5, NFR-P6, NFR-P7, NFR-P9, NFR-S4, NFR-S5, NFR-SC1, NFR-A3, NFR-A5
**Story 1:** Project initialization via `npm create tauri-app@latest` (React + TypeScript starter template) with Tailwind CSS, Framer Motion, and design token setup.

---

### Epic 2: Master Mode Dialog Coaching

Users deepen their prompts through a natural 2–5 turn coaching conversation with a cloud LLM, producing meaningfully better results than Fast Refine alone. The Master Mode dialog accepts and challenges the user's intent through targeted follow-up questions. Users can accept the refined prompt at any point or cancel without data loss. Cloud API keys are stored securely in the OS-native credential store.

**FRs covered:** FR10, FR11, FR12, FR13, FR14, FR15
**Key NFRs:** NFR-P8, NFR-S1, NFR-S2, NFR-S3, NFR-I1

---

### Epic 3: Application Shell & Power-User Navigation

Users seamlessly switch between Fast Refine and Master Mode with visual differentiation and full context preservation. A command palette (Ctrl+Shift+P) provides keyboard-driven access to every application command. Users configure optional settings including cloud API keys, interface language, and theme preference. Context-sensitive hints gently guide users toward deeper features like Master Mode after repeated Fast Refine usage.

**FRs covered:** FR33, FR34, FR35, FR36
**Key NFRs:** NFR-A1, NFR-A4

---

### Epic 4: Multi-LLM Adapter Preview

Users see their refined prompt transformed into LLM-specific formats — GPT-4o Markdown hierarchy, Claude XML structure, Gemini Few-Shot patterns — in a side-by-side three-column comparison view. Users can select and copy any adapter-formatted prompt. A defined community adapter interface enables external contributors to add support for additional LLMs without application recompilation.

**FRs covered:** FR20, FR21, FR22, FR23, FR43
**Key NFRs:** NFR-SC2, NFR-I5

---

### Epic 5: Skill Tree & Adaptive Learning Progression

Users discover their growing competence through a spatial, browsable skill tree with four progressive tiers (Discoverer → Knower → Expert → Grandmaster). Tutorial quests introduce core features; daily quests encourage regular exploration. Users earn streak-freeze tokens through quest completion. The Prompt Dissector adapts its complexity dynamically — Tier 1 sees 2 colors, Tier 4 sees 7+ structural layers with Chain-of-Thought visibility. Progress tracking is passive and automatic.

**FRs covered:** FR17, FR24, FR25, FR26, FR27, FR28
**Key NFRs:** NFR-A2

---

### Epic 6: Intelligent Domain Detection

The application automatically identifies the intent domain of user input across 6–8 categories (Comparison, Planning, Email, Research, Explanation, Creative, Technical, General) without manual selection. Domain-specific prompt structuring rules optimize refinement quality per domain. The system falls back to universal adapter rules when domain confidence is low and operates domain detection locally via Rust keyword matching when the Python NLP sidecar is unavailable.

**FRs covered:** FR29, FR30, FR31, FR32
**Key NFRs:** NFR-I2, NFR-I3

---

### Epic 7: Updates, Distribution & Community Foundation

Users receive seamless automatic updates with transparent, readable patch notes in a dedicated review window before applying. Updates download in the background without interrupting work. Users can defer updates. The repository provides a comprehensive CONTRIBUTING.md with build instructions, architecture overview, and contribution workflow. Issues are labeled for first-time contributors. Cross-platform CI/CD (GitHub Actions) ensures build quality for Windows, macOS, and Linux.

**FRs covered:** FR37, FR38, FR39, FR40, FR41, FR42
**Key NFRs:** NFR-SC3, NFR-SC4, NFR-I4


---

## Epic 1: Zero-Onboarding & Instant Prompt Refinement

A non-technical user opens the app for the first time, sees a demo prompt, and within 60 seconds receives a visibly improved, color-coded prompt — no account, no API key, no internet required. The local LLM downloads asynchronously in the background, and the Prompt Dissector reveals the structure of every refined prompt through color-coded components (Role, Task, Format, Context). The Before/After Diff makes improvement visible at a glance.

### Story 1.1: Project Foundation & Welcome Screen

As a first-time user,
I want to open Prompt Engineer and immediately see a welcoming interface with an interactive demo prompt and no setup screens,
So that I understand what the app does and feel invited to try it — without any account, API key, or configuration.

**Acceptance Criteria:**

**Given** the application is installed for the first time
**When** the user launches the app
**Then** the app displays a styled welcome interface within 3 seconds (NFR-P9)
**And** no account registration, login, or API key input screen is presented (FR1)
**And** a demo prompt is visible in the input area showing an example of raw text that can be refined (FR3)
**And** the interface uses the "Kompass + Prisma" design direction with warm rounded forms and the Dissector color swatch strip as a subtle brand element
**And** Tailwind CSS custom design tokens are applied (Dissector colors, Tier colors, Semantic colors, Surface colors, Motion tokens)
**And** the Inter font family is used for all UI text and JetBrains Mono for prompt display
**And** Framer Motion is configured and ready for component animations
**And** Zustand stores (useAppStore, useModelStore, usePromptStore) are initialized
**And** a light/dark theme toggle is present and functional, defaulting to the OS-level `prefers-color-scheme`
**And** the project is scaffolded via `create-tauri-app` with React 18 + TypeScript + Vite + Tauri v2
**And** the minimum window size is constrained to 800×600px
**And** the app window title and icon reflect "Prompt Engineer" branding

---

### Story 1.2: Local LLM Integration & Async Model Download

As a first-time user,
I want the local AI model to download automatically in the background with a visible progress indicator,
So that the app works fully offline afterward without me needing to understand models, downloads, or configuration.

**Acceptance Criteria:**

**Given** the application is launched for the first time
**When** the welcome screen is displayed
**Then** the local LLM model (Llama 3.2 1B Q4_K_M) begins downloading asynchronously to `{app_data_dir}/models/` (FR2)
**And** a linear progress indicator is displayed at the top of the window showing download percentage and bytes
**And** the progress indicator uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes
**And** the demo prompt banner remains visible and interactive during the download (FR3)
**And** the "Discover" / "Verbessern" button is shown in a disabled state with text "Preparing AI..." while the model downloads
**And** informative facts or tips rotate in a subtle text area near the progress bar during download
**And** when the download completes, the progress bar turns green, displays "Your AI is ready ✦", and fades out after 2 seconds (FR5)
**And** a `model_ready` event is emitted from the Rust backend to the frontend
**And** the "Discover" button becomes active and clickable
**And** on subsequent launches, the model loads from the cached filesystem path without re-downloading
**And** if the download fails, the progress bar turns red and displays a retry button with the error message
**And** llama-cpp-rs is integrated in the Rust backend for local inference
**And** after model is ready, Fast Refine and Prompt Dissector operate fully offline (FR5)

---

### Story 1.3: Fast Refine Engine

As a user,
I want to type or paste raw text into the input area, click a single button, and receive a structured, improved prompt in under half a second,
So that I get immediate value from the app with zero friction.

**Acceptance Criteria:**

**Given** the local LLM model is ready and the user has entered text in the input area
**When** the user clicks the primary CTA button ("✦ Discover Your Prompt" / "✦ Verbessern")
**Then** the button shows a brief pulse animation and the app calls the `fast_refine` Tauri command (FR6)
**And** within 500ms, a refined, structured prompt is displayed in the output area (NFR-P1)
**And** the refined prompt includes clearly identifiable structural components: Role, Task, Format, and Context (FR7)
**And** the output area renders the prompt in JetBrains Mono font for readability
**And** a "📋 Copy" button is visible adjacent to the output, styled as secondary (outlined, `border-Himmelblau`)
**And** clicking "Copy" copies the full refined prompt text to the system clipboard and displays a success toast "✦ Copied!" that auto-dismisses after 3 seconds (FR9)
**And** the original input and the refined output are stored in Zustand `usePromptStore`
**And** if the input field is empty when the button is clicked, the button does nothing and the placeholder text blinks softly
**And** if the local LLM is still downloading, the "Discover" button remains in its disabled "Preparing AI..." state
**And** the LLM Router in the Rust backend correctly routes `fast_refine` to the local llama.cpp inference engine
**And** the `fast_refine` Tauri command returns `Result<RefineResult, AppError>` with structured error handling
**And** all `invoke('fast_refine')` calls in the frontend are wrapped in try/catch with AppError handling
**And** the input text area and output area follow the Kompass design: rounded card with warm border on the input, color-coded output card
**And** Tailwind responsive breakpoints are applied: single column at 800–1023px, two-column (Input | Output) at 1024px+

---

### Story 1.4: Connectivity Detection & Offline Awareness

As a user,
I want the app to clearly show whether I am online or offline,
So that I know which features are available and am never confused by features that don't work without internet.

**Acceptance Criteria:**

**Given** the application is running
**When** the device's network status changes
**Then** the app detects the change and updates a connectivity indicator in the UI (FR4)
**And** when offline, a subtle indicator displays "Offline" status
**And** cloud-dependent features (Master Mode button, Adapter Preview) are visually grayed out with a tooltip: "Internet connection required"
**And** when connectivity is restored, the indicator updates to show online status within 3 seconds
**And** cloud-dependent feature buttons become active again
**And** Fast Refine, Prompt Dissector, Before/After Diff, and the demo prompt remain fully functional regardless of connectivity (FR5)
**And** the connectivity state is stored in Zustand `useAppStore.connectivityStatus`
**And** the Rust backend uses the Tauri network status API or equivalent to detect connectivity
**And** on first launch without internet, the local LLM model is still usable if previously downloaded; if not downloaded, an appropriate message is shown

---

### Story 1.5: Prompt Dissector — Visual Deconstruction

As a user,
I want to see my refined prompt color-coded by structural component type with interactive explanations,
So that I understand *why* a good prompt works and learn prompt engineering visually.

**Acceptance Criteria:**

**Given** a refined prompt is displayed in the output area after Fast Refine
**When** the output renders
**Then** the prompt text is displayed with color-coded segments corresponding to structural components (FR16):
- Role segments highlighted in 🟦 Himmelblau (#4A90D9 light / #6BABE8 dark) with a "Role" label
- Task segments highlighted in 🟩 Wiesengrün (#5DAE7E light / #6ECF94 dark) with a "Task" label
- Format segments highlighted in 🟨 Sonnen-Gold (#E8B84B light / #F4C542 dark) with a "Format" label
- Context segments highlighted in 🟧 Koralle (#E8836E light / #F09080 dark) with a "Context" label
**And** a Dissector Legend is displayed below or beside the output showing each color with its label and an icon (FR18)
**And** hovering or clicking on a color-coded segment displays a tooltip or inline explanation of that component's purpose (FR18, FR19)
**And** example explanation for Role: "🟦 Role — Tells the AI who it should be. A clear role gives the AI the right perspective."
**And** example explanation for Task: "🟩 Task — The specific action you want. Precise tasks get precise results."
**And** educational content uses plain, non-technical language suitable for users with no prior AI knowledge (NFR-A5)
**And** the Dissector output area uses `role="region"` with `aria-label="Prompt Structure"`
**And** each color segment is keyboard-focusable via Tab navigation
**And** on the very first Fast Refine in a user session (Tier 1, Session 1), an animated overlay introduces each component with staggered fade-in labels using Framer Motion `staggerChildren`
**And** the overlay can be dismissed by clicking "Got it" or clicking outside
**And** the Dissector Overlay only appears once per user (tracked in Zustand `useAppStore.hasSeenDissectorIntro`)
**And** a Colorblind Mode toggle is available in the Dissector legend area that switches to pattern-based display (stripes, dots, hatching) instead of color-only (NFR-A2)

---

### Story 1.6: Before/After Diff Viewer

As a user,
I want to see a side-by-side comparison of my original text and the refined prompt with the differences highlighted,
So that the improvement is visually obvious and I can learn what changed.

**Acceptance Criteria:**

**Given** a refined prompt is displayed after Fast Refine
**When** the output renders
**Then** a side-by-side Before/After Diff view is displayed below or beside the Dissector output (FR8)
**And** the left column shows the user's original raw input with a "Before" label
**And** the right column shows the refined structured prompt with an "After" label
**And** words, phrases, or structural elements that were added or changed in the After column are highlighted with a subtle green background
**And** words or phrases that were removed or restructured from the original are indicated with a subtle red or strikethrough treatment in the Before column
**And** the diff comparison is visually clear and understandable for non-technical users — not a developer-grade character-level diff
**And** the diff view has `role="region"` with `aria-label="Before and after comparison"`
**And** users can Tab between the Before and After columns
**And** the diff columns stack vertically on small windows (<1024px width) instead of side-by-side
**And** the diff comparison is computed client-side with no LLM call required
**And** the diff view animates into view using Framer Motion with the After column revealing from the right
**And** on the very first view, diff highlights animate on appearance to draw attention to the changes


---

## Epic 2: Master Mode Dialog Coaching

Users deepen their prompts through a natural 2–5 turn coaching conversation with a cloud LLM, producing meaningfully better results than Fast Refine alone. The Master Mode dialog accepts and challenges the user's intent through targeted follow-up questions. Users can accept the refined prompt at any point or cancel without data loss. Cloud API keys are stored securely in the OS-native credential store.

### Story 2.1: API Key Setup & Secure Storage

As a user,
I want to optionally add my cloud API key (OpenAI, Anthropic, or Google) in a settings area and have it stored securely,
So that I can use Master Mode and cloud features without worrying about my key being exposed.

**Acceptance Criteria:**

**Given** the user opens the settings panel
**When** they navigate to the API key configuration section
**Then** input fields are provided for OpenAI API key, Anthropic API key, and Google AI API key (FR14)
**And** each input field masks the entered value (password-style input) during entry
**And** after saving, the key value is never displayed in plaintext again — only masked placeholders (e.g., "••••••••sk-abc123") (NFR-S2)
**And** each key is stored encrypted in the OS-native credential store using tauri-plugin-stronghold (FR15, NFR-S1)
- Windows: Windows Credential Manager
- macOS: Keychain
- Linux: libsecret
**And** a "Test Connection" button is available next to each key field to verify the key works with the respective provider
**And** success/failure feedback is displayed after testing
**And** keys can be removed via a "Remove" action that deletes the entry from the credential store
**And** API keys are never logged to console, file, or telemetry (NFR-S2)
**And** keys are transmitted only to the corresponding LLM provider over HTTPS/TLS 1.3 (NFR-S3)
**And** the settings panel is integrated into the application shell within the Zustand `useSettingsStore`
**And** the Settings UI respects the light/dark theme and uses the Kompass design language (rounded cards, warm accents)
**And** Master Mode and Adapter Preview features remain disabled (grayed out with tooltip) until at least one valid API key is configured

---

### Story 2.2: Master Mode Coaching Dialog

As a user,
I want to click "Deepen in Master Mode" after a Fast Refine and engage in a natural 2–5 turn coaching conversation with the AI,
So that my prompt becomes meaningfully deeper and more effective through iterative refinement.

**Acceptance Criteria:**

**Given** at least one cloud API key is configured and the user has a Fast Refine result displayed
**When** the user clicks the "🔬 Deepen in Master Mode" button
**Then** the view transitions to the Master Mode dialog overlay (FR10)
**And** the original input and Fast Refine output are preserved in context (FR13)
**And** the Master Mode coach sends an opening message analyzing the current prompt and asking a targeted follow-up question (FR10, FR11)
**And** the coach message is displayed as a chat bubble with a typing indicator animation while the response is being generated
**And** the user can type and submit a response to the coach's question
**And** the coach responds with another targeted question that deepens the prompt (2–5 turns total) (FR11)
**And** each coaching turn appears in <3 seconds under normal network conditions (NFR-P8)
**And** the user can click "Accept Prompt" at any point during the dialog to finalize the refined prompt (FR12)
**And** the accepted prompt is displayed with Before/After/Diff showing the progression: Original → Fast Refine → Master Mode
**And** the user can click "Back to Refine" at any point to cancel the Master Mode dialog and return to Fast Refine without losing the original input (FR13)
**And** if the dialog is cancelled, the partial conversation is saved and the user is shown "Session saved — continue anytime"
**And** the dialog overlay is dismissible with the Escape key
**And** the Master Mode UI uses ARIA live-region for new messages and `role="log"`
**And** the Rust backend routes Master Mode requests through `llm::router` to the appropriate cloud API (OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, or Google Gemini 1.5 Flash) based on the configured key (NFR-I1)
**And** the cloud API communication uses HTTPS via reqwest (Rust) with the API key retrieved from stronghold at request time — never cached in application memory
**And** Tauri events (`master_mode_message`) stream coach responses from Rust to the frontend
**And** the `master_mode_start` and `master_mode_respond` Tauri commands return `Result<T, AppError>` with user-safe error messages (e.g., API_KEY_MISSING, API_RATE_LIMITED, API_TIMEOUT)
**And** if all configured API keys are invalid or rate-limited, a clear error message is displayed with guidance on how to resolve


---

## Epic 3: Application Shell & Power-User Navigation

Users seamlessly switch between Fast Refine and Master Mode with visual differentiation and full context preservation. A command palette (Ctrl+Shift+P) provides keyboard-driven access to every application command. Users configure optional settings including cloud API keys, interface language, and theme preference. Context-sensitive hints gently guide users toward deeper features like Master Mode after repeated Fast Refine usage.

### Story 3.1: Mode Switching & Context Preservation

As a user,
I want to switch between Fast Refine and Master Mode without losing my input or results,
So that I can freely explore both modes and compare their outputs.

**Acceptance Criteria:**

**Given** the user is in Fast Refine view with input and output visible
**When** the user clicks the "Master Mode" navigation button
**Then** the Master Mode dialog slides in from the right with a Framer Motion `slideRight` animation (FR33)
**And** the Fast Refine input and output remain visible behind the overlay
**And** if the user has a Fast Refine output, it is carried into the Master Mode context as the starting prompt
**Given** the user is in Master Mode dialog
**When** the user clicks "Back to Refine" or presses Escape
**Then** the Master Mode dialog slides out to the right and the Fast Refine view is restored (FR33)
**And** the original input and Fast Refine output are unchanged
**And** a partial Master Mode session is saved and a notification "Session saved — continue anytime" is displayed
**Given** the user switches modes
**Then** each mode has clear visual differentiation (Fast Refine: Kompass warm theme; Master Mode: coaching chat interface with message bubbles)
**And** the active mode is visually indicated in the navigation
**And** mode switching is achievable via keyboard shortcut (e.g., Ctrl+M for Master Mode toggle)
**And** all navigation elements meet keyboard accessibility requirements (NFR-A1)

---

### Story 3.2: Settings & Preferences Panel

As a user,
I want to configure my preferences — interface language, theme, and API keys — in a single settings panel,
So that the app works the way I prefer and in my language.

**Acceptance Criteria:**

**Given** the user accesses the settings panel (via navigation or Command Palette)
**When** the settings panel opens
**Then** the following preference sections are available (FR35):
- **Interface Language:** dropdown or toggle between English and German, defaulting to OS locale (NFR-A4)
- **Theme:** toggle between Light (Summer Sky), Dark (Night Sky), and System Default
- **API Keys:** masked input fields for OpenAI, Anthropic, and Google AI keys (integrated from Story 2.1)
**And** changing the language immediately updates all UI text to the selected language without app restart
**And** changing the theme immediately applies the new theme via the CSS custom property `[data-theme]` toggle
**And** all settings are persisted: theme to localStorage for instant application, language and preferences to SQLite via Tauri command
**And** the settings panel is accessible via keyboard navigation (NFR-A1)
**And** a "Close" button or Escape key dismisses the settings panel
**And** the settings panel uses the Kompass design language with rounded cards and warm accents
**And** unsaved changes prompt a confirmation dialog when closing

---

### Story 3.3: Command Palette & Contextual Feature Discovery

As a user,
I want to press Ctrl+Shift+P and access every app command through a searchable command palette,
So that I can quickly execute any action without navigating menus — and discover features I didn't know existed.

**Acceptance Criteria:**

**Given** the application is running
**When** the user presses Ctrl+Shift+P
**Then** a command palette overlay appears with a fade-in + scale animation (200ms) (FR34)
**And** the overlay is centered on screen with a search input field at the top
**And** all available commands are listed below, grouped by category (Navigation, Refinement, Settings, Adapters)
**And** as the user types, the command list filters in real-time to show matching commands
**And** the user can navigate the filtered list with ↑↓ arrow keys and execute a command with Enter
**And** pressing Escape or clicking outside the overlay dismisses the command palette
**And** the command palette is fully keyboard-operable with `role="combobox"` and `aria-activedescendant`
**And** a focus trap is active within the overlay while open
**And** if no commands match the search query, a message "No commands match '{query}'" is displayed with a suggestion
**And** after the user has used Fast Refine 5 times, a subtle, non-blocking hint appears: "🔬 Ready for more depth? Try Master Mode — press Ctrl+Shift+P and search 'Master'" (FR36)
**And** the hint appears as a toast notification that auto-dismisses after 5 seconds
**And** the hint threshold (default: 5 uses) is configurable in settings
**And** after 10 Fast Refine uses, a different hint appears: "🔄 Curious how Claude would handle this? Try Adapter Comparison"
**And** hints never repeat for the same feature — once a hint is shown, a flag in Zustand `useAppStore.dismissedHints` prevents it from appearing again


---

## Epic 4: Multi-LLM Adapter Preview

Users see their refined prompt transformed into LLM-specific formats — GPT-4o Markdown hierarchy, Claude XML structure, Gemini Few-Shot patterns — in a side-by-side three-column comparison view. Users can select and copy any adapter-formatted prompt. A defined community adapter interface enables external contributors to add support for additional LLMs without application recompilation.

### Story 4.1: Adapter Transformation Pipeline & Community Interface

As a user (and future contributor),
I want the app to transform my prompt into formats optimized for different LLMs,
So that I can use the same prompt effectively with GPT, Claude, or Gemini — and the community can add support for new LLMs.

**Acceptance Criteria:**

**Given** a refined prompt exists (from Fast Refine or Master Mode)
**When** the adapter system is invoked
**Then** the prompt is transformed into three LLM-specific formats (FR20):
- **GPT-4o:** Markdown hierarchy with headings, bold, lists, and structured sections per OpenAI best practices
- **Claude 3.5 Sonnet:** XML-wrapped structure with `<role>`, `<task>`, `<format>`, `<context>` tags per Anthropic best practices
- **Gemini 1.5 Flash:** Few-Shot pattern with example input/output pairs per Google AI best practices
**And** each adapter output conforms to the target LLM's documented prompt engineering guidelines (NFR-I5)
**And** the adapter transformation pipeline lives in `src-tauri/src/pipeline/adapter.rs`
**And** each adapter implements a defined Rust trait (`PromptAdapter`) with a `transform(&RefineResult) -> String` method (FR43)
**And** new adapters can be added by implementing the `PromptAdapter` trait in a new module and registering in the adapter registry (NFR-SC2)
**And** the adapter registry is discoverable — a `list_adapters` Tauri command returns all registered adapters
**And** community-contributed adapters can be added without recompiling the core application (via the trait-based plugin pattern) (NFR-SC2, FR43)
**And** adapter transformation errors are handled via `AppError` and user-safe messages
**And** the adapter system is documented in `docs/` for contributor onboarding

---

### Story 4.2: Three-Column Adapter Preview View

As a user,
I want to see my prompt side-by-side in three columns — one for each LLM — and copy the format I need,
So that I can compare how different AIs interpret my prompt and use the right one for my task.

**Acceptance Criteria:**

**Given** a refined prompt is available and at least one cloud API key is configured
**When** the user clicks "🔄 Compare Adapters" or accesses the Adapter Preview
**Then** a three-column layout is displayed (FR21):
- **Column 1:** llama.cpp local output or GPT-4o formatted prompt
- **Column 2:** Claude XML formatted prompt
- **Column 3:** Gemini Few-Shot formatted prompt
**And** each column has a header identifying the target LLM with its logo/icon
**And** while adapter transformations are loading, each column shows a spinner independently
**And** when all transformations are ready, differences between the formats are visually highlighted with subtle color accents matching the Dissector palette
**And** on desktop (1440px+), all three columns are visible side-by-side
**And** on smaller windows (1024–1439px), columns stack with horizontal scrolling or a tab-based switcher
**And** on small windows (800–1023px), a single-column tabbed view is used
**And** the user can click on any adapter column to select it (FR22)
**And** a "📋 Copy" button is available in each column header to copy that specific adapter-formatted prompt to clipboard (FR23)
**And** clicking Copy shows a success toast: "✦ Copied for GPT-4o!" with the adapter name
**And** if the user is offline, the cloud-dependent columns (GPT-4o remote, Claude, Gemini) display "Online required" with a grayed-out state; the local llama.cpp column works offline
**And** the Adapter Preview view has `aria-label="Adapter comparison: {adapter name}"` on each column
**And** users can Tab through columns for keyboard navigation (NFR-A1)
**And** the columns appear with a staggered Framer Motion animation on load
**And** a "Back to Refine" button returns the user to the previous view with context preserved
**And** if no cloud API key is configured, the Adapter Preview shows an inline message: "Add an API key in Settings to unlock adapter comparisons" with a link to Settings


---

## Epic 5: Skill Tree & Adaptive Learning Progression

Users discover their growing competence through a spatial, browsable skill tree with four progressive tiers (Discoverer → Knower → Expert → Grandmaster). Tutorial quests introduce core features; daily quests encourage regular exploration. Users earn streak-freeze tokens through quest completion. The Prompt Dissector adapts its complexity dynamically — Tier 1 sees 2 colors, Tier 4 sees 7+ structural layers with Chain-of-Thought visibility. Progress tracking is passive and automatic.

### Story 5.1: Skill Tree Data Model & Progress Tracking

As a user,
I want the app to automatically track my skill progression through tiers as I use it,
So that I can see my growth as a prompt engineer without needing to manually log or claim anything.

**Acceptance Criteria:**

**Given** the application is running with the database layer initialized
**When** the app starts for the first time
**Then** the SQLite database creates the `skill_tree_nodes` and `quest_progress` tables via migration (FR24)
**And** the user begins at Tier 1 (Discoverer) with all Tier 1 nodes visible but locked
**And** the `skill_tree_nodes` table stores: node_id, node_name, tier, branch (Fast Refine | Master Mode), unlock_condition (e.g., "complete 5 fast refines"), is_unlocked, unlocked_at
**And** when the user performs an action that satisfies an unlock condition (e.g., 5th Fast Refine), the node is automatically unlocked (FR24)
**And** a `skill_tree_updated` Tauri event is emitted with `{ node_id, tier }` payload
**And** the user's current tier and progress toward the next tier are queryable via a `get_skill_tree` Tauri command (FR25)
**And** the tier progression follows the defined path:
- Tier 1 (Discoverer): Unlocked by default — 2 Dissector colors (Role, Task)
- Tier 2 (Knower): Unlock after 20 Fast Refines + completing Tutorial Quest 1 — 4 Dissector colors (+ Format, Context)
- Tier 3 (Expert): Unlock after 50 Fast Refines + 5 Master Mode sessions — 5 Dissector colors (+ Constraint)
- Tier 4 (Grandmaster): Unlock after 100 Fast Refines + 20 Master Mode sessions + Adapter comparison used — 7+ Dissector layers (+ Example, Persona, Chain-of-Thought)
**And** progress is tracked passively — the user never needs to "claim" progress
**And** the Zustand `useSkillTreeStore` caches tree state client-side and syncs to SQLite on significant changes (debounced, 500ms)
**And** the store follows the immutable Zustand pattern: `State & Actions` interface, no cross-store imports
**And** all database operations for skill tree use the `invoke()` → Rust → SQLite pattern, never direct frontend DB access

---

### Story 5.2: Skill Tree Visualization & Adaptive Dissector

As a user,
I want to see my skill tree as a spatial, visual map of my progress,
So that I can explore what I've discovered and what I can unlock next — while the Dissector grows with me.

**Acceptance Criteria:**

**Given** the user navigates to the Skill Tree view (via sidebar or Command Palette)
**When** the Skill Tree visualization loads
**Then** a spatial tree is displayed with 2 branches (Fast Refine, Master Mode) and 4 tiers (FR25)
**And** unlocked nodes glow with their tier color (Tier 1: Hellstahl, Tier 2: Mittelblau, Tier 3: Himmelblau, Tier 4: Sonnen-Gold)
**And** the next unlockable nodes shimmer with a subtle animation indicating they are within reach
**And** locked nodes beyond the next tier are subtly visible but not interactive, showing "Discover more to unlock"
**And** completed nodes display a checkmark
**And** the user can navigate between nodes with arrow keys (NFR-A1)
**And** each node has `aria-label="Skill Tree: {tier} — {node_name}"` for screen readers
**And** a compact "Mini Tree" variant is available as a sidebar widget showing current tier and next node progress (FR25)
**Given** the user's skill tier changes
**When** a new tier is reached
**Then** the Prompt Dissector adapts its complexity dynamically (FR17):
- **Tier 1 → Tier 2:** Dissector expands from 2 colors (Role, Task) to 4 colors (+ Format, Context)
- **Tier 2 → Tier 3:** Dissector adds a 5th color (+ Constraint / 🟪 Flieder)
- **Tier 3 → Tier 4:** Dissector expands to 7+ layers (+ Example ⬜, Persona 🟫, Chain-of-Thought visibility)
**And** the Dissector Legend updates to reflect the newly available component types
**And** tier-upgrade animations use Framer Motion `spring` for node glow and `staggerChildren` for new Dissector colors appearing
**And** when the user reaches Grandmaster (Tier 4), a toast notification displays: "🏆 Großmeister — The language is yours"
**And** the Skill Tree Visualization is a full-screen overlay that animates in from the bottom; the Mini Tree is always visible in the sidebar at 1440px+ widths

---

### Story 5.3: Quest System & Streak Mechanics

As a user,
I want guided tutorial quests that introduce features and daily quests that reward regular use,
So that I discover the app's depth naturally and stay motivated to practice.

**Acceptance Criteria:**

**Given** the user's skill tree is initialized at Tier 1
**When** the user first uses Fast Refine
**Then** a tutorial quest "First Discovery" is active, prompting: "Refine your first prompt" (FR26)
**And** upon completion, the quest is marked done in `quest_progress` and the next tutorial quest unlocks: "See the Structure" (view the Dissector)
**And** tutorial quests form a guided path through core features: "First Discovery" → "See the Structure" → "Compare Before & After" → "Try Master Mode" → "Explore Adapters"
**And** each completed tutorial quest unlocks the corresponding Skill Tree node
**Given** the user has completed all tutorial quests
**When** the user opens the app on a new day
**Then** a daily quest is presented: "Refine 3 prompts today (0/3)" or "Use Master Mode once today" (FR27)
**And** daily quests rotate between different activity types (Fast Refine, Master Mode, Adapter Preview, copying prompts)
**And** completing a daily quest awards progress toward the next tier
**Given** the user has used the app on consecutive days
**When** the user opens the app
**Then** a streak counter is displayed showing the current consecutive days of usage
**And** if the user misses a day, the streak resets to 0 — but if the user has earned a streak-freeze token via quest completion, one token is consumed automatically to preserve the streak (FR28)
**And** the user can earn a maximum of 1 streak-freeze token per week through daily quest completion
**And** a streak-freeze token is visually represented as a small shield icon in the Skill Tree Mini view
**And** the streak and quest progress are persisted in the `quest_progress` SQLite table
**And** quest notifications appear as non-intrusive toasts that auto-dismiss after 4 seconds
**And** the quest system never pressures the user — no "You're about to lose your streak!" notifications before the day ends
**And** all quest and streak mechanics are passive — progress is tracked automatically without manual claiming


---

## Epic 6: Intelligent Domain Detection

The application automatically identifies the intent domain of user input across 6–8 categories (Comparison, Planning, Email, Research, Explanation, Creative, Technical, General) without manual selection. Domain-specific prompt structuring rules optimize refinement quality per domain. The system falls back to universal adapter rules when domain confidence is low and operates domain detection locally via Rust keyword matching when the Python NLP sidecar is unavailable.

### Story 6.1: Domain Detection Engine — Python Sidecar & Rust Fallback

As a user,
I want the app to automatically figure out what kind of prompt I'm writing,
So that it can give me better results without me having to select a category from a dropdown.

**Acceptance Criteria:**

**Given** a user submits text for refinement
**When** the `detect_domain` process is triggered (before or during Fast Refine)
**Then** the system attempts to detect the intent domain from 8 categories: Comparison, Planning, Email, Research, Explanation, Creative, Technical, General (FR29)
**And** domain detection is automatic — the user never sees or interacts with a domain selector dropdown
**And** the Python NLP sidecar is started as a subprocess via tauri-plugin-shell when the app launches
**And** the sidecar listens on stdin for JSON-RPC requests and writes responses to stdout (NFR-I2)
**And** the request format is: `{ "id": 1, "method": "detect_domain", "params": { "text": "..." } }`
**And** the response format is: `{ "id": 1, "result": { "domain": "email", "confidence": 0.92 } }`
**And** on error, the response format is: `{ "id": 1, "error": { "code": -32000, "message": "..." } }`
**And** the Python sidecar uses spaCy with a trained intent classifier for domain detection
**And** the sidecar catches all exceptions in its JSON-RPC loop, returns structured error responses, logs to stderr, and never crashes
**Given** the Python sidecar is unavailable (crashed, not installed, or startup failed)
**When** domain detection is requested
**Then** the system falls back to Rust keyword matching in `pipeline::domain` (FR32, NFR-I3)
**And** the keyword fallback detects domains using simple keyword-to-domain mapping (e.g., "compare" → Comparison, "email" → Email)
**And** fallback detection returns a confidence score of 0.5 or lower
**And** Fast Refine continues to work without interruption — domain detection failure never blocks refinement (NFR-I3)
**And** the sidecar process is monitored: if it crashes, it is restarted once; if it crashes again, the system permanently falls back to keyword matching for the remainder of the session
**And** the `detect_domain` Tauri command returns `Result<DomainResult, AppError>` with `SIDECAR_UNAVAILABLE` error code handled silently (not shown to user)
**And** the Python sidecar is packaged with the application distribution (via PyOxidizer or bundled Python environment)

---

### Story 6.2: Domain-Specific Structuring Rules & Universal Fallback

As a user,
I want the app to tailor my refined prompt based on what kind of text I wrote,
So that an email prompt gets email-appropriate structure and a comparison prompt gets comparison-appropriate structure — automatically.

**Acceptance Criteria:**

**Given** a domain has been detected for the user's input (with confidence ≥ threshold)
**When** the prompt is refined via Fast Refine
**Then** domain-specific structuring rules are applied to the refinement output (FR30):
- **Email domain:** emphasizes formal greeting, subject line, polite tone, clear call-to-action
- **Comparison domain:** emphasizes structured table format, criteria columns, pros/cons, recommendation
- **Planning domain:** emphasizes step-by-step structure, timeline, dependencies, milestones
- **Research domain:** emphasizes source citation format, methodology, findings, conclusions
- **Explanation domain:** emphasizes simple language, examples, analogies, progressive complexity
- **Creative domain:** emphasizes narrative structure, tone flexibility, genre awareness, vivid language
- **Technical domain:** emphasizes precision, terminology accuracy, code blocks if applicable, version references
- **General domain:** applies the standard universal adapter (Role, Task, Format, Context) without domain-specific modifications
**Given** the detected domain confidence is below 0.5 (or domain is "General")
**When** the prompt is refined
**Then** the universal prompt adapter rules are applied — the standard Role/Task/Format/Context structure (FR31)
**And** the user is not informed of the domain decision or confidence score — domain detection is invisible to the user
**And** domain-specific rules are implemented as configurable templates in `src-tauri/src/pipeline/domain.rs`
**And** each domain template defines: a weight map for structural components, optional injection phrases, and format preference
**And** the domain detection result influences the LLM Router's prompt structuring but never overrides the user's core intent
**And** the domain rules can be extended with new domains by adding a template entry — no code changes to the core refinement pipeline


---

## Epic 7: Updates, Distribution & Community Foundation

Users receive seamless automatic updates with transparent, readable patch notes in a dedicated review window before applying. Updates download in the background without interrupting work. Users can defer updates. The repository provides a comprehensive CONTRIBUTING.md with build instructions, architecture overview, and contribution workflow. Issues are labeled for first-time contributors. Cross-platform CI/CD (GitHub Actions) ensures build quality for Windows, macOS, and Linux.

### Story 7.1: Auto-Update System

As a user,
I want the app to automatically check for and download updates in the background,
So that I always have the latest version without manually checking or interrupting my work.

**Acceptance Criteria:**

**Given** the application starts
**When** the startup sequence completes
**Then** the app checks for updates via the Tauri built-in updater plugin against the GitHub Releases API (FR37)
**And** if an update is available, a silent background download begins (FR38)
**And** the user is not interrupted during the download — a subtle indicator (small icon in the status area) shows download progress
**And** when the download completes, an `update_downloaded` event is emitted
**And** a Patch Notes window opens displaying:
- New version number and release date
- New features with ✦ icons
- Bug fixes with 🐛 icons
- Breaking changes (if any) with ⚠️ warning highlight (FR39)
**And** the patch notes are rendered from the GitHub Release body in Markdown format
**And** the window has two buttons: "Update Now" (primary, restarts app after install) and "Later" (secondary, defers) (FR40)
**And** if the user selects "Later", the update remains downloaded and the Patch Notes window reopens on the next app launch
**And** the user can also manually check for updates via the settings panel or Command Palette
**And** if the update check fails (no internet, GitHub API rate limited), the app continues normally without error
**And** if the download fails, it retries once after 60 seconds; on second failure, it surfaces a non-blocking error: "Update download failed — check your connection"
**And** the updater is configured via `tauri.conf.json` with the GitHub Releases endpoint URL
**And** the `UPDATE_FAILED` AppError code is used for user-visible update errors
**And** CI/CD via GitHub Actions is configured with a matrix build for Windows (x86_64 .msi), macOS (x86_64 + aarch64 universal .dmg), and Linux (AppImage) (NFR-SC3)
**And** the CI pipeline runs lint → test (Vitest + cargo test) → build (tauri build) → release on version tags

---

### Story 7.2: Community & Contribution Foundation

As a potential contributor,
I want to find a clear CONTRIBUTING.md, architecture documentation, and issues labeled for newcomers,
So that I can quickly understand the project and make my first contribution.

**Acceptance Criteria:**

**Given** a developer visits the Prompt Engineer GitHub repository
**When** they read the documentation
**Then** a `CONTRIBUTING.md` file is present at the repository root containing (FR41):
- Project overview and mission statement
- Prerequisites (Rust, Node.js, pnpm, Python for sidecar, CMake for llama.cpp)
- Step-by-step build instructions: `pnpm install` → `pnpm tauri dev`
- Architecture overview with the directory structure map and key subsystems (LLM Router, Prompt Pipeline, Sidecar IPC, Adapter Registry)
- IPC documentation explaining the Tauri Commands + Events pattern with code examples
- Testing instructions: `pnpm test` (Vitest), `cargo test` (Rust), `pnpm test:e2e` (Playwright)
- Code style guide referencing the naming conventions (snake_case Rust/Python/SQLite, camelCase/PascalCase TypeScript)
- PR workflow: fork → branch → test → PR template → review → merge
- Decision records location (`docs/architecture/decisions/`)
**And** an `IPC.md` file exists in `docs/` with detailed Tauri IPC documentation including all command signatures, event payloads, and error codes
**And** the GitHub repository has issue labels configured:
- `good first issue` — for first-time contributors (FR42)
- `help wanted` — for community contributions
- `bug`, `enhancement`, `documentation`, `adapter` — for categorization
**And** at least 3 issues are pre-labeled as `good first issue` before the first public release
**And** a PR template (`.github/PULL_REQUEST_TEMPLATE.md`) guides contributors through describing changes, testing, and linking issues
**And** the repository README.md includes: project description, screenshot of the Kompass+Prisma UI, quick-start guide, technology badges, and a link to CONTRIBUTING.md
**And** the `LICENSE` file is present at the repository root with the chosen open-source license
