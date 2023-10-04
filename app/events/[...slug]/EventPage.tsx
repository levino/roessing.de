import Script from 'next/script'
import { Event as EventType, EventData, Organization } from 'data/events/event'
import Image, { StaticImageData } from 'next/image'
import React from 'react'
import * as O from 'fp-ts/Option'
import { Option } from 'fp-ts/Option'
import {
  AddressLink,
  ExternalLink,
} from '../../../components/Events/Components'
import { onRight, timeAndDate } from '../../../components/Events/tools'

const EndDate: React.FC<{ endDate: Option<Date>; className: string }> = ({
  endDate,
  className,
}) =>
  O.match(
    () => null,
    (endDate: Date) => <p className={className}>Ende: {timeAndDate(endDate)}</p>
  )(endDate)

export const EventPage: React.FC<EventType> = (event) => {
  const { location, name, startDate, endDate, image, organizer } = event.data
  return (
    <>
      <Script id="eventData" type="application/ld+json">
        {JSON.stringify({
          '@type': 'Event',
          ...EventData.encode(event.data),
          url: onRight((slug) => `https://rössing.de/events/${slug}`)(
            event.slug
          ),
          '@context': 'https://schema.org',
          ...ImageJson(image),
        })}
      </Script>
      <div className="w-full mx-auto max-h-32 md:max-h-48 lg:max-h-64 overflow-hidden mb-4">
        {onRight((image: StaticImageData) => (
          <Image
            sizes="100vw"
            placeholder="blur"
            priority
            src={image}
            alt="Event Preview"
            className="rounded mb-4 -translate-y-2/4 mx-auto"
          />
        ))(image)}
      </div>
      <div className="flex flex-col mb-4 container mx-auto">
        <div className="w-full md:w-1/2 lg:w-2/3 pl-4 mx-auto">
          <div className="pb-2">
            <h1 className="font-bold text-2xl mb-2 dark:text-slate-100">
              {name}
            </h1>
            <p className="text-gray-600 dark:text-slate-200">
              Beginn: {timeAndDate(startDate)}
            </p>
            <EndDate endDate={endDate} className="text-gray-600 mb-2" />
            <p className="text-gray-600 mb-2 dark:text-slate-300">
              Ort:{' '}
              <AddressLink
                address={location.address}
                className="text-blue-500 hover:underline"
              />
            </p>
            <div className="prose dark:prose-invert">
              <event.default />
            </div>
          </div>
          <Organizer organizer={organizer} />
        </div>
      </div>
    </>
  )
}

const ImageJson = O.match(
  () => ({}),
  (image: StaticImageData) => ({
    image: [`https://rössing.de${image.src}`],
  })
)
const Organizer = ({ organizer }: { organizer: Option<Organization> }) =>
  O.match(
    () => null,
    (organizer: Organization) => (
      <>
        <h2 className="font-bold text-lg text-slate-700 dark:text-slate-300">
          {organizer.name}
        </h2>
        {onRight((email: string) => (
          <p className="text-gray-600 dark:text-slate-200">
            E-Mail:{' '}
            <ExternalLink href={`mailto:${email}`}>{email}</ExternalLink>
          </p>
        ))(organizer.email)}
        {onRight((telephone: string) => (
          <p className="text-gray-600 dark:text-slate-200">
            Telefon:{' '}
            <ExternalLink href={`tel:${telephone}`}>{telephone}</ExternalLink>
          </p>
        ))(organizer.telephone)}
      </>
    )
  )(organizer)
