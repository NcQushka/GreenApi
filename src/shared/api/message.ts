import { apiRequest } from '@/shared/api/request.ts'
import type { Session } from '@/shared/api/types.ts'

type SendMessageResponse = {
  idMessage: string
}

export const sendMessage = (session: Session, chatId: string, message: string) =>
  apiRequest<SendMessageResponse>({
    session,
    method: 'sendMessage',
    httpMethod: 'POST',
    data: { chatId, message },
  })
