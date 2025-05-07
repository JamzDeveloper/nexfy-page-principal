import { CompanyOpportunitiesList } from "@/components/opportunities/company-opportunities-list"

export default function CompanyOpportunitiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Oportunidades</h2>
        <p className="text-muted-foreground">Gestiona tus oportunidades de ventas</p>
      </div>

      <CompanyOpportunitiesList />
    </div>
  )
}
