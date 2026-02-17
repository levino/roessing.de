# Claude Konfiguration für roessing.de

## 🌐 Spracheinstellungen

**⚠️ WICHTIG: Claude MUSS ausschließlich auf Deutsch kommunizieren!**

### Sprachrichtlinien:
- **Alle** Antworten, Code-Kommentare und Erklärungen müssen auf Deutsch verfasst werden
- Deutsche Terminologie für technische Begriffe verwenden, wo sinnvoll
- Bei Code-Reviews und technischen Diskussionen deutsche Fachsprache nutzen
- Commit-Messages auch auf Deutsch
- GitHub Issues und Pull Requests auf Deutsch beantworten
- Fehlermeldungen und Statusberichte auf Deutsch formulieren
- Magic keywords von github auf English nutzen (fixes, closes, close, fix). Deutsche Übersetztungen funktionieren nicht.

## 📁 Projektübersicht

Dies ist die persönliche Website von Levin Keller (roessing.de), aufgebaut mit modernen Web-Technologien.

### Tech-Stack:
- **Framework**: Astro (Static Site Generator)
- **Page Builder**: Shipyard (entwickelt von Levin Keller) - basiert auf Astro
- **Sprachen**: TypeScript, JavaScript
- **Styling**: Tailwind CSS, DaisyUI
- **Testing**: Vitest (Unit-Tests), Playwright (E2E-Tests), Cypress
- **Paketmanager**: npm

## 🚢 Shipyard Framework

Diese Website wird mit **Shipyard** gebaut, einem Page-Builder-Framework von Levin Keller, das auf Astro basiert. Es ist von der API und dem Funktionsumfang her Docusaurus nachempfunden.

**Dokumentation**: https://shipyard.levinkeller.de

### Shipyard Pakete:
- **@levino/shipyard-base**: Basis-Komponenten, Layouts und Styling (Navigation, Footer, etc.)
- **@levino/shipyard-docs**: Dokumentations-Features
- **@levino/shipyard-blog**: Blog-Funktionalität mit Layouts und Collections

## 🚀 Deployment

**⚠️ WICHTIG: Diese Seite wird als Cloudflare WORKER deployed – NICHT als Cloudflare Pages!**

### Architektur:
- **Deployment-Typ**: Cloudflare Worker mit Static Assets
- **Konfiguration**: `wrangler.toml` (Worker-Name: `roessing-de`)
- **Build-Output**: `dist/` (Astro Static Build)
- **Production-URL**: `https://www.xn--rssing-wxa.de/` (IDN für rössing.de)
- **Preview-URLs**: `https://{branch}-roessing-de.post-505.workers.dev`

### Build-Umgebungsvariablen (Cloudflare Workers Builds):
- `WORKERS_CI_BRANCH` – Aktueller Git-Branch (wird in `astro.config.mjs` für die Site-URL verwendet)
- `WORKERS_CI_COMMIT_SHA` – Commit-Hash
- `WORKERS_CI` – Ist `1` wenn im Worker-CI gebaut wird
- `CI` – Ist `true` im CI

### Infrastruktur:
- Git-Integration: Automatische Builds bei Push auf beliebigen Branch
- Preview-Deployments für alle Branches aktiviert

## 🛠️ Entwicklungsrichtlinien

### Code-Standards:
1. **TypeScript bevorzugen**: Neue Dateien sollten in TypeScript geschrieben werden
2. **Komponenten-Struktur**:
   - Astro-Komponenten in `src/components/`
   - Layouts in `src/layouts/`
   - Seiten in `src/pages/`
3. **Styling**:
   - Tailwind CSS für Utility-First Styling nutzen
   - DaisyUI-Komponenten wo passend einsetzen
   - Keine Inline-Styles außer in Ausnahmefällen

### Verfügbare Befehle:
```bash
npm run setup      # Abhängigkeiten installieren (NICHT npm install verwenden!)
npm run dev        # Entwicklungsserver starten (localhost:4321)
npm run build      # Produktions-Build erstellen
npm run preview    # Build lokal testen
npm run check      # Astro-Type-Checking
npm run test       # Vitest-Tests ausführen
npm run e2e        # Playwright-Tests ausführen
npm run format     # Code formatieren mit Biome (Linting + Formatting + Import-Sortierung)
```

### ⚠️ Vor jedem Commit
**WICHTIG:** Vor jedem Commit MUSS `npm run format` ausgeführt werden, um sicherzustellen, dass der Code korrekt formatiert ist. Dies wird auch automatisch durch lefthook beim Commit geprüft.

### Testing-Strategie:
- Unit-Tests mit Vitest für Komponenten-Logik
- E2E-Tests mit Playwright für kritische User-Flows
- Performance-Checks mit Unlighthouse

## 💬 Kommunikationsrichtlinien

### Antwortformat:
- Höflich und professionell auf Deutsch kommunizieren
- Kurze, präzise Antworten ohne überflüssige Erklärungen
- Bei komplexen Aufgaben strukturierte Schritt-für-Schritt-Anleitungen
- Code-Beispiele mit deutschen Kommentaren versehen

### Bei Code-Reviews:
- Konstruktives Feedback auf Deutsch
- Verbesserungsvorschläge mit Beispielen
- Sicherheitsaspekte und Best Practices hervorheben
- Performance-Optimierungen vorschlagen

### Fehlerbehandlung:
- Fehlermeldungen auf Deutsch übersetzen und erklären
- Lösungsvorschläge anbieten
- Auf relevante Dokumentation verweisen

## 📝 Git-Konventionen

### Commit-Messages:
- Können auf Englisch bleiben (Branchen-Standard)
- Format: `type(scope): description`
- Typen: feat, fix, docs, style, refactor, test, chore

### GitHub-Keywords:
**⚠️ WICHTIG: GitHub-Keywords MÜSSEN auf Englisch bleiben!**
- Keywords wie `fix`, `fixes`, `close`, `closes`, `resolve`, `resolves` für automatisches Issue-Schließen
- Diese Keywords funktionieren nur auf Englisch und sollten NICHT übersetzt werden
- Beispiel: `fix: Update navigation (#123)` - "fix" bleibt Englisch
- In PR-Beschreibungen: `Closes #123` - nicht "Schließt #123"

### Branch-Namen:
- Feature: `feature/beschreibung`
- Bugfix: `fix/beschreibung`
- Claude-generiert: `claude/issue-{nummer}-{datum}-{zeit}`

## 📅 Veranstaltungen (Events)

### Event-Schema:
Events werden als Markdown-Dateien in `src/content/events/` gespeichert. Dateiname-Konvention: `YYYY-MM-DD-beschreibung.md`.

#### Frontmatter-Felder:
- `name` (Pflicht): Name der Veranstaltung
- `description` (Pflicht): Kurzbeschreibung
- `startDate` (Pflicht): Startdatum/-zeit (z.B. `2026-03-14T09:30:00+01:00` oder `2026-03-14` für ganztägige Events)
- `endDate` (Optional): Enddatum/-zeit
- `allDay` (Optional, Standard: `false`): Wenn `true`, wird nur das Datum ohne Uhrzeit angezeigt. Für Events ohne bekannte Uhrzeit verwenden.
- `location` (Optional): Referenz zu einer Location in `src/data/locations/` (z.B. `dgh`, `kirche`)
- `organizer` (Optional): Referenz zu einem Organizer in `src/data/organizers/` (z.B. `spd`, `kulturkreis`)
- `url` (Optional): Externe URL
- `image` (Optional): Bild mit `src` und `alt`
- `noindex` (Optional): SEO-Flag

### Content (Markdown-Body):
**⚠️ WICHTIG: Jede Event-Datei MUSS Content nach dem Frontmatter enthalten!**
- Die `description` im Frontmatter ist nur eine Kurzbeschreibung für SEO/Vorschau und wird NICHT auf der Event-Seite angezeigt.
- Der eigentliche Seiteninhalt kommt aus dem Markdown-Body (nach dem schließenden `---`).
- Ohne Content ist die Event-Detailseite leer!
- Der Content sollte mindestens die `description` als Fließtext enthalten, idealerweise mit weiteren Details zur Veranstaltung.

### Organizer und Locations:
- Organizer werden als YAML in `src/data/organizers/` definiert
- Locations werden als YAML in `src/data/locations/` definiert
- Neue Organizer/Locations als YAML-Datei anlegen und im Event per Dateiname (ohne `.yaml`) referenzieren

## ⚡ Wichtige Hinweise

1. **Immer auf Deutsch antworten** - keine Ausnahmen!
2. Bei Unsicherheiten nachfragen statt anzunehmen
3. Sicherheit hat oberste Priorität
4. Code-Qualität vor Geschwindigkeit
5. Tests schreiben/aktualisieren bei Code-Änderungen
6. Dokumentation aktuell halten

## 🔒 Sicherheitsrichtlinien

- Niemals Secrets oder API-Keys committen
- Keine sensiblen Daten in Logs ausgeben
- Input-Validierung bei allen Benutzereingaben
- Abhängigkeiten regelmäßig aktualisieren
- CORS-Einstellungen sorgfältig prüfen

### npm-Sicherheit mit allow-scripts
Dieses Projekt verwendet `@lavamoat/allow-scripts` zum Schutz vor bösartigen npm-Lifecycle-Skripten:
- **Immer `npm run setup` statt `npm install` verwenden!**
- Die `.npmrc` blockiert alle Lifecycle-Skripte standardmäßig
- Nur explizit erlaubte Pakete in `package.json` unter `lavamoat.allowScripts` können Skripte ausführen
