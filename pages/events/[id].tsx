import events from '../../data/events.json'
import { EventPage } from 'components/Events/EventPage'
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [...Array(events.length).keys()].map((id) => ({
      params: { id: id.toString() },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    id: params?.id,
  },
})

const Page: React.FC<{ id: string }> = ({ id }) => (
  <EventPage id={id} {...events[parseInt(id)]} />
)

export default Page
