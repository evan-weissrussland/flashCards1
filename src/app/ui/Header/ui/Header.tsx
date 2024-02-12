import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'
import { DropDownHeader } from '@/features/DropDownHeader'

import s from './header.module.scss'

export const Header = () => {
  const navigate = useNavigate()
  const { data } = useAuthMeQuery() //перенаправляем на страницу создания аккаунта
  const signInHandler = () => {
    navigate('/signIn')
  }

  return (
    <div className={s.header}>
      <div>
        <img alt={'logo'} src={'../../../../public/LogoITIncub.svg'} />
      </div>
      <div>
        {!data ? (
          <Button onClick={signInHandler} variant={'primary'}>
            Sign In
          </Button>
        ) : (
          <DropDownHeader email={data?.email} name={data?.name} />
        )}
      </div>
    </div>
  )
}
