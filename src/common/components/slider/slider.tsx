import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperDoubleRangePropsType = DefaultInputPropsType & {
  disable?: boolean
  max?: number
  min?: number
  onChangeRange: (value: number | number[]) => void
  step?: number
  values: number[]
}

export const RangeSlider: FC<SuperDoubleRangePropsType> = ({
  max,
  min,
  onChangeRange,
  step = 1,
  values,
}) => {
  const onValueChangeHandler = (valuesArray: number[]) => {
    onChangeRange(valuesArray)
  }

  return (
    <div className={s.form}>
      <span className={s.minMax}>{values[0]}</span>
      <form>
        <Slider.Root
          className={s.SliderRoot}
          max={max}
          min={min}
          onValueChange={onValueChangeHandler}
          step={step}
          value={values}
        >
          <Slider.Track className={s.SliderTrack}>
            <Slider.Range className={s.SliderRange} />
          </Slider.Track>
          <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
          <Slider.Thumb aria-label={'Volume'} className={s.SliderThumb} />
        </Slider.Root>
      </form>
      <span className={s.minMax}>{values[1]}</span>
    </div>
  )
}
