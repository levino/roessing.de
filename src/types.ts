import type { CollectionEntry } from 'astro:content'

export type Event = CollectionEntry<'events'>
export type Organizer = CollectionEntry<'organizers'>
export type Location = CollectionEntry<'locations'>
export type FullEvent = Event & {
  data: Omit<Event['data'], 'organizer' | 'location'> & {
    organizer: Organizer
    location: Location
  }
}
