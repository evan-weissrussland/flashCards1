import { z } from 'zod'

export const modalSchema = z.object({
  namePack: z.string().min(3),
  privatePack: z.boolean().default(false),
})
