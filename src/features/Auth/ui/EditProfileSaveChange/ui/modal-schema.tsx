import { z } from 'zod'

export const modalSchema = z.object({
  name: z.string().min(1),
})
