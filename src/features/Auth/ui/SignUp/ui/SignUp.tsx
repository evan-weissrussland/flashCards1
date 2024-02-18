import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ErrorData } from '@/app/model/types'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'
import { useSignUpMutation } from '@/features/Auth/api/authMe-api'
import { signUpSchema } from '@/features/Auth/ui/SignUp/ui/signUp-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormValues } from './types'

export const SignUp = () => {
  //хук изменения URL
  const navigate = useNavigate()
  //хук обработки и валидации формы
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
  })
  //переменная, которой будет присвоена ошибка из хука RTKQ. Выводим её паользователю
  let narrowingError
  //хук RTKQ регистрация в приложении
  const [signUp, { error }] = useSignUpMutation()
  /**
   * обработчик формы
   * @param data - объект с данными из полей формы
   */
  const onSubmit = (data: FormValues) => {
    if (data.password === data.confirmPassword) {
      signUp({ email: data.email, password: data.password })
    } else {
      narrowingError = 'подтвердите пароль'
    }
  }
  //функция изменения URL
  const toSignInHandler = useCallback(() => {
    navigate('/signIn')
  }, [])

  //определение типа ошибки из RTKQ: если есть свойство status в объекте error, то тип error - FetchBaseQueryError, иначе тип - SerializedError. Дополнительно протипизировал объект data, иначе при обращении к свойству data.message появляется ошибка
  if (error) {
    if ('status' in error) {
      const errorDate = error.data as ErrorData

      narrowingError = errorDate.message
    } else {
      narrowingError = error.message
    }
  }

  return (
    <>
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
          <Button
            onClick={toSignInHandler}
            style={{ textDecoration: 'underline' }}
            variant={'link'}
          >
            Sign In
          </Button>
        </div>
      </Card>
      <span>{narrowingError}</span>
    </>
  )
}
