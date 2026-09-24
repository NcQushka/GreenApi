import { checkAccount } from '@/shared/api'
import isNil from 'lodash/isNil'
import { useChatStore } from '@/entities/chat'
import { useSession } from '@/entities/session'

export const useCreateChat = () => {
  const session = useSession()
  const openChat = useChatStore((state) => state.openChat)
  const mergeChats = useChatStore((state) => state.mergeChats)

  return async (entered: string) => {
    const account = await checkAccount(session, entered).catch(() => null)
    if (isNil(account)) {
      openChat(entered)
      return
    }
    mergeChats(entered, account.chatId, account.username || entered)
  }
}
