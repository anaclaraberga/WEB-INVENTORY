import { z } from "zod"

export const clientFormSchema = z.object({
  name: z
    .string({ required_error: "O client precisa ter um nome" })
    .min(3, {
      message: 'Nome precisa ter no mínimo 3 caracteres',
    })
    .max(200, {
      message: 'Nome não pode ser maior que 200 caracteres',
    }),
  document: z
    .string({ required_error: "O cliente precisa ter um documento" })
    .min(11)
    .max(14),
  contact: z
    .string({ required_error: "O client precisa ter um meio de contato" })
    .min(3),
  address: z
    .string()
    .min(3)
    .optional()
})

export type ClientFormValues = z.infer<typeof clientFormSchema>

export const defaultValues: Partial<ClientFormValues> = {
  name: '',
  contact: '',
  address: ''
}