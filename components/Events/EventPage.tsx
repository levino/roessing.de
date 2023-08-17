import Script from 'next/script'
import { Event as EventType } from 'src/event'
import Image from 'next/image'
import React from 'react'
import * as O from 'fp-ts/Option'
import { Option } from 'fp-ts/Option'
import { AddressLink, Description } from './Components'
import { StaticImport, StaticRequire } from 'next/dist/shared/lib/get-img-props'
import { timeAndDate } from './tools'

const EndDate: React.FC<{ endDate: Option<Date>; className: string }> = ({
  endDate,
  className,
}) =>
  O.match(
    () => null,
    (endDate: Date) => <p className={className}>Ende: {timeAndDate(endDate)}</p>
  )(endDate)

export const EventPage: React.FC<EventType> = (event) => {
  const { location, name, startDate, endDate, description, image } = event
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
      <div className="flex flex-col mb-4 container mx-auto">
        <div className="w-full mx-auto max-h-64 overflow-hidden my-12">
          {O.match(
            () => null,
            (image: StaticImport) => (
              <Image
                sizes="100vw"
                placeholder="blur"
                priority
                src={image}
                alt="Event Preview"
                className="rounded mb-4"
              />
            )
          )(image)}
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 pl-4">
          <p className="font-bold text-xl mb-2">{name}</p>
          <p className="text-gray-600 mb-2">Beginn: {timeAndDate(startDate)}</p>
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
            className="text-sm mt-2 whitespace-pre-line"
          />
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
