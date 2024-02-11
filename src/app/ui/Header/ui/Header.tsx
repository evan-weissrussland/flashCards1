import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserIdContext } from '@/app/ui/App'
import { Button } from '@/common/components/button'
import { DropDownHeader } from '@/features/DropDownHeader'

import s from './header.module.scss'

type Props = {
  email: string
  name: string
}

export const Header: FC<Props> = ({ email, name }) => {
  const navigate = useNavigate()
  const userId = useContext(UserIdContext)
  //перенаправляем на страницу создания аккаунта
  const signInHandler = () => {
    navigate('/signIn')
  }

  return (
    <div className={s.header}>
      <div>
        <img alt={'logo'} src={'../../../../public/LogoITIncub.svg'} />
      </div>
      <div>
        {!userId ? (
          <Button onClick={signInHandler} variant={'primary'}>
            Sign In
          </Button>
        ) : (
          <DropDownHeader email={email} name={name} />
        )}
      </div>
    </div>
  )
}
