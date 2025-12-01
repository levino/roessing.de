// Liste der sensiblen Dateien (relativ zum Projektroot)
// Diese Dateien werden verschlüsselt und die Originale in .gitignore aufgenommen
// Nur Privatpersonen - Vereine/Organisationen sind öffentlich bekannt

export const sensitiveFiles = [
  // Adventskalender-Events (enthalten Namen von Privatpersonen)
  'src/content/adventskalender-events/2025-12-01-adventskalender-tuer-1.md',
  'src/content/adventskalender-events/2025-12-02-adventskalender-tuer-2.md',
  'src/content/adventskalender-events/2025-12-03-adventskalender-tuer-3.md',
  'src/content/adventskalender-events/2025-12-06-adventskalender-tuer-6.md',
  'src/content/adventskalender-events/2025-12-06-nikolaus-rnah.md',
  'src/content/adventskalender-events/2025-12-07-adventskalender-tuer-7.md',
  'src/content/adventskalender-events/2025-12-08-adventskalender-tuer-8.md',
  'src/content/adventskalender-events/2025-12-09-adventskalender-tuer-9.md',
  'src/content/adventskalender-events/2025-12-11-adventskalender-tuer-11.md',
  'src/content/adventskalender-events/2025-12-12-adventskalender-tuer-12.md',
  'src/content/adventskalender-events/2025-12-13-adventskalender-tuer-13.md',
  'src/content/adventskalender-events/2025-12-15-adventskalender-tuer-15.md',
  'src/content/adventskalender-events/2025-12-17-adventskalender-tuer-17.md',
  'src/content/adventskalender-events/2025-12-19-adventskalender-tuer-19.md',
  'src/content/adventskalender-events/2025-12-23-adventskalender-tuer-23.md',

  // Adventskalender-Organizer (nur Privatpersonen)
  'src/data/organizers/birgit-engelke-busse.yaml',
  'src/data/organizers/danuta-andreas.yaml',
  'src/data/organizers/danuta-ruediger.yaml',
  'src/data/organizers/familie-ahrens-vogt-nowothnig.yaml',
  'src/data/organizers/familie-schwoerer-kroepp.yaml',
  'src/data/organizers/heike-thilo.yaml',
  'src/data/organizers/julia-kantack-peter-winkler.yaml',
  'src/data/organizers/katja-klaus-berg.yaml',
  'src/data/organizers/sebastian-franz.yaml',
  'src/data/organizers/tita-von-roessing.yaml',
  'src/data/organizers/volker-hennies.yaml',
];
