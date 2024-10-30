import { z } from 'zod'

export const clientSchema = z.object({
  id: z.string(),
  name: z.string(),
  document: z.string(),
  contact: z.string(),
  address: z.string(),
})

export type ClientSchema = z.infer<typeof clientSchema>
