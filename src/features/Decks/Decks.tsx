import { useState } from 'react'

import { Button } from '@/common/components/button'
import { Input } from '@/common/components/input'
import { PageSizeType, Paginator } from '@/common/components/paginator/paginator'
import { RangeSlider } from '@/common/components/slider'
import { Tabs, TabsList, TabsTrigger } from '@/common/components/tabSwitcher'
import { Typography } from '@/common/components/typography'
import { useGetDecksQuery } from '@/features/Auth/api/getDecks'

export const Decks = () => {
  //для изменения value инпута
  const [search, setSearch] = useState('')

  //окончательное value из инпута для запрса на сервер. Берётся с задержкой
  const [textFromDebounceInput, setTextFromDebounceInput] = useState('')

  //изменить размер порции страницы и сделать новый запрос на сервер
  const [itemsPerPage, setItemsPerPage] = useState<PageSizeType | null>(null)

  //изменить текущую страницу и сделать новый запрос на сервер
  const [currentPage, setCurrentPage] = useState<null | number>(null)

  //изменить сортировку по максимальному и минимальному количеству карт в колоде и сделать новый запрос на сервер
  const [cardsCountFromSlider, setCardsCountFromSlider] = useState<number | number[]>([2, 10])

  //номер таймера из функции задержки посыла текста из инпута на сервер
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  //хук RTK Query. Передаёт параметры в bseApi для запрсоа на сервер и получает назад Response от сервера
  const { data } = useGetDecksQuery({
    currentPage: currentPage ? currentPage : undefined,
    itemsPerPage: itemsPerPage ? itemsPerPage : undefined,
    maxCardsCount: Array.isArray(cardsCountFromSlider) ? cardsCountFromSlider[1] : undefined,
    minCardsCount: Array.isArray(cardsCountFromSlider) ? cardsCountFromSlider[0] : undefined,
    name: textFromDebounceInput,
  })

  /**
   * функция задержки посыла текста из инпута на сервер (debounce)
   * @param inputData - текст из инпута
   */
  const onChangeTextCallbackWithDebounce = (inputData: string) => {
    setSearch(inputData)
    clearTimeout(timerId)
    const idTimer = setTimeout(() => {
      setTextFromDebounceInput(inputData)
    }, 1500)

    setTimerId(+idTimer)
  }

  const clearFilterHandler = () => {
    setSearch('')
    setTextFromDebounceInput('')
    setItemsPerPage(null)
    setCurrentPage(null)
    setCardsCountFromSlider([2, 10])
  }

  //отрисовываем таблицу из карт с сервера
  const table = data?.items.map(it => (
    <tr key={it.id}>
      <td>{it.name}</td>
      <td>{it.cardsCount}</td>
      <td>{it.updated}</td>
      <td>{it.author.name}</td>
    </tr>
  ))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 136px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'Large'}>Decks list</Typography>
        <Button>Add New Deck</Button>
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '24px' }}>
        <Input
          callback={onChangeTextCallbackWithDebounce}
          label={' '}
          placeholder={'Input search'}
          type={'search'}
          value={search}
        ></Input>
        <div style={{ flexShrink: '0' }}>
          <Tabs defaultValue={'All-cards'}>
            <TabsList>
              <TabsTrigger value={'My-cards'}>My Cards</TabsTrigger>
              <TabsTrigger value={'All-cards'}>All Cards</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <RangeSlider
          defaultValue={[2, 10] as never}
          max={10}
          min={2}
          onChangeRange={setCardsCountFromSlider}
          values={cardsCountFromSlider as number[]}
        />
        <Button icon={'delete'} onClick={clearFilterHandler} variant={'secondary'}>
          Clear filter
        </Button>
      </div>
      <div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ color: 'red', textAlign: 'start' }}>Name</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Cards</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Last Updated</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Created by</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
      </div>
      <div>
        <Paginator
          currentPage={data?.pagination.currentPage}
          onPageChanged={setCurrentPage}
          onPageSizeChanged={setItemsPerPage}
          pageSize={data ? data.pagination.itemsPerPage : 10}
          totalItemsCount={data?.pagination.totalItems}
        />
      </div>
    </div>
  )
}
