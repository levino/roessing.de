import { EventOverviewPage } from 'components/Events/EventsPage'
import React from 'react'
import events from 'data/events.json'

export default () => (
  <EventOverviewPage
    //@ts-expect-error Autotypes of json import are incorrect
    events={events.map((event, index) => ({
      id: index.toString(),
      ...event,
    }))}
  />
)
