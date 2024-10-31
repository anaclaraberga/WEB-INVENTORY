import { z } from "zod"

export const userFormSchema = z.object({
  id: z
    .number()
    .optional()
    .nullable(),
  name: z
    .string({ required_error: "O client precisa ter um nome" })
    .min(3, {
      message: 'Nome precisa ter no mínimo 3 caracteres',
    })
    .max(200, {
      message: 'Nome não pode ser maior que 200 caracteres',
    }),
  email: z
    .string({ required_error: "O usuário precisa ter um email" })
    .email(),
  password: z
    .string({ required_error: "O usuário precisa ter um meio de contato" })
    .min(7),
  confirm: z
    .string(),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords don't match",
  path: ["confirm"],
})

export type UserFormValues = z.infer<typeof userFormSchema>

export const defaultValues: Partial<UserFormValues> = {
  id: null,
  name: '',
  email: '',
  password: '',
}