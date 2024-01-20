import { z } from 'zod'

export const forgotPassSchema = z.object({
  password: z.string().min(3),
})
