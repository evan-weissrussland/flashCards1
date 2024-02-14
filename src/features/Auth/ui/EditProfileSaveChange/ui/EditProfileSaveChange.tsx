import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'
import { useAuthMeQuery, useUpdateUserDataMutation } from '@/features/Auth/api/authMe-api'
import { modalSchema } from '@/features/Auth/ui/EditProfileSaveChange/ui/modal-schema'
import { FormValues } from '@/features/Auth/ui/EditProfileSaveChange/ui/types'
import { zodResolver } from '@hookform/resolvers/zod'

import defaultAva from '../../../../../../public/Ellipse 1.png'

export const EditProfileSaveChange = () => {
  const { data, isFetching } = useAuthMeQuery()

  const navigate = useNavigate()
  const [updateUserData] = useUpdateUserDataMutation()

  //обработка форм
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(modalSchema),
  })

  const onSubmit = async (dataForm: FormValues) => {
    const formData = new FormData()

    formData.append('name', dataForm.name)
    formData.append('avatar', data?.avatar as string)
    try {
      await updateUserData(formData).unwrap()
      navigate('/myProfile')
    } catch (e: any) {
      console.log(e)
    }
  }

  if (isFetching) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        ...Read Card
      </div>
    )
  }

  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography
        style={{ marginBottom: '27px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Large'}
      >
        Personal Information
      </Typography>
      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <img
          alt={'ava'}
          src={data?.avatar ? data.avatar : defaultAva}
          style={{ borderRadius: '100%', height: '96px', objectFit: 'cover', width: '96px' }}
        />
      </div>

      <div style={{ width: '100%' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '16px' }}>
            <Input
              {...register('name', { value: data?.name })}
              error={errors.name?.message}
              label={'NickName'}
            />
          </div>
          <div style={{ width: '100%' }}>
            <Button fullWidth type={'submit'}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}
