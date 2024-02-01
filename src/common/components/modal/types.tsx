import { modalSchema } from '@/common/components/modal/modal-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof modalSchema>
