import { useController, useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import { CheckboxComponent } from '@/common/components/checkbox'
import { Input } from '@/common/components/input'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const LoginForm = () => {
  const { control, handleSubmit, register } = useForm<FormValues>()

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
      <Input {...register('email')} label={'email'} style={{ width: '250px' }} />
      <Input {...register('password')} label={'password'} style={{ width: '250px' }} />
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
