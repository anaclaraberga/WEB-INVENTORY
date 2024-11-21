import { z } from 'zod'

export const transactionSchema = z.object({
  id: z.string(),
  data: z.string(),
  tipo: z.string(),
  valor: z.string(),
  productId: z.string(),
  orderId: z.string(),
})

export type TransactionSchema = z.infer<typeof transactionSchema>
