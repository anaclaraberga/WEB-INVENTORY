import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string(),
  fornecedorId: z.string(),
})

export type ProductSchema = z.infer<typeof productSchema>
