import Script from 'next/script'
import { Event as EventProps } from './types'
import Image from 'next/image'
import React from 'react'
import { NextSeo } from 'next-seo'

export const EventPage: React.FC<EventProps & { id: string }> = (event) => {
  const { location, name, startDate, endDate, description, image } = event

  const formattedLocation = `${location.address?.streetAddress}, ${location.address?.postalCode} ${location.address?.addressLocality}`

  return (
    <>
      <NextSeo title={event.name} description={event.description} />
      <Script id="eventData" type="application/ld+json">
        {JSON.stringify(event)}
      </Script>
      <div className="flex flex-col mb-4 container mx-auto">
        <div className="w-full mx-auto max-h-64 overflow-hidden my-12">
          <Image
            src={image?.[0] || ''}
            alt="Event Preview"
            width={1200}
            height={800}
            className="rounded mb-4"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 pl-4">
          <p className="font-bold text-xl mb-2">{name}</p>
          <p className="text-gray-600 mb-2">Beginn: {timeAndDate(startDate)}</p>
          <p className="text-gray-600 mb-2">Ende: {timeAndDate(endDate)}</p>
          <p className="text-gray-600 mb-2">
            Ort:{' '}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                formattedLocation
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {formattedLocation}
            </a>
          </p>
          <p className="text-sm mt-4 whitespace-pre-line">{description}</p>
        </div>
      </div>
    </>
  )
}

const timeAndDate = (date: string) =>
  new Date(date).toLocaleString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
