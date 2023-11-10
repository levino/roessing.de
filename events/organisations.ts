import { Organization as DTSOrganization, Person } from 'schema-dts'

type Organization = Exclude<DTSOrganization, string>
export const organisations = {
  vsv: {
    name: 'Volkssportvereinigung von 1897 Rössing e.V.',
    '@type': 'Organization',
    address: {
      '@type': 'PostalAddress',
      postalCode: '31171',
      streetAddress: 'Pfarrstraße 6',
      addressLocality: 'Nordstemmen',
    },
    telephone: '+4950697415',
  } as Organization,
  kleingartenVerein: {
    '@type': 'Organization',
    name: 'Kleingartenverein Rössing e.V.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Am Rössingbach',
      addressLocality: 'Nordstemmen',
      postalCode: '31171',
      telephone: '+4950693109',
    },
  } as Organization,
  dorfpflege: {
    '@type': 'Organization',
    name: 'Dorfpflege Rössing e.V.',
    url: 'https://dorfplege-roessing.de',
    email: 'dorfpflege.roessing@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stettiner Straße 3',
      addressLocality: 'Nordstemmen',
      postalCode: '31171',
    },
  } as Organization,
  kulturkreis: {
    '@type': 'Organization',
    name: 'Kulturkreis Rössing e.V.',
    email: 'roessingerkulturkreis@gmail.com',
    telephone: '+49506934413',
  } as Organization,
  cdu: {
    '@type': 'Organization',
    name: 'CDU Rössing',
    email: 'udietrich-roessing@t-online.de',
    telephone: '+49506934413',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Maschstraße 6',
      addressLocality: 'Nordstemmen',
      postalCode: '31171',
    },
  } as Organization,
  ortsrat: {
    '@type': 'Organization',
    name: 'Ortsrat Rössing',
  } as Organization,
  drk: {
    '@type': 'Organization',
    name: 'DRK-Blutspendedienst',
  } as Organization,
  titaVonRoessing: {
    '@type': 'Person',
    name: 'Tita von Rössing',
    email: 'tita@vonroessing.com',
  } as Person,
  landfrauen: {
    '@type': 'Organization',
    name: 'Landfrauen Rössing-Barnten',
    email: 'hesse.roessing@t-online.de',
  } as Organization,
}
