import { z } from 'zod'

export const signUpSchema = z.object({
  confirmPassword: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
})
