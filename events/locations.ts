import { Place } from 'schema-dts'

const nordstemmen = {
  addressLocality: 'Nordstemmen',
  postalCode: '31171',
}
export const locations = {
  hofKoenneke: {
    '@type': 'Place',
    name: 'Hof Könneke',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pfarrstr. 6',
      ...nordstemmen,
    },
  } as Place,
  kleingartenVerein: {
    '@type': 'Place',
    name: 'Kleingartenverein Rössing e.V.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Am Rössingbach',
      ...nordstemmen,
      telephone: '+4950693109',
    },
  } as Place,
  kirche: {
    '@type': 'Place',
    name: 'St. Peter und Paul Kirche',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kirchstraße 9',
      ...nordstemmen,
    },
  } as Place,
  dorfgemeinschaftshausBarnten: {
    '@type': 'Place',
    name: 'Dorfgemeinschaftshaus Barnten',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Glückaufstraße 1',
      ...nordstemmen,
    },
  } as Place,
  streuobstwiese: {
    '@type': 'Place',
    name: 'Streuobstwiese Rössing',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Am Rössingbach',
      ...nordstemmen,
    },
  } as Place,
  dorfgemeinschaftshausRoessing: {
    '@type': 'Place',
    name: 'Dorfgemeinschaftshaus Rössing',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kirchstraße 2',
      ...nordstemmen,
    },
  } as Place,
  langeWanne: {
    '@type': 'Place',
    name: 'Lange Wanne',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Lange Wanne',
      ...nordstemmen,
    },
  } as Place,
}
