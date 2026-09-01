// =============================================================================
//  Aushang „Rössing-App – Ideen gesucht“
// =============================================================================
//
//  Diese Datei enthält Text UND Layout des Aushangs. Gebaut werden daraus zwei
//  Formate, jeweils über eine eigene kleine Datei:
//
//      print/app-aushang-a4.typ   A4  – zum Aufhängen (Schaukasten, Dorfladen)
//      print/app-aushang-a5.typ   A5  – Handzettel zum Mitnehmen
//
//  Beide benutzen dasselbe Layout; der Unterschied ist allein der
//  Maßstabsfaktor (siehe `aushang(...)` ganz unten). Wer etwas am Inhalt
//  ändern will, ändert NUR den Abschnitt „TEXTE“ direkt hier drunter.
//  Der Rest der Datei ist Layout und muss dafür nicht angefasst werden.
//
//  Kompiliert wird nicht von Hand: Die Astro-Integration
//  `src/integrations/typst-posters.ts` baut bei jedem `npm run build` alle
//  .typ-Dateien nach `public/posters/*.pdf`. Deshalb kann das PDF nie von
//  dieser Quelle abweichen – es entsteht bei jedem Build neu.
//
//  Der Dateiname beginnt mit „_“, damit die Integration diese Datei nicht
//  selbst zu einem PDF übersetzt (sie ist nur ein Baustein).
//
// =============================================================================


// =============================================================================
//  TEXTE – hier darf gefahrlos geändert werden
// =============================================================================

// Adresse, auf die der QR-Code zeigt. Punycode-Schreibweise, weil QR-Scanner
// mit Umlaut-Domains unterschiedlich umgehen. Achtung: Wird diese Adresse
// geändert, muss der QR-Code neu erzeugt werden:
//
//      npm run print-qr
//
// Ein Test (src/tools/print/aushang.test.ts) schlägt fehl, wenn das vergessen
// wird – der committete QR-Code und diese Adresse können also nicht
// auseinanderlaufen.
#let ziel-url = "https://xn--rssing-wxa.de/app/"

// Dieselbe Adresse in lesbarer Form, für alle ohne QR-Scanner.
#let ziel-url-anzeige = "rössing.de/app"

// Kopfzeile über der Schlagzeile.
#let kicker = "DIE RÖSSING-APP"

// Die Hauptbotschaft. Kurz halten – das ist die Zeile, die aus zwei Metern
// Entfernung gelesen wird.
#let schlagzeile = "Ideen gesucht"

// Zweite Zeile unter der Schlagzeile.
#let unterzeile = "Was soll die Dorf-App für Rössing können?"

// Einleitung im weißen Bereich.
#let einleitung = "Die Rössing-App gibt es schon. Was als Nächstes hineinkommt, soll sich danach richten, was im Dorf wirklich gebraucht wird. Deshalb die Frage an alle: Was würde dir den Alltag in Rössing leichter machen? Ein Satz reicht – und trau dich ruhig, groß zu denken."

// Der cremefarbene Kasten: was die App heute schon kann.
#let heute-titel = "Das kann die App heute schon: „Mithelfen“"
#let heute-text = "Die erste Funktion ist fertig. Auf der Dorfkarte siehst du, was gerade ansteht – welche Blumenkästen und Beete Wasser brauchen oder gejätet werden müssen. Eine Ampel zeigt, wie dringend es ist. Wer etwas erledigt hat, meldet das mit einem Tipp, und alle anderen sehen es sofort."

// Die zweite Botschaft nach den Ideen: mittesten.
#let testen-titel = "Oder mittesten"
#let testen-text = "Die App ist in der Testphase und läuft bisher auf Android-Geräten. Wer sie ausprobieren möchte, bekommt eine Einladung. Rückmeldungen helfen genauso wie Ideen."

// Die vier Zusicherungen. Reihenfolge und Anzahl sind frei – bei mehr oder
// weniger als vier Einträgen ordnet das Layout sie von selbst neu an.
#let zusicherungen = (
  (
    titel: "Ehrenamtlich",
    text: "Ein Dorfprojekt, in der Freizeit gebaut. Kein Unternehmen, kein Auftrag, keine Gewinnabsicht.",
  ),
  (
    titel: "Kostenlos",
    text: "Kein Kaufpreis, kein Abo, keine Zusatzkäufe. Auch später nicht.",
  ),
  (
    titel: "Keine Werbung",
    text: "Keine Anzeigen, kein Werbe-Tracking. Deine Daten werden nicht verkauft und nicht weitergegeben.",
  ),
  (
    titel: "Daten bleiben im Dorf",
    text: "Eigener Server, eigene Rössing-ID zum Anmelden. Der Standort bleibt auf deinem Gerät.",
  ),
)

// Der Aufruf über den Kontaktdaten.
#let aufruf-titel = "Melde dich einfach"
#let aufruf-text = "Mit deiner Idee oder wenn du mittesten willst – ganz formlos:"

// Kontaktweg. Muss mit src/data/kontakt.ts und dem Impressum übereinstimmen;
// ein Test (src/tools/print/aushang.test.ts) prüft das.
#let kontakt-mail = "post@levinkeller.de"
#let kontakt-telefon = "+49 1515 6041082"

// Überleitung zur ausgeschriebenen Adresse, für alle ohne QR-Scanner.
#let netz-hinweis = "Oder im Netz nachlesen:"

// Beschriftung unter dem QR-Code.
#let qr-beschriftung = "Hier steht alles über die App"

// Fußzeile.
#let fusszeile = "V.i.S.d.P.: Levin Keller · Hohenzollerndamm 152 · 14199 Berlin"


// =============================================================================
//  AB HIER LAYOUT – zum Ändern der Texte nicht nötig
// =============================================================================

// Farben der App (android/app/src/main/res/values/colors.xml im App-Repo).
#let gruen = rgb("#3B6939")
#let gelb = rgb("#F9A825")
#let creme = rgb("#FFF3C4")
#let grau = rgb("#5a5a5a")
#let hellgrau = rgb("#f4f4f4")

// Die Blume aus dem App-Icon, direkt gezeichnet statt als Bild eingebunden –
// so skaliert sie verlustfrei und es muss keine Grafikdatei mitgepflegt
// werden. Geometrie wie in store/assets/icon.svg des App-Repos: Die Werte
// stammen aus dem Adaptive Icon der App und sind bewusst leicht asymmetrisch
// (das obere Blütenblatt sitzt weiter außen als das untere).
//
// Die Blütenblätter sind grün statt cremefarben: Auf dem weißen Grund wäre
// Creme kaum zu sehen – es war die Farbe für den früheren grünen Kopfbalken.
#let blume(groesse) = {
  // Umrechnung von der 512er-Zeichenfläche des Icons auf die Zielgröße.
  let f = groesse / 512
  box(width: groesse, height: groesse)[
    #place(center + horizon, dy: -93.87 * f, circle(radius: 42.67 * f, fill: gruen, stroke: none))
    #place(center + horizon, dy: 76.80 * f, circle(radius: 42.67 * f, fill: gruen, stroke: none))
    #place(center + horizon, dx: -85.33 * f, dy: -8.53 * f, circle(radius: 42.67 * f, fill: gruen, stroke: none))
    #place(center + horizon, dx: 85.33 * f, dy: -8.53 * f, circle(radius: 42.67 * f, fill: gruen, stroke: none))
    #place(center + horizon, circle(radius: 51.20 * f, fill: gelb, stroke: none))
  ]
}

// Baut den Aushang.
//
//   massstab: 1.0 ergibt den A4-Aushang. Der A5-Handzettel benutzt 0.707
//             (das Verhältnis der Papierkanten), damit das Blatt bei
//             halber Fläche exakt gleich aussieht.
//   papier:   Papierformat für #set page, z.B. "a4" oder "a5".
#let aushang(papier: "a4", massstab: 1.0) = {
  // Kürzel, damit die Layoutwerte unten lesbar bleiben.
  let s = massstab
  let pt-s = (n) => n * s * 1pt
  let cm-s = (n) => n * s * 1cm

  set page(paper: papier, margin: (x: cm-s(1.3), y: cm-s(1.0)))
  set text(
    font: ("Inter Variable", "Liberation Sans", "DejaVu Sans"),
    lang: "de",
    fill: black,
    size: pt-s(12),
  )
  // `spacing` ausdrücklich klein halten: Der Standardabstand zwischen Blöcken
  // ist für Fließtext gedacht und würde den Aushang auseinanderziehen. Die
  // Abstände werden hier bewusst einzeln über #v(...) gesetzt.
  set par(leading: 0.72em, spacing: 0.4em, justify: false)

  // --- Kopf: Blume und Schlagzeile, abgeschlossen durch eine Linie ----------
  // Frueher ein grosser gruener Balken. Der frisst beim Nachdrucken Toner und
  // wird auf jedem Kopierer schmutzig – die Linie leistet dieselbe Trennung.
  block(width: 100%)[
    #grid(
      columns: (auto, 1fr),
      column-gutter: cm-s(0.8),
      align: (horizon, horizon),
      blume(cm-s(2.6)),
      [
        #text(size: pt-s(11), weight: "semibold", tracking: 0.12em, fill: gruen)[#kicker]
        #v(cm-s(0.18))
        #text(size: pt-s(46), weight: "black", tracking: -0.02em, fill: gruen)[#schlagzeile]
        #v(cm-s(0.1))
        #text(size: pt-s(17), weight: "medium")[#unterzeile]
      ],
    )
  ]

  v(cm-s(0.45))
  line(length: 100%, stroke: pt-s(2) + gruen)

  // --- Körper ---------------------------------------------------------------
  block(inset: (top: cm-s(0.55), bottom: cm-s(0.2)))[
    #text(size: pt-s(12.5))[#einleitung]

    #v(cm-s(0.45))

    // Was es heute schon gibt – durch einen Rahmen abgesetzt statt durch Ton.
    #block(
      width: 100%,
      inset: cm-s(0.45),
      radius: pt-s(4),
      stroke: pt-s(1) + gruen,
    )[
      #text(size: pt-s(14), weight: "bold", fill: gruen)[#heute-titel]
      #v(cm-s(0.22))
      #text(size: pt-s(12))[#heute-text]
    ]

    #v(cm-s(0.5))

    #text(size: pt-s(13), weight: "bold", fill: gruen)[#testen-titel]
    #h(pt-s(8))
    #text(size: pt-s(12))[#testen-text]

    #v(cm-s(0.6))

    // Die Zusicherungen nebeneinander, jede mit einer grünen Linie links.
    // Die Linie kommt vom Raster selbst (nicht von einem Block darin), damit
    // alle vier gleich lang sind, auch wenn eine Überschrift umbricht.
    #grid(
      columns: zusicherungen.map(_ => 1fr),
      column-gutter: cm-s(0.45),
      inset: (left: cm-s(0.3)),
      stroke: (left: pt-s(1.5) + gruen),
      ..zusicherungen.map(z => [
        #text(size: pt-s(11.5), weight: "bold", fill: gruen)[#z.titel]
        #v(cm-s(0.12))
        #text(size: pt-s(10), fill: grau)[#z.text]
      ])
    )
  ]

  // Freiraum zwischen Inhalt und Aufruf. Muss außerhalb der Blöcke stehen,
  // sonst dehnt Typst den Block über die Seite hinaus.
  v(1fr)

  // --- Aufruf und QR-Code -----------------------------------------------------
  // Eine Linie trennt den Aufruf vom Freiraum darüber – früher tat das ein
  // cremefarbenes Band über die ganze Breite.
  line(length: 100%, stroke: pt-s(2) + gruen)
  block(
    width: 100%,
    inset: (y: cm-s(0.55)),
  )[
    #grid(
      columns: (1fr, auto),
      column-gutter: cm-s(0.9),
      align: (left + horizon, center + horizon),
      [
        #text(size: pt-s(18), weight: "black", fill: gruen)[#aufruf-titel]
        #v(cm-s(0.15))
        #text(size: pt-s(12.5))[#aufruf-text]
        #v(cm-s(0.25))
        #text(size: pt-s(15.5), weight: "bold")[#kontakt-mail]
        #v(cm-s(0.1))
        #text(size: pt-s(15.5), weight: "bold")[#kontakt-telefon]
        #v(cm-s(0.3))
        #text(size: pt-s(12), fill: grau)[#netz-hinweis]
        #v(cm-s(0.06))
        #text(size: pt-s(17.5), weight: "black", fill: gruen)[#ziel-url-anzeige]
      ],
      [
        // Die Ruhezone des QR-Codes bleibt ausdrücklich weiß.
        #box(
          fill: white,
          stroke: pt-s(0.5) + grau,
          image("app-aushang-qr.svg", width: cm-s(5.6)),
        )
        #v(cm-s(0.15))
        #block(width: cm-s(5.8))[
          #align(center)[
            #text(size: pt-s(10.5), fill: grau)[#qr-beschriftung]
          ]
        ]
      ],
    )
  ]

  // --- Fußzeile -------------------------------------------------------------
  line(length: 100%, stroke: pt-s(0.5) + grau)
  block(
    width: 100%,
    inset: (top: cm-s(0.3)),
  )[
    #align(center)[
      #text(size: pt-s(8.5), fill: grau)[#fusszeile]
    ]
  ]
}
