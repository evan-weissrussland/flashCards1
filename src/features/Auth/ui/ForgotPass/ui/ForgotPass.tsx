import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'
import { signUpSchema } from '@/features/Auth/ui/SignUp/ui/signUp-schema'
import { FormValues } from '@/features/Auth/ui/SignUp/ui/types'
import { zodResolver } from '@hookform/resolvers/zod'

export const ForgotPass = () => {
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  })

  console.log('errors: ', errors)

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  const toSignInHandler = () => {
    navigate('/signIn')
  }

  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography
        style={{ marginBottom: '51px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Large'}
      >
        Forgot your password?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input {...register('password')} error={errors.password?.message} label={'Email'} />
        </div>
        <Typography style={{ marginBottom: '65px' }} theme={'dark'} variant={'Body 2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button style={{ marginBottom: '20px' }} type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <Typography
        style={{ marginBottom: '5px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Body 2'}
      >
        Did you remember your password?
      </Typography>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={toSignInHandler} style={{ textDecoration: 'underline' }} variant={'link'}>
          Try loggin in
        </Button>
      </div>
    </Card>
  )
}
