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

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const entered = trim(value)
    if (isEmpty(entered)) return
    setValue('')
    void createChat(entered)
  }

  return (
    <form onSubmit={onSubmit} className="border-b border-white/10 p-3">
      <Field
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t('chatId')}
        className="w-full"
        autoComplete="off"
        spellCheck={false}
      />
    </form>
  )
}
