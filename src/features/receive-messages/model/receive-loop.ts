import {
  deleteNotification,
  isCancelError,
  readTextMessage,
  receiveNotification,
  type Session,
  type TextMessage,
} from '@/shared/api'
import { sleep } from '@/shared/lib'

const RETRY_DELAY = 1000

type ReceiveHandlers = {
  onMessage: (message: TextMessage) => Promise<void>
  onError: (error: unknown) => void
  onSuccess: () => void
}

export const receiveLoop = async (
  session: Session,
  signal: AbortSignal,
  { onMessage, onError, onSuccess }: ReceiveHandlers,
) => {
  while (!signal.aborted) {
    try {
      const notification = await receiveNotification(session, signal)
      if (notification) {
        const message = readTextMessage(notification.body)
        if (message) await onMessage(message)
        await deleteNotification(session, notification.receiptId)
      }
      onSuccess()
    } catch (error) {
      if (signal.aborted || isCancelError(error)) return
      onError(error)
      await sleep(RETRY_DELAY)
    }
  }
}
