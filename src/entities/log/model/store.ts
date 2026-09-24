import { create } from 'zustand'
import type { LogEntry } from '@/entities/log/model/types.ts'
import { persist } from 'zustand/middleware'

type LogInput = Omit<LogEntry, 'id' | 'at'>

type LogStore = {
  entries: LogEntry[]
  addEntry: (input: LogInput) => void
  clearLogs: () => void
}

const LIMIT = 500

export const useLogStore = create<LogStore>()(
  persist(
    (set) => ({
      entries: [],
      addEntry: (input) =>
        set((state) => ({
          entries: [{ ...input, id: crypto.randomUUID(), at: Date.now() }, ...state.entries].slice(
            0,
            LIMIT,
          ),
        })),
      clearLogs: () => set({ entries: [] }),
    }),
    { name: 'logs' },
  ),
)
