import { FC, useCallback, useMemo, useState } from 'react'

import { Grade } from '@/common/components/grade'
import { Input } from '@/common/components/input'
import { PageSizeType, Paginator } from '@/common/components/paginator/paginator'
import { useGetCardsDeckQuery } from '@/features/Decks/api/getDecks'
import { useDebounce } from '@uidotdev/usehooks'

type Props = {
  cover: string
  deckId: string
}
export const FriendsDeckMain: FC<Props> = props => {
  const { cover, deckId } = props

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
            <td>
              <div style={{ alignItems: 'center', display: 'flex', gap: '5px' }}>
                <img
                  alt={'no image'}
                  src={it.questionImg}
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
                  alt={'no image'}
                  src={it.answerImg}
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
      <div>
        <img alt={''} src={cover} />
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
