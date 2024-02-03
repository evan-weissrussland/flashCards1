import { modalSchema } from '@/features/Decks/ui/ModalEditDeck/modal-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof modalSchema>
