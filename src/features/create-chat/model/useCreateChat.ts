import { checkAccount } from '@/shared/api'
import isNil from 'lodash/isNil'
import { isPhone } from '@/shared/lib'
import startsWith from 'lodash/startsWith'
import { useChatStore } from '@/entities/chat'
import { useSession } from '@/entities/session'

export type CreateChatResult = { ok: true } | { ok: false }

export const useCreateChat = () => {
  const session = useSession()
  const openChat = useChatStore((state) => state.openChat)
  const mergeChats = useChatStore((state) => state.mergeChats)

  return async (entered: string): Promise<CreateChatResult> => {
    const needsLookup = startsWith(entered, '@') || isPhone(entered)

    if (!needsLookup) {
      openChat(entered)
      return { ok: true }
    }

    try {
      const account = await checkAccount(session, entered)
      if (isNil(account)) return { ok: false }
      mergeChats(entered, account.chatId, account.username || entered)
      return { ok: true }
    } catch {
      return { ok: false }
    }
  }
}
