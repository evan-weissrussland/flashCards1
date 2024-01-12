import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { SelectComponent } from '@/components/ui/select'

import { RadioButton } from './components/ui/radioGroup'

export function App() {
  return (
    <>
      <div>
        <Button as={'a'} href={'https://google.com'}>
          Hello
        </Button>
        <Button>Button primary</Button>
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
