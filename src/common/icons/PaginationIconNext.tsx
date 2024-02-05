export const PaginationIconNext = ({ disabled }: { disabled: boolean }) => {
  return (
    <svg
      fill={'none'}
      height={'16'}
      viewBox={'0 0 16 16'}
      width={'16'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <g clipPath={'url(#clip0_5928_3156)'}>
        <path
          d={'M5.72665 11.06L8.77999 8L5.72665 4.94L6.66665 4L10.6667 8L6.66665 12L5.72665 11.06Z'}
          fill={!disabled ? 'white' : '#808080'}
        />
      </g>
      <defs>
        <clipPath id={'clip0_5928_3156'}>
          <rect fill={'white'} height={'16'} width={'16'} />
        </clipPath>
      </defs>
    </svg>
  )
}
