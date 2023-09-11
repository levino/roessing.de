import Script from 'next/script'
import { Event as EventType, Organization } from 'src/event'
import Image from 'next/image'
import React from 'react'
import * as O from 'fp-ts/Option'
import { Option } from 'fp-ts/Option'
import { AddressLink, Description, ExternalLink } from './Components'
import { StaticImport, StaticRequire } from 'next/dist/shared/lib/get-img-props'
import { onRight, timeAndDate } from './tools'

const EndDate: React.FC<{ endDate: Option<Date>; className: string }> = ({
  endDate,
  className,
}) =>
  O.match(
    () => null,
    (endDate: Date) => <p className={className}>Ende: {timeAndDate(endDate)}</p>
  )(endDate)

export const EventPage: React.FC<EventType> = (event) => {
  const { location, name, startDate, endDate, description, image, organizer } =
    event
  return (
    <>
      <Script id="eventData" type="application/ld+json">
        {JSON.stringify({
          ...EventType.encode(event),
          url: `https://rössing.de/events/${event.slug}`,
          '@context': 'https://schema.org',
          ...ImageJson(event.image),
        })}
      </Script>
      <div className="w-full mx-auto max-h-32 md:max-h-48 lg:max-h-64 overflow-hidden mb-4">
        {onRight((image: StaticImport) => (
          <Image
            sizes="100vw"
            placeholder="blur"
            priority
            src={image}
            alt="Event Preview"
            className="rounded mb-4 -translate-y-2/4"
          />
        ))(image)}
      </div>
      <div className="flex flex-col mb-4 container mx-auto">
        <div className="w-full md:w-1/2 lg:w-2/3 pl-4 mx-auto">
          <div className="pb-2">
            <h1 className="font-bold text-2xl mb-2">{name}</h1>
            <p className="text-gray-600">Beginn: {timeAndDate(startDate)}</p>
            <EndDate endDate={endDate} className="text-gray-600 mb-2" />
            <p className="text-gray-600 mb-2">
              Ort:{' '}
              <AddressLink
                address={location.address}
                className="text-blue-500 hover:underline"
              />
            </p>
            <Description
              description={description}
              className="text-gray-800 mt-2 whitespace-pre-line mb-2"
            />
          </div>
          <Organizer organizer={organizer} />
        </div>
      </div>
    </>
  )
}

const ImageJson = O.match(
  () => ({}),
  (image: StaticRequire) => ({
    image: [`https://rössing.de/${image.default.src}`],
  })
)
const Organizer = ({ organizer }: { organizer: Option<Organization> }) =>
  O.match(
    () => null,
    (organizer: Organization) => (
      <>
        <h2 className="font-bold text-lg">{organizer.name}</h2>
        {onRight((email: string) => (
          <p className="text-gray-600">
            E-Mail:{' '}
            <ExternalLink href={`mailto:${email}`}>{email}</ExternalLink>
          </p>
        ))(organizer.email)}
        {onRight((telephone: string) => (
          <p className="text-gray-600">
            Telefon:{' '}
            <ExternalLink href={`tel:${telephone}`}>{telephone}</ExternalLink>
          </p>
        ))(organizer.telephone)}
      </>
    )
  )(organizer)
