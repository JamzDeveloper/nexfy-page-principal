import { CompaniesList } from "@/components/companies/companies-list"

export default function CompaniesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Compañías</h2>
        <p className="text-muted-foreground">Gestiona tus relaciones con compañías</p>
      </div>
      <CompaniesList />
    </div>
  )
}
