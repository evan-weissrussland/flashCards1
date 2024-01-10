import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { SelectComponent } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import * as Select from '@radix-ui/react-select'

import s from '@/components/ui/select/select.module.scss'

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
        <SelectComponent />
      </div>
    </>
  )
}
