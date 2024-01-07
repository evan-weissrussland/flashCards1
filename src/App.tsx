import { Button } from '@/components/ui/button'

export function App() {
  return (
    <div>
      <Button as={'a'} href={'https://google.com'}>
        Hello
      </Button>
      <Button>Button primary</Button>
    </div>
  )
}
