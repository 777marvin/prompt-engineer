---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: ["_bmad-output/brainstorming/brainstorming-session-2026-06-26.md"]
date: 2026-06-27
author: Marvin
---

# Product Brief: Prompt Engineer

## Executive Summary

Prompt Engineer ist ein lokales Desktop-Tool, das Non-Technical-Usern nicht nur bessere LLM-Prompts schreibt, sondern ihnen beibringt, *warum* ein guter Prompt funktioniert. Während das KI-Zeitalter rasant voranschreitet, nutzen 90% der Menschen KI wie einen einfachen Chatbot — ohne zu wissen, was mit durchdachten Prompts, iterativen Loops und zielgerichteter LLM-Adaption möglich ist. Existierende Ansätze (Prompt-Marktplätze, Tutorials, integrierte Vorschläge) scheitern alle an derselben Hürde: Sie setzen voraus, dass der User bereits versteht, wonach er sucht, oder erklären nicht das *Warum*.

Prompt Engineer schließt diese Lücke durch eine didaktisch durchdrungene Architektur: ein lokales LLM für sofortiges Onboarding ohne API-Key, einen dialogischen Master Mode für tiefe Prompt-Verfeinerung, den farbcodierten Prompt-Sezierer zur visuellen Dekonstruktion von Prompt-Strukturen und einen Skill-Tree-basierten Gamification-Lernpfad. Das Tool begegnet dem Nutzer auf Augenhöhe — nicht als Blackbox, sondern als Coach, der die „Landessprache der KI" vermittelt.

Entwickelt aus über 115 Ideen, 57 katalytischen Fragen und einer systematischen Architektur-Analyse über 5 Cluster (Morphological Analysis + SCAMPER), ist Prompt Engineer ein Open-Source-Portfolio-Projekt mit einer klaren Mission: Menschen helfen, im KI-Zeitalter nicht verloren zu gehen.

---

## Core Vision

### Problem Statement

Das KI-Zeitalter beschleunigt sich exponentiell, aber die Mehrheit der Menschen hat keinen Zugang zu effektiver Prompt-Nutzung. Non-Technical-User wissen nicht, was ein Prompt ist, wie er aufgebaut sein sollte oder was mit iterativen Techniken wie Chain-of-Thought, Few-Shot-Prompting oder zielgerichteter LLM-Adaption möglich ist. Sie nutzen KI wie einen simplen Chatbot — und lassen 90% des Potenzials liegen.

### Problem Impact

Bleibt dieses Problem ungelöst, werden diese Menschen in 2-3 Jahren fundamental abgehängt sein. Die Kluft zwischen denen, die KI als Werkzeug beherrschen, und denen, die sie nur oberflächlich bedienen können, wird zur neuen digitalen Spaltung. „Höchste Eisenbahn" — der Zeitpunkt zu handeln ist jetzt, nicht in 3 Jahren.

### Why Existing Solutions Fall Short

- **Prompt-Marktplätze** (PromptBase, SnackPrompt): Setzen voraus, dass User wissen, wonach sie suchen. Für Non-Tech-User zu komplex und unentdeckt.
- **YouTube-Tutorials / Kurse**: „Wer macht das schon?" — Non-Tech-User konsumieren keine technischen Tutorials. Passives Lernen ohne direkten Anwendungsbezug.
- **Integrierte Prompt-Vorschläge** (Poe, Perplexity): Vereinfachen zwar die Eingabe, erklären aber nicht das *Warum*. Der User bleibt abhängig von Vorschlägen, ohne eigenes Verständnis zu entwickeln.
- **Kein Werkzeug vereint „Wie" und „Warum"** in einer zugänglichen, lokalen Desktop-Erfahrung für Einsteiger.

### Proposed Solution

Prompt Engineer ist ein lokales Desktop-Tool, das Non-Technical-User vom reinen Copy-Paste-Konsumenten zum selbstbewussten Prompt-Engineering-Nutzer entwickelt:

- **Zero-to-First-Prompt in unter 60 Sekunden:** Lokales LLM lädt im Hintergrund. Kein Account, kein API-Key, keine Konfiguration nötig beim Start.
- **Zwei Modi, klar differenziert:** *Fast Refine* poliert Rohtext in <500ms (lokal); *Master Mode* führt einen 2-5-stufigen Dialog zur tiefen Prompt-Verfeinerung (Cloud-API).
- **Didaktik als Kern, nicht Add-on:** Der farbcodierte *Prompt-Sezierer* dekonstruiert Prompts visuell (Rolle, Aufgabe, Format, Kontext). Der *Lern-Sezierer* passt seine Komplexität dynamisch ans Skill-Level an. Vorher/Nachher-Diff und Live-Adapter-Vorschau (Claude vs. GPT vs. Gemini) machen Prompt-Engineering greifbar.
- **Gamification mit Tiefgang:** Ein 2-Äste-Skill-Tree (1 Ast = 1 Modus) mit 4 Tiers (Entdecker → Großmeister), Quests, Community-Challenges und Streak-Freeze — spielerisch, aber nicht kindisch.
- **Technische Basis:** Tauri (Rust), hybrides LLM-Modell (lokal: Llama 3.2 1B + Cloud-API-Upgrade), React 18 + Tailwind + Framer Motion GUI, Python-Sidecar für NLP-Domänen-Erkennung.

### Key Differentiators

- **Mission vor Monetarisierung:** Prompt Engineer ist ein Open-Source-Portfolio-Projekt ohne finanzielles Interesse. Die genuine Absicht, Menschen zu helfen, ist die treibende Kraft — und schwer zu kopieren.
- **Non-Tech-Perspektive als Designprinzip:** Jede Designentscheidung wurde aus der Sicht eines technisch unerfahrenen Users getroffen — nicht aus Entwicklerperspektive. 57+ katalytische Fragen in 7 Dimensionen stellten genau diese Sicht sicher.
- **Didaktik + Werkzeug in einem:** Prompt Engineer ist kein Prompt-Generator und kein reines Lern-Tool — es ist beides in einer integrierten Erfahrung. Der User lernt beim Tun, nicht vorher.
- **Architektur als Spiegel der Didaktik:** Skill-Tree-Äste korrespondieren 1:1 mit Produkt-Modi. Der Lern-Sezierer skaliert mit dem Skill-Level. Nichts ist aufgeklebt — jedes Feature trägt sowohl funktional als auch didaktisch.

## Target Users

### Primary Users

#### Persona 1: Sandra — Die interessierte Nicht-Technikerin

**Kontext:** Sandra, 30, arbeitet in einem Pferdestall. Sie hat kein technisches Vorwissen, nutzt KI aber regelmäßig — als Chatbot, nicht als Prompt-Engineering-Werkzeug. Sie weiß, dass KI mehr kann, aber ihr fehlt der Zugang: Was ist ein Prompt, wie baut man ihn richtig, warum sehen gute Prompts so aus wie sie aussehen?

**Motivation & Ziele:** Sandra will selbst gute Prompts schreiben können, um deutlich bessere Outputs zu generieren. Sie ist motiviert zu lernen — sie spürt, dass da Potenzial liegt, das sie nicht abrufen kann. „Ich will die KI richtig nutzen können."

**Problem-Erfahrung:**
- Nutzt KI für verschiedene Anwendungsgebiete (Pferdepflege, Kunden-Mails, Reklamationen, Management, Planung, private Recherche, allgemeine Fragen) — aber immer mit denselben einfachen Eingaben
- Kein Verständnis, *warum* man Prompts strukturiert oder adaptiert
- Kein Wissen, dass es Unterschiede zwischen LLMs gibt
- Frustration: KI-Antworten sind okay, aber nicht großartig — und sie weiß, dass sie besser sein könnten

**Aktuelle Workarounds:** Copy-Paste von irgendwo, einfaches Chatbot-artiges Fragen, kein iteratives Verfeinern

**Erfolgsvision:** „Endlich gibt es sowas." Sandra öffnet Prompt Engineer, sieht direkt was passiert, versteht zum ersten Mal *warum* ein Prompt funktioniert — und kann dieses Wissen sofort anwenden. Sie fühlt sich nicht länger wie im fremden Land ohne Sprachkenntnisse.

**Wert für Sandra:** Vom passiven KI-Konsumenten zur selbstbewussten Anwenderin. Höhere Output-Qualität, weniger Frustration, echtes Verständnis.

---

#### Persona-Gruppe: Die breite Non-Tech-Basis

Neben Sandra deckt Prompt Engineer eine breite Gruppe technisch unerfahrener Nutzer ab, die alle dasselbe Kernproblem teilen — sie wissen nicht, was mit KI möglich ist oder wie man Prompts richtig einsetzt:

| Segment | Typischer Kontext | Kernbedürfnis |
|---------|-------------------|---------------|
| **Schüler** | Lernen, Recherche, Hausaufgaben | Bessere Erklärungen, verstehen statt copy-pasten |
| **Lehrer** | Unterrichtsvorbereitung, Didaktik | KI als Werkzeug verstehen und Schülern vermitteln |
| **Hausfrauen / Rentner** | Alltagsfragen, private Recherche | Einfacher Zugang ohne technische Hürden |
| **Praktiker / Handwerker** | Fachfragen, Kundenkommunikation, Planung | Praktische, direkte Hilfe ohne Schnickschnack |
| **Skeptiker** | Testen, ob KI überhaupt etwas taugt | Niederschwelliger Einstieg, der Vorurteile abbaut |

Allen gemeinsam: Sie suchen nicht aktiv nach „Prompt Engineering" — sie brauchen ein Werkzeug, das ihnen begegnet, sie abholt und ihnen die Landessprache der KI beibringt.

---

### Secondary Users

#### Persona 2: Marvin — Der Power User

**Kontext:** Marvin, tech-affin, nutzt KI täglich und beherrscht Prompt Engineering bereits. Er ist nicht die Zielgruppe, für die das Tool primär entwickelt wird — aber er zieht trotzdem Wert daraus.

**Motivation & Ziele:** Prompts immer weiter verbessern, perfektionieren, experimentieren. Nicht nur „gut genug", sondern exzellent. Interesse an den Unterschieden zwischen LLMs und wie man jedes optimal anspricht.

**Wert aus Prompt Engineer:**
- **Fast Refine** als schnelle Kontrolle und Politur eigener Prompts
- **Master Mode** für tiefe, dialogische Prompt-Verfeinerung
- **Live-Adapter-Vorschau** (Claude vs. GPT vs. Gemini) zum Experimentieren
- **Community-Marktplatz & Blueprint-Bibliothek** als Inspirationsquelle und zum Teilen eigener Prompt-Blueprints

**Sekundär-Nutzen fürs Ökosystem:** Power-User wie Marvin werden zu Multiplikatoren. Sie empfehlen das Tool weiter (an Sandra, an Freunde, an Kollegen), sie erstellen Community-Templates, sie geben Feedback. Sie tragen das Tool in die Welt, während die primären Non-Tech-User es dort nicht aktiv suchen würden.

---

#### Weitere Sekundär-Nutzer

- **Teamleiter / Büro-Entscheider**, die Prompt Engineer im Team einführen — als Produktivitätswerkzeug für Mitarbeiter, die KI bisher nicht effektiv nutzen
- **Lehrer**, die es Schülern empfehlen oder im Unterricht einsetzen — als didaktisches Werkzeug, das *warum* erklärt, nicht nur *was*

---

### User Journey

#### Sandra's Weg mit Prompt Engineer

**1. Discovery — Wie findet sie es?**
Sandra erfährt nicht über GitHub von Prompt Engineer — Non-Tech-User sind dort nicht unterwegs. Sie entdeckt es über:
- Persönliche Empfehlung von Marvin („Schau mal, das hilft dir")
- Social Media: Instagram, YouTube, TikTok — Plattformen, auf denen sich Non-Tech-User bewegen
- Mundpropaganda: „Meine Freundin hat mir das gezeigt"

**2. Onboarding — Die ersten 60 Sekunden**
Sandra öffnet Prompt Engineer. Es erscheint kein leeres Fenster, kein Konfigurationsdialog, kein API-Key-Feld. Stattdessen:
- „Deine KI wird vorbereitet" — das lokale LLM lädt im Hintergrund, ein Fortschrittsbalken zeigt den Status
- Ein Demo-Prompt ist bereits sichtbar, den sie direkt ausprobieren kann
- Nach <60 Sekunden: Sandra tippt ihren ersten eigenen Rohtext ein

**3. Core Usage — Wie sie es täglich nutzt**
Sandra nutzt Prompt Engineer für ihre vielfältigen Anwendungsbereiche:
- **Zuhause:** Allgemeine Fragen, private Recherche, Alltagsplanung
- **Arbeit (Pferdestall):** Pferdepflege-Anleitungen, Kunden-E-Mails, Reklamationen professionell formulieren, Stall-Management und Aufgabenplanung
- **Lernend:** Jedes Mal, wenn sie Fast Refine oder Master Mode nutzt, zeigt der Prompt-Sezierer ihr *warum* der Prompt so aufgebaut wurde. Sie lernt nebenbei — ohne es zu merken.

**4. Der Aha!-Moment**
Sandra nutzt Prompt Engineer das erste Mal und denkt: *„Geil, das kann ich wirklich gebrauchen — und dann ist das auch noch gratis."* Sie vergleicht ihren ursprünglichen Prompt mit dem optimierten Ergebnis im Vorher/Nachher-Diff und versteht zum ersten Mal, *was* sich verändert hat und *warum*. Die Landessprache der KI wird lesbar.

**5. Long-Term — Teil ihrer Routine**
Prompt Engineer wird Sandras täglicher Begleiter:
- Der Skill-Tree zeigt ihr Fortschritte — sie will die nächste Stufe erreichen
- Der Lern-Sezierer zeigt ihr mit steigendem Level mehr Details — sie wächst mit dem Tool
- Irgendwann schreibt sie selbst komplexe Prompts — und nutzt Fast Refine nur noch als finale Politur
- Sie empfiehlt es weiter an Freundinnen und Kollegen

## Success Metrics

### User Success

Prompt Engineer misst Erfolg nicht in Klicks, sondern in Verhaltensänderung. Die zentrale Frage: **Wird der Nutzer vom passiven KI-Konsumenten zum selbstbewussten Prompt-Engineering-Anwender?**

| Metrik | Messung | Zielwert |
|--------|---------|----------|
| **Selbstständigkeit** | Anteil der User, die nach 4 Wochen eigene Prompts ohne Fast Refine verfassen | >50% |
| **Qualitätsbewusstsein** | User nutzt Vorher/Nachher-Diff und erkennt eigenständig Prompt-Schwächen | Wiederkehrendes Verhalten |
| **Skill-Progression** | User steigt mindestens 2 Tiers im Skill-Tree auf (Entdecker → Kenner) | >40% nach 8 Wochen |
| **Power-User-Transition** | Primär-User (Sandra-Typ) wird zum Sekundär-User (Marvin-Typ) — schreibt komplexe Prompts, experimentiert mit Adaptern | Signal, nicht Quote |
| **Multiplikator-Effekt** | User empfiehlt Tool weiter (messbar via „Wie hast du von uns erfahren?") | >30% der neuen User |

**Der qualitative Erfolgsmoment:** Der User realisiert selbst: *„Ich habe KI davor wie ein Affe benutzt."* Dieser Moment markiert den didaktischen Durchbruch — und ist das ultimative Erfolgssignal.

**Verhaltensindikatoren für echten Wert:**
- User kehrt zurück und nutzt den Master Mode (nicht nur Fast Refine)
- User vergleicht Adapter-Vorschauen (Claude vs. GPT vs. Gemini)
- User schreibt und teilt eigene Prompt-Blueprints
- User hilft anderen beim Prompten — trägt das Gelernte weiter

---

### Business Objectives

Da Prompt Engineer ein Open-Source-Portfolio-Projekt ohne finanzielles Interesse ist, werden „Business"-Ziele als **Projekt- und Community-Ziele** definiert:

**3-Monate-Ziele:**
- Community wird auf das Projekt aufmerksam
- Entwickler unterstützen das Projekt aktiv
- **100 GitHub-Sterne** als erstes Signal externer Validierung

**12-Monate-Ziele:**
- Breite Bekanntheit: „Jeder kennt mein Tool"
- Aktive Nutzerbasis, die das Tool regelmäßig einsetzt
- Lebendige Community mit eigenen Beiträgen (Templates, Blueprints, Adapter)
- Entwickler-Contributions (Code, Issues, PRs)
- Social-Media-Präsenz und organische Weiterverbreitung

**Erfolgssignale:**
- Nutzer verwenden das Tool aktiv (nicht nur einmaliger Download)
- Community-Beiträge wachsen organisch (nicht nur vom Maintainer)
- Externe Erwähnungen, Shares, Empfehlungen auf Plattformen wie Instagram, YouTube, TikTok

---

### Key Performance Indicators

| KPI | Typ | Messung | 3-Monate-Ziel | 12-Monate-Ziel |
|-----|-----|---------|---------------|----------------|
| **GitHub Stars** | Community | GitHub API | 100+ | 500+ |
| **Aktive Installationen** | Wachstum | Telemetrie (opt-in, anonym) | 200+ | 2.000+ |
| **Weekly Active Users (WAU)** | Engagement | App-interne Nutzungsstatistik | 50+ | 500+ |
| **Master-Mode-Nutzungsrate** | Tiefe | Anteil User, die Master Mode ≥1×/Woche nutzen | 30% | 50% |
| **Community-Templates** | Community | Anzahl user-erstellter Prompt-Blueprints | 10+ | 100+ |
| **Contributor Count** | Community | Anzahl externer GitHub-Contributors | 3+ | 10+ |
| **Social Shares** | Reichweite | Erwähnungen auf Instagram/YT/TikTok | 5+ | 50+ |
| **Skill-Tree-Progression** | Didaktik | User, die ≥2 Tiers aufsteigen | 20% | 40% |

**Leading Indicators (Frühwarnsignale):**
- Return Rate nach Erst-Download (>40% nach Woche 1 = gesund)
- Time-to-First-Value (<60 Sekunden bis erster verfeinerter Prompt)
- Feature Discovery Rate (Anteil User, die Sezierer oder Adapter-Vorschau finden)

## MVP Scope

### Core Features

Der MVP wird in drei Stufen realisiert, priorisiert nach Nutzerwert und Abhängigkeiten:

#### 🔴 Stufe 1: Unverzichtbarer Kern (6 Wochen)

| Feature | Begründung |
|---------|------------|
| **Lokales LLM** (Llama 3.2 1B, via llama.cpp) | Sandra startet ohne API-Key, ohne Registrierung. Non-Tech-Onboarding ab Sekunde 1. |
| **Fast Refine** (<500ms) | Roher Prompt rein → strukturierter, klarer Prompt raus. Der erste Funke. |
| **Minimale GUI** (Prompt-Eingabe + Output) | Sandra sieht sofort, was passiert. Kein Konfigurationsdialog, kein Setup. |

→ Die absolut kleinste Einheit, die echten Wert liefert: „Pimp my Prompt."

#### 🟡 Stufe 2: MVP+ (direkt anschließend)

| Feature | Begründung |
|---------|------------|
| **Master Mode** (Cloud-API, 2-5 Rückfragen) | Der dialogische Tiefen-Modus. Prompt-Verfeinerung durch Coaching-Dialog. |
| **Prompt-Sezierer** (farbcodiert) | Didaktischer Kern: Sandra versteht *warum* — die farbcodierte Dekonstruktion (Rolle, Aufgabe, Format, Kontext). |
| **1 Ziel-LLM-Adapter** (GPT-4o) | Prompt wird für ein echtes LLM optimiert. Markdown-Hierarchie-Format. |

#### 🟢 Stufe 3: MVP-Komplett (12 Wochen Gesamt)

| Feature | Begründung |
|---------|------------|
| **Python-Sidecar + NLP-Domänen-Erkennung** | spaCy + Intent-Classifier. 6-8 Domänen. Kein manuelles Dropdown. |
| **Weitere Adapter** (Claude XML, Gemini Few-Shot) + Live-Vorschau | 3-Spalten-Ansicht: Nutzer sieht und vergleicht LLM-spezifische Prompt-Formate. |
| **Skill-Tree Grundgerüst + erste Quests** | 2 Äste (Fast Refine / Master), 2 Tiers initial. Tutorial-Quests. |
| **Kommando-Palette** (Ctrl+Shift+P) | Universelle Befehlssuche. Unsichtbare Power-User-Schicht. |

---

### Out of Scope for MVP

| Bereich | Begründung | Zielversion |
|---------|------------|-------------|
| Community-Marktplatz + Blueprint-Bibliothek (Theme 7) | Plattform-Phase, braucht kritische Nutzermasse | v2.0 |
| Lernendes System — Tool adaptiert sich an User (R1) | Komplex, benötigt Nutzungsdaten | v2.0 |
| LLM-selbstgeschriebene Adapter / Meta-Prompting (R2) | Langfristiges Forschungs-Thema | v2.0 |
| Prompt-Inspiration-Feed (A1, Spotify Discover-artig) | Nice-to-have, kein MVP-Kern | v2.0 |
| Streak-Freeze + Community-Challenges | Ohne Userbasis sinnlos | v1.1 |
| Video-Tutorials | Gestrichen (SCAMPER E1) — Sezierer + Inline-Erklärungen ersetzen alle Videos | Nie |
| Badges / Level | Gestrichen (SCAMPER E2) — Skill-Tree deckt Fortschritt ab, Badges redundant | Nie |
| Manuelle Domänen-Auswahl | Gestrichen (SCAMPER E3) — nur Auto-Erkennung | Nie |
| Electron-MVP-Parallelpfad | Entscheidung für Tauri-Direktweg | Nie |

---

### MVP Success Criteria

- **Fast Refine <500ms** mit lokalem LLM (Llama 3.2 1B)
- **First-Run <60 Sekunden** vom Öffnen bis zum ersten verfeinerten Prompt
- **Master Mode** führt realistische 2-5-stufige Rückfragen-Dialoge mit spürbar besserem Output
- **≥80% NLP-Domänen-Erkennung** korrekt (6-8 Domänen)
- **3 Ziel-LLM-Adapter** (GPT-4o, Claude, Gemini) liefern korrekt formatierte, LLM-optimierte Prompts
- **Vorher/Nachher-Diff** visuell klar und für Non-Tech-User verständlich
- **Zero-Onboarding:** Kein Account, kein API-Key, keine Konfiguration nötig beim ersten Start

---

### Future Vision

**v1.1 — Didaktik & Gamification (Themes 4+5, +3-4 Wochen nach MVP):**
- Prompt-Sezierer wird zum **Lern-Sezierer**: Komplexität passt sich dynamisch ans Skill-Level an (C1)
- Skill-Tree vollständig: 4 Tiers (Entdecker → Großmeister), beide Äste, Tutorial- und Tages-Quests
- Vorher/Nachher-Diff automatisch bei jedem Fast-Mode-Durchlauf (C2)

**v2.0 — Plattform-Phase (Themes 7+8, +6-12 Monate):**
- **Prompt-Marktplatz** (C4): User teilen Prompt-Blueprints. „Steam Workshop für Prompts."
- **Blueprint-Bibliothek** (A4): Figma-artiges Browsing-Erlebnis mit Vorschau und „Remix"-Button
- **Lernendes System** (R1): Tool lernt aus User-Überschreibungen und passt Gewichtungen an
- **LLM-selbstgeschriebene Adapter** (R2): Meta-Prompting — LLM beschreibt selbst, wie es optimal angesprochen wird
- Community-Templates, Remix-Kultur, externe Entwickler-Contributions

**3-Jahre-Vision:**
Prompt Engineer ist der Standard-Einstieg ins Prompt Engineering für Nicht-Techniker. Organisch gewachsen durch Community, aktiv auf Social Media geteilt, mit einer lebendigen Entwickler- und Nutzer-Community. Die Mission: Kein Mensch bleibt im KI-Zeitalter zurück, weil er nicht prompten kann.
