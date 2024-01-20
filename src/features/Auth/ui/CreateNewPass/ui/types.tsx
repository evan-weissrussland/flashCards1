import { createNewPassSchema } from '@/features/Auth/ui/CreateNewPass/ui/createNewPass-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof createNewPassSchema>
