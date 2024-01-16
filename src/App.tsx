import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'
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
      <div style={{ padding: '20px' }}>
        <Button as={'a'} href={'https://google.com'} icon>
          Hello
        </Button>
        <Button disabled icon>
          Button primary
        </Button>
      </div>
      <div>
        <Input type={'search'} />
        <CheckboxComponent variant={'Body 2'}>asdvdhhsd</CheckboxComponent>
      </div>
      <div data-select={''}>
        <SelectComponent variant={'Body 1'} />
      </div>
      <div data-selectV2={''}>
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
      <div data-radioButton={''}>
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
        />
      </div>
      <div data-radioGroupV2={''}>
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
            value={'ReactNode1'}
            variant={'Body 2'}
          />
          <RadioGroupItem
            disabled={false}
            id={'q2'}
            label={'RadioGroup'}
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
          totalItemsCount={1000}
        />
      </div>
    </>
  )
}
