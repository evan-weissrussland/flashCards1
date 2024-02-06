import { modalSchema } from '@/features/Decks/ui/ModalAddNewCard/modal-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof modalSchema>
