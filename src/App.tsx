import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { SelectComponent } from '@/components/ui/select'

import { RadioButton } from './components/ui/radioGroup'

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
        <SelectComponent variant={'Large'} />
      </div>
      <div>
        <RadioButton
          defaultValue={'ReactNode1'}
          state={[
            { id: 'id1', label: 'RadioGroup', value: 'ReactNode1' },
            { id: 'id2', label: 'RadioGroup', value: 'ReactNode2' },
          ]}
        />
      </div>
    </>
  )
}
