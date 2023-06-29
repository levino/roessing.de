import Image from 'next/image'
import React from 'react'
import { Event as EventProps } from './types'
import Link from 'next/link'

type Props = EventProps & {
  id: string
}

export const Event: React.FC<Props> = (event) => (
  <>
    <Link className="flex" href={getHref(event)} target={getTarget(event)}>
      <div className="hidden md:flex flex mb-4">
        <div className="w-1/3 my-auto">
          <Image
            src={event.image?.[0] || ''}
            alt="Event Preview"
            width={300}
            height={200}
            className="rounded"
          />
        </div>
        <div className="w-2/3 pl-4 my-auto">
          <p className="font-bold">{event.name}</p>
          <p className="font-gray-800">{event.location.name}</p>
          <p className="text-gray-600">{timeAndDate(event.startDate)}</p>
          <div className="text-sm mt-2 whitespace-pre-line">
            {event.description}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:hidden mb-8">
        <div className="flex mb-2">
          <div className="w-1/3 my-auto">
            <Image
              src={event.image?.[0] || ''}
              alt="Event Preview"
              width={300}
              height={200}
              className="rounded"
            />
          </div>
          <div className="pl-2">
            <p className="font-bold">{event.name}</p>
            <p className="font-gray-800">{event.location.name}</p>
            <p className="text-gray-600">{timeAndDate(event.startDate)}</p>
          </div>
        </div>

        <div className="text-sm mt-2 whitespace-pre-line">
          {event.description}
        </div>
      </div>
    </Link>
  </>
)

const timeAndDate = (date: string) =>
  new Date(date).toLocaleString('de-DE', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

const getHref = (event: Props): string => event.link ?? `/events/${event.id}`
const getTarget = (event: Props): string => (event.link ? '_blank' : '_self')
