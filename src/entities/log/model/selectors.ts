import { LogKind, LogStatus, useLogStore } from '@/entities/log'
import meanBy from 'lodash/meanBy'
import { useShallow } from 'zustand/react/shallow'

export const useLogStats = () =>
  useLogStore(
    useShallow((state) => {
      const outgoing = state.entries.filter((entry) => entry.kind === LogKind.outgoing)
      const sent = outgoing.filter((entry) => entry.status === LogStatus.sent)
      return {
        outgoing: outgoing.length,
        incoming: state.entries.length - outgoing.length,
        failed: outgoing.length - sent.length,
        averageMs: sent.length ? Math.round(meanBy(sent, (entry) => entry.durationMs ?? 0)) : null,
      }
    }),
  )
