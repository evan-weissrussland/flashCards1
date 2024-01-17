import { useState } from 'react'

import { Header } from '@/components/ui/Header/Header'
import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'
import { DropDown } from '@/components/ui/dropDown'
import { Input } from '@/components/ui/input'
import { Paginator } from '@/components/ui/paginator/paginator'
import { RadioGroup } from '@/components/ui/radioGroupV2/radioGroup'
import { RadioGroupItem } from '@/components/ui/radioGroupV2/radioGroupItem'
import { SelectComponent } from '@/components/ui/select'
import { SelectContent } from '@/components/ui/selectV2/selectContent'
import { SelectItem } from '@/components/ui/selectV2/selectItem'
import { SelectTrigger } from '@/components/ui/selectV2/selectTrigger'
import { Select } from '@/components/ui/selectV2/selectV2'

import { RadioButton } from './components/ui/radioGroupV1'

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
        <Input placeholder={'Input'} type={'search'} />
        <CheckboxComponent theme={'dark'} variant={'Body 2'}>
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
    </>
  )
}
