import { z } from "zod"

export const supplierFormSchema = z.object({
  id: z
    .number({ required_error: "O fornecedor precisa ter um meio de contato" })
    .optional()
    .nullable(),
  name: z
    .string({ required_error: "O fornecedor precisa ter um nome" })
    .min(3, {
      message: 'Nome precisa ter no mínimo 3 caracteres',
    })
    .max(200, {
      message: 'Nome não pode ser maior que 200 caracteres',
    }),
  contact: z
    .string({ required_error: "O fornecedor precisa ter um meio de contato" })
    .min(3),
  cnpj: z
    .string({ required_error: "O fornecedor precisa ter um cnpj" })
    .min(3),
  address: z
    .string()
    .min(3)
    .optional()
})

export type SupplierFormValues = z.infer<typeof supplierFormSchema>

export const defaultValues: Partial<SupplierFormValues> = {
  id: null,
  name: '',
  cnpj: '',
  contact: '',
  address: ''
}