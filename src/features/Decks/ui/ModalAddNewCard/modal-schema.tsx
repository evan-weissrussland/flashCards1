import { z } from 'zod'

export const modalSchema = z.object({
  answer: z.string().min(3),
  imageAnswer: z.any().optional(),
  imageQuestion: z.any().optional(),
  question: z.string().min(3),
})
