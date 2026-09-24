import { ChatListItem, useChatStore } from '@/entities/chat'
import { CreateChatForm } from '@/features/create-chat'
import { LanguageSwitch } from '@/features/switch-language'
import { LogoutButton } from '@/features/logout'
import { NavLink } from '@/shared/ui/nav-link'
import { useReceiveError } from '@/features/receive-messages'
import { useTranslation } from 'react-i18next'

export const ChatSidebar = () => {
  const { t } = useTranslation()
  const chats = useChatStore((state) => state.chats)
  const activeChatId = useChatStore((state) => state.activeChatId)
  const openChat = useChatStore((state) => state.openChat)
  const receiveError = useReceiveError()

  return (
    <aside className="flex w-80 shrink-0 flex-col border-r border-black/30 bg-panel">
      <header className="flex items-center justify-between px-4 py-3">
        <span className="text-base font-medium">Telegram</span>
        <div className="flex items-center gap-3">
          <LanguageSwitch />
          <NavLink to="/logs">{t('logs')}</NavLink>
          <LogoutButton />
        </div>
      </header>
      {receiveError && (
        <p className="px-4 pb-2 text-xs text-danger">{receiveError.message ?? t('unknownError')}</p>
      )}
      <CreateChatForm />
      <ul className="min-h-0 flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            active={chat.id === activeChatId}
            onSelect={openChat}
          />
        ))}
      </ul>
    </aside>
  )
}
