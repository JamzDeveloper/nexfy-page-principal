import { MessagesLayout } from "@/components/messages/messages-layout"

export default function MessagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mensajes</h2>
        <p className="text-muted-foreground">Comunícate con tus conexiones</p>
      </div>
      <MessagesLayout />
    </div>
  )
}
