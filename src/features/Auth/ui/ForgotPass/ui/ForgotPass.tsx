import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'
import { useRecoverPassMutation } from '@/features/Auth/api/authMe-api'
import { forgotPassSchema } from '@/features/Auth/ui/ForgotPass/ui/forgotPass-schema'
import { FormValues } from '@/features/Auth/ui/ForgotPass/ui/types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './forgotPass.module.scss'

export const ForgotPass = () => {
  //хук изменения URL
  const navigate = useNavigate()
  //хук RTKQ запрос за изменением пароля
  const [recoverPass] = useRecoverPassMutation()
  //хук для управления формой из react-hook-form
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(forgotPassSchema),
  })
  /**
   * обработчик формы
   * @param data - объект с данными из полей формы
   */
  const onSubmit = async (data: FormValues) => {
    await recoverPass({ email: data.email }).unwrap()
    navigate(`/checkEmail?email=${data.email}`)
  }
  //функция изменения URL
  const toSignInHandler = useCallback(() => {
    navigate('/signIn')
  }, [])

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
          <Input {...register('email')} error={errors.email?.message} label={'Email'} />
        </div>
        <Typography style={{ marginBottom: '65px' }} theme={'dark'} variant={'Body 2'}>
          <span className={s.colorLight900}>
            Enter your email address and we will send you further instructions
          </span>
        </Typography>
        <Button fullWidth style={{ marginBottom: '20px' }} type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <Typography
        style={{ marginBottom: '5px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Body 2'}
      >
        <span className={s.colorLight900}>Did you remember your password?</span>
      </Typography>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={toSignInHandler} style={{ textDecoration: 'underline' }} variant={'link'}>
          Try loggin in
        </Button>
      </div>
    </Card>
  )
}
