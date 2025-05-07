"use client"

import { useState } from "react"
import { MessagesList } from "@/components/messages/messages-list"
import { MessageChat } from "@/components/messages/message-chat"

export function MessagesLayout() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
      <MessagesList className="md:col-span-1" selectedId={selectedConversation} onSelect={setSelectedConversation} />
      <MessageChat className="md:col-span-2 lg:col-span-3" conversationId={selectedConversation} />
    </div>
  )
}
