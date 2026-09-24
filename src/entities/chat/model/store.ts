import type { Chat, ChatMessage } from '@/entities/chat/model/types.ts'
import { create } from 'zustand'
import { isPhone } from '@/shared/lib'
import { persist } from 'zustand/middleware'

type IncomingMessage = {
  id: string
  chatId: string
  text: string
  name?: string
}

type ChatStore = {
  chats: Chat[]
  messages: ChatMessage[]
  activeChatId: string | null
  openChat: (entered: string) => void
  mergeChats: (entered: string, chatId: string, name?: string) => void
  addOutgoing: (message: ChatMessage) => void
  markSent: (localId: string, idMessage: string) => void
  markFailed: (localId: string) => void
  addIncoming: (message: IncomingMessage) => void
  clearChats: () => void
}

const phoneOf = (entered: string) => (isPhone(entered) ? entered : undefined)

const hasOwnName = (chat: Chat | undefined) => Boolean(chat?.name && chat.name !== chat.id)

const upsertChat = (chats: Chat[], chatId: string, lastText: string, name?: string): Chat[] => {
  const current = chats.find((chat) => chat.id === chatId)
  const next: Chat = {
    id: chatId,
    name: hasOwnName(current) ? current!.name : name || current?.name || chatId,
    lastText: lastText || current?.lastText || '',
    phone: current?.phone,
  }
  return [next, ...chats.filter((chat) => chat.id !== chatId)]
}

const updateMessage = (
  messages: ChatMessage[],
  id: string,
  patch: Partial<ChatMessage>,
): ChatMessage[] =>
  messages.map((message) => (message.id === id ? { ...message, ...patch } : message))

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      messages: [],
      activeChatId: null,
      openChat: (entered) =>
        set((state) => ({
          activeChatId: entered,
          chats: state.chats.some((chat) => chat.id === entered)
            ? state.chats
            : [{ id: entered, name: entered, lastText: '', phone: phoneOf(entered) }, ...state.chats],
        })),
      mergeChats: (entered, chatId, name) =>
        set((state) => {
          const sources = new Set([entered, chatId])
          const merged = state.chats.filter((chat) => sources.has(chat.id))
          const named = merged.find(hasOwnName)
          const messages = state.messages.map((message) =>
            sources.has(message.chatId) ? { ...message, chatId } : message,
          )
          const last = messages.findLast((message) => message.chatId === chatId)
          return {
            activeChatId: chatId,
            messages,
            chats: [
              {
                id: chatId,
                name: named?.name || name || chatId,
                lastText: last?.text ?? '',
                phone: merged.find((chat) => chat.phone)?.phone ?? phoneOf(entered),
              },
              ...state.chats.filter((chat) => !sources.has(chat.id)),
            ],
          }
        }),
      addOutgoing: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
          chats: upsertChat(state.chats, message.chatId, message.text),
          activeChatId: message.chatId,
        })),
      markSent: (localId, idMessage) =>
        set((state) => ({
          messages: updateMessage(state.messages, localId, { id: idMessage, status: 'sent' }),
        })),
      markFailed: (localId) =>
        set((state) => ({
          messages: updateMessage(state.messages, localId, { status: 'failed' }),
        })),
      addIncoming: ({ id, chatId, text, name }) => {
        if (get().messages.some((message) => message.id === id)) return
        set((state) => ({
          messages: [...state.messages, { id, chatId, text, outgoing: false, status: 'sent' }],
          chats: upsertChat(state.chats, chatId, text, name),
        }))
      },
      clearChats: () => set({ chats: [], messages: [], activeChatId: null }),
    }),
    { name: 'chats' },
  ),
)
