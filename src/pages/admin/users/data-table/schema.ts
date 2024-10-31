import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirm: z.string(),
})

export type UserSchema = z.infer<typeof userSchema>
