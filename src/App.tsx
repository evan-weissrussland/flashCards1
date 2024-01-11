import { Button } from '@/components/ui/button'
import { CheckboxComponent } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { SelectComponent } from '@/components/ui/select'

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
    </>
  )
}
