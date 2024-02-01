import { z } from 'zod'

export const modalSchema = z.object({
  namePack: z.string(),
  privatePack: z.boolean().default(false),
})
