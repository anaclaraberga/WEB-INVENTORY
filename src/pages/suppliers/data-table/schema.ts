import { z } from 'zod'

export const supplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  contact: z.string(),
  address: z.number(),
})

export type SupplierSchema = z.infer<typeof supplierSchema>
