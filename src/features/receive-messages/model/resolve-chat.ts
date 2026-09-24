import { checkAccount, type Session, type TextMessage } from '@/shared/api'
import { findChatId, useChatStore } from '@/entities/chat'
import startsWith from 'lodash/startsWith'

const taggedChats = () =>
  useChatStore.getState().chats.filter((chat) => startsWith(chat.id, '@'))

const resolveTag = (session: Session, tag: string) =>
  checkAccount(session, tag).catch(() => null)

export const linkTaggedChats = async (session: Session, signal: AbortSignal) => {
  for (const chat of taggedChats()) {
    if (signal.aborted) return
    const account = await resolveTag(session, chat.id)
    if (account && account.chatId !== chat.id) {
      useChatStore.getState().mergeChats(chat.id, account.chatId)
    }
  }
}

export const resolveIncomingChat = async (session: Session, incoming: TextMessage) => {
  const { chats, mergeChats } = useChatStore.getState()
  const matched = findChatId(chats, incoming)
  if (chats.some((chat) => chat.id === matched)) return matched

  for (const chat of taggedChats()) {
    const account = await resolveTag(session, chat.id)
    if (account?.chatId === incoming.chatId) {
      mergeChats(chat.id, account.chatId, incoming.name)
      return account.chatId
    }
  }
  return matched
}
