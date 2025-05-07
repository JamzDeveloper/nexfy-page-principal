import { MessagesLayout } from "@/components/messages/messages-layout"

export default function CompanyMessagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mensajes</h2>
        <p className="text-muted-foreground">Comunícate con agentes y clientes</p>
      </div>
      <MessagesLayout />
    </div>
  )
}
