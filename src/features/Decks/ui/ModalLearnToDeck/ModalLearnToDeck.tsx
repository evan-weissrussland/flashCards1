import { FC, memo, useState } from 'react'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { RadioGroup, RadioGroupItem } from '@/common/components/radioGroupV2'
import { Typography } from '@/common/components/typography'
import {
  GradeRating,
  useGetLearnCardQuery,
  useSaveGradeCardMutation,
} from '@/features/Decks/api/getDecks'

import s from './modalLearnToDeck.module.scss'

type Props = {
  deckId: string
  name: string
}

export const ModalLearnToDeck: FC<Props> = memo(props => {
  const { deckId, name } = props
  const { data, isFetching } = useGetLearnCardQuery({
    args: { previousCardId: '' },
    id: deckId,
  })
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [value, setValue] = useState('1')
  const [saveGradeCard] = useSaveGradeCardMutation()

  const saveGradeCardHandker = () => {
    setIsShowAnswer(false)
    saveGradeCard({
      args: {
        cardId: data?.id as string,
        grade: +value as GradeRating,
      },
      id: deckId,
    })
  }

  if (isFetching) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        ...Read Card
      </div>
    )
  }

  return (
    <Card className={'border'} style={{ padding: '33px 36px 48px' }}>
      <Typography
        style={{ marginBottom: '15px', textAlign: 'center' }}
        theme={'dark'}
        variant={'H1'}
      >
        Learn &ldquo;{name}&ldquo;
      </Typography>
      <div style={{ width: '100%' }}>
        <Typography as={'span'} theme={'dark'} variant={'Subtitle 1'}>
          Question:{' '}
        </Typography>
        <Typography as={'span'} theme={'dark'} variant={'Body 1'}>
          {data?.question}
        </Typography>
        <div className={s.colorTypographyShots}>
          {data?.questionImg && (
            <img alt={''} height={'120px'} src={data?.questionImg} width={'350px'} />
          )}
          <Typography dataColor theme={'dark'} variant={'Body 2'}>
            Количество попыток ответов на вопрос: {data?.shots}
          </Typography>
        </div>
      </div>
      {!isShowAnswer ? (
        <Button
          fullWidth
          onClick={() => {
            setIsShowAnswer(true)
          }}
        >
          {' '}
          Show Answer
        </Button>
      ) : (
        <div style={{ width: '100%' }}>
          <Typography as={'span'} theme={'dark'} variant={'Subtitle 1'}>
            Answer:{' '}
          </Typography>
          <Typography as={'span'} theme={'dark'} variant={'Body 1'}>
            {data?.answer}
          </Typography>
          <div>
            {data?.answerImg && (
              <img alt={''} height={'120px'} src={data?.answerImg} width={'350px'} />
            )}
          </div>
          <Typography theme={'dark'} variant={'Subtitle 1'}>
            Rate yourself:
          </Typography>
          <RadioGroup
            defaultValue={'1'}
            name={'gradeCard'}
            onValueChange={(v: string) => {
              setValue(v)
            }}
            value={value}
          >
            <RadioGroupItem
              disabled={false}
              id={'q1'}
              label={'Did not know'}
              value={'1'}
              variant={'Body 2'}
            />
            <RadioGroupItem
              disabled={false}
              id={'q2'}
              label={'Forgot'}
              value={'2'}
              variant={'Body 2'}
            />
            <RadioGroupItem
              disabled={false}
              id={'q3'}
              label={'A lot of throgh'}
              value={'3'}
              variant={'Body 2'}
            />
            <RadioGroupItem
              disabled={false}
              id={'q4'}
              label={'Confused'}
              value={'4'}
              variant={'Body 2'}
            />
            <RadioGroupItem
              disabled={false}
              id={'q5'}
              label={'Knew the answer'}
              value={'5'}
              variant={'Body 2'}
            />
          </RadioGroup>
          <Button fullWidth onClick={saveGradeCardHandker}>
            {' '}
            Next Question
          </Button>
        </div>
      )}
    </Card>
  )
})
