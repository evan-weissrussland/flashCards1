import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'

export const SignUp = () => {
  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography style={{ textAlign: 'center' }} theme={'dark'} variant={'Large'}>
        Sign Up
      </Typography>
      <div style={{ marginBottom: '36px' }}>
        <Input label={'Email'} />
        <Input className={'password'} label={'Password'} type={'password'} />
        <Input className={'password'} label={'Confirm Password'} type={'password'} />
      </div>
      <Button style={{ marginBottom: '20px' }}>Sign Un</Button>
      <Typography
        style={{ marginBottom: '5px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Body 2'}
      >
        Already have an account?
      </Typography>
      <div style={{ textAlign: 'center' }}>
        <Button variant={'link'}>Sign In</Button>
      </div>
    </Card>
  )
}
