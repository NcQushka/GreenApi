import type { Chat } from '@/entities/chat/model/types.ts'
import isEmpty from 'lodash/isEmpty'

type IncomingRef = {
  chatId: string
  sender: string
  phone: string
}

const isSameChat = (chat: Chat, incoming: IncomingRef) =>
  chat.id === incoming.chatId ||
  chat.id === incoming.sender ||
  (!isEmpty(incoming.phone) && chat.phone === incoming.phone)

export const findChatId = (chats: Chat[], incoming: IncomingRef) =>
  chats.find((chat) => isSameChat(chat, incoming))?.id ?? incoming.chatId
