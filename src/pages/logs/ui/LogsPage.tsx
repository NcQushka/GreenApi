import { Button } from '@/shared/ui/button'
import { MessageLog } from '@/widgets/message-log'
import { NavLink } from '@/shared/ui/nav-link'
import { useLogStore } from '@/entities/log'
import { useTranslation } from 'react-i18next'

export const LogsPage = () => {
  const { t } = useTranslation()
  const clearLogs = useLogStore((state) => state.clearLogs)

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-4 px-4 py-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/">← {t('messenger')}</NavLink>
          <h1 className="text-xl font-medium">{t('logs')}</h1>
        </div>
        <Button variant="ghost" onClick={clearLogs}>
          {t('clearLogs')}
        </Button>
      </header>
      <MessageLog />
    </main>
  )
}
