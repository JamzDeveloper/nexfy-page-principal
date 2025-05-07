import { AgentesTable } from "@/components/agentes/agentes-table"

export default function AgentesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agentes</h2>
        <p className="text-muted-foreground">Gestiona tus relaciones con agentes de ventas</p>
      </div>
      <AgentesTable />
    </div>
  )
}
