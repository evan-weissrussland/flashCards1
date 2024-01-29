import { FC, useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/common/components/selectV2'
import { Typography } from '@/common/components/typography'
import { PaginationIconNext, PaginationIconPrev } from '@/common/icons/icons'

import s from './Paginator.module.css'

type Props = {
  currentPage: number | undefined //текущая выбранная страница
  onPageChanged: (pageNumber: number) => void //изменение текущей страницы
  onPageSizeChanged?: (pageSizeNumber: PageSizeType) => void //изменение порции страниц. Делает селект
  pageSize: PageSizeType //размер товаров на одной странице
  theme?: 'dark' | null //для компонента типография. Менять цвет текста на белый
  totalItemsCount: number | undefined //общее число всех товаров
}
//типизация возможных порций страниц
export type PageSizeType = 10 | 20 | 30 | 40 | 50

export const Paginator: FC<Props> = ({
  currentPage = 1,
  onPageChanged,
  onPageSizeChanged,
  pageSize = 10,
  theme,
  totalItemsCount = 100,
}) => {
  //с помощью useState меняем порцию страниц
  const [portionNumber, setPortionNumber] = useState(1)
  //количество номеров порций страниц, видимых между кнопками "предыдущая порция страниц" и "следующая порция страниц"
  const portionSize = 5
  //общее количество страниц
  const pagesCount = Math.ceil(totalItemsCount / pageSize)
  //массив из количества страниц
  const pages: number[] = []

  for (let i = 2; i < pagesCount; i++) {
    pages.push(i)
  }
  // количество порций страниц
  const portionCount = Math.ceil(pagesCount / portionSize)
  //номер крайней левой страницы в порции страниц
  const leftPortionPageNumber = (portionNumber - 1) * portionSize
  //номер крайней правой страницы в порции страниц
  const rightPortionPageNumber = portionNumber * portionSize
  //условие блокировки кнопки "предыдущая порция страниц"
  const disabledPrevButton = !(portionNumber > 1)
  //условие блокировки кнопки "следующая порция страниц"
  const disabledNextButton = !(portionCount > portionNumber)

  return (
    <>
      <div className={s.waipperSpans}>
        <button
          className={`${s.pageNumber} ${s.prev}`}
          disabled={disabledPrevButton}
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}
        >
          <PaginationIconPrev disabled={disabledPrevButton} />
        </button>

        <button
          className={`${s.pageNumber} ${1 === currentPage ? s.selectedPage : ''}`}
          onClick={() => {
            if (1 !== currentPage) {
              onPageChanged(1)
              setPortionNumber(1)
            }
          }}
        >
          <Typography dataColor theme={theme} variant={'Body 2'}>
            1
          </Typography>
        </button>

        {portionNumber > 1 && <button className={s.pageNumber}>...</button>}

        {pages
          .filter(p => p > leftPortionPageNumber && p <= rightPortionPageNumber)
          .map((p, i) => {
            return (
              <button
                className={`${s.pageNumber} ${p === currentPage ? s.selectedPage : ''}`}
                key={i}
                onClick={() => onPageChanged(p)}
              >
                <Typography dataColor theme={theme} variant={'Body 2'}>
                  {p}
                </Typography>
              </button>
            )
          })}

        {portionNumber < portionCount && <button className={s.pageNumber}>...</button>}

        {pagesCount > 1 && (
          <button
            className={`${s.pageNumber} ${pagesCount === currentPage ? s.selectedPage : ''}`}
            onClick={() => {
              onPageChanged(pagesCount)
              setPortionNumber(portionCount)
            }}
          >
            <Typography dataColor theme={theme} variant={'Body 2'}>
              {pagesCount}
            </Typography>
          </button>
        )}

        <button
          className={`${s.pageNumber} ${s.next}`}
          disabled={disabledNextButton}
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}
        >
          <PaginationIconNext disabled={disabledNextButton} />
        </button>

        <Typography style={{ marginRight: '6px' }} theme={theme} variant={'Body 2'}>
          Показать
        </Typography>

        <Select
          defaultValue={pageSize.toString()}
          disabled={false}
          label={''}
          onValueChange={(v: string) => {
            if (onPageSizeChanged) {
              onPageSizeChanged(+v as PageSizeType)
            }
          }}
          typography={'Body 2'}
          value={pageSize.toString()}
        >
          <SelectTrigger
            disabled={false}
            placeholder={''}
            theme={theme}
            typography={'Body 1'}
            width={'60px'}
          ></SelectTrigger>
          <SelectContent>
            <SelectItem disabled={false} theme={theme} typography={'Body 2'} value={'10'}>
              10
            </SelectItem>
            <SelectItem disabled={false} theme={theme} typography={'Body 2'} value={'20'}>
              20
            </SelectItem>
            <SelectItem disabled={false} theme={theme} typography={'Body 2'} value={'30'}>
              30
            </SelectItem>
            <SelectItem disabled={false} theme={theme} typography={'Body 2'} value={'50'}>
              40
            </SelectItem>
            <SelectItem disabled={false} theme={theme} typography={'Body 2'} value={'100'}>
              50
            </SelectItem>
          </SelectContent>
        </Select>

        <Typography style={{ marginLeft: '9px' }} theme={theme} variant={'Body 2'}>
          на странице
        </Typography>
      </div>
    </>
  )
}
//TODO не знаю, как сделать, чтобы portionSize = 3, крмое 1-й и последней порции
