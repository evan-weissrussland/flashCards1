import { FC, useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/selectV2'

import s from './Paginator.module.css'

type Props = {
  currentPage: number //текущая выбранная страница
  onPageChanged: (pageNumber: number) => void //изменение текущей страницы
  onPageSizeChanged?: (pageSizeNumber: number) => void //изменение порции страниц. Делает селект
  pageSize: number //размер товаров на одной странице
  totalItemsCount: number //общее число всех товаров
}

export const Paginator: FC<Props> = ({
  currentPage,
  onPageChanged,
  onPageSizeChanged,
  pageSize,
  totalItemsCount,
}) => {
  const [portionNumber, setPortionNumber] = useState(1)
  const portionSize = 5
  const pagesCount = Math.ceil(totalItemsCount / pageSize) //34

  const pages: number[] = []

  for (let i = 2; i < pagesCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize) //7 12

  const leftPortionPageNumber = (portionNumber - 1) * portionSize //0 3
  const rightPortionPageNumber = portionNumber * portionSize //5 6

  return (
    <>
      <div className={s.waipperSpans}>
        <button
          disabled={!(portionNumber > 1)}
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}
        >
          Prev
        </button>

        <span
          className={`${s.pageNumber} ${1 === currentPage ? s.selectedPage : ''}`}
          onClick={() => {
            onPageChanged(1)
            setPortionNumber(1)
          }}
        >
          1
        </span>

        {portionNumber > 1 && <span>...</span>}

        {pages
          .filter(p => p > leftPortionPageNumber && p <= rightPortionPageNumber)
          .map((p, i) => {
            return (
              <span
                className={`${s.pageNumber} ${p === currentPage ? s.selectedPage : ''}`}
                key={i}
                onClick={() => onPageChanged(p)}
              >
                {p}
              </span>
            )
          })}

        {portionNumber < portionCount && <span>...</span>}

        <span
          className={`${s.pageNumber} ${pagesCount === currentPage ? s.selectedPage : ''}`}
          onClick={() => {
            onPageChanged(pagesCount)
            setPortionNumber(portionCount)
          }}
        >
          {pagesCount}
        </span>

        <button
          disabled={!(portionCount > portionNumber)}
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}
        >
          Next
        </button>

        <span>Показать</span>

        <Select
          defaultValue={pageSize.toString()}
          disabled={false}
          label={''}
          onValueChange={(v: string) => {
            if (onPageSizeChanged) {
              onPageSizeChanged(+v)
            }
          }}
          typography={'Body 2'}
        >
          <SelectTrigger disabled={false} placeholder={''} typography={'Body 1'}></SelectTrigger>
          <SelectContent>
            <SelectItem disabled={false} typography={'Body 1'} value={'10'}>
              10
            </SelectItem>
            <SelectItem disabled={false} typography={'Body 1'} value={'20'}>
              20
            </SelectItem>
            <SelectItem disabled={false} typography={'Body 1'} value={'30'}>
              30
            </SelectItem>
            <SelectItem disabled={false} typography={'Body 1'} value={'50'}>
              50
            </SelectItem>
            <SelectItem disabled={false} typography={'Body 1'} value={'100'}>
              100
            </SelectItem>
          </SelectContent>
        </Select>

        <span>на странице</span>
      </div>
    </>
  )
}
