import { Outlet } from 'react-router-dom'

import { PrivateRouter } from '@/app/model/router'
import { Header } from '@/app/ui/Header/ui'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'

export function App() {
  const { isLoading } = useAuthMeQuery()

  const loadingHTML = isLoading ? (
    <div
      style={{
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        zIndex: '100',
      }}
    >
      <span style={{ color: 'green', fontSize: '100px', fontWeight: 'bold' }}> ...Loading </span>
    </div>
  ) : (
    <></>
  )

  return (
    <div style={{ position: 'relative' }}>
      {loadingHTML}
      <Header />
      <Outlet />
      <PrivateRouter />
    </div>
  )
}
