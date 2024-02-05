import { FC, memo } from 'react'

import { RatingStarFillIcon, RatingStarNoFillIcon } from '@/common/icons/RatingStar'

import s from './grade.module.scss'

type Props = {
  rating: number
}

export const Grade: FC<Props> = memo(({ rating }) => {
  return (
    <div className={s.rating}>
      {rating > 0 ? <RatingStarFillIcon /> : <RatingStarNoFillIcon />}
      {rating > 1 ? <RatingStarFillIcon /> : <RatingStarNoFillIcon />}
      {rating > 2 ? <RatingStarFillIcon /> : <RatingStarNoFillIcon />}
      {rating > 3 ? <RatingStarFillIcon /> : <RatingStarNoFillIcon />}
      {rating > 4 ? <RatingStarFillIcon /> : <RatingStarNoFillIcon />}
    </div>
  )
})
