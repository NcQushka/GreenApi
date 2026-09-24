import { type SubmitEvent, useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import isEmpty from 'lodash/isEmpty'
import trim from 'lodash/trim'
import { useSendMessage } from '@/features/send-message/model/useSendMessage.ts'
import { useTranslation } from 'react-i18next'

type SendMessageFormProps = {
  chatId: string
}

export const SendMessageForm = ({ chatId }: SendMessageFormProps) => {
  const { t } = useTranslation()
  const { send, isPending, isError, errorMessage } = useSendMessage(chatId)
  const [text, setText] = useState('')
  const message = trim(text)
  const disabled = isEmpty(message) || isPending

  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (disabled) return
    setText('')
    send(message)
  }

  return (
    <form onSubmit={onSubmit} className="border-t border-white/10 p-3">
      <div className="flex gap-2">
        <Field
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t('message')}
          maxLength={4096}
          className="min-w-0 flex-1"
        />
        <Button type="submit" disabled={disabled}>
          {t('send')}
        </Button>
      </div>
      {isError && <p className="mt-2 text-sm text-danger">{errorMessage ?? t('unknownError')}</p>}
    </form>
  )
}
