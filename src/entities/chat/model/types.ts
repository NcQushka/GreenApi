export type ChatMessage = {
  id: string
  chatId: string
  text: string
  outgoing: boolean
  status: 'pending' | 'sent' | 'failed'
}

export type Chat = {
  id: string
  name: string
  lastText: string
  phone?: string
}
