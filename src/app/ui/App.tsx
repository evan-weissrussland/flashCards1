import { Outlet } from 'react-router-dom'

import { PrivateRouter } from '@/app/model/router'
import { Header } from '@/app/ui/Header/ui'

export function App() {
  return (
    <>
      <Header />
      <Outlet />
      <PrivateRouter />
    </>
  )
}
