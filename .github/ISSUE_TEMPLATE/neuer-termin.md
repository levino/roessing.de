---
name: Neuer Termin
about: Termin-Infos einfach reinkopieren
title: "Termin eintragen"
labels: termin, content
---

[Hier Termin-Text einfügen]

---

@claude Bitte analysiere den Termin-Text oben und erstelle automatisch die passende Event-Datei(en).

### Deine Aufgaben:
1. **Extrahiere** alle relevanten Informationen aus dem Text:
   - Datum(e) und Uhrzeit(en)
   - Event-Name(n)
   - Veranstaltungsort(e)
   - Veranstalter
   - Beschreibung
   - Zusätzliche Details (Tagesordnung, Programm, etc.)

2. **Mappe** die Informationen auf das Schema:
   - **Location**: Suche in den verfügbaren Locations (`src/data/locations/`)
     - "Dorfgemeinschaftshaus" → `dgh`
     - "Kirche" → `kirche`
     - "Sportplatz" → `sportplatz`
     - etc.
   - **Organizer**: Suche in den verfügbaren Organizers (`src/data/organizers/`)
     - "Ortsrat" → `ortsrat`
     - "DRK" → `drk`
     - "CDU" → `cdu`
     - "Landfrauen" / "Landfrauenverein" → `landfrauen`
     - etc.

3. **Erstelle** Event-Datei(en) in `src/content/events/`:
   - **Dateiname**: `YYYY-MM-DD-kurzer-name.md`
   - **Frontmatter**:
     ```yaml
     ---
     startDate: YYYY-MM-DDTHH:MM:00+01:00
     endDate: YYYY-MM-DDTHH:MM:00+01:00  # optional
     location: location-id  # ohne .yaml
     organizer: organizer-id  # ohne .yaml
     description: Kurze Beschreibung für die Übersicht
     name: Event-Name
     ---
     ```
   - **Body**: Alle weiteren Details als Markdown (Tagesordnung, Programm, etc.)

4. **Hinweise**:
   - Wenn mehrere Events im Text sind, erstelle separate Dateien
   - Sei smart beim Mapping: "Dorfgemeinschaftshaus Rössing, Sitzungszimmer" → `dgh`
   - Wenn Location/Organizer nicht in den Daten existiert, wähle die passendste oder frage nach
   - **WICHTIG - Zeitzone**: Deutschland verwendet Europe/Berlin Zeitzone
     - `+01:00` für Winterzeit (CET): letzter Sonntag im Oktober bis letzter Sonntag im März
     - `+02:00` für Sommerzeit (CEST): letzter Sonntag im März bis letzter Sonntag im Oktober
   - Die `startDate` ist die **tatsächliche Startzeit** der ersten Aktivität
   - Kurzbeschreibung sollte prägnant sein (1-2 Sätze)
   - Längere Infos gehören in den Markdown-Body

5. **Committe** die Änderung(en) und **pushe** zum Branch

**Wichtig**: Schau dir zur Orientierung existierende Event-Dateien in `src/content/events/` an!
