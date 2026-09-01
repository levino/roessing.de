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

/**
 * Koordinaten eines Ortes (schema.org GeoCoordinates). Freiwillig — wo sie
 * stehen, landen sie auch in `/events.json` und die Dorf-App kann den Termin
 * auf der Karte zeigen.
 */
export const geoSchema = z.object({
  '@type': z.enum(['GeoCoordinates']),
  latitude: z.number(),
  longitude: z.number(),
})

export const locationSchema = z.object({
  name: z.string(),
  '@type': z.enum(['Place']),
  address: addressSchema.optional(),
  geo: geoSchema.optional(),
  telephone: z.string().optional(),
  url: z.string().url().optional(),
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

/**
 * Das Schema einer Veranstaltung. Wird nicht nur von den beiden
 * Event-Collections benutzt, sondern auch von
 * `src/tools/events/content-rules.test.ts`: Der Test parst die Frontmatter
 * jeder Event-Datei mit js-yaml und prüft sie gegen dieses Schema, damit
 * kaputtes YAML nicht erst im CI-Build auffällt.
 */
export const createEventSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    allDay: z.boolean().optional().default(false),
    location: reference('locations').optional(),
    organizer: reference('organizers').optional(),
    url: z.string().url().optional(),
    image: z
      .object({
        src: image(),
        alt: z.string(),
      })
      .optional(),
    noindex: z.boolean().optional().default(false),
    shortlink: z
      .string()
      .regex(
        /^[a-z0-9]{3}$/,
        'shortlink muss aus genau 3 Zeichen bestehen ([a-z0-9]).',
      )
      .optional(),
  })
const eventCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/events' }),
  schema: createEventSchema,
})

const adventskalenderEventsCollection = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/adventskalender-events',
  }),
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
  'adventskalender-events': adventskalenderEventsCollection,
  locations: locationCollection,
  organizers: organizersCollection,
  docs,
}
