import { useCallback, useState } from 'react'

import { Spinner } from '@/app/ui/Spinner/Spinner'
import { Button } from '@/common/components/button'
import { Input } from '@/common/components/input'
import { PageSizeType, Paginator } from '@/common/components/paginator/paginator'
import { RangeSlider } from '@/common/components/slider'
import { Tabs, TabsList, TabsTrigger } from '@/common/components/tabSwitcher'
import { TableDeck } from '@/common/components/tableDecks/Table'
import { Typography } from '@/common/components/typography'
import { useGetDecksQuery, useGetMinMaxAmoundCardsQuery } from '@/features/Decks/api/getDecks'
import { ModalAddNewDeck } from '@/features/Decks/ui/ModalAddNewDeck'
import { useAuthContext } from '@/hooks/hooks'

export const Decks = () => {
  //получаем мой ID юзера из контекста (Арр)
  // const { data: meData } = useAuthMeQuery()
  const { myId: authMeId } = useAuthContext()

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
  const [authorDecks, setAuthorDecks] = useState<string>('All-cards')

  //номер таймера из функции задержки посыла текста из инпута на сервер
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  //поле сортировки
  const [sortBy, setSortBy] = useState<
    'author.name' | 'cardsCount' | 'created' | 'name' | 'updated' | null
  >('cardsCount')

  //направление сортировки
  const [directionSort, setDirectionSort] = useState<'asc' | 'desc' | null>(null)

  //хук RTK Query. Передаёт параметры в baseApi для запрсоа на сервер и получает назад Response от сервера
  const { data, error, isFetching } = useGetDecksQuery({
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
    orderBy: sortBy !== null && directionSort !== null ? `${sortBy}-${directionSort}` : null,
  })
  //хук RTK Query. Запрос на сервер за количеством min и max колод (Decks)
  const result = useGetMinMaxAmoundCardsQuery()

  //зачистка фильтра
  const clearFilterHandler = useCallback(() => {
    setSearch('')
    setTextFromDebounceInput('')
    setItemsPerPage(null)
    setCurrentPage(null)
    setCardsCountFromSlider([0, 11])
    setValuesArrayFromDebounceSlider([0, 11])
    setAuthorDecks('All-cards')
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
      if (authMeId) {
        switch (v) {
          case 'My-cards':
            setMyId(authMeId)
            setAuthorDecks('My-cards')
            break
          case 'All-cards':
            setMyId(undefined)
            setAuthorDecks('All-cards')
            break
          default:
            break
        }
      } else {
        setMyId(undefined)
      }
    },
    [authMeId, setMyId, setAuthorDecks]
  )

  //переменная, которой будет присвоена ошибка из хука RTKQ. Выводим её юзеру
  let narrowingError

  //определение типа ошибки из RTKQ: если есть свойство status в объекте error, то тип error - FetchBaseQueryError, иначе тип - SerializedError. Дополнительно протипизировал объект data, иначе при обращении к свойству data.message появляется ошибка
  if (error) {
    if ('status' in error) {
      const errorDate = error.data as {} | any

      if (typeof errorDate === 'object') {
        narrowingError = errorDate.errorMessages[0].message
      } else {
        narrowingError = errorDate.message
      }
    } else {
      narrowingError = error.message
    }
  }

  return (
    <>
      {result.isFetching || isFetching ? <Spinner /> : <></>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '0 136px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant={'Large'}>Decks list</Typography>
          <ModalAddNewDeck />
        </div>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ flex: '1 1 auto' }}>
            <Input
              callback={onChangeTextCallbackWithDebounce}
              className={'justifyContent-center'}
              label={' '}
              placeholder={'Input search'}
              type={'search'}
              value={search}
            />
          </div>
          <Tabs onValueChange={changeTabMyCardsOrAllCards} value={authorDecks}>
            <TabsList>
              <TabsTrigger value={'My-cards'}>My Cards</TabsTrigger>
              <TabsTrigger value={'All-cards'}>All Cards</TabsTrigger>
            </TabsList>
          </Tabs>
          <RangeSlider
            max={result.data?.max}
            min={result.data?.min}
            onChangeRange={setCardsCountFromSlider}
            onChangeRangeCommit={setValuesArrayFromDebounceSlider}
            step={1}
            values={cardsCountFromSlider as number[]}
          />
          <Button icon={'delete'} onClick={clearFilterHandler} variant={'secondary'}>
            Clear filter
          </Button>
        </div>
        <TableDeck
          directionSort={directionSort}
          items={data?.items}
          setDirectionSort={setDirectionSort}
          setSortBy={setSortBy}
          sortBy={sortBy}
        />
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
      <span>{narrowingError}</span>
    </>
  )
}
