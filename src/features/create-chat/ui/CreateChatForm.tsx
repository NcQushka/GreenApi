import { type SubmitEvent, useState } from 'react'
import { Field } from '@/shared/ui/field'
import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'
import { useCreateChat } from '@/features/create-chat/model/useCreateChat.ts'
import { useTranslation } from 'react-i18next'

export const CreateChatForm = () => {
  const { t } = useTranslation()
  const createChat = useCreateChat()
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const entered = trim(value)
    if (isEmpty(entered) || pending) return

    setError(null)
    setPending(true)
    const result = await createChat(entered)
    setPending(false)

    if (!result.ok) {
      setError(t('userNotFound'))
      return
    }
    setValue('')
  }

  return (
    <form onSubmit={onSubmit} className="border-b border-white/10 p-3">
      {error && <p className="mb-2 text-xs text-danger">{error}</p>}
      <Field
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          setError(null)
        }}
        placeholder={t('chatId')}
        className="w-full"
        autoComplete="off"
        spellCheck={false}
        disabled={pending}
      />
    </form>
  )
}
