import { createContext } from 'react'
import { Outlet } from 'react-router-dom'

import { PrivateRouter } from '@/app/model/router'
import { Header } from '@/app/ui/Header/ui'
import { Modalka } from '@/common/components/modal'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'

export const Context = createContext('')

export function App() {
  const result = useAuthMeQuery()

  if (result.isLoading) {
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
        ...Loading
      </div>
    )
  }

  return (
    <>
      <Context.Provider value={result.data.id}>
        <Header />
        <Outlet />
        <PrivateRouter data={result.data.name} />
      </Context.Provider>
    </>
  )
}
