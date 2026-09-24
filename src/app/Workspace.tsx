import { Outlet } from 'react-router'
import { useReceiveMessages } from '@/features/receive-messages'

export const Workspace = () => {
  useReceiveMessages()

  return <Outlet />
}
