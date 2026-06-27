---
stepsCompleted: ["step-01-init", "step-02-discovery", "step-02b-vision", "step-02c-executive-summary", "step-03-success", "step-04-journeys", "step-05-domain", "step-06-innovation", "step-07-project-type", "step-08-scoping", "step-09-functional", "step-10-nonfunctional", "step-11-polish"]
classification:
  projectType: "desktop_app"
  domain: "general"
  complexity: "low"
  projectContext: "greenfield"
inputDocuments: ["_bmad-output/planning-artifacts/product-brief-Prompt Engineer-2026-06-27.md", "_bmad-output/brainstorming/brainstorming-session-2026-06-26.md"]
workflowType: 'prd'
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 1
  projectDocsCount: 0
---

# Product Requirements Document - Prompt Engineer

**Author:** Marvin
**Date:** 2026-06-27

## Executive Summary

Prompt Engineer is a local desktop application that solves a critical and growing problem: 90% of people use AI like a basic chatbot, unaware of what's possible with structured prompts, iterative loops, and LLM-specific adaptation. While the AI era accelerates exponentially, non-technical users are being left behind — not because tools don't exist, but because every existing solution (prompt marketplaces, YouTube tutorials, integrated suggestions) either assumes prior knowledge or fails to explain *why* a prompt works.

Prompt Engineer closes this gap by being both tool and teacher: a local LLM enables instant onboarding with zero configuration, a dialogic Master Mode provides deep prompt refinement through 2-5 coaching exchanges, a color-coded Prompt Dissector visually deconstructs prompt anatomy, and a Skill-Tree-based gamification system creates a progressive learning path. The target audience — from stable hands to teachers to retirees — discovers the "language of AI" not through passive tutorials, but through active, guided practice.

Built as an open-source portfolio project with no financial agenda, Prompt Engineer is driven by a genuine mission: ensuring no one is left behind in the AI age because they can't prompt.

### What Makes This Special

Prompt Engineer is the only tool that unifies *how* (prompt refinement) and *why* (visual didactics) in a single, locally-running desktop experience requiring no account, no API key, and no prior knowledge. Its architecture is the mirror of its pedagogy: every mode maps to a Skill-Tree branch, the Learning Dissector scales complexity with user level, and the Live Adapter Preview shows how the same prompt transforms across Claude, GPT, and Gemini. Unlike prompt marketplaces that assume users know what to search for, or tutorials that demand passive consumption, Prompt Engineer teaches by doing — the user learns prompt engineering *while* engineering prompts.

The core insight: non-technical users don't need simpler prompts handed to them — they need to understand the language. Prompt Engineer is the translator.

## Project Classification

- **Project Type:** Desktop Application (cross-platform via Tauri)
- **Domain:** General (AI/LLM productivity and education tool)
- **Complexity:** Low (no regulatory domain; standard security and UX requirements)
- **Project Context:** Greenfield (new product, no existing codebase)

## Success Criteria

### User Success

Prompt Engineer misst Erfolg nicht in Klicks, sondern in Verhaltensänderung. Die zentrale Frage: **Wird der Nutzer vom passiven KI-Konsumenten zum selbstbewussten Prompt-Engineering-Anwender?**

| Metrik | Messung | Zielwert |
|--------|---------|----------|
| **Selbstständigkeit** | Anteil der User, die nach 4 Wochen eigene Prompts ohne Fast Refine verfassen | >50% |
| **Qualitätsbewusstsein** | User nutzt Vorher/Nachher-Diff und erkennt eigenständig Prompt-Schwächen | Wiederkehrendes Verhalten |
| **Skill-Progression** | User steigt mindestens 2 Tiers im Skill-Tree auf (Entdecker → Kenner) | >40% nach 8 Wochen |
| **Multiplikator-Effekt** | User empfiehlt Tool weiter (messbar via „Wie hast du von uns erfahren?") | >30% der neuen User |

**Der qualitative Erfolgsmoment:** Der User realisiert selbst: *„Ich habe KI davor wie ein Affe benutzt."* Dieser Moment markiert den didaktischen Durchbruch.

**Verhaltensindikatoren für echten Wert:**
- User kehrt zurück und nutzt den Master Mode (nicht nur Fast Refine)
- User vergleicht Adapter-Vorschauen (Claude vs. GPT vs. Gemini)
- User schreibt und teilt eigene Prompt-Blueprints
- User hilft anderen beim Prompten — trägt das Gelernte weiter

### Business Success

Da Prompt Engineer ein Open-Source-Portfolio-Projekt ohne finanzielles Interesse ist, werden „Business"-Ziele als **Projekt- und Community-Ziele** definiert:

| KPI | 3-Monate-Ziel | 12-Monate-Ziel |
|-----|---------------|----------------|
| **GitHub Stars** | 100+ | 500+ |
| **Aktive Installationen** | 200+ | 2.000+ |
| **Weekly Active Users (WAU)** | 50+ | 500+ |
| **Master-Mode-Nutzungsrate** | 30% | 50% |
| **Community-Templates** | 10+ | 100+ |
| **Contributor Count** | 3+ | 10+ |
| **Social Shares** | 5+ | 50+ |
| **Skill-Tree-Progression** | 20% | 40% |

**Leading Indicators (Frühwarnsignale):**
- Return Rate nach Erst-Download (>40% nach Woche 1 = gesund)
- Time-to-First-Value (<60 Sekunden bis erster verfeinerter Prompt)
- Feature Discovery Rate (Anteil User, die Sezierer oder Adapter-Vorschau finden)

### Technical Success

| Metrik | Zielwert |
|--------|----------|
| **Fast Refine Latenz** | <500ms (lokal, Llama 3.2 1B) |
| **First-Run Time-to-Interactive** | <60 Sekunden vom Öffnen bis zum ersten Prompt |
| **NLP-Domänen-Erkennung** | ≥80% Genauigkeit über 6-8 Domänen |
| **Installer-Größe** | <100 MB (inkl. quantisiertem Modell) |
| **Plattform-Support** | Windows, macOS, Linux (Tauri Cross-Platform) |
| **Offline-Fähigkeit** | Fast Refine vollständig offline; Master Mode mit Cloud-Fallback |
| **Zero-Onboarding** | Kein Account, kein API-Key, keine Konfiguration beim ersten Start |

### Measurable Outcomes

- **First-Run Completion Rate:** >90% der User erreichen den ersten verfeinerten Prompt innerhalb von 60 Sekunden nach App-Start
- **Mode Adoption:** >60% der Weekly Active Users nutzen beide Modi (Fast Refine + Master Mode) mindestens einmal
- **Adapter Engagement:** >25% der User vergleichen mindestens zwei LLM-Adapter in der Live-Vorschau innerhalb der ersten 2 Wochen
- **Learning Retention:** >50% der User können nach 4 Wochen ohne Tool-Unterstützung einen strukturierten Prompt mit Rolle, Aufgabe und Format verfassen

## User Journeys

### Journey 1: Sandra — Der Weg zur Selbstständigkeit (Primary Success Path)

**Persona:** Sandra, 30, arbeitet im Pferdestall. Kein technisches Vorwissen, nutzt KI aber regelmäßig als Chatbot. Sie weiß, dass KI mehr kann — aber ihr fehlt der Zugang.

**Opening Scene — Die Frustrierte:** Sandra sitzt abends zuhause. Sie muss eine Reklamation für einen Kunden formulieren und will „die KI" nutzen. Sie tippt: *„Schreib eine Reklamation für Heu das schlecht war."* Die Antwort ist okay — aber nicht großartig. Sie spürt: *Da geht mehr.* Aber sie weiß nicht, wie. Sie hat schon von „Prompt Engineering" gehört, aber das klingt nach Programmierer-Zeug. Nicht für sie.

**Rising Action — Entdeckung und erstes Staunen:**
1. **Discovery:** Marvins Freundin zeigt ihr Prompt Engineer. „Damit schreibst du bessere Prompts — und du verstehst auch warum." Sandra ist skeptisch, aber neugierig.
2. **First Run:** Sie öffnet das Tool. Kein Anmeldebildschirm, kein API-Key-Feld. Stattdessen: *„Deine KI wird vorbereitet"* — ein Fortschrittsbalken, darunter ein Demo-Prompt, den sie direkt ausprobieren kann. Nach ~45 Sekunden ist alles bereit.
3. **Erster Fast Refine:** Sie tippt ihren Heu-Reklamationstext ein, klickt „Verbessern". In unter einer halben Sekunde erscheint ein strukturierter, klarer Prompt mit Rolle, Aufgabe und Format. Sie kopiert ihn, probiert ihn in ChatGPT aus — die Antwort ist *deutlich* besser. *„Wow."*

**Climax — Der Aha-Moment:** Sandra klickt auf den Prompt-Sezierer. Der Prompt wird farbcodiert zerlegt: 🟦 Rolle, 🟩 Aufgabe, 🟨 Format, 🟧 Kontext. Zum ersten Mal *sieht* sie, warum ein Prompt funktioniert. Sie schaltet auf den Vorher/Nachher-Diff. Zeile für Zeile wird sichtbar, was hinzugefügt, geändert, strukturiert wurde. *„Geil — das kann ich wirklich gebrauchen. Und dann ist das auch noch gratis."*

**Resolution — Die Selbstbewusste:** Vier Wochen später. Sandra öffnet Prompt Engineer nicht mehr bei jeder kleinen Frage — sie hat gelernt, Prompts selbst zu strukturieren. Für wichtige E-Mails und komplexe Planungen nutzt sie den Master Mode. Der Skill-Tree zeigt: „Kenner" (Tier 2). Sie hat zwei Freundinnen das Tool empfohlen. Und letzte Woche hat sie zum ersten Mal *von sich aus* den Adapter-Vergleich geöffnet, um zu sehen, wie Claude anders angesprochen wird als GPT. Sie ist nicht mehr Passagier im KI-Zeitalter — sie sitzt am Steuer.

**Emotional Arc:** Frustration → Skepsis → Neugier → Staunen → Aha! → Selbstbewusstsein → Stolz → Multiplikatorin

**Revealed Requirements:** Zero-Onboarding mit Fortschrittsanzeige, Fast Refine <500ms, Prompt-Sezierer mit Farbcodierung, Vorher/Nachher-Diff, Skill-Tree-Fortschrittsanzeige, Master Mode für komplexe Aufgaben, Adapter-Vorschau, Empfehlungs-Mechanismus

---

### Journey 2: Klaus — Der Skeptiker (Primary Edge Case)

**Persona:** Klaus, 58, Rentner, hat „von dieser KI" gehört und ist misstrauisch. „Was soll das bringen? Das ist doch nur Hype." Seine Tochter hat ihm Prompt Engineer installiert. Er öffnet es widerwillig.

**Opening Scene — Der Widerständige:** Klaus starrt auf das Prompt Engineer-Fenster. *„Was soll ich denn damit?"* Kein Textfeld à la Google, kein Chat-Fenster wie WhatsApp. Stattdessen: ein zweigeteiltes Fenster mit einem Demo-Prompt links und einer Erklärung rechts. Er liest widerwillig: *„Schreib hier rein, was du wissen willst — die KI macht einen besseren Prompt daraus."*

**Rising Action — Unerwartete Entdeckung:**
1. **Zögerlicher Erstversuch:** Klaus tippt langsam: *„Was ist besser Olivenöl oder Butter für Bratkartoffeln."* Er drückt „Verbessern". Sofort erscheint ein detaillierter Prompt mit Kontext („Du bist ein erfahrener Koch"), spezifischer Frage und gewünschtem Format („Vergleichstabelle").
2. **Erste Belohnung:** Er kopiert den Prompt in die KI — und bekommt eine fundierte, strukturierte Antwort mit Rauchpunkten, Geschmacksprofilen und einer klaren Empfehlung. *„Hm. Das ist ja eigentlich ganz brauchbar."*
3. **Erkundung:** Er klickt neugierig auf die farbigen Balken im Sezierer. Langsam dämmert ihm: Die KI braucht *Struktur*, nicht nur Stichworte. Wie ein Rezept.

**Climax — Der Umschwung:** Am nächsten Tag öffnet Klaus das Tool *von sich aus*. Er will wissen, welches Smartphone er kaufen soll. Er tippt seine Frage ein — aber diesmal mit einem Gefühl dafür, *wie* er fragen muss. Der Prompt wird verfeinert. Die Antwort der KI ist präzise, vergleichend, mit einer Tabelle. Klaus lehnt sich zurück. *„Vielleicht ist das Internet doch für was gut."*

**Resolution — Der leise Fan:** Klaus nutzt das Tool nicht täglich. Aber wenn er eine Frage hat, öffnet er Prompt Engineer zuerst — nicht Google. Er hat Tier 1 (Entdecker) erreicht. Seiner Tochter hat er nicht gesagt, dass er es nutzt. Aber sie hat gesehen, dass er es nicht deinstalliert hat. Das ist sein Kompliment.

**Emotional Arc:** Misstrauen → Widerwillen → Neugier → Überraschung → Akzeptanz → stille Begeisterung

**Revealed Requirements:** Demo-Prompt beim ersten Start, sofort verständliche UI ohne Chat-Metapher, Fast Refine auch für triviale Fragen, Sezierer-Erklärungen in einfacher Sprache, keine Gamification-Zwang (passiver Fortschritt möglich), Offline-First-Lokalität (kein Account-Zwang), extrem niedrige Einstiegshürde

---

### Journey 3: Marvin — Der Power User (Secondary User)

**Persona:** Marvin, tech-affin, nutzt KI täglich und beherrscht Prompt Engineering bereits. Er ist nicht die primäre Zielgruppe — aber er zieht trotzdem Wert aus dem Tool und wird zum Multiplikator.

**Opening Scene — Der neugierige Experte:** Marvin hat von Prompt Engineer gehört. Er hat selbst schon hunderte Prompts geschrieben und verfeinert. Er erwartet nicht viel — *„Noch ein Prompt-Tool?"* Aber die Idee des Adapter-Vergleichs macht ihn neugierig.

**Rising Action — Tiefgang entdecken:**
1. **Fast Refine als Politur:** Marvin nutzt Fast Refine für Prompts, die er selbst geschrieben hat. Nicht weil er Hilfe braucht — sondern als letzte Qualitätskontrolle. Der Diff zeigt ihm, was das Tool verändert hat. Meistens bestätigt es seine Arbeit. Manchmal fügt es eine Nuance hinzu, die er übersehen hat. *„Gut, das ist nützlich."*
2. **Master Mode als Sparring-Partner:** Marvin schaltet in den Master Mode. Statt eines einfachen Refinements führt das Tool einen Dialog: *„Was genau soll der Output leisten? Soll er überzeugen, informieren oder vergleichen?"* Nach 3 Rückfragen hat das Tool seinen Prompt nicht nur verfeinert — es hat eine Perspektive hinzugefügt, die er nicht bedacht hatte. *„Okay, das ist mehr als ein Tool. Das ist ein Coach."*
3. **Adapter-Vorschau als Spielwiese:** Marvin öffnet die Live-Adapter-Vorschau. Drei Spalten: Claude XML, GPT-4o Markdown, Gemini Few-Shot. Er sieht denselben Prompt in drei radikal verschiedenen Strukturen. Er beginnt zu experimentieren — modifiziert, vergleicht, optimiert. *„Das ist wie ein LLM-Labor."*

**Climax — Der Multiplikator-Moment:** Marvin erstellt seinen ersten eigenen Prompt-Blueprint und teilt ihn — noch nicht im Marktplatz, aber er zeigt ihn seinem Kollegen. Der Kollege, ein Nicht-Techniker, versteht sofort: *„Ach so baut man das also auf."* Marvin realisiert: Dieses Tool erklärt besser als er es je könnte.

**Resolution — Der Botschafter:** Marvin empfiehlt Prompt Engineer aktiv weiter. Er wird zum Early Contributor auf GitHub, schlägt Features vor, testet Pre-Releases. Er ist nicht die Zielgruppe — aber er ist der Beweis, dass das Tool auch für Experten Tiefgang hat.

**Emotional Arc:** Skepsis → Neugier → Respekt → Experimentierfreude → Stolz (Beitrag) → Botschafter

**Revealed Requirements:** Fast Refine als optionale Qualitätskontrolle, Master Mode als echter Coaching-Dialog (nicht trivial), Live-Adapter-Vorschau in Mehrspalten-Ansicht, Blueprint-Erstellung und -Export, Beitrags- und Feedback-Kanäle für Power-User, CLI/Advanced-Modus via Kommando-Palette

---

### Journey 4: Lena — Die Open-Source-Contributorin (Developer)

**Persona:** Lena, 26, Softwareentwicklerin, sucht ein Open-Source-Projekt zum Beitragen. Sie interessiert sich für LLMs und Rust. Prompt Engineer kombiniert beides.

**Opening Scene — Die Suchende:** Lena stöbert auf GitHub nach Projekten mit „Rust" und „LLM". Prompt Engineer taucht auf — Tauri, llama.cpp, Python-Sidecar. Die Architektur interessiert sie. Sie klont das Repo.

**Rising Action:**
1. **First Build:** Sie folgt der CONTRIBUTING.md. `cargo build` läuft durch — in unter 2 Minuten. Unit-Tests sind grün. Die Dev-Dokumentation erklärt die IPC-Architektur klar. *„Gut strukturiertes Projekt."*
2. **First Contribution:** Sie findet ein „good first issue"-Label. Ein Bug im NLP-Fallback: wenn der Python-Sidecar nicht erreichbar ist, crasht die Keyword-Erkennung. Sie schreibt einen Fix, fügt einen Test hinzu, öffnet eine PR. Der Maintainer reviewt innerhalb von 24 Stunden. Die PR wird gemerged.
3. **Deeper Engagement:** Sie abonniert die Diskussions-Issues. Die Community ist klein, aber aktiv und respektvoll. Sie schlägt einen neuen Adapter für Llama 3 vor, diskutiert die Prompt-Struktur mit anderen Contributors.

**Climax — Ownership:** Lena übernimmt die Verantwortung für den Python-Sidecar-IPC-Layer. Sie refactored die stdin/stdout-Kommunikation zu einem robusten Request/Response-Protokoll mit Timeout-Handling. Ihr Code läuft in der nächsten Release.

**Resolution — Die Maintainerin:** Sechs Monate später ist Lena Core Contributor. Sie reviewt PRs, schreibt Changelogs, begrüßt neue Contributors. Prompt Engineer ist *ihr* Projekt geworden — nicht nur ein Eintrag im GitHub-Profil.

**Emotional Arc:** Neugier → technische Befriedigung → Akzeptanz → Verantwortung → Stolz → Ownership

**Revealed Requirements:** Saubere CONTRIBUTING.md, schneller Build (<5 Min), hohe Testabdeckung, „good first issue"-Labels, IPC-Dokumentation, aktive Maintainer, Code-Review-Kultur, modulare Architektur (Adapter-Plugins), Decision Records für Architekturentscheidungen

---

### Journey Requirements Summary

| Journey | Key Capabilities Required |
|---------|--------------------------|
| **Sandra (Success Path)** | Zero-Onboarding, Fast Refine <500ms, Prompt-Sezierer, Vorher/Nachher-Diff, Skill-Tree, Master Mode, Adapter-Vorschau |
| **Klaus (Edge Case)** | Demo-Prompt, einfache Sprache im Sezierer, passive Gamification, Offline-First, extrem niedrige Einstiegshürde |
| **Marvin (Power User)** | Fast Refine als Politur, echter Coaching-Dialog im Master Mode, Live-Adapter-Vorschau, Blueprint-Export, Kommando-Palette |
| **Lena (Contributor)** | CONTRIBUTING.md, schneller Build, Testabdeckung, „good first issue"-Labels, IPC-Dokumentation, modulare Architektur |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Didaktik-Architektur-Kopplung (Architecture as Pedagogy):** Prompt Engineer ist das einzige Prompt-Tool, dessen Architektur die Didaktik nicht als Add-on behandelt, sondern strukturell spiegelt: Jeder Modus korrespondiert 1:1 mit einem Skill-Tree-Ast, die Komplexität des Lern-Sezierers skaliert mit dem Skill-Tier, und der Prompt-Sezierer ist kein separates Tutorial-Fenster, sondern in den Refinement-Workflow integriert. Nichts ist „aufgeklebt" — jedes Feature trägt sowohl funktional als auch didaktisch.

**2. Prompt-Sezierer (Visual Prompt Dissection):** Statt textueller Erklärungen dekonstruiert eine farbcodierte, interaktive Ansicht Prompts in ihre Strukturkomponenten (🟦 Rolle, 🟩 Aufgabe, 🟨 Format, 🟧 Kontext). Der User versteht Prompt Engineering nicht durch Lesen, sondern durch Sehen — ein didaktischer Ansatz, den kein existierendes Tool verfolgt.

**3. Live-Adapter-Vorschau (Cross-LLM Transparency):** Drei Spalten zeigen denselben Prompt in Echtzeit transformiert für Claude (XML), GPT-4o (Markdown-Hierarchie) und Gemini (Few-Shot). Diese direkte Vergleichbarkeit macht LLM-Unterschiede für Non-Technical-User erstmals greifbar — und wird gleichzeitig zum Lernwerkzeug und zur Experimentierplattform für Power-User.

**4. Lern-Sezierer (Adaptive Learning UI):** Die UI-Komplexität passt sich dynamisch ans Skill-Level des Users an. Ein Tier-1-User sieht 2 Farben im Sezierer, ein Tier-4-User sieht 7+ Dekonstruktionsebenen mit Chain-of-Thought-Sichtbarkeit. Das Tool wächst mit dem User — ein Muster, das aus dem Gaming (Skill-Trees) entlehnt und auf Produktivitätssoftware übertragen wurde.

**5. Zero-Onboarding Desktop-KI:** Lokales LLM (Llama 3.2 1B) lädt im Hintergrund, kein Account, kein API-Key, keine Konfiguration. Der User beginnt in unter 60 Sekunden mit dem Prompten. Diese Einstiegshürde unterscheidet Prompt Engineer fundamental von allen Cloud-basierten Alternativen.

### Market Context & Competitive Landscape

**Existierende Lösungen und ihre Lücken:**

| Ansatz | Beispiele | Warum es scheitert |
|--------|-----------|-------------------|
| Prompt-Marktplätze | PromptBase, SnackPrompt | Setzen Vorwissen voraus — User muss wissen, wonach er sucht |
| Video-Tutorials / Kurse | YouTube, Udemy | Non-Tech-User konsumieren keine technischen Tutorials; passiv, kein direkter Anwendungsbezug |
| Integrierte Vorschläge | Poe, Perplexity | Vereinfachen Eingabe, erklären aber nicht das *Warum* — User bleibt abhängig |
| Prompt-IDEs | PromptPerfect, AIPRM | Für Entwickler/Profis; überfordernd für Non-Tech-User |

**Weißer Fleck:** Kein existierendes Werkzeug vereint Prompt-Verfeinerung mit didaktischer Erklärung in einer lokalen, barrierefreien Desktop-Erfahrung. Prompt Engineer besetzt diese Lücke durch die Kombination aus lokalem LLM (Zero-Onboarding), dialogischem Master Mode (Coach statt Generator) und visueller Didaktik (Sezierer statt Text-Tutorials).

### Validation Approach

**Innovationsspezifische Validierung:**

| Innovation | Validierungsmethode | Erfolgskriterium |
|------------|-------------------|-----------------|
| Didaktik-Architektur-Kopplung | A/B-Test: Tool mit vs. ohne Skill-Tree-Kopplung | User mit Kopplung steigen ≥30% häufiger im Skill-Tree auf |
| Prompt-Sezierer | User-Test mit 5 Non-Tech-Usern: „Erkläre, warum dieser Prompt funktioniert" | ≥4/5 können nach 1 Nutzung die Prompt-Struktur erklären |
| Live-Adapter-Vorschau | Tracking: Anteil User, die ≥2 Adapter vergleichen | >25% innerhalb der ersten 2 Wochen |
| Lern-Sezierer | Kohortenanalyse: Tier-1 vs. Tier-3 Sezierer-Nutzung | Tier-3-User nutzen ≥3 Ebenen des Sezierers aktiv |
| Zero-Onboarding Desktop-KI | Time-to-First-Value-Messung | >90% erreichen ersten verfeinerten Prompt <60s |

**Qualitative Validierung:** Der *„Ich habe KI davor wie ein Affe benutzt"*-Moment. Dieser Satz eines Test-Users ist der ultimative didaktische Validierungspunkt.

## Desktop Application Specific Requirements

### Project-Type Overview

Prompt Engineer ist eine native Cross-Platform-Desktop-Anwendung via Tauri (Rust-Backend + WebView-Frontend). Die Wahl für Tauri statt Electron wurde in der Morphological Analysis getroffen: <10 MB Installer-Größe, Rust-Performance für lokale LLM-Inferenz, und native System-Integration ohne Chromium-Overhead. Das Frontend nutzt React 18 + Tailwind + Framer Motion für eine visuell beeindruckende GUI.

### Platform Support

| Plattform | Priorität | Mindestversion | Anmerkung |
|-----------|-----------|---------------|-----------|
| **Windows** | Primär (Tier 1) | Windows 10+ | Hauptzielplattform für Non-Tech-User |
| **macOS** | Tier 1 | macOS 12 (Monterey)+ | Sowohl Intel als auch Apple Silicon (Universal Binary) |
| **Linux** | Tier 2 | Ubuntu 22.04+, AppImage/Flatpak | Für Entwickler und technisch versierte User |

**Entscheidungen:**
- Tauri v2 für Cross-Platform-Builds aus einer Codebase
- Universal Binary für macOS (x86_64 + aarch64)
- Linux-Distribution via AppImage (primär) und Flatpak (sekundär)
- Kein Windows 7/8-Support — Tauri v2 setzt WebView2 voraus (Windows 10+)

### System Integration

**Lokales LLM:**
- llama.cpp Rust-Bindings (llama-cpp-rs) für lokale Inferenz
- Quantisiertes Llama 3.2 1B Modell (Q4_K_M, ~1.2 GB)
- Modell-Download im Hintergrund beim First Run mit Fortschrittsanzeige
- Modell-Pfad: `{app_data_dir}/models/`

**Python-Sidecar (NLP):**
- Separater Python-Prozess für spaCy + Intent-Classifier
- Kommunikation via stdin/stdout JSON-RPC
- Fallback auf Rust-Keyword-Matching wenn Sidecar nicht verfügbar
- Python-Environment: embedded via PyOxidizer oder miniconda-portable

**IPC-Architektur (Tauri Bridge):**
- Tauri Commands: `invoke('fast_refine', { input })`, `invoke('master_mode', { input, context })`
- Events: `listen('llm_progress', ...)`, `listen('model_ready', ...)`
- State Management: Tauri State für LLM Router, Settings, Skill Tree Engine

**API-Key-Speicherung:**
- Optionaler Cloud-API-Key (OpenAI, Anthropic, Google)
- Verschlüsselte Speicherung via OS-Keychain (Windows Credential Manager, macOS Keychain, Linux libsecret)

### Update Strategy

**Mechanismus:**
- Tauri Built-in Updater (`tauri-plugin-updater`)
- Automatic check for updates on application start
- Update-Dialog mit Patch Notes vor Installation
- Hintergrund-Download des Update-Pakets

**Update-Flow:**
1. App-Start → Update-Check gegen GitHub Releases API
2. Update verfügbar → Download im Hintergrund
3. Download abgeschlossen → Patch-Notes-Fenster öffnet sich
4. User bestätigt → App installiert Update und startet neu
5. Kein Zwangsupdate — User kann Update verschieben

**Patch Notes Fenster:**
- Markdown-Rendering der Release Notes
- Zeigt Version, Datum, neue Features, Bugfixes, Breaking Changes
- „Jetzt aktualisieren" / „Später" Buttons

**Update-Server:** GitHub Releases (kostenlos, Open-Source-kompatibel)

### Offline Capabilities

| Feature | Offline | Anmerkung |
|---------|---------|-----------|
| **Fast Refine** | ✅ Vollständig offline | Lokales LLM (Llama 3.2 1B) |
| **Prompt-Sezierer** | ✅ Vollständig offline | Reine UI-Logik, kein LLM nötig |
| **Vorher/Nachher-Diff** | ✅ Vollständig offline | Client-seitiger Textvergleich |
| **Skill-Tree-Anzeige** | ✅ Vollständig offline | Lokaler State |
| **Master Mode** | ❌ Benötigt Internet | Cloud-API für dialogische Verfeinerung |
| **Live-Adapter-Vorschau** | ❌ Benötigt Internet | Cloud-APIs für LLM-spezifische Formatierung |
| **NLP-Domänen-Erkennung** | ⚠️ Teilweise | Python-Sidecar lokal; Cloud-Fallback für komplexe Fälle |
| **Modell-Download** | ❌ Initialer Download nötig | Einmalig ~1.2 GB; danach vollständig offline |

**Offline-Erkennung:**
- Tauri Network Status API zur Erkennung der Konnektivität
- UI-Indikator: „Offline — Advanced Features nicht verfügbar"
- Master Mode Button ausgegraut mit Tooltip: „Internetverbindung benötigt"

### Implementation Considerations

**Installer-Größe:** Ziel <100 MB inkl. quantisiertem Modell. Tauri-Binary selbst <10 MB, Modell ~1.2 GB — Prüfung: Modell als separater, optionaler Download?

**First-Run-Experience:**
- Modell-Download mit Fortschrittsbalken und informativen Facts („Wusstest du, dass...")
- Demo-Prompt sofort interaktiv während Download
- Time-to-Interactive <60 Sekunden (Modell-Download läuft asynchron weiter)

**Performance:**
- Fast Refine: Ziel <500ms (lokale Inferenz auf Consumer-Hardware)
- UI: 60fps Framer-Motion-Animationen via WebView2/WebKit
- Speicher: <500 MB RAM im Idle, <2 GB während Inferenz

**Testing-Matrix:**
- Windows 10, Windows 11
- macOS 12, 13, 14 (Intel + Apple Silicon)
- Ubuntu 22.04, 24.04

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP — die absolut kleinste Einheit, die echten Nutzerwert liefert. Prompt Engineer's MVP-Philosophie ist: *Ein Non-Technical-User öffnet das Tool, tippt Rohtext ein und bekommt in unter 60 Sekunden einen deutlich besseren Prompt — ohne Account, ohne API-Key, ohne Konfiguration.* Jedes weitere Feature muss sich an dieser Kernwert-These messen: „Macht es den Prompt besser oder macht es den User besser?"

**Ressourcen:** Solo-Entwickler mit Open-Source-Community-Unterstützung. Die Architektur (Tauri + React + Python-Sidecar) ist auf Ein-Personen-Entwickelbarkeit ausgelegt. Community-Beiträge werden via „good first issue"-Labels und modularer Adapter-Architektur kanalisiert.

**Validierungsstrategie:** Jede MVP-Stufe wird mit 3–5 Non-Tech-Usern getestet. Der qualitative Erfolgsmoment („Ich habe KI davor wie ein Affe benutzt") ist der ultimative MVP-Validierungspunkt.

### MVP Feature Set (Phase 1 — 12 Wochen)

**Core User Journeys Supported:**
- Sandra (Primary Success Path): Vollständig — von Zero-Onboarding bis Skill-Tree-Progression
- Klaus (Skeptiker): Vollständig — Offline-First, einfache Sprache, passive Gamification
- Marvin (Power User): Teilweise — Fast Refine, Master Mode, Adapter-Vorschau; Blueprint-Export und Community-Features in Phase 2

**Must-Have Capabilities:**

*Stufe 1 — Unverzichtbarer Kern (Woche 1–6):*
- Lokales LLM (Llama 3.2 1B, llama.cpp) — Start ohne API-Key
- Fast Refine (<500ms) — Rohtext → strukturierter Prompt
- Minimale GUI — Prompt-Eingabe + Output, kein Setup-Dialog

*Stufe 2 — MVP+ (direkt anschließend):*
- Master Mode (Cloud-API, 2–5 Rückfragen) — Dialogische Prompt-Verfeinerung
- Prompt-Sezierer (farbcodiert: Rolle, Aufgabe, Format, Kontext)
- 1 Ziel-LLM-Adapter (GPT-4o, Markdown-Hierarchie)

*Stufe 3 — MVP-Komplett (Woche 7–12):*
- Python-Sidecar + NLP-Domänen-Erkennung (spaCy, 6–8 Domänen)
- 3 Ziel-LLM-Adapter (GPT-4o, Claude XML, Gemini Few-Shot) + Live-Vorschau
- Skill-Tree Grundgerüst (2 Äste, 2 Tiers initial) + Tutorial-Quests
- Kommando-Palette (Ctrl+Shift+P)

**Explizit ausgeschlossen aus MVP:**
- Community-Marktplatz + Blueprint-Bibliothek (→ v2.0)
- Lernendes System / User-Adaption (→ v2.0)
- LLM-selbstgeschriebene Adapter / Meta-Prompting (→ v2.0)
- Prompt-Inspiration-Feed (→ v2.0)
- Streak-Freeze + Community-Challenges (→ v1.1)
- Video-Tutorials (→ nie — Sezierer + Inline-Erklärungen ersetzen alle Videos)
- Badges / separate Level (→ nie — Skill-Tree deckt Fortschritt ab)
- Manuelle Domänen-Auswahl (→ nie — nur Auto-Erkennung)

### Post-MVP Features

**Phase 2: Growth (v1.1, +3–4 Wochen nach MVP)**

- Prompt-Sezierer wird zum **Lern-Sezierer**: Komplexität passt sich dynamisch ans Skill-Level an (Tier 1: 2 Farben, Tier 4: 7+ Ebenen)
- Skill-Tree vollständig: 4 Tiers (Entdecker → Kenner → Experte → Großmeister), beide Äste, Tages-Quests
- Vorher/Nachher-Diff automatisch bei jedem Fast-Refine-Durchlauf
- Streak-Freeze (1× pro Woche, verdient durch Quests)
- Verbesserte NLP-Domänen-Erkennung durch nutzungsbasierte Verfeinerung

**Phase 3: Expansion (v2.0, +6–12 Monate)**

- **Prompt-Marktplatz:** User teilen Prompt-Blueprints. „Steam Workshop für Prompts."
- **Blueprint-Bibliothek:** Figma-artiges Browsing-Erlebnis mit Vorschau und „Remix"-Button
- **Lernendes System:** Tool lernt aus User-Überschreibungen und passt Gewichtungen an
- **LLM-selbstgeschriebene Adapter:** Meta-Prompting — LLM beschreibt selbst, wie es optimal angesprochen wird
- Community-Templates, Remix-Kultur, externe Entwickler-Contributions
- Prompt-Inspiration-Feed (Spotify Discover Weekly-artig)

**3-Jahre-Vision:** Prompt Engineer ist der Standard-Einstieg ins Prompt Engineering für Nicht-Techniker. Organisch gewachsen durch Community, aktiv auf Social Media geteilt, mit lebendiger Entwickler- und Nutzer-Community.

### Risk Mitigation Strategy

**Technische Risiken:**

| Risiko | Impact | Mitigation |
|--------|--------|------------|
| Lokales LLM zu schwach für sinnvolle Verfeinerung | Hoch | Fast Refine auf „Politur" beschränken (Grammatik, Struktur, Klarheit); Cloud-API-Upgrade als expliziter Pfad |
| Python-Sidecar-IPC instabil | Mittel | Rust-Keyword-Fallback für alle NLP-Funktionen; Sidecar als optionaler Enhancement-Layer |
| llama.cpp Cross-Platform-Builds instabil | Mittel | Pre-built Binaries für alle Plattformen; CI/CD-Testmatrix vor Release |
| Modell-Download >1 GB schreckt User ab | Mittel | Asynchroner Download mit Fortschritt; Demo-Prompt sofort nutzbar; Modell als optionaler separater Download evaluierbar |

**Markt-Risiken:**

| Risiko | Impact | Mitigation |
|--------|--------|------------|
| Non-Tech-User finden das Tool nie | Hoch | Multiplikator-Strategie (Power-User → Empfehlung); Social-Media-Präsenz auf Non-Tech-Plattformen (Instagram, TikTok) |
| User erwarten „Magie" und sind enttäuscht | Mittel | Demo-Prompt zeigt realistisches Vorher/Nachher; Fortschrittsbalken kommuniziert technische Realität |
| User bleiben im Fast Refine stecken | Mittel | Kontextueller Hinweis nach 5 Nutzungen: „Bereit für mehr Tiefe?"; Master Mode als „nächster logischer Schritt" positioniert |
| Open-Source ohne Monetarisierung nicht nachhaltig | Niedrig | Portfolio-Projekt ohne finanzielles Interesse; Community-Getriebenheit als inhärente Nachhaltigkeit |

**Ressourcen-Risiken:**

| Risiko | Impact | Mitigation |
|--------|--------|------------|
| Solo-Entwickler kann 12-Wochen-Zeitplan nicht halten | Mittel | MVP in 3 unabhängig releasbaren Stufen; Stufe 1 (6 Wochen) als erstes Release-Ziel; Open-Source-Community als Verstärkung |
| Python-Sidecar-Komplexität unterschätzt | Niedrig | Sidecar erst in Stufe 3; Rust-Keyword-Fallback deckt Stufe 1+2 ab |
| Keine Community-Contributions in frühen Phasen | Mittel | „Good first issue"-Labels ab Tag 1; aktive Einladungskultur in README und CONTRIBUTING.md |

## Functional Requirements

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

## Non-Functional Requirements

### Performance

| NFR | Requirement | Measurement |
|-----|-------------|-------------|
| NFR-P1 | Fast Refine response time | <500ms from input submission to refined prompt display (local LLM, Llama 3.2 1B) |
| NFR-P2 | First-Run time-to-interactive | <60 seconds from application launch to first prompt refinement possible |
| NFR-P3 | UI rendering frame rate | 60fps for all Framer Motion transitions and animations |
| NFR-P4 | Application idle memory | <500 MB RAM with loaded LLM model |
| NFR-P5 | Application inference memory | <2 GB RAM during active local LLM inference |
| NFR-P6 | Installer package size | <100 MB (excluding optional model download) |
| NFR-P7 | Local LLM model size | <1.5 GB (quantized Q4_K_M format) |
| NFR-P8 | Master Mode response time | Cloud API-dependent; user perceives <3 seconds per dialog turn under normal network conditions |
| NFR-P9 | Application cold start | <3 seconds to UI-ready state (model may still be loading) |

### Security

| NFR | Requirement |
|-----|-------------|
| NFR-S1 | Cloud API keys stored exclusively in OS-native credential store (Windows Credential Manager, macOS Keychain, Linux libsecret) |
| NFR-S2 | API keys never logged, displayed in plaintext after initial entry, or transmitted to any endpoint other than the corresponding LLM provider |
| NFR-S3 | All LLM API communication conducted over HTTPS/TLS 1.3 |
| NFR-S4 | Local LLM model and user prompt history stored in application-local directories; no telemetry or data exfiltration without explicit opt-in |
| NFR-S5 | User prompt data processed locally for Fast Refine; transmitted to cloud provider only when user explicitly uses Master Mode or Adapter features |

### Scalability

| NFR | Requirement |
|-----|-------------|
| NFR-SC1 | Application functions as standalone desktop software with no centralized server dependency for core features |
| NFR-SC2 | Adapter plugin system supports community-contributed adapters without application recompilation |
| NFR-SC3 | Repository and CI/CD infrastructure supports external contributor pull requests with automated build verification |
| NFR-SC4 | GitHub Releases-based update distribution scales to thousands of concurrent downloads without additional infrastructure cost |

### Accessibility

| NFR | Requirement |
|-----|-------------|
| NFR-A1 | All core functionality operable via keyboard navigation (Fast Refine, Master Mode, Dissector, command palette) |
| NFR-A2 | Color-coded prompt dissection supplemented with non-color differentiators (labels, patterns, icons) for color-blind users |
| NFR-A3 | UI supports operating system font scaling up to 150% without layout breakage |
| NFR-A4 | Interface language defaults to operating system locale; English and German supported in MVP |
| NFR-A5 | Educational content in Prompt Dissector uses plain, non-technical language targeting users with no prior AI knowledge |

### Integration

| NFR | Requirement |
|-----|-------------|
| NFR-I1 | Master Mode supports OpenAI API (GPT-4o), Anthropic API (Claude 3.5 Sonnet), and Google AI API (Gemini 1.5 Flash) |
| NFR-I2 | Python NLP sidecar communicates via stdin/stdout JSON-RPC with structured error codes |
| NFR-I3 | Fast Refine operates with full functionality when Python sidecar is unavailable (Rust keyword fallback) |
| NFR-I4 | Update mechanism integrates with GitHub Releases API for version checking and binary download |
| NFR-I5 | Adapter output formats conform to each target LLM's documented best practices (XML for Claude, Markdown for GPT, Few-Shot for Gemini) |

