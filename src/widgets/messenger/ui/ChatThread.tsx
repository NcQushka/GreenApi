import { MessageBubble, useActiveChat, useActiveMessages } from '@/entities/chat'
import { useEffect, useRef } from 'react'
import { SendMessageForm } from '@/features/send-message'
import { useTranslation } from 'react-i18next'

export const ChatThread = () => {
  const { t } = useTranslation()
  const chat = useActiveChat()
  const messages = useActiveMessages()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [messages.length, chat?.id])

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      {chat ? (
        <>
          <header className="border-b border-white/10 bg-panel px-4 py-3 text-sm font-medium">
            {chat.name}
          </header>
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={bottomRef} />
          </div>
          <SendMessageForm chatId={chat.id} />
        </>
      ) : (
        <p className="flex flex-1 items-center justify-center text-sm text-muted">{t('pickChat')}</p>
      )}
    </section>
  )
}
