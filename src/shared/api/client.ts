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

let authErrorHandler: (() => void) | null = null

export const setAuthErrorHandler = (handler: (() => void) | null) => {
  authErrorHandler = handler
}

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

const isUnauthorizedStatus = (status: number) => status === 401 || status === 403

http.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error) || error.code === 'ERR_CANCELED') throw error
    const apiError = toApiError(error)
    if (isUnauthorizedStatus(apiError.status)) authErrorHandler?.()
    throw apiError
  },
)

export const isCancelError = (error: unknown) => axios.isCancel(error)

export const isAuthError = (error: unknown) =>
  error instanceof ApiError && isUnauthorizedStatus(error.status)

export const isNetworkError = (error: unknown) =>
  error instanceof ApiError && error.status === 0

export const getErrorMessage = (error: unknown): string | null => {
  if (error instanceof ApiError) {
    if (!error.status) return null
    return `${error.status}: ${error.message}`
  }
  if (isError(error) && !isEmpty(error.message)) return error.message
  return null
}
