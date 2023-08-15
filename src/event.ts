import { DateFromISOString, optionFromNullable } from 'io-ts-types'

import * as t from 'io-ts'
import { StaticRequire } from 'next/dist/shared/lib/get-img-props'

const staticImport = new t.Type<StaticRequire, StaticRequire, unknown>(
  'StaticImport',
  (input): input is StaticRequire => true,
  (input) => t.success(input as StaticRequire),
  t.identity
)

export const Address = t.type({
  streetAddress: t.string,
  postalCode: t.string,
  addressLocality: t.string,
  addressCountry: optionFromNullable(t.string),
})

export const Person = t.type({
  name: t.string,
  address: optionFromNullable(Address),
  telephone: optionFromNullable(t.string),
  email: optionFromNullable(t.string),
})

export const Organization = t.type({
  address: optionFromNullable(Address),
  name: t.string,
  telephone: optionFromNullable(t.string),
  email: optionFromNullable(t.string),
})
export const Location = t.type({
  name: t.string,
  address: optionFromNullable(Address),
})
export const Event = t.type({
  startDate: DateFromISOString,
  endDate: optionFromNullable(DateFromISOString),
  name: t.string,
  location: Location,
  image: staticImport,
  description: optionFromNullable(t.string),
  url: optionFromNullable(t.string),
  slug: t.string,
})

export type Event = t.TypeOf<typeof Event>

export type Address = t.TypeOf<typeof Address>

export type Validation = ReturnType<typeof Event.decode>
