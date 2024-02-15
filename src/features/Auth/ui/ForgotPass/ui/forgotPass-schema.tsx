import { z } from 'zod'

export const forgotPassSchema = z.object({
  email: z.string().email(),
})
