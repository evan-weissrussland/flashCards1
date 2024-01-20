import { forgotPassSchema } from '@/features/Auth/ui/ForgotPass/ui/forgotPass-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof forgotPassSchema>
