import { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  DropDown,
  DropDownContent,
  DropDownGroup,
  DropDownItem,
  DropDownLabel,
  DropDownTrigger,
} from '@/common/components/dropDown'
import { Typography } from '@/common/components/typography'
import { LogOutIcon } from '@/common/icons/LogOutIcon'
import { MyProfileIcon } from '@/common/icons/MyProfileIcon'
import defaultAva from '@/common/images/Ellipse 1.png'
import { useLogOutMutation } from '@/features/Auth/api/authMe-api'

type Props = {
  avatar: string
  className?: string
  email: string
  name: string
}

export const DropDownHeader = memo(({ avatar, email, name }: Props) => {
  const navigate = useNavigate()

  //открыть/закрыть модальное окно DropDown
  const [open, setOpen] = useState(false)

  //хук RTKQ для вылогинивания
  const [logOut] = useLogOutMutation()

  //обработчик вылогинивания
  const logOutHandler = useCallback(() => {
    logOut()
      .unwrap()
      .then(() => {
        navigate('/signIn')
      })
      .finally(() => {
        setOpen(false)
      })
  }, [])

  //обработчик изменения URL и закрытия окна дропдауна в родительской компоненте
  const getToMyProfileHandler = useCallback(() => {
    navigate('/myProfile')
    setOpen(false)
  }, [])

  return (
    <>
      <DropDown onOpenChange={setOpen} open={open}>
        <DropDownTrigger>
          <div style={{ display: 'inline-flex', gap: '14px' }}>
            <Typography theme={'dark'} variant={'Subtitle 1'}>
              <span
                style={{
                  borderBottomStyle: 'dashed',
                }}
              >
                {name}
              </span>
            </Typography>
            <img
              alt={'ava'}
              src={avatar ? avatar : defaultAva}
              style={{
                borderRadius: '50%',
                flexShrink: '0',
                height: '36px',
                objectFit: 'cover',
                width: '36px',
              }}
            />
          </div>
        </DropDownTrigger>
        <DropDownContent
          align={'end'}
          alignOffset={-40}
          sideOffset={18}
          style={{
            backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <DropDownLabel>
            <img
              alt={'ava'}
              src={avatar ? avatar : defaultAva}
              style={{
                borderRadius: '50%',
                height: '36px',
                objectFit: 'cover',
                width: '36px',
              }}
            />
            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <Typography theme={'dark'} variant={'Subtitle 2'}>
                {name}
              </Typography>
              <Typography dataColor variant={'Caption'}>
                {email}
              </Typography>
            </div>
          </DropDownLabel>
          <div>
            <DropDownGroup>
              <DropDownItem onclick={getToMyProfileHandler}>
                <MyProfileIcon />
                <Typography theme={'dark'} variant={'Caption'}>
                  My Profile
                </Typography>
              </DropDownItem>
              <DropDownItem onclick={logOutHandler}>
                <LogOutIcon />
                <Typography theme={'dark'} variant={'Caption'}>
                  Sign Out
                </Typography>
              </DropDownItem>
            </DropDownGroup>
          </div>
        </DropDownContent>
      </DropDown>
    </>
  )
})
