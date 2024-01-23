import { createBrowserRouter } from 'react-router-dom'

import { App } from '@/app/ui/App'
import { Error404 } from '@/app/ui/Error404/Error404'
import { CheckEmail } from '@/features/Auth/ui/CheckEmail/ui'
import { CreateNewPass } from '@/features/Auth/ui/CreateNewPass/ui'
import { ForgotPass } from '@/features/Auth/ui/ForgotPass/ui'
import { SignIn } from '@/features/Auth/ui/SignIn/ui'
import { SignUp } from '@/features/Auth/ui/SignUp/ui'

export const router = createBrowserRouter([
  {
    children: [
      {
        element: <SignIn />,
        path: 'signIn',
      },
      {
        element: <SignUp />,
        path: 'signUp',
      },
      {
        element: <CheckEmail />,
        path: 'checkEmail',
      },
      {
        element: <CreateNewPass />,
        path: 'createNewPass',
      },
      {
        element: <ForgotPass />,
        path: 'forgotPass',
      },
      {
        element: <Error404 />,
        path: '*',
      },
    ],
    element: <App />,
    path: '/',
  },
])
