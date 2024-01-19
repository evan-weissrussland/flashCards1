import { useState } from 'react'

import { Button } from '@/common/components/button'
import { CheckboxComponent } from '@/common/components/checkbox'
import { DropDown } from '@/common/components/dropDown'
import { Input } from '@/common/components/input'
import { Paginator } from '@/common/components/paginator/paginator'
import { RadioButton } from '@/common/components/radioGroupV1'
import { RadioGroup, RadioGroupItem } from '@/common/components/radioGroupV2'
import { SelectComponent } from '@/common/components/select'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/common/components/selectV2'
import { CheckEmail } from '@/features/Auth/ui/CheckEmail/ui'
import { CreateNewPass } from '@/features/Auth/ui/CreateNewPass/ui'
import { EditProfileLogout } from '@/features/Auth/ui/EditProfileLogout/ui'
import { EditProfileSaveChange } from '@/features/Auth/ui/EditProfileSaveChange/ui'
import { ForgotPass } from '@/features/Auth/ui/ForgotPass/ui'
import { Header } from '@/features/Auth/ui/Header/ui'
import { SignIn } from '@/features/Auth/ui/SignIn/ui'
import { SignUp } from '@/features/Auth/ui/SignUp/ui'

export function App() {
  const [currPage, setCurrPage] = useState(1)
  const [pageSize, setPageSize] = useState(30)

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <Button as={'a'} href={'https://google.com'} icon>
          Hello
        </Button>
        <Button disabled icon>
          Button primary
        </Button>
      </div>
      <div>
        <Input placeholder={'Input'} style={{ width: '258px' }} type={'search'} />
        <CheckboxComponent id={'q1'} name={'check1'} theme={'dark'} value={'c1'} variant={'Body 2'}>
          asdvdhhsd
        </CheckboxComponent>
      </div>
      <div data-select={''}>
        <SelectComponent theme={'dark'} variant={'Body 1'} />
      </div>
      <div data-selectv2={''}>
        <Select
          disabled={false}
          label={'Select-box'}
          onValueChange={(v: string) => {
            v
          }}
          typography={'Body 2'}
        >
          <SelectTrigger
            disabled={false}
            placeholder={'Select-box'}
            theme={'dark'}
            typography={'Body 1'}
          ></SelectTrigger>
          <SelectContent>
            <SelectItem disabled={false} typography={'Body 1'} value={'item1'}>
              qwertyu
            </SelectItem>
            <SelectItem disabled={false} typography={'Body 1'} value={'item2'}>
              zxcvbn
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div data-radiobutton={''}>
        <RadioButton
          callback={(v: string) => {
            v
          }}
          defaultValue={'ReactNode1'}
          disabled={false}
          state={[
            { id: 'id1', label: 'RadioGroup', value: 'ReactNode1' },
            { id: 'id2', label: 'RadioGroup', value: 'ReactNode2' },
          ]}
          theme={'dark'}
        />
      </div>
      <div data-radiogroupv2={''}>
        <RadioGroup
          aria-label={'radio1'}
          className={''}
          defaultValue={'ReactNode1'}
          disabled={false}
          onValueChange={(v: string) => {
            v
          }}
        >
          <RadioGroupItem
            disabled={false}
            id={'q1'}
            label={'RadioGroup'}
            theme={'dark'}
            value={'ReactNode1'}
            variant={'Body 2'}
          />
          <RadioGroupItem
            disabled={false}
            id={'q2'}
            label={'RadioGroup'}
            theme={'dark'}
            value={'ReactNode2'}
            variant={'Body 2'}
          />
        </RadioGroup>
      </div>
      <div>
        <Paginator
          currentPage={currPage}
          onPageChanged={(n: number) => {
            setCurrPage(n)
          }}
          onPageSizeChanged={(h: number) => {
            setPageSize(h)
          }}
          pageSize={pageSize}
          theme={'dark'}
          totalItemsCount={1000}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <DropDown />
      </div>
      <SignIn />
      <br />
      <SignUp />
      <br />
      <ForgotPass />
      <br />
      <CheckEmail />
      <br />
      <CreateNewPass />
      <br />
      <EditProfileLogout />
      <br />
      <EditProfileSaveChange />
    </>
  )
}
