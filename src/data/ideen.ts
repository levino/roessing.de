/**
 * Die Ideen-Sammlung der Dorf-App: „Sag uns, was die App können soll."
 *
 * Das Formular auf /app schickt klassisch per HTML-POST an das Backend der
 * Dorf-App — ohne JavaScript, ohne Umweg über einen Formulardienst. Danach
 * leitet das Backend auf die Dankeseite dieser Website zurück; erlaubt sind
 * dort ausschließlich freigegebene Ursprünge, ein fremdes Ziel wird
 * abgewiesen (siehe backend/internal/api/ideen.go im App-Repo).
 */

/** Öffentlicher Eingang der Ideen-Sammlung (ohne Anmeldung erreichbar). */
export const ideenEingang = 'https://app.xn--rssing-wxa.de/api/v1/ideen'

/** Dankeseite, auf die das Backend nach dem Absenden weiterleitet. */
export const ideenDankeseite = 'https://xn--rssing-wxa.de/app/danke'

/** Grenzen des Wunschtextes — dieselben prüft das Backend verbindlich. */
export const wunschMinLaenge = 5
export const wunschMaxLaenge = 2000

/** Grenzen der freiwilligen Angaben. */
export const nameMaxLaenge = 100
export const emailMaxLaenge = 200
