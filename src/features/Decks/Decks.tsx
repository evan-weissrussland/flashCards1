import { Button } from '@/common/components/button'
import { Input } from '@/common/components/input'
import { Paginator } from '@/common/components/paginator/paginator'
import { RangeSlider } from '@/common/components/slider'
import { Tabs, TabsList, TabsTrigger } from '@/common/components/tabSwitcher'
import { Typography } from '@/common/components/typography'

export const Decks = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 136px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'Large'}>Decks list</Typography>
        <Button>Add New Deck</Button>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '24px' }}>
        <Input label={' '} placeholder={'Input search'} type={'search'}></Input>
        <div style={{ flexShrink: '0' }}>
          <Tabs defaultValue={'All-cards'}>
            <TabsList>
              <TabsTrigger value={'My-cards'}>My Cards</TabsTrigger>
              <TabsTrigger value={'All-cards'}>All Cards</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <RangeSlider defaultValue={[2, 10] as never} max={10} min={2} onChangeRange={() => {}} />
        <Button icon={'delete'} variant={'secondary'}>
          Clear filter
        </Button>
      </div>
      <div>Table</div>
      <div>
        <Paginator
          currentPage={2}
          onPageChanged={(d: number) => {}}
          pageSize={30}
          totalItemsCount={200}
        />
      </div>
    </div>
  )
}
