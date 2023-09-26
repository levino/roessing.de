import { DateFromISOString, optionFromNullable } from 'io-ts-types'

import * as t from 'io-ts'
import { FC } from 'react'
import { StaticImageData } from 'next/image'

const staticImport = new t.Type<StaticImageData, StaticImageData, unknown>(
  'StaticImport',
  (input): input is StaticImageData => true,
  (input) => t.success(input as StaticImageData),
  t.identity
)

const reactNode = new t.Type<FC, FC, unknown>(
  'ReactNode',
  (input): input is FC => true,
  (input) => t.success(input as FC),
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

export const EventData = t.type({
  startDate: DateFromISOString,
  endDate: optionFromNullable(DateFromISOString),
  name: t.string,
  location: Location,
  image: optionFromNullable(staticImport),
  description: optionFromNullable(t.string),
  url: optionFromNullable(t.string),
  organizer: optionFromNullable(Organization),
})

export const Event = t.type({
  data: EventData,
  default: reactNode,
  slug: optionFromNullable(t.string),
})

export type Event = t.TypeOf<typeof Event>
export type EventData = t.TypeOf<typeof EventData>
export type Organization = t.TypeOf<typeof Organization>
export type Address = t.TypeOf<typeof Address>

export type Validation = ReturnType<typeof Event.decode>
