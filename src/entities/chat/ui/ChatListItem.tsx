import type { Chat } from '@/entities/chat/model/types.ts'
import { cn } from '@/shared/lib'

type ChatListItemProps = {
  chat: Chat
  active: boolean
  onSelect: (chatId: string) => void
}

export const ChatListItem = ({ chat, active, onSelect }: ChatListItemProps) => (
  <li>
    <button
      type="button"
      onClick={() => onSelect(chat.id)}
      className={cn(
        'flex w-full flex-col items-start px-4 py-3 text-left',
        active ? 'bg-selected' : 'hover:bg-white/5',
      )}
    >
      <span className="text-sm font-medium">{chat.name}</span>
      {chat.lastText && (
        <span className="mt-0.5 line-clamp-1 text-xs text-muted">{chat.lastText}</span>
      )}
    </button>
  </li>
)
