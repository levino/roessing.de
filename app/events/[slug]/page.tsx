import { eventsBySlug } from 'data/events'
import { EventPage } from 'components/Events/EventPage'
import React from 'react'
export const generateStaticParams = async () => Object.keys(eventsBySlug)

interface EventPageProps {
  params: { slug: string }
}

export const generateMetadata = ({ params: { slug } }: EventPageProps) => {
  const { name: title, description } = eventsBySlug[slug]
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  }
}

const Page: React.FC<EventPageProps> = ({ params: { slug } }) => (
  <EventPage {...eventsBySlug[slug]} />
)

export default Page
