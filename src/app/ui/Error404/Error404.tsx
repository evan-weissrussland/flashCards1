import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'

import s from './error404.module.scss'

export const Error404 = () => {
  const navigate = useNavigate()
  const returnToHomePageHandler = () => {
    navigate('/signIn')
  }

  return (
    <div className={s.errorWr}>
      <img alt={'404'} src={'@/../public/image/404.svg'} />
      <p>Sorry! Page not found!</p>
      <Button onClick={returnToHomePageHandler}>Back to home page</Button>
    </div>
  )
}
