import { z } from 'astro:content'

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
