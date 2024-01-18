import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'

export const CreateNewPass = () => {
  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography
        style={{ marginBottom: '27px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Large'}
      >
        Create New Password
      </Typography>
      <div style={{ marginBottom: '36px' }}>
        <Input className={'password'} label={'Password'} type={'password'} />
      </div>
      <Typography style={{ marginBottom: '41px' }} theme={'dark'} variant={'Body 2'}>
        Create new password and we will send you further instructions to email
      </Typography>
      <Button style={{ marginBottom: '20px' }}>Create New Password</Button>
    </Card>
  )
}
