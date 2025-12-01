import {
  defineCollection,
  reference,
  type SchemaContext,
  z,
} from 'astro:content'
import { docsSchema } from '@levino/shipyard-docs'
import { glob } from 'astro/loaders'

export const addressSchema = z.object({
  '@type': z.enum(['PostalAddress']),
  streetAddress: z.string(),
  addressLocality: z.string(),
  postalCode: z.string(),
})

export const locationSchema = z.object({
  name: z.string(),
  '@type': z.enum(['Place']),
  address: addressSchema.optional(),
  telephone: z.string().optional(),
})

export const contactPointSchema = z.object({
  telephone: z.string().optional(),
  contactType: z.string().optional(),
  email: z.string().email().optional(),
})

export const organizerSchema = z.object({
  name: z.string(),
  '@type': z.enum(['Organization', 'Person']),
  address: addressSchema.optional(),
  contactPoint: contactPointSchema.optional(),
  telephone: z.string().optional(),
  email: z.string().email().optional(),
})

export type Organizer = z.infer<typeof organizerSchema>
export type Address = z.infer<typeof addressSchema>
export type Location = z.infer<typeof locationSchema>

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
    excludeFromSitemap: z.boolean().optional().default(false),
  })
const eventCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/events' }),
  schema: createEventSchema,
})

const locationCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yaml', base: './src/data/locations' }),
  schema: locationSchema,
})
const organizersCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yaml', base: './src/data/organizers' }),
  schema: organizerSchema,
})
const docs = defineCollection({
  schema: docsSchema,
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
})

export const collections = {
  events: eventCollection,
  locations: locationCollection,
  organizers: organizersCollection,
  docs,
}
