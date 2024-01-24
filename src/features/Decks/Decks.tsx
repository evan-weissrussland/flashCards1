import { Navigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Input } from '@/common/components/input'
import { Paginator } from '@/common/components/paginator/paginator'
import { RangeSlider } from '@/common/components/slider'
import { Typography } from '@/common/components/typography'

export const Decks = () => {
  //вытягивам из Redux'а состояние: залогинен или нет
  const isLogged = false

  //если не залогинены, то переходим на страницу логина, если залогинены, то на страницу карточек. Несмотря на то, что такая же проверка есть в компоненте PrivateRouter, здесь она для того, чтобы не пустить незалогиненного юзера в карточки, если он введёт в URL прямой адрес на эту страницу "/decks"
  return !isLogged ? (
    <Navigate to={'/signIn'} />
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 136px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'Large'}>Decks list</Typography>
        <Button>Add New Deck</Button>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '24px' }}>
        <Input label={' '} placeholder={'Input search'} type={'search'}></Input>
        <RangeSlider defaultValue={[2, 2] as never} max={10} min={2} onChangeRange={() => {}} />
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
