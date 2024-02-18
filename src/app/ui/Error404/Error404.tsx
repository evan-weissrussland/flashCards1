import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import errorPage from '@/common/images/404.svg'

import s from './error404.module.scss'

export const Error404 = () => {
  const navigate = useNavigate()
  const returnToHomePageHandler = useCallback(() => {
    navigate('/decks')
  }, [])

  return (
    <div className={s.errorWr}>
      <img alt={'404'} src={errorPage} />
      <p>Sorry! Page not found!</p>
      <Button onClick={returnToHomePageHandler}>Back to home page</Button>
    </div>
  )
}
