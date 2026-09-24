import { ChatSidebar } from '@/widgets/messenger/ui/ChatSidebar.tsx'
import { ChatThread } from '@/widgets/messenger/ui/ChatThread.tsx'

export const Messenger = () => (
  <div className="flex h-svh bg-canvas">
    <ChatSidebar />
    <ChatThread />
  </div>
)
