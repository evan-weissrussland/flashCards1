import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { CheckEmailIcon, EditIcon } from '@/common/icons/icons'

export const EditProfileLogout = () => {
  //email из стэйта
  const email = 'example@mail.com'

  return (
    <Card className={'border'} style={{ padding: '33px 36px 25px 27px' }}>
      <Typography
        style={{ marginBottom: '27px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Large'}
      >
        Personal Information
      </Typography>
      <div style={{ marginBottom: '19px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', position: 'relative' }}>
          <img alt={'ava'} src={'../../../../public/Ellipse%201.png'} />
          <div style={{ bottom: '0', position: 'absolute', right: '0' }}>
            <Button className={'padding4px'} variant={'secondary'}>
              <EditIcon />
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '9px',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography style={{}} theme={'dark'} variant={'H1'}>
          Ivan
        </Typography>
        <EditIcon />
      </div>
      <Typography
        style={{ marginBottom: '13px', textAlign: 'center' }}
        theme={'dark'}
        variant={'Body 2'}
      >
        User Email
      </Typography>
      <div style={{ textAlign: 'center' }}>
        <Button icon style={{ textAlign: 'center' }} variant={'secondary'}>
          Logout
        </Button>
      </div>
    </Card>
  )
}
