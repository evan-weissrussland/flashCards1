import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5000000

export const modalSchema = z.object({
  answer: z.string().min(3),
  imageAnswer: z.union([
    z
      .any()
      .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: '.jpg, .jpeg, .png and .webp files are accepted.',
      })
      .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: `Max file size is 5MB.`,
      }),
    z.any().optional(),
  ]),
  imageQuestion: z.union([
    z
      .any()
      .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: '.jpg, .jpeg, .png and .webp files are accepted.',
      })
      .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: `Max file size is 5MB.`,
      }),
    z.any().optional(),
  ]),
  question: z.string().min(3),
})
