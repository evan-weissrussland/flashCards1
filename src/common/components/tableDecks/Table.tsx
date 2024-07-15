import { FC, memo, useCallback, useMemo } from 'react'

import { Button } from '@/common/components/button'
import { DeleteIcon } from '@/common/icons/DeleteIcon'
import { EditIcon } from '@/common/icons/EditIcon'
import { SortAscIcon, SortDescIcon } from '@/common/icons/SortAsc'
import defaultImage from '@/common/images/default-584452319_small.png'
import { Deck } from '@/features/Decks/api/getDecks'
import { ModalDeleteDeck } from '@/features/Decks/ui/ModalDeleteDeck'
import { ModalEditDeck } from '@/features/Decks/ui/ModalEditDeck'
import { useAuthContext } from '@/hooks/hooks'

type Props = {
  directionSort: 'asc' | 'desc' | null
  items: Deck[] | undefined
  navigateToDeckHandler: (id: string) => void
  setDirectionSort: (v: 'asc' | 'desc' | null) => void
  setSortBy: (v: 'cardsCount' | 'created' | 'name' | 'updated' | null) => void
  sortBy: 'author.name' | 'cardsCount' | 'created' | 'name' | 'updated' | null
}
export const TableDeck: FC<Props> = memo(props => {
  const { directionSort, items, setDirectionSort, setSortBy, sortBy } = props

  //получаем мой ID юзера из контекста (Арр)
  const { myId } = useAuthContext()

  //переход на страницу выбранной колоды
  const navigateToDeckHandler = useCallback(
    (id: string) => {
      props.navigateToDeckHandler(id)
    },
    [props.navigateToDeckHandler]
  )

  //обработчик изменения сортировки. Если по полю ранее кликали, то меняется направление сортировки, если по полю клюкнули впервые, то задаётся напрвление сортировки
  const sortByHandler = useCallback(
    (v: 'cardsCount' | 'created' | 'name' | 'updated') => {
      if (v === sortBy) {
        if (directionSort === 'asc') {
          setDirectionSort('desc')
        }
        if (directionSort === 'desc') {
          setDirectionSort(null)
        }
        if (directionSort === null) {
          setDirectionSort('asc')
        }
      }

      if (v !== sortBy) {
        setSortBy(v)
        setDirectionSort('asc')
      }
    },
    [directionSort, setDirectionSort, setSortBy, sortBy]
  )

  //отрисовываем таблицу из карт с сервера
  const table = useMemo(
    () =>
      items?.map(it => {
        return (
          <tr key={it.id} style={{ padding: '6px 24px' }}>
            <td style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
              <img
                alt={' '}
                onClick={() => {
                  navigateToDeckHandler(it.id)
                }}
                src={it.cover ? it.cover : defaultImage}
                style={{ borderRadius: '2px', cursor: 'pointer', height: '48px', width: '118px' }}
              />
              <div
                onClick={() => {
                  navigateToDeckHandler(it.id)
                }}
                style={{ cursor: 'pointer' }}
              >
                {it.name}
              </div>
            </td>
            <td>{it.cardsCount}</td>
            <td>{new Date(it.updated).toLocaleString('ru-RU')}</td>
            <td>{it.author.name}</td>
            {it.userId === myId && (
              <td>
                <ModalEditDeck
                  deckCover={it.cover}
                  deckId={it.id}
                  deckIsPrivate={it.isPrivate}
                  deckName={it.name}
                >
                  <Button className={'padding4px'} icon={<EditIcon />} variant={'secondary'} />
                </ModalEditDeck>
                <ModalDeleteDeck deckName={it.name} idDeck={it.id}>
                  <Button className={'padding4px'} icon={<DeleteIcon />} variant={'secondary'} />
                </ModalDeleteDeck>
              </td>
            )}
          </tr>
        )
      }),
    [items, navigateToDeckHandler, myId]
  )

  return (
    <div>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th
              onClick={() => {
                sortByHandler('name')
              }}
              style={{ color: 'red', textAlign: 'start' }}
            >
              Name {'name' === sortBy && directionSort === 'asc' && <SortAscIcon />}
              {'name' === sortBy && directionSort === 'desc' && <SortDescIcon />}
            </th>
            <th
              onClick={() => {
                sortByHandler('cardsCount')
              }}
              style={{
                color: 'red',
                textAlign: 'start',
              }}
            >
              Cards {'cardsCount' === sortBy && directionSort === 'asc' && <SortAscIcon />}
              {'cardsCount' === sortBy && directionSort === 'desc' && <SortDescIcon />}
            </th>
            <th
              onClick={() => {
                sortByHandler('updated')
              }}
              style={{ color: 'red', textAlign: 'start' }}
            >
              Last Updated {'updated' === sortBy && directionSort === 'asc' && <SortAscIcon />}
              {'updated' === sortBy && directionSort === 'desc' && <SortDescIcon />}
            </th>
            <th
              onClick={() => {
                sortByHandler('created')
              }}
              style={{ color: 'red', textAlign: 'start' }}
            >
              Created by {'created' === sortBy && directionSort === 'asc' && <SortAscIcon />}
              {'created' === sortBy && directionSort === 'desc' && <SortDescIcon />}
            </th>
            <th style={{ color: 'red', textAlign: 'start' }}></th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </div>
  )
})
