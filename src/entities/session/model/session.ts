import { create } from 'zustand'
import isEmpty from 'lodash/isEmpty'
import { persist } from 'zustand/middleware'
import type { Session } from '@/shared/api'
import trim from 'lodash/trim'
import { useShallow } from 'zustand/react/shallow'
import { useSyncExternalStore } from 'react'

type SessionStore = Session & {
  setSession: (session: Session) => void
  clearSession: () => void
}

const emptySession = (): Session => ({
  idInstance: '',
  apiTokenInstance: '',
})

const hasSession = (session: Session) =>
  !isEmpty(trim(session.idInstance)) && !isEmpty(trim(session.apiTokenInstance))

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      ...emptySession(),
      setSession: (session) =>
        set({
          idInstance: trim(session.idInstance),
          apiTokenInstance: trim(session.apiTokenInstance),
        }),
      clearSession: () => set(emptySession()),
    }),
    { name: 'session' },
  ),
)

export const useSession = (): Session =>
  useSessionStore(
    useShallow((state) => ({
      idInstance: state.idInstance,
      apiTokenInstance: state.apiTokenInstance,
    })),
  )

export const useSessionHydrated = () =>
  useSyncExternalStore(
    (onStoreChange) => useSessionStore.persist.onFinishHydration(onStoreChange),
    () => useSessionStore.persist.hasHydrated(),
    () => false,
  )

export const useSessionReady = () => hasSession(useSession())
