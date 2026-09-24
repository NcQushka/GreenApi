import { isAuthError, isNetworkError, verifySession } from '@/shared/api'
import { type SubmitEvent, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { useSessionStore } from '@/entities/session'
import { useTranslation } from 'react-i18next'

export const LoginForm = () => {
  const { t } = useTranslation()
  const setSession = useSessionStore((state) => state.setSession)
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setPending(true)
    const session = { idInstance, apiTokenInstance }
    try {
      await verifySession(session)
      setSession(session)
    } catch (reason) {
      setError(
        isAuthError(reason) || isNetworkError(reason)
          ? t('invalidCredentials')
          : t('unknownError'),
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {error && <p className="text-sm text-danger">{error}</p>}
      <Field
        value={idInstance}
        onChange={(event) => {
          setIdInstance(event.target.value)
          setError(null)
        }}
        placeholder="idInstance"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        required
        disabled={pending}
      />
      <Field
        value={apiTokenInstance}
        onChange={(event) => {
          setApiTokenInstance(event.target.value)
          setError(null)
        }}
        placeholder="apiTokenInstance"
        type="password"
        autoComplete="off"
        spellCheck={false}
        required
        disabled={pending}
      />
      <Button type="submit" className="mt-1" disabled={pending}>
        {t('login')}
      </Button>
    </form>
  )
}
