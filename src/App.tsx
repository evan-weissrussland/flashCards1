import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RadioGroup } from '@/components/ui/radioGroupV2/radioGroup'
import { RadioGroupItem } from '@/components/ui/radioGroupV2/radioGroupItem'
import { SelectComponent } from '@/components/ui/select'

import { RadioButton } from './components/ui/radioGroupV1'

export function App() {
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
      <div>
        <SelectComponent variant={'Body 1'} />
      </div>
      <div>
        <RadioButton
          callback={(v: string) => {}}
          defaultValue={'ReactNode1'}
          disabled={false}
          state={[
            { id: 'id1', label: 'RadioGroup', value: 'ReactNode1' },
            { id: 'id2', label: 'RadioGroup', value: 'ReactNode2' },
          ]}
        />
      </div>
      <RadioGroup
        aria-label={'radio1'}
        className={''}
        defaultValue={'ReactNode1'}
        disabled={false}
        onValueChange={(v: string) => {}}
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
    </>
  )
}
