import { useState } from 'react'

import {
  DropDown,
  DropDownContent,
  DropDownGroup,
  DropDownItem,
  DropDownLabel,
  DropDownTrigger,
} from '@/common/components/dropDown'
import { Typography } from '@/common/components/typography'
import { LogOutIcon } from '@/common/icons/LogOutIcon'
import { MyProfileIcon } from '@/common/icons/MyProfileIcon'

type Props = {
  className?: string
  email: string
  name: string
}

export const DropDownHeader = ({ className, email, name }: Props) => {
  //открыть/закрыть модальнео окно DropDown
  const [open, setOpen] = useState(false)
  //показать/скрыть модальные окна Delete Deck, Edit Deck, Learn Deck
  const [isModalEditOrModalDeleteShow, setIsModalEditOrModalDeleteOrModalLearnShow] = useState<
    '' | 'delete' | 'edit' | 'learn'
  >('')

  return (
    <>
      <DropDown onOpenChange={setOpen} open={open}>
        <DropDownTrigger>
          <div style={{ display: 'inline-flex', gap: '14px' }}>
            <Typography theme={'dark'} variant={'Subtitle 1'}>
              <span
                style={{
                  borderBottomStyle: 'dashed',
                }}
              >
                {name}
              </span>
            </Typography>
            <img
              alt={'ava'}
              src={'../../../../public/Ellipse%201.png'}
              style={{ height: '36px', width: '36px' }}
            />
          </div>
        </DropDownTrigger>
        <DropDownContent
          align={'end'}
          alignOffset={-40}
          sideOffset={18}
          style={{
            backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <DropDownLabel>
            <img
              alt={'ava'}
              src={'../../../../public/Ellipse%201.png'}
              style={{ height: '36px', width: '36px' }}
            />
            <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
              <Typography theme={'dark'} variant={'Subtitle 2'}>
                {name}
              </Typography>
              <Typography dataColor variant={'Caption'}>
                {email}
              </Typography>
            </div>
          </DropDownLabel>
          <div>
            <DropDownGroup>
              <DropDownItem
                onclick={() => {
                  setOpen(false)
                }}
              >
                <MyProfileIcon />
                <Typography theme={'dark'} variant={'Caption'}>
                  My Profile
                </Typography>
              </DropDownItem>
              <DropDownItem
                onclick={() => {
                  setIsModalEditOrModalDeleteOrModalLearnShow('edit')
                  setOpen(false)
                }}
              >
                <LogOutIcon />
                <Typography theme={'dark'} variant={'Caption'}>
                  Sign Out
                </Typography>
              </DropDownItem>
            </DropDownGroup>
          </div>
        </DropDownContent>
      </DropDown>
    </>
  )
}
