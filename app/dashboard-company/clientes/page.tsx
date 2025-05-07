import { CompanyClientesTable } from "@/components/clientes/company-clientes-table"

export default function CompanyClientesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <p className="text-muted-foreground">Gestiona tus relaciones con clientes y prospectos</p>
      </div>
      <CompanyClientesTable />
    </div>
  )
}
