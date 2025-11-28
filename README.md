# roessing.de

Ein digitales schwarzes Brett für das Dorf **Rössing** in Niedersachsen – ein Hobbyprojekt von [Levin Keller](https://www.levinkeller.de).

## Über Rössing

Rössing ist ein Dorf in Niedersachsen und gehört zur Gemeinde Nordstemmen im Landkreis Hildesheim. Mit etwa 1600 Einwohner:innen und zahlreichen aktiven Vereinen bietet das Dorf ein lebendiges Gemeinschaftsleben.

Diese Website ist eine sogenannte [Mitmach-Seite](https://www.levinkeller.de/de/docs/software/collaborative-homepage) und dient als Informationsplattform für:

- **Veranstaltungen** – Alle kommenden Events der Rössinger Vereine und Organisationen
- **Wissensdatenbank** – Interessante Informationen über Rössing (Natur, Politik, Wirtschaft)
- **Vereinsübersicht** – Links zu den lokalen Vereinen wie der Dorfpflege und der Freiwilligen Feuerwehr

## Veranstaltung hinzufügen

Möchtest du eine Veranstaltung zur Website hinzufügen? Das geht ganz einfach:

1. Erstelle ein [neues Issue](https://github.com/levino/roessing.de/issues/new) in diesem Repository
2. Beschreibe die Veranstaltung mit allen wichtigen Details:
   - Name der Veranstaltung
   - Datum und Uhrzeit (Start und Ende)
   - Veranstaltungsort
   - Veranstalter/Verein
   - Kurze Beschreibung
3. Erwähne `@claude` im Issue-Text

Der KI-Assistent Claude wird das Issue automatisch bearbeiten, die Veranstaltung anlegen und einen Pull Request erstellen.

### Beispiel für ein Issue

```
Bitte füge folgende Veranstaltung hinzu: @claude

Name: Sommerfest
Datum: 15. Juli 2025, 14:00 - 22:00 Uhr
Ort: Dorfgemeinschaftshaus
Veranstalter: Dorfpflege
Beschreibung: Das jährliche Sommerfest mit Musik, Essen und Spaß für die ganze Familie.
```

## Tech-Stack

Diese Website wurde mit modernen Web-Technologien entwickelt:

- **[Astro](https://astro.build)** – Static Site Generator
- **[Shipyard](https://shipyard.levinkeller.de)** – Page-Builder-Framework basierend auf Astro
- **[Tailwind CSS](https://tailwindcss.com)** & **[DaisyUI](https://daisyui.com)** – Styling
- **TypeScript** – Typsichere Entwicklung

## Entwicklung

### Voraussetzungen

- Node.js (aktuelle LTS-Version empfohlen)
- npm

### Installation

```bash
# Abhängigkeiten installieren (WICHTIG: nicht npm install verwenden!)
npm run setup
```

### Verfügbare Befehle

| Befehl           | Beschreibung                                    |
| :--------------- | :---------------------------------------------- |
| `npm run setup`  | Abhängigkeiten installieren                     |
| `npm run dev`    | Entwicklungsserver starten (localhost:4321)     |
| `npm run build`  | Produktions-Build erstellen                     |
| `npm run preview`| Build lokal testen                              |
| `npm run check`  | Astro-Type-Checking                             |
| `npm run test`   | Vitest-Tests ausführen                          |
| `npm run e2e`    | Playwright E2E-Tests ausführen                  |

## Lizenz

MIT
