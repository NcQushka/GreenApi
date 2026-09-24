export type Session = {
  idInstance: string
  apiTokenInstance: string
}

export type Account = {
  chatId: string
  username: string
}

export type TextMessage = {
  chatId: string
  sender: string
  phone: string
  name: string
  idMessage: string
  text: string
}

export type Notification = {
  receiptId: number
  body: unknown
}
