import axios, { type AxiosError } from 'axios'
import isEmpty from 'lodash/isEmpty'
import isError from 'lodash/isError'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import trim from 'lodash/trim'

class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export const http = axios.create({
  timeout: 30_000,
  headers: {
    Accept: 'application/json',
  },
})

const textOf = (value: unknown) => (isString(value) ? trim(value) : '')

const readErrorText = (body: unknown): string | undefined => {
  const direct = textOf(body)
  if (!isEmpty(direct)) return direct
  if (!isPlainObject(body)) return undefined

  const record = body as Record<string, unknown>
  const message = textOf(record.message) || textOf(record.error)
  if (!isEmpty(message)) return message

  try {
    return JSON.stringify(body)
  } catch {
    return undefined
  }
}

const toApiError = (error: AxiosError) =>
  new ApiError(error.response?.status ?? 0, readErrorText(error.response?.data) ?? error.message)

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error) || error.code === 'ERR_CANCELED') throw error
    throw toApiError(error)
  },
)

export const isCancelError = (error: unknown) => axios.isCancel(error)

export const getErrorMessage = (error: unknown): string | null => {
  if (error instanceof ApiError) {
    return error.status ? `${error.status}: ${error.message}` : error.message
  }
  if (isError(error) && !isEmpty(error.message)) return error.message
  return null
}
