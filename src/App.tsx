import { Button } from '@/components/ui/button'

export function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '0 auto',
        width: '40%',
      }}
    >
      <Button as={'a'} href={'https://google.com'}>
        Hello
      </Button>
      <Button as={'button'}>Hello</Button>
    </div>
  )
}
