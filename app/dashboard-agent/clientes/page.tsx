import { ClientesTable } from "@/components/clientes/clientes-table"

export default function ClientesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Mis Clientes</h2>
        <p className="text-muted-foreground">Gestiona tus relaciones con clientes y prospectos</p>
      </div>
      <ClientesTable />
    </div>
  )
}
