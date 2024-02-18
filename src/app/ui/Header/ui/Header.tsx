import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import logo from '@/common/images/LogoITIncub.svg'
import { Responce } from '@/features/Auth/api/authMe-api'
import { DropDownHeader } from '@/features/DropDownHeader'

import s from './header.module.scss'

type Props = {
  data: Responce
}
export const Header = memo(({ data }: Props) => {
  const navigate = useNavigate()
  //перенаправляем на страницу создания аккаунта
  const signInHandler = useCallback(() => {
    navigate('/signIn')
  }, [])

  return (
    <div className={s.header}>
      <div>
        <img alt={'logo'} src={logo} />
      </div>
      <div>
        {!data ? (
          <Button onClick={signInHandler} variant={'primary'}>
            Sign In
          </Button>
        ) : (
          <DropDownHeader avatar={data?.avatar} email={data?.email} name={data?.name} />
        )}
      </div>
    </div>
  )
})
