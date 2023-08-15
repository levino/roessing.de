import * as Images from './images'

import { Event as SchemaOrgEvent } from 'schema-dts'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property]
}
export type Event = Omit<
  WithRequiredProperty<SchemaOrgEvent, 'startDate'>,
  'image' | 'url' | 'description' | 'string'
> & {
  image?: StaticImport
  url?: string
  description?: string
  name?: string
  slug: string
}

export const events: Event[] = [
  {
    '@type': 'Event',
    name: '5. Hof- und Garagenflohmarkt',
    startDate: '2023-07-15T10:00:00+02:00',
    endDate: '2023-07-15T16:00:00+02:00',
    location: {
      '@type': 'Place',
      name: 'Rössing',
    },
    image: Images.flohmarkt,
    description:
      'Der traditionelle Hof- und Garagenflohmarkt in Rössing findet am 15. Juli 2023 statt. An diesem Tag öffnen die Rössinger ihre Höfe und Garagen und bieten ihre Schätze zum Verkauf an. Die Bürgerstiftung Rössing organisiert den Flohmarkt und bietet auf dem Dorfplatz Kaffee und Kuchen an. Der Erlös kommt der Bürgerstiftung zugute.',
    url: 'https://buergerstiftung-roessing.de/aktuelles/',
    slug: 'garagenFlohmarkt2023',
  },
  {
    '@type': 'Event',
    name: 'Altpapiersammlung',
    location: {
      '@type': 'Place',
      name: 'Hof Könneke',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pfarrstr. 6',
        postalCode: '31171',
        addressLocality: 'Nordstemmen',
      },
    },
    startDate: '2023-07-08T09:00',
    endDate: '2023-07-08T12:00',
    image: Images.papiersammlung,
    slug: 'altpapier2023',
    description:
      'Die Fußballer*innen der SG Rössing/Barnten werden wieder Euer Altpapier entgegennehmen.\nEs wird nicht mehr eingesammelt!\nAchtung: Es wird ein Großraumcontainer auf dem Hof Könneke, in der Pfarrstr. 6, für das Altpapier bereitstehen. Wer keine Möglichkeit hat, das Altpapier zu bringen, kann sich bei Erich Könneke melden. Die Erlöse kommen allen Mannschaften der Fußballsparte zugute.',
  },
  {
    '@type': 'Event',
    name: 'Sommerfest Tennis',
    slug: 'sommerfestTennis2023',
    startDate: '2023-07-01T18:00:00',
    endDate: '2023-07-02T00:00:00',
    image: Images.sommerfestTennis,
    location: {
      '@type': 'Place',
      name: 'Tennisanlage des TV Rössing',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Loderwinkel 2',
        addressLocality: 'Nordstemmen - Rössing',
        postalCode: '31171',
        addressCountry: 'Deutschland',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Tennisverein Rössing e.V.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Loderwinkel 1B',
        addressLocality: 'Nordstemmen',
        postalCode: '31171',
        addressCountry: 'Deutschland',
      },
      telephone: '05069/7410',
      email: 'kontakt@tv-roessing.de',
    },
    description:
      'Komm und feiere mit uns beim Sommerfest des Tennisvereins! Es erwartet dich ein geselliges Fest mit gutem Essen und kühlem Bier. Genieße leckere Würstchen und erfrischende Getränke. Die Stimmung wird mit mitreißender Musik angeheizt, sodass du die Tanzfläche erobern kannst. Lerne neue Leute kennen, unterhalte dich und tanze bis Mitternacht. Alle sind herzlich eingeladen, einen unvergesslichen Abend mit uns zu verbringen!',
  },

  {
    '@type': 'Event',
    name: 'Weedbeat - Festival',
    slug: 'weedbeat2023',
    startDate: '2023-07-14T18:00:00',
    endDate: '2023-07-16T18:00:00',
    location: {
      '@type': 'Place',
      name: 'SPEICHER VAZ',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'An d. Zuckerfabrik 50',
        addressLocality: 'Nordstemmen',
        postalCode: '31171',
        addressCountry: 'Deutschland',
      },
    },
    url: 'https://www.weedbeat.de/',
    image: Images.weedbeat,
    organizer: {
      '@type': 'Person',
      name: 'Rico Klose',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Mastbergstraße 19',
        addressLocality: 'Hildesheim',
        postalCode: '31137',
        addressCountry: 'Deutschland',
      },
    },
    description:
      'Die Mischung aus Deko, mit Sand, Palmen und Licht, die Düfte der Food Stände und die gemeinsame Freude zur Live-Musik, sorgt für eine Illusion der Besucher, einen Kurzurlaub zu genießen. Vor verschiedenen Bühnen gilt es sich zum Rhythmus zu bewegen oder sich in den verteilten Lounges einfach mal eine Auszeit zu gönnen.',
  },
  {
    '@type': 'Event',
    slug: 'blutspendeJuli2023',
    name: 'Blutspende DRK',
    startDate: '2023-07-24T16:30:00',
    endDate: '2023-07-24T19:30:00',
    location: {
      '@type': 'Place',
      name: 'Dorfgemeinschaftshaus Rössing',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kirchstraße 3',
        addressLocality: 'Nordstemmen',
        postalCode: '31171',
        addressCountry: 'Deutschland',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'DRK-Blutspendedienst NSTOB gGmbH',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Eldagsener Straße 38',
        addressLocality: 'Springe',
        postalCode: '31830',
        addressCountry: 'Deutschland',
      },
      telephone: '05041 772-0',
      faxNumber: '05041 772-208',
      email: 'info@bsd-nstob.de',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '0800 11 949 11',
        contactType: 'customer service',
      },
    },
    description:
      'Hilf Leben retten! Wir laden dich herzlich zur Blutspende ein. Deine Blutspende kann einen Unterschied machen und Leben verändern. Jede Spende zählt und kann Menschen in Not helfen. Komm zu unserer Blutspendeaktion und unterstütze diese wichtige Sache. Als Dankeschön erwartet dich neben der Möglichkeit, Leben zu retten, auch eine Stärkung mit belegten Brötchen. Bitte sei Teil dieser wertvollen Aktion und komm vorbei. Deine Spende kann Leben retten!',
    image: Images.blutspende,
    url: 'https://www.drk-blutspende.de/blutspendetermine/termine/284042?term=31171',
  },
  {
    '@type': 'Event',
    slug: 'braunkohlWanderung2023Kleingarten',
    name: 'Braunkohlwanderung',
    startDate: '2023-12-17',
    organizer: {
      '@type': 'Organization',
      name: 'Kleingartenverein Rössing e.V.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Am Rössingbach',
        addressLocality: 'Nordstemmen',
        postalCode: '31171',
        telephone: '+4950693109',
      },
    },
  },
]