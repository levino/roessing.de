import { EventOverviewPage } from 'components/Events/EventsPage'
import { NavBar } from 'components/NavBar'
import React from 'react'

const events = [
  // January
  {
    date: '10. Januar 2023',
    time: '19:00 Uhr',
    image: 'https://picsum.photos/800/400?random=1',
    description:
      'Neujahrskonzert mit dem Stadtorchester. Lassen Sie sich von den Klängen des Orchesters verzaubern und starten Sie das neue Jahr musikalisch.',
  },
  {
    date: '15. Januar 2023',
    time: '10:00 - 16:00 Uhr',
    image: 'https://picsum.photos/800/400?random=2',
    description:
      'Winterflohmarkt im Gemeindezentrum. Stöbern Sie nach Schätzen und Schnäppchen und genießen Sie die gemütliche Atmosphäre.',
  },
  {
    date: '20. Januar 2023',
    time: '20:30 Uhr',
    image: 'https://picsum.photos/800/400?random=3',
    description:
      'Comedy-Show mit dem bekannten Comedian Max Müller. Lachen Sie herzhaft bei seinen witzigen Geschichten und humorvollen Anekdoten.',
  },
  {
    date: '25. Januar 2023',
    time: '14:00 - 18:00 Uhr',
    image: 'https://picsum.photos/800/400?random=4',
    description:
      'Kindertheater: "Die Abenteuer von Max und Mia". Tauchen Sie ein in die fantastische Welt des Theaters und erleben Sie spannende Geschichten für die ganze Familie.',
  },
  {
    date: '31. Januar 2023',
    time: '19:30 Uhr',
    image: 'https://picsum.photos/800/400?random=5',
    description:
      'Musical-Aufführung: "Die magische Welt". Erleben Sie ein mitreißendes Musical mit beeindruckenden Gesangseinlagen und beeindruckender Bühnenshow.',
  },

  // February
  {
    date: '5. Februar 2023',
    time: '18:00 Uhr',
    image: 'https://picsum.photos/800/400?random=6',
    description:
      'Winterwanderung durch den verschneiten Stadtwald. Genießen Sie die klare Winterluft und die idyllische Landschaft bei einem Spaziergang in der Natur.',
  },
  {
    date: '10. Februar 2023',
    time: '20:00 Uhr',
    image: 'https://picsum.photos/800/400?random=7',
    description:
      'Kabarett-Abend mit der bekannten Kabarettistin Lisa Schmidt. Freuen Sie sich auf einen Abend voller satirischer Pointen und geistreicher Unterhaltung.',
  },
  {
    date: '15. Februar 2023',
    time: '19:30 Uhr',
    image: 'https://picsum.photos/800/400?random=8',
    description:
      'Konzert des Jugendchors "Harmonie". Lassen Sie sich von den jungen Stimmen begeistern und erleben Sie ein abwechslungsreiches Programm.',
  },
  {
    date: '20. Februar 2023',
    time: '10:00 - 16:00 Uhr',
    image: 'https://picsum.photos/800/400?random=9',
    description:
      'Antikmarkt auf dem historischen Marktplatz. Tauchen Sie ein in vergangene Zeiten und entdecken Sie antike Möbel, Schmuck und andere Raritäten.',
  },
  {
    date: '28. Februar 2023',
    time: '20:00 Uhr',
    image: 'https://picsum.photos/800/400?random=10',
    description:
      'Poetry Slam: "Wortakrobatik". Erleben Sie einen Abend voller Poesie und Sprachkunst, wenn talentierte Poeten ihre selbst geschriebenen Texte vortragen.',
  },

  // March
  {
    date: '5. März 2023',
    time: '15:00 Uhr',
    image: 'https://picsum.photos/800/400?random=11',
    description:
      'Kinderkarneval im Bürgerhaus. Feiern Sie mit uns eine kunterbunte Karnevalsparty mit Musik, Spielen und tollen Kostümen.',
  },
  {
    date: '10. März 2023',
    time: '20:00 Uhr',
    image: 'https://picsum.photos/800/400??random=12',
    description:
      'Theateraufführung: "Der verrückte Hutmacher". Tauchen Sie ein in diese turbulente Komödie und erleben Sie einen unvergesslichen Abend voller Lachen und Spaß.',
  },
  {
    date: '15. März 2023',
    time: '19:30 Uhr',
    image: 'https://picsum.photos/800/400?random=13',
    description:
      'Konzert der lokalen Band "Klangzauber". Genießen Sie einen Abend voller mitreißender Musik und guter Stimmung. Die Band präsentiert eine Mischung aus Rock, Pop und Funk. Eintritt frei.',
  },
  {
    date: '20. März 2023',
    time: '10:00 - 16:00 Uhr',
    image: 'https://picsum.photos/800/400?random=14',
    description:
      'Frühlingsmarkt auf dem Marktplatz. Genießen Sie die ersten warmen Tage des Jahres und schlendern Sie über den Markt, der mit Blumen, regionalen Produkten und Handwerkskunst lockt.',
  },
  {
    date: '25. März 2023',
    time: '19:00 Uhr',
    image: 'https://picsum.photos/800/400?random=15',
    description:
      'Tanzabend: "Let\'s Dance". Zeigen Sie Ihre besten Moves und tanzen Sie zu den angesagtesten Hits der Saison. Für Tanzbegeisterte jeden Alters.',
  },
]

export default () => (
  <>
    <NavBar />
    <EventOverviewPage events={events} />
  </>
)
