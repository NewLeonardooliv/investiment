import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import Investiment from './pages/app/investment/investment'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Investiment />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/home',
        element: <Investiment />,
      },
    ],
  },
])
