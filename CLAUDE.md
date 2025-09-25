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
- **Sprachen**: TypeScript, JavaScript
- **Styling**: Tailwind CSS, DaisyUI
- **Testing**: Vitest (Unit-Tests), Playwright (E2E-Tests), Cypress
- **Paketmanager**: npm

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
npm install        # Abhängigkeiten installieren
npm run dev        # Entwicklungsserver starten (localhost:4321)
npm run build      # Produktions-Build erstellen
npm run preview    # Build lokal testen
npm run check      # Astro-Type-Checking
npm run test       # Vitest-Tests ausführen
npm run e2e        # Playwright-Tests ausführen
npm run prettier   # Code-Formatierung prüfen
```

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
