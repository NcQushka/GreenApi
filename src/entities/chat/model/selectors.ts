import { useChatStore } from '@/entities/chat/model/store.ts'
import { useShallow } from 'zustand/react/shallow'

export const useActiveChat = () =>
  useChatStore((state) => state.chats.find((chat) => chat.id === state.activeChatId) ?? null)

export const useActiveMessages = () =>
  useChatStore(
    useShallow((state) => state.messages.filter((message) => message.chatId === state.activeChatId)),
  )
