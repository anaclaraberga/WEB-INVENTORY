import { z } from "zod"

export const orderFormSchema = z.object({
  id: z
    .number({ required_error: "O pedido precisa ter um id" })
    .optional()
    .nullable(),
  products: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().min(1, 'Quantidade deve ser no mínimo 1'),
    })
  ),
  clientId: z
    .string({ required_error: "O pedido precisa ter um cliente" }),
  date: z.date({ required_error: "Data não informada" }).optional(),
  status: z
    .string({ required_error: "O pedido precisa ter um status atual" })
    .optional(),
})

export type OrderFormValues = z.infer<typeof orderFormSchema>

export const defaultValues: OrderFormValues = {
  id: null,
  products: [],
  clientId: "",
  date: new Date(),
  status: "CRIADO"
}