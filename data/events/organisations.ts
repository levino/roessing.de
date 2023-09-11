import { Organization as DTSOrganization } from 'schema-dts'
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
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Stettiner Straße 3',
      addressLocality: 'Nordstemmen',
      postalCode: '31171',
    },
  } as Organization,
}
