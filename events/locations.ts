import { Place } from 'schema-dts'
const nordstemmen = {
  addressLocality: 'Nordstemmen',
  postalCode: '31171',
  addressCountry: 'DE',
}

export const locations = {
  streuobstwieseRoessing: {
    '@type': 'Place',
    name: 'Streuobstwiese Rössing',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Am Rössingbach',
      ...nordstemmen,
    },
  } satisfies Place,
  dorfgemeinschaftshausRoessing: {
    '@type': 'Place',
    name: 'Dorfgemeinschaftshaus Rössing',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kirchstraße 3',
      ...nordstemmen,
    },
  } satisfies Place,
  stubenrauchHalle: {
    '@type': 'Place',

    name: 'Alfred Stubenrauch Halle',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Loderwinkel 2A',
      ...nordstemmen,
    },
  } satisfies Place,
  hofKoenneke: {
    '@type': 'Place',
    name: 'Hof Könneke',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pfarrstr. 6',
      ...nordstemmen,
    },
  } satisfies Place,
  kleingartenVerein: {
    '@type': 'Place',
    name: 'Kleingartenverein Rössing e.V.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Am Rössingbach',
      ...nordstemmen,
      telephone: '+4950693109',
    },
  } satisfies Place,
  kirche: {
    '@type': 'Place',
    name: 'St. Peter und Paul Kirche',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kirchstraße 9',
      ...nordstemmen,
    },
  } satisfies Place,
  dorfgemeinschaftshausBarnten: {
    '@type': 'Place',
    name: 'Dorfgemeinschaftshaus Barnten',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Glückaufstraße 1',
      ...nordstemmen,
    },
  } satisfies Place,
  langeWanne: {
    '@type': 'Place',
    name: 'Lange Wanne',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lange Wanne',
      ...nordstemmen,
    },
  } satisfies Place,
  hofBaumgarten: {
    '@type': 'Place',
    name: 'Hof Baumgarten',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lange Straße 4A',
      ...nordstemmen,
    },
  } satisfies Place,
  ehrenmal: {
    '@type': 'Place',
    name: 'Rössinger Ehrenmal',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Karlstraße 2',
      ...nordstemmen,
    },
  } satisfies Place,
  schlosssaal: {
    '@type': 'Place',
    name: 'Schlosssaal im Schloss Rössing',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unter den Eichen 3',
      ...nordstemmen,
    },
  } satisfies Place,
}
