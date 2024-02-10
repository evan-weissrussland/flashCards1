import { modalSchema } from '@/features/Decks/ui/ModalLearnToDeck/modal-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof modalSchema>
