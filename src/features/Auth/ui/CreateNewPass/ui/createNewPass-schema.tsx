import { z } from 'zod'

export const createNewPassSchema = z.object({
  password: z.string().min(3),
})
