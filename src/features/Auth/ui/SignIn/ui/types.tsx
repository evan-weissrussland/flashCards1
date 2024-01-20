import { signInSchema } from '@/features/Auth/ui/SignIn/ui/signIn-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof signInSchema>
