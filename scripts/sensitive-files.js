// Liste der sensiblen Dateien (relativ zum Projektroot)
// Diese Dateien werden verschlüsselt und die Originale in .gitignore aufgenommen
// Nur Privatpersonen - Vereine/Organisationen sind öffentlich bekannt

export const sensitiveFiles = [
  // Adventskalender-Events (enthalten Namen von Privatpersonen)
  'src/content/adventskalender-events/2025-12-01-adventskalender-tuer-1.md',
  'src/content/adventskalender-events/2025-12-02-adventskalender-tuer-2.md',
  'src/content/adventskalender-events/2025-12-03-adventskalender-tuer-3.md',
  'src/content/adventskalender-events/2025-12-08-adventskalender-tuer-8.md',
  'src/content/adventskalender-events/2025-12-11-adventskalender-tuer-11.md',
  'src/content/adventskalender-events/2025-12-13-adventskalender-tuer-13.md',
  'src/content/adventskalender-events/2025-12-15-adventskalender-tuer-15.md',
  'src/content/adventskalender-events/2025-12-17-adventskalender-tuer-17.md',
  'src/content/adventskalender-events/2025-12-19-adventskalender-tuer-19.md',
  'src/content/adventskalender-events/2025-12-23-adventskalender-tuer-23.md',

  // Adventskalender-Gastgeber (anonymisierte Dateinamen)
  'src/data/organizers/adventskalender-gastgeber-01.yaml',
  'src/data/organizers/adventskalender-gastgeber-02.yaml',
  'src/data/organizers/adventskalender-gastgeber-03.yaml',
  'src/data/organizers/adventskalender-gastgeber-08.yaml',
  'src/data/organizers/adventskalender-gastgeber-11.yaml',
  'src/data/organizers/adventskalender-gastgeber-13.yaml',
  'src/data/organizers/adventskalender-gastgeber-15.yaml',
  'src/data/organizers/adventskalender-gastgeber-17.yaml',
  'src/data/organizers/adventskalender-gastgeber-19.yaml',
  'src/data/organizers/adventskalender-gastgeber-23.yaml',
];
