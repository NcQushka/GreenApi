export const LogKind = {
  outgoing: 'outgoing',
  incoming: 'incoming',
} as const

export type LogKind = (typeof LogKind)[keyof typeof LogKind]

export const LogStatus = {
  sent: 'sent',
  received: 'received',
  failed: 'failed',
} as const

export type LogStatus = (typeof LogStatus)[keyof typeof LogStatus]

export type LogEntry = {
  id: string
  at: number
  kind: LogKind
  chatId: string
  text: string
  status: LogStatus
  durationMs?: number
  error?: string
}
