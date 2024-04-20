import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '@/app/ui/Spinner/Spinner'
import { Button } from '@/common/components/button'
import { Input } from '@/common/components/input'
import { PageSizeType, Paginator } from '@/common/components/paginator/paginator'
import { RangeSlider } from '@/common/components/slider'
import { Tabs, TabsList, TabsTrigger } from '@/common/components/tabSwitcher'
import { TableDeck } from '@/common/components/tableDecks/Table'
import { Typography } from '@/common/components/typography'
import {
  useGetDecksQuery,
  useGetMinMaxAmoundCardsQuery,
  usePrefetch,
} from '@/features/Decks/api/getDecks'
import { ModalAddNewDeck } from '@/features/Decks/ui/ModalAddNewDeck'
import { useAuthContext } from '@/hooks/hooks'

const Decks = () => {
  //получаем мой ID юзера из контекста (Арр)
  const { myId: authMeId } = useAuthContext()

  /**
   * Отправляет запрос на тот же endpoint, что и useGetDecksQuery - getDecks. Но useGetDecksQuery это делает при загрузке компонента, а prefetch при наведении на табу MyCards.
   */
  const prefetch = usePrefetch('getDecks')

  //получить из локального строрэйджа данные для всех useState filterData. Локал сторэдж нужен, чтобы после возврата из выбранной колоды не сбрасывался фильтр
  const localStorageParams = sessionStorage.getItem('queryParamsToGetRequest')

  //функция для изменения URL
  const navigate = useNavigate()

  //данные для формирования запроса на сервер, а также для фильтрации колод. Если они есть в локалСторэдже, то берём их из локалСторэджа, если нет, то берём по-умолчанию.
  const [filterData, setFilterData] = useState<{
    authorDecks: string
    cardsCountFromSlider: number | number[]
    currentPage: null | number
    directionSort: 'asc' | 'desc' | null
    itemsPerPage: PageSizeType | null
    myId: string | undefined
    search: string
    sortBy: 'author.name' | 'cardsCount' | 'created' | 'name' | 'updated' | null
    textFromDebounceInput: string
    valuesArrayFromDebounceSlider: number | number[]
  }>(
    localStorageParams
      ? JSON.parse(localStorageParams)
      : {
          authorDecks: 'All-cards',
          cardsCountFromSlider: [0, 11],
          currentPage: null,
          directionSort: null,
          itemsPerPage: null,
          myId: undefined,
          search: '',
          sortBy: null,
          textFromDebounceInput: '',
          valuesArrayFromDebounceSlider: [0, 11],
        }
  )

  //номер таймера из функции задержки посыла текста из инпута на сервер
  const [timerId, setTimerId] = useState<number | undefined>(undefined)

  //хук RTK Query. Передаёт параметры в baseApi для запрсоа на сервер и получает назад Response от сервера
  const { data, error, isFetching } = useGetDecksQuery({
    authorId: filterData.myId,
    currentPage: filterData.currentPage ? filterData.currentPage : undefined,
    itemsPerPage: filterData.itemsPerPage ? filterData.itemsPerPage : undefined,
    maxCardsCount: Array.isArray(filterData.valuesArrayFromDebounceSlider)
      ? filterData.valuesArrayFromDebounceSlider[1]
      : undefined,
    minCardsCount: Array.isArray(filterData.valuesArrayFromDebounceSlider)
      ? filterData.valuesArrayFromDebounceSlider[0]
      : undefined,
    name: filterData.textFromDebounceInput,
    orderBy:
      filterData.sortBy !== null && filterData.directionSort !== null
        ? `${filterData.sortBy}-${filterData.directionSort}`
        : null,
  })
  //хук RTK Query. Запрос на сервер за количеством min и max колод (Decks)
  const result = useGetMinMaxAmoundCardsQuery()

  //сохраняем в локалСторэдже переменные, нужные для фильтра, после этого переходим на страницу выбранной колоды. Сохранять нужно для того, чтобы после возврата со страницы колоды на страницу списка колод применились значения фильтра (сохранённые в локалСторэдлж), иначе фильтр сбрасывается на инициализационные значения useState
  const navigateToDeckHandler = useCallback(
    (id: string) => {
      sessionStorage.setItem(
        'queryParamsToGetRequest',
        JSON.stringify({
          ...filterData,
        })
      )
      navigate(`/decks/${id}`)
    },
    [filterData]
  )

  //зачистка фильтра, а также удаляем локалСторэдж
  const clearFilterHandler = useCallback(() => {
    setFilterData({
      authorDecks: 'All-cards',
      cardsCountFromSlider: [0, 11],
      currentPage: null,
      directionSort: null,
      itemsPerPage: null,
      myId: undefined,
      search: '',
      sortBy: null,
      textFromDebounceInput: '',
      valuesArrayFromDebounceSlider: [0, 11],
    })
    sessionStorage.removeItem('queryParamsToGetRequest')
  }, [])

  /**
   * функция задержки посыла текста из инпута на сервер (debounce)
   * @param inputData - текст из инпута
   */
  const onChangeTextCallbackWithDebounce = useCallback(
    (inputData: string) => {
      setFilterData(prev => ({ ...prev, search: inputData }))
      clearTimeout(timerId)
      const idTimer = setTimeout(() => {
        setFilterData(prev => ({ ...prev, textFromDebounceInput: inputData }))
      }, 1500)

      setTimerId(+idTimer)
    },
    [timerId]
  )

  //если мы зарегистрированы (есть resultAuthMe), и нажимаем на MyCards, то делаем запрос на сервер за моими колодами, если нажимаем на "All  Cards" - то делаем запрос за всеми колодами. Если мы не зарегистрированы, то делаем запрос за всеми колодами
  const changeTabMyCardsOrAllCards = useCallback(
    (v: string) => {
      if (authMeId) {
        switch (v) {
          case 'My-cards':
            setFilterData(prev => ({ ...prev, authorDecks: 'My-cards', myId: authMeId }))
            break
          case 'All-cards':
            setFilterData(prev => ({ ...prev, authorDecks: 'All-cards', myId: undefined }))
            break
          default:
            break
        }
      } else {
        setFilterData(prev => ({ ...prev, myId: undefined }))
      }
    },
    [authMeId]
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

  //изменяем значения слайдера. Эти данные нужны только для вохврата назад в слайдер для отображения изменения
  const setCardsCountFromSlider = useCallback((value: number | number[]) => {
    setFilterData(prev => ({ ...prev, cardsCountFromSlider: value }))
  }, [])

  //изменяем значения слайдера. Эти данные пойдут для запроса на сервер
  const setValuesArrayFromDebounceSlider = useCallback((value: number | number[]) => {
    setFilterData(prev => ({ ...prev, valuesArrayFromDebounceSlider: value }))
  }, [])

  //изменяем направление сортировки колод
  const setDirectionSort = useCallback((value: 'asc' | 'desc' | null) => {
    setFilterData(prev => ({ ...prev, directionSort: value }))
  }, [])

  //выбираем столбец сортировки колод
  const setSortBy = useCallback((value: 'cardsCount' | 'created' | 'name' | 'updated' | null) => {
    setFilterData(prev => ({ ...prev, sortBy: value }))
  }, [])

  //изменяем текущую страницу (пагинация)
  const setCurrentPage = useCallback((pageNumber: number) => {
    setFilterData(prev => ({ ...prev, currentPage: pageNumber }))
  }, [])

  //изменяем количество отображаемых колод на странице (пагинация)
  const setItemsPerPage = useCallback((pageSizeNumber: PageSizeType) => {
    setFilterData(prev => ({ ...prev, itemsPerPage: pageSizeNumber }))
  }, [])

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
              value={filterData.search}
            />
          </div>
          <Tabs onValueChange={changeTabMyCardsOrAllCards} value={filterData.authorDecks}>
            <TabsList>
              <TabsTrigger
                onMouseMove={() =>
                  prefetch({
                    authorId: authMeId,
                    currentPage: filterData.currentPage ? filterData.currentPage : undefined,
                    itemsPerPage: filterData.itemsPerPage ? filterData.itemsPerPage : undefined,
                    maxCardsCount: Array.isArray(filterData.valuesArrayFromDebounceSlider)
                      ? filterData.valuesArrayFromDebounceSlider[1]
                      : undefined,
                    minCardsCount: Array.isArray(filterData.valuesArrayFromDebounceSlider)
                      ? filterData.valuesArrayFromDebounceSlider[0]
                      : undefined,
                    name: filterData.textFromDebounceInput,
                    orderBy:
                      filterData.sortBy !== null && filterData.directionSort !== null
                        ? `${filterData.sortBy}-${filterData.directionSort}`
                        : null,
                  })
                }
                value={'My-cards'}
              >
                My Cards
              </TabsTrigger>
              <TabsTrigger value={'All-cards'}>All Cards</TabsTrigger>
            </TabsList>
          </Tabs>
          <RangeSlider
            max={result.data?.max}
            min={result.data?.min}
            onChangeRange={setCardsCountFromSlider}
            onChangeRangeCommit={setValuesArrayFromDebounceSlider}
            step={1}
            values={filterData.cardsCountFromSlider as number[]}
          />
          <Button icon={'delete'} onClick={clearFilterHandler} variant={'secondary'}>
            Clear filter
          </Button>
        </div>
        <TableDeck
          directionSort={filterData.directionSort}
          items={data?.items}
          navigateToDeckHandler={navigateToDeckHandler}
          setDirectionSort={setDirectionSort}
          setSortBy={setSortBy}
          sortBy={filterData.sortBy}
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

//из-за использования ленивой(lazy) загрузки необходимо экспортировать компонент по дефолту!!!!
export default Decks
