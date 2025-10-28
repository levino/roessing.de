---
name: Neuer Termin
about: Termin-Infos einfach reinkopieren
title: '[TERMIN] '
labels: 'termin, content'
assignees: ''
---

## Termin-Information

<!-- Kopiere hier einfach den kompletten Text mit allen Termin-Infos rein (z.B. aus E-Mail, Flyer, Einladung) -->

```
Beispiel:
Eine öffentliche Sitzung des Ortsrates Rössing findet am Dienstag, dem 28. Oktober 2025, 19:00
Uhr, im Dorfgemeinschaftshaus Rössing, Sitzungszimmer, Kirchstraße 3, statt.
...
```

## Zusätzliche Hinweise (optional)

<!-- Falls Claude weitere Infos braucht oder du Besonderheiten angeben willst -->

---

## 🤖 Aufgabe für Claude

**Bitte analysiere den eingegebenen Text und erstelle automatisch Event-Datei(en):**

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
   - Wenn mehrere Events im Text sind (z.B. Bürgergespräch + Ortsratssitzung), erstelle separate Dateien
   - Sei smart beim Mapping: "Dorfgemeinschaftshaus Rössing, Sitzungszimmer" → `dgh`
   - Wenn Location/Organizer nicht in den Daten existiert, wähle die passendste oder frage nach
   - Deutsche Zeitzone verwenden: `+01:00` (Winterzeit) oder `+02:00` (Sommerzeit)
   - Kurzbeschreibung sollte prägnant sein (1-2 Sätze)
   - Längere Infos gehören in den Markdown-Body

5. **Committe** die Änderung(en) und **pushe** zum Branch

**Wichtig**: Schau dir zur Orientierung existierende Event-Dateien in `src/content/events/` an!
