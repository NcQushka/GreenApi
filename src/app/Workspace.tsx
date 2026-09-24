import { Outlet } from 'react-router'
import { setAuthErrorHandler } from '@/shared/api'
import { useEffect } from 'react'
import { useLogout } from '@/features/logout'
import { useReceiveMessages } from '@/features/receive-messages'

export const Workspace = () => {
  const logout = useLogout()
  useReceiveMessages()

  useEffect(() => {
    setAuthErrorHandler(logout)
    return () => setAuthErrorHandler(null)
  }, [logout])

  return <Outlet />
}
