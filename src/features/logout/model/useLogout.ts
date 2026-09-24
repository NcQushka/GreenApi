import { useChatStore } from '@/entities/chat'
import { useLogStore } from '@/entities/log'
import { useSessionStore } from '@/entities/session'

export const useLogout = () => {
  const clearSession = useSessionStore((state) => state.clearSession)
  const clearChats = useChatStore((state) => state.clearChats)
  const clearLogs = useLogStore((state) => state.clearLogs)

  return () => {
    clearSession()
    clearChats()
    clearLogs()
  }
}
