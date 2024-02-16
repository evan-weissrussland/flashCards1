import { useOutletContext } from 'react-router-dom'

import { MyIdType } from '@/app/ui/App'

export function useAuthContext() {
  return useOutletContext<MyIdType>()
}
