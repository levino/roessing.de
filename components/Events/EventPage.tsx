import Script from 'next/script'
import { Event } from './Event'
import { Event as EventProps } from './types'

export const EventPage: React.FC<EventProps & { id: string }> = (props) => (
  <>
    <Script id="eventData" type="application/ld+json">
      {JSON.stringify(props)}
    </Script>

    <Event {...props} />
  </>
)
