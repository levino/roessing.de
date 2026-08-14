/**
 * Zentraler Kontaktweg des Dorfprojekts – identisch mit den Angaben im
 * Impressum und in der Datenschutzerklärung. Wird auf der App-Seite für den
 * Ideen-Aufruf und den Test-Aufruf verwendet, damit beide Stellen nicht
 * auseinanderlaufen.
 */
export const kontaktMail = 'post@levinkeller.de'
export const kontaktTelefon = '+4915156041082'

/** Baut einen `mailto:`-Link mit vorausgefülltem Betreff. */
export const mailtoMitBetreff = (betreff: string): string =>
  `mailto:${kontaktMail}?subject=${encodeURIComponent(betreff)}`
