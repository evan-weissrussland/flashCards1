import { Outlet } from 'react-router-dom'

import { Header } from '@/app/ui/Header/ui'

export function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
