import { Navigate, Route, Routes } from 'react-router'
import { useSessionHydrated, useSessionReady } from '@/entities/session'
import { LoginPage } from '@/pages/login'
import { LogsPage } from '@/pages/logs'
import { MessengerPage } from '@/pages/messenger'
import { Workspace } from '@/app/Workspace.tsx'

export const App = () => {
  const hydrated = useSessionHydrated()
  const ready = useSessionReady()

  if (!hydrated) return null
  if (!ready) return <LoginPage />

  return (
    <Routes>
      <Route element={<Workspace />}>
        <Route index element={<MessengerPage />} />
        <Route path="logs" element={<LogsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
