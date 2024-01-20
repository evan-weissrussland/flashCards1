import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'
import { signUpSchema } from '@/features/Auth/ui/SignUp/ui/signUp-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormValues } from './types'

export const SignUp = () => {
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
        style={{ marginBottom: '27px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Large'}
      >
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '36px' }}>
          <Input {...register('email')} error={errors.email?.message} label={'Email'} />

          <Input
            {...register('password')}
            className={'password'}
            error={errors.password?.message}
            label={'Password'}
            type={'password'}
          />
          <Input
            {...register('confirmPassword')}
            className={'password'}
            error={errors.confirmPassword?.message}
            label={'Confirm Password'}
            type={'password'}
          />
        </div>
        <Button style={{ marginBottom: '20px' }} type={'submit'}>
          Sign Un
        </Button>
      </form>
      <Typography
        style={{ marginBottom: '5px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Body 2'}
      >
        Already have an account?
      </Typography>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={toSignInHandler} style={{ textDecoration: 'underline' }} variant={'link'}>
          Sign In
        </Button>
      </div>
    </Card>
  )
}
