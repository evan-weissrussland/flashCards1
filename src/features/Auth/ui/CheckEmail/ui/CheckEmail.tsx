import { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { CheckEmailIcon } from '@/common/icons/CheckEmailIcon'

export const CheckEmail = () => {
  //считываем query-параметры из URL. Там должен сидеть email, передаваемый из ForgotPassword
  const [searchParams] = useSearchParams()
  //хук для изменения строки URL
  const navigate = useNavigate()
  //email из query-параметра URL
  const email = Object.fromEntries(searchParams).email
  //функция изменения URL по клику на кнопку "перейти на страницу логина
  const backToSignInPageHandler = useCallback(() => {
    navigate('/signIn')
  }, [])

  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography
        style={{ marginBottom: '51px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Large'}
      >
        Check Email
      </Typography>
      <div style={{ marginBottom: '19px', textAlign: 'center' }}>
        <CheckEmailIcon />
      </div>
      <Typography
        style={{ marginBottom: '65px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Body 2'}
      >
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button onClick={backToSignInPageHandler} style={{ marginBottom: '20px' }}>
        Back to Sign In
      </Button>
    </Card>
  )
}
