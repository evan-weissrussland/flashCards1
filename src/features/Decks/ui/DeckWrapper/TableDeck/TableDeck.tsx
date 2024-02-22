import { FC, memo, useCallback, useMemo, useState } from 'react'

import { Spinner } from '@/app/ui/Spinner/Spinner'
import { Grade } from '@/common/components/grade'
import { Input } from '@/common/components/input'
import { PageSizeType, Paginator } from '@/common/components/paginator/paginator'
import defaultImage from '@/common/images/default-584452319_small.png'
import { useGetCardsDeckQuery } from '@/features/Decks/api/getDecks'
import { ModalDeleteCard } from '@/features/Decks/ui/ModalDeleteCard'
import { ModalEditCard } from '@/features/Decks/ui/ModalEditCard'
import { useDebounce } from '@uidotdev/usehooks'

type TableProps = {
  cover: string
  deckId: string
  isMyDeck?: boolean
}

export const TableDeck: FC<TableProps> = memo(props => {
  const { cover, deckId, isMyDeck = false } = props
  //изменение текущей страниццы пагинации. Передаёт значение в хук запроса на сервер
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined)
  //изменение числа колод на странице. Передаёт значение в хук запроса на сервер
  const [itemsPerPage, setItemsPerPage] = useState<number | undefined>(undefined)
  //вводимый текст из инпута. Используется для возврата в value инпута, а аткже передайтся в хук зажержки
  const [search, setSearch] = useState('')

  //возвращаемый текст из хука задержки. испоьзуется для запрсоа на сервер.
  const debouncedSearchTerm = useDebounce(search, 1000)
  //хук RTKQ запроса на сервер за списком сарт выбранной колоды
  const { data, isFetching } = useGetCardsDeckQuery({
    args: {
      answer: '',
      currentPage: currentPage as number,
      itemsPerPage: itemsPerPage as PageSizeType,
      orderBy: '',
      question: debouncedSearchTerm,
    },
    id: deckId,
  })

  //таблица с картами колоды
  const table = useMemo(
    () =>
      data?.items.map(it => {
        return (
          <tr key={it.id} style={{ padding: '6px 24px' }}>
            <td>
              <div style={{ alignItems: 'center', display: 'flex', gap: '5px' }}>
                <img
                  alt={' '}
                  src={it.questionImg ? it.questionImg : defaultImage}
                  style={{
                    borderRadius: '2px',
                    flexGrow: '0',
                    flexShrink: '0',
                    height: '48px',
                    width: '118px',
                  }}
                />
                <div>{it.question}</div>
              </div>
            </td>
            <td>
              <div style={{ alignItems: 'center', display: 'flex', gap: '5px' }}>
                <img
                  alt={' '}
                  src={it.answerImg ? it.answerImg : defaultImage}
                  style={{
                    borderRadius: '2px',
                    flexGrow: '0',
                    flexShrink: '0',
                    height: '48px',
                    width: '118px',
                  }}
                />
                <div>{it.answer}</div>
              </div>
            </td>
            <td>{new Date(it.updated).toLocaleString('ru-RU')}</td>
            <td>
              <Grade rating={it.grade} />
            </td>
            {isMyDeck && (
              <td>
                <div style={{ alignItems: 'center', display: 'flex', gap: '2px' }}>
                  <ModalEditCard
                    answer={it.answer}
                    answerImg={it.answerImg}
                    idCard={it.id}
                    question={it.question}
                    questionImg={it.questionImg}
                  />
                  <ModalDeleteCard idDeck={it.id} />
                </div>
              </td>
            )}
          </tr>
        )
      }),
    [data?.items, isMyDeck]
  )
  //изменение текста инпута поиска
  const onChangeText = useCallback(
    (inputData: string) => {
      setSearch(inputData)
    },
    [setSearch]
  )

  return (
    <>
      {isFetching && <Spinner />}
      <div>
        <img
          alt={''}
          src={cover ? cover : defaultImage}
          style={{ height: '120px', objectFit: 'fill', width: '300px' }}
        />
      </div>
      <Input callback={onChangeText} type={'search'} />
      <div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ color: 'red', textAlign: 'start' }}>Question</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Answer</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Last Updated</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Grade</th>
              {isMyDeck && <th style={{ color: 'red', textAlign: 'start' }}></th>}
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
    </>
  )
})
