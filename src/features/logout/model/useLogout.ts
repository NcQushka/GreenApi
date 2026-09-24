import { resetSkippedTags } from '@/features/receive-messages/model/resolve-chat.ts'
import { useCallback } from 'react'
import { useChatStore } from '@/entities/chat'
import { useLogStore } from '@/entities/log'
import { useSessionStore } from '@/entities/session'

export const useLogout = () => {
  const clearSession = useSessionStore((state) => state.clearSession)
  const clearChats = useChatStore((state) => state.clearChats)
  const clearLogs = useLogStore((state) => state.clearLogs)

  return useCallback(() => {
    clearSession()
    clearChats()
    clearLogs()
    resetSkippedTags()
  }, [clearChats, clearLogs, clearSession])
}
