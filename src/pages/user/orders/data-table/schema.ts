import { z } from 'zod'

export const orderSchema = z.object({
  id: z.string(),
  status: z.string(),
  clientId: z.string(),
  products: z.any(),
  date: z.date(),
})

export type OrderSchema = z.infer<typeof orderSchema>
