import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { CheckEmailIcon } from '@/common/icons/icons'

export const CheckEmail = () => {
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
        `We’ve sent an Email with instructions to example@mail.com`
      </Typography>
      <Button style={{ marginBottom: '20px' }}>Back to Sign In</Button>
    </Card>
  )
}
