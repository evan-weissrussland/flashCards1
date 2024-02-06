import { FC, useCallback, useMemo, useState } from 'react'

import { Grade } from '@/common/components/grade'
import { Input } from '@/common/components/input'
import { PageSizeType, Paginator } from '@/common/components/paginator/paginator'
import { useGetCardsDeckQuery } from '@/features/Decks/api/getDecks'
import { ModalDeleteCard } from '@/features/Decks/ui/ModalDeleteCard'
import { ModalEditCard } from '@/features/Decks/ui/ModalEditCard'
import { useDebounce } from '@uidotdev/usehooks'

type Props = {
  deckId: string
}
export const MyDeckMain: FC<Props> = props => {
  const { deckId } = props

  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined)
  const [itemsPerPage, setItemsPerPage] = useState<number | undefined>(undefined)
  const [answer, setAnswer] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [search, setSearch] = useState('')

  const debouncedSearchTerm = useDebounce(search, 1000)

  const { data, isLoading } = useGetCardsDeckQuery({
    args: {
      answer,
      currentPage: currentPage as number,
      itemsPerPage: itemsPerPage as PageSizeType,
      orderBy,
      question: debouncedSearchTerm,
    },
    id: deckId,
  })

  const table = useMemo(
    () =>
      data?.items.map(it => {
        return (
          <tr key={it.id} style={{ padding: '6px 24px' }}>
            <td style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>{it.question}</td>
            <td>{it.answer}</td>
            <td>{new Date(it.updated).toLocaleString('ru-RU')}</td>
            <td>
              <Grade rating={it.grade} />
            </td>
            <td style={{ textAlign: 'center' }}>
              <ModalEditCard />
              <ModalDeleteCard idDeck={it.id} />
            </td>
          </tr>
        )
      }),
    [data?.items]
  )

  const onChangeText = useCallback(
    (inputData: string) => {
      setSearch(inputData)
    },
    [setSearch]
  )

  if (isLoading) {
    return <>....read Data....</>
  }

  return (
    <>
      <Input callback={onChangeText} type={'search'} />
      <div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ color: 'red', textAlign: 'start' }}>Question</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Answer</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Last Updated</th>
              <th style={{ color: 'red', textAlign: 'start' }}>Grade</th>
              <th style={{ color: 'red', textAlign: 'start' }}></th>
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
}
