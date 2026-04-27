#set page(
  paper: "a4",
  margin: (x: 1.6cm, y: 1.8cm),
)
#set text(font: ("Liberation Sans", "DejaVu Sans"), lang: "de")
#set par(leading: 0.85em)

#let accent = rgb("#1f4d2b")
#let muted = rgb("#5a5a5a")

#align(center)[
  #text(size: 14pt, fill: muted, weight: "medium")[
    Offener Abend im Dorfgemeinschaftshaus Rössing
  ]
  #v(0.4cm)
  #text(size: 56pt, weight: "black", fill: accent)[
    KI im Alltag
  ]
  #v(-0.2cm)
  #text(size: 28pt, weight: "semibold")[
    Workshop fürs Dorf
  ]
]

#v(0.6cm)
#line(length: 100%, stroke: 1.5pt + accent)
#v(0.4cm)

#grid(
  columns: (auto, 1fr),
  column-gutter: 0.6cm,
  row-gutter: 0.4cm,
  text(size: 14pt, weight: "bold")[Wann],
  text(size: 14pt)[Dienstag, 5. Mai 2026 · 19:00 – 20:30 Uhr],
  text(size: 14pt, weight: "bold")[Wo],
  text(size: 14pt)[Dorfgemeinschaftshaus Rössing],
  text(size: 14pt, weight: "bold")[Eintritt],
  text(size: 14pt)[kostenlos · Spende für Raummiete erwünscht],
  text(size: 14pt, weight: "bold")[Anmeldung],
  text(size: 14pt)[post\@levinkeller.de · mit Name und Ortsteil],
)

#v(0.7cm)

#text(size: 14pt)[
  Viele haben von Künstlicher Intelligenz gehört, nutzen sie aber noch nicht
  selbst. An dem Abend gibt Levin Keller eine kurze Einführung – und dann ist
  Zeit, KI auf dem eigenen Smartphone, Tablet oder Laptop auszuprobieren.
  Alle Fragen sind willkommen, auch die vermeintlich „dummen".
]

#v(0.6cm)

#grid(
  columns: (1fr, auto),
  column-gutter: 0.8cm,
  align: (left + horizon, center + horizon),
  [
    #text(size: 18pt, weight: "bold", fill: accent)[Mehr Infos]
    #v(0.2cm)
    #text(size: 14pt)[
      QR-Code scannen oder eintippen:
    ]
    #v(0.3cm)
    #text(size: 32pt, weight: "black", fill: accent)[
      rössing.de/g7e
    ]
    #v(0.2cm)
    #text(size: 11pt, fill: muted)[
      Programm, Anmeldung, Anfahrt
    ]
  ],
  box(
    width: 5.5cm,
    height: 5.5cm,
    image("2026-05-05-ki-workshop-dorf-qr.svg", width: 100%),
  ),
)

#v(1fr)
#line(length: 100%, stroke: 0.5pt + muted)
#v(0.3cm)
#align(center)[
  #text(size: 11pt, fill: muted)[
    Eine Veranstaltung von Levin Keller · Bitte eigenes Gerät mitbringen ·
    Plätze begrenzt
  ]
]
