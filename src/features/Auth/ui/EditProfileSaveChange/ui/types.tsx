import { modalSchema } from '@/features/Auth/ui/EditProfileSaveChange/ui/modal-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof modalSchema>
