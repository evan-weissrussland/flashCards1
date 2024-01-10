import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RangeSlider } from '@/components/ui/slider'

export function App() {
  return (
    <div>
      <Button as={'a'} href={'https://google.com'}>
        Hello
      </Button>
      <Button>Button primary</Button>
      <Input type={'search'} />
      <RangeSlider defaultValue={[25, 75]} max={100} min={1} />
    </div>
  )
}
