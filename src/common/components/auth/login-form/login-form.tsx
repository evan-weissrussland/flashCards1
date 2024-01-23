import { useController, useForm } from 'react-hook-form'

import { loginSchema } from '@/common/components/auth/login-form/login-schema'
import { FormValues } from '@/common/components/auth/login-form/types'
import { Button } from '@/common/components/button'
import { CheckboxComponent } from '@/common/components/checkbox'
import { Input } from '@/common/components/input'
import { zodResolver } from '@hookform/resolvers/zod'

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  })

  console.log('errors: ', errors)

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue: false,
    name: 'rememberMe',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        error={errors.email?.message}
        label={'email'}
        style={{ width: '250px' }}
      />
      <Input
        {...register('password')}
        error={errors.password?.message}
        label={'password'}
        style={{ width: '250px' }}
      />
      <CheckboxComponent
        checked={value}
        id={'q2'}
        name={'rememberMe'}
        onCheckedChange={onChange}
        theme={'dark'}
        value={'c1'}
        variant={'Body 2'}
      >
        rememberMe
      </CheckboxComponent>
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}