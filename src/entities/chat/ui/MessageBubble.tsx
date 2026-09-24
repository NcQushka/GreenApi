import type { ChatMessage } from '@/entities/chat/model/types.ts'
import { cn } from '@/shared/lib'
import { useTranslation } from 'react-i18next'

type MessageBubbleProps = {
  message: ChatMessage
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const { t } = useTranslation()

  return (
    <div className={cn('flex', message.outgoing ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[70%] rounded-xl px-3 py-2 text-sm',
          message.outgoing ? 'bg-selected' : 'bg-incoming',
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        {message.status === 'failed' && <p className="mt-1 text-xs text-danger">{t('notSent')}</p>}
      </div>
    </div>
  )
}
