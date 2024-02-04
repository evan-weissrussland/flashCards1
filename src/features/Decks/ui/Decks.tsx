import { useCallback, useContext, useMemo, useState } from 'react'

import { Context } from '@/app/ui/App'
import { Button } from '@/common/components/button'
import { Input } from '@/common/components/input'
import { PageSizeType, Paginator } from '@/common/components/paginator/paginator'
import { RangeSlider } from '@/common/components/slider'
import { Tabs, TabsList, TabsTrigger } from '@/common/components/tabSwitcher'
import { Typography } from '@/common/components/typography'
import { useGetDecksQuery, useGetMinMaxAmoundCardsQuery } from '@/features/Auth/api/getDecks'
import { ModalAddNewDeck } from '@/features/Decks/ui/ModalAddNewDeck'
import { ModalDeleteDeck } from '@/features/Decks/ui/ModalDeleteDeck'
import { ModalEditDeck } from '@/features/Decks/ui/ModalEditDeck'

export const Decks = () => {
  const resultIdAuthMe = useContext(Context)

  //для изменения value инпута
  const [search, setSearch] = useState('')

  //окончательное value из инпута для запрса на сервер. Берётся с задержкой
  const [textFromDebounceInput, setTextFromDebounceInput] = useState('')

  //окончательное value[] из slider для запрса на сервер. Берётся с задержкой
  const [valuesArrayFromDebounceSlider, setValuesArrayFromDebounceSlider] = useState<
    number | number[]
  >([0, 11])

  //изменить размер порции страницы и сделать новый запрос на сервер
  const [itemsPerPage, setItemsPerPage] = useState<PageSizeType | null>(null)

  //изменить текущую страницу и сделать новый запрос на сервер
  const [currentPage, setCurrentPage] = useState<null | number>(null)

  //изменить сортировку по максимальному и минимальному количеству карт в колоде и сделать новый запрос на сервер
  const [cardsCountFromSlider, setCardsCountFromSlider] = useState<number | number[]>([0, 11])

  //изменить сортировку по моим колодам или по всем колодам и сделать новый запрос на сервер
  const [myId, setMyId] = useState<string | undefined>(undefined)

  //изменить сортировку по моим колодам или по всем колодам и сделать новый запрос на сервер
  const [authorCards, setAuthorCards] = useState<string>('All-cards')

  //номер таймера из функции задержки посыла текста из инпута на сервер
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  //хук RTK Query. Передаёт параметры в baseApi для запрсоа на сервер и получает назад Response от сервера
  const { data, isLoading } = useGetDecksQuery({
    authorId: myId,
    currentPage: currentPage ? currentPage : undefined,
    itemsPerPage: itemsPerPage ? itemsPerPage : undefined,
    maxCardsCount: Array.isArray(valuesArrayFromDebounceSlider)
      ? valuesArrayFromDebounceSlider[1]
      : undefined,
    minCardsCount: Array.isArray(valuesArrayFromDebounceSlider)
      ? valuesArrayFromDebounceSlider[0]
      : undefined,
    name: textFromDebounceInput,
  })
  const result = useGetMinMaxAmoundCardsQuery()

  //зачистка фильтра
  const clearFilterHandler = useCallback(() => {
    setSearch('')
    setTextFromDebounceInput('')
    setItemsPerPage(null)
    setCurrentPage(null)
    setCardsCountFromSlider([0, 11])
    setValuesArrayFromDebounceSlider([0, 11])
    setAuthorCards('All-cards')
    setMyId(undefined)
  }, [])

  /**
   * функция задержки посыла текста из инпута на сервер (debounce)
   * @param inputData - текст из инпута
   */
  const onChangeTextCallbackWithDebounce = useCallback(
    (inputData: string) => {
      setSearch(inputData)
      clearTimeout(timerId)
      const idTimer = setTimeout(() => {
        setTextFromDebounceInput(inputData)
      }, 1500)

      setTimerId(+idTimer)
    },
    [timerId, setSearch, setTimerId, setTextFromDebounceInput]
  )

  //если мы зарегистрированы (есть resultAuthMe), и нажимаем на MyCards, то делаем запрос на сервер за моими колодами, если нажимаем на "All  Cards" - то делаем запрос за всеми колодами. Если мы не зарегистрированы, то делаем запрос за всеми колодами
  const changeTabMyCardsOrAllCards = useCallback(
    (v: string) => {
      if (resultIdAuthMe) {
        switch (v) {
          case 'My-cards':
            setMyId(resultIdAuthMe)
            setAuthorCards('My-cards')
            break
          case 'All-cards':
            setMyId(undefined)
            setAuthorCards('All-cards')
            break
          default:
            break
        }
      } else {
        setMyId(undefined)
      }
    },
    [resultIdAuthMe, setMyId, setAuthorCards]
  )

  //отрисовываем таблицу из карт с сервера
  const table = useMemo(
    () =>
      data?.items.map(it => (
        <tr key={it.id} style={{ padding: '6px 24px' }}>
          <td style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
            <img
              alt={'image'}
              src={it.cover}
              style={{ borderRadius: '2px', height: '48px', width: '118px' }}
            />
            <div>{it.name}</div>
          </td>
          <td>{it.cardsCount}</td>
          <td>{new Date(it.updated).toLocaleString('ru-RU')}</td>
          <td>{it.author.name}</td>
          {it.userId === resultIdAuthMe && (
            <td>
              <ModalEditDeck
                deckCover={it.cover}
                deckId={it.id}
                deckIsPrivate={it.isPrivate}
                deckName={it.name}
              />
              <ModalDeleteDeck deckName={it.name} idDeck={it.id} />
            </td>
          )}
        </tr>
      )),
    [data?.items, resultIdAuthMe]
  )

  if (result.isLoading || isLoading) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        ...Read
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 136px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant={'Large'}>Decks list</Typography>
        <ModalAddNewDeck />
      </div>
      <div style={{ alignItems: 'center', display: 'flex', gap: '24px' }}>
        <Input
          callback={onChangeTextCallbackWithDebounce}
          className={'justifyContent-center'}
          label={' '}
          placeholder={'Input search'}
          type={'search'}
          value={search}
        />
        <div style={{ flexShrink: '0' }}>
          <Tabs onValueChange={changeTabMyCardsOrAllCards} value={authorCards}>
            <TabsList>
              <TabsTrigger value={'My-cards'}>My Cards</TabsTrigger>
              <TabsTrigger value={'All-cards'}>All Cards</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <RangeSlider
          max={result.data?.max}
          min={result.data?.min}
          onChangeRange={setCardsCountFromSlider}
          onChangeRangeCommit={setValuesArrayFromDebounceSlider}
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
