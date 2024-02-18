import { ChangeEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '@/app/ui/Spinner/Spinner'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { EditIcon } from '@/common/icons/EditIcon'
import defaultAva from '@/common/images/Ellipse 1.png'
import {
  useAuthMeQuery,
  useLogOutMutation,
  useUpdateUserDataMutation,
} from '@/features/Auth/api/authMe-api'

export const EditProfileLogout = () => {
  //хук RTKQ запрос залогинены юзер или нет
  const { data, isFetching } = useAuthMeQuery()
  //хук изменения URL
  const navigate = useNavigate()
  //хук RTKQ изменения персональных данных юзера (в данной компоненте - аватары)
  const [updateUserData] = useUpdateUserDataMutation()
  //хук RTKQ вылогинивания
  const [logOut] = useLogOutMutation()

  //функция вылогинивания и при успешном вылогинивании изменяем URL
  const logOutHandler = () => {
    logOut()
      .unwrap()
      .then(() => {
        navigate('/signIn')
      })
  }

  //функция изменения URL
  const getToChangeNameHandler = useCallback(() => {
    navigate('/saveChangeMyProfile')
  }, [])

  //функция загрузки картинки из ПК
  const uploadAvaHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const formData = new FormData()

      formData.append('name', data?.name as string)
      formData.append('avatar', e.target.files[0])

      updateUserData(formData)
    }
  }

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
          <Typography
            style={{ marginBottom: '27px', textAlign: 'center' }}
            theme={'dark'}
            variant={'Large'}
          >
            Personal Information
          </Typography>
          <div style={{ marginBottom: '19px', textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', position: 'relative' }}>
              <img
                alt={'ava'}
                src={data?.avatar ? data.avatar : defaultAva}
                style={{ borderRadius: '100%', height: '96px', objectFit: 'cover', width: '96px' }}
              />
              <div style={{ bottom: '0', position: 'absolute', right: '0' }}>
                <label>
                  <input onChange={uploadAvaHandler} style={{ display: 'none' }} type={'file'} />
                  <Button as={'span'} className={'padding4px'} variant={'secondary'}>
                    <EditIcon />
                  </Button>
                </label>
              </div>
            </div>
          </div>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: '9px',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Typography style={{}} theme={'dark'} variant={'H1'}>
              {data?.name}
            </Typography>
            <Button className={'padding4px'} onClick={getToChangeNameHandler} variant={'secondary'}>
              <EditIcon />
            </Button>
          </div>
          <Typography
            style={{ marginBottom: '13px', textAlign: 'center' }}
            theme={'dark'}
            variant={'Body 2'}
          >
            {data?.email}
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <Button
              icon={'logout'}
              onClick={logOutHandler}
              style={{ textAlign: 'center' }}
              variant={'secondary'}
            >
              Logout
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
