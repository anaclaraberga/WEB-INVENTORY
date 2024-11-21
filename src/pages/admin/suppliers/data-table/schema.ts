import { z } from 'zod'

export const supplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  contact: z.string(),
  cnpj: z.string(),
  address: z.string(),
})

export type SupplierSchema = z.infer<typeof supplierSchema>
