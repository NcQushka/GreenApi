import type { Notification, Session, TextMessage } from '@/shared/api/types.ts'
import { apiRequest } from '@/shared/api/request.ts'
import gt from 'lodash/gt'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isNumber from 'lodash/isNumber'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import toString from 'lodash/toString'

const RECEIVE_TIMEOUT = 5

const stringOf = (value: unknown) => (isString(value) && !isEmpty(value) ? value : '')

const asRecord = (value: unknown): Record<string, unknown> | null =>
  isPlainObject(value) ? (value as Record<string, unknown>) : null

export const receiveNotification = async (session: Session, signal?: AbortSignal) => {
  const data = await apiRequest<Notification | '' | null>({
    session,
    method: 'receiveNotification',
    params: { receiveTimeout: RECEIVE_TIMEOUT },
    timeout: 15_000,
    signal,
  })

  if (isNil(data) || isString(data) || !isPlainObject(data)) return null
  if (!isNumber(data.receiptId)) return null
  return data as Notification
}

export const deleteNotification = (session: Session, receiptId: number) =>
  apiRequest<{ result: boolean }>({
    session,
    method: 'deleteNotification',
    httpMethod: 'DELETE',
    suffix: String(receiptId),
  })

export const readTextMessage = (body: unknown): TextMessage | null => {
  const record = asRecord(body)
  if (!record || record.typeWebhook !== 'incomingMessageReceived') return null

  const messageData = asRecord(record.messageData)
  if (!messageData || messageData.typeMessage !== 'textMessage') return null

  const textData = asRecord(messageData.textMessageData)
  const text = stringOf(textData?.textMessage)
  if (isEmpty(text)) return null

  const sender = asRecord(record.senderData)
  const chatId = stringOf(sender?.chatId) || stringOf(record.chatId)
  if (isEmpty(chatId)) return null

  const phoneNumber = sender?.senderPhoneNumber
  const phone =
    isNumber(phoneNumber) && gt(phoneNumber, 0) ? toString(phoneNumber) : stringOf(phoneNumber)

  return {
    chatId,
    sender: stringOf(sender?.sender),
    phone,
    name: stringOf(sender?.chatName) || stringOf(sender?.senderName),
    idMessage: stringOf(record.idMessage) || crypto.randomUUID(),
    text,
  }
}
