import { isAxiosError } from 'axios'
import { useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export function AppLayout() {
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          // const code = error.response?.data.code

          if (status === 401) {
            navigate('/home', {
              replace: true,
            })
          }
        }

        return Promise.reject(error)
      },
    )

    // Clean up the side effect when the component unmounts
    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="mt-10 flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
