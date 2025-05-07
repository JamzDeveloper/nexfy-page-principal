"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

interface MessagesListProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedId: number | null
  onSelect: (id: number) => void
}

export function MessagesList({ className, selectedId, onSelect, ...props }: MessagesListProps) {
  const conversations = [
    {
      id: 1,
      name: "Jane Cooper",
      company: "TechCorp",
      avatar: "/woman-headshot.png",
      lastMessage: "Thanks for your application! Do you have time for a call tomorrow?",
      time: "10:42 AM",
      unread: true,
    },
    {
      id: 2,
      name: "Robert Fox",
      company: "GrowthTech",
      avatar: "/placeholder.svg?key=z6dlg",
      lastMessage: "I've reviewed your proposal and I'm interested in moving forward.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      name: "Esther Howard",
      company: "Innovate Inc",
      avatar: "/professional-woman.png",
      lastMessage: "Can you provide more details about your experience with enterprise sales?",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      name: "Cameron Williamson",
      company: "GlobalSales Co",
      avatar: "/placeholder.svg?key=a98ck",
      lastMessage: "Let's schedule a meeting to discuss the opportunity in more detail.",
      time: "Tuesday",
      unread: false,
    },
    {
      id: 5,
      name: "Brooklyn Simmons",
      company: "ConsultPro",
      avatar: "/placeholder.svg?key=30qz6",
      lastMessage: "Your application has been accepted! When can you start?",
      time: "Monday",
      unread: true,
    },
  ]

  return (
    <div className={cn("flex flex-col h-full border rounded-lg", className)} {...props}>
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={cn(
                "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors",
                selectedId === conversation.id && "bg-muted",
              )}
              onClick={() => onSelect(conversation.id)}
            >
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <img src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium truncate">{conversation.name}</h4>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{conversation.company}</p>
                  {conversation.unread && <div className="h-2 w-2 rounded-full bg-primary" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
