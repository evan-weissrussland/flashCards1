import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function App() {
  return (
    <div>
      <Button as={'a'} href={'https://google.com'}>
        Hello
      </Button>
      <Button>Button primary</Button>
      <Input type={'search'} />
      {/*h2 для проверки*/}
      <h2>Test commit</h2>
    </div>
  )
}
