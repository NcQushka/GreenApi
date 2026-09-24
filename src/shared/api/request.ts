import type { AxiosRequestConfig } from 'axios'
import { http } from '@/shared/api/client.ts'
import isNil from 'lodash/isNil'
import type { Session } from '@/shared/api/types.ts'
import trim from 'lodash/trim'

const API_URL = 'https://api.green-api.com'

type HttpMethod = 'GET' | 'POST' | 'DELETE'

type ApiRequest = {
  session: Session
  method: string
  httpMethod?: HttpMethod
  data?: unknown
  params?: Record<string, string | number | boolean | undefined>
  suffix?: string
  timeout?: number
  signal?: AbortSignal
}

const buildUrl = (session: Session, method: string, suffix?: string) => {
  const idInstance = trim(session.idInstance)
  const token = trim(session.apiTokenInstance)
  const base = `${API_URL}/waInstance${idInstance}/${method}/${token}`
  return suffix ? `${base}/${suffix}` : base
}

export const apiRequest = async <T>({
  session,
  method,
  httpMethod = 'GET',
  data,
  params,
  suffix,
  timeout,
  signal,
}: ApiRequest): Promise<T> => {
  const config: AxiosRequestConfig = {
    url: buildUrl(session, method, suffix),
    method: httpMethod,
    params,
    data,
    timeout,
    signal,
    headers: isNil(data) ? undefined : { 'Content-Type': 'application/json' },
  }

  const response = await http.request<T>(config)
  return response.data
}
