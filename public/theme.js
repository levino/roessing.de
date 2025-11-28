// Theme-Script für automatische Dark/Light-Mode-Erkennung
// Wird früh geladen, um Flash of unstyled Content zu vermeiden
(function() {
  // Prüfe OS-Präferenz
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'sanft-dark' : 'sanft';

  // Setze das Theme auf dem HTML-Element
  document.documentElement.setAttribute('data-theme', theme);

  // Reagiere auf Änderungen der OS-Präferenz
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    const newTheme = e.matches ? 'sanft-dark' : 'sanft';
    document.documentElement.setAttribute('data-theme', newTheme);
  });
})();
