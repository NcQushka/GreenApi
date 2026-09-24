import { LogRow, useLogStats, useLogStore } from '@/entities/log'
import isEmpty from 'lodash/isEmpty'
import isNull from 'lodash/isNull'
import { StatCard } from '@/widgets/message-log/ui/StatCard.tsx'
import { useTranslation } from 'react-i18next'

const columns = ['time', 'direction', 'chat', 'text', 'duration', 'status'] as const

export const MessageLog = () => {
  const { t } = useTranslation()
  const entries = useLogStore((state) => state.entries)
  const stats = useLogStats()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={t('outgoing')} value={stats.outgoing} />
        <StatCard label={t('incoming')} value={stats.incoming} />
        <StatCard label={t('failed')} value={stats.failed} />
        <StatCard
          label={t('averageSend')}
          value={isNull(stats.averageMs) ? '—' : `${stats.averageMs} ms`}
        />
      </div>
      {isEmpty(entries) ? (
        <p className="rounded-xl bg-panel px-4 py-8 text-center text-sm text-muted">
          {t('emptyLogs')}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-panel">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted uppercase">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-3 py-2 font-medium">
                    {t(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <LogRow key={entry.id} entry={entry} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
