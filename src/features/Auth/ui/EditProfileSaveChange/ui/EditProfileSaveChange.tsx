import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'

export const EditProfileSaveChange = () => {
  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography
        style={{ marginBottom: '27px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Large'}
      >
        Personal Information
      </Typography>
      <div style={{ marginBottom: '12px', textAlign: 'center' }}>
        <img alt={'ava'} src={'../../../../public/Ellipse%201.png'} />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <Input label={'NickName'} />
      </div>
      <div>
        <Button>Save Changes</Button>
      </div>
    </Card>
  )
}
