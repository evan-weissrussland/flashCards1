import { signUpSchema } from '@/features/Auth/ui/SignUp/ui/signUp-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof signUpSchema>
