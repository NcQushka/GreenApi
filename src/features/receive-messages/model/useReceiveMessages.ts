import { linkTaggedChats, resolveIncomingChat } from '@/features/receive-messages/model/resolve-chat.ts'
import { LogKind, LogStatus, useLogStore } from '@/entities/log'
import { useSession, useSessionReady } from '@/entities/session'
import { getErrorMessage } from '@/shared/api'
import { receiveLoop } from '@/features/receive-messages/model/receive-loop.ts'
import { useChatStore } from '@/entities/chat'
import { useEffect } from 'react'
import { useReceiveStore } from '@/features/receive-messages/model/store.ts'

export const useReceiveMessages = () => {
  const session = useSession()
  const ready = useSessionReady()

  useEffect(() => {
    if (!ready) return

    const controller = new AbortController()
    const { setError } = useReceiveStore.getState()

    const run = async () => {
      await linkTaggedChats(session, controller.signal)
      await receiveLoop(session, controller.signal, {
        onMessage: async (incoming) => {
          const chatId = await resolveIncomingChat(session, incoming)
          useChatStore.getState().addIncoming({
            id: incoming.idMessage,
            chatId,
            text: incoming.text,
            name: incoming.name,
          })
          useLogStore.getState().addEntry({
            kind: LogKind.incoming,
            chatId,
            text: incoming.text,
            status: LogStatus.received,
          })
        },
        onError: (error) => {
          const message = getErrorMessage(error)
          const current = useReceiveStore.getState().error
          if (current?.message === message) return
          setError({ message })
        },
        onSuccess: () => setError(null),
      })
    }

    void run()

    return () => controller.abort()
  }, [ready, session])
}
