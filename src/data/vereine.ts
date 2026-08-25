// Vereine & Gruppen in Rössing – eine Stelle für die Daten, die sowohl auf
// der Startseite (Teaser) als auch auf /vereine (vollständige Übersicht mit
// Suche) verwendet wird.
//
// Parteien (CDU, Grüne, SPD, ...) sind hier bewusst außen vor: Sobald eine
// dabei ist, müssten aus Fairness alle rein – das wollen wir auf einer
// Dorf-Übersichtsseite nicht abbilden.

export interface Verein {
  name: string
  description: string
  // Nur gesetzt, wenn es eine eigene Internetseite mit brauchbarem Inhalt
  // gibt (keine reinen Kontakt-Stubs). Ohne href wird der Verein nur
  // genannt, aber nicht verlinkt.
  href?: string
}

export const vereine: Verein[] = [
  {
    name: 'Freiwillige Feuerwehr',
    description: 'Retten, sichern und bergen in und um Rössing.',
    href: 'https://www.ff-roessing.de',
  },
  {
    name: 'Musikzug der Feuerwehr',
    description:
      'Blasorchester der Freiwilligen Feuerwehr Rössing – samt Förderverein.',
    href: 'https://www.ff-roessing.de/musikzug/',
  },
  {
    name: 'Dorfpflege Rössing',
    description:
      'Pflegt Grünflächen und Streuobstwiese, organisiert Osterfeuer & Weihnachtsmarkt.',
    href: 'https://www.dorfpflege-roessing.de',
  },
  {
    name: 'Bürgerstiftung Rössing',
    description: 'Fördert bürgerschaftliches Engagement in Rössing.',
    href: 'https://buergerstiftung-roessing.de',
  },
  {
    name: 'Freizeitsee Rössing',
    description:
      'Renaturierung und Pflege der ehemaligen Kiesgrube als Naherholungsraum.',
    href: 'https://freizeitsee-roessing.de',
  },
  {
    name: 'VSV Rössing',
    description:
      'Volkssportvereinigung von 1897 – Fußball, Leichtathletik und mehr.',
    href: 'https://vsv-roessing.de',
  },
  {
    name: 'Kleingartenverein Rössing',
    description: 'Gärten in der Kolonie Abendfrieden am Rössingbach.',
    href: 'https://www.kgv-roessing.de',
  },
  {
    name: 'Kirchengemeinde St. Peter und Paul',
    description:
      'Ev.-luth. Kirchengemeinde Rössing – mit Kirchenstiftung und Kindergarten.',
    href: 'https://www.kirche-roessing.de',
  },
  {
    name: 'Landfrauen Rössing-Barnten',
    description: 'Vorträge, Ausflüge und Programm rund ums Landleben.',
    href: 'https://kreis-landfrauen-hildesheim.de/ortsvereine/lf-roessing/',
  },
  {
    name: 'NKV Ortsgruppe Rössing',
    description:
      'Niedersächsische Kameradschaftsvereinigung, gegründet 1881 – Vereinsheim am Rittergut.',
    href: 'https://sites.google.com/view/nkv-roessing/startseite',
  },
  {
    name: 'Dorfentwicklung',
    description:
      'Wie sich Rössing weiterentwickeln will – „Unser Dorf hat Zukunft“.',
    href: 'https://dorfentwicklung.xn--rssing-wxa.de',
  },
  {
    name: 'Digitales Dorfarchiv',
    description: 'Die Geschichte Rössings digital gesammelt und bewahrt.',
    href: 'https://archiv.xn--rssing-wxa.de',
  },
  {
    name: 'Deutsches Rotes Kreuz – Ortsverein Rössing',
    description: 'Erste Hilfe, Blutspende-Termine und Nachbarschaftshilfe.',
  },
  {
    name: 'Kulturkreis Rössing',
    description:
      'Betreibt das Dorfgemeinschaftshaus, organisiert Basare und Kulturveranstaltungen.',
  },
  {
    name: 'Bergmannsverein Rössing-Barnten',
    description:
      'Traditionsverein rund um die Bergbaugeschichte, gegründet 1947.',
  },
  {
    name: 'Arbeiterwohlfahrt (AWO) Rössing-Barnten',
    description: 'Begegnungsstätte im Dorfgemeinschaftshaus Barnten.',
  },
  {
    name: 'Bund der Vertriebenen – Ortsverband Rössing',
    description: 'Kulturelle Veranstaltungen und Gedenkarbeit.',
  },
  {
    name: 'KulTürÖffner Rössing',
    description: 'Junge Initiative für Kultur im Dorf, etwa das Rudelsingen.',
  },
]
