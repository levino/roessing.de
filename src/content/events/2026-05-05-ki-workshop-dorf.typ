#set page(paper: "a4", margin: 0cm)
#set text(
  font: ("Inter Variable", "Liberation Sans", "DejaVu Sans"),
  lang: "de",
  fill: black,
)
#set par(leading: 0.75em)

#let accent = rgb("#1f4d2b")
#let accent-tint = rgb("#eaf2ec")
#let footer-bg = rgb("#f4f4f4")
#let muted = rgb("#5a5a5a")

// Hero-Block mit farbigem Hintergrund
#block(
  width: 100%,
  fill: accent,
  inset: (x: 1.4cm, y: 1.1cm),
)[
  #set text(fill: white)
  #align(center)[
    #text(size: 11pt, weight: "semibold", tracking: 0.1em)[
      OFFENER ABEND IN RÖSSING · 5. MAI 2026
    ]
    #v(0.35cm)
    #text(size: 56pt, weight: "black", tracking: -0.02em)[
      KI richtig nutzen
    ]
    #v(0.05cm)
    #text(size: 18pt, weight: "medium")[
      Ein neues Zeitalter – gemeinsam gestalten
    ]
  ]
]

// Body
#block(inset: (x: 1.4cm, top: 0.8cm, bottom: 0.4cm))[
  #text(size: 13pt)[
    *Alle warnen vor KI: sie vernichte Arbeitsplätze, fresse Daten.* Die Panikmache
    ist übertrieben. Wie so oft in der Vergangenheit beginnt mit einer neuen
    Technologie ein rasanter Sprung in Lebensqualität und Wohlstand. Lasst uns
    gemeinsam Erfahrungen sammeln – und entdecken, wie KI für uns selbst und
    unsere Gemeinschaft nutzbar wird.
  ]

  #v(0.5cm)

  // Info-Box mit hellem Hintergrund
  #block(
    width: 100%,
    fill: accent-tint,
    inset: 0.55cm,
    radius: 0.15cm,
    stroke: 0.5pt + accent,
  )[
    #grid(
      columns: (auto, 1fr),
      column-gutter: 0.6cm,
      row-gutter: 0.3cm,
      text(size: 15pt, weight: "bold", fill: accent)[Wann],
      text(size: 15pt)[Dienstag, 5. Mai 2026 · 19:00 – 20:30 Uhr],
      text(size: 15pt, weight: "bold", fill: accent)[Wo],
      text(size: 15pt)[Dorfgemeinschaftshaus Rössing],
      text(size: 15pt, weight: "bold", fill: accent)[Eintritt],
      text(size: 15pt)[kostenlos · Spende für Raummiete erwünscht],
      text(size: 15pt, weight: "bold", fill: accent)[Anmeldung],
      text(size: 15pt)[post\@levinkeller.de · mit Name und Ortsteil],
    )
  ]

  #v(0.6cm)

  // QR-Block
  #grid(
    columns: (1fr, auto),
    column-gutter: 0.8cm,
    align: (left + horizon, center + horizon),
    [
      #text(size: 13pt, weight: "medium")[Mehr Infos:]
      #v(0.1cm)
      #text(size: 34pt, weight: "black", fill: accent)[rössing.de/g7e]
      #v(0.2cm)
      #text(size: 13pt)[
        QR-Code scannen oder eintippen
      ]
      #v(0.05cm)
      #text(size: 12pt, fill: muted)[
        Programm · Anmeldung · Anfahrt
      ]
    ],
    box(
      width: 4.6cm,
      height: 4.6cm,
      stroke: 0.5pt + muted,
      inset: 0.15cm,
      image("2026-05-05-ki-workshop-dorf-qr.svg", width: 100%),
    ),
  )
]

#v(1fr)

// Footer
#block(
  width: 100%,
  fill: footer-bg,
  inset: (x: 1.4cm, y: 0.5cm),
)[
  #align(center)[
    #text(size: 12pt, weight: "semibold")[
      Bitte eigenes Smartphone, Tablet oder Laptop mitbringen · Plätze begrenzt
    ]
    #v(0.15cm)
    #text(size: 8.5pt, fill: muted)[
      V.i.S.d.P.: Levin Keller · Hohenzollerndamm 152 · 14199 Berlin
    ]
  ]
]
