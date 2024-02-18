import { FC, memo, useCallback, useState } from 'react'

import { Spinner } from '@/app/ui/Spinner/Spinner'
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
  //стэйт. храню свойство skip. после оценки первой карты, делаю true, чтобы при ререндерах не шёл GET-запрос
  const [skip, setSkip] = useState(false)
  //хук RTKQ для запроса за картой. Идёт только в момент первоначальной загрузки приложения. После чего я меняю свойство skip на true и запросов больше нет.
  const { data, isFetching } = useGetLearnCardQuery(
    {
      args: { previousCardId: '' },
      id: deckId,
    },
    { skip: skip }
  )
  //стэйт отображения ответа по клику на кнопку "Показать ответ"
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  //оценка карты (Grade). Она идёт в POST-запросе
  const [value, setValue] = useState('1')
  //хук RTKQ для передачи насервер оценки карты и возврата новой карты
  const [saveGradeCard, { data: dataFromSaveGrade, isLoading }] = useSaveGradeCardMutation()

  //функция-хендлер по нажатию на кнопку "Следующая карта". Отменяет GET-запрос за картой. Передаёт POST-запрос за картой. Закрывает код ответа на карту, чтобы при получении новой карты сразу не высвечился ответ.
  const saveGradeCardHandker = useCallback(async () => {
    setSkip(true)
    await saveGradeCard({
      args: {
        cardId: !dataFromSaveGrade ? (data?.id as string) : dataFromSaveGrade.id,
        grade: +value as GradeRating,
      },
      id: deckId,
    })
    setIsShowAnswer(false)
  }, [data?.id, dataFromSaveGrade, deckId, saveGradeCard, value])

  return (
    <>
      {(isLoading || isFetching) && <Spinner />}

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
            {!dataFromSaveGrade ? data?.question : dataFromSaveGrade.question}
          </Typography>
          <div className={s.colorTypographyShots}>
            {dataFromSaveGrade
              ? dataFromSaveGrade?.questionImg && (
                  <img
                    alt={''}
                    height={'120px'}
                    src={dataFromSaveGrade?.questionImg}
                    width={'350px'}
                  />
                )
              : data?.questionImg && (
                  <img alt={''} height={'120px'} src={data?.questionImg} width={'350px'} />
                )}
            <Typography dataColor theme={'dark'} variant={'Body 2'}>
              Количество попыток ответов на вопрос:{' '}
              {!dataFromSaveGrade ? data?.shots : dataFromSaveGrade.shots}
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
              {!dataFromSaveGrade ? data?.answer : dataFromSaveGrade.answer}
            </Typography>
            <div>
              {dataFromSaveGrade
                ? dataFromSaveGrade?.answerImg && (
                    <img
                      alt={''}
                      height={'120px'}
                      src={dataFromSaveGrade?.answerImg}
                      width={'350px'}
                    />
                  )
                : data?.answerImg && (
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
    </>
  )
})
