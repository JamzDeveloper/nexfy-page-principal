import { OpportunitiesList } from "@/components/opportunities/opportunities-list"
import { OpportunitiesFilter } from "@/components/opportunities/opportunities-filter"

export default function FindOpportunitiesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Buscar Oportunidades</h2>
        <p className="text-muted-foreground">
          Explora y aplica a oportunidades de ventas que coincidan con tus habilidades
        </p>
      </div>
      <div className="flex flex-col gap-8 md:flex-row">
        <OpportunitiesList className="flex-1" />
      </div>
    </div>
  )
}
