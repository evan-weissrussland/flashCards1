import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { CheckboxComponent } from '@/common/components/checkbox'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'

export const SignIn = () => {
  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography style={{ textAlign: 'center' }} theme={'dark'} variant={'Large'}>
        Sign In
      </Typography>
      <div>
        <Input label={'Email'} />
        <Input className={'password'} label={'Password'} type={'password'} />
      </div>
      <div>
        <CheckboxComponent
          id={'rememberMe'}
          name={'RememberMe'}
          theme={'dark'}
          value={'on'}
          variant={'Body 2'}
        >
          Remember Me
        </CheckboxComponent>
      </div>
      <Typography
        style={{ marginBottom: '66px', paddingRight: '20px', textAlign: 'right' }}
        theme={'dark'}
        variant={'Body 2'}
      >
        Forgot Password?
      </Typography>
      <Button style={{ marginBottom: '20px' }}>Sign In</Button>
      <Typography
        style={{ marginBottom: '5px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Body 2'}
      >{`Don't have an account?`}</Typography>
      <div style={{ textAlign: 'center' }}>
        <Button variant={'link'}>Sign Up</Button>
      </div>
    </Card>
  )
}
