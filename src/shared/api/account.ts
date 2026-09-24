import type { Account, Session } from '@/shared/api/types.ts'
import { apiRequest } from '@/shared/api/request.ts'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import { isPhone } from '@/shared/lib'
import isString from 'lodash/isString'
import startsWith from 'lodash/startsWith'
import trim from 'lodash/trim'

type AccountQuery = { username: string } | { phoneNumber: number }

type AccountResponse = {
  exist?: boolean
  chatId?: string
  username?: string
}

const toQuery = (value: string): AccountQuery | null => {
  if (startsWith(value, '@')) return { username: value }
  if (isPhone(value)) return { phoneNumber: Number(value) }
  return null
}

const toUsername = (value: unknown, entered: string) => {
  if (!isString(value) || isEmpty(value)) return startsWith(entered, '@') ? entered : ''
  return startsWith(value, '@') ? value : `@${value}`
}

export const checkAccount = async (session: Session, query: string): Promise<Account | null> => {
  const value = trim(query)
  const data = toQuery(value)
  if (isNil(data)) return null

  const response = await apiRequest<AccountResponse>({
    session,
    method: 'checkAccount',
    httpMethod: 'POST',
    data,
  })
  if (!response.exist || !isString(response.chatId) || isEmpty(response.chatId)) return null

  return { chatId: response.chatId, username: toUsername(response.username, value) }
}
