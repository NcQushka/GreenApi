import { create } from 'zustand'

type ReceiveError = {
  message: string | null
}

type ReceiveStore = {
  error: ReceiveError | null
  setError: (error: ReceiveError | null) => void
}

export const useReceiveStore = create<ReceiveStore>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}))

export const useReceiveError = () => useReceiveStore((state) => state.error)
