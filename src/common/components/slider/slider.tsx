import { DetailedHTMLProps, FC, InputHTMLAttributes, useState } from 'react'

import * as Slider from '@radix-ui/react-slider'

import s from './slider.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperDoubleRangePropsType = DefaultInputPropsType & {
  defaultValue?: number[]
  disable?: boolean
  max?: number
  min?: number
  onChangeRange: (value: number | number[]) => void
  step?: number
  values?: number[]
}

export const RangeSlider: FC<SuperDoubleRangePropsType> = ({
  defaultValue,
  max,
  min,
  onChangeRange,
  step = 1,
  values,
}) => {
  const [minMaxArray, setMinMaxArray] = useState([min, max])

  const onValueChangeHandler = (valuesArray: number[]) => {
    onChangeRange(valuesArray)
    setMinMaxArray(valuesArray)
  }

  return (
    <div className={s.form}>
      <span className={s.minMax}>{minMaxArray[0]}</span>
      <form>
        <Slider.Root
          className={s.SliderRoot}
          defaultValue={defaultValue}
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
      <span className={s.minMax}>{minMaxArray[1]}</span>
    </div>
  )
}
