import { Button } from '@/components/ui/button'
import { DropDown } from '@/components/ui/dropDown'

import s from './header.module.scss'

export const Header = () => {
  //вытягивам из Redux'а состояние: залогинен или нет
  const isLogged = true
  const signInHandler = () => {
    //здесь диспатч санккреатора: вход на сайт
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
