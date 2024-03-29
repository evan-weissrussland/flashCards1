import { z } from 'zod'

export const modalSchema = z.object({
  answer: z.string(),
  imageAnswer: z.any().optional(),
  imageQuestion: z.any().optional(),
  question: z.string(),
})
