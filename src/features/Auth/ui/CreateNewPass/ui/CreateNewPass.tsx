import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { ErrorData } from '@/app/model/types'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'
import { useResetPassMutation } from '@/features/Auth/api/authMe-api'
import { createNewPassSchema } from '@/features/Auth/ui/CreateNewPass/ui/createNewPass-schema'
import { FormValues } from '@/features/Auth/ui/CreateNewPass/ui/types'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './createNewPass.module.scss'

export const CreateNewPass = () => {
  //хук считывает данные из URL после двоеточия (endpoint/:ххх)
  const params = useParams()
  //хук изменения URL
  const navigate = useNavigate()
  //хук RTKQ для сброса пароля
  const [resetPass, { error }] = useResetPassMutation()
  //обработка формы react-hook-form
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(createNewPassSchema),
  })
  /**
   * функция обработки формы
   * @param data - объект с данными из полей формы
   */
  const onSubmit = async (data: FormValues) => {
    if (params.token) {
      await resetPass({
        args: { password: data.password },
        token: params.token,
      }).unwrap()
      navigate('/signIn')
    }
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
          Create New Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '36px' }}>
            <Input
              error={errors.password?.message}
              {...register('password')}
              className={'password'}
              label={'Password'}
              type={'password'}
            />
          </div>
          <Typography style={{ marginBottom: '41px' }} theme={'dark'} variant={'Body 2'}>
            <span className={s.colorLight900}>
              Create new password and we will send you further instructions to email
            </span>
          </Typography>
          <Button fullWidth style={{ marginBottom: '20px' }} type={'submit'}>
            Create New Password
          </Button>
        </form>
      </Card>
      <span>{narrowingError}</span>
    </>
  )
}
