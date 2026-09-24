import { apiRequest } from '@/shared/api/request.ts'
import type { Session } from '@/shared/api/types.ts'

export const verifySession = (session: Session) =>
  apiRequest<unknown>({
    session,
    method: 'getSettings',
  })
