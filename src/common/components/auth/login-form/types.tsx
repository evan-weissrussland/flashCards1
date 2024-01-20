import { loginSchema } from '@/common/components/auth/login-form/login-schema'
import { z } from 'zod'

export type FormValues = z.infer<typeof loginSchema>
