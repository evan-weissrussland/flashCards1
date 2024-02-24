import { Outlet } from 'react-router-dom'

import { PrivateRouter } from '@/app/model/router'
import { Header } from '@/app/ui/Header/ui'
import { Spinner } from '@/app/ui/Spinner/Spinner'
import { Responce, useAuthMeQuery } from '@/features/Auth/api/authMe-api'
export type MyIdType = {
  myId: string
}

export function App() {
  const { data, isLoading } = useAuthMeQuery()

  return (
    <div style={{ margin: '0 auto', maxWidth: '1280px' }}>
      {isLoading && <Spinner />}
      <Header data={data as Responce} />
      <Outlet context={{ myId: data?.id as string } satisfies MyIdType} />
      <PrivateRouter data={data as Responce} isLoading={isLoading} />
    </div>
  )
}
