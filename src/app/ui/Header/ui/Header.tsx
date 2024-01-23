import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { DropDown } from '@/common/components/dropDown'

import s from './header.module.scss'

export const Header = () => {
  const navigate = useNavigate()
  //вытягивам из Redux'а состояние: залогинен или нет
  const isLogged = false
  const signInHandler = () => {
    //перенаправляем на страницу создания аккаунта
    navigate('/signIn')
  }

  return (
    <div className={s.header}>
      <div>
        <img alt={'logo'} src={'../../../../public/LogoITIncub.svg'} />
      </div>
      <div>
        {!isLogged ? (
          <Button onClick={signInHandler} variant={'primary'}>
            Sign In
          </Button>
        ) : (
          <DropDown />
        )}
      </div>
    </div>
  )
}
