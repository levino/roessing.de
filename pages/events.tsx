import { EventOverviewPage } from 'components/Events/EventsPage'
import React from 'react'
import events from 'data/events.json'

export default () => (
  <EventOverviewPage
    events={events.map((event, index) => ({
      id: index.toString(),
      ...event,
    }))}
  />
)
