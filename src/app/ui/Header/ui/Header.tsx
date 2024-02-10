import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '@/app/ui/App'
import { Button } from '@/common/components/button'

import s from './header.module.scss'

import { DropDown } from '../../../../common/components/dropDownForHeader'

type Props = {
  email: string
  name: string
}

export const Header: FC<Props> = ({ email, name }) => {
  const navigate = useNavigate()
  //вытягивам из контекста APP userIdЖ если он есть, то мы залогинены
  const resultIdAuthMe = useContext(Context)
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
        {!resultIdAuthMe ? (
          <Button onClick={signInHandler} variant={'primary'}>
            Sign In
          </Button>
        ) : (
          <DropDown email={email} name={name} />
        )}
      </div>
    </div>
  )
}
