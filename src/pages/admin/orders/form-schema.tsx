import { z } from "zod"

export const orderFormSchema = z.object({
  id: z
    .number({ required_error: "O pedido precisa ter um id" })
    .optional()
    .nullable(),
  products: z.array(
    z.object({
      productId: z.string(),
      image: z.string(),
      price: z.number().positive(),
      name: z.string(),
      quantity: z.number().min(1, 'Quantidade deve ser no mínimo 1'),
    })
  ),
  selectedProduct: z.string(),
  clientId: z
    .string({ required_error: "O pedido precisa ter um cliente" }),
  date: z.date({ required_error: "Data não informada" }),
  status: z
    .string({ required_error: "O pedido precisa ter um status atual" })
})

export type OrderFormValues = z.infer<typeof orderFormSchema>

export const defaultValues: OrderFormValues = {
  id: null,
  products: [],
  clientId: "",
  selectedProduct: "",
  status: "",
  date: new Date(),
}