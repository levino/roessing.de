import {
  defineCollection,
  z,
  reference,
  type SchemaContext,
} from 'astro:content'
import { locationSchema, organizerSchema } from '@/schema'

const createEventSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    location: reference('locations').optional(),
    organizer: reference('organizers').optional(),
    url: z.string().url().optional(),
    image: z
      .object({
        src: image(),
        alt: z.string(),
      })
      .optional(),
  })
const eventCollection = defineCollection({
  type: 'content',
  schema: createEventSchema,
})

const locationCollection = defineCollection({
  type: 'data',
  schema: locationSchema,
})
const organizationCollection = defineCollection({
  type: 'data',
  schema: organizerSchema,
})

export const collections = {
  events: eventCollection,
  locations: locationCollection,
  organizers: organizationCollection,
}
