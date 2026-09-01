#set page(paper: "a4", margin: 0cm)
#set text(
  font: ("Inter Variable", "Liberation Sans", "DejaVu Sans"),
  lang: "de",
  fill: black,
  hyphenate: false,
)
#set par(leading: 0.8em)

#let accent = rgb("#1f4d2b")
#let accent-tint = rgb("#eaf2ec")
#let footer-bg = rgb("#f4f4f4")
#let muted = rgb("#5a5a5a")

// Hero-Block mit farbigem Hintergrund
#block(
  width: 100%,
  fill: accent,
  inset: (x: 1.4cm, y: 0.8cm),
)[
  #set text(fill: white)
  #align(center)[
    #text(size: 12pt, weight: "semibold", tracking: 0.1em)[
      OFFENER ABEND IN RÖSSING · MONTAG, 7. SEPTEMBER 2026
    ]
    #v(0.25cm)
    #text(size: 46pt, weight: "black", tracking: -0.02em)[
      Gemeinsames \ Vibe-Coding
    ]
    #v(0.15cm)
    #text(size: 19pt, weight: "medium")[
      Wir bauen zusammen an der App fürs Dorf
    ]
  ]
]

// Body
#block(inset: (x: 1.4cm, top: 0.7cm, bottom: 0.3cm))[
  #text(size: 14pt)[
    Was früher ein ganzes Team und viele Monate gebraucht hätte, schaffen heute
    ein paar Leute an einem Abend – mit künstlicher Intelligenz. Das probieren
    wir an unserer eigenen Dorf-App aus.
  ]

  #v(0.35cm)

  #text(size: 14pt)[
    *Am weitesten bringt uns, wer weiß, was im Dorf fehlt.* Erzählen zählt an
    diesem Abend genauso viel wie tippen. Mitmachen kann jede und jeder, ganz
    gleich wie viel Erfahrung mit Computern schon da ist.
  ]

  #v(0.45cm)

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
      column-gutter: 0.7cm,
      row-gutter: 0.3cm,
      text(size: 15pt, weight: "bold", fill: accent)[Wann],
      text(size: 15pt)[Montag, 7. September 2026 · 19:00 – 21:00 Uhr],
      text(size: 15pt, weight: "bold", fill: accent)[Wo],
      text(size: 15pt)[Dorfgemeinschaftshaus · Peter-Winkler-Platz],
      text(size: 15pt, weight: "bold", fill: accent)[Eintritt],
      text(size: 15pt)[kostenlos · einfach vorbeikommen],
      text(size: 15pt, weight: "bold", fill: accent)[Mitbringen],
      text(size: 15pt)[Handy, Tablet oder Laptop – und Neugier],
    )
  ]

  #v(0.4cm)

  // QR-Block: fuer Leute gedacht, die ein Handy benutzen, aber mit
  // QR-Codes wenig zu tun hatten. Deshalb steht die Anleitung dabei.
  #grid(
    columns: (1fr, auto),
    column-gutter: 0.8cm,
    align: (left + horizon, center + horizon),
    [
      #text(size: 34pt, weight: "black", fill: accent)[rössing.de/k9d]
      #v(0.25cm)
      #text(size: 14pt)[
        Halte die Kamera deines Handys auf das schwarze Viereck – die Seite
        öffnet sich dann von selbst. Abtippen geht genauso.
      ]
    ],
    box(
      width: 4.8cm,
      height: 4.8cm,
      stroke: 0.5pt + muted,
      inset: 0.15cm,
      image("2026-09-07-vibe-coding-qr.svg", width: 100%),
    ),
  )
]

#v(1fr)

// Footer
#block(
  width: 100%,
  fill: footer-bg,
  inset: (x: 1.4cm, y: 0.55cm),
)[
  #align(center)[
    #text(size: 13pt, weight: "semibold")[
      Die Rössing-App am besten schon vorher einrichten – wie, steht auf der Seite.
    ]
    #v(0.15cm)
    #text(size: 8.5pt, fill: muted)[
      V.i.S.d.P.: Levin Keller · Hohenzollerndamm 152 · 14199 Berlin
    ]
  ]
]
