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

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSession({ idInstance, apiTokenInstance })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <Field
        value={idInstance}
        onChange={(event) => setIdInstance(event.target.value)}
        placeholder="idInstance"
        inputMode="numeric"
        autoComplete="off"
        spellCheck={false}
        required
      />
      <Field
        value={apiTokenInstance}
        onChange={(event) => setApiTokenInstance(event.target.value)}
        placeholder="apiTokenInstance"
        type="password"
        autoComplete="off"
        spellCheck={false}
        required
      />
      <Button type="submit" className="mt-1">
        {t('login')}
      </Button>
    </form>
  )
}
