import { StrictMode } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from '@/app/model/router'
import { App } from '@/app/ui/App'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
