import { useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'
import { createNewPassSchema } from '@/features/Auth/ui/CreateNewPass/ui/createNewPass-schema'
import { FormValues } from '@/features/Auth/ui/CreateNewPass/ui/types'
import { zodResolver } from '@hookform/resolvers/zod'

export const CreateNewPass = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(createNewPassSchema),
  })

  console.log('errors: ', errors)

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
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
          Create new password and we will send you further instructions to email
        </Typography>
        <Button style={{ marginBottom: '20px' }} type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
