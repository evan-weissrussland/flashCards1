import { createContext } from 'react'
import { Outlet } from 'react-router-dom'

import { PrivateRouter } from '@/app/model/router'
import { Header } from '@/app/ui/Header/ui'
import { useAuthMeQuery } from '@/features/Auth/api/authMe-api'

export const Context = createContext('')

export function App() {
  const { data, isLoading } = useAuthMeQuery()

  if (isLoading) {
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
      <Context.Provider value={data?.id as string}>
        <Header email={data?.email as string} name={data?.name as string} />
        <Outlet />
        <PrivateRouter data={data?.isEmailVerified as boolean} />
      </Context.Provider>
    </>
  )
}
