import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'

export const ForgotPass = () => {
  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography
        style={{ marginBottom: '51px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Large'}
      >
        Forgot your password?
      </Typography>
      <div>
        <Input label={'Email'} />
      </div>
      <Typography style={{ marginBottom: '65px' }} theme={'dark'} variant={'Body 2'}>
        Enter your email address and we will send you further instructions
      </Typography>
      <Button style={{ marginBottom: '20px' }}>Send Instructions</Button>
      <Typography
        style={{ marginBottom: '5px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Body 2'}
      >
        Did you remember your password?
      </Typography>
      <div style={{ textAlign: 'center' }}>
        <Button style={{ textDecoration: 'underline' }} variant={'link'}>
          Try loggin in
        </Button>
      </div>
    </Card>
  )
}
