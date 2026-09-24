import { Button } from '@/shared/ui/button'
import { useLogout } from '@/features/logout/model/useLogout.ts'
import { useTranslation } from 'react-i18next'

export const LogoutButton = () => {
  const { t } = useTranslation()
  const logout = useLogout()

  return (
    <Button variant="ghost" onClick={logout}>
      {t('logout')}
    </Button>
  )
}
