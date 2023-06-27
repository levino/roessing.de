import Image from 'next/image'
import React from 'react'

export interface EventProps {
  date: string
  time: string
  image: string
  description: string
}

export const Event: React.FC<EventProps> = (event) => (
  <div className="flex mb-4">
    <div className="w-1/3">
      <Image
        src={event.image}
        alt="Event Preview"
        width={300}
        height={200}
        className="rounded"
      />
    </div>
    <div className="w-2/3 pl-4">
      <p className="font-bold">{event.date}</p>
      <p className="text-gray-600">{event.time}</p>
      <p className="text-sm mt-2">{event.description.substring(0, 300)}...</p>
    </div>
  </div>
)
