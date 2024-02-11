import { useController, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ErrorData } from '@/app/model/types'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { CheckboxComponent } from '@/common/components/checkbox'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'
import { useLogInMutation } from '@/features/Auth/api/authMe-api'
import { signInSchema } from '@/features/Auth/ui/SignIn/ui/signIn-schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormValues } from './types'

export const SignIn = () => {
  //хук из RTKQ для логинизации в приложении
  const [logIn, { error }] = useLogInMutation()

  const navigate = useNavigate()

  //обработка и валидация формы
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  })
  /**
   * обработчик формы. посылает данные на сервер для входа в приложение
   * @param data - данные из полей формы
   */
  const onSubmit = (data: FormValues) => {
    logIn(data)
  }
  //контроллер из библиотеки react-hook-form для чекбокса
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: false,
    name: 'rememberMe',
  })
  //изменение URL
  const toSignUpHandler = () => {
    navigate('/signUp')
  }
  //переменная, которой будет присвоена ошибка из хука RTKQ. Выводим её паользователю
  let narrowingError

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
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input {...register('email')} error={errors.email?.message} label={'Email'} />
            <Input
              {...register('password')}
              className={'password'}
              error={errors.password?.message}
              label={'Password'}
              type={'password'}
            />
          </div>
          <div>
            <CheckboxComponent
              checked={value}
              id={'rememberMe'}
              name={'RememberMe'}
              onCheckedChange={onChange}
              theme={'dark'}
              value={'on'}
              variant={'Body 2'}
            >
              Remember Me
            </CheckboxComponent>
          </div>
          <Typography
            style={{ marginBottom: '66px', paddingRight: '20px', textAlign: 'right' }}
            theme={'dark'}
            variant={'Body 2'}
          >
            Forgot Password?
          </Typography>
          <Button style={{ marginBottom: '20px' }} type={'submit'}>
            Sign In
          </Button>
        </form>
        <Typography
          style={{ marginBottom: '5px', textAlign: 'center' }}
          theme={'dark'}
          variant={'Body 2'}
        >
          Don't have an account?
        </Typography>
        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={toSignUpHandler}
            style={{ textDecoration: 'underline' }}
            variant={'link'}
          >
            Sign Up
          </Button>
        </div>
      </Card>
      <span>{narrowingError}</span>
    </>
  )
}
