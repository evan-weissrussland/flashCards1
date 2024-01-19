import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

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
  step,
  values,
}) => {
  return (
    <div className={s.form}>
      <span className={s.minMax}>{min}</span>
      <form>
        <Slider.Root
          className={s.SliderRoot}
          defaultValue={defaultValue}
          max={max}
          min={min}
          onValueChange={onChangeRange}
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
      <span className={s.minMax}>{max}</span>
    </div>
  )
}

// function restoreState<T>(key: string, defaultState: T) {
//   let state = defaultState
//   const stateAsString = localStorage.getItem(key)
//
//   if (stateAsString !== null) {
//     state = JSON.parse(stateAsString) as T
//   }
//
//   return state
// }
//
// const [value1, setValue1] = useState(restoreState<number>('hw11-value1', 0))
// const [value2, setValue2] = useState(restoreState<number>('hw11-value2', 100))
//
// const change = (value: number | number[]) => {
//   if (Array.isArray(value)) {
//     setValue1(value[0])
//     setValue2(value[1])
//   } else {
//     setValue1(value)
//   }
// }
