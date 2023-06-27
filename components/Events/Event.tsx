import Image from 'next/image'
import React from 'react'
import { Event as EventProps } from './types'
import Link from 'next/link'

export const Event: React.FC<EventProps & { id: string }> = (event) => (
  <Link href={`/events/${event.id}`} className="flex mb-4">
    <div className="w-1/3">
      <Image
        src={event.image?.[0] || ''}
        alt="Event Preview"
        width={300}
        height={200}
        className="rounded"
      />
    </div>
    <div className="w-2/3 pl-4">
      <p className="font-bold">{event.startDate}</p>
      <p className="text-gray-600">{event.endDate}</p>
      <p className="text-sm mt-2">{event.description}</p>
    </div>
  </Link>
)