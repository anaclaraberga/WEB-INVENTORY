import { z } from "zod"

export const productFormSchema = z.object({
  id: z
    .number({
      required_error: 'O produto precisa ter um preço',
      message: 'Preço inválido'
    })
    .positive()
    .nullable(),
  name: z
    .string({ required_error: "O Produto precisa ter um nome" })
    .min(3, {
      message: 'Nome precisa ter no mínimo 3 caracteres',
    })
    .max(200, {
      message: 'Nome não pode ser maior que 200 caracteres',
    }),
  description: z
    .string({
      required_error: 'Produto precisa ter uma descrição',
    })
    .min(3),
  price: z
    .number({
      required_error: 'O produto precisa ter um preço',
      message: 'Preço inválido'
    })
    .positive(),
  quantity: z
    .number({
      required_error: 'O produto precisa ter uma quantidade',
      message: 'Quantidade inválida'
    })
    .positive()
    .nonnegative(),
  image: z
    .instanceof(FileList),
  fornecedorId: z
    .string({
      required_error: 'O produto precisa ter um fornecedor',
    })
})

export type ProductFormValues = z.infer<typeof productFormSchema>

export const defaultValues: Partial<ProductFormValues> = {
  id: null,
  name: '',
  description: '',
  price: 0,
}