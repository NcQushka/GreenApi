import { getErrorMessage, sendMessage } from '@/shared/api'
import { LogKind, LogStatus, useLogStore } from '@/entities/log'
import { useChatStore } from '@/entities/chat'
import { useMutation } from '@tanstack/react-query'
import { useSession } from '@/entities/session'

const elapsed = (started: number) => Math.round(performance.now() - started)

export const useSendMessage = (chatId: string) => {
  const session = useSession()
  const addOutgoing = useChatStore((state) => state.addOutgoing)
  const markSent = useChatStore((state) => state.markSent)
  const markFailed = useChatStore((state) => state.markFailed)
  const addEntry = useLogStore((state) => state.addEntry)

  const mutation = useMutation({
    mutationFn: async (text: string) => {
      const localId = crypto.randomUUID()
      const started = performance.now()
      addOutgoing({ id: localId, chatId, text, outgoing: true, status: 'pending' })
      try {
        const response = await sendMessage(session, chatId, text)
        markSent(localId, response.idMessage)
        addEntry({
          kind: LogKind.outgoing,
          chatId,
          text,
          status: LogStatus.sent,
          durationMs: elapsed(started),
        })
      } catch (error) {
        markFailed(localId)
        addEntry({
          kind: LogKind.outgoing,
          chatId,
          text,
          status: LogStatus.failed,
          durationMs: elapsed(started),
          error: getErrorMessage(error) ?? undefined,
        })
        throw error
      }
    },
  })

  return {
    send: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    errorMessage: mutation.isError ? getErrorMessage(mutation.error) : null,
  }
}
