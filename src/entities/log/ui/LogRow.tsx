import { type LogEntry, LogKind, LogStatus } from '@/entities/log/model/types.ts'
import { cn } from '@/shared/lib'
import { useTranslation } from 'react-i18next'

type LogRowProps = {
  entry: LogEntry
}

const formatTime = (at: number) =>
  new Date(at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

export const LogRow = ({ entry }: LogRowProps) => {
  const { t } = useTranslation()
  const outgoing = entry.kind === LogKind.outgoing

  return (
    <tr className="border-t border-white/5">
      <td className="px-3 py-2 whitespace-nowrap text-muted">{formatTime(entry.at)}</td>
      <td className="px-3 py-2">
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-xs',
            outgoing ? 'bg-selected' : 'bg-incoming',
          )}
        >
          {t(outgoing ? 'outgoing' : 'incoming')}
        </span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap">{entry.chatId}</td>
      <td className="max-w-xs truncate px-3 py-2" title={entry.text}>
        {entry.text}
      </td>
      <td className="px-3 py-2 whitespace-nowrap text-muted">
        {entry.durationMs === undefined ? '—' : `${entry.durationMs} ms`}
      </td>
      <td
        className={cn(
          'px-3 py-2 whitespace-nowrap',
          entry.status === LogStatus.failed && 'text-danger',
        )}
      >
        {entry.status === LogStatus.failed
          ? entry.error || t('notSent')
          : t(outgoing ? 'sent' : 'received')}
      </td>
    </tr>
  )
}
