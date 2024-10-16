import { z } from "zod"

export const productFormSchema = z.object({
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
    .positive(),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, { message: "O arquivo deve ter no máximo 5MB" })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Apenas arquivos JPEG ou PNG são permitidos",
    })
})

export type ProductFormValues = z.infer<typeof productFormSchema>

export const defaultValues: Partial<ProductFormValues> = {
  name: '',
  description: '',
  price: 0,
}