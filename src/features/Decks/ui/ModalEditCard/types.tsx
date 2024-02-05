import { modalSchema } from '@/features/Decks/ui/ModalEditCard/modal-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof modalSchema>
